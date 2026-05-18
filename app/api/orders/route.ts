import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/lib/cart-context";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  generateShopOrderReference,
  randToCents,
  shippingCentsForSubtotal,
} from "@/lib/utils/orders";
import { ensureLoyaltyAccountForOrder } from "@/lib/utils/loyalty-on-order";
import { sendOrderEmails } from "@/lib/utils/send-order-emails";
import { markAbandonedCheckoutConverted } from "@/lib/queries/abandoned-checkouts";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Billing = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: CartItem[];
      billing: Billing;
      voucher_code?: string | null;
    };

    const { items, billing, voucher_code } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!billing?.email?.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const productIds = items.map((i) => i.id);

    if (productIds.some((id) => !UUID_RE.test(id))) {
      return NextResponse.json(
        {
          error:
            "Your cart contains outdated product data. Please clear your cart and add items again.",
        },
        { status: 400 }
      );
    }

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, slug, sku, price_cents, is_active")
      .in("id", productIds);

    if (productsError) {
      console.error("[orders] products lookup:", productsError);
      if (productsError.code === "42P01") {
        return NextResponse.json(
          { error: "Orders are not configured yet. Please contact the clinic." },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: "Could not verify products" }, { status: 500 });
    }

    const productMap = new Map((products ?? []).map((p) => [p.id, p]));

    const lineItems: {
      product_id: string;
      product_name: string;
      product_sku: string | null;
      unit_price_cents: number;
      quantity: number;
      line_total_cents: number;
    }[] = [];

    for (const item of items) {
      const product = productMap.get(item.id);
      if (!product) {
        return NextResponse.json(
          { error: `Product no longer available: ${item.name}` },
          { status: 400 }
        );
      }
      if (product.is_active === false) {
        return NextResponse.json(
          { error: `${product.name} is currently unavailable` },
          { status: 400 }
        );
      }

      const unitPriceCents =
        product.price_cents ?? randToCents(item.price);
      const lineTotalCents = unitPriceCents * item.quantity;

      lineItems.push({
        product_id: product.id,
        product_name: product.name,
        product_sku: product.sku,
        unit_price_cents: unitPriceCents,
        quantity: item.quantity,
        line_total_cents: lineTotalCents,
      });
    }

    const subtotalCents = lineItems.reduce((sum, li) => sum + li.line_total_cents, 0);
    const subtotalRands = subtotalCents / 100;
    const shippingCents = shippingCentsForSubtotal(subtotalRands);

    let voucherDiscountCents = 0;
    let voucherNote: string | null = null;

    if (voucher_code) {
      const code = voucher_code.toUpperCase().trim();
      const { data: voucher } = await supabase
        .from("gift_vouchers")
        .select("id, code, status, balance_rands, expires_at")
        .eq("code", code)
        .single();

      if (!voucher) {
        return NextResponse.json({ error: "Gift voucher not found" }, { status: 400 });
      }
      if (!["active", "partially_redeemed"].includes(voucher.status)) {
        return NextResponse.json({ error: "Gift voucher cannot be used" }, { status: 400 });
      }
      if (voucher.expires_at && new Date(voucher.expires_at) < new Date()) {
        return NextResponse.json({ error: "Gift voucher has expired" }, { status: 400 });
      }

      const maxDiscountRands = Math.min(voucher.balance_rands, subtotalRands);
      voucherDiscountCents = randToCents(maxDiscountRands);
      voucherNote = `Voucher ${code}: -R ${maxDiscountRands.toFixed(2)}`;
    }

    const totalCents = Math.max(0, subtotalCents + shippingCents - voucherDiscountCents);
    const reference = generateShopOrderReference();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        reference,
        customer_name: `${billing.firstName.trim()} ${billing.lastName.trim()}`.trim(),
        customer_email: billing.email.toLowerCase().trim(),
        customer_phone: billing.phone.trim(),
        shipping_address: {
          line1: billing.address1.trim(),
          line2: billing.address2?.trim() || null,
          city: billing.city.trim(),
          province: billing.province,
          postal_code: billing.postalCode.trim(),
          country: "ZA",
        },
        subtotal_cents: subtotalCents,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        status: "pending",
        notes: voucherNote,
      })
      .select("id, reference")
      .single();

    if (orderError || !order) {
      console.error("[orders] insert order:", orderError);
      if (orderError?.code === "42P01") {
        return NextResponse.json(
          {
            error:
              "Order storage is not set up. Run scripts from .claude/products-schema.sql in Supabase.",
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const orderItemsPayload = lineItems.map((li) => ({
      order_id: order.id,
      ...li,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItemsPayload);

    if (itemsError) {
      console.error("[orders] insert items:", itemsError);
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: "Failed to save order items" }, { status: 500 });
    }

    if (voucher_code && voucherDiscountCents > 0) {
      const code = voucher_code.toUpperCase().trim();
      const { data: voucher } = await supabase
        .from("gift_vouchers")
        .select("id, balance_rands")
        .eq("code", code)
        .single();

      if (voucher) {
        const discountRands = voucherDiscountCents / 100;
        const newBalance = voucher.balance_rands - discountRands;

        await supabase.from("voucher_redemptions").insert({
          voucher_id: voucher.id,
          amount_rands: discountRands,
          order_reference: reference,
        });

        await supabase
          .from("gift_vouchers")
          .update({
            balance_rands: Math.max(0, newBalance),
            status: newBalance <= 0 ? "redeemed" : "partially_redeemed",
          })
          .eq("id", voucher.id);
      }
    }

    const shippingAddress = [
      billing.address1.trim(),
      billing.address2?.trim(),
      billing.city.trim(),
      billing.province,
      billing.postalCode.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    const loyalty = await ensureLoyaltyAccountForOrder(
      supabase,
      {
        email: billing.email,
        firstName: billing.firstName,
        lastName: billing.lastName,
        phone: billing.phone,
      },
      totalCents
    );

    await markAbandonedCheckoutConverted(billing.email, billing.phone);

    await sendOrderEmails({
      reference: order.reference,
      customerName: `${billing.firstName.trim()} ${billing.lastName.trim()}`.trim(),
      customerEmail: billing.email.toLowerCase().trim(),
      customerPhone: billing.phone.trim(),
      shippingAddress,
      lineItems: lineItems.map((li) => ({
        product_name: li.product_name,
        quantity: li.quantity,
        unit_price_cents: li.unit_price_cents,
        line_total_cents: li.line_total_cents,
      })),
      subtotalCents,
      shippingCents,
      voucherDiscountCents,
      totalCents,
      voucherNote,
      starlightsEarned: loyalty.starlightsEarned,
      isNewMember: loyalty.isNewMember,
    });

    return NextResponse.json({
      orderId: order.reference,
      orderKey: order.id,
    });
  } catch (err) {
    console.error("[orders] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

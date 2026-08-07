import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/lib/cart-context";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  nextOrderReference,
  randToCents,
  shippingCentsForSubtotal,
} from "@/lib/utils/orders";
import { ensureLoyaltyAccountForOrder } from "@/lib/utils/loyalty-on-order";
import { sendOrderEmails } from "@/lib/utils/send-order-emails";
import { markAbandonedCheckoutConverted } from "@/lib/queries/abandoned-checkouts";
import {
  isFunnelCartLine,
  isValidCartProductId,
  resolveCartProductId,
} from "@/lib/cart-product-id";
import {
  COLLECTION_POINT,
  isDeliveryMethod,
  isPaymentMethod,
  shippingCentsForMethod,
  type DeliveryMethod,
  type PaymentMethod,
} from "@/lib/constants/fulfilment";
import { generateSignature, getPayFastUrl } from "@/lib/payfast";
import { createOrderAccessToken } from "@/lib/utils/order-access-token";
import { getPublicSiteUrl } from "@/lib/seo";

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

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
      payment_method?: PaymentMethod;
      delivery_method?: DeliveryMethod;
    };

    const { items, billing, voucher_code } = body;

    // Server decides both — never trust the browser's arithmetic or its claim
    // about how the order will be paid for.
    const paymentMethod: PaymentMethod = isPaymentMethod(body.payment_method)
      ? body.payment_method
      : "bank_transfer";
    const deliveryMethod: DeliveryMethod = isDeliveryMethod(body.delivery_method)
      ? body.delivery_method
      : "delivery";

    // Card payments stay switched off until PayFast activates the merchant
    // account. Checked here as well as in the UI — the browser can send
    // whatever it likes, and a card order we can't collect on is worse than
    // no card option at all.
    if (paymentMethod === "payfast" && process.env.NEXT_PUBLIC_PAYFAST_ENABLED !== "true") {
      return NextResponse.json(
        { error: "Card payments aren't available yet. Please choose EFT / bank transfer." },
        { status: 503 }
      );
    }

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!billing?.email?.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    const invalidItems = items.filter((i) => !isValidCartProductId(i.id));
    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          error:
            "Your cart contains outdated product data. Please clear your cart and add items again.",
        },
        { status: 400 }
      );
    }

    const productIds = [...new Set(items.map((i) => resolveCartProductId(i.id)))];

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
      const productId = resolveCartProductId(item.id);
      const product = productMap.get(productId);
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

      const unitPriceCents = isFunnelCartLine(item.id, item.name)
        ? randToCents(item.price)
        : (product.price_cents ?? randToCents(item.price));
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
    const shippingCents = shippingCentsForMethod(
      deliveryMethod,
      shippingCentsForSubtotal(subtotalRands)
    );

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
    const reference = await nextOrderReference(supabase);

    const orderRow = {
        reference,
        customer_name: `${billing.firstName.trim()} ${billing.lastName.trim()}`.trim(),
        customer_email: billing.email.toLowerCase().trim(),
        customer_phone: billing.phone.trim(),
        // Nothing is couriered on a collection order, and the address fields are
        // hidden at checkout — storing a row of empty strings would just look
        // like a broken address on the packing slip.
        shipping_address:
          deliveryMethod === "collection"
            ? null
            : {
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
        payment_method: paymentMethod,
        delivery_method: deliveryMethod,
    };

    let { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderRow)
      .select("id, reference")
      .single();

    // The payment/collection migration hasn't been run yet. Don't fail an
    // otherwise-valid order over it — insert without the new columns and say so
    // loudly. A card order can't proceed without them, though.
    if (orderError?.code === "42703") {
      console.error(
        "[orders] orders table is missing payment_method/delivery_method — run " +
          "scripts/sql/payfast-and-collection-migration.sql in Supabase"
      );
      if (paymentMethod === "payfast") {
        return NextResponse.json(
          { error: "Card payments are not configured yet. Please choose EFT, or contact the clinic." },
          { status: 503 }
        );
      }
      const legacyRow: Partial<typeof orderRow> = { ...orderRow };
      delete legacyRow.payment_method;
      delete legacyRow.delivery_method;
      ({ data: order, error: orderError } = await supabase
        .from("orders")
        .insert(legacyRow)
        .select("id, reference")
        .single());
    }

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

    const shippingAddress =
      deliveryMethod === "collection"
        ? COLLECTION_POINT.oneLine
        : [
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

    const customerEmail = billing.email.toLowerCase().trim();
    const orderToken = createOrderAccessToken(order.reference, customerEmail);

    // ── EFT ONLY: announce the order now ──────────────────────────────────────
    //
    // A card order gets NO email here. The customer has not paid yet — they are
    // only about to be redirected to PayFast, and the payment can still be
    // declined. Emailing at this point once made a declined card look like a
    // completed sale (LAVA, 6 Aug 2026). Card orders are announced from the ITN
    // handler, which knows the real outcome. With EFT, money is merely expected
    // later, so "we've received your order, here are the banking details" is
    // honest.
    if (paymentMethod === "bank_transfer") {
      await sendOrderEmails({
        reference: order.reference,
        customerName: `${billing.firstName.trim()} ${billing.lastName.trim()}`.trim(),
        customerEmail,
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
        deliveryMethod,
        paymentMethod,
      });

      return NextResponse.json({
        method: "bank_transfer",
        orderId: order.reference,
        orderKey: order.id,
        token: orderToken,
      });
    }

    // ── PayFast: hand back a signed payment request ───────────────────────────
    // Field ORDER matters — the signature is an MD5 over the params in exactly
    // this sequence.
    const siteUrl = getPublicSiteUrl();
    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "";
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "";
    const passphrase = process.env.PAYFAST_PASSPHRASE || "";

    if (!merchantId || !merchantKey) {
      console.error("[orders] PayFast merchant credentials not configured");
      return NextResponse.json(
        { error: "Card payments are unavailable right now. Please choose EFT." },
        { status: 503 }
      );
    }

    const itemSummary = truncate(
      lineItems.map((li) => `${li.quantity}× ${li.product_name}`).join(", "),
      255
    );
    const tokenParam = encodeURIComponent(orderToken);

    const orderedParams: [string, string][] = [
      ["merchant_id", merchantId],
      ["merchant_key", merchantKey],
      ["return_url", `${siteUrl}/order-confirmation?orderId=${order.reference}&token=${tokenParam}`],
      ["cancel_url", `${siteUrl}/order-confirmation?orderId=${order.reference}&token=${tokenParam}&cancelled=1`],
      ["notify_url", `${siteUrl}/api/payfast/itn`],
      ["name_first", billing.firstName.trim()],
      ["name_last", billing.lastName.trim()],
      ["email_address", customerEmail],
      ["cell_number", billing.phone.trim()],
      ["m_payment_id", order.reference],
      ["amount", (totalCents / 100).toFixed(2)],
      ["item_name", truncate(`Star Aesthetic Centre — Order ${order.reference}`, 100)],
      ["item_description", itemSummary],
    ];

    const params: Record<string, string> = Object.fromEntries(orderedParams);
    params.signature = generateSignature(orderedParams, passphrase);

    return NextResponse.json({
      method: "payfast",
      orderId: order.reference,
      orderKey: order.id,
      token: orderToken,
      payfastUrl: getPayFastUrl(),
      params,
    });
  } catch (err) {
    console.error("[orders] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

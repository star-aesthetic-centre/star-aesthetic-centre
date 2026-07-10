import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { orderStarlightsAlreadyCredited } from "@/lib/utils/credit-order-starlights";
import { calculateStarlights } from "@/lib/utils/rewards";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";

async function isAdmin(req: NextRequest): Promise<boolean> {
  return isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      reference,
      customer_name,
      customer_email,
      customer_phone,
      total_cents,
      subtotal_cents,
      shipping_cents,
      status,
      notes,
      created_at,
      order_items (
        product_name,
        quantity,
        line_total_cents
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("[orders/admin-list]", error);
    return NextResponse.json({ error: "Could not load orders" }, { status: 500 });
  }

  const enriched = await Promise.all(
    (orders ?? []).map(async (o) => {
      const credited = await orderStarlightsAlreadyCredited(supabase, o.reference);
      const starlights = calculateStarlights(o.total_cents / 100);
      return {
        ...o,
        starlights,
        starlights_credited: credited,
      };
    })
  );

  return NextResponse.json({ orders: enriched });
}

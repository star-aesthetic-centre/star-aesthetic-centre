export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyOrderAccessToken } from "@/lib/utils/order-access-token";

/**
 * The real, stored status of one order.
 *
 * The order-confirmation page calls this before saying anything about payment —
 * arriving at a return URL proves nothing. The signed token binds the request
 * to one order + email so this can't be used to enumerate other orders.
 */
export async function GET(req: NextRequest) {
  const reference = (req.nextUrl.searchParams.get("order") ?? "").trim();
  const token = (req.nextUrl.searchParams.get("token") ?? "").trim();

  if (!reference || !token) {
    return NextResponse.json({ error: "Missing order or token" }, { status: 400 });
  }

  const verified = verifyOrderAccessToken(token);
  if (!verified || verified.reference !== reference) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  const supabase = createSupabaseAdmin();
  const { data: order, error } = await supabase
    .from("orders")
    .select("reference, customer_email, status, total_cents, payment_method, delivery_method")
    .eq("reference", reference)
    .maybeSingle();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (String(order.customer_email ?? "").trim().toLowerCase() !== verified.email) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  return NextResponse.json({
    reference: order.reference,
    status: order.status,
    totalCents: order.total_cents,
    paymentMethod: order.payment_method ?? "bank_transfer",
    deliveryMethod: order.delivery_method ?? "delivery",
  });
}

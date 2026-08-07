export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyOrderAccessToken } from "@/lib/utils/order-access-token";
import { dispatchOrderPaymentResultEmails } from "@/lib/utils/order-payment-result";

/**
 * Safety net for a PayFast order whose ITN never arrives.
 *
 * The customer completed the PayFast step and came back to /order-confirmation,
 * but PayFast has not confirmed the payment to us. We do NOT claim the order is
 * paid — it stays "pending" and both parties get an explicitly UNCONFIRMED
 * notice so the clinic checks the PayFast dashboard before dispatching.
 *
 * Without this, a broken or misconfigured ITN would mean a real paying customer
 * hears nothing at all. Sends once per order (the announce-once guard).
 */
export async function POST(req: NextRequest) {
  let body: { order?: string; token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const reference = String(body.order ?? "").trim();
  const token = String(body.token ?? "").trim();
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
    .select("id, status, customer_email, payment_method")
    .eq("reference", reference)
    .maybeSingle();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (String(order.customer_email ?? "").trim().toLowerCase() !== verified.email) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  // Only for a card order still waiting on an outcome.
  if (order.status !== "pending" || order.payment_method === "bank_transfer") {
    return NextResponse.json({ ok: true, notified: false, status: order.status });
  }

  const result = await dispatchOrderPaymentResultEmails({
    supabase,
    orderId: order.id,
    outcome: "returned_unconfirmed",
  });

  console.info(
    `[payfast] return without ITN for ${reference}: notice ${result.sent ? "sent" : result.reason}`
  );

  return NextResponse.json({ ok: true, notified: result.sent, status: order.status });
}

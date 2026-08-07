export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyOrderAccessToken } from "@/lib/utils/order-access-token";
import { dispatchOrderPaymentResultEmails } from "@/lib/utils/order-payment-result";

/**
 * Called when PayFast returns the customer to the cancel URL — a declined card,
 * or they backed out.
 *
 * PayFast does not always send an ITN for an abandoned or declined attempt, so
 * this is the second net: it marks the order cancelled and sends the "payment
 * unsuccessful" emails, leaving the order visible so the clinic can rescue the
 * sale rather than losing it silently.
 *
 * Requires the signed token minted for this order at checkout — nobody can
 * cancel someone else's order by guessing a reference.
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

  // A paid order must never be walked backwards by a stale cancel URL.
  if (order.status !== "pending" || order.payment_method === "bank_transfer") {
    return NextResponse.json({ ok: true, status: order.status, changed: false });
  }

  const { error: updateErr } = await supabase
    .from("orders")
    .update({ status: "cancelled", payment_status_detail: "CANCELLED_AT_PAYFAST" })
    .eq("id", order.id)
    .eq("status", "pending");

  if (updateErr) {
    // The migration may not have been run — retry without the new column.
    const retry = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", order.id)
      .eq("status", "pending");
    if (retry.error) {
      console.error(`[payfast] cancel update failed for ${reference}:`, retry.error.message);
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
  }

  const result = await dispatchOrderPaymentResultEmails({
    supabase,
    orderId: order.id,
    outcome: "unsuccessful",
    failureDetail: "Customer returned from PayFast without a completed payment",
  });

  console.info(
    `[payfast] cancel handled for ${reference}: emails ${result.sent ? "sent" : result.reason}`
  );

  return NextResponse.json({ ok: true, status: "cancelled", changed: true });
}

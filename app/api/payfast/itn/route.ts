export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyITNSignature, validateITNWithPayFast } from "@/lib/payfast";
import { dispatchOrderPaymentResultEmails } from "@/lib/utils/order-payment-result";
import { creditOrderStarlights } from "@/lib/utils/credit-order-starlights";

/**
 * PayFast Instant Transaction Notification — the ONLY source of truth for
 * whether a card payment succeeded. Order confirmation emails for card orders
 * are sent from here and nowhere else, so a declined card can never be
 * announced as a completed sale.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // ── 1. Parse params (order preserved — the signature depends on it) ────────
  const params = new URLSearchParams(rawBody);
  const entries: [string, string][] = [...params.entries()];

  const receivedSignature = params.get("signature") ?? "";
  const paymentStatus = (params.get("payment_status") ?? "").toUpperCase();
  const reference = params.get("m_payment_id") ?? "";
  const pfPaymentId = params.get("pf_payment_id") ?? "";
  const amount = params.get("amount_gross") ?? "0";

  if (!reference) {
    return NextResponse.json({ error: "Missing m_payment_id" }, { status: 400 });
  }

  // ── 2. Authenticate the notification ──────────────────────────────────────
  //
  // Two independent proofs are available: our own MD5 over the payload, and
  // PayFast echoing the exact payload back as VALID. Either is sufficient.
  // Requiring the signature alone meant one encoding mistake silently threw
  // away every real payment on the sister sites — genuine ITNs 400'd and
  // PayFast eventually gave up retrying.
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";
  const sig = verifyITNSignature(entries, passphrase, receivedSignature);
  const fieldNames = entries.map(([k]) => k).join(",");

  if (sig.valid) {
    console.info(`[itn] signature OK for ${reference} (variant: ${sig.variant})`);
    try {
      const pfValid = await validateITNWithPayFast(rawBody);
      if (!pfValid) {
        console.error(`[itn] PayFast validation failed for ${reference}`);
        return NextResponse.json({ error: "PayFast validation failed" }, { status: 400 });
      }
    } catch (err) {
      // Network blip talking to PayFast — the signature already proved authenticity.
      console.warn("[itn] PayFast validate call error:", err);
    }
  } else {
    let serverValidated: boolean | null = null;
    try {
      serverValidated = await validateITNWithPayFast(rawBody);
    } catch (err) {
      console.warn("[itn] PayFast validate call error:", err);
    }

    if (serverValidated !== true) {
      console.error(
        `[itn] REJECTED for ${reference}: signature mismatch (tried ${sig.attempted.join(", ")}) ` +
          `and PayFast validate returned ${serverValidated}. Fields: ${fieldNames}`
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Authentic per PayFast itself — accept, but make the mismatch loud so the
    // encoding can be pinned down instead of silently relying on this path.
    console.warn(
      `[itn] signature mismatch for ${reference} BUT PayFast server confirmed the payload — accepting. Fields: ${fieldNames}`
    );
  }

  // ── 3. Look up the order ──────────────────────────────────────────────────
  const supabase = createSupabaseAdmin();

  const { data: order, error: findErr } = await supabase
    .from("orders")
    .select("id, reference, customer_name, customer_email, customer_phone, total_cents, status")
    .eq("reference", reference)
    .single();

  if (findErr || !order) {
    console.error(`[itn] order not found: ${reference}`);
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // ── 4. Map PayFast status → ours. Anything not an explicit COMPLETE is
  //      treated as "not paid".
  const statusMap: Record<string, string> = {
    COMPLETE: "paid",
    FAILED: "failed",
    CANCELLED: "cancelled",
  };
  const newStatus = statusMap[paymentStatus] ?? "pending";
  const isPaid = newStatus === "paid";
  const isUnsuccessful = newStatus === "failed" || newStatus === "cancelled";

  // ── 5. Verify the amount — only meaningful when money actually moved ──────
  if (isPaid) {
    const receivedAmount = parseFloat(amount);
    const expected = Number(order.total_cents) / 100;
    if (Math.abs(receivedAmount - expected) > 0.01) {
      console.error(
        `[itn] amount mismatch for ${reference}: expected ${expected}, got ${receivedAmount}`
      );
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }
  }

  // ── 6. Update the order ───────────────────────────────────────────────────
  const update: Record<string, unknown> = { status: newStatus, pf_payment_id: pfPaymentId };

  const { error: updateErr } = await supabase
    .from("orders")
    .update({ ...update, payment_status_detail: paymentStatus })
    .eq("id", order.id);

  if (updateErr) {
    // The migration may not have been run — retry without the new columns.
    const retry = await supabase.from("orders").update({ status: newStatus }).eq("id", order.id);
    if (retry.error) {
      console.error(`[itn] order update error for ${reference}:`, retry.error.message);
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
    console.warn(
      "[itn] pf_payment_id/payment_status_detail not stored — run scripts/sql/payfast-and-collection-migration.sql"
    );
  }

  // ── 7. Announce the outcome — once, and only now PayFast has spoken ───────
  // PayFast retries the ITN, so the previous status is what makes this a real
  // transition; dispatchOrderPaymentResultEmails claims its send slot
  // atomically as a second line of defence.
  if (isPaid && order.status !== "paid") {
    const result = await dispatchOrderPaymentResultEmails({
      supabase,
      orderId: order.id,
      outcome: "paid",
    });
    console.info(`[itn] paid emails for ${reference}: ${result.sent ? "sent" : result.reason}`);

    const credit = await creditOrderStarlights(supabase, {
      id: order.id,
      reference: order.reference,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      total_cents: order.total_cents,
      status: newStatus,
    });
    if (credit.error) console.error(`[itn] Star Lights credit failed for ${reference}:`, credit.error);
  } else if (isUnsuccessful && order.status !== "paid") {
    const result = await dispatchOrderPaymentResultEmails({
      supabase,
      orderId: order.id,
      outcome: "unsuccessful",
      failureDetail: paymentStatus,
    });
    console.info(
      `[itn] unsuccessful emails for ${reference}: ${result.sent ? "sent" : result.reason}`
    );
  }

  console.log(`[itn] processed: ${reference} → ${newStatus} (PayFast: ${paymentStatus || "n/a"})`);
  return NextResponse.json({ ok: true });
}

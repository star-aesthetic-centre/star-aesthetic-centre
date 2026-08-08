export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyITNSignature, validateITNWithPayFast } from "@/lib/payfast";
import { activateVoucher } from "@/lib/utils/voucher-activation";
import { type GiftVoucher } from "@/lib/utils/vouchers";

/**
 * PayFast ITN for GIFT VOUCHER purchases — the only source of truth for
 * whether a voucher card payment succeeded.
 *
 * Deliberately separate from /api/payfast/itn. PayFast takes notify_url per
 * transaction, so vouchers get their own endpoint rather than teaching the
 * order handler a second shape. The order path handles actual product revenue
 * and is not worth destabilising for this.
 *
 * A voucher order is a BATCH: one payment_reference can cover several voucher
 * rows. All of them are settled together.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

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

  // ── Authenticate ──────────────────────────────────────────────────────────
  // Same two independent proofs as the order ITN: our own MD5 over the
  // payload, or PayFast echoing the payload back as VALID. Either suffices.
  // See lib/payfast.ts for why requiring the signature alone once threw away
  // every real payment on two sister sites.
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";
  const sig = verifyITNSignature(entries, passphrase, receivedSignature);

  if (sig.valid) {
    console.info(`[voucher-itn] signature OK for ${reference} (variant: ${sig.variant})`);
    try {
      if (!(await validateITNWithPayFast(rawBody))) {
        console.error(`[voucher-itn] PayFast validation failed for ${reference}`);
        return NextResponse.json({ error: "PayFast validation failed" }, { status: 400 });
      }
    } catch (err) {
      // Network blip — the signature already proved authenticity.
      console.warn("[voucher-itn] PayFast validate call error:", err);
    }
  } else {
    let serverValidated: boolean | null = null;
    try {
      serverValidated = await validateITNWithPayFast(rawBody);
    } catch (err) {
      console.warn("[voucher-itn] PayFast validate call error:", err);
    }

    if (serverValidated !== true) {
      console.error(
        `[voucher-itn] REJECTED for ${reference}: signature mismatch ` +
          `(tried ${sig.attempted.join(", ")}) and PayFast validate returned ${serverValidated}. ` +
          `Fields: ${entries.map(([k]) => k).join(",")}`
      );
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.warn(
      `[voucher-itn] signature mismatch for ${reference} BUT PayFast server confirmed the payload — accepting.`
    );
  }

  // ── Find the batch ────────────────────────────────────────────────────────
  const supabase = createSupabaseAdmin();

  const { data: vouchers, error: findErr } = await supabase
    .from("gift_vouchers")
    .select("*")
    .or(`payment_reference.eq.${reference},order_reference.eq.${reference}`);

  if (findErr || !vouchers?.length) {
    console.error(`[voucher-itn] vouchers not found for ${reference}`);
    return NextResponse.json({ error: "Vouchers not found" }, { status: 404 });
  }

  const statusMap: Record<string, string> = {
    COMPLETE: "paid",
    FAILED: "failed",
    CANCELLED: "cancelled",
  };
  const outcome = statusMap[paymentStatus] ?? "pending";

  // ── Verify the amount — only meaningful when money actually moved ─────────
  if (outcome === "paid") {
    const expected = vouchers.reduce(
      (sum, v) => sum + Number((v as GiftVoucher).denomination_rands),
      0
    );
    const received = parseFloat(amount);
    if (Math.abs(received - expected) > 0.01) {
      console.error(
        `[voucher-itn] amount mismatch for ${reference}: expected ${expected}, got ${received}`
      );
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }
  }

  // ── Settle ────────────────────────────────────────────────────────────────
  if (outcome === "paid") {
    // activateVoucher claims each row's transition atomically, so PayFast's
    // retries cannot send a recipient their voucher twice.
    let activated = 0;
    for (const v of vouchers) {
      const result = await activateVoucher(supabase, v as GiftVoucher, {
        pf_payment_id: pfPaymentId,
        payment_status_detail: paymentStatus,
      });
      if (result) activated += 1;
    }
    console.info(
      `[voucher-itn] ${reference}: activated ${activated} of ${vouchers.length} ` +
        `(${vouchers.length - activated} already done — normal on a retry)`
    );
  } else if (outcome === "failed" || outcome === "cancelled") {
    const { error: failErr } = await supabase
      .from("gift_vouchers")
      .update({ status: "failed", payment_status_detail: paymentStatus })
      .eq("payment_reference", reference)
      .eq("status", "pending_payment");

    if (failErr) {
      // Migration may not have been run — the status alone still matters.
      await supabase
        .from("gift_vouchers")
        .update({ status: "failed" })
        .eq("payment_reference", reference)
        .eq("status", "pending_payment");
      console.warn(
        "[voucher-itn] payment_status_detail not stored — run scripts/sql/voucher-payfast-migration.sql"
      );
    }
  }

  console.log(`[voucher-itn] processed: ${reference} → ${outcome} (PayFast: ${paymentStatus || "n/a"})`);
  return NextResponse.json({ ok: true });
}

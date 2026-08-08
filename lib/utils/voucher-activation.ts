/**
 * Voucher activation — the single place a pending voucher becomes active and
 * its emails go out.
 *
 * Extracted from the admin activate route so the PayFast ITN can call it too.
 *
 * THE IMPORTANT PART: PayFast retries an ITN until it gets a 200, sometimes
 * several times, and the admin may click "activate" while a retry is in
 * flight. The status transition is therefore claimed with a CONDITIONAL
 * update — `.eq("status", "pending_payment")` — and the email is sent only if
 * that update actually returned a row. Postgres serialises the concurrent
 * updates, so exactly one caller sees the row and exactly one email is sent.
 * Reading the status first and then updating would leave a window where two
 * callers both read "pending_payment" and both send.
 */

import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { buildVoucherEmail, type GiftVoucher } from "@/lib/utils/vouchers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Star Aesthetic Centre <bookings@staraesthetic.site>";

export type ActivationResult = { code: string; recipient_email: string };

/**
 * Activate one voucher and email both parties. Returns null when the voucher
 * was already activated by someone else — that is the normal, expected outcome
 * of an ITN retry, not an error.
 */
export async function activateVoucher(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  voucher: GiftVoucher,
  paymentDetail?: { pf_payment_id?: string; payment_status_detail?: string }
): Promise<ActivationResult | null> {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 3);

  const patch: Record<string, unknown> = {
    status: "active",
    activated_at: new Date().toISOString(),
    expires_at: expiresAt.toISOString(),
  };
  if (paymentDetail?.pf_payment_id) {
    patch.paid_at = new Date().toISOString();
    patch.pf_payment_id = paymentDetail.pf_payment_id;
    patch.payment_status_detail = paymentDetail.payment_status_detail ?? null;
  }

  // Claim the transition. `.select()` makes the update report what it changed.
  let { data: claimed, error } = await supabase
    .from("gift_vouchers")
    .update(patch)
    .eq("id", voucher.id)
    .eq("status", "pending_payment")
    .select("id");

  if (error) {
    // The PayFast migration may not have been run — retry without its columns
    // rather than leave a paid customer with no voucher.
    const legacy = { ...patch };
    delete legacy.paid_at;
    delete legacy.pf_payment_id;
    delete legacy.payment_status_detail;

    const retry = await supabase
      .from("gift_vouchers")
      .update(legacy)
      .eq("id", voucher.id)
      .eq("status", "pending_payment")
      .select("id");

    if (retry.error) {
      console.error("[vouchers] activate failed:", retry.error.message);
      return null;
    }
    console.warn(
      "[vouchers] pf_payment_id/paid_at not stored — run scripts/sql/voucher-payfast-migration.sql"
    );
    claimed = retry.data;
  }

  // Someone else already activated it. Silence is correct here.
  if (!claimed?.length) return null;

  const activated: GiftVoucher = {
    ...voucher,
    status: "active",
    expires_at: expiresAt.toISOString(),
  };

  await resend.emails.send({
    from: FROM,
    to: voucher.recipient_email,
    subject: `You've received a Star Aesthetic Gift Voucher from ${voucher.purchaser_name} 🎁`,
    html: buildVoucherEmail(activated),
  });

  await resend.emails.send({
    from: FROM,
    to: voucher.purchaser_email,
    subject: `Your Gift Voucher has been sent to ${voucher.recipient_name}`,
    html: `<p>Hi ${voucher.purchaser_name},</p>
<p>Your R ${voucher.denomination_rands} gift voucher has been confirmed and sent to <strong>${voucher.recipient_name}</strong> at ${voucher.recipient_email}.</p>
<p>Voucher code: <strong>${voucher.code}</strong></p>
<p>Thank you for your purchase — we look forward to welcoming ${voucher.recipient_name} to Star Aesthetic Centre.</p>
<p style="margin-top:24px;color:#6B6966;font-size:12px;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>`,
  });

  return { code: voucher.code, recipient_email: voucher.recipient_email };
}

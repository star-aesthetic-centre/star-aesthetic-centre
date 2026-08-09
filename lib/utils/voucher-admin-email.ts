/**
 * Clinic notification for gift voucher orders.
 *
 * Shop orders and bookings both alert the clinic; vouchers did not. Since
 * vouchers are paid by EFT, someone has to match an incoming payment to a
 * SAC-GV- reference — with no notification, the only way to know an order
 * exists was to open the admin panel and look.
 *
 * Sent from one place so the EFT path (at purchase) and the card path (once
 * PayFast confirms) produce the same email.
 */

import { Resend } from "resend";
import { ORDER_ADMIN_EMAILS, ORDER_FROM } from "@/lib/utils/order-emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export type VoucherAdminPayload = {
  paymentReference: string;
  denominationRands: number;
  quantity: number;
  totalRands: number;
  purchaserName: string;
  purchaserEmail: string;
  purchaserPhone: string;
  recipients: string;
  message: string | null;
  paymentMethod: "bank_transfer" | "payfast";
  /** "awaiting EFT" at purchase, "paid" once PayFast confirms. */
  stage: "awaiting_payment" | "paid";
};

/**
 * Notify the clinic. Never throws — a voucher purchase must not fail because
 * the notification did not send, and the customer has already been charged
 * nothing at this point but has completed their part.
 */
export async function sendVoucherAdminNotification(
  p: VoucherAdminPayload
): Promise<{ sent: boolean; error?: string }> {
  const paid = p.stage === "paid";
  const subject = paid
    ? `Gift Voucher PAID — ${p.paymentReference} · R ${p.totalRands.toLocaleString("en-ZA")}`
    : `New Gift Voucher Order — ${p.paymentReference} · R ${p.totalRands.toLocaleString("en-ZA")} (awaiting EFT)`;

  try {
    await resend.emails.send({
      from: ORDER_FROM,
      to: ORDER_ADMIN_EMAILS,
      replyTo: p.purchaserEmail,
      subject,
      html: buildAdminVoucherEmail(p),
    });
    return { sent: true };
  } catch (err) {
    console.error(`[vouchers] clinic notification failed for ${p.paymentReference}:`, err);
    return { sent: false, error: err instanceof Error ? err.message : "send failed" };
  }
}

function row(label: string, value: string, i: number): string {
  return `<tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
    <td style="padding:10px 16px;font-size:13px;color:#6B6966;width:150px;">${label}</td>
    <td style="padding:10px 16px;font-size:13px;color:#1A1917;font-weight:600;">${value}</td>
  </tr>`;
}

function buildAdminVoucherEmail(p: VoucherAdminPayload): string {
  const paid = p.stage === "paid";
  const lines: [string, string][] = [
    ["Reference", `<strong style="color:#C8A882;">${p.paymentReference}</strong>`],
    ["Amount", `R ${p.totalRands.toLocaleString("en-ZA")}`],
    [
      "Vouchers",
      p.quantity > 1
        ? `${p.quantity} × R ${p.denominationRands.toLocaleString("en-ZA")}`
        : `1 × R ${p.denominationRands.toLocaleString("en-ZA")}`,
    ],
    ["Payment", p.paymentMethod === "payfast" ? "PayFast (card)" : "EFT / bank transfer"],
    ["Purchaser", p.purchaserName],
    ["Email", `<a href="mailto:${p.purchaserEmail}" style="color:#C8A882;">${p.purchaserEmail}</a>`],
    ["Phone", `<a href="tel:${p.purchaserPhone}" style="color:#C8A882;">${p.purchaserPhone}</a>`],
    ["Recipient(s)", p.recipients],
  ];
  if (p.message) lines.push(["Message", p.message]);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:28px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:20px;color:#C8A882;font-weight:normal;">
          ${paid ? "Gift Voucher Paid" : "New Gift Voucher Order"}
        </h1>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <div style="background:${paid ? "#F0F9F4" : "#FFF8F0"};border-left:4px solid ${paid ? "#10b981" : "#C8A882"};padding:14px 18px;margin:0 0 24px;">
          <p style="margin:0;font-size:14px;color:#1A1917;line-height:1.6;">
            ${
              paid
                ? "PayFast has confirmed payment. The voucher has been activated and emailed to the recipient automatically — no action needed."
                : `<strong>Action needed:</strong> watch for an EFT of <strong>R ${p.totalRands.toLocaleString("en-ZA")}</strong> using reference <strong>${p.paymentReference}</strong>. The voucher stays unissued until you activate it in Admin → Vouchers.`
            }
          </p>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
          ${lines.map(([l, v], i) => row(l, v, i)).join("")}
        </table>

        <p style="margin:0;font-size:13px;color:#6B6966;">
          Manage in <a href="https://staraesthetic.co.za/admin/vouchers" style="color:#C8A882;">Admin → Vouchers</a>.
        </p>
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:18px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#939EBA;">Sent automatically by staraesthetic.co.za</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

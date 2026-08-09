import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  generateVoucherCode,
  generatePaymentReference,
  generateLineReference,
  formatPurchaserName,
  MAX_VOUCHER_QUANTITY,
  VOUCHER_DENOMINATIONS,
  type VoucherTheme,
} from "@/lib/utils/vouchers";
import { BANK_DETAILS } from "@/lib/constants/banking";
import { Resend } from "resend";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/public-form-guard";
import { generateSignature, getPayFastUrl } from "@/lib/payfast";
import { getPublicSiteUrl } from "@/lib/seo";
import { sendVoucherAdminNotification } from "@/lib/utils/voucher-admin-email";

/** Mirrors the product checkout: card payments stay hidden until the flag is on. */
const PAYFAST_ENABLED = process.env.NEXT_PUBLIC_PAYFAST_ENABLED === "true";

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max - 1) + "…";
}

const resend = new Resend(process.env.RESEND_API_KEY);

type RecipientInput = { name: string; email: string };

export async function POST(req: NextRequest) {
  try {
    // This endpoint sends email via Resend — throttle to prevent abuse.
    const ip = getClientIp(req) ?? "unknown";
    if (!rateLimit(`vouchers-create:${ip}`, 5, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const {
      denomination_rands,
      quantity = 1,
      purchaser_first_name,
      purchaser_surname,
      purchaser_email,
      purchaser_phone,
      recipient_name,
      recipient_email,
      recipients,
      message,
      theme = "general",
      payment_method = "bank_transfer",
    } = body;

    if (!VOUCHER_DENOMINATIONS.includes(denomination_rands)) {
      return NextResponse.json({ error: "Invalid denomination" }, { status: 400 });
    }

    // Never let a request opt into card payments while the gateway is gated off.
    const paymentMethod = payment_method === "payfast" ? "payfast" : "bank_transfer";
    if (paymentMethod === "payfast" && !PAYFAST_ENABLED) {
      return NextResponse.json(
        { error: "Card payments are unavailable right now. Please choose EFT." },
        { status: 503 }
      );
    }

    const qty = Math.min(Math.max(1, Number(quantity) || 1), MAX_VOUCHER_QUANTITY);

    if (!purchaser_first_name?.trim() || !purchaser_email?.trim() || !purchaser_phone?.trim()) {
      return NextResponse.json({ error: "Purchaser name, email, and phone are required" }, { status: 400 });
    }

    const purchaserFullName = formatPurchaserName(purchaser_first_name, purchaser_surname);
    const purchaserEmail = purchaser_email.toLowerCase().trim();
    const purchaserPhone = purchaser_phone.trim();

    let recipientList: RecipientInput[];

    if (Array.isArray(recipients) && recipients.length > 0) {
      if (recipients.length !== qty) {
        return NextResponse.json(
          { error: `Provide exactly ${qty} recipient(s) for ${qty} voucher(s)` },
          { status: 400 }
        );
      }
      recipientList = recipients.map((r: RecipientInput) => ({
        name: r.name?.trim(),
        email: r.email?.toLowerCase().trim(),
      }));
    } else {
      if (!recipient_name?.trim() || !recipient_email?.trim()) {
        return NextResponse.json({ error: "Recipient name and email are required" }, { status: 400 });
      }
      const single: RecipientInput = {
        name: recipient_name.trim(),
        email: recipient_email.toLowerCase().trim(),
      };
      recipientList = Array.from({ length: qty }, () => single);
    }

    for (const r of recipientList) {
      if (!r.name || !r.email) {
        return NextResponse.json({ error: "Each recipient needs a name and email" }, { status: 400 });
      }
    }

    const paymentReference = generatePaymentReference();
    const totalRands = denomination_rands * qty;
    const supabase = createSupabaseAdmin();

    const rows = recipientList.map((recipient, i) => {
      const lineIndex = i + 1;
      return {
        code: generateVoucherCode(),
        order_reference: generateLineReference(paymentReference, lineIndex, qty),
        payment_reference: paymentReference,
        batch_index: lineIndex,
        batch_quantity: qty,
        denomination_rands,
        balance_rands: denomination_rands,
        status: "pending_payment" as const,
        purchaser_name: purchaserFullName,
        purchaser_surname: purchaser_surname?.trim() || null,
        purchaser_phone: purchaserPhone,
        purchaser_email: purchaserEmail,
        recipient_name: recipient.name,
        recipient_email: recipient.email,
        message: message?.trim() || null,
        theme: theme as VoucherTheme,
        payment_method: paymentMethod,
      };
    });

    let { data: vouchers, error } = await supabase.from("gift_vouchers").insert(rows).select();

    if (error) {
      // The PayFast migration may not have been run yet. EFT orders must keep
      // working regardless — only the card path genuinely needs the column.
      const legacyRows = rows.map(({ payment_method: _pm, ...rest }) => rest);
      const retry = await supabase.from("gift_vouchers").insert(legacyRows).select();

      if (retry.error) {
        // Log the real Postgres message — "Failed to create voucher(s)" alone
        // hid a missing-column fault on production for three months.
        console.error("[vouchers] insert failed:", retry.error.message, retry.error);
        return NextResponse.json({ error: "Failed to create voucher(s)" }, { status: 500 });
      }

      console.warn(
        "[vouchers] payment_method not stored — run scripts/sql/voucher-payfast-migration.sql"
      );
      vouchers = retry.data;

      if (paymentMethod === "payfast") {
        return NextResponse.json(
          { error: "Card payments are unavailable right now. Please choose EFT." },
          { status: 503 }
        );
      }
    }

    if (!vouchers?.length) {
      console.error("[vouchers] insert returned no rows");
      return NextResponse.json({ error: "Failed to create voucher(s)" }, { status: 500 });
    }

    const uniqueRecipients = [...new Set(recipientList.map((r) => r.name))];

    // ── Card payment: hand the signed form back, send no EFT instructions ────
    // The voucher stays pending_payment until the ITN confirms the money.
    if (paymentMethod === "payfast") {
      const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "";
      const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "";
      const passphrase = process.env.PAYFAST_PASSPHRASE || "";

      if (!merchantId || !merchantKey) {
        console.error("[vouchers] PayFast merchant credentials not configured");
        return NextResponse.json(
          { error: "Card payments are unavailable right now. Please choose EFT." },
          { status: 503 }
        );
      }

      const siteUrl = getPublicSiteUrl();
      const ref = encodeURIComponent(paymentReference);

      const orderedParams: [string, string][] = [
        ["merchant_id", merchantId],
        ["merchant_key", merchantKey],
        ["return_url", `${siteUrl}/gift-vouchers/pending?ref=${ref}`],
        ["cancel_url", `${siteUrl}/gift-vouchers/pending?ref=${ref}&cancelled=1`],
        // Vouchers notify their own endpoint — the order ITN only knows orders.
        ["notify_url", `${siteUrl}/api/payfast/voucher-itn`],
        ["name_first", purchaser_first_name.trim()],
        ["name_last", purchaser_surname?.trim() || ""],
        ["email_address", purchaserEmail],
        ["cell_number", purchaserPhone],
        ["m_payment_id", paymentReference],
        ["amount", totalRands.toFixed(2)],
        ["item_name", truncate(`Star Aesthetic Gift Voucher — ${paymentReference}`, 100)],
        [
          "item_description",
          truncate(
            qty > 1
              ? `${qty} × R ${denomination_rands} gift vouchers`
              : `R ${denomination_rands} gift voucher`,
            255
          ),
        ],
      ];

      const pfParams: Record<string, string> = Object.fromEntries(orderedParams);
      pfParams.signature = generateSignature(orderedParams, passphrase);

      return NextResponse.json({
        success: true,
        method: "payfast",
        payment_reference: paymentReference,
        quantity: qty,
        total_rands: totalRands,
        denomination_rands,
        payfastUrl: getPayFastUrl(),
        params: pfParams,
      });
    }

    await resend.emails.send({
      from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
      to: purchaserEmail,
      subject: `Your Gift Voucher Order — ${paymentReference}`,
      html: buildPurchaserEmail({
        purchaserName: purchaserFullName,
        paymentReference,
        denominationRands: denomination_rands,
        quantity: qty,
        totalRands,
        recipientsSummary: uniqueRecipients.join(", "),
        bankDetails: BANK_DETAILS,
      }),
    });

    // Tell the clinic. EFT means someone has to match an incoming payment to
    // this reference — without this the order was invisible until an admin
    // happened to look. Deliberately after the purchaser email and never
    // allowed to fail the request.
    await sendVoucherAdminNotification({
      paymentReference,
      denominationRands: denomination_rands,
      quantity: qty,
      totalRands,
      purchaserName: purchaserFullName,
      purchaserEmail,
      purchaserPhone,
      recipients: uniqueRecipients.join(", "),
      message: message?.trim() || null,
      paymentMethod: "bank_transfer",
      stage: "awaiting_payment",
    });

    return NextResponse.json({
      success: true,
      method: "bank_transfer",
      payment_reference: paymentReference,
      order_reference: paymentReference,
      quantity: qty,
      total_rands: totalRands,
      denomination_rands,
      recipient_name: uniqueRecipients.length === 1 ? uniqueRecipients[0] : `${qty} recipients`,
    });
  } catch (err) {
    console.error("Voucher create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function buildPurchaserEmail({
  purchaserName,
  paymentReference,
  denominationRands,
  quantity,
  totalRands,
  recipientsSummary,
  bankDetails,
}: {
  purchaserName: string;
  paymentReference: string;
  denominationRands: number;
  quantity: number;
  totalRands: number;
  recipientsSummary: string;
  bankDetails: typeof BANK_DETAILS;
}) {
  const lineSummary =
    quantity > 1
      ? `${quantity} × R ${denominationRands.toLocaleString("en-ZA")} vouchers`
      : `R ${denominationRands.toLocaleString("en-ZA")} gift voucher`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F8F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F7;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #E5E4E0;">
      <tr><td style="background:#0F2647;padding:32px 40px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#939EBA;text-transform:uppercase;">Star Aesthetic Centre</p>
        <h1 style="margin:0;font-size:22px;color:#C8A882;font-weight:normal;">Gift Voucher — Payment Instructions</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${purchaserName},</p>
        <p style="margin:0 0 24px;font-size:14px;color:#6B6966;line-height:1.6;">
          Thank you for ordering ${lineSummary} for <strong style="color:#1A1917;">${recipientsSummary}</strong>.
          Please complete your EFT payment using the details below.
          Once payment is confirmed, each voucher will be emailed to its recipient.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2647;margin:0 0 24px;">
          <tr><td style="padding:24px 32px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;">Amount to Pay</p>
            <p style="margin:0;font-size:40px;font-weight:bold;color:#C8A882;font-family:Georgia,serif;">R ${totalRands.toLocaleString("en-ZA")}</p>
            ${quantity > 1 ? `<p style="margin:8px 0 0;font-size:13px;color:#939EBA;">${quantity} × R ${denominationRands.toLocaleString("en-ZA")}</p>` : ""}
          </td></tr>
        </table>

        <h3 style="margin:0 0 16px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#1A1917;">EFT Banking Details</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E4E0;">
          ${[
            ["Bank", bankDetails.bank],
            ["Account Name", bankDetails.accountName],
            ["Account No", bankDetails.accountNo],
            ["Branch Code", bankDetails.branchCode],
            ["Account Type", bankDetails.accountType],
            ["Reference", `<strong style="color:#C8A882;">${paymentReference}</strong>`],
          ].map(([label, value], i) => `
          <tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
            <td style="padding:10px 16px;font-size:13px;color:#6B6966;width:140px;">${label}</td>
            <td style="padding:10px 16px;font-size:13px;color:#1A1917;font-weight:600;">${value}</td>
          </tr>`).join("")}
        </table>

        <div style="background:#FFF8F0;border:1px solid #C8A882;border-left:4px solid #C8A882;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0;font-size:13px;color:#6B6966;line-height:1.6;">
            <strong style="color:#1A1917;">Important:</strong> Use reference <strong style="color:#C8A882;">${paymentReference}</strong> when making payment.
            Please email your proof of payment to <a href="mailto:${bankDetails.email}" style="color:#C8A882;">${bankDetails.email}</a>.
          </p>
        </div>

        <p style="margin:0;font-size:13px;color:#6B6966;">
          Questions? Call <a href="tel:+27315731325" style="color:#C8A882;">+27 (0)31 573 1325</a> or reply to this email.
        </p>
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:20px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#6B6966;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
        <p style="margin:4px 0 0;font-size:11px;color:#939EBA;">Payment Reference: ${paymentReference}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

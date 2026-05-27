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

const resend = new Resend(process.env.RESEND_API_KEY);

type RecipientInput = { name: string; email: string };

export async function POST(req: NextRequest) {
  try {
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
    } = body;

    if (!VOUCHER_DENOMINATIONS.includes(denomination_rands)) {
      return NextResponse.json({ error: "Invalid denomination" }, { status: 400 });
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
      };
    });

    const { data: vouchers, error } = await supabase.from("gift_vouchers").insert(rows).select();

    if (error || !vouchers?.length) {
      console.error("Voucher insert error:", error);
      return NextResponse.json({ error: "Failed to create voucher(s)" }, { status: 500 });
    }

    const uniqueRecipients = [...new Set(recipientList.map((r) => r.name))];

    await resend.emails.send({
      from: "Star Aesthetic Centre <bookings@staraesthetic.co.za>",
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

    return NextResponse.json({
      success: true,
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

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { generateVoucherCode, generateOrderReference, type VoucherTheme } from "@/lib/utils/vouchers";
import { BANK_DETAILS } from "@/lib/constants/banking";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      denomination_rands,
      purchaser_name,
      purchaser_email,
      recipient_name,
      recipient_email,
      message,
      theme = "general",
    } = body;

    // Validate
    if (![250, 500, 750, 1000].includes(denomination_rands)) {
      return NextResponse.json({ error: "Invalid denomination" }, { status: 400 });
    }
    if (!purchaser_name || !purchaser_email || !recipient_name || !recipient_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const code = generateVoucherCode();
    const orderReference = generateOrderReference();

    const supabase = createSupabaseAdmin();

    const { data: voucher, error } = await supabase
      .from("gift_vouchers")
      .insert({
        code,
        order_reference: orderReference,
        denomination_rands,
        balance_rands: denomination_rands,
        status: "pending_payment",
        purchaser_name,
        purchaser_email: purchaser_email.toLowerCase().trim(),
        recipient_name,
        recipient_email: recipient_email.toLowerCase().trim(),
        message: message || null,
        theme: theme as VoucherTheme,
      })
      .select()
      .single();

    if (error || !voucher) {
      console.error("Voucher insert error:", error);
      return NextResponse.json({ error: "Failed to create voucher" }, { status: 500 });
    }

    // Send EFT payment instructions to purchaser
    await resend.emails.send({
      from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
      to: purchaser_email,
      subject: `Your Gift Voucher Order — ${orderReference}`,
      html: buildPurchaserEmail({ voucher, orderReference, bankDetails: BANK_DETAILS }),
    });

    return NextResponse.json({
      success: true,
      order_reference: orderReference,
      denomination_rands,
      recipient_name,
    });
  } catch (err) {
    console.error("Voucher create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function buildPurchaserEmail({ voucher, orderReference, bankDetails }: {
  voucher: any;
  orderReference: string;
  bankDetails: typeof BANK_DETAILS;
}) {
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
        <p style="margin:0 0 20px;font-size:15px;color:#1A1917;">Hi ${voucher.purchaser_name},</p>
        <p style="margin:0 0 24px;font-size:14px;color:#6B6966;line-height:1.6;">
          Thank you for ordering a gift voucher for <strong style="color:#1A1917;">${voucher.recipient_name}</strong>.
          Please complete your EFT payment using the details below.
          Once payment is confirmed, the voucher will be emailed directly to ${voucher.recipient_email}.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2647;margin:0 0 24px;">
          <tr><td style="padding:24px 32px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#939EBA;text-transform:uppercase;">Amount to Pay</p>
            <p style="margin:0;font-size:40px;font-weight:bold;color:#C8A882;font-family:Georgia,serif;">R ${voucher.denomination_rands.toLocaleString("en-ZA")}</p>
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
            ["Reference", `<strong style="color:#C8A882;">${orderReference}</strong>`],
          ].map(([label, value], i) => `
          <tr style="background:${i % 2 === 0 ? "#fff" : "#F8F8F7"};">
            <td style="padding:10px 16px;font-size:13px;color:#6B6966;width:140px;">${label}</td>
            <td style="padding:10px 16px;font-size:13px;color:#1A1917;font-weight:600;">${value}</td>
          </tr>`).join("")}
        </table>

        <div style="background:#FFF8F0;border:1px solid #C8A882;border-left:4px solid #C8A882;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0;font-size:13px;color:#6B6966;line-height:1.6;">
            <strong style="color:#1A1917;">Important:</strong> Use reference <strong style="color:#C8A882;">${orderReference}</strong> when making payment.
            Please email your proof of payment to <a href="mailto:${bankDetails.email}" style="color:#C8A882;">${bankDetails.email}</a>.
          </p>
        </div>

        <p style="margin:0;font-size:13px;color:#6B6966;">
          Questions? Call <a href="tel:+27315731325" style="color:#C8A882;">+27 (0)31 573 1325</a> or reply to this email.
        </p>
      </td></tr>
      <tr><td style="background:#F8F8F7;padding:20px 40px;border-top:1px solid #E5E4E0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#6B6966;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>
        <p style="margin:4px 0 0;font-size:11px;color:#939EBA;">Order Reference: ${orderReference}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

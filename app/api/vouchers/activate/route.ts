import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { buildVoucherEmail } from "@/lib/utils/vouchers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** POST /api/vouchers/activate
 *  Called by admin after confirming EFT payment.
 *  Sets status to "active", sets expiry (3 years), sends voucher email to recipient.
 *  Protected by admin session cookie.
 */
export async function POST(req: NextRequest) {
  // Admin auth check
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { order_reference } = await req.json();
  if (!order_reference) {
    return NextResponse.json({ error: "order_reference required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: voucher, error } = await supabase
    .from("gift_vouchers")
    .select("*")
    .eq("order_reference", order_reference)
    .single();

  if (error || !voucher) {
    return NextResponse.json({ error: "Voucher not found" }, { status: 404 });
  }

  if (voucher.status !== "pending_payment") {
    return NextResponse.json({ error: `Voucher is already ${voucher.status}` }, { status: 400 });
  }

  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 3);

  const { error: updateError } = await supabase
    .from("gift_vouchers")
    .update({
      status: "active",
      activated_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
    })
    .eq("id", voucher.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Fetch updated voucher with expiry for email
  const activatedVoucher = { ...voucher, status: "active", expires_at: expiresAt.toISOString() };

  // Send voucher to recipient
  await resend.emails.send({
    from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
    to: voucher.recipient_email,
    subject: `You've received a Star Aesthetic Gift Voucher from ${voucher.purchaser_name} 🎁`,
    html: buildVoucherEmail(activatedVoucher),
  });

  // Notify purchaser that it's been sent
  await resend.emails.send({
    from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
    to: voucher.purchaser_email,
    subject: `Your Gift Voucher has been sent to ${voucher.recipient_name}`,
    html: `<p>Hi ${voucher.purchaser_name},</p>
<p>Your R ${voucher.denomination_rands} gift voucher has been confirmed and sent to <strong>${voucher.recipient_name}</strong> at ${voucher.recipient_email}.</p>
<p>Voucher code: <strong>${voucher.code}</strong></p>
<p>Thank you for your purchase — we look forward to welcoming ${voucher.recipient_name} to Star Aesthetic Centre.</p>
<p style="margin-top:24px;color:#6B6966;font-size:12px;">Star Aesthetic Centre · 22 Ennisdale Drive, Durban North, 4051</p>`,
  });

  return NextResponse.json({ success: true, code: voucher.code, recipient_email: voucher.recipient_email });
}

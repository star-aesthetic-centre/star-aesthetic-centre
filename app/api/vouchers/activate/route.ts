import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { buildVoucherEmail, type GiftVoucher } from "@/lib/utils/vouchers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** POST /api/vouchers/activate
 *  Body: { order_reference } — single line, OR
 *        { payment_reference } — activate all pending in batch
 */
export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { order_reference, payment_reference } = body;

  if (!order_reference && !payment_reference) {
    return NextResponse.json({ error: "order_reference or payment_reference required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  let query = supabase.from("gift_vouchers").select("*").eq("status", "pending_payment");

  if (payment_reference) {
    query = query.or(`payment_reference.eq.${payment_reference},order_reference.eq.${payment_reference}`);
  } else {
    query = query.eq("order_reference", order_reference);
  }

  const { data: pending, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!pending?.length) {
    return NextResponse.json({ error: "No pending voucher(s) found" }, { status: 404 });
  }

  const activated: { code: string; recipient_email: string }[] = [];

  for (const voucher of pending) {
    const result = await activateOne(supabase, voucher as GiftVoucher);
    if (result) activated.push(result);
  }

  return NextResponse.json({
    success: true,
    count: activated.length,
    vouchers: activated,
    recipient_email: activated.length === 1 ? activated[0].recipient_email : undefined,
  });
}

async function activateOne(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  voucher: GiftVoucher
) {
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
    console.error("Activate error:", updateError);
    return null;
  }

  const activatedVoucher: GiftVoucher = {
    ...voucher,
    status: "active",
    expires_at: expiresAt.toISOString(),
  };

  await resend.emails.send({
    from: "Star Aesthetic Centre <bookings@staraesthetic.site>",
    to: voucher.recipient_email,
    subject: `You've received a Star Aesthetic Gift Voucher from ${voucher.purchaser_name} 🎁`,
    html: buildVoucherEmail(activatedVoucher),
  });

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

  return { code: voucher.code, recipient_email: voucher.recipient_email };
}

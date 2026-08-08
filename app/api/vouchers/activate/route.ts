import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { type GiftVoucher } from "@/lib/utils/vouchers";
import { activateVoucher } from "@/lib/utils/voucher-activation";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";

/** POST /api/vouchers/activate
 *  Body: { order_reference } — single line, OR
 *        { payment_reference } — activate all pending in batch
 */
export async function POST(req: NextRequest) {
  if (!(await isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value))) {
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
    const result = await activateVoucher(supabase, voucher as GiftVoucher);
    if (result) activated.push(result);
  }

  return NextResponse.json({
    success: true,
    count: activated.length,
    vouchers: activated,
    recipient_email: activated.length === 1 ? activated[0].recipient_email : undefined,
  });
}


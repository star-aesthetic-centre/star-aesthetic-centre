import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

/** GET /api/vouchers/validate?code=SAC-XXXX-XXXX-XXXX
 *  Returns voucher status and available balance for checkout redemption.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")?.toUpperCase().trim();

  if (!code) {
    return NextResponse.json({ valid: false, error: "Code required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { data: voucher } = await supabase
    .from("gift_vouchers")
    .select("code, status, balance_rands, denomination_rands, expires_at, recipient_name")
    .eq("code", code)
    .single();

  if (!voucher) {
    return NextResponse.json({ valid: false, error: "Voucher not found" });
  }

  if (voucher.status === "pending_payment") {
    return NextResponse.json({ valid: false, error: "Voucher payment not yet confirmed" });
  }
  if (voucher.status === "redeemed") {
    return NextResponse.json({ valid: false, error: "Voucher has been fully redeemed" });
  }
  if (voucher.status === "expired") {
    return NextResponse.json({ valid: false, error: "Voucher has expired" });
  }
  if (voucher.status === "cancelled") {
    return NextResponse.json({ valid: false, error: "Voucher has been cancelled" });
  }

  if (voucher.expires_at && new Date(voucher.expires_at) < new Date()) {
    // Auto-expire
    await supabase.from("gift_vouchers").update({ status: "expired" }).eq("code", code);
    return NextResponse.json({ valid: false, error: "Voucher has expired" });
  }

  return NextResponse.json({
    valid: true,
    balance_rands: voucher.balance_rands,
    recipient_name: voucher.recipient_name,
  });
}

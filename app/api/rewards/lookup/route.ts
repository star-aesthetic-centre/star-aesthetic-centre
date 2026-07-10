import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/public-form-guard";

export async function GET(req: NextRequest) {
  // Throttle to prevent bulk enumeration of loyalty accounts by email.
  const ip = getClientIp(req) ?? "unknown";
  if (!rateLimit(`rewards-lookup:${ip}`, 15, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: account, error } = await supabase
    .from("loyalty_accounts")
    .select("id, first_name, last_name, balance_rands, total_earned, total_redeemed, created_at")
    .eq("email", email)
    .single();

  if (error || !account) {
    return NextResponse.json({ found: false });
  }

  const { data: ledger } = await supabase
    .from("rewards_ledger")
    .select("id, type, amount_rands, description, reference_type, created_at")
    .eq("account_id", account.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({
    found: true,
    account: {
      first_name: account.first_name,
      last_name: account.last_name,
      balance_rands: account.balance_rands,
      total_earned: account.total_earned,
      total_redeemed: account.total_redeemed,
      member_since: account.created_at,
    },
    recent: ledger ?? [],
  });
}

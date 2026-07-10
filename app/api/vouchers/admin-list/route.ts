import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data: vouchers } = await supabase
    .from("gift_vouchers")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ vouchers: vouchers ?? [] });
}

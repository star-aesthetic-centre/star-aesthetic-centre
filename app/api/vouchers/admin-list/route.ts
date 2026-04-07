import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data: vouchers } = await supabase
    .from("gift_vouchers")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ vouchers: vouchers ?? [] });
}

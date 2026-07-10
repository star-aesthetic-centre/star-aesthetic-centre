import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";

async function isAdmin(req: NextRequest): Promise<boolean> {
  return isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 100), 200);

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("niki_sessions")
    .select(
      "id, session_id, treatment_page, transcript, contact_name, contact_phone, contact_email, duration_seconds, started_at, created_at"
    )
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sessions: data ?? [] });
}

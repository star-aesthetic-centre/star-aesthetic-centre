import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

// Vercel cron hits this every 4 days to prevent Supabase free-tier pausing.
// Protected by CRON_SECRET so only Vercel (or you) can trigger it.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createSupabaseAdmin();
    // Lightweight ping — count 1 row from any table
    const { error } = await supabase.from("products").select("id", { count: "exact", head: true });

    if (error) {
      console.error("[keep-alive] Supabase ping failed:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    console.log("[keep-alive] Supabase ping OK at", new Date().toISOString());
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

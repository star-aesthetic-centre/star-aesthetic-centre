import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { isHoneypotTripped } from "@/lib/security/signup-guard";

/** Email lookup until password / magic-link auth is added */
export async function POST(req: NextRequest) {
  let body: { email?: string; turnstileToken?: string; website?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (isHoneypotTripped(body.website)) {
    return NextResponse.json({ found: false });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  const captcha = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.error }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const [{ data: member }, { data: loyalty }] = await Promise.all([
    supabase
      .from("site_members")
      .select("first_name, last_name, email, created_at")
      .eq("email", email)
      .maybeSingle(),
    supabase
      .from("loyalty_accounts")
      .select("first_name, last_name, email, created_at")
      .eq("email", email)
      .maybeSingle(),
  ]);

  const account = member ?? loyalty;
  if (!account) {
    return NextResponse.json({
      found: false,
      message: "No member account found for this email. You can sign up below.",
    });
  }

  return NextResponse.json({
    found: true,
    member: {
      firstName: account.first_name,
      lastName: account.last_name,
      email: account.email,
      memberSince: account.created_at,
    },
    dashboardReady: false,
    message:
      "Your member dashboard — order history and Star Light Rewards — is coming soon. Use the links below in the meantime.",
  });
}

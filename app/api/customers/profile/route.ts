import { NextRequest, NextResponse } from "next/server";
import { getCustomerProfileByEmail, profileToCheckoutBilling } from "@/lib/crm/profiles";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/public-form-guard";

/** Lookup saved billing profile for checkout autofill */
export async function GET(req: NextRequest) {
  // Throttle to prevent harvesting saved billing details by guessing emails.
  const ip = getClientIp(req) ?? "unknown";
  if (!rateLimit(`customer-profile:${ip}`, 15, 60_000)) {
    return NextResponse.json({ found: false }, { status: 429 });
  }

  const email = req.nextUrl.searchParams.get("email")?.trim();
  if (!email?.includes("@")) {
    return NextResponse.json({ found: false }, { status: 400 });
  }

  const { profile, error } = await getCustomerProfileByEmail(email);
  if (error) {
    return NextResponse.json({ found: false, error }, { status: 500 });
  }
  if (!profile) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    isTest: profile.isTest,
    billing: profileToCheckoutBilling(profile),
  });
}

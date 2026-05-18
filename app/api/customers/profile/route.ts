import { NextRequest, NextResponse } from "next/server";
import { getCustomerProfileByEmail, profileToCheckoutBilling } from "@/lib/crm/profiles";

/** Lookup saved billing profile for checkout autofill */
export async function GET(req: NextRequest) {
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

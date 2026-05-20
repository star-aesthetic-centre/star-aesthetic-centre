import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/crm/leads";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  isHoneypotTripped,
  isSuspiciousSignupEmail,
  isValidSaPhone,
  normalizeSaPhone,
} from "@/lib/security/signup-guard";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

export async function POST(req: NextRequest) {
  let body: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    interest?: string;
    comment?: string;
    turnstileToken?: string;
    website?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (isHoneypotTripped(body.website)) {
    return NextResponse.json({ success: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  const captcha = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.error }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phoneRaw = body.phone?.trim() ?? "";
  const interest = body.interest?.trim() || null;
  const comment = body.comment?.trim() || null;

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First name and last name are required." }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (isSuspiciousSignupEmail(email)) {
    return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
  }
  if (!phoneRaw || !isValidSaPhone(phoneRaw)) {
    return NextResponse.json(
      { error: "Please enter a valid South African mobile number." },
      { status: 400 }
    );
  }

  const phone = normalizeSaPhone(phoneRaw);
  const supabase = createSupabaseAdmin();

  const { data: existingMember } = await supabase
    .from("site_members")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingMember) {
    return NextResponse.json(
      {
        error:
          "An account with this email already exists. Please sign in or use a different email.",
      },
      { status: 409 }
    );
  }

  const { error: memberError } = await supabase.from("site_members").insert({
    email,
    first_name: firstName,
    last_name: lastName,
    phone,
    interest,
    comment,
    updated_at: new Date().toISOString(),
  });

  if (memberError) {
    console.error("[member/signup] site_members:", memberError);
    if (memberError.code === "42P01") {
      return NextResponse.json(
        {
          error:
            "Member signup is not fully configured yet. Please call the clinic or use the contact form.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Could not create your account. Please try again or call the clinic." },
      { status: 500 }
    );
  }

  await supabase.from("customer_profiles").upsert(
    {
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  const { data: loyaltyExisting } = await supabase
    .from("loyalty_accounts")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!loyaltyExisting) {
    const { data: account, error: loyaltyError } = await supabase
      .from("loyalty_accounts")
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
      })
      .select("id")
      .single();

    if (!loyaltyError && account) {
      await supabase.from("rewards_ledger").insert({
        account_id: account.id,
        type: "adjustment",
        amount_rands: 0,
        description: "Welcome — member signup",
        reference_type: "manual",
        created_by: "member_signup",
      });
    }
  }

  const interestType =
    interest?.toLowerCase().includes("product") || interest?.toLowerCase().includes("skincare")
      ? "product"
      : interest?.toLowerCase().includes("treatment") ||
          interest?.toLowerCase().includes("consultation")
        ? "treatment"
        : "general";

  await createLead({
    email,
    phone,
    firstName,
    lastName,
    source: "other",
    interestType,
    interestValue: interest,
    notes: comment,
    metadata: { type: "member_signup", interest, comment },
  });

  return NextResponse.json({
    success: true,
    member: { firstName, lastName, email },
  });
}

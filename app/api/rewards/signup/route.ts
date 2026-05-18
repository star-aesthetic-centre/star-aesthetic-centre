import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  let body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body.email?.toLowerCase().trim();
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const phone = body.phone?.trim() || null;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First name and surname are required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: existing } = await supabase
    .from("loyalty_accounts")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Use Check Your Balance below." },
      { status: 409 }
    );
  }

  const { data: account, error } = await supabase
    .from("loyalty_accounts")
    .insert({
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    })
    .select("id, first_name, last_name, email, created_at")
    .single();

  if (error || !account) {
    console.error("rewards signup error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Could not create your account. Please call the clinic." },
      { status: 500 }
    );
  }

  await supabase.from("rewards_ledger").insert({
    account_id: account.id,
    type: "adjustment",
    amount_rands: 0,
    description: "Welcome — Star Light Rewards membership",
    reference_type: "manual",
    created_by: "signup",
  });

  return NextResponse.json({
    success: true,
    account: {
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      member_since: account.created_at,
    },
  });
}

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

/** Look up an account + last 20 ledger entries by email */
export async function lookupAccount(email: string) {
  const supabase = createSupabaseAdmin();
  const { data: account } = await supabase
    .from("loyalty_accounts")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!account) return { account: null, ledger: [] };

  const { data: ledger } = await supabase
    .from("rewards_ledger")
    .select("*")
    .eq("account_id", account.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return { account, ledger: ledger ?? [] };
}

/** Create a new loyalty account (called by Nakita after a treatment) */
export async function createAccount(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("loyalty_accounts").insert({
    email: data.email.toLowerCase().trim(),
    first_name: data.firstName.trim(),
    last_name: data.lastName.trim(),
    phone: data.phone?.trim() || null,
  });
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/rewards");
  return { success: true };
}

/** Credit rewards to an account (after treatment payment or manual adjustment) */
export async function creditReward(data: {
  email: string;
  amountRands: number;
  description: string;
  referenceType: "treatment" | "product" | "manual";
  referenceId?: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();

  const { data: account } = await supabase
    .from("loyalty_accounts")
    .select("id, balance_rands, total_earned")
    .eq("email", data.email.toLowerCase().trim())
    .single();

  if (!account) return { success: false, error: "Account not found" };

  const { error: ledgerError } = await supabase.from("rewards_ledger").insert({
    account_id: account.id,
    type: "earn",
    amount_rands: data.amountRands,
    description: data.description,
    reference_type: data.referenceType,
    reference_id: data.referenceId ?? null,
    created_by: "admin",
  });

  if (ledgerError) return { success: false, error: ledgerError.message };

  const { error: updateError } = await supabase
    .from("loyalty_accounts")
    .update({
      balance_rands: account.balance_rands + data.amountRands,
      total_earned: account.total_earned + data.amountRands,
      updated_at: new Date().toISOString(),
    })
    .eq("id", account.id);

  if (updateError) return { success: false, error: updateError.message };

  revalidatePath("/admin/rewards");
  return { success: true };
}

/** Redeem / deduct from an account */
export async function redeemReward(data: {
  email: string;
  amountRands: number;
  description: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();

  const { data: account } = await supabase
    .from("loyalty_accounts")
    .select("id, balance_rands, total_redeemed")
    .eq("email", data.email.toLowerCase().trim())
    .single();

  if (!account) return { success: false, error: "Account not found" };
  if (account.balance_rands < data.amountRands) {
    return { success: false, error: "Insufficient balance" };
  }

  const { error: ledgerError } = await supabase.from("rewards_ledger").insert({
    account_id: account.id,
    type: "redeem",
    amount_rands: -data.amountRands,
    description: data.description,
    reference_type: "redemption",
    created_by: "admin",
  });

  if (ledgerError) return { success: false, error: ledgerError.message };

  await supabase
    .from("loyalty_accounts")
    .update({
      balance_rands: account.balance_rands - data.amountRands,
      total_redeemed: account.total_redeemed + data.amountRands,
      updated_at: new Date().toISOString(),
    })
    .eq("id", account.id);

  revalidatePath("/admin/rewards");
  return { success: true };
}

/** Fetch all accounts for the admin list view */
export async function getAllAccounts() {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("loyalty_accounts")
    .select("id, email, first_name, last_name, phone, balance_rands, total_earned, total_redeemed, created_at")
    .order("balance_rands", { ascending: false });
  return data ?? [];
}

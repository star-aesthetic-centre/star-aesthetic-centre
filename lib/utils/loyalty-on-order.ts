import type { SupabaseClient } from "@supabase/supabase-js";
import { calculateStarlights } from "@/lib/utils/rewards";

type BillingForLoyalty = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type OrderLoyaltyResult = {
  starlightsEarned: number;
  isNewMember: boolean;
  hasAccount: boolean;
};

/**
 * Ensures a Star Light Rewards account exists for the checkout email.
 * Does not credit Star Lights yet — shop orders are EFT; credit when payment is confirmed.
 */
export async function ensureLoyaltyAccountForOrder(
  supabase: SupabaseClient,
  billing: BillingForLoyalty,
  totalCents: number
): Promise<OrderLoyaltyResult> {
  const starlightsEarned = calculateStarlights(totalCents / 100);
  const email = billing.email.toLowerCase().trim();

  const { data: existing } = await supabase
    .from("loyalty_accounts")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return { starlightsEarned, isNewMember: false, hasAccount: true };
  }

  const { data: created, error } = await supabase
    .from("loyalty_accounts")
    .insert({
      email,
      first_name: billing.firstName.trim(),
      last_name: billing.lastName.trim(),
      phone: billing.phone.trim() || null,
    })
    .select("id")
    .single();

  if (error || !created) {
    console.warn("[orders] Could not auto-create loyalty account:", error?.message);
    return { starlightsEarned, isNewMember: false, hasAccount: false };
  }

  await supabase.from("rewards_ledger").insert({
    account_id: created.id,
    type: "adjustment",
    amount_rands: 0,
    description: "Welcome — Star Light Rewards (online shop)",
    reference_type: "manual",
    created_by: "order",
  });

  return { starlightsEarned, isNewMember: true, hasAccount: true };
}

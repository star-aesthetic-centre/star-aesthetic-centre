import type { SupabaseClient } from "@supabase/supabase-js";
import { ensureLoyaltyAccountForOrder } from "@/lib/utils/loyalty-on-order";
import { calculateStarlights } from "@/lib/utils/rewards";

export type ShopOrderRow = {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  total_cents: number;
  status: string;
};

export type CreditOrderStarlightsResult = {
  starlights: number;
  credited: boolean;
  alreadyCredited: boolean;
  isNewMember: boolean;
  error?: string;
};

/** True if this order reference already has a product earn in the ledger */
export async function orderStarlightsAlreadyCredited(
  supabase: SupabaseClient,
  orderReference: string
): Promise<boolean> {
  const { data } = await supabase
    .from("rewards_ledger")
    .select("id")
    .eq("reference_type", "product")
    .eq("reference_id", orderReference)
    .limit(1)
    .maybeSingle();

  return Boolean(data);
}

/**
 * Credits Starlights for a paid shop order (idempotent).
 * 1 Starlight = R1; amount = 10% of order total.
 */
export async function creditOrderStarlights(
  supabase: SupabaseClient,
  order: ShopOrderRow
): Promise<CreditOrderStarlightsResult> {
  const starlights = calculateStarlights(order.total_cents / 100);
  if (starlights <= 0) {
    return { starlights: 0, credited: false, alreadyCredited: false, isNewMember: false };
  }

  const alreadyCredited = await orderStarlightsAlreadyCredited(supabase, order.reference);
  if (alreadyCredited) {
    return { starlights, credited: false, alreadyCredited: true, isNewMember: false };
  }

  const nameParts = order.customer_name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") || firstName;

  const loyalty = await ensureLoyaltyAccountForOrder(
    supabase,
    {
      email: order.customer_email,
      firstName,
      lastName,
      phone: order.customer_phone ?? "",
    },
    order.total_cents
  );

  if (!loyalty.hasAccount) {
    return {
      starlights,
      credited: false,
      alreadyCredited: false,
      isNewMember: false,
      error: "Could not find or create a Starlight Rewards account for this customer.",
    };
  }

  const { data: account } = await supabase
    .from("loyalty_accounts")
    .select("id, balance_rands, total_earned")
    .eq("email", order.customer_email.toLowerCase().trim())
    .single();

  if (!account) {
    return {
      starlights,
      credited: false,
      alreadyCredited: false,
      isNewMember: loyalty.isNewMember,
      error: "Loyalty account not found after setup.",
    };
  }

  const description = `Online shop order #${order.reference}`;

  const { error: ledgerError } = await supabase.from("rewards_ledger").insert({
    account_id: account.id,
    type: "earn",
    amount_rands: starlights,
    description,
    reference_type: "product",
    reference_id: order.reference,
    created_by: "order_confirm",
  });

  if (ledgerError) {
    return {
      starlights,
      credited: false,
      alreadyCredited: false,
      isNewMember: loyalty.isNewMember,
      error: ledgerError.message,
    };
  }

  const { error: updateError } = await supabase
    .from("loyalty_accounts")
    .update({
      balance_rands: account.balance_rands + starlights,
      total_earned: account.total_earned + starlights,
      updated_at: new Date().toISOString(),
    })
    .eq("id", account.id);

  if (updateError) {
    return {
      starlights,
      credited: false,
      alreadyCredited: false,
      isNewMember: loyalty.isNewMember,
      error: updateError.message,
    };
  }

  return {
    starlights,
    credited: true,
    alreadyCredited: false,
    isNewMember: loyalty.isNewMember,
  };
}

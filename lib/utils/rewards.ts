/**
 * Starlight Rewards — Star Aesthetic Centre
 *
 * 1 Starlight = R1 of rewards value
 * Earning rate: 10% of spend in Starlights
 *
 * Examples:
 *   R 665   →  66 Starlights
 *   R 1,240 → 124 Starlights
 *   R 1,900 → 190 Starlights
 *   R 5,440 → 544 Starlights
 */

/** Calculate Starlights earned — 10% of price, rounded to nearest integer */
export function calculateStarlights(priceRands: number): number {
  if (priceRands <= 0) return 0;
  return Math.round(priceRands * 0.1);
}

/** Format as "124 Starlights" */
export function formatStarlights(amount: number): string {
  return `${amount.toLocaleString("en-ZA")} Starlights`;
}

/** Legacy — kept for backwards compatibility */
export function calculateReward(priceRands: number): number {
  return calculateStarlights(priceRands);
}

export function formatRewardRands(amount: number): string {
  return `R ${amount.toLocaleString("en-ZA")}`;
}

export type LedgerEntry = {
  id: string;
  type: "earn" | "redeem" | "adjustment";
  amount_rands: number;
  description: string;
  reference_type: string | null;
  created_at: string;
  created_by: string | null;
};

export type LoyaltyAccount = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  balance_rands: number;
  total_earned: number;
  total_redeemed: number;
  created_at: string;
};

/**
 * Rewards programme utilities — Star Aesthetic Centre
 *
 * Earning rate: 10% of spend, rounded to the nearest R 10.
 *
 * Examples:
 *   R 665   → R  70
 *   R 745   → R  70 (rounds down)
 *   R 1,900 → R 190
 *   R 5,440 → R 540
 *   R 11,990→ R 1,200
 */
export function calculateReward(priceRands: number): number {
  if (priceRands <= 0) return 0;
  const raw = priceRands * 0.1;
  return Math.round(raw / 10) * 10;
}

/** Format a rand amount as "R 190" */
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

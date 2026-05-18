/**
 * Star Light Rewards — Star Aesthetic Centre
 *
 * 1 Star Light = R1 of rewards value
 * Earning rate: 5% of spend in Star Lights (aligned with retail loyalty norms e.g. Clicks tiered cashback)
 *
 * Examples:
 *   R 665   →  33 Star Lights
 *   R 1,240 →  62 Star Lights
 *   R 1,439 →  72 Star Lights
 */

export const STAR_LIGHT_REWARDS_NAME = "Star Light Rewards";
export const STAR_LIGHTS_LABEL = "Star Lights";
export const REWARDS_EARN_PERCENT = 5;

/** Calculate Star Lights earned — 5% of price, rounded to nearest integer */
export function calculateStarlights(priceRands: number): number {
  if (priceRands <= 0) return 0;
  return Math.round(priceRands * (REWARDS_EARN_PERCENT / 100));
}

/** Format as "72 Star Lights" */
export function formatStarlights(amount: number): string {
  return `${amount.toLocaleString("en-ZA")} ${STAR_LIGHTS_LABEL}`;
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

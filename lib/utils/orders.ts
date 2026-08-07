import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Fallback reference: SAC-ORD-20260516-A1B2
 *
 * Only used if next_order_reference() isn't available — i.e.
 * scripts/sql/sequential-order-numbers.sql hasn't been run. Ugly on a phone
 * call, but unique without a database round trip, so a checkout never fails
 * for want of a number.
 */
const CHARSET = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";

export function generateShopOrderReference(): string {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seg = Array.from({ length: 4 }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");
  return `SAC-ORD-${ymd}-${seg}`;
}

/**
 * The customer-facing order number: SAC-2026-001, SAC-2026-002, …
 *
 * The counter is claimed inside Postgres so two simultaneous checkouts can't
 * be handed the same number — see the migration for why that matters.
 */
export async function nextOrderReference(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("next_order_reference");

  if (error || typeof data !== "string" || !data) {
    console.error(
      "[orders] next_order_reference() unavailable — falling back to the random " +
        "reference format. Run scripts/sql/sequential-order-numbers.sql in Supabase.",
      error?.message ?? ""
    );
    return generateShopOrderReference();
  }

  return data;
}

export const FREE_SHIPPING_THRESHOLD_RANDS = 800;
export const STANDARD_SHIPPING_RANDS = 120;

export function shippingCentsForSubtotal(subtotalRands: number): number {
  return subtotalRands >= FREE_SHIPPING_THRESHOLD_RANDS
    ? 0
    : STANDARD_SHIPPING_RANDS * 100;
}

export function randToCents(rands: number): number {
  return Math.round(rands * 100);
}

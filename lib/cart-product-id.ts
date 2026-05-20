import { FUNNEL_OFFER_LABEL } from "@/lib/funnel";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Cart line id → Supabase product uuid (strips funnel suffix). */
export function resolveCartProductId(cartLineId: string): string {
  const idx = cartLineId.indexOf("__funnel_");
  if (idx > 0) return cartLineId.slice(0, idx);
  return cartLineId;
}

export function isValidCartProductId(cartLineId: string): boolean {
  return UUID_RE.test(resolveCartProductId(cartLineId));
}

export function isFunnelCartLine(cartLineId: string, name?: string): boolean {
  return cartLineId.includes("__funnel_") || Boolean(name?.includes(FUNNEL_OFFER_LABEL));
}

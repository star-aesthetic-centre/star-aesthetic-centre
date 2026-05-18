/** Client-only session keys for checkout → funnel → checkout flow */

export const PENDING_FUNNEL_SLUG_KEY = "sac_pending_funnel_slug";
export const CHECKOUT_BILLING_KEY = "sac_checkout_billing";

export function funnelCompletedKey(slug: string): string {
  return `sac_funnel_done_${slug}`;
}

export function markFunnelPending(slug: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_FUNNEL_SLUG_KEY, slug);
}

export function isFunnelCompleted(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(funnelCompletedKey(slug)) === "1";
}

export function markFunnelCompleted(slug: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(funnelCompletedKey(slug), "1");
  sessionStorage.removeItem(PENDING_FUNNEL_SLUG_KEY);
}

export function getPendingFunnelSlug(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PENDING_FUNNEL_SLUG_KEY);
}

export function saveCheckoutBilling(form: unknown): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHECKOUT_BILLING_KEY, JSON.stringify(form));
}

export function loadCheckoutBilling<T>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CHECKOUT_BILLING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearFunnelSession(slug: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(funnelCompletedKey(slug));
  sessionStorage.removeItem(PENDING_FUNNEL_SLUG_KEY);
  sessionStorage.removeItem(CHECKOUT_BILLING_KEY);
}

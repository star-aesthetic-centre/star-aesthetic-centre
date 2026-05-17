/** Shop order reference: SAC-ORD-20260516-A1B2 */
const CHARSET = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";

export function generateShopOrderReference(): string {
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seg = Array.from({ length: 4 }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");
  return `SAC-ORD-${ymd}-${seg}`;
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

/**
 * How a Star Aesthetic order is paid for and received.
 *
 * The string values are shared vocabulary across the group's stores (see
 * _commerce-core) — "bank_transfer" and "payfast" are what the conformance pack
 * recognises as the card vs no-card-pending paths. Don't rename them locally.
 */

export type PaymentMethod = "bank_transfer" | "payfast";
export type DeliveryMethod = "delivery" | "collection";

export function isPaymentMethod(value: unknown): value is PaymentMethod {
  return value === "bank_transfer" || value === "payfast";
}

export function isDeliveryMethod(value: unknown): value is DeliveryMethod {
  return value === "delivery" || value === "collection";
}

/** The clinic itself — customers who prefer to fetch their order. */
export const COLLECTION_POINT = {
  name: "Star Aesthetic Centre",
  street: "22 Ennisdale Drive",
  suburb: "Durban North",
  postalCode: "4051",
  province: "KwaZulu-Natal",
  oneLine: "22 Ennisdale Drive, Durban North, 4051",
  lines: ["22 Ennisdale Drive", "Durban North, 4051"],
  hours: "Mon–Fri 08:00–17:00 · Sat 08:00–13:00",
  phoneDisplay: "031 573 1325",
} as const;

/** Collection is always free — nothing is couriered. */
export function shippingCentsForMethod(
  method: DeliveryMethod,
  deliveryShippingCents: number
): number {
  return method === "collection" ? 0 : deliveryShippingCents;
}

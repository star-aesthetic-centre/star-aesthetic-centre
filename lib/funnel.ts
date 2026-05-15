/** Post–add-to-cart upsell funnel (max 2 steps). */

export type FunnelDiscountPercent = 10 | 15 | 20;

export interface FunnelStepConfig {
  title: string;
  description: string;
  productIds: string[];
  discountPercent: FunnelDiscountPercent;
}

export interface FunnelConfig {
  enabled: boolean;
  steps: FunnelStepConfig[];
}

export const MAX_FUNNEL_STEPS = 2;

export const DEFAULT_FUNNEL_STEPS: FunnelStepConfig[] = [
  {
    title: "Pairs With This Product",
    description: "Add a complementary product at a special bundle price.",
    productIds: [],
    discountPercent: 10,
  },
  {
    title: "Complete Your Routine",
    description: "Finish your home-care routine with Dr. Bangalee's recommended next step.",
    productIds: [],
    discountPercent: 10,
  },
];

export const DEFAULT_FUNNEL_CONFIG: FunnelConfig = {
  enabled: false,
  steps: DEFAULT_FUNNEL_STEPS,
};

export function parseFunnelConfig(raw: unknown): FunnelConfig {
  if (!raw) return DEFAULT_FUNNEL_CONFIG;

  let parsed: Partial<FunnelConfig>;
  try {
    parsed = typeof raw === "string" ? JSON.parse(raw) : (raw as Partial<FunnelConfig>);
  } catch {
    return DEFAULT_FUNNEL_CONFIG;
  }

  const enabled = Boolean(parsed.enabled);
  const steps = Array.isArray(parsed.steps)
    ? parsed.steps.slice(0, MAX_FUNNEL_STEPS).map((step, i) => ({
        title:
          typeof step.title === "string" && step.title.trim()
            ? step.title.trim()
            : DEFAULT_FUNNEL_STEPS[i]?.title ?? `Step ${i + 1} Offer`,
        description:
          typeof step.description === "string" ? step.description.trim() : "",
        productIds: Array.isArray(step.productIds)
          ? step.productIds.filter((id): id is string => typeof id === "string").slice(0, 6)
          : [],
        discountPercent: ([10, 15, 20] as const).includes(Number(step.discountPercent) as FunnelDiscountPercent)
          ? (Number(step.discountPercent) as FunnelDiscountPercent)
          : 10,
      }))
    : DEFAULT_FUNNEL_STEPS;

  return {
    enabled,
    steps: steps.length ? steps : DEFAULT_FUNNEL_STEPS,
  };
}

export function serializeFunnelConfig(config: FunnelConfig): string {
  return JSON.stringify({
    enabled: config.enabled,
    steps: config.steps.slice(0, MAX_FUNNEL_STEPS),
  });
}

export function applyFunnelDiscount(price: number, discountPercent: FunnelDiscountPercent): number {
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}

export const FUNNEL_OFFER_LABEL = "Funnel Offer";

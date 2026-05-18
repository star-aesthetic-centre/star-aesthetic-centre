import {
  DEFAULT_FUNNEL_STEPS,
  excerptPlainText,
  type FunnelConfig,
  type FunnelStepConfig,
} from "@/lib/funnel";

export type FunnelSuggestProduct = {
  id: string;
  name: string;
  slug: string;
  brand_slug: string;
  subcategory: string | null;
  subcategory_sort: number | null;
  short_description: string | null;
  is_active?: boolean;
};

export type FunnelSuggestionResult = {
  config: FunnelConfig;
  rationale: string;
  step1ProductName: string | null;
  step2ProductName: string | null;
};

const SPF_PATTERN =
  /\b(spf|sunscreen|sun block|uv|heliocare|fotoprotector|foto\s*protect)\b/i;
const CLEANSE_PATTERN = /\b(cleans|wash|gel nettoyant|micellar|shampoo)\b/i;
const SERUM_PATTERN = /\b(serum|ampoule|concentrate|booster|essence)\b/i;
const CREAM_PATTERN = /\b(cream|lotion|moistur|hydrat|balm|emulsion|mask)\b/i;
const TONER_PATTERN = /\b(toner|lotion tonique|mist)\b/i;

/** Lower = earlier in routine */
function routineRank(p: FunnelSuggestProduct): number {
  if (p.subcategory_sort != null && p.subcategory_sort > 0) {
    return p.subcategory_sort * 10;
  }
  const n = p.name;
  if (CLEANSE_PATTERN.test(n)) return 10;
  if (TONER_PATTERN.test(n)) return 20;
  if (SERUM_PATTERN.test(n)) return 30;
  if (CREAM_PATTERN.test(n)) return 40;
  if (SPF_PATTERN.test(n)) return 50;
  return 35;
}

function isSpf(p: FunnelSuggestProduct): boolean {
  return SPF_PATTERN.test(p.name) || (p.subcategory?.toUpperCase().includes("SPF") ?? false);
}

function stepFromProduct(
  product: FunnelSuggestProduct,
  fallbackTitle: string
): Pick<FunnelStepConfig, "title" | "description" | "productIds"> {
  return {
    title: product.name,
    description: product.short_description
      ? excerptPlainText(product.short_description)
      : fallbackTitle,
    productIds: [product.id],
  };
}

function pickNextInRoutine(
  source: FunnelSuggestProduct,
  candidates: FunnelSuggestProduct[],
  excludeIds: Set<string>
): FunnelSuggestProduct | null {
  const sourceRank = routineRank(source);
  const sameBrand = candidates
    .filter(
      (p) =>
        p.id !== source.id &&
        !excludeIds.has(p.id) &&
        p.brand_slug === source.brand_slug &&
        p.is_active !== false
    )
    .sort((a, b) => routineRank(a) - routineRank(b));

  const after = sameBrand.filter((p) => routineRank(p) > sourceRank);
  if (after.length > 0) return after[0];

  const spf = sameBrand.find((p) => isSpf(p) && !excludeIds.has(p.id));
  if (spf && !isSpf(source)) return spf;

  const anyOther = sameBrand.find((p) => p.id !== source.id);
  return anyOther ?? null;
}

function pickSpfFallback(
  source: FunnelSuggestProduct,
  candidates: FunnelSuggestProduct[],
  excludeIds: Set<string>
): FunnelSuggestProduct | null {
  if (isSpf(source)) return null;
  return (
    candidates.find(
      (p) =>
        p.brand_slug === source.brand_slug &&
        isSpf(p) &&
        p.id !== source.id &&
        !excludeIds.has(p.id) &&
        p.is_active !== false
    ) ?? null
  );
}

/**
 * Suggest a 2-step post-add funnel from catalogue routine order (same brand).
 * Always returns enabled: false — Nakita/you turn the funnel on after review.
 */
export function suggestFunnelConfig(
  source: FunnelSuggestProduct,
  catalog: FunnelSuggestProduct[],
  coPurchasedIds?: string[]
): FunnelSuggestionResult | null {
  const activeCatalog = catalog.filter((p) => p.is_active !== false);
  const exclude = new Set<string>([source.id]);

  let step1: FunnelSuggestProduct | null = null;
  let step2: FunnelSuggestProduct | null = null;
  let rationale = "";

  if (coPurchasedIds?.length) {
    for (const id of coPurchasedIds) {
      const p = activeCatalog.find((x) => x.id === id);
      if (!p || exclude.has(p.id)) continue;
      if (!step1) {
        step1 = p;
        exclude.add(p.id);
      } else if (!step2) {
        step2 = p;
        exclude.add(p.id);
        break;
      }
    }
    if (step1) {
      rationale = "Based on products linked to the same clinic treatments.";
    }
  }

  if (!step1) {
    step1 = pickNextInRoutine(source, activeCatalog, exclude);
    if (step1) {
      exclude.add(step1.id);
      rationale =
        source.subcategory_sort != null
          ? `Next step in the ${source.brand_slug} routine (${source.subcategory ?? "line"} → ${step1.subcategory ?? "next"}).`
          : `Complementary ${source.brand_slug} product by routine order.`;
    }
  }

  if (!step2 && step1) {
    step2 = pickNextInRoutine(source, activeCatalog, exclude);
    if (!step2) step2 = pickSpfFallback(source, activeCatalog, exclude);
    if (step2 && !rationale.includes("treatment")) {
      rationale += step2 && isSpf(step2) ? " Step 2 adds sun protection." : " Step 2 completes the routine.";
    }
  }

  if (!step1) {
    return null;
  }

  const steps: FunnelStepConfig[] = [
    {
      ...DEFAULT_FUNNEL_STEPS[0],
      ...stepFromProduct(step1, DEFAULT_FUNNEL_STEPS[0].description),
      discountPercent: 10,
    },
  ];

  if (step2) {
    steps.push({
      ...DEFAULT_FUNNEL_STEPS[1],
      ...stepFromProduct(step2, DEFAULT_FUNNEL_STEPS[1].description),
      discountPercent: 10,
    });
  } else {
    steps.push({ ...DEFAULT_FUNNEL_STEPS[1], productIds: [] });
  }

  return {
    config: {
      enabled: false,
      steps: steps.slice(0, 2),
    },
    rationale: rationale.trim() || "Suggested from brand routine order.",
    step1ProductName: step1.name,
    step2ProductName: step2?.name ?? null,
  };
}

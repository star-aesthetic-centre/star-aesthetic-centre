import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  TREATMENT_CARDS,
  type TreatmentCardItem,
} from "@/lib/treatment-cards";

/**
 * Numeric "from" price for treatment grid cards.
 * Detail pages show the full price_from string (e.g. per-unit breakdowns).
 * Per-unit strings must not use the unit rate — use the coded card minimum instead.
 */
function parsePriceFromZar(value: string | null | undefined, fallback: number): number {
  if (!value) return fallback;
  const normalized = value.replace(/,/g, "");
  if (/per\s+unit/i.test(normalized)) return fallback;
  const m = normalized.match(/(\d+(?:\.\d+)?)/);
  return m ? Math.round(Number(m[1])) : fallback;
}

type DbTreatmentRow = {
  slug: string;
  title: string | null;
  category: string;
  price_from: string | null;
  card_image: string | null;
  card_image_alt: string | null;
  is_active: boolean | null;
};

/**
 * Treatment cards for homepage grid and /treatments — merges Supabase overrides
 * with defaults in lib/treatment-cards.ts (order preserved).
 */
export async function getTreatmentCards(): Promise<TreatmentCardItem[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("treatments")
    .select("slug, title, category, price_from, card_image, card_image_alt, is_active");

  const bySlug = new Map<string, DbTreatmentRow>();
  if (!error && data) {
    for (const row of data as DbTreatmentRow[]) {
      bySlug.set(row.slug, row);
    }
  }

  return TREATMENT_CARDS.filter((card) => {
    const db = bySlug.get(card.slug);
    if (db && db.is_active === false) return false;
    return true;
  }).map((card) => {
    const db = bySlug.get(card.slug);
    return {
      ...card,
      name: db?.title?.trim() || card.name,
      category: db?.category || card.category,
      image: db?.card_image?.trim() || card.image,
      imageAlt: db?.card_image_alt?.trim() || card.imageAlt,
      priceFrom: parsePriceFromZar(db?.price_from, card.priceFrom),
    };
  });
}

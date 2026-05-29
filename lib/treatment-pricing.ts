/** Shared treatment pricing shape — JSON seed, Supabase JSONB, admin, and frontend */

export type PricingRow = { label: string; price: string };

export type PricingSection = {
  heading: string;
  description: string;
  rows: PricingRow[];
};

export type PricingBreakdown = {
  sections: PricingSection[];
  notes: string[];
};

function isPriceLike(value: string): boolean {
  return /^(R\s|From R|Price|POA)/i.test(value.trim());
}

/** Normalise one pricing row from DB/legacy shapes; optional JSON row fills missing fields */
export function normalizePricingRow(row: unknown, fallback?: PricingRow): PricingRow {
  if (row && typeof row === "object" && !Array.isArray(row)) {
    const r = row as Record<string, unknown>;
    const label = String(r.label ?? r.name ?? r.item ?? r.title ?? "").trim();
    const price = String(r.price ?? r.amount ?? r.value ?? "").trim();
    return {
      label: label || fallback?.label || "",
      price: price || fallback?.price || "",
    };
  }

  if (typeof row === "string") {
    const text = row.trim();
    if (!text) return { label: fallback?.label || "", price: fallback?.price || "" };
    if (isPriceLike(text)) {
      return { label: fallback?.label || "", price: text };
    }
    return { label: text, price: fallback?.price || "" };
  }

  if (Array.isArray(row) && row.length >= 2) {
    return {
      label: String(row[0] ?? fallback?.label ?? "").trim(),
      price: String(row[1] ?? fallback?.price ?? "").trim(),
    };
  }

  return { label: fallback?.label || "", price: fallback?.price || "" };
}

/** Merge DB pricing with JSON fallback so labels/prices stay in sync for admin + frontend */
export function mergePricingBreakdown(
  dbRaw: unknown,
  jsonRaw?: PricingBreakdown | null
): PricingBreakdown | null {
  const db = dbRaw as { sections?: unknown[]; notes?: string[] } | null | undefined;
  const jsonSections = jsonRaw?.sections ?? [];

  if (!Array.isArray(db?.sections) || db.sections.length === 0) {
    if (!jsonRaw?.sections?.length) return null;
    return {
      sections: jsonRaw.sections.map((s) => ({
        heading: s.heading ?? "",
        description: s.description ?? "",
        rows: (s.rows ?? []).map((r) => normalizePricingRow(r)),
      })),
      notes: jsonRaw.notes ?? [],
    };
  }

  const sections = db.sections.map((section, si) => {
    const s = section as Record<string, unknown>;
    const jsonSection = jsonSections[si];
    const rowsRaw = Array.isArray(s.rows) ? s.rows : [];
    const jsonRows = jsonSection?.rows ?? [];

    const rows = rowsRaw.map((row, ri) => normalizePricingRow(row, jsonRows[ri]));

    if (jsonRows.length > rows.length) {
      for (let ri = rows.length; ri < jsonRows.length; ri++) {
        rows.push(normalizePricingRow(jsonRows[ri]));
      }
    }

    return {
      heading: String(s.heading ?? jsonSection?.heading ?? "").trim(),
      description: String(s.description ?? jsonSection?.description ?? "").trim(),
      rows,
    };
  });

  const notes =
    Array.isArray(db.notes) && db.notes.length > 0
      ? db.notes.map(String)
      : (jsonRaw?.notes ?? []);

  return { sections, notes };
}

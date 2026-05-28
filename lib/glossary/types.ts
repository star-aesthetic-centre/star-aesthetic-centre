export type GlossaryCategory =
  | "ingredient"
  | "treatment"
  | "condition"
  | "concept"
  | "brand";

export type GlossaryTerm = {
  slug: string;
  /** Display name — capitalised as it appears on page */
  term: string;
  category: GlossaryCategory;
  /** 1–2 sentences shown in the hover tooltip */
  shortDescription: string;
  /**
   * Optional list of phrases that should trigger this term's tooltip when found
   * in product / treatment / page HTML. Each phrase is matched case-insensitively
   * with word boundaries. If not provided, defaults to `[term]` (the display name).
   * Include common variations and synonyms — but avoid ambiguous short tokens.
   */
  matchTerms?: string[];

  // ── SEO ──────────────────────────────────────────────────────────────────
  title: string;
  metaDescription: string;
  keywords: string[];

  // ── Article content ───────────────────────────────────────────────────────
  /** Opening sentence that introduces the full article */
  heroLine: string;
  sections: {
    heading: string;
    /** Each string becomes one <p> tag */
    paragraphs: string[];
  }[];
  /** How Star Aesthetic Centre specifically uses / treats this */
  clinicRelevance: string;
  faq: { q: string; a: string }[];
  relatedTerms: string[]; // slugs of related glossary entries
};

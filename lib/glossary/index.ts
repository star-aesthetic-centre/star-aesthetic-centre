import { INGREDIENT_TERMS } from "./data/ingredients";
import { TREATMENT_TERMS } from "./data/treatments";
import { CONDITION_TERMS } from "./data/conditions";
import { CONCEPT_TERMS } from "./data/concepts";
import type { GlossaryTerm, GlossaryCategory } from "./types";

export type { GlossaryTerm, GlossaryCategory };

/** All glossary terms — add new data files and spread them here */
export const ALL_GLOSSARY_TERMS: GlossaryTerm[] = [
  ...INGREDIENT_TERMS,
  ...TREATMENT_TERMS,
  ...CONDITION_TERMS,
  ...CONCEPT_TERMS,
].sort((a, b) => a.term.localeCompare(b.term));

/** Lookup by slug — O(1) via Map */
const TERM_MAP = new Map(ALL_GLOSSARY_TERMS.map((t) => [t.slug, t]));

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return TERM_MAP.get(slug);
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return ALL_GLOSSARY_TERMS.filter((t) => t.category === category);
}

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  ingredient: "Ingredient",
  treatment: "Treatment",
  condition: "Skin Condition",
  concept: "Concept",
};

export const CATEGORY_COLORS: Record<GlossaryCategory, string> = {
  ingredient: "bg-emerald-100 text-emerald-800",
  treatment: "bg-blue-100 text-blue-800",
  condition: "bg-amber-100 text-amber-800",
  concept: "bg-purple-100 text-purple-800",
};

import { TREATMENT_SLUG_TO_CATEGORY } from "@/lib/treatment-routes";
import treatments from "@/lib/data/treatments.json";
import type { ReviewAnswer, ReviewSubjectOption } from "./types";

export type ReviewQuestion = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  minLength: number;
  rows: number;
};

/**
 * The guided question set.
 *
 * Four short prompts beat one empty "write your review" box: people freeze in
 * front of a blank textarea, and the answers that do come back are two words
 * long. Prompting produces reviews that are specific enough to be useful to
 * the next patient.
 *
 * DELIBERATELY WEIGHTED TOWARD EXPERIENCE, NOT CLINICAL RESULTS. HPCSA rules
 * restrict testimonial advertising for registered practitioners, and a page of
 * "look at my results" testimonials under a named doctor is the risky shape.
 * Care, communication, comfort and aftercare are the safer and — for someone
 * deciding whether to walk in — more persuasive ground anyway.
 *
 * If the practice takes advice that results testimonials are fine, add a
 * question here; nothing else needs to change.
 */
export const REVIEW_QUESTIONS: ReviewQuestion[] = [
  {
    id: "visit_reason",
    label: "What brought you to Star Aesthetic Centre?",
    placeholder: "e.g. I'd been considering a consultation for a while and wanted honest advice…",
    minLength: 20,
    rows: 3,
  },
  {
    id: "consultation",
    label: "How was your consultation and the care you received?",
    placeholder: "Was everything explained clearly? Did you feel listened to and comfortable?",
    hint: "Be specific — what stood out?",
    minLength: 40,
    rows: 4,
  },
  {
    id: "aftercare",
    label: "How were the aftercare and follow-up?",
    placeholder: "Instructions, checking in, answering questions afterwards…",
    minLength: 20,
    rows: 3,
  },
  {
    id: "recommend",
    label: "Would you recommend us, and who to?",
    placeholder: "What would you tell a friend who was thinking about it?",
    minLength: 25,
    rows: 3,
  },
];

const TREATMENT_TITLES: Record<string, string> = Object.fromEntries(
  (treatments as { slug: string; title?: string; name?: string }[]).map((t) => [
    t.slug,
    t.title ?? t.name ?? t.slug,
  ])
);

const CATEGORY_LABELS: Record<string, string> = {
  face: "Injectables & Facial Aesthetics",
  skin: "Medical Skin Treatments",
  "body-wellness": "Health, Wellness & Body",
};

export function treatmentTitle(slug: string): string {
  return TREATMENT_TITLES[slug] ?? slug;
}

/**
 * Options for the subject dropdown, grouped by category.
 * Driven by TREATMENT_SLUG_TO_CATEGORY so a new treatment appears here
 * automatically rather than needing a second list kept in sync.
 */
export function getReviewSubjectOptions(): ReviewSubjectOption[] {
  const general: ReviewSubjectOption = {
    label: "General — my overall experience at the clinic",
    slug: null,
    scope: "general",
    categoryLabel: "General",
  };

  const treatmentOptions = Object.entries(TREATMENT_SLUG_TO_CATEGORY)
    .map(([slug, category]) => ({
      label: treatmentTitle(slug),
      slug,
      scope: "treatment" as const,
      categoryLabel: CATEGORY_LABELS[category] ?? category,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [general, ...treatmentOptions];
}

export function isKnownTreatmentSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TREATMENT_SLUG_TO_CATEGORY, slug);
}

export function subjectLabelFor(slug: string | null): string {
  return slug ? treatmentTitle(slug) : "Clinic experience";
}

/** Drop unanswered questions — an empty answer should not render as a heading. */
export function buildAnswers(answers: Record<string, string>): ReviewAnswer[] {
  return REVIEW_QUESTIONS.map((q) => ({
    question: q.label,
    answer: (answers[q.id] ?? "").trim(),
  })).filter((a) => a.answer.length > 0);
}

/** Flattened copy for search and plain-text rendering. */
export function compileBody(answers: ReviewAnswer[]): string {
  return answers.map((a) => `${a.question}\n${a.answer}`).join("\n\n");
}

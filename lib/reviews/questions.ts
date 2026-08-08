import { TREATMENT_SLUG_TO_CATEGORY } from "@/lib/treatment-routes";
import treatments from "@/lib/data/treatments.json";
import type { ReviewAnswer, ReviewSubjectOption } from "./types";

export type ReviewQuestion = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  rows: number;
};

/**
 * Review questions, tailored per treatment.
 *
 * A weight-loss programme and a lip filler appointment have almost nothing in
 * common from the patient's side — one is months of habit change, the other is
 * twenty minutes and a mirror. Asking both "how was your treatment?" produces
 * the same shrug of an answer. Tailored prompts produce reviews specific
 * enough that the next patient actually learns something.
 *
 * Structure: two questions are shared by everything (why you came, would you
 * recommend), and the middle two are swapped per treatment, falling back to
 * the category set, then to a generic pair.
 *
 * DELIBERATELY WEIGHTED TOWARD EXPERIENCE, NOT CLINICAL RESULTS. HPCSA
 * restricts testimonial advertising for registered practitioners, and a wall
 * of "look at my results" under a named doctor is the risky shape. Care,
 * communication, comfort and aftercare are safer ground — and for someone
 * deciding whether to walk in, more persuasive anyway.
 */

const Q_OPENING: ReviewQuestion = {
  id: "visit_reason",
  label: "What brought you to Star Aesthetic Centre?",
  placeholder: "e.g. I'd been thinking about it for a while and wanted honest advice first…",
  rows: 3,
};

const Q_RECOMMEND: ReviewQuestion = {
  id: "recommend",
  label: "Would you recommend us, and who to?",
  placeholder: "What would you tell a friend who was considering it?",
  rows: 3,
};

const GENERIC_MIDDLE: ReviewQuestion[] = [
  {
    id: "consultation",
    label: "How was your consultation and the care you received?",
    placeholder: "Was everything explained clearly? Did you feel listened to?",
    hint: "Be specific — what stood out?",
    rows: 4,
  },
  {
    id: "aftercare",
    label: "How were the aftercare and follow-up?",
    placeholder: "Instructions, checking in, answering questions afterwards…",
    rows: 3,
  },
];

/** Category-level sets — used when a treatment has no bespoke pair. */
const CATEGORY_MIDDLE: Record<string, ReviewQuestion[]> = {
  face: [
    {
      id: "consultation",
      label: "How well was the plan explained before anything was done?",
      placeholder: "Did you feel you understood what would happen, and had room to ask questions?",
      hint: "Feeling unhurried matters more than anything else here.",
      rows: 4,
    },
    {
      id: "comfort",
      label: "How was the appointment itself — comfort and aftercare?",
      placeholder: "How you were looked after on the day, and what follow-up you had…",
      rows: 3,
    },
  ],
  skin: [
    {
      id: "plan",
      label: "How was your skin plan put together?",
      placeholder: "In-clinic treatments, home care, how it was matched to your skin…",
      hint: "Was it tailored to you, or off the shelf?",
      rows: 4,
    },
    {
      id: "followup",
      label: "How was the follow-up as your skin changed?",
      placeholder: "Check-ins, adjustments to the plan, answering questions between visits…",
      rows: 3,
    },
  ],
  "body-wellness": [
    {
      id: "support",
      label: "How were you supported through the programme?",
      placeholder: "Check-ins, encouragement, adjustments when things got difficult…",
      hint: "The support is usually what makes or breaks it.",
      rows: 4,
    },
    {
      id: "practicality",
      label: "How did it fit into your everyday life?",
      placeholder: "Was it realistic alongside work, family and meals out?",
      rows: 3,
    },
  ],
};

/** Bespoke sets where the treatment really is its own experience. */
const TREATMENT_MIDDLE: Record<string, ReviewQuestion[]> = {
  "medi-lean": [
    {
      id: "support",
      label: "How were you supported through the programme?",
      placeholder: "Consultations, check-ins, encouragement when progress slowed…",
      hint: "Weight loss is a long road — what kept you going?",
      rows: 4,
    },
    {
      id: "practicality",
      label: "How realistic was it day to day?",
      placeholder: "Work, family meals, eating out, travel — did it fit your actual life?",
      rows: 3,
    },
  ],
  "lip-filler": [
    {
      id: "consultation",
      label: "How was the conversation about what you wanted?",
      placeholder: "Did you feel heard about the look you were after, and given honest advice?",
      hint: "Being talked out of too much is as valuable as being agreed with.",
      rows: 4,
    },
    {
      id: "comfort",
      label: "How comfortable was the appointment, and what was aftercare like?",
      placeholder: "Numbing, how you were looked after, what to expect afterwards…",
      rows: 3,
    },
  ],
  acne: [
    {
      id: "plan",
      label: "How was your acne plan explained?",
      placeholder: "In-clinic treatment, prescriptions, home care, what to expect and when…",
      hint: "Was it clear this is a medical plan rather than a product to buy?",
      rows: 4,
    },
    {
      id: "followup",
      label: "How were you supported as your skin settled?",
      placeholder: "Adjustments, check-ins, managing the difficult early weeks…",
      rows: 3,
    },
  ],
  "vitamin-drips": [
    {
      id: "comfort",
      label: "How was the appointment itself?",
      placeholder: "The room, comfort during the drip, how long it took, how you were looked after…",
      rows: 4,
    },
    {
      id: "advice",
      label: "How was the advice about what was right for you?",
      placeholder: "Which drip was recommended and why, and whether it was explained clearly…",
      rows: 3,
    },
  ],
  "excessive-sweating": [
    {
      id: "consultation",
      label: "How was it to talk about the problem?",
      placeholder: "Did you feel comfortable raising it and taken seriously?",
      hint: "Many people put this off for years — how was it being heard?",
      rows: 4,
    },
    {
      id: "practicality",
      label: "How was the treatment and what came after?",
      placeholder: "The appointment itself, aftercare, and follow-up…",
      rows: 3,
    },
  ],
  "varicose-veins": [
    {
      id: "consultation",
      label: "How clearly were your options explained?",
      placeholder: "What was recommended, what it involved, and what to expect…",
      rows: 4,
    },
    {
      id: "comfort",
      label: "How was the procedure and recovery?",
      placeholder: "Comfort on the day, aftercare instructions, follow-up…",
      rows: 3,
    },
  ],
};

/** The four questions for a given treatment (or the general clinic form). */
export function questionsFor(treatmentSlug: string | null | undefined): ReviewQuestion[] {
  const slug = treatmentSlug ?? "";
  const middle =
    TREATMENT_MIDDLE[slug] ??
    CATEGORY_MIDDLE[TREATMENT_SLUG_TO_CATEGORY[slug] ?? ""] ??
    GENERIC_MIDDLE;
  return [Q_OPENING, ...middle, Q_RECOMMEND];
}

/** Every question id across every set — the API validates against this. */
export function allQuestionIds(): string[] {
  const ids = new Set<string>([Q_OPENING.id, Q_RECOMMEND.id]);
  for (const set of [GENERIC_MIDDLE, ...Object.values(CATEGORY_MIDDLE), ...Object.values(TREATMENT_MIDDLE)]) {
    for (const q of set) ids.add(q.id);
  }
  return [...ids];
}

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
export function buildAnswers(
  treatmentSlug: string | null,
  answers: Record<string, string>
): ReviewAnswer[] {
  return questionsFor(treatmentSlug)
    .map((q) => ({ question: q.label, answer: (answers[q.id] ?? "").trim() }))
    .filter((a) => a.answer.length > 0);
}

/** Flattened copy for search and plain-text rendering. */
export function compileBody(answers: ReviewAnswer[]): string {
  return answers.map((a) => `${a.question}\n${a.answer}`).join("\n\n");
}

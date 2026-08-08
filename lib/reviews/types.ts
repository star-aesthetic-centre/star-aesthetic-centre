export type ReviewScope = "general" | "treatment";

export type ReviewAnswer = {
  question: string;
  answer: string;
};

/** A review as stored. Email is never included in anything sent to the browser. */
export type StoredReview = {
  id: string;
  created_at: string;
  name: string;
  city: string | null;
  scope: ReviewScope;
  treatment_slug: string | null;
  subject_label: string | null;
  rating: number;
  headline: string;
  answers_json: ReviewAnswer[];
  body: string;
  approved: boolean;
  featured: boolean;
};

/** The public shape — deliberately has no email field at all, so it cannot leak. */
export type PublicReview = {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  headline: string;
  answers: ReviewAnswer[];
  body: string;
  subjectLabel: string | null;
  treatmentSlug: string | null;
};

export type ReviewSummary = {
  averageRating: number;
  totalReviews: number;
  reviews: PublicReview[];
};

export type ReviewSubjectOption = {
  label: string;
  slug: string | null;
  scope: ReviewScope;
  categoryLabel: string;
};

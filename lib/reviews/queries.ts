import { createSupabaseAdmin } from "@/lib/supabase-admin";
import type {
  PublicReview,
  ReviewAnswer,
  ReviewScope,
  ReviewSummary,
  StoredReview,
} from "./types";

/**
 * Reads only ever return APPROVED reviews to the public surface. The filter
 * lives here, in one place, rather than in each caller — a page that forgets
 * `.eq("approved", true)` would publish unmoderated text about medical
 * treatments, which is the one failure this table must not have.
 */

const PUBLIC_COLUMNS =
  "id, created_at, name, city, rating, headline, answers_json, body, subject_label, treatment_slug";

function toPublic(row: Record<string, unknown>): PublicReview {
  const answers = Array.isArray(row.answers_json) ? (row.answers_json as ReviewAnswer[]) : [];
  return {
    id: String(row.id),
    name: String(row.name ?? "").trim(),
    location: String(row.city ?? "").trim(),
    date: String(row.created_at ?? ""),
    rating: Number(row.rating ?? 0),
    headline: String(row.headline ?? ""),
    answers,
    body: String(row.body ?? ""),
    subjectLabel: (row.subject_label as string | null) ?? null,
    treatmentSlug: (row.treatment_slug as string | null) ?? null,
  };
}

function summarise(reviews: PublicReview[]): ReviewSummary {
  const total = reviews.length;
  const average = total
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
    : 0;
  return {
    averageRating: Math.round(average * 10) / 10,
    totalReviews: total,
    reviews,
  };
}

const EMPTY: ReviewSummary = { averageRating: 0, totalReviews: 0, reviews: [] };

/** Approved reviews for one treatment. Returns empty on error — a reviews
 *  block failing must never take a treatment page down with it. */
export async function getTreatmentReviews(
  treatmentSlug: string,
  limit = 12
): Promise<ReviewSummary> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("reviews")
      .select(PUBLIC_COLUMNS)
      .eq("treatment_slug", treatmentSlug)
      .eq("approved", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      // Table may not exist yet — the schema is applied separately.
      console.warn(`[reviews] treatment read failed (${treatmentSlug}):`, error.message);
      return EMPTY;
    }
    return summarise((data ?? []).map(toPublic));
  } catch (err) {
    console.warn("[reviews] treatment read threw:", err);
    return EMPTY;
  }
}

/** Approved reviews across the clinic, optionally filtered to one treatment. */
export async function getApprovedReviews(
  options: { treatmentSlug?: string; limit?: number } = {}
): Promise<ReviewSummary> {
  try {
    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("reviews")
      .select(PUBLIC_COLUMNS)
      .eq("approved", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(options.limit ?? 50);

    if (options.treatmentSlug) query = query.eq("treatment_slug", options.treatmentSlug);

    const { data, error } = await query;
    if (error) {
      console.warn("[reviews] read failed:", error.message);
      return EMPTY;
    }
    return summarise((data ?? []).map(toPublic));
  } catch (err) {
    console.warn("[reviews] read threw:", err);
    return EMPTY;
  }
}

export type NewReview = {
  name: string;
  email: string;
  city: string;
  scope: ReviewScope;
  treatmentSlug: string | null;
  subjectLabel: string;
  rating: number;
  headline: string;
  answers: ReviewAnswer[];
  body: string;
  bookingReference: string | null;
};

/** Insert a review. Always lands unapproved — approval is a human decision. */
export async function saveReview(review: NewReview): Promise<{ id: string } | { error: string }> {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      name: review.name,
      email: review.email,
      city: review.city || null,
      scope: review.scope,
      treatment_slug: review.treatmentSlug,
      subject_label: review.subjectLabel,
      rating: review.rating,
      headline: review.headline,
      answers_json: review.answers,
      body: review.body,
      booking_reference: review.bookingReference,
      approved: false,
    })
    .select("id")
    .single();

  if (error) {
    // Log the real Postgres message. A generic "could not save" hid a missing
    // column on gift_vouchers for three months.
    console.error("[reviews] insert failed:", error.message, error);
    return { error: error.message };
  }
  return { id: String(data.id) };
}

/** Moderation queue — unapproved, oldest first, with the email for context. */
export async function getPendingReviews(): Promise<StoredReview[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[reviews] pending read failed:", error.message);
    return [];
  }
  return (data ?? []) as StoredReview[];
}

export async function setReviewApproval(
  id: string,
  approved: boolean
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from("reviews")
    .update({ approved, approved_at: approved ? new Date().toISOString() : null })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteReview(id: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

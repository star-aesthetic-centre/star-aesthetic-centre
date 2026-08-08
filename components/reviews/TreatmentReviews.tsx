import Link from "next/link";
import { Star, Gift } from "lucide-react";
import type { PublicReview, ReviewSummary } from "@/lib/reviews/types";

/**
 * Reviews block for a treatment page.
 *
 * Deliberately NOT a form. Someone reading a treatment page is deciding
 * whether to book — they have not had the treatment. Past patients arrive from
 * the follow-up email, so this links to the central form with the treatment
 * pre-selected rather than carrying a second form on twelve pages.
 *
 * THE EMPTY STATE IS THE POINT. A new clinic page has no reviews, and the
 * usual answers are both bad: hide the section (invisible, collects nothing)
 * or show grey skeleton cards (reads as broken, and empty star rows look like
 * one-star reviews). Instead the three founding slots are shown as a reward
 * ladder that visibly fills up. The gap becomes an invitation, and the
 * scarcity is real rather than manufactured — there genuinely are only three.
 */

const FOUNDING_SLOTS = 3;

export default function TreatmentReviews({
  treatmentName,
  treatmentSlug,
  summary,
}: {
  treatmentName: string;
  treatmentSlug: string;
  summary: ReviewSummary;
}) {
  const submitHref = `/submit-review?treatment=${encodeURIComponent(treatmentSlug)}`;
  const remaining = Math.max(0, FOUNDING_SLOTS - summary.totalReviews);
  const inFoundingPhase = remaining > 0;

  // While founding slots remain, pad the row out to three so the open places
  // are visible. After that it's an ordinary three-up of the best reviews.
  const filled = summary.reviews.slice(0, FOUNDING_SLOTS);
  const slots: (PublicReview | null)[] = inFoundingPhase
    ? [...filled, ...Array<null>(remaining).fill(null)]
    : filled;

  return (
    <section id="patient-reviews" className="border-t border-[#E2E2E6] bg-[#FBFBFC] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="overline mb-3 text-[#939EBA]">Patient Reviews</p>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] md:text-3xl">
              {summary.totalReviews > 0
                ? `What patients say about ${treatmentName}`
                : `Be the first to review ${treatmentName}`}
            </h2>

            {summary.totalReviews > 0 ? (
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={Math.round(summary.averageRating)} />
                <span className="text-sm text-[#636374]">
                  {summary.averageRating.toFixed(1)} average from {summary.totalReviews}{" "}
                  {summary.totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            ) : (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#636374]">
                No one has reviewed this treatment yet. If you&apos;ve been treated here, your
                experience is the one that helps the next person decide.
              </p>
            )}
          </div>

          <Link
            href={submitHref}
            className="border border-[#939EBA] px-6 py-3 text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#939EBA] hover:text-white"
          >
            {summary.totalReviews > 0 ? "Leave a review →" : "Write the first review →"}
          </Link>
        </div>

        {/* ── Founding-reviewer offer ───────────────────────────────────── */}
        {inFoundingPhase && (
          <div className="mt-8 flex flex-wrap items-center gap-4 border border-[#C8A882] bg-[#FFF8F0] px-6 py-4">
            <Gift className="h-5 w-5 shrink-0 text-[#C8A882]" aria-hidden="true" />
            <p className="flex-grow text-sm text-[#1A1A1F]">
              <strong className="font-semibold">
                {remaining} of {FOUNDING_SLOTS} complimentary sample packs remaining.
              </strong>{" "}
              <span className="text-[#636374]">
                The first {FOUNDING_SLOTS} people to review {treatmentName} each receive one.
              </span>
            </p>
            {/* Disclosure is not optional. The pack is for reviewing, never for
                reviewing WELL — saying so protects the clinic and the reader. */}
            <p className="w-full text-xs text-[#8A8896]">
              Given for sharing your honest experience — positive or not. Reviews are published
              only after our team has read them.
            </p>
          </div>
        )}

        {/* ── Reviews / open slots ──────────────────────────────────────── */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {slots.map((review, i) =>
            review ? (
              <ReviewCard key={review.id} review={review} />
            ) : (
              <OpenSlot key={`slot-${i}`} position={summary.totalReviews + i + 1} href={submitHref} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: PublicReview }) {
  const first = review.answers[0];
  return (
    <article className="flex flex-col border border-[#E2E2E6] bg-white p-6">
      <Stars rating={review.rating} />
      <h3 className="mt-3 font-heading text-base font-bold text-[#1A1A1F]">{review.headline}</h3>

      {first && (
        <p className="mt-2 flex-grow text-sm leading-relaxed text-[#636374]">
          &ldquo;
          {first.answer.length > 180 ? `${first.answer.slice(0, 180).trimEnd()}…` : first.answer}
          &rdquo;
        </p>
      )}

      <div className="mt-5 flex items-center gap-3 border-t border-[#F0EFEC] pt-4">
        <Avatar name={review.name} />
        <div>
          <p className="text-sm font-semibold text-[#1A1A1F]">{review.name}</p>
          <p className="text-xs text-[#939EBA]">
            {review.location ? `${review.location} · ` : ""}
            {new Date(review.date).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}
          </p>
        </div>
      </div>
    </article>
  );
}

/** An unclaimed founding slot — an invitation, not a loading skeleton. */
function OpenSlot({ position, href }: { position: number; href: string }) {
  // 3 must not become "3th". Handles the teens correctly too, in case the
  // number of founding slots is ever raised.
  const ordinal = `${position}${ordinalSuffix(position)}`;
  return (
    <Link
      href={href}
      className="group flex flex-col border border-dashed border-[#C9C9D1] bg-white/60 p-6 transition-colors hover:border-[#C8A882] hover:bg-[#FFFCF8]"
    >
      <span className="text-xs font-semibold uppercase tracking-[2px] text-[#C8A882]">
        {ordinal} review
      </span>
      <p className="mt-3 flex-grow font-heading text-base font-bold text-[#1A1A1F]">
        This space is waiting for you
      </p>
      <p className="mt-1 text-sm text-[#636374]">
        Share your experience and claim a complimentary sample pack.
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-[#F0EFEC] pt-4">
        {/* Placeholder avatar — deliberately plain, so the slot reads as
            reserved rather than as a review that failed to load. */}
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDEDF0] text-[#C9C9D1]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-[#939EBA] group-hover:text-[#C8A882]">
          Write this review →
        </span>
      </div>
    </Link>
  );
}

function ordinalSuffix(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDEDF0] text-sm font-semibold text-[#939EBA]"
    >
      {initials || "★"}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`h-4 w-4 ${n <= rating ? "fill-[#C8A882] text-[#C8A882]" : "text-[#E2E2E6]"}`}
        />
      ))}
    </span>
  );
}

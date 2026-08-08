import Link from "next/link";
import { Star } from "lucide-react";
import type { ReviewSummary } from "@/lib/reviews/types";

/**
 * Reviews block for a treatment page.
 *
 * Deliberately NOT a form. Someone reading a treatment page is deciding
 * whether to book — they haven't had the treatment yet. Past patients arrive
 * from the follow-up email, so this links to the central form with the
 * treatment pre-selected instead of carrying a second form on twelve pages.
 *
 * Renders nothing at all when there are no approved reviews: an empty
 * "no reviews yet" panel on a treatment page reads as a warning sign.
 */
export default function TreatmentReviews({
  treatmentName,
  treatmentSlug,
  summary,
}: {
  treatmentName: string;
  treatmentSlug: string;
  summary: ReviewSummary;
}) {
  if (summary.totalReviews === 0) return null;

  const submitHref = `/submit-review?treatment=${encodeURIComponent(treatmentSlug)}`;
  const shown = summary.reviews.slice(0, 3);

  return (
    <section id="patient-reviews" className="border-t border-[#E5E4E0] py-16">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-xs uppercase tracking-[3px] text-[#939EBA]">Patient reviews</p>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl text-[#1A1917] sm:text-3xl">
              What patients say about {treatmentName}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <Stars rating={Math.round(summary.averageRating)} />
              <span className="text-sm text-[#6B6966]">
                {summary.averageRating.toFixed(1)} from {summary.totalReviews}{" "}
                {summary.totalReviews === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
          <Link
            href={submitHref}
            className="border border-[#C8A882] px-5 py-3 text-sm font-semibold text-[#A08060] transition-colors hover:bg-[#FFF8F0]"
          >
            Had this treatment? Leave a review →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {shown.map((review) => (
            <article key={review.id} className="border border-[#E5E4E0] bg-white p-5">
              <Stars rating={review.rating} />
              <h3 className="mt-3 font-heading text-base text-[#1A1917]">{review.headline}</h3>

              {review.answers.length > 0 && (
                <p className="mt-2 text-sm leading-relaxed text-[#6B6966]">
                  {review.answers[0].answer.length > 180
                    ? `${review.answers[0].answer.slice(0, 180).trimEnd()}…`
                    : review.answers[0].answer}
                </p>
              )}

              <p className="mt-4 text-xs text-[#939EBA]">
                {review.name}
                {review.location ? ` · ${review.location}` : ""}
                {" · "}
                {new Date(review.date).toLocaleDateString("en-ZA", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`h-4 w-4 ${n <= rating ? "fill-[#C8A882] text-[#C8A882]" : "text-[#E5E4E0]"}`}
        />
      ))}
    </span>
  );
}

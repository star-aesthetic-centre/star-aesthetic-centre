import { getApprovedReviews } from "@/lib/reviews/queries";

/**
 * Patient reviews — real ones only.
 *
 * This section previously carried three hardcoded testimonials (Sarah J.,
 * Michelle, K. Reddy) written during the build, under the heading "Real
 * results. Real confidence." Nothing connected them to the review system, the
 * reviews table held only QA test rows, and none of the names appear in any
 * public listing or on the practice's Facebook page.
 *
 * Publishing invented patient endorsements on an HPCSA-registered practice's
 * website is not a risk worth carrying, so the section now reads from the
 * reviews table and renders nothing until real reviews are approved. The
 * "leave a review" invite directly below collects them.
 */
export default async function Testimonials() {
  const { reviews } = await getApprovedReviews({ limit: 3 });

  // No approved reviews yet — render nothing rather than fill the space.
  if (!reviews.length) return null;

  return (
    <section className="bg-[#F7F7F8] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#939EBA]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
              Patient Experiences
            </span>
            <span className="h-px w-8 bg-[#939EBA]" />
          </div>
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Real results.
            <br />
            Real confidence.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="uk-card uk-card-default flex flex-col justify-between">
              <div className="uk-card-body">
                {/* Stars reflect the rating actually given. */}
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < r.rating ? "#939EBA" : "#E2E2E6"}
                      className="opacity-80"
                      aria-hidden
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="sr-only">{r.rating} out of 5</span>
                </div>

                <blockquote className="text-[15px] italic leading-relaxed text-[#636374]">
                  &ldquo;{r.body}&rdquo;
                </blockquote>

                <div className="mt-8 border-t border-[#E2E2E6] pt-4">
                  <p className="font-heading m-0 text-lg font-bold">{r.name}</p>
                  {r.subjectLabel && (
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[#939EBA]">
                      {r.subjectLabel}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

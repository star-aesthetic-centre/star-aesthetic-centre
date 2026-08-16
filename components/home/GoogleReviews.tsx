import Link from "next/link";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews";
import { getApprovedReviews } from "@/lib/reviews/queries";

/**
 * Google rating band.
 *
 * The practice holds a verified Google Business Profile rated 5.0 from 21
 * reviews. That is real, independently checkable social proof — far stronger
 * than the unsourced "5★ Patient Rating" and the invented testimonials this
 * replaces.
 *
 * Any approved reviews collected through /submit-review are shown beneath it,
 * so on-site and Google reviews build the same section rather than competing.
 */
/** Google's four-colour "G". Shown so the rating is visibly attributed. */
function GoogleG({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default async function GoogleReviews() {
  const { reviews } = await getApprovedReviews({ limit: 3 });

  return (
    <section className="border-y border-[#E2E2E6] bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-3">
            <GoogleG />
            <span className="font-heading text-xl font-bold text-[#1A1A1F]">Google Reviews</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-heading text-4xl font-bold text-[#1A1A1F]">
              {GOOGLE_REVIEWS.rating}
            </span>
            <span className="flex items-center gap-0.5" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#F5B301">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </span>
          </div>

          <p className="font-heading text-2xl font-bold text-[#1A1A1F] lg:text-3xl">
            Rated {GOOGLE_REVIEWS.rating} out of 5 on Google
          </p>
          <p className="max-w-xl text-[#636374]">
            Rated <strong className="font-semibold text-[#1A1A1F]">{GOOGLE_REVIEWS.rating}</strong>{" "}
            by <strong className="font-semibold text-[#1A1A1F]">{GOOGLE_REVIEWS.count} patients</strong>{" "}
            on Google — every one of them a verified review you can read for yourself.
          </p>

          <Link
            href={GOOGLE_REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-[#DADCE0] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F2647] shadow-sm transition-colors hover:bg-[#F7F8FA]"
          >
            <GoogleG className="h-5 w-5" />
            Read our {GOOGLE_REVIEWS.count} Google reviews
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Reviews left directly on the site, once approved. */}
        {reviews.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.id} className="border border-[#E2E2E6] bg-[#F7F7F8] p-6">
                <div className="mb-4 flex gap-0.5" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={i < r.rating ? "#F5B301" : "#E2E2E6"}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[15px] italic leading-relaxed text-[#636374]">
                  &ldquo;{r.body}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#E2E2E6] pt-4">
                  <span className="font-heading block text-base font-bold text-[#1A1A1F]">
                    {r.name}
                  </span>
                  {r.subjectLabel && (
                    <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider text-[#939EBA]">
                      {r.subjectLabel}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

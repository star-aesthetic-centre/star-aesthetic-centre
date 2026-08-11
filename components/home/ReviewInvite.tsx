import Image from "next/image";
import Link from "next/link";
import { Star, PenLine } from "lucide-react";

/**
 * Invitation to leave a review, sitting directly under the testimonials.
 *
 * The testimonials answer "do other people rate this clinic?" and then the
 * page moved straight on to booking — nothing asked the reader to add their
 * own. Someone who has just finished reading three good reviews is the most
 * likely person on the site to write a fourth, and that moment was going
 * unused.
 *
 * Deliberately warm rather than transactional: the ask is for a few minutes
 * of someone's time as a favour to the next patient, not a form to complete.
 */
export default function ReviewInvite() {
  return (
    <section className="bg-[#0F2647]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch lg:grid-cols-2">

        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-20 lg:pr-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C8A882]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A882]">
              Share your experience
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Someone is deciding today.
            <span className="block text-[#C8A882]">Your words could help them.</span>
          </h2>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#C9D2E4]">
            Choosing a clinic is a leap of faith — especially the first time. Most people read
            reviews for a long while before they pick up the phone, looking for someone who sounds
            like them.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#C9D2E4]">
            If Dr. Bangalee and the team looked after you well, a few honest sentences take two
            minutes and can be the reason someone finally books the treatment they have been
            putting off for years.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/submit-review"
              className="inline-flex items-center gap-2.5 bg-[#C8A882] px-8 py-4 text-sm font-bold text-[#0F2647] transition-colors hover:bg-[#D9BE9C]"
            >
              <PenLine className="h-4 w-4" />
              Write a review
            </Link>
            <span className="text-xs text-[#8E9DBB]">
              Takes about two minutes · No account needed
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
            <span className="flex items-center gap-1.5 text-xs text-[#8E9DBB]">
              <Star className="h-3.5 w-3.5 fill-[#C8A882] text-[#C8A882]" />
              Read by our team before publishing
            </span>
            <span className="text-xs text-[#8E9DBB]">Your email is never shown</span>
          </div>
        </div>

        {/* ── Image ────────────────────────────────────────────────────── */}
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="/images/star-aesthetic-centre-share-your-review-durban-north.webp"
            alt="A happy patient writing a review of Star Aesthetic Centre on her laptop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Ties the photo into the navy panel so the join does not read as a
              hard seam on wide screens. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2647] via-[#0F2647]/25 to-transparent lg:via-[#0F2647]/10" />
        </div>

      </div>
    </section>
  );
}

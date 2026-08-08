import type { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "@/components/reviews/ReviewForm";
import { getReviewSubjectOptions, isKnownTreatmentSlug, treatmentTitle } from "@/lib/reviews/questions";

export const metadata: Metadata = {
  title: "Share Your Experience | Star Aesthetic Centre",
  description:
    "Tell us about your visit to Star Aesthetic Centre in Durban North. Your review helps other patients choose with confidence.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ treatment?: string; ref?: string }>;
};

export default async function SubmitReviewPage({ searchParams }: Props) {
  const params = await searchParams;

  // Deep link from a treatment page or a review-request email arrives as
  // ?treatment=<slug>. Validate it so a bad link degrades to the general form
  // rather than pre-selecting something that doesn't exist.
  const raw = params.treatment?.trim() ?? "";
  const preselected = raw && isKnownTreatmentSlug(raw) ? raw : undefined;

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      <p className="text-xs uppercase tracking-[3px] text-[#939EBA]">Share your experience</p>
      <h1 className="mt-3 font-heading text-3xl text-[#1A1917] sm:text-4xl">
        Leave a review
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B6966]">
        {preselected ? (
          <>
            You&apos;re reviewing <strong className="text-[#1A1917]">{treatmentTitle(preselected)}</strong>.
            You can change this below if you&apos;d rather write about something else.
          </>
        ) : (
          <>
            Thank you for taking a few minutes. Choose a treatment below, or leave a general review
            about the clinic and the care you received.
          </>
        )}
      </p>

      <div className="mt-10 border border-[#E5E4E0] bg-white p-6 sm:p-8">
        <ReviewForm
          options={getReviewSubjectOptions()}
          initialTreatmentSlug={preselected}
          bookingReference={params.ref?.trim() || undefined}
        />
      </div>

      <p className="mt-8 text-center text-sm text-[#6B6966]">
        <Link href="/treatments" className="text-[#C8A882] hover:underline">
          ← Back to treatments
        </Link>
      </p>
    </main>
  );
}

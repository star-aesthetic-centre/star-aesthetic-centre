import Link from "next/link";
import type { Metadata } from "next";
import TreatmentCardGrid from "@/components/treatments/TreatmentCardGrid";
import { buildPageMetadata } from "@/lib/seo";
import { getTreatmentCards } from "@/lib/queries/treatment-cards";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Aesthetic Treatments in Durban North | Star Aesthetic Centre",
  description:
    "Explore doctor-led aesthetic treatments at Star Aesthetic Centre, Durban North — Botox, fillers, skin peels, microneedling, pigmentation, body contouring and more by Dr. Rajeev Bangalee.",
  path: "/treatments",
  keywords: [
    "aesthetic treatments Durban North",
    "cosmetic treatments Durban",
    "medical aesthetics KZN",
    "botox Durban North",
    "skin treatments Durban",
    "Dr Rajeev Bangalee treatments",
  ],
});

export default async function TreatmentsPage() {
  const cards = await getTreatmentCards();

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <nav className="mb-8 flex items-center gap-2 text-xs text-[#636374]">
          <Link href="/" className="transition-colors hover:text-[#939EBA]">
            Home
          </Link>
          <span className="text-[#E2E2E6]">›</span>
          <span className="font-semibold text-[#1A1A1F]">Treatments</span>
        </nav>

        <TreatmentCardGrid cards={cards} headingLevel="h1" />

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#E2E2E6] pt-12 sm:flex-row">
          <p className="max-w-lg text-center text-sm text-[#636374] sm:text-left">
            Not sure which treatment is right for you? Book a personal consultation with Dr. Bangalee — he will assess your skin and recommend a tailored plan.
          </p>
          <Link
            href="/book"
            className="inline-flex shrink-0 items-center justify-center bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#7A87A6]"
          >
            Book Consultation →
          </Link>
        </div>
      </main>
    </div>
  );
}

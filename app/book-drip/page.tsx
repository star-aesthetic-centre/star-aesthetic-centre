import type { Metadata } from "next";
import Link from "next/link";
import DripBookingForm from "@/components/booking/DripBookingForm";
import { buildPageMetadata } from "@/lib/seo";
import { DRIP_TYPES } from "@/lib/drip-booking-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Vitamin Drip in Durban North | Star Aesthetic Centre",
  description:
    "Book a vitamin drip at Star Aesthetic Centre, Durban North. Same-day appointments usually available, two chairs per slot, 09:00–16:00 Monday to Friday.",
  path: "/book-drip",
  ogImage: "/images/party-recovery-vitamin-drip-star-aesthetic-centre-durban-north.webp",
});

export default async function BookDripPage({
  searchParams,
}: {
  searchParams: Promise<{ drip?: string }>;
}) {
  const { drip } = await searchParams;
  const initialDrip = DRIP_TYPES.find((d) => d.slug === drip)?.slug;

  return (
    <main className="min-h-screen bg-[#F7F7F8]">
      <section className="border-b border-[#E2E2E6] bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-[#636374]">
            <Link href="/" className="hover:text-[#939EBA]">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/treatments/body-wellness/vitamin-drips" className="hover:text-[#939EBA]">
              Vitamin Drips
            </Link>
            <span className="mx-2">›</span>
            <span className="text-[#1A1A1F]">Book</span>
          </nav>
          <p className="overline mb-3 text-[#939EBA]">SAME-DAY APPOINTMENTS</p>
          <h1 className="font-heading text-3xl font-bold text-[#1A1A1F] lg:text-5xl">
            Book a Vitamin Drip
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#636374]">
            Monday to Friday 09:00–16:00, Saturdays 09:00–12:00. Two chairs per slot, so you
            can bring someone. Most days you can book for later the same day.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E2E2E6] bg-white p-6 lg:p-10">
            <DripBookingForm initialDrip={initialDrip} />
          </div>
          <p className="mt-6 text-center text-sm text-[#636374]">
            Not sure which drip?{" "}
            <Link
              href="/treatments/body-wellness/vitamin-drips"
              className="font-semibold text-[#939EBA] hover:text-[#7A87A6]"
            >
              Compare all five →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

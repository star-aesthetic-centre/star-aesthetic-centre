import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import TreatmentCategories from "@/components/home/TreatmentCategories";
import { CareApproach, MedicalExpertise } from "@/components/home/CareApproach";
import ProductBrands from "@/components/home/ProductBrands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import VitaminDripSection from "@/components/home/VitaminDripSection";
import PerksSection from "@/components/home/PerksSection";
import DoctorTrust from "@/components/home/DoctorTrust";
import SkinAssessmentCTA from "@/components/home/SkinAssessmentCTA";
import GoogleReviews from "@/components/home/GoogleReviews";
import ReviewInvite from "@/components/home/ReviewInvite";
import BookingCTA from "@/components/home/BookingCTA";
import MapSection from "@/components/home/MapSection";
import { buildPageMetadata } from "@/lib/seo";
import { getSitePageContent } from "@/lib/queries/site-pages";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSitePageContent("home");
  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
    keywords: [
      "aesthetic clinic Durban North",
      "medical aesthetics Durban",
      "botox Durban North",
      "lip fillers Durban",
      "skin peel Durban",
      "Dr Rajeev Bangalee",
      "cosmeceutical skincare Durban",
    ],
  });
}

/**
 * Revalidate hourly. The homepage reads approved reviews at request time, so
 * without this it would be built once at deploy and a newly approved review
 * would never appear until the next push.
 */
export const revalidate = 3600;

export default async function HomePage() {
  const content = await getSitePageContent("home");

  return (
    <>
      {/*
        Section order follows Dr. Bangalee's homepage brief.

        I had previously moved DoctorTrust directly under the hero, reasoning
        that the doctor is the differentiator. The brief puts him after the
        treatments, the expertise statement and the skin assessment, so that
        is where he now sits — the brief wins over my earlier reasoning.

        Shop, rewards and the drip section are not in the brief. They are kept
        but moved below the patient-facing flow, so the sequence the brief
        specifies runs uninterrupted from hero to reviews.
      */}
      <HeroSection content={content.hero} />
      <CareApproach />
      <TreatmentCategories />
      <MedicalExpertise />
      <SkinAssessmentCTA />
      <DoctorTrust content={content.doctorTrust} />
      <GoogleReviews />
      <ReviewInvite />

      {/* Not in the brief — kept, but after the sequence it specifies. */}
      <TrustStrip />
      <VitaminDripSection />
      <ProductBrands />
      <FeaturedProducts />
      <PerksSection perksRewards={content.perksRewards} />

      <BookingCTA content={content.bookingCta} />
      <MapSection />
    </>
  );
}

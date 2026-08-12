import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import TreatmentCategories from "@/components/home/TreatmentCategories";
import ProductBrands from "@/components/home/ProductBrands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PerksSection from "@/components/home/PerksSection";
import DoctorTrust from "@/components/home/DoctorTrust";
import SkinAssessmentCTA from "@/components/home/SkinAssessmentCTA";
import Testimonials from "@/components/home/Testimonials";
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

export default async function HomePage() {
  const content = await getSitePageContent("home");

  return (
    <>
      <HeroSection content={content.hero} />
      <TreatmentCategories />
      <ProductBrands />
      {/* Moved down from directly under the hero: the hero already carries
          20+ years / 6 brands / 5-star, so the two stat rows sat stacked and
          repeated each other. Here it breaks up three consecutive white
          sections instead. */}
      <TrustStrip />
      <FeaturedProducts />
      <PerksSection perksRewards={content.perksRewards} />
      <DoctorTrust content={content.doctorTrust} />
      <SkinAssessmentCTA />
      <Testimonials />
      <ReviewInvite />
      <BookingCTA content={content.bookingCta} />
      <MapSection />
    </>
  );
}

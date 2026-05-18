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
      <TrustStrip />
      <TreatmentCategories />
      <ProductBrands />
      <FeaturedProducts />
      <PerksSection perksRewards={content.perksRewards} />
      <DoctorTrust content={content.doctorTrust} />
      <SkinAssessmentCTA />
      <Testimonials />
      <BookingCTA content={content.bookingCta} />
      <MapSection />
    </>
  );
}

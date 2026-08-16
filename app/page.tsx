import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import TreatmentCategories from "@/components/home/TreatmentCategories";
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

export default async function HomePage() {
  const content = await getSitePageContent("home");

  return (
    <>
      {/*
        Order matters more than anything else on this page.

        Dr. Bangalee previously appeared eighth — below two shop sections and
        the rewards programme. The clinic's differentiator is the doctor, not
        the treatment list: hundreds of practices offer peels and filler, only
        this one offers him. So he now sits directly under the hero.

        Shop and rewards still earn their place, but after the patient has a
        reason to trust the practice. A first-time visitor is asking "can I
        trust this doctor with my face", not "how do I earn Star Lights".
      */}
      <HeroSection content={content.hero} />
      <DoctorTrust content={content.doctorTrust} />
      <TreatmentCategories />
      {/* Sits below treatments rather than under the hero, where its stat row
          duplicated the hero's own stats. */}
      <TrustStrip />
      <VitaminDripSection />
      <SkinAssessmentCTA />
      <GoogleReviews />
      <ReviewInvite />
      <ProductBrands />
      <FeaturedProducts />
      <PerksSection perksRewards={content.perksRewards} />
      <BookingCTA content={content.bookingCta} />
      <MapSection />
    </>
  );
}

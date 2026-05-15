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

export const metadata: Metadata = buildPageMetadata({
    title: "Star Aesthetic Centre — Doctor-Led Aesthetics in Durban North",
    description:
        "Doctor-led aesthetic treatments and curated medical skincare in Durban North. Botox, fillers, skin peels, microneedling and more — by Dr. Rajeev Bangalee (MB, BS). Book your consultation today.",
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

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <TrustStrip />
            <TreatmentCategories />
            <ProductBrands />
            <FeaturedProducts />
            <PerksSection />
            <DoctorTrust />
            <SkinAssessmentCTA />
            <Testimonials />
            <BookingCTA />
            <MapSection />
        </>
    );
}

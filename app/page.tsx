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

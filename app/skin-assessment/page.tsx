import type { Metadata } from "next";
import AssessmentFlow from "./AssessmentFlow";

export const metadata: Metadata = {
    title: "Free Skin Health Assessment | Star Aesthetic Centre Durban North",
    description:
        "Take the free Star Aesthetic Centre Skin Health Assessment. Answer 12 questions and receive your personalised Skin Health Score with treatment and product recommendations from Dr. Rajeev Bangalee.",
    keywords: [
        "skin health assessment durban north",
        "free skin quiz south africa",
        "skin type quiz aesthetic clinic",
        "dr bangalee skin assessment",
        "best skin treatment for me",
        "personalised skincare recommendations durban",
    ],
    openGraph: {
        title: "Free Skin Health Assessment — Star Aesthetic Centre",
        description:
            "Discover your Skin Health Score in 3 minutes. Personalised treatment & product recommendations from Dr. Rajeev Bangalee.",
        url: "https://www.staraesthetic.co.za/skin-assessment",
    },
};

export default function SkinAssessmentPage() {
    return <AssessmentFlow />;
}

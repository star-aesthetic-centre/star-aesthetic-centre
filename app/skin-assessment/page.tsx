import type { Metadata } from "next";
import AssessmentFlow from "./AssessmentFlow";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Free Skin Health Assessment | Star Aesthetic Centre Durban North",
    description:
        "Take the free Star Aesthetic Centre Skin Health Assessment. Answer 12 questions and receive your personalised Skin Health Score with treatment and product recommendations from Dr. Rajeev Bangalee.",
    path: "/skin-assessment",
    keywords: [
        "skin health assessment durban north",
        "free skin quiz south africa",
        "skin type quiz aesthetic clinic",
        "dr bangalee skin assessment",
        "best skin treatment for me",
        "personalised skincare recommendations durban",
    ],
});

export default function SkinAssessmentPage() {
    return <AssessmentFlow />;
}

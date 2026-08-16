/** Canonical category slug per treatment — single source of truth for URLs and sitemap. */
export const TREATMENT_SLUG_TO_CATEGORY: Record<string, string> = {
  "anti-wrinkle-treatment": "face",
  "lip-filler": "face",
  "jaw-amp-chin-contouring": "face",
  "dermapen-microneedling": "face",
  "skin-peel": "skin",
  "pigmentation-treatment": "skin",
  acne: "skin",
  "excessive-sweating": "skin",
  "body-contouring": "body-wellness",
  "medi-lean": "body-wellness",
  "varicose-veins": "body-wellness",
  "vitamin-drips": "body-wellness",
  // Individual drips — each targets its own search intent. "vitamin-drips"
  // remains the pillar page that links to all five.
  "hydration-vitamin-drip": "body-wellness",
  "party-recovery-drip": "body-wellness",
  "fitness-vitamin-drip": "body-wellness",
  "glutathione-brightening-drip": "body-wellness",
  "ultimate-vitamin-drip": "body-wellness",
};

export function treatmentPath(slug: string): string {
  const category = TREATMENT_SLUG_TO_CATEGORY[slug] ?? "skin";
  return `/treatments/${category}/${slug}`;
}

export function treatmentUrl(slug: string, siteUrl = "https://staraesthetic.co.za"): string {
  return `${siteUrl}${treatmentPath(slug)}`;
}

export const ALL_TREATMENT_SLUGS = Object.keys(TREATMENT_SLUG_TO_CATEGORY);

export const TREATMENT_LISTING_CATEGORIES = [
  {
    slug: "face",
    name: "Injectables & Facial Aesthetics",
    treatments: [
      { slug: "anti-wrinkle-treatment", image: "/images/anti-wrinkle-treatment-star-aesthetic-centre-durban-north-01.webp", imageAlt: "Anti-Wrinkle Treatment — natural refreshed results, Durban North" },
      { slug: "lip-filler", image: "/images/lip-filler-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Lip Filler Treatment — natural lip enhancement, Durban North" },
      { slug: "jaw-amp-chin-contouring", image: "/images/jaw-and-chin-contouring-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Jaw and chin contouring filler Durban" },
      { slug: "dermapen-microneedling", image: "/images/dermapen-microneedling-star-aesthetic-centre-durban-north.webp", imageAlt: "Dermapen microneedling skin renewal Durban" },
    ],
  },
  {
    slug: "skin",
    name: "Medical Skin Treatments",
    treatments: [
      { slug: "acne", image: "/images/acne-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Acne scarring treatment Durban North" },
      { slug: "pigmentation-treatment", image: "/images/pigmentation-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Pigmentation melasma treatment Durban" },
      { slug: "skin-peel", image: "/images/skin-peel-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Chemical skin peel rejuvenation Durban" },
    ],
  },
  {
    slug: "body-wellness",
    name: "Health, Wellness & Body",
    treatments: [
      { slug: "vitamin-drips", image: "/images/vitamin-drip-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Vitamin drip IV therapy wellness Durban" },
      { slug: "medi-lean", image: "/images/medi-lean-weight-loss-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Medi-Lean weight loss programme Durban" },
      { slug: "excessive-sweating", image: "/images/excessive-sweating-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Excessive sweating hyperhidrosis treatment Durban" },
      { slug: "body-contouring", image: "/images/body-contouring-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Body contouring fat reduction Durban" },
      { slug: "varicose-veins", image: "/images/varicose-veins-treatment-star-aesthetic-centre-durban-north.webp", imageAlt: "Varicose vein sclerotherapy Durban" },
    ],
  },
] as const;

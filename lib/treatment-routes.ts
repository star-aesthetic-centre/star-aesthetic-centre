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
      { slug: "anti-wrinkle-treatment", image: "/images/botox-anti-aging-injections-durban.webp", imageAlt: "Anti-Wrinkle Treatment Durban North" },
      { slug: "lip-filler", image: "/images/lip-filler-augmentation-durban-north.webp", imageAlt: "Lip filler augmentation Durban North" },
      { slug: "jaw-amp-chin-contouring", image: "/images/jaw-chin-contouring-filler-durban.webp", imageAlt: "Jaw and chin contouring filler Durban" },
      { slug: "dermapen-microneedling", image: "/images/dermapen-microneedling-skin-renewal.webp", imageAlt: "Dermapen microneedling skin renewal Durban" },
    ],
  },
  {
    slug: "skin",
    name: "Medical Skin Treatments",
    treatments: [
      { slug: "acne", image: "/images/acne-scarring-treatment-durban-north.webp", imageAlt: "Acne scarring treatment Durban North" },
      { slug: "pigmentation-treatment", image: "/images/pigmentation-melasma-treatment-durban.webp", imageAlt: "Pigmentation melasma treatment Durban" },
      { slug: "skin-peel", image: "/images/chemical-skin-peel-rejuvenation.webp", imageAlt: "Chemical skin peel rejuvenation Durban" },
    ],
  },
  {
    slug: "body-wellness",
    name: "Health, Wellness & Body",
    treatments: [
      { slug: "vitamin-drips", image: "/images/vitamin-drip-iv-therapy-wellness.webp", imageAlt: "Vitamin drip IV therapy wellness Durban" },
      { slug: "medi-lean", image: "/images/medi-lean-weight-loss-diet-program.webp", imageAlt: "Medi-Lean weight loss programme Durban" },
      { slug: "excessive-sweating", image: "/images/excessive-sweating-hyperhidrosis-treatment.webp", imageAlt: "Excessive sweating hyperhidrosis treatment Durban" },
      { slug: "body-contouring", image: "/images/body-contouring-fat-reduction-durban.webp", imageAlt: "Body contouring fat reduction Durban" },
      { slug: "varicose-veins", image: "/images/varicose-vein-removal-sclerotherapy.webp", imageAlt: "Varicose vein sclerotherapy Durban" },
    ],
  },
] as const;

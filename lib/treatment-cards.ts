/** Shared treatment card data — used on homepage and /treatments page. */
export interface TreatmentCardItem {
  name: string;
  category: string;
  slug: string;
  priceFrom: number;
  image: string;
  imageAlt: string;
}

const WP = "/images";

export const TREATMENT_CARDS: TreatmentCardItem[] = [
  { name: "Anti-Wrinkle Treatment", category: "face", slug: "anti-wrinkle-treatment", priceFrom: 1800, image: `${WP}/anti-wrinkle-treatment-star-aesthetic-centre-durban-north-01.webp`, imageAlt: "Anti-Wrinkle Treatment — natural refreshed results, Durban North" },
  { name: "Lip Filler Treatment", category: "face", slug: "lip-filler", priceFrom: 2500, image: `${WP}/lip-filler-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Lip Filler Treatment — natural lip enhancement, Durban North" },
  { name: "Jaw & Chin Contouring", category: "face", slug: "jaw-amp-chin-contouring", priceFrom: 2500, image: `${WP}/jaw-and-chin-contouring-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Jaw and Chin Contouring Filler Durban" },
  { name: "Dermapen Microneedling", category: "face", slug: "dermapen-microneedling", priceFrom: 1900, image: `${WP}/dermapen-microneedling-star-aesthetic-centre-durban-north.webp`, imageAlt: "Dermapen Microneedling Skin Renewal" },
  { name: "Chemical Skin Peel", category: "skin", slug: "skin-peel", priceFrom: 665, image: `${WP}/skin-peel-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Chemical Skin Peel Rejuvenation" },
  { name: "Pigmentation & Melasma", category: "skin", slug: "pigmentation-treatment", priceFrom: 850, image: `${WP}/pigmentation-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Pigmentation Melasma Treatment Durban" },
  { name: "Acne Treatment", category: "skin", slug: "acne", priceFrom: 850, image: `${WP}/acne-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Acne Treatment Durban North" },
  { name: "Excessive Sweating", category: "skin", slug: "excessive-sweating", priceFrom: 3800, image: `${WP}/excessive-sweating-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Excessive Sweating Hyperhidrosis Treatment" },
  { name: "Body Contouring", category: "body-wellness", slug: "body-contouring", priceFrom: 850, image: `${WP}/body-contouring-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Body Contouring Fat Reduction Durban" },
  { name: "Medi-Lean Weight Loss", category: "body-wellness", slug: "medi-lean", priceFrom: 850, image: `${WP}/medi-lean-weight-loss-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Medi-Lean Weight Loss Diet Program" },
  { name: "Varicose Vein Removal", category: "body-wellness", slug: "varicose-veins", priceFrom: 850, image: `${WP}/varicose-veins-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Varicose Vein Removal Sclerotherapy" },
  { name: "Vitamin IV Therapy", category: "body-wellness", slug: "vitamin-drips", priceFrom: 1265, image: `${WP}/vitamin-drip-treatment-star-aesthetic-centre-durban-north.webp`, imageAlt: "Vitamin Drip IV Therapy Wellness" },

  // Individual drips. Not shown in the main /treatments grid — that keeps the
  // "Vitamin IV Therapy" pillar card as the single entry point. Listed here so
  // each drip page has its own card image for social sharing and the pillar.
  { name: "Party Recovery Drip", category: "body-wellness", slug: "party-recovery-drip", priceFrom: 1465, image: `${WP}/party-recovery-vitamin-drip-star-aesthetic-centre-durban-north.webp`, imageAlt: "Friends celebrating with champagne — party recovery vitamin drip, Durban North" },
  { name: "Hydration Vitamin Drip", category: "body-wellness", slug: "hydration-vitamin-drip", priceFrom: 1265, image: `${WP}/hydration-vitamin-drip-star-aesthetic-centre-durban-north.webp`, imageAlt: "Woman looking refreshed and restored after a hydration vitamin drip in Durban North" },
  { name: "Fitness & Recovery Drip", category: "body-wellness", slug: "fitness-vitamin-drip", priceFrom: 1620, image: `${WP}/fitness-vitamin-drip-star-aesthetic-centre-durban-north.webp`, imageAlt: "Runner on an open road at sunrise — fitness and recovery vitamin drip, Durban North" },
  { name: "Glutathione & Vitamin C Drip", category: "body-wellness", slug: "glutathione-brightening-drip", priceFrom: 1070, image: `${WP}/glutathione-brightening-drip-star-aesthetic-centre-durban-north.webp`, imageAlt: "Healthy retired couple walking at sunrise over the sea — glutathione and vitamin C drip, Durban North" },
  { name: "Ultimate Vitamin Drip", category: "body-wellness", slug: "ultimate-vitamin-drip", priceFrom: 1870, image: `${WP}/ultimate-vitamin-drip-star-aesthetic-centre-durban-north.webp`, imageAlt: "Fresh fruit and vegetables representing the full vitamin spectrum — ultimate vitamin drip, Durban North" },
];

export function treatmentCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    face: "Face",
    skin: "Skin",
    "body-wellness": "Body & Wellness",
  };
  return labels[category] ?? category.replace(/-/g, " ");
}

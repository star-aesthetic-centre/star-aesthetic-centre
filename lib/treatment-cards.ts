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
  { name: "Anti-Wrinkle Treatment", category: "face", slug: "anti-wrinkle-treatment", priceFrom: 1900, image: `${WP}/botox-anti-aging-injections-durban.webp`, imageAlt: "Anti-Wrinkle Treatment Durban North" },
  { name: "Lip Augmentation", category: "face", slug: "lip-filler", priceFrom: 2500, image: `${WP}/lip-filler-augmentation-durban-north.webp`, imageAlt: "Lip Filler Augmentation Durban North" },
  { name: "Jaw & Chin Contouring", category: "face", slug: "jaw-amp-chin-contouring", priceFrom: 2500, image: `${WP}/jaw-chin-contouring-filler-durban.webp`, imageAlt: "Jaw and Chin Contouring Filler Durban" },
  { name: "Dermapen Microneedling", category: "face", slug: "dermapen-microneedling", priceFrom: 1900, image: `${WP}/dermapen-microneedling-skin-renewal.webp`, imageAlt: "Dermapen Microneedling Skin Renewal" },
  { name: "Chemical Skin Peel", category: "skin", slug: "skin-peel", priceFrom: 665, image: `${WP}/chemical-skin-peel-rejuvenation.webp`, imageAlt: "Chemical Skin Peel Rejuvenation" },
  { name: "Pigmentation & Melasma", category: "skin", slug: "pigmentation-treatment", priceFrom: 850, image: `${WP}/pigmentation-melasma-treatment-durban.webp`, imageAlt: "Pigmentation Melasma Treatment Durban" },
  { name: "Acne Treatment", category: "skin", slug: "acne", priceFrom: 850, image: `${WP}/acne-scarring-treatment-durban-north.webp`, imageAlt: "Acne Treatment Durban North" },
  { name: "Excessive Sweating", category: "skin", slug: "excessive-sweating", priceFrom: 3800, image: `${WP}/excessive-sweating-hyperhidrosis-treatment.webp`, imageAlt: "Excessive Sweating Hyperhidrosis Treatment" },
  { name: "Body Contouring", category: "body-wellness", slug: "body-contouring", priceFrom: 850, image: `${WP}/body-contouring-fat-reduction-durban.webp`, imageAlt: "Body Contouring Fat Reduction Durban" },
  { name: "Medi-Lean Weight Loss", category: "body-wellness", slug: "medi-lean", priceFrom: 850, image: `${WP}/medi-lean-weight-loss-diet-program.webp`, imageAlt: "Medi-Lean Weight Loss Diet Program" },
  { name: "Varicose Vein Removal", category: "body-wellness", slug: "varicose-veins", priceFrom: 850, image: `${WP}/varicose-vein-removal-sclerotherapy.webp`, imageAlt: "Varicose Vein Removal Sclerotherapy" },
  { name: "Vitamin IV Therapy", category: "body-wellness", slug: "vitamin-drips", priceFrom: 1265, image: `${WP}/vitamin-drip-iv-therapy-wellness.webp`, imageAlt: "Vitamin Drip IV Therapy Wellness" },
];

export function treatmentCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    face: "Face",
    skin: "Skin",
    "body-wellness": "Body & Wellness",
  };
  return labels[category] ?? category.replace(/-/g, " ");
}

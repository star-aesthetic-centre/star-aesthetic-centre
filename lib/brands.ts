// ─── Brand Configuration ──────────────────────────────────────────────────────
// Single source of truth for all brand data across the site.
// Used by: homepage ProductBrands, shop sidebar, brand archive pages.
const WC_BASE = "http://star-aesthetic-centre.local/wp-content/uploads";

export interface Brand {
    name: string;
    slug: string;               // used in /shop/brands/[brand]
    categorySlug: string;       // WooCommerce product_cat slug to filter by
    logo: string;               // full URL from WooCommerce uploads
    accent: string;             // brand primary colour (hex)
    tagline: string;
    shortDescription: string;
    about: string;              // 2-sentence brand background for archive page
    whyWeStock: string;         // Dr. Bangalee's reason for stocking
}

export const brands: Brand[] = [
    {
        name: "Dermaceutic",
        slug: "dermaceutic",
        categorySlug: "dermaceutic-laboratoire",
        logo: `${WC_BASE}/dermaceutic-logo-04.webp`,
        accent: "#939EBA",
        tagline: "Pharmaceutical-grade skincare. Clinically proven results.",
        shortDescription:
            "French pharmaceutical skincare brand trusted by 30,000 skin professionals globally. Every formula is developed and manufactured in France to strict pharmaceutical standards.",
        about:
            "Dermaceutic was founded in France with a singular mission: bring genuine pharmaceutical science to daily skincare. Each product is clinically tested at independent European research organisations and manufactured under pharmaceutical-grade quality controls.",
        whyWeStock:
            "Dermaceutic's clinical data is verifiable and their formulations do not contain invented ingredients — every active is at a concentration that produces measurable results. They are my first-line recommendation for patients maintaining clinical treatment results at home.",
    },
    {
        name: "Heliocare",
        slug: "heliocare",
        categorySlug: "heliocare-products",
        logo: `${WC_BASE}/heliocare-360-logo-01.webp`,
        accent: "#F47920",
        tagline: "360° sun protection. Powered by Fernblock®.",
        shortDescription:
            "The world's most advanced photoprotection brand, built around the patented Fernblock® technology — a fern-derived extract that protects skin at the cellular level from UV, infrared and blue light damage.",
        about:
            "Heliocare is developed by Cantabria Labs, a Spanish pharmaceutical dermatology company. Founded by dermatologists, the brand holds over 60 published clinical studies on Fernblock® and its photoprotective effects — making it the most rigorously studied sunscreen brand in the world.",
        whyWeStock:
            "SPF is the single most impactful daily skincare habit. Heliocare offers the broadest 360° protection available — UVA, UVB, infrared and blue light — combined with internal cellular defence via the oral capsules. It is the SPF range I prescribe after every clinical treatment.",
    },
    {
        name: "ISDIN",
        slug: "isdin",
        categorySlug: "isdin-products",
        logo: `${WC_BASE}/isdin-aestethic-logo-02.webp`,
        accent: "#0072BC",
        tagline: "Dermatologist-developed. Innovation-led skincare.",
        shortDescription: "Content coming soon.",
        about: "",
        whyWeStock: "",
    },
    {
        name: "Mesoestetic",
        slug: "mesoestetic",
        categorySlug: "mesoestetic-products",
        logo: `${WC_BASE}/mesoestetic-logo-01.webp`,
        accent: "#2D2D2D",
        tagline: "Aesthetic medicine meets advanced cosmetics.",
        shortDescription: "Content coming soon.",
        about: "",
        whyWeStock: "",
    },
    {
        name: "NeoStrata",
        slug: "neostrata",
        categorySlug: "neostrata-products",
        logo: `${WC_BASE}/neostrata-logo-02.webp`,
        accent: "#4A7C59",
        tagline: "The science of skin renewal. Since 1988.",
        shortDescription: "Content coming soon.",
        about: "",
        whyWeStock: "",
    },
    {
        name: "SkinCeuticals",
        slug: "skinceuticals",
        categorySlug: "skinceuticals-products",
        logo: `${WC_BASE}/skinceuticals-logo-01.webp`,
        accent: "#C8A96E",
        tagline: "Prevent. Correct. Protect.",
        shortDescription:
            "SkinCeuticals is the world's leading medical-grade antioxidant skincare brand. Their patented Duke University Duke Antioxidant formula — vitamin C, vitamin E, and ferulic acid — is the gold standard in topical antioxidant science.",
        about:
            "SkinCeuticals was founded following breakthrough research at Duke University on topical antioxidant stabilisation. Their L-Ascorbic Acid formulations (most notably C E Ferulic) have been validated in independent peer-reviewed studies and remain the most widely cited topical antioxidants in dermatological literature.",
        whyWeStock:
            "SkinCeuticals Vitamin C serums are the clinical benchmark against which every other antioxidant product is measured. Their formulations produce the most consistent and measurable increase in skin antioxidant defence I observe in my patients.",
    },
];

export function getBrandBySlug(slug: string): Brand | undefined {
    return brands.find((b) => b.slug === slug);
}

export function getBrandFromCategoryName(categoryName: string): Brand | undefined {
    const lower = categoryName.toLowerCase();
    return brands.find((b) =>
        lower.includes(b.name.toLowerCase()) ||
        lower.includes(b.slug.toLowerCase())
    );
}

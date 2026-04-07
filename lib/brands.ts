// ─── Brand Configuration ──────────────────────────────────────────────────────
// Single source of truth for all brand data across the site.
// Used by: homepage ProductBrands, shop sidebar, brand archive pages.
const WC_BASE = "/images";

export interface BrandSubcategory {
    label: string;   // display name, e.g. "RESURFACE Range"
    subtitle: string; // e.g. "Alpha Hydroxy Acids (AHAs)"
}

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
    /** Optional: keyed by subcategory value in products table */
    subcategoryDescriptions?: Record<string, BrandSubcategory>;
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
        subcategoryDescriptions: {
            "CLEANSE":          { label: "CLEANSE",           subtitle: "Purify without compromising your skin barrier" },
            "HYDRATE & RECOVER":{ label: "HYDRATE & RECOVER", subtitle: "Replenish moisture and rebuild skin resilience" },
            "BRIGHTEN":         { label: "BRIGHTEN",          subtitle: "Vitamin C and actives for radiance and even tone" },
            "PIGMENTATION":     { label: "PIGMENTATION",      subtitle: "Targeted correction for dark spots and uneven patches" },
            "ANTI-AGING":       { label: "ANTI-AGING",        subtitle: "Retinol-based renewal for lines, texture and firmness" },
            "POST-TREATMENT":   { label: "POST-TREATMENT",    subtitle: "Clinical support after in-clinic procedures" },
        },
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
        subcategoryDescriptions: {
            "FACE SPF":      { label: "Face Sunscreens",           subtitle: "Daily SPF 50+ protection for every skin type and texture" },
            "TINTED SPF":    { label: "Tinted Sunscreens",         subtitle: "SPF 50+ with natural coverage — skip the foundation" },
            "SPECIALIZED":   { label: "Specialized Treatment SPF", subtitle: "Medical-grade protection for actinic keratosis and pigmentation" },
            "ORAL":          { label: "Oral Sun Protection",       subtitle: "Fernblock® capsules — internal cellular sun defence" },
            "PEDIATRIC":     { label: "Pediatric Range",           subtitle: "Gentle, mineral-based protection formulated for children" },
            "BODY & FAMILY": { label: "Body & Family",             subtitle: "Easy-application SPF for the whole family" },
        },
    },
    {
        name: "ISDIN",
        slug: "isdin",
        categorySlug: "isdin-products",
        logo: `${WC_BASE}/isdin-aestethic-logo-02.webp`,
        accent: "#0072BC",
        tagline: "Dermatologist-developed. Innovation-led skincare.",
        shortDescription:
            "ISDIN is a Spanish dermatologist-developed brand with over 40 years of skin science innovation. Their Fusion Water Magic and UV Mineral ranges deliver next-generation sun protection for South African conditions — lightweight, invisible, and clinically tested.",
        about:
            "ISDIN was founded in Barcelona in 1975 by dermatologists and pharmacists with a shared belief: skincare should be built on science, not marketing. Today ISDIN operates in over 40 countries and holds one of the largest dermatology research portfolios in Europe.",
        whyWeStock:
            "ISDIN's sun protection technology is genuinely ahead of the market. The Fusion Water Magic formula sets invisible on contact — no white cast, no residue — which means patients actually reapply it. Compliance is the biggest challenge with SPF. ISDIN solves it.",
    },
    {
        name: "Mesoestetic",
        slug: "mesoestetic",
        categorySlug: "mesoestetic-products",
        logo: `${WC_BASE}/mesoestetic-logo-01.webp`,
        accent: "#2D2D2D",
        tagline: "Aesthetic medicine meets advanced cosmetics.",
        shortDescription:
            "Mesoestetic is a Spanish pharmaceutical laboratory that bridges in-clinic aesthetic medicine and home skincare. Their cosmeceutical formulas are designed to work in synergy with professional treatments including chemical peels, mesotherapy, and laser.",
        about:
            "Founded in Barcelona in 1992 by a team of biochemists and dermatologists, Mesoestetic supplies products to aesthetic clinics and medical spas in over 90 countries. Every formula is manufactured in their ISO-certified pharmaceutical facility and validated in clinical studies.",
        whyWeStock:
            "Mesoestetic home care is specifically designed to extend and protect the results of in-clinic treatments. When patients use Mesoestetic after a chemical peel or Dermapen session, the clinical outcomes are measurably better and last longer. It is not decorative cosmetics — it is a clinical bridge.",
        subcategoryDescriptions: {
            "CLEANSE & PREP":  { label: "CLEANSE & PREP",   subtitle: "Prepare the skin to maximise treatment absorption" },
            "HYDRATE":         { label: "HYDRATE",           subtitle: "Multi-level hydration and barrier nourishment" },
            "ANTI-AGING":      { label: "ANTI-AGING",        subtitle: "Antioxidant and peptide actives for age correction" },
            "DEPIGMENTATION":  { label: "DEPIGMENTATION",    subtitle: "Professional-grade pigmentation correction" },
            "RECOVERY":        { label: "RECOVERY",          subtitle: "Soothing and regenerating support post-treatment" },
        },
    },
    {
        name: "NeoStrata",
        slug: "neostrata",
        categorySlug: "neostrata-products",
        logo: `${WC_BASE}/neostrata-logo-02.webp`,
        accent: "#4A7C59",
        tagline: "The science of skin renewal. Since 1988.",
        shortDescription:
            "NeoStrata invented the clinical application of Alpha Hydroxy Acids (AHAs) in skincare. Founded by the scientists who first described how AHAs resurface and renew skin, their formulas deliver genuine exfoliation, pigmentation correction, and barrier strengthening backed by 35 years of research.",
        about:
            "NeoStrata was founded in 1988 by Drs. Eugene Van Scott and Ruey Yu — the dermatologists who first discovered and published the skin renewal properties of Alpha Hydroxy Acids. Every NeoStrata formula is built on this original science and validated through continued clinical research at their Princeton, New Jersey research facility.",
        whyWeStock:
            "NeoStrata owns the foundational AHA science. When I prescribe an exfoliating home care programme, NeoStrata formulas deliver the most consistent, clinically verifiable results for pigmentation, surface texture, and skin renewal. This is not a trend brand — it is a 35-year scientific institution.",
        subcategoryDescriptions: {
            "RESURFACE":    { label: "RESURFACE Range",    subtitle: "Alpha Hydroxy Acids (AHAs) — resurface, smooth and renew" },
            "RESTORE":      { label: "RESTORE Range",      subtitle: "Polyhydroxy Acids (PHAs) — gentle exfoliation with deep hydration" },
            "CLARIFY":      { label: "CLARIFY Range",      subtitle: "For oily, acne-prone and congested skin" },
            "ENLIGHTEN":    { label: "ENLIGHTEN Range",    subtitle: "Brightening and pigmentation correction" },
            "SKIN ACTIVE":  { label: "SKIN ACTIVE Range",  subtitle: "Advanced anti-ageing and collagen support" },
            "VALUE PACKS":  { label: "Value Packs",        subtitle: "Bundled sets for focused results" },
        },
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
        subcategoryDescriptions: {
            "CLEANSE":  { label: "CLEANSE",  subtitle: "The foundation — remove impurities without compromising your barrier" },
            "PREVENT":  { label: "PREVENT",  subtitle: "Antioxidant protection against UV, pollution and oxidative damage" },
            "CORRECT":  { label: "CORRECT",  subtitle: "Targeted treatments for ageing, pigmentation, acne and resurfacing" },
            "HYDRATE":  { label: "HYDRATE",  subtitle: "Moisture and barrier support — replenish and retain hydration" },
            "PROTECT":  { label: "PROTECT",  subtitle: "Daily UV defence — the single most impactful skincare habit" },
        },
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

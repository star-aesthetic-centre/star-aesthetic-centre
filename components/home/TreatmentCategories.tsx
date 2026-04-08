"use client";
import Link from "next/link";
import Image from "next/image";

const WP = "/images";

/* ── Treatment data: category + slug must match /treatments/[category]/[slug] route ── */
const treatments = [
    {
        name: "Anti-Ageing Injections",
        category: "face",
        slug: "botox",
        image: `${WP}/botox-anti-aging-injections-durban.webp`,
        imageAlt: "Botox Anti-Aging Injections Durban",
    },
    {
        name: "Lip Augmentation",
        category: "face",
        slug: "lip-filler",
        image: `${WP}/lip-filler-augmentation-durban-north.webp`,
        imageAlt: "Lip Filler Augmentation Durban North",
    },
    {
        name: "Jaw & Chin Contouring",
        category: "face",
        slug: "jaw-amp-chin-contouring",
        image: `${WP}/jaw-chin-contouring-filler-durban.webp`,
        imageAlt: "Jaw and Chin Contouring Filler Durban",
    },
    {
        name: "Dermapen Microneedling",
        category: "face",
        slug: "dermapen-microneedling",
        image: `${WP}/dermapen-microneedling-skin-renewal.webp`,
        imageAlt: "Dermapen Microneedling Skin Renewal",
    },
    {
        name: "Chemical Skin Peel",
        category: "skin",
        slug: "skin-peel",
        image: `${WP}/chemical-skin-peel-rejuvenation.webp`,
        imageAlt: "Chemical Skin Peel Rejuvenation",
    },
    {
        name: "Pigmentation & Melasma",
        category: "skin",
        slug: "pigmentation-treatment",
        image: `${WP}/pigmentation-melasma-treatment-durban.webp`,
        imageAlt: "Pigmentation Melasma Treatment Durban",
    },
    {
        name: "Acne Treatment",
        category: "skin",
        slug: "acne",
        image: `${WP}/acne-scarring-treatment-durban-north.webp`,
        imageAlt: "Acne Treatment Durban North",
    },
    {
        name: "Excessive Sweating",
        category: "skin",
        slug: "excessive-sweating",
        image: `${WP}/excessive-sweating-hyperhidrosis-treatment.webp`,
        imageAlt: "Excessive Sweating Hyperhidrosis Treatment",
    },
    {
        name: "Body Contouring",
        category: "body-wellness",
        slug: "body-contouring",
        image: `${WP}/body-contouring-fat-reduction-durban.webp`,
        imageAlt: "Body Contouring Fat Reduction Durban",
    },
    {
        name: "Medi-Lean Weight Loss",
        category: "body-wellness",
        slug: "medi-lean",
        image: `${WP}/medi-lean-weight-loss-diet-program.webp`,
        imageAlt: "Medi-Lean Weight Loss Diet Program",
    },
    {
        name: "Varicose Vein Removal",
        category: "body-wellness",
        slug: "varicose-veins",
        image: `${WP}/varicose-vein-removal-sclerotherapy.webp`,
        imageAlt: "Varicose Vein Removal Sclerotherapy",
    },
    {
        name: "Vitamin IV Therapy",
        category: "body-wellness",
        slug: "vitamin-drips",
        image: `${WP}/vitamin-drip-iv-therapy-wellness.webp`,
        imageAlt: "Vitamin Drip IV Therapy Wellness",
    },
];

export default function TreatmentCategories() {
    return (
        <section className="bg-[#F7F7F8] py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#939EBA]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                                Our Treatments
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
                            Medical Aesthetic
                            <br />Excellence
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed text-[#636374] sm:text-right">
                        Every treatment personally performed by Dr. Rajeev Bangalee for safe, clinical, natural-looking results.
                    </p>
                </div>

                {/* Treatment grid — 12 cards matching product card style */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {treatments.map((t) => (
                        <Link
                            key={`${t.category}-${t.slug}`}
                            href={`/treatments/${t.category}/${t.slug}`}
                            className="group relative flex flex-col overflow-hidden border border-[#E2E2E6] bg-white transition-all hover:-translate-y-1 hover:border-[#939EBA]/30 hover:shadow-lg hover:shadow-[#939EBA]/10"
                        >
                            {/* Treatment image */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F8]">
                                <Image
                                    src={t.image}
                                    alt={t.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />

                                {/* Hover overlay — slides up from bottom, same as ProductCard */}
                                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M9 5l7 7-7 7"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                        />
                                    </svg>
                                    Read More
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                                {/* Category label */}
                                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
                                    {t.category.replace("-", " & ").replace("body wellness", "Body & Wellness")}
                                </p>
                                {/* Treatment name */}
                                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1A1A1F]">
                                    {t.name}
                                </h3>
                                {/* Placeholder price — update when official prices confirmed */}
                                <p className="mt-2 text-xs font-semibold text-[#636374]">
                                    From <span className="font-bold text-[#1B3D6E]">R 850</span> per session
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

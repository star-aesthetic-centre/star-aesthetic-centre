import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Activity, CreditCard, ChevronDown } from "lucide-react";
import treatmentsData from "@/lib/data/treatments.json";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { RichText } from "@/lib/utils/richText";
import { NikiAgentCard } from "@/components/treatments/NikiAgentCard";
import { getTreatmentRecommendations, formatPrice, type TreatmentRecommendation } from "@/lib/queries/supabase-products";
import { RewardsCard } from "@/components/shared/RewardsCard";
import { GiftVoucherCard } from "@/components/shared/GiftVoucherCard";
import JsonLd from "@/components/seo/JsonLd";
import { NikiPageContextBridge } from "@/components/niki/NikiPageContextBridge";
import {
  buildPageMetadata,
  breadcrumbSchema,
  canonicalUrl,
  faqPageSchema,
  medicalProcedureSchema,
  stripHtml,
} from "@/lib/seo";
import { TREATMENT_SLUG_TO_CATEGORY, treatmentPath } from "@/lib/treatment-routes";

interface TreatmentPageProps {
    params: Promise<{ category: string; slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
    const { slug } = await params;
    const treatment = treatmentsData.find((t: { slug: string }) => t.slug === slug);
    if (!treatment) return { title: "Treatment Not Found" };

    // Fetch DB overrides for title and meta fields
    const supabase = createSupabaseAdmin();
    const { data: db } = await supabase
        .from("treatments")
        .select("title, meta_title, meta_description, meta_keywords, og_image")
        .eq("slug", slug)
        .single();

    const displayTitle = db?.title || treatment.title;
    const path = treatmentPath(slug);
    const title = db?.meta_title || `${displayTitle} in Durban North | Star Aesthetic Centre`;
    const description =
        db?.meta_description ||
        `${displayTitle} at Star Aesthetic Centre, Durban North. ${stripHtml(treatment.quickSummary ?? treatment.tagline).slice(0, 120)} Book a consultation today.`;

    return buildPageMetadata({
        title,
        description,
        path,
        keywords: db?.meta_keywords
            ? db.meta_keywords.split(",").map((k: string) => k.trim())
            : [
                  `${displayTitle} Durban`,
                  `${displayTitle} Durban North`,
                  `aesthetic ${displayTitle.toLowerCase()} KZN`,
                  "Dr Rajeev Bangalee",
                  "Star Aesthetic Centre",
              ],
        ...(db?.og_image ? { ogImage: db.og_image } : {}),
    });
}

/**
 * Splits a string on double-newlines and renders each chunk as a <p> with
 * **bold** marker support via RichText. Used for multi-paragraph fields
 * like whatIs.
 */
function RichBody({ text }: { text: string }) {
    const paragraphs = text.split(/\n\n+/).filter(Boolean);
    return (
        <div className="space-y-4">
            {paragraphs.map((para, i) => (
                <RichText
                    key={i}
                    text={para}
                    as="p"
                    className="text-[#636374] leading-relaxed"
                />
            ))}
        </div>
    );
}

/**
 * Renders "Expected Results & Timeline" content.
 * If the text contains time-period markers (Days, Week, Weeks, Month, Months)
 * it renders a visual dot-and-line timeline. Otherwise falls back to RichText.
 */
function ResultsTimeline({ text }: { text: string }) {
    // Split on timeline markers, keeping the marker at the start of each chunk
    const parts = text
        .split(/(?=(?:Days?|Weeks?|Months?)\s+[\d–\-]+:)/i)
        .map(s => s.trim())
        .filter(Boolean);

    if (parts.length <= 1) {
        return <RichText text={text} as="p" className="text-[#636374] leading-relaxed" />;
    }

    const items = parts.map(part => {
        const match = part.match(/^((?:Days?|Weeks?|Months?)\s+[\d–\-]+):\s*([\s\S]*)/i);
        return match
            ? { period: match[1], description: match[2].trim() }
            : { period: '', description: part };
    }).filter(item => item.period && item.description);

    return (
        <div className="space-y-0">
            {items.map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                    {/* Connecting line between dots */}
                    {i < items.length - 1 && (
                        <div className="absolute left-[7px] top-5 bottom-0 w-[2px] bg-[#E2E2E6]" />
                    )}
                    {/* Dot */}
                    <div className="mt-1 w-4 h-4 rounded-full bg-[#939EBA] shrink-0 relative z-10 border-2 border-white ring-2 ring-[#939EBA]" />
                    {/* Content */}
                    <div className="pb-5 flex-1">
                        <span className="block text-sm font-bold text-[#1A1A1F] mb-1">
                            {item.period}
                        </span>
                        <RichText
                            text={item.description}
                            as="p"
                            className="text-sm text-[#636374] leading-relaxed"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Phase display order
const PHASE_ORDER = [
    "pre-treatment",
    "post-treatment",
    "during-protocol",
    "maintenance",
    "complementary",
];

export default async function TreatmentDetail({ params }: TreatmentPageProps) {
    const { category, slug } = await params;
    const treatment = treatmentsData.find((t: { slug: string }) => t.slug === slug);

    if (!treatment) {
        notFound();
    }

    const expectedCategory = TREATMENT_SLUG_TO_CATEGORY[slug];
    if (expectedCategory && category !== expectedCategory) {
        notFound();
    }

    // Fetch DB overrides (title, content, pricing) — prefer DB when set
    const supabase = createSupabaseAdmin();
    const { data: db } = await supabase
        .from("treatments")
        .select("title, tagline, price_from, duration, downtime, hero_text, what_is, expected_results, how_works, suitable_for, faqs")
        .eq("slug", slug)
        .single();

    // Merge: DB values take priority over JSON when non-null
    type DbFaq = { question: string; answer: string };
    const displayTitle    = db?.title || treatment.title;
    const displayTagline  = db?.tagline ?? treatment.tagline;
    const displayPrice    = db?.price_from || treatment.priceFrom;
    const displayDuration = db?.duration || treatment.duration;
    const displayDowntime = db?.downtime || treatment.downtime;
    const displayFaqs: DbFaq[] =
        (Array.isArray(db?.faqs) && (db.faqs as DbFaq[]).length > 0)
            ? (db.faqs as DbFaq[])
            : ((treatment as { faqs?: DbFaq[] }).faqs ?? []);
    const displayHowWorks: string[] =
        Array.isArray(db?.how_works) && (db.how_works as string[]).length > 0
            ? (db.how_works as string[])
            : ((treatment as { howWorks?: string[] }).howWorks ?? []);
    const displaySuitableFor: string[] =
        Array.isArray(db?.suitable_for) && (db.suitable_for as string[]).length > 0
            ? (db.suitable_for as string[])
            : ((treatment as { suitableFor?: string[] }).suitableFor ?? []);

    const pagePath = treatmentPath(slug);
    const pageUrl = canonicalUrl(pagePath);

    const structuredData = [
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Treatments", path: "/treatments" },
            { name: displayTitle, path: pagePath },
        ]),
        medicalProcedureSchema({
            name: displayTitle,
            description: treatment.quickSummary ?? treatment.tagline,
            url: pageUrl,
            priceFrom: displayPrice,
        }),
        faqPageSchema(displayFaqs),
    ].filter(Boolean);

    const recommendations = await getTreatmentRecommendations(slug);

    // Group by phase, preserving display order
    const byPhase = PHASE_ORDER.reduce<Record<string, TreatmentRecommendation[]>>((acc, phase) => {
        const items = recommendations.filter((r) => r.phase === phase);
        if (items.length > 0) acc[phase] = items;
        return acc;
    }, {});

    return (
        <article className="min-h-screen bg-[#F7F7F8]">
            <NikiPageContextBridge
                type="treatment"
                treatmentName={displayTitle}
                treatmentPage={pagePath}
            />
            <JsonLd data={structuredData} />

            {/* ── Hero Section ── */}
            <section className="bg-white py-16 lg:py-24 border-b border-[#E2E2E6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-[#636374]">
                        <Link href="/" className="hover:text-[#939EBA] transition-colors">Home</Link>
                        <span className="mx-2">›</span>
                        <Link href="/treatments" className="hover:text-[#939EBA] transition-colors">Treatments</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[#1A1A1F]">{displayTitle}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* Left — headline + hero copy + CTA */}
                        <div>
                            <p className="overline mb-4 text-[#939EBA]">
                                {category.replace(/-/g, ' ').toUpperCase()}
                            </p>
                            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-[#1A1A1F] mb-6">
                                {displayTitle}
                            </h1>
                            {displayTagline && (
                            <p className="text-xl font-semibold text-[#1A1A1F] mb-6">
                                {displayTagline}
                            </p>
                            )}

                            {/* Hero paragraph — DB HTML takes priority, else markdown from JSON */}
                            {db?.hero_text ? (
                                <div
                                    className="text-lg text-[#636374] leading-relaxed mb-8 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: db.hero_text }}
                                />
                            ) : (treatment.heroText || treatment.quickSummary) && (
                                <RichText
                                    text={treatment.heroText || treatment.quickSummary}
                                    as="p"
                                    className="text-lg text-[#636374] leading-relaxed mb-8"
                                />
                            )}

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="/book"
                                    className="bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#7A87A6]"
                                >
                                    Book Consultation
                                </a>
                            </div>

                            <p className="mt-6 text-xs text-[#636374]">
                                Medically reviewed by{" "}
                                <Link href="/dr-rajeev-bangalee" className="font-semibold text-[#939EBA] hover:underline">
                                    Dr. Rajeev Bangalee, MB, BS
                                </Link>
                                {" "}· Star Aesthetic Centre, Durban North
                            </p>
                        </div>

                        {/* Right — At a Glance card */}
                        <div className="p-8 bg-white border border-[#E2E2E6]">
                            <h3 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-6">At a Glance</h3>
                            <ul className="space-y-6">
                                {displayPrice && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><CreditCard size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Investment</span>
                                            <span className="text-sm text-[#636374]">{displayPrice}</span>
                                        </div>
                                    </li>
                                )}
                                {displayDuration && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><Clock size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Duration</span>
                                            <span className="text-sm text-[#636374]">{displayDuration}</span>
                                        </div>
                                    </li>
                                )}
                                {displayDowntime && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><Activity size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Downtime</span>
                                            <span className="text-sm text-[#636374]">{displayDowntime}</span>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Content + Sidebar ── */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* ── Left / Main content ── */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* What is it? */}
                        {(db?.what_is || treatment.whatIs || treatment.quickSummary) && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    What is {displayTitle}?
                                </h2>
                                {db?.what_is ? (
                                    <div
                                        className="prose prose-sm max-w-none text-[#636374] leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: db.what_is }}
                                    />
                                ) : (
                                    <RichBody text={treatment.whatIs || treatment.quickSummary} />
                                )}
                            </div>
                        )}

                        {/* How it Works */}
                        {displayHowWorks.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    How it Works
                                </h2>
                                <div className="space-y-6">
                                    {displayHowWorks.map((step: string, index: number) => {
                                        // Steps are formatted as "Title — Description"
                                        const dashIdx = step.indexOf(' — ');
                                        if (dashIdx !== -1) {
                                            const title = step.slice(0, dashIdx).replace(/\*\*/g, ''); // strip bold markers from title
                                            const body  = step.slice(dashIdx + 3);
                                            return (
                                                <div key={index} className="flex gap-4">
                                                    <div className="w-8 h-8 bg-[#EEF0F6] text-[#939EBA] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-[#1A1A1F] block mb-1">{title}</span>
                                                        <RichText text={body} as="span" className="text-[#636374]" />
                                                    </div>
                                                </div>
                                            );
                                        }
                                        // Fallback: no dash separator
                                        return (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-8 h-8 bg-[#EEF0F6] text-[#939EBA] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <RichText text={step} as="span" className="text-[#636374] mt-1" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Pricing Breakdown */}
                        {(treatment as any).pricingBreakdown && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    Pricing
                                </h2>
                                <div className="space-y-6">
                                    {(treatment as any).pricingBreakdown.sections.map((section: any, si: number) => (
                                        <div key={si} className="bg-white border border-[#E2E2E6] overflow-hidden">
                                            {section.heading && (
                                                <div className="px-6 py-4 bg-[#0F2647]">
                                                    <h3 className="font-semibold text-sm text-white">{section.heading}</h3>
                                                    {section.description && (
                                                        <p className="text-xs text-[#939EBA] mt-1">{section.description}</p>
                                                    )}
                                                </div>
                                            )}
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    {section.rows.map((row: any, ri: number) => (
                                                        <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#F7F7F8]"}>
                                                            <td className="px-6 py-3 text-[#1A1A1F]">{row.label}</td>
                                                            <td className="px-6 py-3 text-right font-semibold text-[#0F2647] whitespace-nowrap">{row.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                    {(treatment as any).pricingBreakdown.notes?.length > 0 && (
                                        <ul className="space-y-1">
                                            {(treatment as any).pricingBreakdown.notes.map((note: string, ni: number) => (
                                                <li key={ni} className="text-xs text-[#636374] flex gap-2">
                                                    <span className="text-[#939EBA] shrink-0">*</span>
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Expected Results */}
                        {(db?.expected_results || treatment.expectedResults) && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    Expected Results &amp; Timeline
                                </h2>
                                <div className="bg-white p-8 border border-[#E2E2E6]">
                                    {db?.expected_results ? (
                                        <div
                                            className="prose prose-sm max-w-none text-[#636374] leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: db.expected_results }}
                                        />
                                    ) : (
                                        <ResultsTimeline text={treatment.expectedResults} />
                                    )}
                                    {treatment.downtimeDetail && (
                                        <>
                                            <h4 className="font-bold text-[#1A1A1F] mt-8 mb-3">Downtime &amp; Aftercare:</h4>
                                            <RichText text={treatment.downtimeDetail} as="p" className="text-[#636374] leading-relaxed" />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* FAQs */}
                        {displayFaqs.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {displayFaqs.map((faq, index) => (
                                        <details
                                            key={index}
                                            open
                                            className="group [&_summary::-webkit-details-marker]:hidden bg-white border border-[#E2E2E6] overflow-hidden"
                                        >
                                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-[#1A1A1F]">
                                                <h3 className="font-semibold">{faq.question}</h3>
                                                <span className="shrink-0 bg-[#F7F7F8] p-1.5 text-[#1A1A1F] sm:p-3 group-open:-rotate-180 transition-transform">
                                                    <ChevronDown size={20} />
                                                </span>
                                            </summary>
                                            <div className="px-6 pb-6">
                                                <RichText
                                                    text={faq.answer}
                                                    as="p"
                                                    className="text-[#636374] leading-relaxed"
                                                />
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Right Sidebar ── */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Who is this for? */}
                        {displaySuitableFor.length > 0 && (
                            <div className="bg-[#EEF0F6] p-8">
                                <h3 className="font-heading text-xl font-bold text-[#1A1A1F] mb-6">Who Is This For?</h3>
                                <ul className="space-y-4 text-[#636374]">
                                    {displaySuitableFor.map((item: string, index: number) => (
                                        <li key={index} className="flex gap-3 items-start">
                                            <span className="text-[#939EBA] mt-0.5 shrink-0">✓</span>
                                            <RichText text={item} as="span" className="text-sm leading-relaxed" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Niki Agent Card */}
                        <NikiAgentCard treatmentName={displayTitle} />

                        {/* CTA Box */}
                        <div className="bg-[#0F2647] p-8 text-white">
                            <h3 className="font-heading text-2xl font-bold mb-4 text-white">Ready to start?</h3>
                            <p className="text-[#939EBA] mb-6 pb-6 border-b border-[#1B3D6E] text-sm leading-relaxed">
                                Book a consultation with Dr. Bangalee to discuss a tailored treatment plan for your specific concerns.
                            </p>
                            <a
                                href="/book"
                                className="w-full justify-center flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-[#0F2647] transition-colors hover:bg-[#F2F1EF]"
                            >
                                Book Your Consultation
                            </a>
                        </div>

                        {/* Rewards Programme card */}
                        <RewardsCard />

                        {/* Gift Vouchers card */}
                        <GiftVoucherCard />
                    </div>
                </div>
            </section>

            {/* ── Recommended Products ── */}
            {Object.keys(byPhase).length > 0 && (
                <section className="bg-white py-16 lg:py-24 border-t border-[#E2E2E6]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        <div className="mb-10">
                            <p className="overline mb-3 text-[#939EBA]">Dr. Bangalee Selected</p>
                            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#1A1A1F]">
                                Products for Your {treatment.title} Journey
                            </h2>
                            <p className="mt-3 text-[#636374] max-w-2xl">
                                Clinically chosen skincare to prepare, protect and prolong your results — available to purchase directly from our practice.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {Object.entries(byPhase).map(([phase, items]) => (
                                <div key={phase}>
                                    {/* Phase label */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#939EBA] bg-[#EEF0F6] px-3 py-1.5">
                                            {items[0].phase_label}
                                        </span>
                                        <div className="flex-1 h-px bg-[#E2E2E6]" />
                                    </div>

                                    {/* Product cards */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {items.map((rec) => (
                                            <Link
                                                key={rec.id}
                                                href={`/shop/products/${rec.product.slug}`}
                                                className="group flex flex-col bg-[#F7F7F8] border border-[#E2E2E6] hover:border-[#939EBA] transition-colors"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-square bg-white overflow-hidden">
                                                    {rec.product.primaryImage ? (
                                                        <Image
                                                            src={rec.product.primaryImage}
                                                            alt={rec.product.name}
                                                            fill
                                                            unoptimized
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <span className="text-xs text-[#939EBA]">{rec.product.name}</span>
                                                        </div>
                                                    )}
                                                    {rec.is_essential && (
                                                        <span className="absolute top-2 left-2 bg-[#939EBA] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                                                            Essential
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col flex-1 p-4">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1">
                                                        {rec.product.brand_slug.replace(/-/g, " ")}
                                                    </p>
                                                    <h3 className="font-heading font-bold text-[#1A1A1F] text-sm mb-2 leading-snug">
                                                        {rec.product.name}
                                                    </h3>
                                                    {rec.notes && (
                                                        <p className="text-xs text-[#636374] leading-relaxed mb-3 flex-1">
                                                            {rec.notes}
                                                        </p>
                                                    )}
                                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#E2E2E6]">
                                                        {rec.product.price != null ? (
                                                            <span className="font-bold text-[#1A1A1F] text-sm">
                                                                R {formatPrice(rec.product.price)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-[#636374]">Price on request</span>
                                                        )}
                                                        <span className="text-xs font-semibold text-[#939EBA] group-hover:underline">
                                                            Shop →
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-[#E2E2E6] bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-xs text-[#636374] leading-relaxed max-w-3xl">
                        <strong className="text-[#1A1A1F]">Medical disclaimer:</strong> Treatment results vary between individuals.
                        All procedures are performed by Dr. Rajeev Bangalee (MB, BS), a registered medical practitioner.
                        Information on this page is for educational purposes and does not replace a personal consultation.
                    </p>
                </div>
            </section>
        </article>
    );
}

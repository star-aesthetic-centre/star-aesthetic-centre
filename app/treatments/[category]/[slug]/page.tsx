import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Activity, CreditCard, ChevronDown } from "lucide-react";
import treatmentsData from "@/lib/data/treatments.json";
import { RichText } from "@/lib/utils/richText";
import { NikiAgentCard } from "@/components/treatments/NikiAgentCard";

interface TreatmentPageProps {
    params: Promise<{ category: string; slug: string }>;
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

export default async function TreatmentDetail({ params }: TreatmentPageProps) {
    const { category, slug } = await params;
    const treatment = treatmentsData.find((t: any) => t.slug === slug);

    if (!treatment) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[#F7F7F8]">

            {/* ── Hero Section ── */}
            <section className="bg-white py-16 lg:py-24 border-b border-[#E2E2E6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-[#636374]">
                        <Link href="/" className="hover:text-[#939EBA] transition-colors">Home</Link>
                        <span className="mx-2">›</span>
                        <Link href="/treatments" className="hover:text-[#939EBA] transition-colors">Treatments</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[#1A1A1F]">{treatment.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* Left — headline + hero copy + CTA */}
                        <div>
                            <p className="overline mb-4 text-[#939EBA]">
                                {category.replace(/-/g, ' ').toUpperCase()}
                            </p>
                            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-[#1A1A1F] mb-6">
                                {treatment.title}
                            </h1>
                            <p className="text-xl font-semibold text-[#1A1A1F] mb-6">
                                {treatment.tagline}
                            </p>

                            {/* Hero paragraph — supports **bold** markers */}
                            {(treatment.heroText || treatment.quickSummary) && (
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
                        </div>

                        {/* Right — At a Glance card */}
                        <div className="p-8 bg-white border border-[#E2E2E6]">
                            <h3 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-6">At a Glance</h3>
                            <ul className="space-y-6">
                                {treatment.priceFrom && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><CreditCard size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Investment</span>
                                            <span className="text-sm text-[#636374]">{treatment.priceFrom}</span>
                                        </div>
                                    </li>
                                )}
                                {treatment.duration && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><Clock size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Duration</span>
                                            <span className="text-sm text-[#636374]">{treatment.duration}</span>
                                        </div>
                                    </li>
                                )}
                                {treatment.downtime && (
                                    <li className="flex items-start gap-4">
                                        <div className="mt-1 shrink-0 text-[#939EBA]"><Activity size={20} /></div>
                                        <div>
                                            <span className="block text-sm font-semibold text-[#1A1A1F]">Downtime</span>
                                            <span className="text-sm text-[#636374]">{treatment.downtime}</span>
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
                        {(treatment.whatIs || treatment.quickSummary) && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    What is {treatment.title}?
                                </h2>
                                <RichBody text={treatment.whatIs || treatment.quickSummary} />
                            </div>
                        )}

                        {/* How it Works */}
                        {treatment.howWorks && treatment.howWorks.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    How it Works
                                </h2>
                                <div className="space-y-6">
                                    {treatment.howWorks.map((step: string, index: number) => {
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

                        {/* Expected Results */}
                        {treatment.expectedResults && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    Expected Results &amp; Timeline
                                </h2>
                                <div className="bg-white p-8 border border-[#E2E2E6]">
                                    <ResultsTimeline text={treatment.expectedResults} />
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
                        {treatment.faqs && treatment.faqs.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {treatment.faqs.map((faq: any, index: number) => (
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
                        {treatment.suitableFor && treatment.suitableFor.length > 0 && (
                            <div className="bg-[#EEF0F6] p-8">
                                <h3 className="font-heading text-xl font-bold text-[#1A1A1F] mb-6">Who Is This For?</h3>
                                <ul className="space-y-4 text-[#636374]">
                                    {treatment.suitableFor.map((item: string, index: number) => (
                                        <li key={index} className="flex gap-3 items-start">
                                            <span className="text-[#939EBA] mt-0.5 shrink-0">✓</span>
                                            <RichText text={item} as="span" className="text-sm leading-relaxed" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Niki Agent Card */}
                        <NikiAgentCard treatmentName={treatment.title} />

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
                    </div>
                </div>
            </section>
        </article>
    );
}

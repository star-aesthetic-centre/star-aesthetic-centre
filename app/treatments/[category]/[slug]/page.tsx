import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Activity, CreditCard, ChevronDown } from "lucide-react";
import treatmentsData from "@/lib/data/treatments.json";

interface TreatmentPageProps {
    params: Promise<{ category: string; slug: string }>;
}

export default async function TreatmentDetail({ params }: TreatmentPageProps) {
    const { category, slug } = await params;
    const treatment = treatmentsData.find((t: any) => t.slug === slug);

    if (!treatment) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[#F7F7F8]">
            {/* Hero Section */}
            <section className="bg-white py-16 lg:py-24 border-b border-[#E2E2E6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="mb-8 text-sm text-[#636374]">
                        <Link href="/" className="hover:text-[#939EBA] transition-colors">Home</Link>
                        <span className="mx-2">›</span>
                        <Link href="/treatments" className="hover:text-[#939EBA] transition-colors">Treatments</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[#1A1A1F]">{treatment.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div>
                            <p className="overline mb-4 text-[#939EBA]">{category.replace('-', ' ').toUpperCase()}</p>
                            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-[#1A1A1F] mb-6">
                                {treatment.title}
                            </h1>
                            <p className="text-xl font-semibold text-[#1A1A1F] mb-6">
                                {treatment.tagline}
                            </p>
                            <p className="text-lg text-[#636374] leading-relaxed mb-8">
                                {treatment.heroText || treatment.quickSummary}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#book"
                                    className=" bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#7A87A6]"
                                >
                                    Book Consultation
                                </a>
                            </div>
                        </div>

                        {/* At a glance card */}
                        <div className="uk-card-default uk-card-body p-8 bg-white border border-[#E2E2E6]">
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

            {/* Main Content Areas */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left / Main text */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* What is it? */}
                        {treatment.whatIs && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">What is {treatment.title}?</h2>
                                <div className="prose prose-lg text-[#636374]">
                                    <p>{treatment.whatIs}</p>
                                </div>
                            </div>
                        )}

                        {/* Quick Summary fallback if whatIs is missing */}
                        {!treatment.whatIs && treatment.quickSummary && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">Overview</h2>
                                <div className="prose prose-lg text-[#636374]">
                                    <p>{treatment.quickSummary}</p>
                                </div>
                            </div>
                        )}

                        {/* Step by Step */}
                        {treatment.howWorks && treatment.howWorks.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">How it Works</h2>
                                <div className="space-y-6">
                                    {treatment.howWorks.map((step: string, index: number) => {
                                        // Extract bold prefix like "Consultation — " if exists
                                        const parts = step.split('—');
                                        if (parts.length > 1) {
                                            return (
                                                <div key={index} className="flex gap-4">
                                                    <div className="w-8 h-8 bg-[#EEF0F6] text-[#939EBA] flex items-center justify-center font-bold shrink-0">{index + 1}</div>
                                                    <div>
                                                        <span className="font-bold text-[#1A1A1F] block mb-1">{parts[0].trim()}</span>
                                                        <span className="text-[#636374]">{parts.slice(1).join('—').trim()}</span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-8 h-8 bg-[#EEF0F6] text-[#939EBA] flex items-center justify-center font-bold shrink-0">{index + 1}</div>
                                                <span className="text-[#636374] mt-1">{step}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Expected Results & Downtime */}
                        {treatment.expectedResults && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">Expected Results & Timeline</h2>
                                <div className="bg-white uk-card-default uk-card-body p-8 border border-[#E2E2E6]">
                                    <p className="text-[#636374] leading-relaxed mb-6">{treatment.expectedResults}</p>

                                    {treatment.downtimeDetail && (
                                        <>
                                            <h4 className="font-bold text-[#1A1A1F] mt-8 mb-3">Downtime & Aftercare:</h4>
                                            <p className="text-[#636374] leading-relaxed">{treatment.downtimeDetail}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* FAQs */}
                        {treatment.faqs && treatment.faqs.length > 0 && (
                            <div>
                                <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {treatment.faqs.map((faq: any, index: number) => (
                                        <details
                                            key={index}
                                            open
                                            className="group [&_summary::-webkit-details-marker]:hidden bg-white uk-card-default border border-[#E2E2E6] overflow-hidden"
                                        >
                                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-[#1A1A1F]">
                                                <h3 className="font-semibold">{faq.question}</h3>
                                                <span className="shrink-0 bg-[#F7F7F8] p-1.5 text-[#1A1A1F] sm:p-3 group-open:-rotate-180 transition-transform">
                                                    <ChevronDown size={20} />
                                                </span>
                                            </summary>
                                            <p className="px-6 pb-6 text-[#636374] leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Suitable For */}
                        {treatment.suitableFor && treatment.suitableFor.length > 0 && (
                            <div className="bg-[#EEF0F6] p-8">
                                <h3 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-6">Who Is This For?</h3>
                                <ul className="space-y-4 text-[#636374]">
                                    {treatment.suitableFor.map((item: string, index: number) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="text-[#939EBA] mt-1 shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Box */}
                        <div className="bg-[#1A1A1F] p-8 text-white">
                            <h3 className="font-heading text-2xl font-bold mb-4">Ready to start?</h3>
                            <p className="text-gray-300 mb-6 pb-6 border-b border-gray-700">
                                Book a consultation with Dr. Bangalee to discuss a tailored treatment plan for your specific concerns.
                            </p>
                            <a
                                href="#book"
                                className="w-full justify-center flex items-center gap-2 bg-white px-8 py-4 text-sm font-semibold text-[#1A1A1F] transition-colors hover:bg-gray-100"
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

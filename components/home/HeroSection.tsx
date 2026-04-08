import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative min-h-[93vh] overflow-hidden">

            {/* ── Background image ──────────────────────────────── */}
            <Image
                src="/images/star-aesthetic-centre-durban-homepage-hero-005.webp"
                alt="Star Aesthetic Centre Durban clinic"
                fill
                priority
                className="object-cover object-center"
            />

            {/* ── Gradient overlay: deep blue left → transparent right ── */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2647]/90 via-[#1B3D6E]/60 to-transparent" />

            {/* ── Content ───────────────────────────────────────── */}
            <div className="relative mx-auto flex min-h-[93vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl pt-8 pb-6 lg:pt-12 lg:pb-8">

                    {/* Overline */}
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-[#939EBA]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                            Durban North · Doctor-Led Aesthetics
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-bold uppercase leading-[1.08] tracking-wide text-white">
                        Reveal your
                        <br />
                        <em className="not-italic text-[#939EBA]">natural beauty.</em>
                    </h1>

                    {/* Sub-heading */}
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
                        Personalised aesthetic treatments and pharmaceutical-grade skincare,
                        guided by Dr. Rajeev Bangalee — so you look and feel effortlessly you.
                    </p>

                    {/* CTAs */}
                    <div className="mt-7 flex flex-wrap gap-4">
                        <Link
                            href="/treatments"
                            className="inline-flex items-center gap-2.5 bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
                        >
                            Explore Treatments
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
                                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2.5 border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5"
                        >
                            Shop Skincare
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
                        {[
                            { value: "15+", label: "Years Experience" },
                            { value: "6",   label: "Premium Brands" },
                            { value: "5★",  label: "Patient Rating" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="font-heading text-2xl font-bold text-[#B8C5E0]">{s.value}</p>
                                <p className="mt-0.5 text-xs text-white/60">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Floating trust badge ───────────────────────────── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 flex items-center gap-3 bg-white/95 px-5 py-4 shadow-xl shadow-black/10 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#1B3D6E]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.9L12 18l-6.1 3.1 1.2-6.9-5-4.9 6.9-1L12 2z" fill="white" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-[#1A1A1F]">Doctor-Led Care</p>
                    <p className="text-[10px] text-[#636374]">Every treatment, personally</p>
                </div>
            </div>

            {/* Subtle bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
        </section>
    );
}

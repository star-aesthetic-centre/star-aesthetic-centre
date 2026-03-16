import Link from "next/link";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function SkinAssessmentCTA() {
    return (
        <section className="bg-[#0F2647] py-20 overflow-hidden relative">
            {/* Subtle diagonal texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "12px 12px",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT — Content */}
                    <div>
                        <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A882] mb-5">
                            — Free · 3 Minutes · Instant Results
                        </p>
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase text-white leading-[1.05] mb-6">
                            What Does<br />
                            Your Skin<br />
                            <span className="text-[#C8A882]">Really Need?</span>
                        </h2>
                        <p className="text-[#A8B4CC] text-base sm:text-lg mb-8 leading-relaxed max-w-md">
                            Answer 12 questions. Receive your personalised{" "}
                            <strong className="text-white">Skin Health Score</strong> — with specific
                            treatment and skincare recommendations reviewed by Dr. Bangalee.
                        </p>

                        <ul className="space-y-3 mb-10">
                            {[
                                "Takes only 3 minutes to complete",
                                "Completely free — no obligation",
                                "Instant personalised results & recommendations",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-[#A8B4CC]">
                                    <CheckCircle className="h-4 w-4 shrink-0 text-[#C8A882]" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/skin-assessment"
                            className="inline-flex items-center gap-3 bg-[#C8A882] px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-[#A08060] transition-colors"
                        >
                            Discover Your Skin Score
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className="mt-4 text-xs text-[#636E85]">
                            Over 500 assessments completed · No credit card required
                        </p>
                    </div>

                    {/* RIGHT — 3D Scorecard Visual */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <div className="relative select-none">
                            {/* Drop shadow */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-6 bg-black/50 blur-2xl rounded-full" />

                            {/* Book spine */}
                            <div
                                className="absolute left-0 top-4 bottom-4 w-8 bg-gradient-to-r from-[#7A5C30] to-[#C8A882]"
                                style={{ transform: "perspective(900px) rotateY(-40deg) translateX(-6px) skewY(-1deg)" }}
                            />

                            {/* Book cover */}
                            <div
                                className="relative w-72 bg-gradient-to-br from-[#1B3D6E] via-[#0F2647] to-[#071828] border border-[#C8A882]/25 p-8 shadow-2xl"
                                style={{ transform: "perspective(900px) rotateY(-6deg)" }}
                            >
                                {/* Top gold line */}
                                <div className="h-0.5 w-full bg-gradient-to-r from-[#C8A882] via-[#C8A882]/60 to-transparent mb-5" />

                                {/* Clinic label */}
                                <div className="mb-6">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#939EBA]">Star Aesthetic Centre</p>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#636E85]">Dr. Rajeev Bangalee · MB, BS</p>
                                </div>

                                {/* Score circle */}
                                <div className="flex justify-center mb-5">
                                    <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#C8A882]/40 bg-[#C8A882]/8">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="44" fill="none" stroke="#C8A882" strokeWidth="3" strokeDasharray="207 277" strokeLinecap="round" opacity="0.4" />
                                        </svg>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-[#C8A882] leading-none">?</div>
                                            <div className="text-[10px] text-[#636E85] uppercase tracking-wider mt-1">/ 10</div>
                                        </div>
                                    </div>
                                </div>

                                <p className="font-heading text-center text-lg font-bold uppercase tracking-wider text-white mb-1">
                                    Skin Health
                                </p>
                                <p className="font-heading text-center text-lg font-bold uppercase tracking-wider text-[#C8A882] mb-5">
                                    Score
                                </p>

                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-3.5 w-3.5 text-[#C8A882]/40" />
                                    ))}
                                </div>

                                {/* Score bars */}
                                <div className="space-y-2.5">
                                    {[
                                        { label: "Skin Baseline", filled: 2 },
                                        { label: "Treatment Readiness", filled: 3 },
                                        { label: "Lifestyle Score", filled: 1 },
                                    ].map(({ label, filled }) => (
                                        <div key={label} className="flex items-center justify-between gap-3">
                                            <span className="text-[10px] text-[#636E85] w-28 shrink-0">{label}</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, j) => (
                                                    <div
                                                        key={j}
                                                        className={`h-1.5 w-4 ${j < filled ? "bg-[#C8A882]" : "bg-[#1B3D6E]"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom gold line */}
                                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C8A882]/60 to-[#C8A882] mt-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

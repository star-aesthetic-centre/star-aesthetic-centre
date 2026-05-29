"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight, Upload, X, CheckCircle2,
    Star, Loader2, ChevronRight, Camera, SkipForward,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Answers = {
    age: string;
    concerns: string[];
    treatmentHistory: string;
    currentProducts: string;
    photoPreview: string | null;
    spf: string; spfScore: number;
    sleep: string; sleepScore: number;
    diet: string; dietScore: number;
    name: string; email: string; phone: string;
    desiredOutcome: string;
    obstacle: string;
    preferredApproach: string;
    anythingElse: string;
};

const INITIAL: Answers = {
    age: "", concerns: [], treatmentHistory: "", currentProducts: "",
    photoPreview: null, spf: "", spfScore: 0, sleep: "", sleepScore: 0,
    diet: "", dietScore: 0, name: "", email: "", phone: "",
    desiredOutcome: "", obstacle: "", preferredApproach: "", anythingElse: "",
};

// Steps: 0=landing, 1–8=questions, 9=email gate, 10–13=qualifying, 14=results
const TOTAL_Q = 13; // steps 1–13

// ── Result helpers ─────────────────────────────────────────────────────────
function getLifestyleScore(a: Answers) {
    return a.spfScore + a.sleepScore + a.dietScore; // max 9
}

function getTier(score: number) {
    if (score <= 3) return "urgent";
    if (score <= 6) return "improve";
    return "star";
}

const TIER_CONFIG = {
    urgent: {
        label: "Your Skin Needs Urgent TLC",
        colour: "#E07B5A",
        intro:
            "Your lifestyle habits are working against your skin. The good news? Targeted treatments and a proper medical-grade routine can reverse most of this damage — and Dr. Bangalee has seen incredible results in patients who start from exactly where you are.",
    },
    improve: {
        label: "Strong Foundations — Let's Optimise",
        colour: "#C8A882",
        intro:
            "You're doing some things right, but there's meaningful room to improve. The right combination of treatments and a fine-tuned daily routine will unlock noticeably better skin in 60–90 days.",
    },
    star: {
        label: "You're a Skincare Star — Time to Elevate",
        colour: "#6BAF92",
        intro:
            "Your lifestyle habits are excellent — your skin has a strong foundation. Now it's time to address any specific concerns with targeted, medical-grade treatments that take you from great to exceptional.",
    },
};

const CONCERN_RECS: Record<string, { treatment: string; href: string; product: string }[]> = {
    pigmentation: [
        { treatment: "Pigmentation Treatment", href: "/treatments/skin/pigmentation-treatment", product: "Dermaceutic Yellow Cream" },
        { treatment: "Skin Peel Treatment", href: "/treatments/skin/skin-peel", product: "Dermaceutic Foamer 15" },
    ],
    ageing: [
        { treatment: "Anti-Wrinkle Treatment", href: "/treatments/face/anti-wrinkle-treatment", product: "SkinCeuticals C E Ferulic" },
        { treatment: "Jaw & Chin Contouring", href: "/treatments/face/jaw-amp-chin-contouring", product: "NeoStrata Skin Active" },
    ],
    acne: [
        { treatment: "Acne & Acne Scarring", href: "/treatments/skin/acne", product: "Dermaceutic Foamer 15" },
        { treatment: "Skin Peel Treatment", href: "/treatments/skin/skin-peel", product: "Dermaceutic Hyal Ceutic" },
    ],
    texture: [
        { treatment: "Skin Peel Treatment", href: "/treatments/skin/skin-peel", product: "Mesoestetic Glow Range" },
        { treatment: "Vitamin Drips", href: "/treatments/body-wellness/vitamin-drips", product: "SkinCeuticals Retinol" },
    ],
    all: [
        { treatment: "Personalised Consultation", href: "/contact", product: "Full Skin Assessment" },
        { treatment: "Skin Peel Treatment", href: "/treatments/skin/skin-peel", product: "Dermaceutic Programme" },
    ],
};

// ── Card component ─────────────────────────────────────────────────────────
function OptionCard({
    label, selected, onClick, icon,
}: { label: string; selected: boolean; onClick: () => void; icon?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left px-4 py-4 border text-sm font-medium transition-all flex items-center gap-3 ${selected
                ? "border-[#C8A882] bg-[#C8A882]/10 text-[#1A1917]"
                : "border-[#E5E4E0] bg-white text-[#6B6966] hover:border-[#939EBA] hover:text-[#1A1917]"
                }`}
        >
            {icon && <span className="text-lg shrink-0">{icon}</span>}
            <span>{label}</span>
            {selected && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[#C8A882]" />}
        </button>
    );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function AssessmentFlow() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>(INITIAL);
    const [emailSending, setEmailSending] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const progressPct = step === 0 ? 0 : step === 14 ? 100 : Math.round((step / TOTAL_Q) * 100);

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => Math.max(0, s - 1));

    const setSingle = (field: keyof Answers, value: string) =>
        setAnswers((a) => ({ ...a, [field]: value }));

    const toggleConcern = (val: string) =>
        setAnswers((a) => ({
            ...a,
            concerns: a.concerns.includes(val)
                ? a.concerns.filter((c) => c !== val)
                : [...a.concerns, val],
        }));

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAnswers((a) => ({ ...a, photoPreview: url }));
    };

    const handleEmailGate = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailSending(true);
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "skin_assessment",
                    name: answers.name,
                    email: answers.email,
                    phone: answers.phone,
                    answers: {
                        concerns: answers.concerns,
                        age: answers.age,
                        lifestyleScore,
                        tier,
                    },
                }),
            });
        } catch {
            /* still show results if save fails */
        }
        setEmailSending(false);
        next();
    };

    const lifestyleScore = getLifestyleScore(answers);
    const tier = getTier(lifestyleScore);
    const tierCfg = TIER_CONFIG[tier];
    const primaryConcern = answers.concerns[0] || "all";
    const recs = CONCERN_RECS[primaryConcern] || CONCERN_RECS.all;

    // ── STEP 0: Landing ────────────────────────────────────────────────────
    if (step === 0) {
        return (
            <div className="min-h-screen bg-[#0F2647] flex flex-col items-center justify-center px-4 py-20 text-center">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A882] mb-4">
                    — Star Aesthetic Centre · Free Assessment
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4">
                    Discover Your<br />
                    <span className="text-[#C8A882]">Skin Health Score</span>
                </h1>
                <p className="text-[#A8B4CC] text-lg max-w-xl mx-auto mb-3">
                    Are you frustrated that your skin isn&apos;t improving — even though you&apos;ve tried products and treatments?
                </p>
                <p className="text-[#636E85] text-sm max-w-md mx-auto mb-10">
                    Answer 12 questions so we can measure and improve your <strong className="text-[#A8B4CC]">skin baseline</strong>, <strong className="text-[#A8B4CC]">treatment readiness</strong>, and <strong className="text-[#A8B4CC]">lifestyle habits</strong> — then give you personalised next steps.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-[#636E85]">
                    {["3 minutes", "Completely free", "Instant results", "No obligation"].map((t) => (
                        <span key={t} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#C8A882]" /> {t}
                        </span>
                    ))}
                </div>

                <button
                    onClick={next}
                    className="inline-flex items-center gap-3 bg-[#C8A882] px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-[#A08060] transition-colors mb-6"
                >
                    Start Your Assessment <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-xs text-[#3D4E63]">
                    Created by Dr. Rajeev Bangalee · MB, BS · 20+ years clinical experience
                </p>
            </div>
        );
    }

    // ── STEP 14: Results ───────────────────────────────────────────────────
    if (step === 14) {
        return (
            <div className="min-h-screen bg-[#F8F8F7] py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">

                    {/* Score reveal */}
                    <div className="bg-[#0F2647] text-white p-10 text-center mb-8">
                        <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-[#939EBA] mb-4">
                            Your Results, {answers.name.split(" ")[0]}
                        </p>
                        <div
                            className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-6"
                            style={{ borderColor: tierCfg.colour }}
                        >
                            <div>
                                <div className="text-4xl font-bold" style={{ color: tierCfg.colour }}>
                                    {lifestyleScore}
                                </div>
                                <div className="text-xs text-[#636E85] uppercase tracking-wider">/ 9</div>
                            </div>
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mb-3" style={{ color: tierCfg.colour }}>
                            {tierCfg.label}
                        </h2>
                        <p className="text-[#A8B4CC] text-sm leading-relaxed max-w-lg mx-auto">
                            {tierCfg.intro}
                        </p>
                    </div>

                    {/* Score breakdown */}
                    <div className="bg-white border border-[#E5E4E0] p-6 mb-6">
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-5">
                            Your Lifestyle Score Breakdown
                        </h3>
                        {[
                            { label: "Daily SPF Protection", score: answers.spfScore, max: 3, answer: answers.spf },
                            { label: "Sleep & Stress Management", score: answers.sleepScore, max: 3, answer: answers.sleep },
                            { label: "Diet & Hydration", score: answers.dietScore, max: 3, answer: answers.diet },
                        ].map(({ label, score, max, answer }) => (
                            <div key={label} className="mb-4 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-semibold text-[#1A1917]">{label}</span>
                                    <span className="text-xs text-[#6B6966]">{score}/{max}</span>
                                </div>
                                <div className="h-2 bg-[#F2F1EF] w-full">
                                    <div
                                        className="h-2 bg-[#C8A882] transition-all"
                                        style={{ width: `${(score / max) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-[#6B6966] mt-1">{answer}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white border border-[#E5E4E0] p-6 mb-6">
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-5">
                            Recommended For You
                        </h3>
                        <div className="space-y-4">
                            {recs.map(({ treatment, href, product }) => (
                                <div key={treatment} className="flex items-center justify-between border border-[#E5E4E0] p-4 hover:border-[#C8A882] transition-colors group">
                                    <div>
                                        <p className="font-semibold text-sm text-[#1A1917]">{treatment}</p>
                                        <p className="text-xs text-[#6B6966] mt-0.5">Suggested product: {product}</p>
                                    </div>
                                    <Link href={href} className="text-xs font-semibold uppercase tracking-wider text-[#C8A882] group-hover:text-[#0F2647] transition-colors flex items-center gap-1">
                                        Learn more <ChevronRight size={12} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Three insights */}
                    <div className="bg-white border border-[#E5E4E0] p-6 mb-8">
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-5">
                            Three Things to Know
                        </h3>
                        <div className="space-y-4">
                            {[
                                { n: "01", title: "Your results are personalised", body: "These recommendations are based on your specific answers and are a starting point. A consultation with Dr. Bangalee will give you a detailed, examined plan." },
                                { n: "02", title: "Consistency beats intensity", body: "Even the best treatments are limited by daily habits. SPF, hydration, and sleep are non-negotiable foundations for any skin improvement programme." },
                                { n: "03", title: "Medical-grade makes the difference", body: "Over-the-counter products can maintain, but they rarely correct. Doctor-prescribed, pharmaceutical-grade skincare works at a cellular level." },
                            ].map(({ n, title, body }) => (
                                <div key={n} className="flex gap-4">
                                    <span className="font-heading text-2xl font-bold text-[#E5E4E0] shrink-0 w-8">{n}</span>
                                    <div>
                                        <p className="font-semibold text-sm text-[#1A1917] mb-1">{title}</p>
                                        <p className="text-sm text-[#6B6966] leading-relaxed">{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-[#0F2647] p-8 text-center">
                        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA] mb-3">
                            Your next step
                        </p>
                        <h3 className="font-heading text-2xl font-bold uppercase text-white mb-3">
                            Book a Consultation
                        </h3>
                        <p className="text-[#A8B4CC] text-sm mb-6 max-w-md mx-auto">
                            Bring your Skin Health Score to your first consultation. Dr. Bangalee will review your assessment and photo before you arrive.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-[#C8A882] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#A08060] transition-colors"
                            >
                                Book Your Consultation
                            </Link>
                            <Link
                                href="/treatments"
                                className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:border-[#C8A882] transition-colors"
                            >
                                Explore Treatments
                            </Link>
                        </div>
                    </div>

                    <p className="text-center text-xs text-[#A9A8A4] mt-8">
                        Results emailed to {answers.email} · Your information is private and never shared.
                    </p>
                </div>
            </div>
        );
    }

    // ── STEPS 1–13: Questions ──────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#F8F8F7]">

            {/* Progress bar */}
            <div className="bg-white border-b border-[#E5E4E0]">
                <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-4">
                    <button onClick={back} className="text-[#6B6966] hover:text-[#0F2647] transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="flex-1 h-1.5 bg-[#E5E4E0]">
                        <div
                            className="h-1.5 bg-[#C8A882] transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-[#6B6966] shrink-0">
                        {step <= 8 ? step : step === 9 ? "—" : step - 1} / {TOTAL_Q - 1}
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-12">

                {/* ── Q1: Age ── */}
                {step === 1 && (
                    <QuestionShell
                        part="Part 2 — About You"
                        question="How old are you?"
                        subtitle="Age helps us recommend age-appropriate treatments and products."
                        onNext={next}
                        canNext={!!answers.age}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {["18–25", "26–35", "36–45", "46–55", "56+"].map((o) => (
                                <OptionCard key={o} label={o} selected={answers.age === o} onClick={() => setSingle("age", o)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q2: Concerns (multi-select) ── */}
                {step === 2 && (
                    <QuestionShell
                        part="Part 2 — About You"
                        question="What are your primary skin concerns?"
                        subtitle="Select all that apply."
                        onNext={next}
                        canNext={answers.concerns.length > 0}
                        multiNote="Select all that apply"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { val: "pigmentation", label: "Pigmentation & dark spots", icon: "🌑" },
                                { val: "ageing", label: "Fine lines & ageing", icon: "⏳" },
                                { val: "acne", label: "Acne & acne scarring", icon: "🔴" },
                                { val: "texture", label: "Dull or uneven texture", icon: "✨" },
                                { val: "all", label: "All of the above / unsure", icon: "🤔" },
                            ].map(({ val, label, icon }) => (
                                <OptionCard
                                    key={val}
                                    label={label}
                                    icon={icon}
                                    selected={answers.concerns.includes(val)}
                                    onClick={() => toggleConcern(val)}
                                />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q3: Treatment history ── */}
                {step === 3 && (
                    <QuestionShell
                        part="Part 2 — About You"
                        question="Have you received professional skin advice or treatment before?"
                        subtitle="This helps us understand where you are in your skin journey."
                        onNext={next}
                        canNext={!!answers.treatmentHistory}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "never", label: "No — this is my first time seeking advice", icon: "🌱" },
                                { val: "over2", label: "Yes — but more than 2 years ago", icon: "📅" },
                                { val: "recent", label: "Yes — within the last 1–2 years", icon: "🗓️" },
                                { val: "current", label: "Yes — I'm currently on a programme", icon: "✅" },
                                { val: "triednotworked", label: "I've tried things but nothing worked", icon: "😔" },
                            ].map(({ val, label, icon }) => (
                                <OptionCard key={val} label={label} icon={icon} selected={answers.treatmentHistory === val} onClick={() => setSingle("treatmentHistory", val)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q4: Current products ── */}
                {step === 4 && (
                    <QuestionShell
                        part="Part 2 — About You"
                        question="What skincare products are you currently using?"
                        subtitle="Be honest — there's no wrong answer."
                        onNext={next}
                        canNext={!!answers.currentProducts}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "nothing", label: "Nothing — I don't have a routine", icon: "❌" },
                                { val: "supermarket", label: "Basic supermarket / pharmacy products", icon: "🧴" },
                                { val: "otc", label: "Over-the-counter skincare brands", icon: "💊" },
                                { val: "medical", label: "Medical-grade / doctor-prescribed products", icon: "🏥" },
                                { val: "mixed", label: "A mix — some medical, some not", icon: "🔀" },
                            ].map(({ val, label, icon }) => (
                                <OptionCard key={val} label={label} icon={icon} selected={answers.currentProducts === val} onClick={() => setSingle("currentProducts", val)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q5: Photo upload (optional) ── */}
                {step === 5 && (
                    <QuestionShell
                        part="Part 2 — About You"
                        question="Share a natural-light photo of your face"
                        subtitle="Optional but helpful. Dr. Bangalee personally reviews all photos before your consultation."
                        onNext={next}
                        canNext={true}
                        skipLabel="Skip for now"
                        onSkip={next}
                    >
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                        {answers.photoPreview ? (
                            <div className="relative inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={answers.photoPreview} alt="Your photo" className="h-48 w-48 object-cover border-2 border-[#C8A882]" />
                                <button
                                    onClick={() => setAnswers((a) => ({ ...a, photoPreview: null }))}
                                    className="absolute -top-2 -right-2 bg-white border border-[#E5E4E0] rounded-full p-1 shadow"
                                >
                                    <X className="h-4 w-4 text-[#6B6966]" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => fileRef.current?.click()}
                                className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-[#E5E4E0] bg-white py-12 hover:border-[#C8A882] transition-colors"
                            >
                                <Camera className="h-8 w-8 text-[#C8A882]" />
                                <span className="text-sm font-semibold text-[#1A1917]">Upload a photo</span>
                                <span className="text-xs text-[#6B6966]">No filter · Natural light · Front-facing</span>
                            </button>
                        )}
                        <p className="mt-3 text-xs text-[#A9A8A4] flex items-center gap-1.5">
                            🔒 Private and secure — only Dr. Bangalee sees your photo.
                        </p>
                    </QuestionShell>
                )}

                {/* ── Q6: SPF (scored) ── */}
                {step === 6 && (
                    <QuestionShell
                        part="Part 3 — Your Lifestyle"
                        question="Do you apply SPF 30+ sunscreen every day?"
                        subtitle="Including when you're indoors — UV comes through windows."
                        onNext={next}
                        canNext={!!answers.spf}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "Always — every single day", score: 3, icon: "☀️" },
                                { val: "Most days, but I forget sometimes", score: 2, icon: "🌤️" },
                                { val: "Rarely — mainly when I'm outdoors", score: 1, icon: "🌥️" },
                                { val: "Never — I don't use SPF", score: 0, icon: "⚠️" },
                            ].map(({ val, score, icon }) => (
                                <OptionCard
                                    key={val}
                                    label={val}
                                    icon={icon}
                                    selected={answers.spf === val}
                                    onClick={() => setAnswers((a) => ({ ...a, spf: val, spfScore: score }))}
                                />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q7: Sleep & stress (scored) ── */}
                {step === 7 && (
                    <QuestionShell
                        part="Part 3 — Your Lifestyle"
                        question="How would you describe your sleep and stress levels?"
                        subtitle="Both have a direct, measurable impact on skin health."
                        onNext={next}
                        canNext={!!answers.sleep}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "I sleep well and manage stress effectively", score: 3, icon: "😌" },
                                { val: "Sleep is fine but my stress is high", score: 1, icon: "😤" },
                                { val: "I don't sleep enough and stress is an issue", score: 1, icon: "😰" },
                                { val: "Both sleep and stress are poor", score: 0, icon: "😩" },
                            ].map(({ val, score, icon }) => (
                                <OptionCard
                                    key={val}
                                    label={val}
                                    icon={icon}
                                    selected={answers.sleep === val}
                                    onClick={() => setAnswers((a) => ({ ...a, sleep: val, sleepScore: score }))}
                                />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q8: Diet & water (scored) ── */}
                {step === 8 && (
                    <QuestionShell
                        part="Part 3 — Your Lifestyle"
                        question="How is your diet and daily water intake?"
                        subtitle="What you put in shows on your face."
                        onNext={next}
                        canNext={!!answers.diet}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "I eat well and drink 2L+ of water daily", score: 3, icon: "🥗" },
                                { val: "Reasonably healthy — room for improvement", score: 2, icon: "🥙" },
                                { val: "My diet is poor and I don't drink enough water", score: 0, icon: "🍔" },
                            ].map(({ val, score, icon }) => (
                                <OptionCard
                                    key={val}
                                    label={val}
                                    icon={icon}
                                    selected={answers.diet === val}
                                    onClick={() => setAnswers((a) => ({ ...a, diet: val, dietScore: score }))}
                                />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── STEP 9: Email gate ── */}
                {step === 9 && (
                    <div className="bg-white border border-[#E5E4E0] p-8 sm:p-10 text-center max-w-md mx-auto">
                        <div className="w-14 h-14 bg-[#0F2647] flex items-center justify-center mx-auto mb-6">
                            <Star className="h-6 w-6 text-[#C8A882]" />
                        </div>
                        <h2 className="font-heading text-2xl font-bold uppercase text-[#1A1917] mb-2">
                            Your Results Are Ready
                        </h2>
                        <p className="text-sm text-[#6B6966] mb-8">
                            Enter your details below to unlock your personalised Skin Health Score and receive your recommendations.
                        </p>
                        <form onSubmit={handleEmailGate} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                                    Your Name <span className="text-[#C8A882]">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={answers.name}
                                    onChange={(e) => setSingle("name", e.target.value)}
                                    placeholder="Jane Smith"
                                    className="w-full border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3 text-sm focus:border-[#939EBA] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                                    Email Address <span className="text-[#C8A882]">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={answers.email}
                                    onChange={(e) => setSingle("email", e.target.value)}
                                    placeholder="jane@email.com"
                                    className="w-full border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3 text-sm focus:border-[#939EBA] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
                                    Phone <span className="text-[#A9A8A4] font-normal normal-case tracking-normal">(optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    value={answers.phone}
                                    onChange={(e) => setSingle("phone", e.target.value)}
                                    placeholder="082 000 0000"
                                    className="w-full border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3 text-sm focus:border-[#939EBA] focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={emailSending}
                                className="w-full flex items-center justify-center gap-2 bg-[#0F2647] py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#1B3D6E] transition-colors disabled:opacity-60 mt-2"
                            >
                                {emailSending ? <><Loader2 className="h-4 w-4 animate-spin" /> One moment…</> : <>Reveal My Skin Score <ArrowRight className="h-4 w-4" /></>}
                            </button>
                            <p className="text-center text-xs text-[#A9A8A4]">
                                🔒 Private. No spam. Only used to send your results.
                            </p>
                        </form>
                    </div>
                )}

                {/* ── Q10: Desired outcome ── */}
                {step === 10 && (
                    <QuestionShell
                        part="Part 4 — Your Goals"
                        question="What result would you most like in the next 90 days?"
                        subtitle="Be specific — this helps us personalise your next steps."
                        onNext={next}
                        canNext={!!answers.desiredOutcome}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "Clearer, more even skin tone", icon: "🌟" },
                                { val: "Younger-looking, firmer skin", icon: "⏮️" },
                                { val: "Better texture and fewer breakouts", icon: "🔄" },
                                { val: "Reduced scarring or pigmentation", icon: "🎯" },
                                { val: "I just want to know what I need — guide me", icon: "🧭" },
                            ].map(({ val, icon }) => (
                                <OptionCard key={val} label={val} icon={icon} selected={answers.desiredOutcome === val} onClick={() => setSingle("desiredOutcome", val)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q11: Obstacle ── */}
                {step === 11 && (
                    <QuestionShell
                        part="Part 4 — Your Goals"
                        question="What has held you back from getting treatment until now?"
                        subtitle="Your honest answer helps us understand your journey."
                        onNext={next}
                        canNext={!!answers.obstacle}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "Cost — I wasn't sure if it was worth it", icon: "💰" },
                                { val: "I didn't know what treatment I needed", icon: "❓" },
                                { val: "I was nervous about procedures or needles", icon: "😬" },
                                { val: "I haven't found a doctor I trust", icon: "🏥" },
                                { val: "I kept hoping products would be enough", icon: "🧴" },
                            ].map(({ val, icon }) => (
                                <OptionCard key={val} label={val} icon={icon} selected={answers.obstacle === val} onClick={() => setSingle("obstacle", val)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q12: Preferred approach ── */}
                {step === 12 && (
                    <QuestionShell
                        part="Part 4 — Your Goals"
                        question="What approach suits you best right now?"
                        subtitle="There's no wrong answer — this helps match you to the right solution."
                        onNext={next}
                        canNext={!!answers.preferredApproach}
                    >
                        <div className="space-y-3">
                            {[
                                { val: "A medical-grade home skincare programme", icon: "📦" },
                                { val: "In-clinic treatments with Dr. Bangalee", icon: "🏥" },
                                { val: "A combined clinic + home programme", icon: "⚡" },
                                { val: "I'd like Dr. Bangalee to recommend what's best", icon: "👨‍⚕️" },
                            ].map(({ val, icon }) => (
                                <OptionCard key={val} label={val} icon={icon} selected={answers.preferredApproach === val} onClick={() => setSingle("preferredApproach", val)} />
                            ))}
                        </div>
                    </QuestionShell>
                )}

                {/* ── Q13: Open text ── */}
                {step === 13 && (
                    <QuestionShell
                        part="Part 4 — Your Goals"
                        question="Is there anything else we should know?"
                        subtitle="Anything specific you'd like Dr. Bangalee to be aware of — medications, allergies, past reactions, events coming up, budget constraints."
                        onNext={next}
                        canNext={true}
                        skipLabel="Nothing to add"
                        onSkip={next}
                    >
                        <textarea
                            rows={5}
                            value={answers.anythingElse}
                            onChange={(e) => setSingle("anythingElse", e.target.value)}
                            placeholder="e.g. I'm on Roaccutane / I have a wedding in 6 weeks / I've had bad reactions to retinol before…"
                            className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm focus:border-[#939EBA] focus:outline-none resize-none"
                        />
                    </QuestionShell>
                )}
            </div>
        </div>
    );
}

// ── Reusable question shell ─────────────────────────────────────────────────
function QuestionShell({
    part, question, subtitle, children, onNext, canNext, multiNote, skipLabel, onSkip,
}: {
    part: string;
    question: string;
    subtitle?: string;
    children: React.ReactNode;
    onNext: () => void;
    canNext: boolean;
    multiNote?: string;
    skipLabel?: string;
    onSkip?: () => void;
}) {
    return (
        <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A882] mb-3">
                {part}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A1917] mb-2 leading-tight">
                {question}
            </h2>
            {subtitle && <p className="text-sm text-[#6B6966] mb-6">{subtitle}</p>}
            {multiNote && <p className="text-xs text-[#939EBA] mb-3 font-semibold uppercase tracking-wider">{multiNote}</p>}

            <div className="mb-8">{children}</div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onNext}
                    disabled={!canNext}
                    className="flex items-center gap-2 bg-[#0F2647] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#1B3D6E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next <ArrowRight className="h-4 w-4" />
                </button>
                {skipLabel && onSkip && (
                    <button
                        onClick={onSkip}
                        className="flex items-center gap-1.5 text-sm text-[#6B6966] hover:text-[#0F2647] transition-colors"
                    >
                        <SkipForward className="h-4 w-4" /> {skipLabel}
                    </button>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { updateTreatmentMeta } from "@/app/admin/treatments/actions";

const RichHtmlEditor = dynamic(() => import("@/components/admin/RichHtmlEditor"), { ssr: false });

interface Faq {
  question: string;
  answer: string;
}

// Converts plain text with **bold** markers and \n\n paragraphs into HTML for Tiptap
function mdToHtml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .split(/\n\n+/)
    .map((para) =>
      `<p>${para
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}

interface JsonTreatment {
  heroText?: string;
  quickSummary?: string;
  whatIs?: string;
  expectedResults?: string;
  howWorks?: string[];
  suitableFor?: string[];
  faqs?: Faq[];
}

interface Treatment {
  slug: string;
  title: string;
  category: string;
  is_active: boolean;
  tagline: string | null;
  price_from: string | null;
  duration: string | null;
  downtime: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  hero_text: string | null;
  what_is: string | null;
  expected_results: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  how_works: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suitable_for: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  faqs: any;
}

const inputClass =
  "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";
const labelClass =
  "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
const sectionClass = "bg-white border border-[#E5E4E0] p-6";
const sectionTitle = "text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4";
const hintClass = "text-xs text-[#6B6966] mt-1";

export default function EditTreatmentClient({
  treatment,
  jsonFallback,
}: {
  treatment: Treatment;
  jsonFallback?: JsonTreatment | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // ── Basics ──────────────────────────────────────────────────────────────
  const [title, setTitle] = useState(treatment.title ?? "");
  const [tagline, setTagline] = useState(treatment.tagline ?? "");
  const [isActive, setIsActive] = useState(treatment.is_active);
  const [priceFrom, setPriceFrom] = useState(treatment.price_from ?? "");
  const [duration, setDuration] = useState(treatment.duration ?? "");
  const [downtime, setDowntime] = useState(treatment.downtime ?? "");

  // ── Content ─────────────────────────────────────────────────────────────
  const [heroText, setHeroText] = useState(
    treatment.hero_text ??
    mdToHtml(jsonFallback?.heroText ?? jsonFallback?.quickSummary)
  );
  const [whatIs, setWhatIs] = useState(
    treatment.what_is ??
    mdToHtml(jsonFallback?.whatIs ?? jsonFallback?.quickSummary)
  );
  const [expectedResults, setExpectedResults] = useState(
    treatment.expected_results ??
    mdToHtml(jsonFallback?.expectedResults)
  );
  const [howWorks, setHowWorks] = useState(
    Array.isArray(treatment.how_works)
      ? (treatment.how_works as string[]).join("\n")
      : Array.isArray(jsonFallback?.howWorks)
        ? (jsonFallback.howWorks as string[]).join("\n")
        : ""
  );
  const [suitableFor, setSuitableFor] = useState(
    Array.isArray(treatment.suitable_for)
      ? (treatment.suitable_for as string[]).join("\n")
      : Array.isArray(jsonFallback?.suitableFor)
        ? (jsonFallback.suitableFor as string[]).join("\n")
        : ""
  );
  const [faqs, setFaqs] = useState<Faq[]>(
    Array.isArray(treatment.faqs)
      ? (treatment.faqs as Faq[])
      : Array.isArray(jsonFallback?.faqs)
        ? (jsonFallback.faqs as Faq[])
        : []
  );

  // ── SEO / Meta ──────────────────────────────────────────────────────────
  const [metaTitle, setMetaTitle] = useState(treatment.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(treatment.meta_description ?? "");
  const [metaKeywords, setMetaKeywords] = useState(treatment.meta_keywords ?? "");
  const [ogImage, setOgImage] = useState(treatment.og_image ?? "");

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateTreatmentMeta(treatment.slug, {
        title: title || undefined,
        tagline: tagline || null,
        price_from: priceFrom || null,
        duration: duration || null,
        downtime: downtime || null,
        is_active: isActive,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        meta_keywords: metaKeywords || null,
        og_image: ogImage || null,
        hero_text: heroText || null,
        what_is: whatIs || null,
        expected_results: expectedResults || null,
        how_works: howWorks
          ? howWorks.split("\n").map((s) => s.trim()).filter(Boolean)
          : null,
        suitable_for: suitableFor
          ? suitableFor.split("\n").map((s) => s.trim()).filter(Boolean)
          : null,
        faqs: faqs.length > 0 ? faqs.filter((f) => f.question.trim()) : null,
      });
      if (res.success) showToast("Treatment saved ✓", true);
      else showToast(res.error ?? "Save failed", false);
    });
  };

  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (i: number) => setFaqs((prev) => prev.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, field: "question" | "answer", value: string) =>
    setFaqs((prev) => prev.map((faq, idx) => (idx === i ? { ...faq, [field]: value } : faq)));

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-medium shadow-lg ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.ok ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      <div className="space-y-6">

        {/* ── 1. TITLE & TAGLINE ───────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Title &amp; Tagline</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Treatment Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="e.g. Anti-Wrinkle Treatment"
              />
              <p className={hintClass}>
                Shown as the H1 on the treatment page and in all navigation menus.
              </p>
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className={inputClass}
                placeholder="One compelling sentence about this treatment"
              />
              <p className={hintClass}>Shown under the title. Leave blank to hide.</p>
            </div>
          </div>
        </div>

        {/* ── 2. VISIBILITY ───────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Visibility</h2>
          <button
            onClick={() => setIsActive((v) => !v)}
            className={`flex items-center gap-3 px-4 py-3 border transition-colors text-sm font-medium w-full sm:w-auto ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[#E5E4E0] bg-[#F8F8F7] text-[#6B6966]"
            }`}
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                isActive ? "bg-emerald-500" : "bg-[#D0CFC9]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isActive ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
            {isActive ? "Active — visible on site" : "Inactive — hidden from site"}
          </button>
        </div>

        {/* ── 3. PRICING & LOGISTICS ──────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Pricing &amp; Logistics</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Price From</label>
              <input
                type="text"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className={inputClass}
                placeholder="e.g. From R 1,200 per session"
              />
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputClass}
                placeholder="e.g. 30–60 minutes"
              />
            </div>
            <div>
              <label className={labelClass}>Downtime</label>
              <input
                type="text"
                value={downtime}
                onChange={(e) => setDowntime(e.target.value)}
                className={inputClass}
                placeholder="e.g. Minimal — 24–48 hours redness"
              />
            </div>
          </div>
        </div>

        {/* ── 4. PAGE CONTENT ─────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Page Content</h2>
          <p className="text-xs text-[#6B6966] mb-6">
            Content saved here overrides the built-in text on the live page.
            Leave a field blank to keep the existing built-in content.
          </p>

          <div className="space-y-8">

            {/* Hero paragraph */}
            <div>
              <label className={labelClass}>Opening Paragraph (Hero)</label>
              <p className={hintClass + " mb-2"}>
                The first paragraph shown below the title on the treatment page.
              </p>
              <RichHtmlEditor
                value={heroText}
                onChange={setHeroText}
                placeholder="Opening paragraph about this treatment…"
                variant="compact"
                minHeight="140px"
              />
            </div>

            {/* What is it */}
            <div>
              <label className={labelClass}>What Is It?</label>
              <p className={hintClass + " mb-2"}>
                Full explanation of the treatment. Supports multiple paragraphs, bold, and lists.
              </p>
              <RichHtmlEditor
                value={whatIs}
                onChange={setWhatIs}
                placeholder="Explain what the treatment is, how it works scientifically, what makes it different…"
                variant="full"
                minHeight="220px"
              />
            </div>

            {/* How it works */}
            <div>
              <label className={labelClass}>How It Works — Steps</label>
              <p className={hintClass + " mb-2"}>
                One step per line. Each line becomes a numbered step. Use{" "}
                <code className="font-mono bg-[#F8F8F7] px-1 border border-[#E5E4E0]">**word**</code>{" "}
                around text to make it <strong>bold</strong>.
              </p>
              <textarea
                value={howWorks}
                onChange={(e) => setHowWorks(e.target.value)}
                rows={8}
                className={inputClass + " resize-y font-mono text-xs leading-relaxed"}
                placeholder={
                  "Consultation — Dr. Bangalee discusses your concerns and assesses your skin.\n" +
                  "Preparation — The treatment area is cleansed thoroughly.\n" +
                  "Treatment — The procedure is performed with precision and care."
                }
              />
            </div>

            {/* Suitable for */}
            <div>
              <label className={labelClass}>Suitable For</label>
              <p className={hintClass + " mb-2"}>
                One bullet point per line. Use{" "}
                <code className="font-mono bg-[#F8F8F7] px-1 border border-[#E5E4E0]">**word**</code>{" "}
                for bold text.
              </p>
              <textarea
                value={suitableFor}
                onChange={(e) => setSuitableFor(e.target.value)}
                rows={5}
                className={inputClass + " resize-y font-mono text-xs leading-relaxed"}
                placeholder={
                  "Women and men **25+** wanting to soften expression lines.\n" +
                  "Those wanting a **preventive** approach before lines deepen."
                }
              />
            </div>

            {/* Expected results */}
            <div>
              <label className={labelClass}>Expected Results &amp; Timeline</label>
              <p className={hintClass + " mb-2"}>
                What patients can expect and when.
              </p>
              <RichHtmlEditor
                value={expectedResults}
                onChange={setExpectedResults}
                placeholder="Day 3–5: Initial softening begins. Day 10–14: Full result visible. Duration: 3–5 months…"
                variant="compact"
                minHeight="120px"
              />
            </div>

          </div>
        </div>

        {/* ── 5. FAQs ─────────────────────────────────────────────────── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest">
              FAQs
            </h2>
            <button
              type="button"
              onClick={addFaq}
              className="text-xs font-semibold text-[#0F2647] border border-[#0F2647] px-3 py-1.5 hover:bg-[#0F2647] hover:text-white transition-colors"
            >
              + Add Question
            </button>
          </div>

          {faqs.length === 0 ? (
            <p className="text-xs text-[#6B6966]">
              No FAQs added yet. Click &ldquo;+ Add Question&rdquo; to add one.
              Built-in FAQs from the original content will show until you add your own.
            </p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#E5E4E0] p-4 bg-[#F8F8F7]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#6B6966] uppercase tracking-widest">
                      Question {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#6B6966] mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(i, "question", e.target.value)}
                        className={inputClass}
                        placeholder="e.g. How long does this treatment last?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#6B6966] mb-1">
                        Answer
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(i, "answer", e.target.value)}
                        rows={3}
                        className={inputClass + " resize-y"}
                        placeholder="Enter the answer…"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 6. SEO & META ───────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>SEO &amp; Meta</h2>
          <p className="text-xs text-[#6B6966] mb-6">
            Leave blank to use the automatically generated values. Fill in to override for this page specifically.
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={inputClass}
                placeholder="e.g. Anti-Wrinkle Treatment Durban North | Star Aesthetic Centre"
              />
              <p className={hintClass}>
                Ideal: 50–60 characters. Shown in Google search results and the browser tab.
              </p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className={inputClass + " resize-none"}
                placeholder="A clear description of what this treatment page offers…"
              />
              <p className={hintClass}>
                Ideal: 140–160 characters. Shown under the page title in Google results.
              </p>
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className={inputClass}
                placeholder="anti-wrinkle treatment Durban, Botox Durban North, wrinkle relaxation KZN"
              />
              <p className={hintClass}>Comma-separated keywords for this page.</p>
            </div>
            <div>
              <label className={labelClass}>Social / OG Image</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className={inputClass}
                placeholder="/images/treatment-image.webp"
              />
              <p className={hintClass}>
                Image shown when this page is shared on WhatsApp, Facebook, etc. Use the /images/ path.
              </p>
            </div>
          </div>
        </div>

        {/* ── URL note ────────────────────────────────────────────────── */}
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 text-xs text-amber-800">
          <strong>Page URL:</strong>{" "}
          <span className="font-mono">/treatments/{treatment.category}/{treatment.slug}</span>
          <br />
          Changing the URL slug requires a developer — it affects site routing, Google indexing,
          and needs 301 redirects to be set up in the code.
        </div>

      </div>

      {/* ── Sticky save bar ─────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between bg-white border border-[#E5E4E0] px-6 py-4 sticky bottom-4 shadow-sm">
        <Link
          href="/admin/treatments"
          className="text-sm text-[#6B6966] hover:text-[#1A1917] transition-colors"
        >
          ← Back to treatments
        </Link>
        <div className="flex items-center gap-4">
          {isPending && <span className="text-xs text-[#C8A882]">Saving…</span>}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-[#0F2647] text-white text-sm font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Save Treatment
          </button>
          <Link
            href={`/treatments/${treatment.category}/${treatment.slug}`}
            target="_blank"
            className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors"
          >
            View on site →
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { updateTreatmentMeta } from "@/app/admin/treatments/actions";

const RichHtmlEditor = dynamic(() => import("@/components/admin/RichHtmlEditor"), { ssr: false });

// ── Types ────────────────────────────────────────────────────────────────────

interface Faq {
  _id: string;
  question: string;
  answer: string; // HTML from Tiptap
}

interface PricingRow {
  label: string;
  price: string;
}

interface PricingSection {
  heading: string;
  description: string;
  rows: PricingRow[];
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pricing_breakdown: any;
}

interface JsonTreatment {
  heroText?: string;
  quickSummary?: string;
  whatIs?: string;
  expectedResults?: string;
  howWorks?: string[];
  suitableFor?: string[];
  faqs?: { question: string; answer: string }[];
  pricingBreakdown?: {
    sections: { heading?: string; description?: string; rows: { label: string; price: string }[] }[];
    notes?: string[];
  };
}

interface SeoDefaults {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

/** Convert plain text with **bold** markers to HTML for Tiptap initial value */
function mdToHtml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .split(/\n\n+/)
    .map((para) =>
      `<p>${para
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>")
      }</p>`
    )
    .join("");
}

function initFaqs(treatment: Treatment, jsonFallback?: JsonTreatment | null): Faq[] {
  if (Array.isArray(treatment.faqs) && treatment.faqs.length > 0) {
    return (treatment.faqs as { question: string; answer: string }[]).map((f) => ({
      _id: uid(),
      question: f.question,
      answer: f.answer,
    }));
  }
  if (Array.isArray(jsonFallback?.faqs)) {
    return (jsonFallback!.faqs as { question: string; answer: string }[]).map((f) => ({
      _id: uid(),
      question: f.question,
      answer: mdToHtml(f.answer), // convert markdown → HTML for Tiptap
    }));
  }
  return [];
}

function initPricingSections(treatment: Treatment, jsonFallback?: JsonTreatment | null): PricingSection[] {
  const db = treatment.pricing_breakdown as { sections?: PricingSection[] } | null;
  if (Array.isArray(db?.sections) && db!.sections.length > 0) {
    return db!.sections.map((s) => ({
      heading: s.heading ?? "",
      description: s.description ?? "",
      rows: Array.isArray(s.rows) ? s.rows : [],
    }));
  }
  if (Array.isArray(jsonFallback?.pricingBreakdown?.sections)) {
    return jsonFallback!.pricingBreakdown!.sections.map((s) => ({
      heading: s.heading ?? "",
      description: s.description ?? "",
      rows: Array.isArray(s.rows) ? s.rows : [],
    }));
  }
  return [];
}

function initPricingNotes(treatment: Treatment, jsonFallback?: JsonTreatment | null): string {
  const db = treatment.pricing_breakdown as { notes?: string[] } | null;
  if (Array.isArray(db?.notes) && db!.notes.length > 0) return db!.notes.join("\n");
  if (Array.isArray(jsonFallback?.pricingBreakdown?.notes)) return jsonFallback!.pricingBreakdown!.notes!.join("\n");
  return "";
}

// ── Styles ────────────────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";
const labelClass =
  "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
const sectionClass = "bg-white border border-[#E5E4E0] p-6";
const sectionTitle = "text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4";
const hintClass = "text-xs text-[#6B6966] mt-1";
const smallBtn =
  "text-xs font-semibold border px-3 py-1.5 transition-colors";

// ── Component ─────────────────────────────────────────────────────────────────

export default function EditTreatmentClient({
  treatment,
  jsonFallback,
  seoDefaults,
}: {
  treatment: Treatment;
  jsonFallback?: JsonTreatment | null;
  seoDefaults?: SeoDefaults;
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

  // ── Page content ────────────────────────────────────────────────────────
  const [heroText, setHeroText] = useState(
    treatment.hero_text ?? mdToHtml(jsonFallback?.heroText ?? jsonFallback?.quickSummary)
  );
  const [whatIs, setWhatIs] = useState(
    treatment.what_is ?? mdToHtml(jsonFallback?.whatIs ?? jsonFallback?.quickSummary)
  );
  const [expectedResults, setExpectedResults] = useState(
    treatment.expected_results ?? mdToHtml(jsonFallback?.expectedResults)
  );
  const [howWorks, setHowWorks] = useState(
    Array.isArray(treatment.how_works)
      ? (treatment.how_works as string[]).join("\n")
      : Array.isArray(jsonFallback?.howWorks)
        ? (jsonFallback!.howWorks as string[]).join("\n")
        : ""
  );
  const [suitableFor, setSuitableFor] = useState(
    Array.isArray(treatment.suitable_for)
      ? (treatment.suitable_for as string[]).join("\n")
      : Array.isArray(jsonFallback?.suitableFor)
        ? (jsonFallback!.suitableFor as string[]).join("\n")
        : ""
  );

  // ── FAQs (with stable IDs for Tiptap key stability) ─────────────────────
  const [faqs, setFaqs] = useState<Faq[]>(() => initFaqs(treatment, jsonFallback));

  const addFaq = () => setFaqs((p) => [...p, { _id: uid(), question: "", answer: "" }]);
  const removeFaq = (id: string) => setFaqs((p) => p.filter((f) => f._id !== id));
  const updateFaqQ = (id: string, value: string) =>
    setFaqs((p) => p.map((f) => f._id === id ? { ...f, question: value } : f));
  const updateFaqA = (id: string, value: string) =>
    setFaqs((p) => p.map((f) => f._id === id ? { ...f, answer: value } : f));

  // ── Pricing ──────────────────────────────────────────────────────────────
  const [pricingSections, setPricingSections] = useState<PricingSection[]>(() =>
    initPricingSections(treatment, jsonFallback)
  );
  const [pricingNotes, setPricingNotes] = useState(() =>
    initPricingNotes(treatment, jsonFallback)
  );

  const addSection = () =>
    setPricingSections((p) => [...p, { heading: "", description: "", rows: [{ label: "", price: "" }] }]);
  const removeSection = (i: number) =>
    setPricingSections((p) => p.filter((_, idx) => idx !== i));
  const updateSection = (i: number, field: "heading" | "description", value: string) =>
    setPricingSections((p) => p.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  const addRow = (si: number) =>
    setPricingSections((p) => p.map((s, idx) => idx === si ? { ...s, rows: [...s.rows, { label: "", price: "" }] } : s));
  const removeRow = (si: number, ri: number) =>
    setPricingSections((p) => p.map((s, idx) => idx === si ? { ...s, rows: s.rows.filter((_, ridx) => ridx !== ri) } : s));
  const updateRow = (si: number, ri: number, field: "label" | "price", value: string) =>
    setPricingSections((p) =>
      p.map((s, idx) => idx === si
        ? { ...s, rows: s.rows.map((r, ridx) => ridx === ri ? { ...r, [field]: value } : r) }
        : s
      )
    );

  // ── SEO / Meta ──────────────────────────────────────────────────────────
  const [metaTitle, setMetaTitle] = useState(treatment.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(treatment.meta_description ?? "");
  const [metaKeywords, setMetaKeywords] = useState(treatment.meta_keywords ?? "");
  const [ogImage, setOgImage] = useState(treatment.og_image ?? "");

  // ── Save ─────────────────────────────────────────────────────────────────

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = () => {
    startTransition(async () => {
      const cleanFaqs = faqs
        .filter((f) => f.question.trim())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ _id, ...rest }) => rest);

      const cleanSections = pricingSections.filter(
        (s) => s.heading.trim() || s.rows.some((r) => r.label.trim())
      );

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
        faqs: cleanFaqs.length > 0 ? cleanFaqs : null,
        pricing_breakdown:
          cleanSections.length > 0
            ? {
                sections: cleanSections,
                notes: pricingNotes
                  ? pricingNotes.split("\n").map((s) => s.trim()).filter(Boolean)
                  : [],
              }
            : null,
      });

      if (res.success) showToast("Treatment saved ✓", true);
      else showToast(res.error ?? "Save failed", false);
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-medium shadow-lg ${
          toast.ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
        }`}>
          {toast.ok ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      <div className="space-y-6">

        {/* ── 1. TITLE & TAGLINE ────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Title &amp; Tagline</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Treatment Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className={inputClass} placeholder="e.g. Anti-Wrinkle Treatment" />
              <p className={hintClass}>Shown as the H1 on the treatment page and in all navigation menus.</p>
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
                className={inputClass} placeholder="One compelling sentence about this treatment" />
              <p className={hintClass}>Shown under the title. Leave blank to hide.</p>
            </div>
          </div>
        </div>

        {/* ── 2. VISIBILITY ─────────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Visibility</h2>
          <button onClick={() => setIsActive((v) => !v)}
            className={`flex items-center gap-3 px-4 py-3 border transition-colors text-sm font-medium w-full sm:w-auto ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[#E5E4E0] bg-[#F8F8F7] text-[#6B6966]"
            }`}>
            <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? "bg-emerald-500" : "bg-[#D0CFC9]"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isActive ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
            {isActive ? "Active — visible on site" : "Inactive — hidden from site"}
          </button>
        </div>

        {/* ── 3. PRICING & LOGISTICS ───────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Pricing &amp; Logistics</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className={labelClass}>Price From</label>
              <input type="text" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}
                className={inputClass} placeholder="e.g. From R 90 per unit" />
              <p className={hintClass}>Shown in the &quot;At a Glance&quot; card on the treatment page.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Duration</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                  className={inputClass} placeholder="e.g. 20–45 minutes" />
              </div>
              <div>
                <label className={labelClass}>Downtime</label>
                <input type="text" value={downtime} onChange={(e) => setDowntime(e.target.value)}
                  className={inputClass} placeholder="e.g. Zero downtime" />
              </div>
            </div>
          </div>

          {/* Pricing table editor */}
          <div className="border-t border-[#E5E4E0] pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={labelClass.replace("mb-2", "mb-0")}>Pricing Table</p>
                <p className={hintClass}>Detailed pricing breakdown shown on the treatment page.</p>
              </div>
              <button type="button" onClick={addSection}
                className={`${smallBtn} border-[#0F2647] text-[#0F2647] hover:bg-[#0F2647] hover:text-white`}>
                + Add Section
              </button>
            </div>

            {pricingSections.length === 0 ? (
              <p className="text-xs text-[#6B6966] italic">
                No pricing sections yet. Click &quot;+ Add Section&quot; to build the pricing table.
              </p>
            ) : (
              <div className="space-y-6">
                {pricingSections.map((section, si) => (
                  <div key={si} className="border border-[#E5E4E0] bg-[#F8F8F7]">
                    {/* Section header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#0F2647]">
                      <span className="text-xs font-bold uppercase tracking-widest text-white">
                        Section {si + 1}
                      </span>
                      <button type="button" onClick={() => removeSection(si)}
                        className="text-xs text-red-300 hover:text-white transition-colors">
                        Remove section
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <input type="text" value={section.heading}
                        onChange={(e) => updateSection(si, "heading", e.target.value)}
                        className={inputClass} placeholder="Section heading (e.g. Botulinum Toxin)" />
                      <input type="text" value={section.description}
                        onChange={(e) => updateSection(si, "description", e.target.value)}
                        className={inputClass} placeholder="Optional description (e.g. Per-unit pricing)" />

                      {/* Rows */}
                      <div className="space-y-2">
                        {section.rows.map((row, ri) => (
                          <div key={ri} className="flex gap-2 items-center">
                            <input type="text" value={row.label}
                              onChange={(e) => updateRow(si, ri, "label", e.target.value)}
                              className={`${inputClass} flex-1`} placeholder="Item label" />
                            <input type="text" value={row.price}
                              onChange={(e) => updateRow(si, ri, "price", e.target.value)}
                              className={`${inputClass} w-36`} placeholder="Price" />
                            <button type="button" onClick={() => removeRow(si, ri)}
                              className="text-xs text-red-400 hover:text-red-700 px-2 py-1 shrink-0 transition-colors">
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => addRow(si)}
                        className={`${smallBtn} border-[#939EBA] text-[#6B6966] hover:border-[#0F2647] hover:text-[#0F2647]`}>
                        + Add row
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pricingSections.length > 0 && (
              <div className="mt-4">
                <label className={labelClass}>Pricing Notes</label>
                <textarea value={pricingNotes} onChange={(e) => setPricingNotes(e.target.value)}
                  rows={3} className={`${inputClass} resize-y font-mono text-xs`}
                  placeholder={"* Prices include consultation fee.\n* Units required vary per individual."} />
                <p className={hintClass}>One note per line. Shown as asterisk items below the pricing table.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── 4. PAGE CONTENT ───────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>Page Content</h2>
          <p className="text-xs text-[#6B6966] mb-6">
            Content saved here overrides the built-in text on the live page.
            Leave a field blank to keep the existing built-in content.
          </p>

          <div className="space-y-8">
            <div>
              <label className={labelClass}>Opening Paragraph (Hero)</label>
              <p className={`${hintClass} mb-2`}>The first paragraph shown below the title.</p>
              <RichHtmlEditor value={heroText} onChange={setHeroText}
                placeholder="Opening paragraph about this treatment…"
                variant="compact" minHeight="140px" />
            </div>

            <div>
              <label className={labelClass}>What Is It?</label>
              <p className={`${hintClass} mb-2`}>Full explanation. Supports multiple paragraphs, bold, and lists.</p>
              <RichHtmlEditor value={whatIs} onChange={setWhatIs}
                placeholder="Explain what the treatment is, how it works, what makes it different…"
                variant="full" minHeight="220px" />
            </div>

            <div>
              <label className={labelClass}>How It Works — Steps</label>
              <p className={`${hintClass} mb-2`}>
                One step per line. Each line becomes a numbered step. Use{" "}
                <code className="font-mono bg-[#F8F8F7] px-1 border border-[#E5E4E0]">**word**</code>{" "}
                to make text <strong>bold</strong>.
              </p>
              <textarea value={howWorks} onChange={(e) => setHowWorks(e.target.value)}
                rows={8} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
                placeholder={"Consultation — Dr. Bangalee discusses your concerns.\nPreparation — The area is cleansed.\nTreatment — Performed with precision and care."} />
            </div>

            <div>
              <label className={labelClass}>Suitable For</label>
              <p className={`${hintClass} mb-2`}>
                One bullet point per line. Use{" "}
                <code className="font-mono bg-[#F8F8F7] px-1 border border-[#E5E4E0]">**word**</code>{" "}
                for bold text.
              </p>
              <textarea value={suitableFor} onChange={(e) => setSuitableFor(e.target.value)}
                rows={5} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
                placeholder={"Women and men **25+** wanting to soften expression lines.\nThose wanting a **preventive** approach."} />
            </div>

            <div>
              <label className={labelClass}>Expected Results &amp; Timeline</label>
              <p className={`${hintClass} mb-2`}>What patients can expect and when.</p>
              <RichHtmlEditor value={expectedResults} onChange={setExpectedResults}
                placeholder="Day 3–5: Initial softening begins. Day 10–14: Full result visible…"
                variant="compact" minHeight="120px" />
            </div>
          </div>
        </div>

        {/* ── 5. FAQs ───────────────────────────────────────────────────── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={sectionTitle.replace("mb-4", "mb-0")}>FAQs</h2>
            <button type="button" onClick={addFaq}
              className={`${smallBtn} border-[#0F2647] text-[#0F2647] hover:bg-[#0F2647] hover:text-white`}>
              + Add Question
            </button>
          </div>

          {faqs.length === 0 ? (
            <p className="text-xs text-[#6B6966]">
              No FAQs added yet. Click &ldquo;+ Add Question&rdquo; to add one.
              Built-in FAQs from the original content will show until you add your own.
            </p>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq._id} className="border border-[#E5E4E0] bg-[#F8F8F7]">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5E4E0]">
                    <span className="text-xs font-semibold text-[#6B6966] uppercase tracking-widest">
                      Question
                    </span>
                    <button type="button" onClick={() => removeFaq(faq._id)}
                      className="text-xs text-red-400 hover:text-red-700 transition-colors">
                      Remove
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#6B6966] mb-1">Question</label>
                      <input type="text" value={faq.question}
                        onChange={(e) => updateFaqQ(faq._id, e.target.value)}
                        className={inputClass} placeholder="e.g. How long does this treatment last?" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#6B6966] mb-1">Answer</label>
                      <RichHtmlEditor
                        key={faq._id}
                        value={faq.answer}
                        onChange={(html) => updateFaqA(faq._id, html)}
                        placeholder="Enter the answer…"
                        variant="compact"
                        minHeight="100px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 6. SEO & META ─────────────────────────────────────────────── */}
        <div className={sectionClass}>
          <h2 className={sectionTitle}>SEO &amp; Meta</h2>
          <p className="text-xs text-[#6B6966] mb-6">
            Leave blank to use the automatically generated values shown as placeholders below.
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                className={inputClass} placeholder={seoDefaults?.metaTitle} />
              <p className={hintClass}>Ideal: 50–60 characters. Shown in Google search results and the browser tab.</p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                rows={3} className={`${inputClass} resize-none`}
                placeholder={seoDefaults?.metaDescription} />
              <p className={hintClass}>Ideal: 140–160 characters. Shown under the page title in Google results.</p>
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)}
                className={inputClass} placeholder={seoDefaults?.metaKeywords} />
              <p className={hintClass}>Comma-separated keywords for this page.</p>
            </div>
            <div>
              <label className={labelClass}>Social / OG Image</label>
              <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
                className={inputClass} placeholder="/images/treatment-image.webp" />
              <p className={hintClass}>Shown when this page is shared on WhatsApp, Facebook, etc.</p>
            </div>
          </div>
        </div>

        {/* ── URL note ──────────────────────────────────────────────────── */}
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 text-xs text-amber-800 space-y-1">
          <p>
            <strong>Page URL:</strong>{" "}
            <span className="font-mono">/treatments/{treatment.category}/{treatment.slug}</span>
          </p>
          <p>
            <strong>Slug changes require a developer.</strong> The URL slug is hardcoded in the site routing,
            navigation menus, booking system, and Google&apos;s indexed URLs. Changing it here alone would
            break the page. A developer must update the code, add a 301 redirect, and update the database
            in the same deployment. Request it as a developer task.
          </p>
        </div>

      </div>

      {/* ── Sticky save bar ──────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between bg-white border border-[#E5E4E0] px-6 py-4 sticky bottom-4 shadow-sm">
        <Link href="/admin/treatments"
          className="text-sm text-[#6B6966] hover:text-[#1A1917] transition-colors">
          ← Back to treatments
        </Link>
        <div className="flex items-center gap-4">
          {isPending && <span className="text-xs text-[#C8A882]">Saving…</span>}
          <button onClick={handleSave} disabled={isPending}
            className="bg-[#0F2647] text-white text-sm font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            Save Treatment
          </button>
          <Link href={`/treatments/${treatment.category}/${treatment.slug}`} target="_blank"
            className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors">
            View on site →
          </Link>
        </div>
      </div>
    </div>
  );
}

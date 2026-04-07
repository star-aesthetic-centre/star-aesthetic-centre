"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { updateTreatmentMeta } from "@/app/admin/treatments/actions";

interface Treatment {
  slug: string;
  title: string;
  category: string;
  is_active: boolean;
  tagline: string | null;
  price_from: string | null;
  duration: string | null;
  downtime: string | null;
}

export default function EditTreatmentClient({ treatment }: { treatment: Treatment }) {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [tagline, setTagline] = useState(treatment.tagline ?? "");
  const [priceFrom, setPriceFrom] = useState(treatment.price_from ?? "");
  const [duration, setDuration] = useState(treatment.duration ?? "");
  const [downtime, setDowntime] = useState(treatment.downtime ?? "");
  const [isActive, setIsActive] = useState(treatment.is_active);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateTreatmentMeta(treatment.slug, {
        tagline,
        price_from: priceFrom,
        duration,
        downtime,
        is_active: isActive,
      });
      if (res.success) showToast("Treatment saved ✓", true);
      else showToast(res.error ?? "Save failed", false);
    });
  };

  const inputClass =
    "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";

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

        {/* Visibility */}
        <div className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4">
            Visibility
          </h2>
          <button
            onClick={() => setIsActive((v) => !v)}
            className={`flex items-center gap-3 px-4 py-3 border transition-colors text-sm font-medium w-full sm:w-auto ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[#E5E4E0] bg-[#F8F8F7] text-[#6B6966]"
            }`}
          >
            <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              isActive ? "bg-emerald-500" : "bg-[#D0CFC9]"
            }`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                isActive ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </span>
            {isActive ? "Active — visible on site" : "Inactive — hidden from site"}
          </button>
        </div>

        {/* Tagline */}
        <div className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4">
            Tagline
          </h2>
          <label className={labelClass}>Tagline / Subtitle</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className={inputClass}
            placeholder="One compelling sentence about this treatment"
          />
          <p className="text-xs text-[#6B6966] mt-1">Shown under the title on treatment listing pages.</p>
        </div>

        {/* Pricing & Logistics */}
        <div className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4">
            Pricing & Logistics
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Price From</label>
              <input
                type="text"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className={inputClass}
                placeholder="e.g. R 1,200 – R 2,500 per session"
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

        {/* Note about long-form content */}
        <div className="bg-[#F8F8F7] border border-[#E5E4E0] px-5 py-4">
          <p className="text-xs text-[#6B6966]">
            <strong className="text-[#1A1917]">Long-form content</strong> (hero text, what it is, how it works, FAQs, suitable for) is stored in{" "}
            <code className="font-mono bg-white px-1 py-0.5 border border-[#E5E4E0]">lib/data/treatments.json</code>.
            Ask your developer to update those sections.
          </p>
        </div>
      </div>

      {/* Save bar */}
      <div className="mt-6 flex items-center justify-between bg-white border border-[#E5E4E0] px-6 py-4 sticky bottom-4 shadow-sm">
        <Link href="/admin/treatments" className="text-sm text-[#6B6966] hover:text-[#1A1917] transition-colors">
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
            className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View on site
          </Link>
        </div>
      </div>
    </div>
  );
}

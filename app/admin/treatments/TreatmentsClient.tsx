"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleTreatmentActive } from "./actions";

interface TreatmentRow {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  price_from: string | null;
  duration: string | null;
  downtime: string | null;
  is_active: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  face: "Face",
  skin: "Skin",
  "body-wellness": "Body & Wellness",
};

const CATEGORY_COLORS: Record<string, string> = {
  face: "bg-rose-50 text-rose-700",
  skin: "bg-amber-50 text-amber-700",
  "body-wellness": "bg-sky-50 text-sky-700",
};

interface Props {
  treatments: TreatmentRow[];
}

export default function TreatmentsClient({ treatments }: Props) {
  const [local, setLocal] = useState(treatments);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (slug: string, current: boolean) => {
    setLocal((prev) =>
      prev.map((t) => (t.slug === slug ? { ...t, is_active: !current } : t))
    );
    startTransition(async () => {
      const res = await toggleTreatmentActive(slug, !current);
      if (!res.success) {
        setLocal((prev) =>
          prev.map((t) => (t.slug === slug ? { ...t, is_active: current } : t))
        );
        showToast(res.error ?? "Failed to update", false);
      } else {
        showToast(`${!current ? "Activated" : "Deactivated"}`, true);
      }
    });
  };

  const activeCount = local.filter((t) => t.is_active).length;
  const inactiveCount = local.filter((t) => !t.is_active).length;

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

      {/* Stats */}
      <div className="flex gap-6 mb-6 text-sm text-[#6B6966]">
        <span><strong className="text-[#1A1917]">{local.length}</strong> total</span>
        <span><strong className="text-emerald-600">{activeCount}</strong> active</span>
        <span><strong className="text-red-500">{inactiveCount}</strong> inactive</span>
        {isPending && <span className="text-[#C8A882]">Saving…</span>}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E4E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E4E0] bg-[#F8F8F7]">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966]">Treatment</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-28">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] hidden md:table-cell">Price from</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] hidden lg:table-cell">Duration</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-20">Active</th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {local.map((t) => (
                <tr
                  key={t.slug}
                  className={`border-b border-[#F2F1EF] hover:bg-[#FAFAF9] transition-colors ${
                    !t.is_active ? "opacity-50" : ""
                  }`}
                >
                  {/* Title */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#1A1917]">{t.title}</p>
                    <p className="text-xs text-[#6B6966] mt-0.5 line-clamp-1">{t.tagline}</p>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 ${CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {CATEGORY_LABELS[t.category] ?? t.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-[#1A1917]">{t.price_from || "—"}</span>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-[#6B6966]">{t.duration || "—"}</span>
                  </td>

                  {/* Active toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(t.slug, t.is_active)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        t.is_active ? "bg-emerald-500" : "bg-[#D0CFC9]"
                      }`}
                      title={t.is_active ? "Click to deactivate" : "Click to activate"}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          t.is_active ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/treatments/${t.slug}/edit`}
                        className="text-xs font-semibold text-[#0F2647] hover:text-[#1B3D6E] border border-[#0F2647]/20 hover:border-[#0F2647] px-2 py-1 transition-colors"
                        title="Edit treatment"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/treatments/${t.category}/${t.slug}`}
                        target="_blank"
                        className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors"
                        title="View on site"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#6B6966]">
        {local.length} treatments · Long-form content (descriptions, FAQs) requires developer changes to <code className="font-mono">lib/data/treatments.json</code>
      </p>
    </div>
  );
}

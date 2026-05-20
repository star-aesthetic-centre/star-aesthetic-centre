"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ExternalLink, Mic } from "lucide-react";
import type { TourStep } from "@/lib/team-guide/tour-steps";

type HowItWorks = {
  whatIsTheDoc: string;
  whoDoesWhat: { role: string; does: string }[];
  notYet: string;
};

export default function TeamGuideClient({
  howItWorks,
  steps,
}: {
  howItWorks: HowItWorks;
  steps: TourStep[];
}) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");

  function toggleDone(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  return (
    <>
      {/* Plain explanation */}
      <section className="mb-10 border border-[#C8A882]/40 bg-[#FFF8F0] p-6">
        <h2 className="font-heading text-lg font-bold text-[#0F2647]">How this walkthrough works</h2>
        <p className="mt-3 text-sm text-[#1A1917] leading-relaxed">{howItWorks.whatIsTheDoc}</p>

        <ul className="mt-5 space-y-4">
          {howItWorks.whoDoesWhat.map((row) => (
            <li key={row.role} className="text-sm">
              <p className="font-bold text-[#0F2647]">{row.role}</p>
              <p className="mt-1 text-[#636374] leading-relaxed">{row.does}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm font-medium text-[#0F2647] border-t border-[#C8A882]/30 pt-4">
          {howItWorks.notYet}
        </p>
      </section>

      {/* Step picker */}
      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
              activeId === s.id
                ? "border-[#0F2647] bg-[#0F2647] text-white"
                : "border-[#E5E4E0] bg-white text-[#636374] hover:border-[#939EBA]"
            }`}
          >
            {i + 1}. {s.title.replace(/^\d+\.\s*/, "")}
          </button>
        ))}
      </div>

      {/* Active step detail */}
      {active && (
        <article className="border border-[#E5E4E0] bg-white shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-[#E5E4E0] bg-[#F8F8F7] px-6 py-4">
            <h2 className="font-heading text-xl font-bold text-[#0F2647]">{active.title}</h2>
            <button
              type="button"
              onClick={() => toggleDone(active.id)}
              className={`flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                done.has(active.id) ? "text-emerald-700" : "text-[#939EBA]"
              }`}
            >
              {done.has(active.id) ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
              {done.has(active.id) ? "Done" : "Mark done"}
            </button>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-2">
                Step A — Nakita (or you) clicks
              </p>
              <p className="text-sm text-[#636374] mb-3">{active.whoClicks}</p>
              <Link
                href={active.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F2647] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1B3D6E]"
              >
                {active.openLabel}
                <ExternalLink className="h-4 w-4 opacity-80" />
              </Link>
              <p className="mt-2 text-xs text-[#939EBA]">
                Opens in a new tab — keep this guide open in the first tab.
              </p>
            </div>

            <div className="border-l-4 border-[#C8A882] bg-[#FFF8F0] pl-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-2 flex items-center gap-1">
                <Mic className="h-3.5 w-3.5" /> Step B — Niki (gold button, bottom-right)
              </p>
              <p className="text-sm text-[#1A1917] leading-relaxed">{active.nikiAction}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-2">
                Step C — Optional script (read aloud or skip)
              </p>
              <p className="text-sm text-[#636374] leading-relaxed italic">&ldquo;{active.script}&rdquo;</p>
            </div>

            <div className="rounded border border-dashed border-[#939EBA]/50 bg-[#F8F8F7] px-4 py-3">
              <p className="text-xs font-bold text-[#0F2647]">Checkpoint — pause here</p>
              <p className="mt-1 text-sm text-[#636374]">{active.checkpoint}</p>
              <p className="mt-2 text-xs text-[#939EBA]">
                Let them ask Niki questions. When ready, click the next step number above.
              </p>
            </div>
          </div>

          <div className="flex justify-between border-t border-[#E5E4E0] px-6 py-4 bg-[#F8F8F7]">
            <button
              type="button"
              disabled={steps.findIndex((s) => s.id === active.id) <= 0}
              onClick={() => {
                const i = steps.findIndex((s) => s.id === active.id);
                if (i > 0) setActiveId(steps[i - 1].id);
              }}
              className="text-sm font-semibold text-[#636374] disabled:opacity-30 hover:text-[#0F2647]"
            >
              ← Previous step
            </button>
            <button
              type="button"
              disabled={steps.findIndex((s) => s.id === active.id) >= steps.length - 1}
              onClick={() => {
                const i = steps.findIndex((s) => s.id === active.id);
                if (i < steps.length - 1) {
                  toggleDone(active.id);
                  setActiveId(steps[i + 1].id);
                }
              }}
              className="text-sm font-semibold text-[#0F2647] hover:underline disabled:opacity-30"
            >
              Next step →
            </button>
          </div>
        </article>
      )}

      <p className="mt-8 text-center text-sm text-[#939EBA]">
        Progress: {done.size} / {steps.length} steps marked done
      </p>
    </>
  );
}

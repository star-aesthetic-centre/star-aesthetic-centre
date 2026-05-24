"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Mic,
  Home,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  CreditCard,
  TrendingUp,
  LayoutDashboard,
  User,
  ClipboardList,
  ChevronRight,
  Trophy,
  Info,
  ChevronDown,
} from "lucide-react";
import type { TourStep } from "@/lib/team-guide/tour-steps";

type HowItWorks = {
  whatIsTheDoc: string;
  whoDoesWhat: { role: string; does: string }[];
  notYet: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  ClipboardList,
  CreditCard,
  TrendingUp,
  Mic,
  LayoutDashboard,
  User,
};

function StepIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Circle;
  return <Icon className={className} />;
}

export default function TeamGuideClient({
  howItWorks,
  steps,
}: {
  howItWorks: HowItWorks;
  steps: TourStep[];
}) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  function toggleDone(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function goToStep(id: string) {
    setActiveId(id);
    // Scroll to top of content area on mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById("step-content")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }

  const active = steps.find((s) => s.id === activeId) ?? steps[0];
  const activeIndex = steps.findIndex((s) => s.id === activeId);
  const allDone = done.size === steps.length;
  const progressPct = Math.round((done.size / steps.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#F7F7F8]">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col border-r border-[#E2E2E6] bg-white">
        {/* Progress header */}
        <div className="border-b border-[#E2E2E6] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#939EBA]">
              Walkthrough progress
            </p>
            <span className="text-xs font-bold text-[#0F2647]">
              {done.size}/{steps.length}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#E2E2E6]">
            <div
              className="h-1.5 rounded-full bg-[#C8A882] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {allDone && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <Trophy size={12} /> All steps complete!
            </p>
          )}
        </div>

        {/* Step nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          {steps.map((s, i) => {
            const isActive = s.id === activeId;
            const isDone = done.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStep(s.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded p-3 text-left transition-colors ${
                  isActive
                    ? "bg-[#0F2647] text-white"
                    : isDone
                      ? "bg-emerald-50 hover:bg-emerald-100"
                      : "hover:bg-[#F7F7F8]"
                }`}
              >
                {/* Step number / done icon */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-[#F7F7F8] text-[#939EBA]"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={14} /> : i + 1}
                </span>

                {/* Text */}
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold leading-tight ${
                      isActive ? "text-white" : isDone ? "text-[#1A1917]" : "text-[#1A1917]"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-[11px] leading-tight ${
                      isActive ? "text-white/60" : "text-[#939EBA]"
                    }`}
                  >
                    {s.summary}
                  </span>
                </span>

                {/* Icon */}
                <StepIcon
                  name={s.icon}
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-[#C8A882]" : isDone ? "text-emerald-500" : "text-[#E2E2E6]"}`}
                />
              </button>
            );
          })}
        </nav>

        {/* How it works toggle */}
        <div className="border-t border-[#E2E2E6]">
          <button
            type="button"
            onClick={() => setHowItWorksOpen((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left text-xs font-semibold text-[#636374] hover:text-[#0F2647] transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Info size={13} /> How this walkthrough works
            </span>
            <ChevronDown
              size={13}
              className={`transition-transform ${howItWorksOpen ? "rotate-180" : ""}`}
            />
          </button>
          {howItWorksOpen && (
            <div className="border-t border-[#E2E2E6] bg-[#F7F7F8] px-5 py-4 text-xs text-[#636374] leading-relaxed space-y-3">
              <p>{howItWorks.whatIsTheDoc}</p>
              {howItWorks.whoDoesWhat.map((row) => (
                <div key={row.role}>
                  <p className="font-bold text-[#0F2647]">{row.role}</p>
                  <p className="mt-0.5">{row.does}</p>
                </div>
              ))}
              <p className="font-medium text-[#0F2647] border-t border-[#E2E2E6] pt-3">
                {howItWorks.notYet}
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {/* Mobile: progress bar + step picker */}
        <div className="lg:hidden border-b border-[#E2E2E6] bg-white px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-[#636374]">
              Step {activeIndex + 1} of {steps.length}
            </p>
            <span className="text-xs text-[#939EBA]">
              {done.size} done · {progressPct}%
            </span>
          </div>
          <div className="mb-4 h-1.5 w-full rounded-full bg-[#E2E2E6]">
            <div
              className="h-1.5 rounded-full bg-[#C8A882] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {steps.map((s, i) => {
              const isActive = s.id === activeId;
              const isDone = done.has(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToStep(s.id)}
                  className={`flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-[#0F2647] text-white"
                      : isDone
                        ? "bg-emerald-100 text-emerald-700"
                        : "border border-[#E5E4E0] bg-white text-[#636374] hover:border-[#939EBA]"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={10} /> : null}
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* All-done celebration */}
          {allDone && (
            <div className="mb-6 flex items-center gap-4 rounded border border-emerald-200 bg-emerald-50 px-6 py-4">
              <Trophy className="h-8 w-8 shrink-0 text-emerald-500" />
              <div>
                <p className="font-heading font-bold text-emerald-800">
                  Walkthrough complete!
                </p>
                <p className="mt-0.5 text-sm text-emerald-700">
                  All {steps.length} steps done. The team has seen the full platform.
                </p>
              </div>
            </div>
          )}

          {/* Step card */}
          {active && (
            <article id="step-content" className="overflow-hidden border border-[#E2E2E6] bg-white shadow-sm">
              {/* Card header */}
              <div className="flex items-center justify-between gap-4 bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-white/10">
                    <StepIcon name={active.icon} className="h-5 w-5 text-[#C8A882]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A882]">
                      Step {activeIndex + 1} of {steps.length}
                    </p>
                    <h2 className="font-heading text-xl font-bold text-white leading-tight">
                      {active.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-white/60">{active.summary}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleDone(active.id)}
                  className={`flex shrink-0 items-center gap-2 rounded px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    done.has(active.id)
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {done.has(active.id) ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Circle size={14} />
                  )}
                  {done.has(active.id) ? "Done" : "Mark done"}
                </button>
              </div>

              {/* Card body — steps A, B, C, checkpoint */}
              <div className="divide-y divide-[#F0F0F2]">

                {/* Step A — open the page */}
                <div className="flex gap-4 p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F2647] text-xs font-bold text-white">
                    A
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1.5">
                      Open the page
                    </p>
                    <p className="text-sm text-[#636374] leading-relaxed mb-4">
                      {active.whoClicks}
                    </p>
                    <Link
                      href={active.openUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0F2647] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B3D6E]"
                    >
                      {active.openLabel}
                      <ExternalLink size={14} className="opacity-70" />
                    </Link>
                    <p className="mt-2 text-xs text-[#939EBA]">
                      Opens in a new tab — keep this guide open here.
                    </p>
                  </div>
                </div>

                {/* Step B — Niki */}
                <div className="flex gap-4 bg-[#FFF8EE] p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C8A882] text-xs font-bold text-[#0F2647]">
                    B
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1.5">
                      <Mic size={11} />
                      Use Niki
                    </p>
                    <p className="text-sm text-[#1A1917] leading-relaxed">
                      {active.nikiAction}
                    </p>
                  </div>
                </div>

                {/* Step C — script */}
                <div className="flex gap-4 p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E2E2E6] bg-[#F7F7F8] text-xs font-bold text-[#939EBA]">
                    C
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1.5">
                      Script — read aloud or paraphrase (optional)
                    </p>
                    <blockquote className="border-l-4 border-[#C8A882]/50 bg-[#F7F7F8] py-3 pl-4 pr-3 text-sm italic text-[#636374] leading-relaxed">
                      &ldquo;{active.script}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Checkpoint */}
                <div className="p-6">
                  <div className="rounded border border-dashed border-amber-300 bg-amber-50 px-5 py-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Pause &amp; check in
                      </p>
                    </div>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      {active.checkpoint}
                    </p>
                    <p className="mt-2 text-xs text-amber-700">
                      Let them explore or ask Niki questions. When ready, click Next step.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card footer — navigation */}
              <div className="flex items-center justify-between border-t border-[#E2E2E6] bg-[#F7F7F8] px-6 py-4">
                <button
                  type="button"
                  disabled={activeIndex <= 0}
                  onClick={() => {
                    if (activeIndex > 0) goToStep(steps[activeIndex - 1].id);
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#636374] transition-colors hover:text-[#0F2647] disabled:opacity-30"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-1">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToStep(s.id)}
                      className={`h-2 rounded-full transition-all ${
                        s.id === activeId
                          ? "w-5 bg-[#0F2647]"
                          : done.has(s.id)
                            ? "w-2 bg-emerald-400"
                            : "w-2 bg-[#E2E2E6]"
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={activeIndex >= steps.length - 1}
                  onClick={() => {
                    if (activeIndex < steps.length - 1) {
                      toggleDone(active.id);
                      goToStep(steps[activeIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#0F2647] transition-colors hover:underline disabled:opacity-30"
                >
                  Next step
                  <ChevronRight size={14} />
                </button>
              </div>
            </article>
          )}

          {/* Mobile: how it works (collapsed) */}
          <div className="mt-6 lg:hidden">
            <button
              type="button"
              onClick={() => setHowItWorksOpen((v) => !v)}
              className="flex w-full items-center justify-between border border-[#E2E2E6] bg-white px-5 py-3.5 text-left text-sm font-semibold text-[#636374] hover:text-[#0F2647] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Info size={14} /> How this walkthrough works
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${howItWorksOpen ? "rotate-180" : ""}`}
              />
            </button>
            {howItWorksOpen && (
              <div className="border border-t-0 border-[#E2E2E6] bg-white px-5 py-5 text-sm text-[#636374] leading-relaxed space-y-4">
                <p>{howItWorks.whatIsTheDoc}</p>
                {howItWorks.whoDoesWhat.map((row) => (
                  <div key={row.role}>
                    <p className="font-bold text-[#0F2647]">{row.role}</p>
                    <p className="mt-1">{row.does}</p>
                  </div>
                ))}
                <p className="font-medium text-[#0F2647] border-t border-[#E2E2E6] pt-4">
                  {howItWorks.notYet}
                </p>
              </div>
            )}
          </div>

          {/* Admin link */}
          <div className="mt-6 border border-[#E2E2E6] bg-white px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">
              Need admin access?
            </p>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0F2647] hover:underline"
            >
              Go to admin dashboard <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

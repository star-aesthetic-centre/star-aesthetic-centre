"use client";

import { useEffect } from "react";
import { Mic, ChevronRight } from "lucide-react";
import {
  INTRODUCTION_TOUR_META,
  INTRODUCTION_TOUR_SECTIONS,
} from "@/lib/content/introduction-tour";
import { useNiki } from "@/components/niki/NikiProvider";
import { NikiPageContextBridge } from "@/components/niki/NikiPageContextBridge";

/** Hero CTA — starts the voice introduction tour via Niki */
export function IntroductionNikiTourButton() {
  const { introductionTour, requestIntroductionTour } = useNiki();

  return (
    <button
      type="button"
      onClick={requestIntroductionTour}
      disabled={introductionTour.active && !introductionTour.pendingStart}
      className="mt-8 inline-flex items-center gap-2 border-2 border-[#C8A882] bg-[#C8A882]/15 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#C8A882] hover:text-[#0F2647] disabled:opacity-70 disabled:cursor-default"
    >
      <Mic className="h-4 w-4 shrink-0" aria-hidden />
      <span className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:gap-2">
        <span>{INTRODUCTION_TOUR_META.buttonLabel}</span>
        <span className="text-[11px] font-semibold text-white/70 sm:text-sm sm:text-inherit sm:font-bold">
          · {INTRODUCTION_TOUR_META.buttonSub}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 opacity-80 hidden sm:block" aria-hidden />
    </button>
  );
}

/** Keeps Niki context on introduction + scrolls to active tour section */
export function IntroductionTourScrollSync() {
  const { introductionTour } = useNiki();

  useEffect(() => {
    if (!introductionTour.active) return;
    const section = INTRODUCTION_TOUR_SECTIONS[introductionTour.sectionIndex];
    if (!section) return;
    const el = document.getElementById(section.anchorId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [introductionTour.active, introductionTour.sectionIndex]);

  return (
    <NikiPageContextBridge
      type="introduction"
      introductionTourSectionIndex={introductionTour.sectionIndex}
    />
  );
}

/** Sticky progress while the tour is active */
export function IntroductionTourProgress() {
  const { introductionTour } = useNiki();
  if (!introductionTour.active) return null;

  const section = INTRODUCTION_TOUR_SECTIONS[introductionTour.sectionIndex];
  const total = INTRODUCTION_TOUR_SECTIONS.length;
  const current = introductionTour.sectionIndex + 1;

  return (
    <div
      className="sticky top-0 z-40 border-b border-[#C8A882]/40 bg-[#FFF8F0] px-4 py-3 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA]">
        {INTRODUCTION_TOUR_META.activeLabel}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#0F2647]">
        {section?.title ?? "Introduction"} · {current} of {total}
      </p>
    </div>
  );
}

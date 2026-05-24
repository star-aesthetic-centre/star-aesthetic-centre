import type { Metadata } from "next";
import {
  HOW_IT_WORKS,
  TOUR_INTRO,
  TOUR_STEPS,
} from "@/lib/team-guide/tour-steps";
import TeamGuideClient from "./TeamGuideClient";

export const metadata: Metadata = {
  title: "Team website walkthrough — Star Aesthetic Centre",
  description:
    "Step-by-step walkthrough of the Star Aesthetic Centre website for Nakita, Dr Bangalee, and the team.",
  robots: { index: false, follow: false },
};

export default function TeamGuidePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A882]">
                Internal · not linked from public menu
              </p>
              <h1 className="font-heading mt-2 text-3xl font-bold text-white sm:text-4xl">
                {TOUR_INTRO.title}
              </h1>
              <p className="mt-3 max-w-xl text-base text-white/75 leading-relaxed">
                {TOUR_INTRO.subtitle}
              </p>
            </div>
            <div className="shrink-0 rounded border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8A882] mb-1">
                Bookmark this page
              </p>
              <code className="font-mono text-white">/team-guide</code>
              <p className="mt-2 text-xs text-white/50">
                {TOUR_STEPS.length} steps · ~30 minutes
              </p>
            </div>
          </div>

          {/* Step quick-links */}
          <div className="mt-8 flex flex-wrap gap-2">
            {TOUR_STEPS.map((s, i) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                <span className="font-bold text-[#C8A882]">{i + 1}</span>
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </header>

      <TeamGuideClient howItWorks={HOW_IT_WORKS} steps={TOUR_STEPS} />
    </div>
  );
}

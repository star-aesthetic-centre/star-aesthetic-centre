import type { Metadata } from "next";
import Link from "next/link";
import {
  HOW_IT_WORKS,
  TOUR_INTRO,
  TOUR_STEPS,
} from "@/lib/team-guide/tour-steps";
import TeamGuideClient from "./TeamGuideClient";

export const metadata: Metadata = {
  title: "Team guide — website walkthrough",
  description:
    "Step-by-step walkthrough of the Star Aesthetic Centre website for Nakita, Dr Bangalee, and the team.",
  robots: { index: false, follow: false },
};

export default function TeamGuidePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <header className="border-b border-[#E2E2E6] bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A882]">
            Internal · not for public menu
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-white sm:text-4xl">
            {TOUR_INTRO.title}
          </h1>
          <p className="mt-3 text-base text-white/80 leading-relaxed">{TOUR_INTRO.subtitle}</p>
          <p className="mt-6 text-sm text-white/70">
            Bookmark this page:{" "}
            <code className="bg-white/10 px-2 py-0.5 text-[#C8A882]">/team-guide</code>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <TeamGuideClient howItWorks={HOW_IT_WORKS} steps={TOUR_STEPS} />

        <section className="mt-12 border border-[#E5E4E0] bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-[#0F2647]">Full written guide</h2>
          <p className="mt-2 text-sm text-[#636374] leading-relaxed">
            A longer PDF-style document (vision, FAQs, five-year plan) lives in the project at{" "}
            <code className="text-xs bg-[#F8F8F7] px-1">docs/platform-guide-for-team.md</code> for
            developers. This page is the <strong>practical click-through</strong> version.
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-block text-sm font-semibold text-[#0F2647] hover:underline"
          >
            Go to admin →
          </Link>
        </section>
      </div>
    </div>
  );
}

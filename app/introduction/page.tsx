import type { Metadata } from "next";
import Link from "next/link";
import {
  IntroductionNikiTourButton,
  IntroductionPageClient,
} from "./IntroductionPageClient";
import {
  CONCLUSION,
  FEATURES,
  INTRODUCTION_META,
  OPENING,
  VISION_SECTIONS,
} from "@/lib/content/introduction-content";
import { renderBoldText } from "@/lib/content/render-bold-text";

export const metadata: Metadata = {
  title: INTRODUCTION_META.title,
  description: INTRODUCTION_META.subtitle,
  robots: { index: false, follow: false },
};

export default function IntroductionPage() {
  return (
    <IntroductionPageClient>
    <article className="min-h-screen bg-[#F7F7F8]">
      {/* Hero */}
      <header className="border-b border-[#E2E2E6] bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-4 py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C8A882]">
            {INTRODUCTION_META.audience}
          </p>
          <h1 className="font-heading mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
            {OPENING.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 leading-relaxed sm:text-lg">
            {INTRODUCTION_META.subtitle}
          </p>
          <IntroductionNikiTourButton />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Opening */}
        <section id="tour-opening" className="prose prose-slate max-w-none scroll-mt-24">
          {OPENING.paragraphs.map((p, i) => (
            <p key={i} className="text-[#1A1917] leading-relaxed mb-5 text-base sm:text-lg">
              {renderBoldText(p)}
            </p>
          ))}
        </section>

        {/* Vision */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#0F2647] sm:text-3xl border-b border-[#E5E4E0] pb-4">
            Vision & opportunity
          </h2>
          <div className="mt-10 space-y-12">
            {VISION_SECTIONS.map((block) => (
              <div key={block.id} id={`tour-${block.id}`} className="scroll-mt-24">
                <h3 className="font-heading text-xl font-bold text-[#0F2647]">{block.title}</h3>
                <div className="mt-4 space-y-4">
                  {block.content.map((para, i) => (
                    <p key={i} className="text-[#636374] leading-relaxed text-sm sm:text-base">
                      {renderBoldText(para, "font-semibold text-[#1A1917]")}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="tour-features" className="mt-20 scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold text-[#0F2647] sm:text-3xl border-b border-[#E5E4E0] pb-4">
            Platform features
          </h2>
          <p className="mt-4 text-[#636374] leading-relaxed">
            Everything below is live on the new website — built to work together as one system.
          </p>

          <ul className="mt-10 space-y-8">
            {FEATURES.map((f, index) => (
              <li
                key={f.id}
                id={`feature-${f.id}`}
                className="border border-[#E5E4E0] bg-white shadow-sm scroll-mt-24"
              >
                <div className="border-b border-[#E5E4E0] bg-[#F8F8F7] px-6 py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA]">
                      Feature {index + 1}
                    </span>
                    <h3 className="font-heading mt-1 text-xl font-bold text-[#0F2647]">{f.title}</h3>
                    <p className="mt-1 text-sm font-medium text-[#C8A882]">{f.tagline}</p>
                  </div>
                </div>
                <div className="px-6 py-5 space-y-4 text-sm sm:text-base">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1">
                      What it is
                    </p>
                    <p className="text-[#1A1917] leading-relaxed">{renderBoldText(f.whatItIs)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1">
                      Why it matters
                    </p>
                    <p className="text-[#636374] leading-relaxed">
                      {renderBoldText(f.whyItMatters, "font-semibold text-[#636374]")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1">
                      How it works
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[#636374] leading-relaxed">
                      {f.howItWorks.map((line, i) => (
                        <li key={i}>{renderBoldText(line, "font-semibold text-[#636374]")}</li>
                      ))}
                    </ul>
                  </div>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      className="inline-block mt-2 text-sm font-semibold text-[#0F2647] hover:text-[#C8A882] transition-colors"
                    >
                      {f.link.label} →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Conclusion */}
        <section id="tour-conclusion" className="mt-20 border-t-4 border-[#C8A882] bg-[#0F2647] text-white px-6 py-12 sm:px-10 sm:py-14 scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {CONCLUSION.headline}
          </h2>
          <div className="mt-6 space-y-5">
            {CONCLUSION.paragraphs.map((p, i) => (
              <p key={i} className="text-white/85 leading-relaxed text-sm sm:text-base">
                {renderBoldText(p, "font-semibold text-white")}
              </p>
            ))}
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-[#C8A882]">
            {CONCLUSION.signoff}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="bg-[#C8A882] px-6 py-3 text-sm font-bold text-[#0F2647] hover:bg-[#A08060] transition-colors"
            >
              Visit homepage
            </Link>
            <Link
              href="/admin"
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Open admin
            </Link>
          </div>
        </section>

        <p className="mt-12 text-center text-xs text-[#939EBA]">
          Questions about this platform? Speak with your technical contact or explore each feature
          using the links above.
        </p>
      </div>
    </article>
    </IntroductionPageClient>
  );
}

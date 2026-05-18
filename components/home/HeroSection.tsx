import Link from "next/link";
import Image from "next/image";
import type { HomePageContent } from "@/lib/content/site-pages-types";

type Props = {
  content: HomePageContent["hero"];
};

export default function HeroSection({ content }: Props) {
  return (
    <section className="relative min-h-[93vh] overflow-hidden">
      <Image
        src="/images/star-aesthetic-centre-durban-homepage-hero-005.webp"
        alt="Star Aesthetic Centre Durban clinic"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0F2647]/90 via-[#1B3D6E]/60 to-transparent" />

      <div className="relative mx-auto flex min-h-[93vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl pt-8 pb-6 lg:pt-12 lg:pb-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#939EBA]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
              {content.overline}
            </span>
          </div>

          <h1 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-bold uppercase leading-[1.08] tracking-wide text-white">
            {content.headingLine1}
            <br />
            <em className="not-italic text-[#939EBA]">{content.headingEmphasis}</em>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">{content.subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2.5 bg-[#939EBA] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
            >
              {content.ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5"
            >
              {content.ctaSecondary}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
            {content.stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-[#B8C5E0]">{s.value}</p>
                <p className="mt-0.5 text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden items-center gap-3 bg-white/10 px-5 py-3 backdrop-blur-md lg:flex">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
        <p className="text-xs font-medium text-white/80">Doctor-led · Durban North</p>
      </div>
    </section>
  );
}

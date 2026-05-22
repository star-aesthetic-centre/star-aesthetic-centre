import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/brands";

// Clinical "best for" tags per brand — curated from the assessment doc
const brandMeta: Record<
  string,
  { ageRange: string; concerns: string[]; targetProfile: string }
> = {
  dermaceutic: {
    ageRange: "30–55",
    concerns: ["Pigmentation", "Post-treatment", "Brightening"],
    targetProfile: "Patients maintaining clinical treatment results at home",
  },
  heliocare: {
    ageRange: "All ages",
    concerns: ["Sun protection", "Pigmentation prevention", "Daily defence"],
    targetProfile: "Everyone in South Africa's high-UV climate",
  },
  isdin: {
    ageRange: "14–45",
    concerns: ["Acne", "Sensitive skin", "DNA repair SPF"],
    targetProfile: "Teens, first-time skincare users, sensitive skin",
  },
  mesoestetic: {
    ageRange: "35–60",
    concerns: ["Serious anti-aging", "Melasma", "Post-procedure"],
    targetProfile: "Clinic patients wanting professional home care",
  },
  neostrata: {
    ageRange: "25–55",
    concerns: ["Acne", "Skin texture", "Skin renewal"],
    targetProfile: "Congested, dull, or acne-prone skin at any age",
  },
  skinceuticals: {
    ageRange: "35–65",
    concerns: ["Premium anti-aging", "Vitamin C", "Environmental defence"],
    targetProfile: "The premium buyer who accepts no compromise",
  },
};

export default function BrandShowcase() {
  return (
    <section className="bg-[#F7F7F8] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#939EBA]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
              Our Brands
            </span>
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold uppercase leading-[1.08] tracking-wide text-[#1A1A1F]">
            Six world-class brands.
            <br />
            <em className="not-italic text-[#939EBA]">One clinical eye.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#636374]">
            We don&apos;t carry products because they&apos;re popular — we carry them because they work.
            Each brand was selected for its science, its results, and the specific gap it fills in
            a clinical skincare protocol. Every brand has a distinct purpose and a distinct patient.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => {
            const meta = brandMeta[brand.slug];
            return (
              <div
                key={brand.slug}
                className="group flex flex-col bg-white border border-[#E2E2E6] transition-all duration-200 hover:border-[#939EBA]/40 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Brand accent top bar */}
                <div
                  className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: brand.accent }}
                />

                {/* Logo area */}
                <div className="flex items-center justify-center border-b border-[#E2E2E6] px-8 py-8 bg-white">
                  <div className="relative h-16 w-48">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} skincare`}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="192px"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mb-2">
                    {meta?.ageRange}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A1F] leading-snug mb-3">
                    {brand.tagline}
                  </p>
                  <p className="text-xs leading-relaxed text-[#636374] mb-5 flex-1">
                    {brand.shortDescription}
                  </p>

                  {/* Concern tags */}
                  {meta && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {meta.concerns.map((c) => (
                        <span
                          key={c}
                          className="rounded-none border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                          style={{
                            borderColor: `${brand.accent}40`,
                            color: brand.accent,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Target profile */}
                  {meta && (
                    <p className="mb-5 text-[11px] text-[#939EBA] italic border-l-2 border-[#E2E2E6] pl-3 leading-relaxed">
                      Best for: {meta.targetProfile}
                    </p>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/shop/brands/${brand.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1F] transition-colors hover:text-[#939EBA]"
                    style={{ color: brand.accent }}
                  >
                    Shop {brand.name}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

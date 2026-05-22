import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/brands";

type Rating = "primary" | "capable" | "none";

interface ComparisonRow {
  category: string;
  description: string;
  ratings: Record<string, Rating>;
}

const rows: ComparisonRow[] = [
  {
    category: "Acne & Breakouts",
    description: "Targeting active acne, clogged pores, and post-acne marks",
    ratings: {
      dermaceutic: "capable",
      heliocare: "none",
      isdin: "primary",
      mesoestetic: "capable",
      neostrata: "primary",
      skinceuticals: "capable",
    },
  },
  {
    category: "Pigmentation",
    description: "Sun spots, melasma, post-inflammatory hyperpigmentation",
    ratings: {
      dermaceutic: "primary",
      heliocare: "primary",
      isdin: "capable",
      mesoestetic: "primary",
      neostrata: "primary",
      skinceuticals: "capable",
    },
  },
  {
    category: "Anti-Ageing",
    description: "Fine lines, wrinkles, loss of firmness and elasticity",
    ratings: {
      dermaceutic: "primary",
      heliocare: "capable",
      isdin: "capable",
      mesoestetic: "primary",
      neostrata: "primary",
      skinceuticals: "primary",
    },
  },
  {
    category: "Sun Protection",
    description: "UVA, UVB, visible light and infrared defence",
    ratings: {
      dermaceutic: "none",
      heliocare: "primary",
      isdin: "primary",
      mesoestetic: "none",
      neostrata: "none",
      skinceuticals: "capable",
    },
  },
  {
    category: "Sensitive Skin",
    description: "Reactive, redness-prone, rosacea-adjacent skin types",
    ratings: {
      dermaceutic: "capable",
      heliocare: "primary",
      isdin: "primary",
      mesoestetic: "capable",
      neostrata: "primary",
      skinceuticals: "primary",
    },
  },
  {
    category: "Post-Treatment",
    description: "Home care after peels, laser, IPL or injectable procedures",
    ratings: {
      dermaceutic: "primary",
      heliocare: "capable",
      isdin: "capable",
      mesoestetic: "primary",
      neostrata: "capable",
      skinceuticals: "primary",
    },
  },
  {
    category: "Teen Skin",
    description: "Acne-prone skin in the under-20 age group",
    ratings: {
      dermaceutic: "none",
      heliocare: "primary",
      isdin: "primary",
      mesoestetic: "none",
      neostrata: "capable",
      skinceuticals: "none",
    },
  },
  {
    category: "Skin Texture & Renewal",
    description: "Dullness, congestion, enlarged pores, rough surface",
    ratings: {
      dermaceutic: "primary",
      heliocare: "none",
      isdin: "capable",
      mesoestetic: "capable",
      neostrata: "primary",
      skinceuticals: "capable",
    },
  },
  {
    category: "Premium Anti-Ageing",
    description: "Advanced multi-mechanism correction for 40+ skin",
    ratings: {
      dermaceutic: "capable",
      heliocare: "none",
      isdin: "none",
      mesoestetic: "primary",
      neostrata: "capable",
      skinceuticals: "primary",
    },
  },
];

const priceLabels: Record<string, string> = {
  dermaceutic: "Premium",
  heliocare: "Mid-range",
  isdin: "Mid-range",
  mesoestetic: "Premium",
  neostrata: "Mid-range",
  skinceuticals: "Premium+",
};

function RatingCell({ rating, accent }: { rating: Rating; accent: string }) {
  if (rating === "primary") {
    return (
      <div className="flex flex-col items-center gap-1">
        <div
          className="flex h-7 w-7 items-center justify-center"
          style={{ backgroundColor: `${accent}18` }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7l3.5 3.5L12 3"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>
          Core
        </span>
      </div>
    );
  }
  if (rating === "capable") {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-7 w-7 items-center justify-center bg-[#F7F7F8]">
          <div className="h-2 w-2 rounded-full bg-[#C0C9DD]" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-[#939EBA]">Good</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-7 w-7 items-center justify-center">
        <div className="h-px w-4 bg-[#E2E2E6]" />
      </div>
      <span className="text-[9px] uppercase tracking-wider text-[#C0C9DD]">—</span>
    </div>
  );
}

export default function BrandComparisonTable() {
  return (
    <section className="border-t border-[#E2E2E6] bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#939EBA]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
              Brand Comparison
            </span>
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-bold uppercase leading-[1.1] tracking-wide text-[#1A1A1F]">
            Which brand is right
            <br />
            <em className="not-italic text-[#939EBA]">for your concern?</em>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#636374]">
            Each brand leads in specific areas. Use this to identify which one targets your primary
            concern — then let Niki build the full regime around it.
          </p>
        </div>

        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[720px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full border-collapse">

              {/* Header row — brand logos */}
              <thead>
                <tr>
                  <th className="w-44 pb-6 pr-4 text-left align-bottom">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#939EBA]">
                      Skin Concern
                    </span>
                  </th>
                  {brands.map((brand) => (
                    <th key={brand.slug} className="pb-6 px-2 text-center align-bottom">
                      <Link
                        href={`/shop/brands/${brand.slug}`}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div
                          className="h-0.5 w-10 mb-1 transition-all duration-200 group-hover:w-full"
                          style={{ backgroundColor: brand.accent }}
                        />
                        <div className="relative h-10 w-24">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            unoptimized
                            className="object-contain"
                            sizes="96px"
                          />
                        </div>
                        <span
                          className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: brand.accent }}
                        >
                          Shop →
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr
                    key={row.category}
                    className={rowIdx % 2 === 0 ? "bg-[#F7F7F8]" : "bg-white"}
                  >
                    {/* Row label */}
                    <td className="py-4 pr-4 align-middle">
                      <p className="text-sm font-semibold text-[#1A1A1F]">{row.category}</p>
                      <p className="text-[11px] text-[#939EBA] mt-0.5 leading-snug">
                        {row.description}
                      </p>
                    </td>

                    {/* Rating cells */}
                    {brands.map((brand) => (
                      <td key={brand.slug} className="py-4 px-2 text-center align-middle">
                        <RatingCell
                          rating={row.ratings[brand.slug] ?? "none"}
                          accent={brand.accent}
                        />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Price tier row */}
                <tr className="border-t-2 border-[#E2E2E6]">
                  <td className="py-4 pr-4 align-middle">
                    <p className="text-sm font-semibold text-[#1A1A1F]">Price Tier</p>
                    <p className="text-[11px] text-[#939EBA] mt-0.5">Approximate positioning</p>
                  </td>
                  {brands.map((brand) => (
                    <td key={brand.slug} className="py-4 px-2 text-center align-middle">
                      <span
                        className="inline-block border px-2 py-1 text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          borderColor: `${brand.accent}50`,
                          color: brand.accent,
                        }}
                      >
                        {priceLabels[brand.slug]}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#E2E2E6] pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#636374]">Key:</span>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center bg-[#939EBA]/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="#939EBA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs text-[#636374]">Core strength of this brand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center bg-[#F7F7F8]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C0C9DD]" />
            </div>
            <span className="text-xs text-[#636374]">Capable but not a primary focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-px w-5 bg-[#E2E2E6]" />
            <span className="text-xs text-[#636374]">Not this brand&apos;s focus</span>
          </div>
          <div className="ml-auto">
            <p className="text-xs text-[#939EBA] italic">
              Not sure where you fit? Let Niki decide for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

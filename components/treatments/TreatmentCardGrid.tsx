import Link from "next/link";
import Image from "next/image";
import { calculateStarlights, formatStarlights } from "@/lib/utils/rewards";
import { treatmentCategoryLabel, type TreatmentCardItem } from "@/lib/treatment-cards";

interface TreatmentCardGridProps {
  cards: TreatmentCardItem[];
  showHeader?: boolean;
  /** Use h1 on dedicated /treatments page; h2 when embedded on homepage */
  headingLevel?: "h1" | "h2";
}

export default function TreatmentCardGrid({
  cards,
  showHeader = true,
  headingLevel = "h2",
}: TreatmentCardGridProps) {
  const HeadingTag = headingLevel;
  return (
    <>
      {showHeader && (
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#939EBA]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                Our Treatments
              </span>
            </div>
            <HeadingTag className="font-heading text-4xl font-bold leading-tight text-[#1A1A1F] sm:text-5xl">
              Medical Aesthetic
              <br />
              Excellence
            </HeadingTag>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#636374] sm:text-right">
            All treatments delivered by Dr. Rajeev Bangalee and Nakita for safe, clinical, natural-looking results.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((t) => (
          <Link
            key={`${t.category}-${t.slug}`}
            href={`/treatments/${t.category}/${t.slug}`}
            className="group relative flex flex-col overflow-hidden border border-[#E2E2E6] bg-white transition-all hover:-translate-y-1 hover:border-[#939EBA]/30 hover:shadow-lg hover:shadow-[#939EBA]/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F8]">
              <Image
                src={t.image}
                alt={t.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized={t.image.startsWith("http")}
              />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Read More
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
                {treatmentCategoryLabel(t.category)}
              </p>
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1A1A1F]">
                {t.name}
              </h3>
              <p className="mt-2 text-xs font-semibold text-[#636374]">
                From <span className="font-bold text-[#1B3D6E]">R {t.priceFrom.toLocaleString("en-ZA")}</span>
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 border border-[#0F2647]/10 bg-[#0F2647]/5 px-2.5 py-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A882" stroke="none" aria-hidden>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#0F2647]">
                  From {formatStarlights(calculateStarlights(t.priceFrom))}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

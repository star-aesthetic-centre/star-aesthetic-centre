import Link from "next/link";
import Image from "next/image";
import { calculateStarlights, formatStarlights } from "@/lib/utils/rewards";
import { TREATMENT_GROUPS, type GroupedTreatment } from "@/lib/treatment-groups";

/**
 * "Explore treatments" — three groups, each with its own heading and generous
 * separation, per Dr. Bangalee's homepage brief: Injectables (7), Skin & Hair
 * (6), Medical Services (3).
 *
 * Card styling is unchanged from the previous flat grid. What changed is the
 * rhythm: each group is a block of its own with air around it, so a patient
 * reads three considered categories rather than one wall of sixteen tiles.
 */

function TreatmentCard({ item }: { item: GroupedTreatment }) {
  const shell =
    "group relative flex flex-col overflow-hidden border border-[#E2E2E6] bg-white transition-all hover:-translate-y-1 hover:border-[#939EBA]/30 hover:shadow-lg hover:shadow-[#939EBA]/10";

  // No page yet: an enquiry card in the same visual family. Deliberately has
  // no image — inventing a stock photo for a treatment we have no photograph
  // of would misrepresent it.
  if (!item.card) {
    return (
      <Link href="/book" className={`${shell} justify-between p-5`}>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
            By Consultation
          </p>
          <h4 className="text-sm font-semibold leading-snug text-[#1A1A1F]">{item.name}</h4>
        </div>
        <p className="mt-6 text-xs font-semibold text-[#1B3D6E] group-hover:underline">
          {item.note ?? "Enquire"} →
        </p>
      </Link>
    );
  }

  const t = item.card;
  return (
    <Link href={`/treatments/${t.category}/${t.slug}`} className={shell}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F8]">
        <Image
          src={t.image}
          alt={t.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={t.image.startsWith("http")}
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Learn More
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1A1A1F]">
          {item.name}
        </h4>
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
  );
}

export default function TreatmentCategories() {
  return (
    <section className="bg-[#F7F7F8] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#939EBA]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
              Explore Treatments
            </span>
            <span className="h-px w-8 bg-[#939EBA]" />
          </div>
          <h2 className="font-heading text-4xl font-bold leading-tight text-[#1A1A1F] sm:text-5xl">
            Explore treatments
          </h2>
        </div>

        {/* Generous separation between groups — the brief asked for room to
            breathe, and three distinct blocks read very differently from one
            undifferentiated grid. */}
        <div className="mt-20 space-y-24">
          {TREATMENT_GROUPS.map((group) => (
            <div key={group.key}>
              <div className="mb-10 border-t border-[#E2E2E6] pt-8 sm:flex sm:items-end sm:justify-between sm:gap-10">
                <h3 className="font-heading text-2xl font-bold text-[#1A1A1F] sm:text-3xl">
                  {group.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#636374] sm:mt-0 sm:text-right">
                  {group.blurb}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <TreatmentCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center justify-center gap-2 bg-[#0F2647] px-10 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1B3D6E] no-underline"
          >
            View all treatments →
          </Link>
        </div>

        {/*
          Cards show a starting price; the treatment pages carry the full range
          and what drives it. Without this line a patient reads "From R1,800",
          clicks through to "R1,800 – R4,600" and feels the price moved.
        */}
        <p className="mt-10 text-xs leading-relaxed text-[#636374]">
          Prices shown are starting prices. The final cost depends on the treatment plan agreed with
          Dr. Bangalee at your consultation — see each treatment page for the full price range and
          what determines it.
        </p>
      </div>
    </section>
  );
}

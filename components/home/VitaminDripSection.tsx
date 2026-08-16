import Image from "next/image";
import Link from "next/link";
import { TREATMENT_CARDS } from "@/lib/treatment-cards";
import { treatmentPath } from "@/lib/treatment-routes";

/**
 * Vitamin Drips — its own homepage section, deliberately not mixed into the
 * treatment grid above.
 *
 * The Party Drip leads on a full-width banner because it is the one thing on
 * this site somebody buys today, because of how they feel this morning. The
 * other four sit below it as equals.
 */

const PARTY_SLUG = "party-recovery-drip";
const SUPPORTING = [
  "hydration-vitamin-drip",
  "fitness-vitamin-drip",
  "glutathione-brightening-drip",
  "ultimate-vitamin-drip",
];

const BLURBS: Record<string, string> = {
  "hydration-vitamin-drip": "Run down, dehydrated or just depleted after a demanding week.",
  "fitness-vitamin-drip": "Training hard — before a session, after one, or on a recovery day.",
  "glutathione-brightening-drip": "A focused antioxidant infusion. Our shortest drip.",
  "ultimate-vitamin-drip": "Everything in one: the full vitamin complex plus glutathione.",
};

function zar(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

export default function VitaminDripSection() {
  const party = TREATMENT_CARDS.find((c) => c.slug === PARTY_SLUG);
  const others = SUPPORTING.map((s) => TREATMENT_CARDS.find((c) => c.slug === s)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  if (!party) return null;

  return (
    <section className="bg-[#F7F7F8] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div className="mb-10 text-center">
          <p className="overline mb-3 text-[#939EBA]">VITAMIN IV THERAPY</p>
          <h2 className="font-heading text-3xl font-bold text-[#1A1A1F] lg:text-4xl">
            Vitamin Drips in Durban North
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#636374]">
            Five drips, each formulated for something different. Two chairs, so you can
            bring a friend — and most days you can book for later the same day.
          </p>
        </div>

        {/* ── Party Drip — the hero of this section ──
            Not a single wrapping link: the button books, the secondary link
            reads. Nesting them inside one anchor is invalid HTML and would
            have sent everyone to the wrong place. */}
        <div className="group relative isolate mb-8 overflow-hidden rounded-sm">
          <Image
            src={party.image}
            alt={party.imageAlt}
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />

          <div className="relative flex min-h-[26rem] flex-col justify-center px-6 py-14 sm:px-10 lg:min-h-[30rem] lg:px-16">
            <p className="overline mb-3 text-[#F3C969]">SAME-DAY APPOINTMENTS</p>
            <h3 className="font-heading max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Big night? Book a Party Vitamin Boost.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 lg:text-lg">
              A full vitamin complex with an additional dose of Vitamin B12 and a litre of
              fluid — formulated to replenish key nutrients and rehydrate the body when
              you are feeling depleted. In and out inside the hour.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={`/book-drip?drip=${PARTY_SLUG}`}
                className="inline-flex items-center justify-center bg-[#F3C969] px-10 py-5 text-base font-bold text-[#1A1A1F] shadow-lg transition-transform duration-200 hover:scale-[1.03]"
              >
                Book a Party Drip →
              </Link>
              <Link
                href={treatmentPath(PARTY_SLUG)}
                className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                {zar(party.priceFrom)} · about an hour · minimal downtime — read more
              </Link>
            </div>
          </div>
        </div>

        {/* ── The other four ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((drip) => (
            <Link
              key={drip.slug}
              href={treatmentPath(drip.slug)}
              className="group flex flex-col border border-[#E2E2E6] bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={drip.image}
                  alt={drip.imageAlt}
                  width={1448}
                  height={1086}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-bold text-[#1A1A1F]">{drip.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#636374]">
                  {BLURBS[drip.slug]}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#1A1A1F]">
                  From {zar(drip.priceFrom)}
                </p>
                <span className="mt-3 text-sm font-semibold text-[#939EBA] group-hover:text-[#7A87A6]">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={treatmentPath("vitamin-drips")}
            className="text-sm font-semibold text-[#939EBA] hover:text-[#7A87A6]"
          >
            Compare all five drips →
          </Link>
        </div>
      </div>
    </section>
  );
}

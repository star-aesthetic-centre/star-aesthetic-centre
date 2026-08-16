import Image from "next/image";
import Link from "next/link";
import { TREATMENT_CARDS } from "@/lib/treatment-cards";
import { treatmentPath } from "@/lib/treatment-routes";

/**
 * The five drips, as cards, on the pillar page.
 *
 * A pillar page's job is to route people to the right child. Without this the
 * only way from here to an individual drip was the comparison table further
 * down, which is a poor entry point for someone still deciding.
 */

const ORDER = [
  {
    slug: "party-recovery-drip",
    when: "After a late night",
    blurb:
      "Full vitamin complex with an additional dose of Vitamin B12, plus a litre of fluid to rehydrate.",
  },
  {
    slug: "hydration-vitamin-drip",
    when: "Run down or dehydrated",
    blurb:
      "The full complex of essential vitamins in a litre of fluid — our straightforward wellness infusion.",
  },
  {
    slug: "fitness-vitamin-drip",
    when: "Training and recovery",
    blurb:
      "The full complex with additional Vitamin C and B vitamins, for active lifestyles and rest days.",
  },
  {
    slug: "glutathione-brightening-drip",
    when: "Antioxidant support",
    blurb:
      "A focused 200ml infusion of Glutathione 600mg and Vitamin C 1,000mg. Our shortest drip.",
  },
  {
    slug: "ultimate-vitamin-drip",
    when: "Everything in one",
    blurb:
      "The full vitamin blend plus additional Vitamin B, Vitamin C and Glutathione. Our most comprehensive.",
  },
];

function zar(n: number) {
  return `R ${n.toLocaleString("en-ZA")}`;
}

export default function DripChooser() {
  const cards = ORDER.map((o) => ({
    ...o,
    card: TREATMENT_CARDS.find((c) => c.slug === o.slug),
  })).filter((c) => c.card);

  return (
    <div>
      <h2 className="font-heading mb-3 text-3xl font-bold text-[#1A1A1F]">Choose Your Drip</h2>
      <p className="mb-8 max-w-2xl text-[#636374]">
        Five formulations, each for something different. Not sure? Dr. Bangalee will recommend
        the most appropriate option at your assessment.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ slug, when, blurb, card }) => (
          <Link
            key={slug}
            href={treatmentPath(slug)}
            className="group flex flex-col border border-[#E2E2E6] bg-white transition-shadow hover:shadow-lg not-prose"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={card!.image}
                alt={card!.imageAlt}
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-0 top-0 bg-[#0F2647] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                {when}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-lg font-bold text-[#1A1A1F]">{card!.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#636374]">{blurb}</p>
              <p className="mt-4 text-sm font-semibold text-[#1A1A1F]">{zar(card!.priceFrom)}</p>
              <span className="mt-3 text-sm font-semibold text-[#939EBA] group-hover:text-[#7A87A6]">
                Read more →
              </span>
            </div>
          </Link>
        ))}

        {/* Book — sits as the sixth tile so the grid resolves cleanly. */}
        <div className="flex flex-col justify-center border border-[#0F2647] bg-[#0F2647] p-6 text-center not-prose">
          <h3 className="font-heading text-xl font-bold text-white">Already know?</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Two chairs per slot, 09:00–16:00 Monday to Friday. Most days you can book for later
            the same day.
          </p>
          <Link
            href="/book-drip"
            className="mt-5 inline-block bg-[#F3C969] px-6 py-3 text-sm font-bold text-[#1A1A1F] transition-colors hover:bg-[#E8BC53]"
          >
            Book a Vitamin Drip →
          </Link>
        </div>
      </div>
    </div>
  );
}

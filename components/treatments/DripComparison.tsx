import Link from "next/link";
import { treatmentPath } from "@/lib/treatment-routes";

/**
 * Side-by-side comparison of the five drips.
 *
 * Every row is drawn from the clinic's own price list and drip brochure —
 * volumes, what each formula contains, and price. No benefit claims: the
 * table answers "what is actually in it and what does it cost", which is the
 * question someone choosing between five drips is actually asking.
 */

type Row = {
  label: string;
  /** true = present, false = not present, string = a value to show. */
  values: (boolean | string)[];
};

const DRIPS = [
  { slug: "glutathione-brightening-drip", name: "Bright", full: "Glutathione & Vitamin C" },
  { slug: "hydration-vitamin-drip", name: "Hydrating", full: "Hydration" },
  { slug: "party-recovery-drip", name: "Party", full: "Party Recovery" },
  { slug: "fitness-vitamin-drip", name: "Fitness", full: "Fitness & Recovery" },
  { slug: "ultimate-vitamin-drip", name: "Ultimate", full: "Ultimate" },
];

const ROWS: Row[] = [
  { label: "Volume", values: ["200ml", "1 litre", "1 litre", "1 litre", "1 litre"] },
  { label: "Full vitamin complex", values: [false, true, true, true, true] },
  { label: "Vitamin C", values: [true, true, true, true, true] },
  { label: "Additional Vitamin B12", values: [false, false, true, true, true] },
  { label: "Additional Vitamin C", values: [true, false, false, true, true] },
  { label: "Glutathione 600mg", values: [true, false, false, false, true] },
  {
    label: "Chosen for",
    values: [
      "Antioxidant support",
      "Hydration",
      "After a late night",
      "Training & recovery",
      "Everything in one",
    ],
  },
  { label: "Price", values: ["R 1,070", "R 1,265", "R 1,465", "R 1,620", "R 1,870"] },
];

function Tick() {
  return (
    <span className="inline-flex items-center justify-center" aria-label="Included">
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#3F7D58]" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="inline-flex items-center justify-center" aria-label="Not included">
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#C0C0C8]" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default function DripComparison() {
  return (
    <div>
      <h2 className="font-heading mb-6 text-3xl font-bold text-[#1A1A1F]">
        Compare the Five Drips
      </h2>

      {/* Scrolls horizontally on small screens rather than squashing the columns. */}
      <div className="overflow-x-auto border border-[#E2E2E6] bg-white">
        <table className="w-full min-w-[46rem] border-collapse text-sm not-prose">
          <thead>
            <tr className="border-b-2 border-[#939EBA] bg-[#F7F7F8]">
              <th scope="col" className="p-4 text-left font-semibold text-[#1A1A1F]">
                &nbsp;
              </th>
              {DRIPS.map((d) => (
                <th key={d.slug} scope="col" className="p-4 text-center align-bottom">
                  <Link
                    href={treatmentPath(d.slug)}
                    className="font-heading block text-base font-bold text-[#1A1A1F] hover:text-[#939EBA]"
                  >
                    {d.name}
                  </Link>
                  <span className="mt-1 block text-xs font-normal text-[#636374]">{d.full}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-[#E2E2E6] last:border-0">
                <th scope="row" className="p-4 text-left font-semibold text-[#1A1A1F]">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="p-4 text-center align-middle text-[#636374]">
                    {v === true ? <Tick /> : v === false ? <Cross /> : <span>{v}</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-[#F7F7F8]">
              <th scope="row" className="p-4 text-left font-semibold text-[#1A1A1F]">
                &nbsp;
              </th>
              {DRIPS.map((d) => (
                <td key={d.slug} className="p-4 text-center">
                  <Link
                    href={treatmentPath(d.slug)}
                    className="inline-block bg-[#0F2647] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1B3D6E]"
                  >
                    Read more
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-[#636374]">
        All five contain vitamins that occur in the base complex; the rows above show what is
        added on top. Dr. Bangalee will confirm which drip is appropriate for you at your
        assessment.
      </p>
    </div>
  );
}

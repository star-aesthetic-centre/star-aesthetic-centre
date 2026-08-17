import Link from "next/link";
import { DELIVERY_STATEMENT } from "@/lib/treatment-delivery";

/**
 * The two copy blocks from Dr. Bangalee's homepage brief, verbatim.
 *
 * "Choose care built around you" sits between the hero and the treatment
 * groups on purpose: it frames the list that follows as a conversation rather
 * than a menu, which is the whole point of the paragraph.
 */
export function CareApproach() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold leading-tight text-[#1A1A1F] sm:text-4xl">
          Choose care built around you
        </h2>
        <p className="mt-8 text-base leading-relaxed text-[#636374]">
          Aesthetic treatment should begin with a conversation, not a menu. We take time to
          understand your concerns, assess what is clinically appropriate and explain the likely
          benefit, limitations, risks and cost before you decide. Sometimes the right plan is a
          subtle treatment, a staged approach, skincare alone — or no treatment at all.
        </p>
      </div>
    </section>
  );
}

/**
 * "Medical expertise before aesthetics" — the who-performs disclosure, given a
 * section of its own rather than a footnote. The first sentence is shared with
 * every treatment page via DELIVERY_STATEMENT so the two can never drift.
 */
export function MedicalExpertise() {
  return (
    <section className="border-y border-[#E5E4E0] bg-[#F8F8F7] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold leading-tight text-[#1A1A1F] sm:text-4xl">
          Medical expertise before aesthetics
        </h2>
        <p className="mt-8 text-base leading-relaxed text-[#636374]">
          {DELIVERY_STATEMENT} Our aim is informed, proportionate care — not pressure to proceed.
        </p>
        <Link
          href="/dr-rajeev-bangalee"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3D6E] hover:underline"
        >
          Meet the doctor →
        </Link>
      </div>
    </section>
  );
}

import { AlertTriangle } from "lucide-react";

/**
 * Site-wide medical disclaimer.
 *
 * Two halves doing two different jobs, so they are styled differently:
 *
 *  1. The general notice — this is background information, not a
 *     consultation. Footer-weight text is right for it.
 *
 *  2. The urgent-symptoms warning. This one is not boilerplate. A patient
 *     reading it has possibly just had a filler complication, and vascular
 *     occlusion is time-critical. Setting it in the same 11px grey as the
 *     copyright line would bury the only sentence on the page that could
 *     matter medically, so it gets a rule, an icon and readable contrast.
 *
 * The heading stays literally "Medical Disclaimer". A clever title reads as
 * marketing and invites the reader to skip it, which is the opposite of what
 * this text is for.
 */
export function MedicalDisclaimer() {
  return (
    <section
      aria-labelledby="medical-disclaimer-heading"
      className="mt-12 border-t border-[#E2E2E6] pt-8"
    >
      <h2
        id="medical-disclaimer-heading"
        className="font-heading text-xs font-semibold uppercase tracking-widest text-[#939EBA]"
      >
        Medical Disclaimer
      </h2>

      <p className="mt-3 max-w-3xl text-xs leading-relaxed text-[#636374]">
        Information on this website is general and does not replace a medical consultation.
        Suitability, expected outcomes, alternatives, risks and costs are assessed individually.
        Results and recovery vary.
      </p>

      <p className="mt-4 flex max-w-3xl items-start gap-2.5 border-l-2 border-[#C0392B] bg-[#C0392B]/[0.04] py-2.5 pl-3 pr-3 text-xs leading-relaxed text-[#1A1A1F]">
        <AlertTriangle
          size={15}
          className="mt-px shrink-0 text-[#C0392B]"
          strokeWidth={2}
          aria-hidden
        />
        <span>
          <strong className="font-semibold">Seek urgent medical advice</strong> if you develop
          severe or worsening pain, unusual skin colour change, visual symptoms, breathing
          difficulty or another concerning reaction after treatment.
        </span>
      </p>
    </section>
  );
}

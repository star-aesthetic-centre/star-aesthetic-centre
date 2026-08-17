/**
 * Who actually performs a treatment.
 *
 * The practice's position, stated verbatim by Dr. Bangalee:
 *
 *   "All medical injectable treatments are personally assessed and performed
 *    by Dr Bangalee. Selected skin treatments may be performed by a trained
 *    aesthetic practitioner under clinic protocols."
 *
 * This lives in one place because the site used to say something stronger in
 * two of them — the treatment-page doctor card claimed every treatment was
 * "planned and performed by the doctor", and the doctor page's philosophy
 * strip said "Every treatment performed by a qualified GP". Both read as a
 * promise a patient could hold the clinic to. A claim about who performs a
 * medical procedure has to be accurate everywhere it appears, so every surface
 * now reads from here.
 */

export const DELIVERY_STATEMENT =
  "All medical injectable treatments are personally assessed and performed by Dr Bangalee. " +
  "Selected skin treatments may be performed by a trained aesthetic practitioner under clinic protocols.";

/**
 * Treatments involving a needle or cannula — doctor-performed, without
 * exception. Classified by the rule in the statement above (injectable vs
 * skin treatment), not by guesswork about the clinic's rota.
 */
const INJECTABLE_SLUGS = new Set([
  "anti-wrinkle-treatment",
  "lip-filler",
  "jaw-amp-chin-contouring",
  "excessive-sweating",
  "varicose-veins", // sclerotherapy — injected
  "body-contouring", // fat-dissolving injectable
  "medi-lean", // prescribed weight-loss injectable
  "vitamin-drips",
  "hydration-vitamin-drip",
  "party-recovery-drip",
  "fitness-vitamin-drip",
  "glutathione-brightening-drip",
  "ultimate-vitamin-drip",
]);

export function isInjectable(slug: string): boolean {
  return INJECTABLE_SLUGS.has(slug);
}

/**
 * The line shown under the doctor's byline on a treatment page. Injectables
 * get the firm promise; skin treatments get the honest one — the doctor
 * assesses and plans either way, which is the part that actually reassures.
 */
export function deliveryNote(slug: string, treatmentTitle: string): string {
  return isInjectable(slug)
    ? `${treatmentTitle} is personally assessed and performed by Dr. Bangalee, with home-care products he selects himself.`
    : `${treatmentTitle} is assessed and planned by Dr. Bangalee, and may be performed by a trained aesthetic practitioner under his clinic protocols.`;
}

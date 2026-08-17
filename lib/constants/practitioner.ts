/**
 * Dr. Bangalee's regulatory identifiers, taken from his practice card.
 *
 * Two different numbers appear on that card and they are NOT interchangeable:
 *
 *   MP No. 0558605      HPCSA registration — proves he is a registered
 *                       medical practitioner. This is the one a patient (or
 *                       Google's quality raters) can verify, and the one that
 *                       belongs on the website.
 *
 *   Practice No. 0227447  BHF practice number, used for medical-aid billing.
 *                       Not a registration credential; publishing it as one
 *                       would be misleading.
 */

/** HPCSA registration number, displayed as "HPCSA Reg. MP 0558605". */
export const HPCSA_NUMBER = "MP 0558605";

/** Full credential line for footers and disclaimers. */
export const HPCSA_LINE = `HPCSA Reg. ${HPCSA_NUMBER}`;

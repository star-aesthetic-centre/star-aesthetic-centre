/**
 * The clinic's contact numbers, in one place.
 *
 * These were hardcoded across nine files, all pointing at 076 977 0386 —
 * Nakita's personal number. Patient traffic from wa.me links sitewide landed
 * on a staff member's private phone. One constant now drives every one of
 * them, so a number change is a single edit and cannot go stale in a corner
 * of the site nobody remembers.
 */

/** Official clinic WhatsApp, digits only for wa.me links. */
export const WHATSAPP_DIGITS = "27601230000";

/** Human-readable form of the same number. */
export const WHATSAPP_DISPLAY = "+27 (0)60 123 0000";

/** Rooms landline. */
export const LANDLINE_DIGITS = "27315731325";
export const LANDLINE_DISPLAY = "031 573 1325";

/** Ready-made wa.me link; pass a message to prefill the chat. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

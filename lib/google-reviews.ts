/**
 * Google Business Profile rating — single source of truth.
 *
 * The practice holds a verified Google Business Profile. Displaying the rating
 * with its source and count is far stronger than an unattributed "5★ Patient
 * Rating", and it is independently checkable by anyone.
 *
 * UPDATE THE COUNT when it changes — an out-of-date number is the same
 * problem as an unsourced one.
 *
 * Note on structured data: Google's guidelines do not permit a business to mark
 * up its own aggregateRating from a third-party source. So this is displayed
 * and linked as plain text, not injected into the LocalBusiness schema. The
 * stars will show in Google's own knowledge panel regardless.
 */
export const GOOGLE_REVIEWS = {
  rating: "5.0",
  count: 21,
  /** Resolves to the Business Profile. Replace with the exact share link from
   *  Google Business Profile → Share → Copy link when available. */
  url: "https://www.google.com/maps/search/?api=1&query=Star+Aesthetic+Centre+Durban+North",
} as const;

/** "5.0 ★ · 21 Google reviews" */
export function googleRatingLabel(): string {
  return `${GOOGLE_REVIEWS.rating} ★ · ${GOOGLE_REVIEWS.count} Google reviews`;
}

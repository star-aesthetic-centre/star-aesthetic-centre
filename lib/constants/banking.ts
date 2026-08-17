/**
 * Star Aesthetic Centre — banking details for EFT / direct transfer.
 * Confirmed by Dr. Bangalee — 2026-04-08
 */
export const BANK_DETAILS = {
  bank:        "FNB",
  accountName: "Dr R Bangalee",
  accountNo:   "62880669331",
  branchCode:  "220426",
  accountType: "Cheque Account",
  reference:   "Your name",
  // Proof-of-payment address. Forwards to medgp.info@gmail.com internally —
  // customers should only ever see the clinic domain, and a Gmail address on
  // a payment instruction reads as a phishing risk to anyone paying attention.
  //
  // .site is DELIBERATE, not a leftover. The mailbox lives on that domain and
  // forwards; info@staraesthetic.co.za receives nothing. A 2026-08-16 external
  // audit recommended switching to .co.za for consistency with the site domain
  // — declined and confirmed by the practice on 2026-08-17, because the change
  // would point customers at an address that does not receive mail.
  email:       "info@staraesthetic.site",
} as const;

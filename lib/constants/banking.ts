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
  email:       "info@staraesthetic.site",
} as const;

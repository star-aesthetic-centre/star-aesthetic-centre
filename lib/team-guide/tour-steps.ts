export type TourStep = {
  id: string;
  title: string;
  whoClicks: string;
  openUrl: string;
  openLabel: string;
  nikiAction: string;
  script: string;
  checkpoint: string;
};

export const TOUR_INTRO = {
  title: "Team website walkthrough",
  subtitle:
    "For Nakita, Dr Bangalee, and anyone learning the new Star Aesthetic platform.",
};

/** Plain-language explanation shown at top of /team-guide */
export const HOW_IT_WORKS = {
  whatIsTheDoc:
    "The “doc” is this page on your website — not a hidden file. Bookmark it: /team-guide",
  whoDoesWhat: [
    {
      role: "Person at the computer (Nakita or you)",
      does: "Opens each page using the blue buttons below. That is the “tour” moving forward.",
    },
    {
      role: "Niki (gold button, bottom-right)",
      does: "Voice assistant. On each step, click Niki → Start voice chat. She answers questions about the page you are on. Visitors will use her the same way.",
    },
    {
      role: "Optional: read the script aloud",
      does: "Each step has suggested words. You can read them, paraphrase them, or ignore them and only use Niki for Q&A.",
    },
  ],
  notYet:
    "Niki cannot yet click links for you automatically. That is a future upgrade. Today: human clicks, Niki talks.",
};

export const TOUR_STEPS: TourStep[] = [
  {
    id: "start",
    title: "1. Start here — homepage",
    whoClicks: "Open the homepage so everyone sees the same starting point.",
    openUrl: "/",
    openLabel: "Open homepage",
    nikiAction:
      "Click the gold Niki button (bottom-right) → Start voice chat. Ask: “What can this website do for Star Aesthetic?”",
    script:
      "Welcome. This is the new Star Aesthetic website — not just a brochure. It sells medical-grade skincare, takes bookings, captures leads, and never closes. Over the next few minutes we will visit each main area. Stop me anytime with questions.",
    checkpoint: "Any questions before we look at treatments?",
  },
  {
    id: "treatments",
    title: "2. Treatments",
    whoClicks: "Open Treatments, then pick any treatment (e.g. Botox or Dermapen).",
    openUrl: "/treatments",
    openLabel: "Open Treatments",
    nikiAction:
      "Stay on a treatment page. Ask Niki: “Explain this treatment in simple terms” or “What products go with this?”",
    script:
      "Treatments are organised the way patients think — Face, Skin, Body. Each page educates before it sells: what it is, downtime, pricing from. Someone researching at night should feel informed. When they are ready, they book, contact us, or shop the products Dr Bangalee recommends.",
    checkpoint: "Questions about treatment pages or booking?",
  },
  {
    id: "shop",
    title: "3. Online shop — brands & products",
    whoClicks: "Open Shop → choose a brand → open one product.",
    openUrl: "/shop",
    openLabel: "Open Shop",
    nikiAction:
      "On a product page, ask Niki about that product — ingredients, who it suits, how to use it.",
    script:
      "The shop is medical-grade skincare only — brands you already use in clinic. Every product has descriptions, images, and Rand pricing. Add to cart starts the purchase journey. Star Light Rewards gives five percent back after EFT clears.",
    checkpoint: "Questions about brands, pricing, or rewards?",
  },
  {
    id: "checkout",
    title: "4. Cart & checkout (no bank details here)",
    whoClicks:
      "Add a test product to cart (use test email if you like). Open Cart, then Checkout. You do not need to pay.",
    openUrl: "/checkout",
    openLabel: "Open Checkout",
    nikiAction:
      "You can skip Niki here or ask: “What happens after I place an order?”",
    script:
      "Checkout collects delivery details once. Banking details are not shown here on purpose — they appear on the order confirmation page and in the confirmation email, with the order reference. The button says Place order — not paid until Nakita confirms EFT in admin.",
    checkpoint: "Questions about EFT, shipping, or confirmation emails?",
  },
  {
    id: "funnel",
    title: "5. Funnels (optional upsell after add to cart)",
    whoClicks:
      "In Admin → Products → edit a product → Upsell Funnel tab. Or add a product that already has a funnel enabled, add to cart, and see the /buy/... steps.",
    openUrl: "/admin/products",
    openLabel: "Open Admin → Products",
    nikiAction:
      "Explain verbally: funnels offer the next 1–2 products in a routine, often with a small discount.",
    script:
      "A funnel is a gentle routine upsell — not a loud special offer. After someone adds a cleanser, we can suggest serum then SPF. In admin you use Suggest routine, review, turn the funnel On, and save. Shoppers can skip and still checkout.",
    checkpoint: "Questions about funnels or discounts?",
  },
  {
    id: "niki",
    title: "6. Niki — voice consultant",
    whoClicks: "Go back to any product or treatment page.",
    openUrl: "/shop",
    openLabel: "Open Shop (then pick a product)",
    nikiAction:
      "This is the main demo: Start voice chat. Interrupt with a question. She answers, then you continue the tour.",
    script:
      "This is Niki in patient mode — smart voice chat, knows the page you are on, saves transcripts for Nakita. She educates, never diagnoses. Soon she will also navigate and add to cart during a guided tour; today she answers while you click.",
    checkpoint: "Questions about transcripts, privacy, or callbacks?",
  },
  {
    id: "admin",
    title: "7. Admin — Nakita’s command centre",
    whoClicks: "Open Admin and log in (separate tab is fine).",
    openUrl: "/admin/login",
    openLabel: "Open Admin login",
    nikiAction: "Niki is not used in admin. Walk through dashboard, Orders, Customers, Leads, Niki transcripts.",
    script:
      "Admin is where the business runs: confirm EFT orders, edit products and funnels, see customers by email, manage leads, read Niki conversations. One place instead of scattered emails.",
    checkpoint: "Questions about daily workflow or access?",
  },
];

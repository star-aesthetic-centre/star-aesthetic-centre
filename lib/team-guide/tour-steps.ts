export type TourStep = {
  id: string;
  title: string;
  /** Icon name key — mapped to lucide icon in the client */
  icon: string;
  /** One-line summary shown in sidebar */
  summary: string;
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
    'This page is your guided walkthrough — bookmark it at /team-guide. It is not a hidden file; it lives on the website.',
  whoDoesWhat: [
    {
      role: "Person presenting (Nakita or you)",
      does: 'Opens each page using the blue button in every step. That is the tour moving forward. Keep this guide open in a separate tab.',
    },
    {
      role: 'Niki — gold button, bottom-right of every page',
      does: 'Click the gold "Niki — your skin & treatment consultant" button, then tap "Start voice chat". She answers questions about the page you are on. Visitors use her the same way.',
    },
    {
      role: "Optional: read the script aloud",
      does: "Each step has suggested words for the presenter. You can read them, paraphrase them, or skip them entirely and let Niki carry the Q&A.",
    },
  ],
  notYet:
    "The presentation works best on a large screen with the Niki widget visible. Walk at a comfortable pace — the team will have questions at almost every step.",
};

export const TOUR_STEPS: TourStep[] = [
  {
    id: "start",
    title: "Homepage",
    icon: "Home",
    summary: "The first impression — what patients see",
    whoClicks:
      "Open the homepage so everyone sees the same starting point. Scroll from top to bottom so the full page is visible.",
    openUrl: "/",
    openLabel: "Open homepage",
    nikiAction:
      'Click the gold "Niki — your skin & treatment consultant" button (bottom-right) → "Start voice chat". Ask Niki: "What can this website do for Star Aesthetic Centre?"',
    script:
      "Welcome. This is the new Star Aesthetic website — not just a brochure. It sells medical-grade skincare, takes bookings, captures leads, and never closes. Over the next few minutes we will visit each main area. Stop me anytime with questions.",
    checkpoint: "Any first impressions or questions before we look at treatments?",
  },
  {
    id: "treatments",
    title: "Treatments",
    icon: "Stethoscope",
    summary: "How patients research and book",
    whoClicks:
      "Open Treatments, browse the categories (Face, Skin, Body), then open any individual treatment — Botox or Dermapen work well for demo purposes.",
    openUrl: "/treatments",
    openLabel: "Open Treatments",
    nikiAction:
      'On a treatment page, click Niki → "Start voice chat". Ask: "Explain this treatment in simple terms" or "What products go with this?"',
    script:
      "Treatments are organised the way patients think — Face, Skin, Body. Each page educates before it sells: what it is, downtime, pricing from. Someone researching on a Sunday evening should feel informed enough to book. When they are ready, they book online, contact us, or shop the products Dr Bangalee recommends.",
    checkpoint: "Questions about treatment pages, how they are edited, or the booking link?",
  },
  {
    id: "shop",
    title: "Shop — brands & products",
    icon: "ShoppingBag",
    summary: "Medical-grade skincare, organised by brand",
    whoClicks:
      "Open the Shop page. Scroll through the brand showcase and the brand comparison table, then click into a brand and open one product.",
    openUrl: "/shop",
    openLabel: "Open Shop",
    nikiAction:
      'On a product page, click Niki → "Start voice chat". Ask about that product — ingredients, who it suits, how to use it.',
    script:
      "The shop carries the six brands you already recommend in clinic — Dermaceutic, Heliocare, ISDIN, Mesoestetic, NeoStrata, and SkinCeuticals. The brand showcase and comparison table at the top help patients understand which brand suits their skin before they start browsing. Every product has a full description, Rand pricing, and fits directly into a Star Light Rewards routine.",
    checkpoint: "Questions about brands, pricing, the comparison table, or rewards?",
  },
  {
    id: "skin-assessment-niki",
    title: "Skin Assessment with Niki",
    icon: "Sparkles",
    summary: "Voice AI recommends the right brand and products",
    whoClicks:
      'Go to the Shop page. At the very top you will see the Skin Assessment hero section. Click the "Start My Skin Assessment" button — this opens Niki in assessment mode.',
    openUrl: "/shop",
    openLabel: "Open Shop (assessment is at the top)",
    nikiAction:
      'Click "Start My Skin Assessment" on the shop hero — or open the Niki widget and tap "Start skin assessment". Niki will conduct the full 7-stage voice assessment live. Let her run — she asks about concerns, age, skin type, skin tone, lifestyle, and medications, then delivers a personalised brand and product recommendation.',
    script:
      "This is one of the most powerful features on the site. Instead of a patient guessing which brand suits them, Niki walks them through a seven-stage voice conversation — about three minutes — and at the end recommends exactly which brand and which products are right for their skin. She knows to recommend Heliocare SPF for darker skin tones, she flags safety concerns like Roaccutane, and she can refer cystic acne cases directly to Dr Bangalee for a consultation. The recommendation appears verbally, and Niki can arrange for Nakita to follow up on WhatsApp with the product list in writing.",
    checkpoint:
      "Let the team try the assessment themselves. Any questions about how Niki routes recommendations or handles safety edge cases?",
  },
  {
    id: "skin-assessment-form",
    title: "Skin Assessment — written form",
    icon: "ClipboardList",
    summary: "13-question form lead capture with skin score",
    whoClicks:
      "Open the standalone written skin assessment page. This is a separate 13-question form — different from the Niki voice assessment. It ends with a personalised skin health score and captures the patient's contact details as a lead.",
    openUrl: "/skin-assessment",
    openLabel: "Open written skin assessment",
    nikiAction:
      "Niki is not part of this form — it is self-completed. You can open Niki for Q&A about the assessment process if needed.",
    script:
      "For patients who prefer to read and click rather than speak, the written assessment covers concerns, lifestyle habits, SPF use, sleep, and diet — thirteen steps in total. At the end it calculates a Skin Health Score and shows personalised recommendations. Crucially, it captures name, email, and phone, which flow automatically into Leads in admin for Nakita to follow up.",
    checkpoint:
      "Questions about where leads from the assessment appear, or how Nakita follows up with them?",
  },
  {
    id: "checkout",
    title: "Cart & checkout",
    icon: "CreditCard",
    summary: "EFT order flow — no card required",
    whoClicks:
      "Add any product to cart, open the cart, then proceed to checkout. You do not need to complete payment — just show the flow.",
    openUrl: "/checkout",
    openLabel: "Open Checkout",
    nikiAction:
      'Skip Niki in checkout, or ask: "What happens after I place an order?" to hear the EFT confirmation flow explained.',
    script:
      "Checkout is EFT only — no card required, no payment gateway fees. The patient places the order, banking details appear on the order confirmation page and in the confirmation email alongside the order reference. Nothing moves until Nakita confirms EFT received in admin and marks the order dispatched. Free delivery on orders over 800 Rand.",
    checkpoint:
      "Questions about EFT, dispatch process, confirmation emails, or order reference numbers?",
  },
  {
    id: "funnel",
    title: "Product funnels",
    icon: "TrendingUp",
    summary: "Gentle routine upsell to increase order value",
    whoClicks:
      "Add a product that has a funnel enabled and watch the post-add-to-cart steps. Or open Admin → Products → edit a product → Upsell Funnel tab to show the setup.",
    openUrl: "/admin/products",
    openLabel: "Open Admin → Products",
    nikiAction:
      "Explain funnels verbally — Niki is not typically used during checkout. The concept: after someone adds a cleanser, we can suggest the matching serum and SPF in the same visit.",
    script:
      "A funnel is a gentle routine completion — not a loud special offer. After someone adds a cleanser, we offer the serum, then the SPF. In admin, you use Suggest routine, review the suggestion, then turn the funnel on per product. Shoppers can skip at any step and checkout normally. Clinically, outcomes improve when patients use a full protocol rather than one product alone.",
    checkpoint: "Questions about funnels, which products to set them up on first, or discounts?",
  },
  {
    id: "niki",
    title: "Niki — voice consultant",
    icon: "Mic",
    summary: "The clinic's voice, available 24/7",
    whoClicks:
      "Go to any product or treatment page. This demo is about Niki herself — let the management team ask her real questions.",
    openUrl: "/shop",
    openLabel: "Open Shop (then pick a product)",
    nikiAction:
      'This is the main demo. Click the gold Niki button → "Start voice chat". Let Dr Bangalee or Nakita ask a real question about a product or treatment. She answers, they interrupt, she adapts. Show how she knows what page she is on.',
    script:
      "This is Niki in patient mode — warm voice chat, knows the page you are on, saves transcripts for Nakita to review in admin. She educates, she never diagnoses. She is available at two in the morning when someone is researching treatments from bed. When the clinic opens, Nakita sees the conversation in admin and follows up. That is the loop: Niki captures the interest, the team closes it.",
    checkpoint: "Questions about transcripts, privacy, what Niki can and cannot do, or callbacks?",
  },
  {
    id: "admin",
    title: "Admin — Nakita's command centre",
    icon: "LayoutDashboard",
    summary: "Orders, customers, leads, products — one place",
    whoClicks:
      "Open Admin and log in. Walk through the dashboard — Orders, Customers, Leads, and the Niki transcripts section.",
    openUrl: "/admin/login",
    openLabel: "Open Admin login",
    nikiAction:
      "Niki is not used inside admin. Walk through the key sections verbally: dashboard numbers, confirming EFT orders, reviewing leads from the skin assessment, reading Niki conversation transcripts.",
    script:
      "Admin is where the business runs day-to-day. Confirm EFT orders and mark them dispatched. Edit products, descriptions, and funnels. See every customer by email — their orders, bookings, rewards balance, and history together. Manage leads from skin assessments and contact forms. Read Niki conversations to see what patients are asking about. One place instead of scattered emails.",
    checkpoint: "Questions about daily workflow, what Nakita manages versus the developer, or access levels?",
  },
  {
    id: "member-dashboard",
    title: "Member dashboard",
    icon: "User",
    summary: "Patients log in to see their full profile",
    whoClicks:
      "Open the member login page. Sign in with a registered email. The dashboard loads automatically.",
    openUrl: "/member/login",
    openLabel: "Open Member login",
    nikiAction:
      'On the member dashboard, click Niki → "Start voice chat" and ask: "What can I see on my dashboard?" She can explain the rewards balance, order history, and booking history.',
    script:
      "Patients can now log in and see their own profile — product order history with every item listed, treatment bookings past and upcoming, their Star Light Rewards balance with the full earn and redeem ledger, and any gift vouchers they have purchased or received. It is the patient's relationship with Star Aesthetic in one place. No password yet — they log in with their registered email and we recognise them immediately.",
    checkpoint:
      "Questions about the member dashboard, what data it shows, or the login experience?",
  },
];

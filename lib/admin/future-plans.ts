/**
 * Star Aesthetic Centre — strategic roadmap (admin reference).
 * Concerns pillar architecture, SEO/content standards, Niki sync, and
 * competitive takeaways from Direct Aesthetics audit (June 2026).
 */

export type PlanStatus = "not_started" | "research" | "draft" | "review" | "done";

export type PlanTask = {
  id: string;
  label: string;
  status: PlanStatus;
  notes?: string;
};

export type ConcernPagePlan = {
  slug: string;
  title: string;
  treatmentSlug: string;
  treatmentPath: string;
  primaryKeywords: string[];
  concernPath: string;
  status: PlanStatus;
};

export type ConcernCategoryPlan = {
  slug: string;
  name: string;
  hubPath: string;
  pages: ConcernPagePlan[];
};

export const FUTURE_PLANS_META = {
  title: "Future Plans",
  subtitle:
    "Concerns pillar content, SEO expansion, Dr Bangalee authority, and Niki knowledge sync. Reference only — nothing here is live yet.",
  lastUpdated: "2026-06-08",
  competitorReference: "https://www.direct-aesthetics.com/concerns/fine-lines-wrinkles-treatments/",
};

/** Three hubs × four concern pages — mirrors treatment card categories. */
export const CONCERN_CATEGORIES: ConcernCategoryPlan[] = [
  {
    slug: "face",
    name: "Face",
    hubPath: "/concerns/face",
    pages: [
      {
        slug: "fine-lines-wrinkles-durban",
        title: "Fine Lines & Wrinkles",
        treatmentSlug: "anti-wrinkle-treatment",
        treatmentPath: "/treatments/face/anti-wrinkle-treatment",
        concernPath: "/concerns/face/fine-lines-wrinkles-durban",
        primaryKeywords: [
          "anti wrinkle treatment Durban",
          "Botox Durban North",
          "forehead lines treatment",
          "crow's feet treatment KZN",
        ],
        status: "not_started",
      },
      {
        slug: "lip-enhancement-durban",
        title: "Lip Enhancement & Lip Lines",
        treatmentSlug: "lip-filler",
        treatmentPath: "/treatments/face/lip-filler",
        concernPath: "/concerns/face/lip-enhancement-durban",
        primaryKeywords: ["lip filler Durban", "lip lines treatment", "natural lip enhancement"],
        status: "not_started",
      },
      {
        slug: "jawline-chin-contouring-durban",
        title: "Jawline & Chin Contouring",
        treatmentSlug: "jaw-amp-chin-contouring",
        treatmentPath: "/treatments/face/jaw-amp-chin-contouring",
        concernPath: "/concerns/face/jawline-chin-contouring-durban",
        primaryKeywords: ["jaw filler Durban", "chin contouring", "weak chin treatment"],
        status: "not_started",
      },
      {
        slug: "skin-texture-microneedling-durban",
        title: "Skin Texture, Scars & Microneedling",
        treatmentSlug: "dermapen-microneedling",
        treatmentPath: "/treatments/face/dermapen-microneedling",
        concernPath: "/concerns/face/skin-texture-microneedling-durban",
        primaryKeywords: ["microneedling Durban", "acne scarring treatment", "Dermapen Durban North"],
        status: "not_started",
      },
    ],
  },
  {
    slug: "skin",
    name: "Skin",
    hubPath: "/concerns/skin",
    pages: [
      {
        slug: "chemical-skin-peels-durban",
        title: "Chemical Skin Peels",
        treatmentSlug: "skin-peel",
        treatmentPath: "/treatments/skin/skin-peel",
        concernPath: "/concerns/skin/chemical-skin-peels-durban",
        primaryKeywords: ["chemical peel Durban", "skin peel rejuvenation", "glycolic peel KZN"],
        status: "not_started",
      },
      {
        slug: "pigmentation-melasma-durban",
        title: "Pigmentation & Melasma",
        treatmentSlug: "pigmentation-treatment",
        treatmentPath: "/treatments/skin/pigmentation-treatment",
        concernPath: "/concerns/skin/pigmentation-melasma-durban",
        primaryKeywords: ["melasma treatment Durban", "hyperpigmentation", "dark spots treatment"],
        status: "not_started",
      },
      {
        slug: "acne-adult-teen-durban",
        title: "Acne & Acne Scarring",
        treatmentSlug: "acne",
        treatmentPath: "/treatments/skin/acne",
        concernPath: "/concerns/skin/acne-adult-teen-durban",
        primaryKeywords: ["acne treatment Durban", "adult acne", "hormonal acne KZN"],
        status: "not_started",
      },
      {
        slug: "excessive-sweating-hyperhidrosis-durban",
        title: "Excessive Sweating (Hyperhidrosis)",
        treatmentSlug: "excessive-sweating",
        treatmentPath: "/treatments/skin/excessive-sweating",
        concernPath: "/concerns/skin/excessive-sweating-hyperhidrosis-durban",
        primaryKeywords: ["hyperhidrosis treatment Durban", "excessive sweating Botox", "underarm sweating"],
        status: "not_started",
      },
    ],
  },
  {
    slug: "body-wellness",
    name: "Body & Wellness",
    hubPath: "/concerns/body-wellness",
    pages: [
      {
        slug: "body-contouring-durban",
        title: "Body Contouring & Fat Reduction",
        treatmentSlug: "body-contouring",
        treatmentPath: "/treatments/body-wellness/body-contouring",
        concernPath: "/concerns/body-wellness/body-contouring-durban",
        primaryKeywords: ["body contouring Durban", "non-surgical fat reduction"],
        status: "not_started",
      },
      {
        slug: "medical-weight-loss-durban",
        title: "Medical Weight Loss (Medi-Lean)",
        treatmentSlug: "medi-lean",
        treatmentPath: "/treatments/body-wellness/medi-lean",
        concernPath: "/concerns/body-wellness/medical-weight-loss-durban",
        primaryKeywords: ["medical weight loss Durban", "Medi-Lean programme"],
        status: "not_started",
      },
      {
        slug: "varicose-veins-durban",
        title: "Varicose Veins & Sclerotherapy",
        treatmentSlug: "varicose-veins",
        treatmentPath: "/treatments/body-wellness/varicose-veins",
        concernPath: "/concerns/body-wellness/varicose-veins-durban",
        primaryKeywords: ["varicose vein treatment Durban", "sclerotherapy KZN"],
        status: "not_started",
      },
      {
        slug: "vitamin-iv-therapy-durban",
        title: "Vitamin IV Therapy & Wellness Drips",
        treatmentSlug: "vitamin-drips",
        treatmentPath: "/treatments/body-wellness/vitamin-drips",
        concernPath: "/concerns/body-wellness/vitamin-iv-therapy-durban",
        primaryKeywords: ["IV vitamin therapy Durban", "vitamin drip clinic"],
        status: "not_started",
      },
    ],
  },
];

export const SITE_ARCHITECTURE_LAYERS = [
  {
    layer: "Treatment pages (existing)",
    pathPattern: "/treatments/{category}/{slug}",
    purpose: "Convert — book consultation, pricing, process, Dr Bangalee, product picks",
    audience: "Patient ready to enquire or book",
    cannibalization: "Do NOT duplicate full treatment copy on concern pages",
  },
  {
    layer: "Concern hub pages (new)",
    pathPattern: "/concerns/{category}",
    purpose: "Orient — A–Z list of concerns in category, links to pillar pages",
    audience: "Patient researching a problem, not yet sure of treatment name",
    cannibalization: "Hub is navigation only — thin index, no long-form duplicate",
  },
  {
    layer: "Concern pillar pages (new)",
    pathPattern: "/concerns/{category}/{concern-slug}",
    purpose: "Educate — causes, prevention, options, comparisons; cite Dr Bangalee expertise",
    audience: "Google search + AI Overviews; top-of-funnel",
    cannibalization: "Different H1/title/meta; ends with single CTA → treatment page",
  },
  {
    layer: "Learn / Skin School articles (new)",
    pathPattern: "/learn/{article-slug}",
    purpose: "Support — deep dives, cost guides, myth-busting; internal links to concerns + treatments",
    audience: "Long-tail queries; feeds topical authority",
    cannibalization: "Never target same primary keyword as treatment page",
  },
  {
    layer: "Glossary (existing)",
    pathPattern: "/glossary/{term}",
    purpose: "Definitions — ingredients, conditions, concepts; auto-linked from all content",
    audience: "AI citation + patient education",
    cannibalization: "Keep definitional; link out to concerns for “how we treat”",
  },
];

export const CANNIBALIZATION_RULES = [
  "Treatment page title: “{Treatment} in Durban North | Star Aesthetic Centre” — booking intent.",
  "Concern pillar title: “{Concern}: Causes, Treatment Options & Expert Guide | Durban” — research intent.",
  "Concern pages use patient language (“frown lines”, “smile lines”); treatment pages use service names (“Anti-Wrinkle Treatment”).",
  "One primary CTA on concern pages: “Book with Dr Bangalee” → treatment URL. No competing /book funnels.",
  "Concern pages link to treatment; treatment pages link to concern only as “Learn more about causes”.",
  "FAQ schema: concern = educational FAQs; treatment = booking/process/pricing FAQs. Do not copy verbatim.",
  "Before/after galleries live on treatment pages (conversion); concern pages use area diagrams or 1–2 credited examples max.",
];

export const DR_BANGALEE_VOICE = {
  summary:
    "Content should read as medically authoritative and aligned with Dr Bangalee’s clinical voice — not generic AI or US med-spa copy.",
  mustFeelLike: [
    "Written or clinically reviewed by a medical doctor (MB, BS), not a marketing agency.",
    "Natural-results philosophy: refreshed, not frozen; subtle, not overdone.",
    "South African context: ZAR pricing inc VAT, Durban North location, POPIA-aware.",
    "Honest about limits: what Botox cannot fix, when filler is needed, when skincare comes first.",
  ],
  workflow: [
    "Research phase: collect real patient phrases (GBP reviews, enquiry emails, Niki transcripts).",
    "Draft in team voice using research doc — clinical accuracy first.",
    "Dr Bangalee review pass before publish (even if ghost-written initially).",
    "“Medically reviewed by Dr Rajeev Bangalee, MB, BS” byline on every concern + learn article.",
    "Person schema + MedicalBusiness already on site — cross-link to /dr-rajeev-bangalee.",
  ],
  avoid: [
    "US spelling and USD pricing.",
    "“Top provider in the nation” style claims Direct Aesthetics uses.",
    "Guaranteeing results or superlative medical claims.",
    "Publishing without Dr review on YMYL health content.",
  ],
};

export const PATIENT_LANGUAGE_RESEARCH = {
  summary:
    "Use the words patients actually type and say — not internal clinic jargon. Research before writing each pillar.",
  sources: [
    "Google Search Console queries (after launch indexing window)",
    "Google Business Profile reviews mentioning treatments",
    "Admin → Leads enquiry subjects and messages",
    "Admin → Niki Calls transcripts (real patient questions)",
    "WhatsApp / email phrases Nakita and reception hear repeatedly",
    "AnswerThePublic / Also Asked for “Durban” + concern modifiers",
  ],
  deliverablePerPage: [
    "10–20 patient phrases to use in H2 questions and body copy",
    "5 synonym terms (e.g. rhytids, worry lines, 11 lines, barcode lips)",
    "3 competitor page titles we are NOT copying — only learning structure from",
    "Glossary terms to auto-link on publish",
  ],
};

export const CONTENT_TEMPLATE_PER_PILLAR = {
  h1: "Concern-led headline (not service name)",
  h2Questions: [
    "What causes {concern}?",
    "At what age does {concern} typically appear?",
    "What treatments work best for {concern}?",
    "Am I a good candidate for treatment in Durban?",
    "How much does {concern} treatment cost in Durban?",
    "What is the recovery and downtime?",
    "How does Dr Bangalee approach {concern} at Star Aesthetic Centre?",
  ],
  sections: [
    "Opening — empathise with patient concern; local trust signal",
    "Causes — bulleted list (sun, genetics, expression, hormones, etc.)",
    "Treatment options comparison table (see DIRECT_AESTHETICS_TAKEAWAYS)",
    "Why medical doctor-led care matters (E-E-A-T block)",
    "Skincare / home care between appointments (link shop products)",
    "Related concerns (internal links)",
    "Related Learn articles (when published)",
    "Single conversion block → treatment page + /book",
    "FAQ block (5–8 questions) + FAQPage schema",
  ],
};

export const COMPARISON_TABLE_IDEAS = [
  {
    name: "Dynamic vs static wrinkles",
    columns: ["Type", "Example", "Best treatment", "Result duration"],
    note: "Safer than “effectiveness by age” — medically defensible.",
  },
  {
    name: "Treatment modality comparison",
    columns: ["Option", "Best for", "Downtime", "Sessions needed", "From price (ZAR inc VAT)"],
    note: "Anti-wrinkle vs filler vs peel vs microneedling on same concern page.",
  },
  {
    name: "Treatment areas (anti-wrinkle)",
    columns: ["Area", "Typical units", "Onset", "Lasts", "Notes"],
    note: "Forehead, glabella, crow's feet — matches Direct’s depth without copying.",
  },
  {
    name: "Preventative vs corrective",
    columns: ["Stage", "What you notice", "Recommended approach", "Dr Bangalee’s typical advice"],
    note: "Soft age framing without % effectiveness claims.",
  },
];

export const DIRECT_AESTHETICS_TAKEAWAYS: PlanTask[] = [
  {
    id: "da-questions",
    label: "Question-format H2 headings (mirror real search queries)",
    status: "not_started",
  },
  {
    id: "da-bullets",
    label: "Bulleted lists for causes, candidates, aftercare, ingredients",
    status: "not_started",
  },
  {
    id: "da-tables",
    label: "Comparison tables (modality, areas, dynamic vs static — not age % gimmicks)",
    status: "not_started",
  },
  {
    id: "da-gallery",
    label: "Before/after gallery on treatment pages (POPIA consent per image)",
    status: "not_started",
  },
  {
    id: "da-linking",
    label: "Internal linking mesh: concerns ↔ treatments ↔ learn ↔ glossary",
    status: "not_started",
  },
  {
    id: "da-pricing",
    label: "Transparent ZAR pricing on-page (from-price, per unit, package notes)",
    status: "not_started",
  },
  {
    id: "da-synonyms",
    label: "Synonym stacking in copy (rhytids, worry lines, hyperhidrosis, etc.)",
    status: "not_started",
  },
  {
    id: "da-blog",
    label: "Learn / Skin School article cluster supporting each concern pillar",
    status: "not_started",
  },
  {
    id: "da-reviews",
    label: "Named practitioner E-E-A-T + GBP review quotes on key pages",
    status: "not_started",
  },
  {
    id: "da-cancellation",
    label: "Booking cancellation & late-arrival policy on Contact + FAQ schema",
    status: "not_started",
    notes: "Trust/conversion — Direct has this on Contact. Low SEO impact, high ops value.",
  },
  {
    id: "da-accessibility",
    label: "Accessibility menu widget (optional — inclusivity, not a ranking factor)",
    status: "not_started",
    notes: "Direct uses a left-side widget. Nice-to-have; not why they rank.",
  },
  {
    id: "da-trust",
    label: "“Authorized / medical-grade” trust block on shop + concern pages",
    status: "not_started",
    notes: "Direct repeats genuine-products block on every page — adapt for SA medical skincare.",
  },
];

export const NIKI_SYNC_TASKS: PlanTask[] = [
  {
    id: "niki-context",
    label: "Add concern pillar summaries to Niki page context (NikiPageContextBridge)",
    status: "not_started",
  },
  {
    id: "niki-prompt",
    label: "Update lib/niki/system-prompt.ts — distinguish educate (concern) vs book (treatment)",
    status: "not_started",
  },
  {
    id: "niki-rag",
    label: "Feed published concern + learn URLs into Niki knowledge (sitemap or manifest)",
    status: "not_started",
  },
  {
    id: "niki-voice",
    label: "Review Gemini Live / voice agent config — document any capability regressions",
    status: "research",
    notes:
      "Voice was strong at launch; recent model updates may have reduced tool use or context length. Log findings here before next Niki sprint.",
  },
  {
    id: "niki-transcripts",
    label: "Mine Admin → Niki Calls for patient phrases → patient language research doc",
    status: "not_started",
  },
];

export const IMPLEMENTATION_PHASES = [
  {
    phase: "Phase 0 — Foundation",
    timing: "Before writing any concern page",
    tasks: [
      "Finalize URL structure and add to sitemap plan",
      "Create patient language research template (one per pillar)",
      "Dr Bangalee review workflow agreed (who drafts, who approves)",
      "Cannibalization checklist printed for each new page",
      "Fix glossary inject bug on treatment pages (done 2026-06-08)",
    ],
  },
  {
    phase: "Phase 1 — Pilot (Anti-Wrinkle)",
    timing: "First concern pillar",
    tasks: [
      "Build /concerns/face hub (thin index)",
      "Build /concerns/face/fine-lines-wrinkles-durban (full template)",
      "Enhance /treatments/face/anti-wrinkle-treatment (tables, B/A gallery if consented)",
      "One supporting /learn/ article (e.g. cost guide Durban)",
      "Niki context update for anti-wrinkle cluster",
      "Measure GSC after 4–6 weeks — no cannibalization of treatment URL",
    ],
  },
  {
    phase: "Phase 2 — Face category complete",
    timing: "After pilot metrics OK",
    tasks: ["Remaining 3 face concern pages", "4 supporting learn articles", "Cross-link all face treatments"],
  },
  {
    phase: "Phase 3 — Skin + Body & Wellness",
    timing: "Roll category by category",
    tasks: ["8 remaining concern pillars", "Contact cancellation policy + FAQ", "GBP review integration"],
  },
  {
    phase: "Phase 4 — Scale & optimize",
    timing: "Ongoing",
    tasks: [
      "Accessibility widget evaluation",
      "Agent-ready product enrichment (structured data for AI shopping)",
      "Monthly Niki transcript → content gap review",
    ],
  },
];

export const STATUS_LABELS: Record<PlanStatus, string> = {
  not_started: "Not started",
  research: "Research",
  draft: "Draft",
  review: "Dr review",
  done: "Done",
};

export const STATUS_COLORS: Record<PlanStatus, string> = {
  not_started: "bg-[#F2F1EF] text-[#6B6966] border-[#E5E4E0]",
  research: "bg-amber-50 text-amber-900 border-amber-200",
  draft: "bg-blue-50 text-blue-900 border-blue-200",
  review: "bg-purple-50 text-purple-900 border-purple-200",
  done: "bg-emerald-50 text-emerald-900 border-emerald-200",
};

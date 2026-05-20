/** Spoken introduction tour for Niki on /introduction */

import { FEATURES, VISION_SECTIONS } from "./introduction-content";

export type IntroductionTourSection = {
  id: string;
  /** Short label for on-screen progress */
  title: string;
  /** Exact section name Niki must say aloud before the intro */
  announceTitle: string;
  /** Say aloud when entering a new major block (only when it changes from the previous section) */
  parentHeading?: string;
  /** One or two sentences: purpose in plain language, before the main script */
  intro: string;
  anchorId: string;
  script: string;
  checkpoint: string;
  suggestedQuestions: string[];
};

function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1");
}

export const INTRODUCTION_TOUR_META = {
  buttonLabel: "Listen with Niki",
  buttonSub: "Voice-guided introduction",
  activeLabel: "Introduction tour in progress",
};

const VISION_PARENT = "Vision and opportunity";
const FEATURES_PARENT = "Platform features";

export const INTRODUCTION_TOUR_SECTIONS: IntroductionTourSection[] = [
  {
    id: "opening",
    title: "Welcome",
    announceTitle: "Welcome",
    intro:
      "This introduction is for Dr Bangalee, Nakita, and the leadership team — a spoken walkthrough of the new platform on this page.",
    anchorId: "tour-opening",
    script:
      "I'm Niki. For five years the old website was largely a brochure. What you have now is one connected system: treatments that educate, a medical-grade shop, bookings, rewards, intelligent follow-up, and me — your voice consultant when the clinic is closed. I'll walk you through where the business is going, and what each part of the website is designed to do. Please stop me anytime with a question.",
    checkpoint:
      "Before we move on — do you have any questions about what this platform is, or who this introduction is for?",
    suggestedQuestions: [
      "Who is this introduction for?",
      "What changed from the old website?",
      "Does the clinic still need reception for orders?",
    ],
  },
  ...buildVisionTourSections(),
  {
    id: "features-intro",
    title: "Features overview",
    announceTitle: "Platform features — overview",
    parentHeading: FEATURES_PARENT,
    intro:
      "Everything below on this page is already live on the new website. I'll explain eleven features one at a time, in plain language.",
    anchorId: "tour-features",
    script:
      "The features are: treatments, the online shop, funnels, the skin assessment survey, appointment booking, Star Light Rewards, gift vouchers, me — Niki, the admin dashboard and CRM, cart recovery, and editable pages. Each one has a specific job for the clinic and for growth. We'll take them slowly, one by one.",
    checkpoint:
      "Before we start the first feature — any questions about the list, or are you ready to continue?",
    suggestedQuestions: [
      "Are all features turned on already?",
      "Which feature should Nakita learn first?",
    ],
  },
  ...buildFeatureTourSections(),
  {
    id: "conclusion",
    title: "Conclusion",
    announceTitle: "Conclusion",
    parentHeading: "Closing",
    intro: "We're at the end of the platform introduction.",
    anchorId: "tour-conclusion",
    script:
      "Star Aesthetic Centre now has a digital platform worthy of the clinic you have built in Durban North. Treatments educate. The shop sells what you believe in. Bookings and assessments capture demand. Rewards and vouchers build loyalty. I carry your voice after hours. Admin gives Nakita control. The five-year vision is lived through every order confirmed, every lead followed up, and every patient who buys from you because it was easier and they trusted the source. Welcome to the new Star Aesthetic Centre online.",
    checkpoint:
      "That completes the introduction. Is there anything else you'd like me to explain about the platform?",
    suggestedQuestions: [
      "What are the next steps for the team?",
      "How do we train staff on admin?",
      "Can patients use this today?",
    ],
  },
];

function buildVisionTourSections(): IntroductionTourSection[] {
  const visionScripts: Record<
    string,
    { intro: string; script: string; checkpoint: string; suggestedQuestions: string[] }
  > = {
    "five-year": {
      intro:
        "This section explains where Star Aesthetic is headed over the next five years — the clinic you already have, plus a stronger online skincare business.",
      script:
        "Our ambition is deliberate, not vague. Years one and two: the shop and booking engine run reliably — EFT orders, Star Light Rewards, leads, and one admin dashboard for Nakita. Years three and four: treatment and product journeys link together — post-treatment home care and campaigns driven by what patients actually buy. Year five and beyond: Star Aesthetic becomes a household name in KwaZulu-Natal — synonymous with Dr Bangalee's clinical standards, and skincare people reorder because they trust you, not because they found a random discount online.",
      checkpoint: "Any questions about the five-year plan or the timeline?",
      suggestedQuestions: [
        "What should we prioritise in year one?",
        "Who runs the admin day to day?",
        "Is this only for Durban patients?",
      ],
    },
    "household-brand": {
      intro:
        "Here we talk about brand — not logos or adverts, but what patients say about you when you're not in the room.",
      script:
        "A household brand is when people say: I get my Botox at Star Aesthetic, that's where I buy my Heliocare, Dr Bangalee's team actually follow up. The website supports that by being consistent, medical, and human. Rewards and gift vouchers make Star Aesthetic the default place to buy — not a last resort after Google. And I extend that same warm, knowledgeable voice online — never pushy — the trust patients feel in the chair, available when the clinic is closed.",
      checkpoint: "Questions about brand positioning or how the website supports it?",
      suggestedQuestions: [
        "How is this different from Instagram marketing?",
        "Can we change homepage messaging ourselves?",
      ],
    },
    competitors: {
      intro:
        "This section looks at who patients compare you to — and why the platform is built to win against each type.",
      script:
        "Three types of competitor. Other aesthetic clinics often have weak online shops — you sell the same brands you use in treatment rooms, with doctor-led credibility. Online pharmacies sell skincare without consultation context — you sell protocol, pairing, and follow-up, plus Star Light Rewards that bring people back to you. Discount marketplaces compete on price alone — you compete on trust, authentic stock, and relationship. The goal is not to be the cheapest. It is to be the most trusted place to buy what you already recommend.",
      checkpoint: "Any questions about competitors or how we position the clinic online?",
      suggestedQuestions: [
        "What if patients still buy on Takealot?",
        "Do we match competitor prices?",
      ],
    },
    "digital-opportunity": {
      intro:
        "This section is about money left on the table — skincare and repeat business that currently goes elsewhere after a consultation.",
      script:
        "Every tube of SPF or serum bought elsewhere after a visit is margin and loyalty lost. This platform recovers that through online product sales, repeat purchase via Star Light Rewards, gently higher spend per order through funnels that complete routines, leads and bookings from skin assessment and contact forms, and cart recovery when someone almost checks out but leaves. The old site showed who you are. This one sells, books, remembers, and follows up.",
      checkpoint:
        "Questions about revenue, leads, or recovery — before we go through each feature in detail?",
      suggestedQuestions: [
        "How do we measure success in year one?",
        "What is cart abandonment recovery?",
      ],
    },
  };

  return VISION_SECTIONS.map((block) => {
    const custom = visionScripts[block.id];
    return {
      id: block.id,
      title: block.title,
      announceTitle: block.title,
      parentHeading: VISION_PARENT,
      intro: custom?.intro ?? stripBold(block.content[0] ?? ""),
      anchorId: `tour-${block.id}`,
      script: custom?.script ?? stripBold(block.content.join(" ")),
      checkpoint: custom?.checkpoint ?? `Any questions about ${block.title}?`,
      suggestedQuestions: custom?.suggestedQuestions ?? [`Tell me more about ${block.title}.`],
    };
  });
}

function buildFeatureTourSections(): IntroductionTourSection[] {
  const featureScripts: Record<
    string,
    { intro: string; script: string; checkpoint: string; suggestedQuestions: string[] }
  > = {
    treatments: {
      intro:
        "Treatments — education before expectation. Most patients research at night or on weekends; these pages should inform them, not overwhelm them.",
      script:
        "The catalogue is organised the way patients think — Face, Skin, Body — with clear pages for Botox, fillers, peels, microneedling, and more. Each page explains what it is, who it suits, downtime, and pricing from. Recommended products can be linked so in-clinic and online advice stay aligned. There are clear paths to book a consultation or contact the clinic.",
      checkpoint: "Questions about treatment pages or how they link to booking?",
      suggestedQuestions: [
        "Can we edit treatment copy ourselves?",
        "How do patients book from a treatment page?",
      ],
    },
    shop: {
      intro:
        "Products and e-commerce — medical-grade skincare sold properly, from you, not from a faceless retailer.",
      script:
        "A complete shop for Dermaceutic, Heliocare, ISDIN, Mesoestetic, NeoStrata, SkinCeuticals, and more — with images, descriptions, and Rand pricing including VAT. Checkout is by EFT: the patient places the order, banking details appear on the confirmation page and in email, and Nakita confirms payment in admin before dispatch. Free delivery on orders over eight hundred Rand.",
      checkpoint: "Questions about the shop, EFT, or delivery?",
      suggestedQuestions: [
        "Why are bank details not on checkout?",
        "When does Nakita dispatch?",
      ],
    },
    funnels: {
      intro:
        "Post-purchase funnels. The purpose is to gently increase how much each patient spends in one order — what online shops often call basket size. In plain terms: when someone buys a cleanser, we can politely suggest the matching serum and SPF in the same visit, so they leave with a complete routine instead of one item alone. It is subtle, not a loud special offer.",
      script:
        "After certain products are added to cart, the site can offer one or two logical next steps in their routine — often at a small bundle discount. Clinically, outcomes improve when patients use a full protocol. In admin, you use Suggest routine, review the suggestions, then turn the funnel on per product. Shoppers can always skip and checkout normally.",
      checkpoint: "Questions about funnels, basket size, or how to set them up in admin?",
      suggestedQuestions: [
        "What does basket size mean?",
        "Which products should have funnels first?",
        "Can shoppers skip the upsell?",
      ],
    },
    "skin-assessment": {
      intro:
        "The skincare survey — skin assessment. This turns curiosity into qualified leads for Nakita and context for Dr Bangalee before a consultation.",
      script:
        "An interactive questionnaire on concerns and habits, ending with contact details and a personalised summary. It captures people not ready to book yet but serious about their skin. Name, email, and answers save to Leads in admin — not lost in a generic inbox.",
      checkpoint: "Questions about the skin assessment or leads?",
      suggestedQuestions: [
        "Where do assessment results appear?",
        "Can we change the questions?",
      ],
    },
    booking: {
      intro:
        "Appointment booking — consultations booked online and stored in one place alongside shop and rewards history.",
      script:
        "Patients choose treatment, date, and available time slot, with their details captured in one flow. That reduces phone tag, captures after-hours demand, and ties every booking to the same customer profile as shop orders.",
      checkpoint: "Questions about online booking or availability?",
      suggestedQuestions: [
        "Who manages the calendar?",
        "Do bookings sync to email?",
      ],
    },
    rewards: {
      intro:
        "Star Light Rewards — five percent back as a reason to buy from Star Aesthetic again, not from a generic online store.",
      script:
        "On qualifying shop purchases, after EFT clears, patients earn five percent back in Star Lights. One Star Light equals one Rand — so forty Rand spent earns two Star Lights, worth two Rand off a future order. Balance is visible online and redeemable at checkout. Especially valuable on repeat items like SPF, cleansers, and serums.",
      checkpoint: "Questions about Star Lights, earning, or redemption?",
      suggestedQuestions: [
        "When do Star Lights appear on the account?",
        "Can rewards be used with vouchers?",
      ],
    },
    vouchers: {
      intro:
        "Gift vouchers — gifts that bring new patients and revenue without cutting your standard prices.",
      script:
        "Purchasable in set amounts, paid by EFT, delivered by email, and redeemable at checkout against shop purchases. Useful for seasons, referrals, and introducing someone to the brand.",
      checkpoint: "Questions about gift vouchers?",
      suggestedQuestions: [
        "How does the recipient redeem a voucher?",
        "When is the voucher code sent?",
      ],
    },
    niki: {
      intro:
        "Niki — the smart voice assistant. That's me. I'm the clinic's voice online when reception is closed.",
      script:
        "The gold button bottom-right on the site. On product and treatment pages I know what the visitor is viewing and answer in warm, natural speech. I educate — I do not diagnose. Conversations can be saved with transcripts in admin for Nakita to review. On this introduction page, I can walk you through the platform exactly as we're doing now.",
      checkpoint: "Questions about how I work for patients, or transcripts in admin?",
      suggestedQuestions: [
        "Can patients use Niki after hours?",
        "Are conversations private?",
      ],
    },
    crm: {
      intro:
        "Customers, leads, and admin — Nakita's command centre. One place instead of scattered emails and spreadsheets.",
      script:
        "Customers: one profile per email — shop orders, bookings, rewards, and history together. Leads: enquiries, skin assessments, and imports. Orders: confirm EFT and dispatch. Plus products, editable pages, and Niki transcripts. The dashboard shows revenue, orders, abandoned carts, and recent activity.",
      checkpoint: "Questions about admin, customers, or leads?",
      suggestedQuestions: [
        "How do we log in to admin?",
        "Can we import old enquiry emails?",
      ],
    },
    abandonment: {
      intro:
        "Cart abandonment recovery — following up when someone almost bought but didn't finish checkout.",
      script:
        "If someone enters email and phone at checkout but does not place the order, the system can send a timed WhatsApp or email reminder with a link to restore their cart. Many online sales are recovered from people who were simply interrupted — not from brand-new visitors alone.",
      checkpoint: "Questions about cart recovery messages?",
      suggestedQuestions: [
        "When is the reminder sent?",
        "Can we turn recovery off?",
      ],
    },
    content: {
      intro:
        "Editable pages and trust content — stay current without calling a developer for every small copy change.",
      script:
        "In admin, Nakita can edit key pages such as Homepage and Contact. There are dedicated pages for Dr Bangalee, legal policies, shipping, and contact. Contact form submissions flow into Leads automatically.",
      checkpoint: "Questions about editing pages or contact forms?",
      suggestedQuestions: [
        "Which pages can we edit?",
        "Do contact forms go to email as well?",
      ],
    },
  };

  return FEATURES.map((f, index) => {
    const custom = featureScripts[f.id];
    const featureNumber = index + 1;
    return {
      id: `feature-${f.id}`,
      title: f.title,
      announceTitle: `Feature ${featureNumber}: ${f.title}`,
      parentHeading: FEATURES_PARENT,
      intro: custom?.intro ?? stripBold(f.tagline),
      anchorId: `feature-${f.id}`,
      script: custom?.script ?? stripBold(`${f.whatItIs} ${f.whyItMatters}`),
      checkpoint: custom?.checkpoint ?? `Any questions about ${f.title}?`,
      suggestedQuestions: custom?.suggestedQuestions ?? [
        `What is ${f.title} for?`,
        `How does ${f.title} help the clinic?`,
      ],
    };
  });
}

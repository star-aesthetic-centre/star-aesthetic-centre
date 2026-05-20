export const INTRODUCTION_META = {
  title: "Introduction",
  subtitle: "The new Star Aesthetic Centre platform — vision, opportunity, and every feature explained.",
  audience: "For Dr Rajeev Bangalee, Nakita, and our leadership team",
};

export const OPENING = {
  headline: "A clinic that never closes. A brand built for the next five years.",
  paragraphs: [
    "For five years, Star Aesthetic Centre had a website. Patients found you. The clinic grew. But that site was largely a brochure — it showed who you are without fully capturing what you sell, who enquires, or how much revenue leaves the building when someone buys skincare elsewhere.",
    "What you have now is different. It is one connected platform: treatments that educate, a medical-grade shop, bookings, rewards, intelligent follow-up, and Niki — your voice consultant who can explain products and treatments in plain language, day or night.",
    "This page is your introduction to that platform: where we are going, who we stand beside in the market, and what each part of the website is designed to do for the clinic and for growth.",
  ],
};

export const VISION_SECTIONS = [
  {
    id: "five-year",
    title: "The five-year plan",
    content: [
      "Our ambition is deliberate, not vague. Over the next five years we build Star Aesthetic into two things at once: the clinic patients already trust in Durban North, and a recognised **online destination for medical-grade skincare** — with repeat purchase, loyalty, and data that tells us what people want before they walk through the door.",
      "**Years 1–2:** The shop and booking engine run reliably. EFT orders, Star Light Rewards, and lead capture become habit. Nakita and the team work from one admin dashboard — orders, customers, enquiries, Niki conversations.",
      "**Years 3–4:** Treatment and product journeys link together — post-treatment home care, packaged routines, and campaigns driven by what patients actually buy and ask about.",
      "**Year 5 and beyond:** Star Aesthetic is a **household name** in KwaZulu-Natal and increasingly beyond — synonymous with Dr Bangalee’s clinical standards and with skincare people reorder because they trust the source, not because they found a random discount online.",
    ],
  },
  {
    id: "household-brand",
    title: "Becoming a leading household brand",
    content: [
      "A household brand is not a logo on a billboard. It is what people say when you are not in the room: “I get my Botox at Star Aesthetic,” “That’s where I buy my Heliocare,” “Dr Bangalee’s team actually follow up.”",
      "The website supports that by being **consistent, medical, and human**. Every product page reflects clinical positioning. Every treatment page educates before it sells. Rewards and gift vouchers make Star Aesthetic the **default** place to buy — not a last resort after searching Google.",
      "Niki extends the brand voice online: warm, knowledgeable, never pushy — the same trust patients feel in the chair, available when the clinic is closed.",
    ],
  },
  {
    id: "competitors",
    title: "Competitors and our position",
    content: [
      "Patients compare you to three types of competitor — and the platform is built to win in each.",
      "**Other aesthetic clinics** offer treatments but often weak or absent e-commerce. Star Aesthetic sells the **same brands you use in treatment rooms**, with doctor-led credibility they cannot copy.",
      "**Online pharmacies and general retailers** sell skincare without consultation context. You sell **protocol, pairing, and follow-up** — plus Star Light Rewards that bring people back to you, not to a faceless cart.",
      "**Discount and marketplace sellers** compete on price alone. You compete on **trust, authenticity of stock, and relationship** — Dr Bangalee’s name, Nikita’s care, Niki’s guidance, and a CRM that remembers every email.",
      "The opportunity is not to be the cheapest. It is to be the **most trusted** place to buy what you already recommend — and to turn that trust into measurable revenue.",
    ],
  },
  {
    id: "digital-opportunity",
    title: "The financial opportunity",
    content: [
      "Every tube of SPF or serum bought elsewhere after a consultation is margin and loyalty lost. The new platform recovers that by design:",
      "Revenue from **online product sales** with proper margins; **repeat purchase** through Star Light Rewards; **higher average order value** through post-purchase funnels that complete routines, not random discounts; **leads and bookings** from skin assessment, contact forms, and Niki — captured in admin, not lost in an inbox; and **cart recovery** when someone almost checks out but leaves.",
      "The old site showed the world who you are. This one **sells, books, remembers, and follows up**.",
    ],
  },
];

export type FeatureBlock = {
  id: string;
  title: string;
  tagline: string;
  whatItIs: string;
  whyItMatters: string;
  howItWorks: string[];
  link?: { href: string; label: string };
};

export const FEATURES: FeatureBlock[] = [
  {
    id: "treatments",
    title: "Treatments",
    tagline: "Education before expectation",
    whatItIs:
      "A full treatment catalogue organised the way patients think — Face, Skin, Body — with clear pages for Botox, fillers, peels, microneedling, and more.",
    whyItMatters:
      "Most visitors research at night or on weekends. They should leave informed, not overwhelmed. Treatment pages build trust and feed bookings, product sales, and Niki’s knowledge.",
    howItWorks: [
      "Each treatment explains what it is, who it suits, downtime, and pricing from.",
      "Recommended products can be linked so in-clinic and online advice stay aligned.",
      "Clear paths to book a consultation or contact the clinic.",
    ],
    link: { href: "/treatments", label: "View treatments" },
  },
  {
    id: "shop",
    title: "Products & e-commerce",
    tagline: "Medical-grade skincare, sold properly",
    whatItIs:
      "A complete online shop for Dermaceutic, Heliocare, ISDIN, Mesoestetic, NeoStrata, SkinCeuticals, and more — with images, descriptions, cart, and secure checkout.",
    whyItMatters:
      "You already recommend these products in clinic. Now patients can buy authentic stock from you — with VAT-inclusive pricing, delivery, and loyalty — instead of from a generic retailer.",
    howItWorks: [
      "Browse by brand and category; add to cart; checkout with contact and delivery details.",
      "Payment is by **EFT** — order is placed, banking details appear on the confirmation page and in email, and Nakita confirms payment in admin before dispatch.",
      "Free delivery on orders over R800 (standard shipping otherwise).",
    ],
    link: { href: "/shop", label: "Browse the shop" },
  },
  {
    id: "funnels",
    title: "Post-purchase funnels",
    tagline: "Complete the routine, grow the basket",
    whatItIs:
      "An optional one- or two-step offer shown after someone adds certain products to cart — suggesting the next logical items in a skincare routine, often at a small bundle discount.",
    whyItMatters:
      "Clinically, outcomes improve when patients use a full protocol (cleanser, active, SPF). Commercially, it increases order value without aggressive “special offer” language that makes people abandon cart.",
    howItWorks: [
      "Configured **per product** in admin — off until you turn it on.",
      "“Suggest routine” can pre-fill the next items in the same brand line; you review and enable.",
      "Shoppers can skip and checkout normally; those who accept add discounted lines to the same order.",
    ],
    link: { href: "/admin/products", label: "Manage in admin → Products" },
  },
  {
    id: "skin-assessment",
    title: "Skincare survey (skin assessment)",
    tagline: "Turn curiosity into qualified leads",
    whatItIs:
      "An interactive skin health questionnaire on the website — concerns, habits, optional photo — that ends with contact details and a personalised summary.",
    whyItMatters:
      "Captures people not ready to book yet but serious about their skin. Gives Dr Bangalee context before a consultation and gives Nakita a **lead** in the CRM with structured answers.",
    howItWorks: [
      "Visitor completes the flow at their own pace.",
      "Name, email, and phone are saved to **Leads** in admin.",
      "Encourages booking and positions Star Aesthetic as thorough and modern.",
    ],
    link: { href: "/skin-assessment", label: "Try the skin assessment" },
  },
  {
    id: "booking",
    title: "Appointment booking",
    tagline: "Consultations booked online, stored centrally",
    whatItIs:
      "Online booking for treatments — choose treatment, date, and available time slot, with patient details captured in one flow.",
    whyItMatters:
      "Reduces phone tag, captures after-hours demand, and ties every booking to an email profile in **Customers** alongside shop orders and rewards.",
    howItWorks: [
      "Real-time availability based on your booking rules.",
      "Confirmation for the patient; record visible in admin and on the customer profile.",
    ],
    link: { href: "/book", label: "Book an appointment" },
  },
  {
    id: "rewards",
    title: "Star Light Rewards",
    tagline: "Five percent back — reason to return",
    whatItIs:
      "A loyalty programme: **5% back in Star Lights** (1 Star Light = R1) on qualifying shop purchases, credited after EFT payment clears, redeemable on future orders.",
    whyItMatters:
      "Competes with generic retailers by rewarding loyalty to **you**. Encourages repeat purchase of consumables — SPF, cleansers, serums — where lifetime value lives.",
    howItWorks: [
      "Patients sign up with email at /rewards or automatically when they order.",
      "Balance visible online; redemption at checkout.",
      "Managed alongside orders in admin.",
    ],
    link: { href: "/rewards", label: "Star Light Rewards" },
  },
  {
    id: "vouchers",
    title: "Gift vouchers",
    tagline: "Gifts that bring new patients and revenue",
    whatItIs:
      "Purchasable gift vouchers in set amounts — paid by EFT, delivered by email, redeemable against shop purchases.",
    whyItMatters:
      "Seasonal revenue, referrals, and introductions to the brand without discounting your core pricing.",
    howItWorks: [
      "Buyer completes purchase; voucher code issued after payment confirmation.",
      "Recipient applies code at checkout.",
      "Tracked in admin under Gift Vouchers.",
    ],
    link: { href: "/gift-vouchers", label: "Gift vouchers" },
  },
  {
    id: "niki",
    title: "Niki — smart voice assistant",
    tagline: "Your clinic voice, always on",
    whatItIs:
      "A smart voice assistant on the website — the gold chat button, bottom-right. She knows which product or treatment page the visitor is viewing and answers in warm, short, natural speech.",
    whyItMatters:
      "Extends Dr Bangalee’s expertise when reception is closed. Captures interest, explains protocols, and can lead to contact capture — with **full transcripts** in admin for Nikita to review.",
    howItWorks: [
      "Visitor starts voice chat; Niki greets first and answers questions.",
      "She does not diagnose or prescribe; she educates and offers clinic follow-up.",
      "Sessions can be saved with duration and transcript.",
    ],
    link: { href: "/shop", label: "Open shop & try Niki" },
  },
  {
    id: "crm",
    title: "Customers, leads & admin dashboard",
    tagline: "One place to run the digital clinic",
    whatItIs:
      "A mini-CRM in admin: **Customers** (one profile per email — shop, bookings, rewards, leads), **Leads** (enquiries, skin assessments, imports), **Orders** (confirm EFT, dispatch), **Products**, **Pages** (homepage/contact copy), and **Niki** transcripts.",
    whyItMatters:
      "No more scattered spreadsheets and lost form emails. Nakita sees the full picture of everyone who touches Star Aesthetic online.",
    howItWorks: [
      "Login at /admin — dashboard shows revenue, orders, abandoned carts, and Niki activity.",
      "Confirm payments, edit products and funnels, import legacy enquiries as leads.",
    ],
    link: { href: "/admin", label: "Admin dashboard" },
  },
  {
    id: "abandonment",
    title: "Cart abandonment recovery",
    tagline: "Recover sales that almost happened",
    whatItIs:
      "When someone enters email and phone at checkout but does not place an order, the system can send a timed **WhatsApp** and/or **email** reminder with a link to restore their cart.",
    whyItMatters:
      "A meaningful share of online revenue is recovered from people who were interrupted — not from new traffic.",
    howItWorks: [
      "Triggered automatically after a quiet period.",
      "Recovery link returns them to checkout with cart and details restored.",
    ],
  },
  {
    id: "content",
    title: "Editable pages & trust content",
    tagline: "Stay current without a developer",
    whatItIs:
      "CMS-style editing for key pages (e.g. Homepage, Contact) in admin, plus dedicated pages for Dr Bangalee, legal policies, shipping, and contact.",
    whyItMatters:
      "Copy and offers can be updated as the clinic evolves — without waiting on technical help for every small change.",
    howItWorks: [
      "Admin → Pages → edit and publish.",
      "Contact form submissions flow into **Leads**.",
    ],
    link: { href: "/contact", label: "Contact page" },
  },
];

export const CONCLUSION = {
  headline: "This is the foundation — and the next chapter is yours",
  paragraphs: [
    "Star Aesthetic Centre now has a digital platform worthy of the clinic you have built in Durban North. Treatments educate. The shop sells what you believe in. Bookings and assessments capture demand. Rewards and vouchers build loyalty. Niki carries your voice after hours. Admin gives Nakita control.",
    "The five-year vision is not a slide deck — it is lived through every order confirmed, every lead followed up, every patient who says they bought from you because it was easier and they trusted the source.",
    "The next step is yours: enable funnels on hero products, train the team on admin, invite Dr Bangalee and Nakita to explore each section of this site — and when you are ready, let Niki guide conversations while the platform does the rest.",
    "Welcome to the new Star Aesthetic Centre online. We are proud of what it can become.",
  ],
  signoff: "Prepared for Star Aesthetic Centre leadership · 2026",
};

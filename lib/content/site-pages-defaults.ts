import type { ContactPageContent, DrPageContent, HomePageContent, SitePageSlug } from "./site-pages-types";

export const DEFAULT_HOME: HomePageContent = {
  hero: {
    overline: "Durban North · Doctor-Led Aesthetics",
    headingLine1: "Reveal your",
    headingEmphasis: "natural beauty.",
    subtitle:
      "Personalised aesthetic treatments and pharmaceutical-grade skincare, guided by Dr. Rajeev Bangalee — so you look and feel effortlessly you.",
    ctaPrimary: "Explore Treatments",
    ctaSecondary: "Shop Skincare",
    stats: [
      { value: "20+", label: "Years Experience" },
      { value: "6", label: "Premium Brands" },
      { value: "5★", label: "Patient Rating" },
    ],
  },
  doctorTrust: {
    overline: "Meet Your Doctor",
    nameLine1: "Dr. Rajeev",
    nameLine2: "Bangalee",
    role: "GP · Aesthetic Medicine Specialist",
    quote:
      "My goal is simple — to help you look naturally radiant and feel beautifully you. Every treatment is customised, every product carefully chosen.",
    body:
      "A qualified GP with specialisation in Aesthetic Medicine, Dr. Bangalee brings clinical precision and an artistic eye to every consultation. Based in Durban North, he personally recommends every treatment and product at Star Aesthetic Centre.",
    badgeValue: "20+",
    badgeLabel: "Years Experience",
    ctaLabel: "About Dr. Bangalee",
    credentials: [
      "MBChB · University of Natal",
      "Aesthetic Medicine Specialist",
      "Member: SAMA · ACASA",
      "20+ Years Clinical Experience",
    ],
  },
  perksRewards: {
    label: "Star Light Rewards",
    titleLine1: "Earn 5% Back",
    titleLine2: "On Every Rand",
    titleLine3: "You Spend",
    body:
      "Every treatment and product purchase earns you rewards — automatically credited to your account and redeemable against your next visit.",
    ctaLabel: "Join the Programme",
  },
  bookingCta: {
    overline: "Ready to Begin?",
    titleLine1: "Book your",
    titleEmphasis: "consultation",
    body:
      "Every journey begins with a personalised one-on-one consultation with Dr. Bangalee. He'll assess your skin, understand your goals, and design a treatment plan made for you.",
  },
  seo: {
    title: "Star Aesthetic Centre — Doctor-Led Aesthetics in Durban North",
    description:
      "Doctor-led aesthetic treatments and curated medical skincare in Durban North. Botox, fillers, skin peels, microneedling and more — by Dr. Rajeev Bangalee (MB, BS). Book your consultation today.",
  },
};

export const DEFAULT_CONTACT: ContactPageContent = {
  hero: {
    overline: "— Durban North · Doctor-Led Aesthetics",
    title: "Let's Talk",
    subtitle:
      "Whether you're ready to book or simply curious about a treatment, we're here — no pressure, no obligation.",
  },
  formIntro: {
    title: "Send Us a Message",
    body: "We typically respond within 2 business hours. You're welcome to call or WhatsApp us directly if you prefer.",
  },
  doctorCard: {
    body: "Every consultation and treatment is performed personally by Dr. Bangalee — not a therapist or nurse. You're in the hands of a qualified, experienced GP.",
  },
  contact: {
    phone: "0315731325",
    phoneDisplay: "031 573 1325",
    email: "info@staraesthetic.co.za",
    addressLine1: "22 Ennisdale Drive",
    addressLine2: "Durban North, 4051",
    whatsappNote: "+27 (0)31 573 1325",
  },
  hours: [
    { day: "Monday – Friday", hours: "08:00 – 17:00" },
    { day: "Saturday", hours: "08:00 – 13:00" },
    { day: "Sunday & Public Holidays", hours: "Closed" },
  ],
  testimonials: [
    {
      name: "Priya M.",
      location: "Durban North",
      rating: 5,
      treatment: "Anti-Wrinkle Treatment",
      text: "I was so nervous about injectables, but Dr. Bangalee explained everything so clearly. The results were completely natural — my husband didn't even realise I'd had anything done!",
    },
    {
      name: "Samantha L.",
      location: "La Lucia",
      rating: 5,
      treatment: "Skin Peel Treatment",
      text: "Three sessions in and my pigmentation has faded dramatically. The team is warm, professional, and genuinely invested in your results. I wouldn't go anywhere else.",
    },
    {
      name: "Kavitha R.",
      location: "Umhlanga",
      rating: 5,
      treatment: "Lip Fillers",
      text: "Subtle, beautiful lip enhancement. Dr. Bangalee has an incredible eye — I told him I wanted to look like myself, just better. That's exactly what I got.",
    },
    {
      name: "Michelle T.",
      location: "Durban North",
      rating: 5,
      treatment: "Vitamin Drip",
      text: "The vitamin drip before a big event was a game changer. I felt amazing. The clinic is beautiful, clean, and the care you receive is absolutely top-tier.",
    },
  ],
  seo: {
    title: "Contact Us | Star Aesthetic Centre – Durban North",
    description:
      "Get in touch with Dr. Rajeev Bangalee at Star Aesthetic Centre, Durban North. Book a consultation for aesthetic treatments, skincare advice, or product enquiries. We respond within 2 business hours.",
  },
};

const DR_BIO_HTML = `<p>Dr. Rajeev Bangalee is the founder and director of Star Aesthetic Medical Centre in Durban North, KwaZulu-Natal. He is a qualified General Practitioner who has dedicated his post-graduate career to the science — and the art — of aesthetic medicine.</p>
<p>After completing his MB, BS at the University of the Witwatersrand in 2001, Dr. Bangalee pursued extensive clinical experience in the United Kingdom, working across specialised fields and gaining exposure to high standards of care and a broad patient base. This period abroad shaped his disciplined, evidence-first approach to medicine.</p>
<p>Returning to South Africa, Dr. Bangalee formalised his aesthetic medicine training with a Diploma from the American Academy of Aesthetic Medicine in 2012 — one of the most respected internationally recognised qualifications in the field. He has since added certification in Clinical Management in Dermatology, continuously expanding his skill set through local and international workshops and conferences.</p>
<p>What sets Dr. Bangalee apart is not only his credentials — it is his philosophy. He believes that every patient deserves a personalised plan, every product must be clinically vetted, and every result should look natural. No cookie-cutter solutions. No unnecessary procedures. Just honest, medical-grade care tailored to you.</p>`;

export const DEFAULT_DR: DrPageContent = {
  hero: {
    overline: "Meet the Director",
    title: "DR. RAJEEV BANGALEE",
    subtitle: "MB, BS · Aesthetic Medicine Specialist · Durban North",
    intro:
      "A qualified GP with 20+ years of clinical experience in South Africa and the UK. Injectable treatments are personally performed by Dr. Bangalee; skin treatments by Nakita.",
    credentialPills: ["GP · 20+ Years", "Wits Graduate 2001", "Aesthetic Med Diploma 2012", "Durban North"],
    ctaPrimary: "Book a Consultation",
    ctaSecondary: "View All Treatments",
    badgeValue: "20+",
    badgeLabel: "Years Experience",
  },
  stats: [
    { value: "20+", label: "Years of Clinical Experience" },
    { value: "2001", label: "Year of Graduation — Wits" },
    { value: "2012", label: "Aesthetic Medicine Diploma" },
    { value: "100%", label: "Personally Performed by Dr. Bangalee" },
  ],
  about: {
    overline: "Biography",
    heading: "A Doctor Who Takes Aesthetics Seriously",
    quote:
      "My goal is simple — to help you look naturally radiant and feel beautifully you. Every treatment is customised, every product carefully chosen.",
    bodyHtml: DR_BIO_HTML,
    credentials: [],
  },
  seo: {
    title: "Dr. Rajeev Bangalee | Aesthetic Medicine Specialist | Star Aesthetic Centre Durban",
    description:
      "Dr. Rajeev Bangalee — General Practitioner and Aesthetic Medicine Specialist with 20+ years of clinical experience. Director of Star Aesthetic Centre, Durban North. Botox, dermal fillers, skin peels, microneedling and more.",
  },
};

export const SITE_PAGE_LABELS: Record<SitePageSlug, { title: string; path: string }> = {
  home: { title: "Homepage", path: "/" },
  contact: { title: "Contact", path: "/contact" },
  "dr-rajeev-bangalee": { title: "Dr. Bangalee", path: "/dr-rajeev-bangalee" },
};

export function getDefaultSitePageContent<S extends SitePageSlug>(slug: S) {
  switch (slug) {
    case "home":
      return DEFAULT_HOME;
    case "contact":
      return DEFAULT_CONTACT;
    case "dr-rajeev-bangalee":
      return DEFAULT_DR;
    default:
      throw new Error(`Unknown page slug: ${slug}`);
  }
}

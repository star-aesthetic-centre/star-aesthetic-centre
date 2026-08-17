import type { ContactPageContent, DrPageContent, HomePageContent, SitePageSlug } from "./site-pages-types";

export const DEFAULT_HOME: HomePageContent = {
  hero: {
    // "Reveal your natural beauty" read well but told a patient nothing: not
    // what is offered, by whom, where, or why here rather than anywhere else.
    // The headline now carries the differentiator and the subtitle carries
    // what / who / where.
    overline: "Durban North · Doctor-Led Aesthetics",
    headingLine1: "Doctor-led aesthetics.",
    headingEmphasis: "Natural-looking results.",
    subtitle:
      "Personalised aesthetic medicine in Durban North — injectables, skin treatments and pharmaceutical-grade skincare, led by Dr. Rajeev Bangalee (MBBch).",
    ctaPrimary: "Book a Free 15-Minute Consultation",
    ctaSecondary: "Shop skincare",
    trustLine: "HPCSA registered · Every injectable personally performed by Dr. Bangalee",
    stats: [
      { value: "20+", label: "Years Experience" },
      { value: "6", label: "Premium Brands" },
      { value: "5.0★", label: "21 Google Reviews" },
    ],
  },
  doctorTrust: {
    overline: "Meet Your Doctor",
    nameLine1: "Dr. Rajeev",
    nameLine2: "Bangalee",
    role: "GP · Aesthetic Medicine",
    quote:
      "My goal is simple — to help you look naturally radiant and feel beautifully you. Every treatment is customised, every product carefully chosen.",
    body:
      "A qualified GP with postgraduate training in aesthetic medicine, Dr. Bangalee brings clinical precision and an artistic eye to every consultation. Based in Durban North, he personally recommends every treatment and product at Star Aesthetic Centre.",
    badgeValue: "20+",
    badgeLabel: "Years Experience",
    ctaLabel: "About Dr. Bangalee",
    // Aligned to the doctor page, biography, FAQ and structured data, which
    // all state MBBch from the University of the Witwatersrand (2001) and
    // membership of HPCSA/DIPA/KZNDHC/AAMSSA. This block previously said
    // "MBBch · University of Natal" and "SAMA · ACASA" — a different degree,
    // a different university and different bodies. Dr. Bangalee must confirm
    // which is correct; the Wits version is used here because it appears in
    // five places with dates while this was the single outlier.
    credentials: [
      "MBBch · University of the Witwatersrand",
      "Diploma in Aesthetic Medicine (AAAM)",
      "HPCSA Registered",
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
      "Doctor-led aesthetic treatments and curated medical skincare in Durban North. Botox, fillers, skin peels, microneedling and more — by Dr. Rajeev Bangalee (MBBch). Book your consultation today.",
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
    body: "Consultations and injectable procedures are assessed and performed by Dr. Bangalee. Selected skin treatments may be carried out by an appropriately trained practitioner under clinic protocols, and IV infusions may be monitored by Dr. Bangalee or an appropriately registered nursing professional.",
  },
  contact: {
    phone: "0315731325",
    phoneDisplay: "031 573 1325",
    email: "info@staraesthetic.site",
    addressLine1: "22 Ennisdale Drive",
    addressLine2: "Durban North, 4051",
    whatsappNote: "076 977 0386",
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

const DR_BIO_HTML = `<p>Dr. Rajeev Bangalee is the founder and director of Star Aesthetic Centre in Durban North, KwaZulu-Natal. He is a qualified General Practitioner who has dedicated his post-graduate career to the science — and the art — of aesthetic medicine.</p>
<p>After completing his MBBch at the University of the Witwatersrand in 2001, Dr. Bangalee pursued extensive clinical experience in the United Kingdom, working across specialised fields and gaining exposure to high standards of care and a broad patient base. This period abroad shaped his disciplined, evidence-first approach to medicine.</p>
<p>Returning to South Africa, Dr. Bangalee formalised his aesthetic medicine training with a Diploma from the American Academy of Aesthetic Medicine in 2012 — one of the most respected internationally recognised qualifications in the field. He has since added certification in Clinical Management in Dermatology, continuously expanding his skill set through local and international workshops and conferences.</p>
<p>What sets Dr. Bangalee apart is not only his credentials — it is his philosophy. He believes that every patient deserves a personalised plan, every product must be clinically vetted, and every result should look natural. No cookie-cutter solutions. No unnecessary procedures. Just honest, medical-grade care tailored to you.</p>`;

export const DEFAULT_DR: DrPageContent = {
  hero: {
    overline: "Meet the Director",
    title: "DR. RAJEEV BANGALEE",
    subtitle: "MBBch · Aesthetic Medicine · Durban North",
    intro:
      "A qualified GP with 20+ years of clinical experience in South Africa and the UK. Injectable treatments are personally performed by Dr. Bangalee; selected skin treatments are performed by our aesthetic therapist under his clinical protocols.",
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
    { value: "All", label: "Injectables by Dr. Bangalee" },
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
    title: "Dr. Rajeev Bangalee | Aesthetic Medicine | Star Aesthetic Centre Durban",
    description:
      "Dr. Rajeev Bangalee — General Practitioner with postgraduate training in Aesthetic Medicine and 20+ years of clinical experience. Director of Star Aesthetic Centre, Durban North. Botox, dermal fillers, skin peels, microneedling and more.",
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

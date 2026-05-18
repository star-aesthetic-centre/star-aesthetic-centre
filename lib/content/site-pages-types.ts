export type StatItem = { value: string; label: string };

export type HomePageContent = {
  hero: {
    overline: string;
    headingLine1: string;
    headingEmphasis: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: StatItem[];
  };
  doctorTrust: {
    overline: string;
    nameLine1: string;
    nameLine2: string;
    role: string;
    quote: string;
    body: string;
    badgeValue: string;
    badgeLabel: string;
    ctaLabel: string;
    credentials: string[];
  };
  perksRewards: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    body: string;
    ctaLabel: string;
  };
  bookingCta: {
    overline: string;
    titleLine1: string;
    titleEmphasis: string;
    body: string;
  };
  seo: { title: string; description: string };
};

export type ContactTestimonial = {
  name: string;
  location: string;
  treatment: string;
  text: string;
  rating: number;
};

export type HoursRow = { day: string; hours: string };

export type ContactPageContent = {
  hero: {
    overline: string;
    title: string;
    subtitle: string;
  };
  formIntro: {
    title: string;
    body: string;
  };
  doctorCard: {
    body: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    whatsappNote: string;
  };
  hours: HoursRow[];
  testimonials: ContactTestimonial[];
  seo: { title: string; description: string };
};

export type DrPageContent = {
  hero: {
    overline: string;
    title: string;
    subtitle: string;
    intro: string;
    credentialPills: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    badgeValue: string;
    badgeLabel: string;
  };
  stats: StatItem[];
  about: {
    overline: string;
    heading: string;
    quote: string;
    bodyHtml: string;
    credentials: string[];
  };
  seo: { title: string; description: string };
};

export type SitePageSlug = "home" | "contact" | "dr-rajeev-bangalee";

export type SitePageContentMap = {
  home: HomePageContent;
  contact: ContactPageContent;
  "dr-rajeev-bangalee": DrPageContent;
};

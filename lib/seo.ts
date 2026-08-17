import type { Metadata } from "next";

/** Canonical production host — apex is primary; www redirects here via Vercel. */
export const SITE_URL = "https://staraesthetic.co.za";

export const SITE_NAME = "Star Aesthetic Centre";
export const SITE_LOCALE = "en_ZA";

/** false until launch — set ALLOW_SEARCH_INDEXING=true in Vercel env when going live */
export const ALLOW_SEARCH_INDEXING = process.env.ALLOW_SEARCH_INDEXING === "true";

export const PRELAUNCH_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false, noimageindex: true },
};
/**
 * Social share preview (WhatsApp, Facebook, X, LinkedIn).
 *
 * The real consulting room, matching the homepage hero — a shared link
 * previewing a stock interior undercuts the same trust the hero was changed
 * to build.
 *
 * Wider than the ideal 1200×630, so platforms centre-crop it. The treatment
 * bed and DR RAJEEV BANGALEE signage survive that crop; the left edge does not.
 */
export const DEFAULT_OG_IMAGE = "/images/star-aesthetic-centre-durban-consulting-room.webp";

export const DEFAULT_KEYWORDS = [
  "aesthetic clinic Durban",
  "aesthetic clinic Durban North",
  "botox Durban North",
  "lip fillers Durban",
  "skin peel Durban",
  "Dr Rajeev Bangalee",
  "medical aesthetics KZN",
  "cosmeceutical skincare Durban",
];

/** Resolve a path or URL to an absolute URL on the production site. */
/**
 * Origin PayFast must call back on. Overridable so sandbox testing can point
 * return/notify URLs at a tunnel instead of the production domain.
 */
export function getPublicSiteUrl(): string {
  const override = process.env.PUBLIC_SITE_URL?.trim();
  return (override || SITE_URL).replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function canonicalUrl(path: string): string {
  return absoluteUrl(path);
}

/** Build Next.js Metadata with consistent canonical, OG, and keywords. */
export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
}): Metadata {
  const url = canonicalUrl(options.path);
  const ogImage = options.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords ?? DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: options.ogType ?? "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage)],
    },
    ...(!ALLOW_SEARCH_INDEXING || options.noIndex
      ? { robots: PRELAUNCH_ROBOTS }
      : {}),
  };
}

export function stripHtml(html: string): string {
  return (
    html
      .replace(/<[^>]+>/g, " ")
      // Treatment copy is markdown, so **bold** markers survived stripHtml and
      // were being printed literally in search results.
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** Cut to `max` characters without splitting a word or leaving trailing punctuation. */
export function truncateAtWord(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–—-]+$/, "");
}

/**
 * Build a search-result description that fits.
 *
 * Google shows roughly 155 characters. Previously these were assembled by
 * slicing the summary at 120 characters mid-word and appending a sentence,
 * which produced "...clinically proven **acne t Book a consultation today."
 */
export function metaDescription(lead: string, summary: string, tail = "Book a consultation."): string {
  const cleanLead = stripHtml(lead).trim();
  const clean = stripHtml(summary);

  // Prefer whole sentences. "…Dr. Bangalee provides Book a consultation."
  // is what appending a tail to a mid-sentence cut produces.
  //
  // Abbreviations must be masked first. "Dr." ends in a full stop, so a naive
  // split treats it as a sentence: the acne summary "…not a hygiene problem.
  // Dr. Bangalee provides…" yielded the sentence "Dr.", which fitted the
  // budget and produced the live meta description "Acne is a medical
  // condition — not a hygiene problem. Dr. Book a consultation."
  const ABBREVIATIONS = /\b(Dr|Mr|Mrs|Ms|Prof|Snr|Jnr|St|etc|vs|Inc|Ltd|No|approx)\./g;
  // A control character that cannot occur in the copy, so restoring the
  // full stops afterwards is unambiguous.
  const MASK = "\u0000";
  const masked = clean.replace(ABBREVIATIONS, `$1${MASK}`);
  const sentences = (masked.match(/[^.!?]+[.!?]+/g) ?? []).map((s) =>
    s.replaceAll(MASK, ".")
  );
  let body = "";
  for (const s of sentences) {
    const next = (body ? `${body} ` : "") + s.trim();
    if (cleanLead.length + next.length + tail.length + 2 > 158) break;
    body = next;
  }

  // Nothing fits whole — cut at a word and drop the tail, which would only
  // read as a non sequitur after an ellipsis.
  if (!body) {
    const budget = 158 - cleanLead.length - 1;
    const cut = budget > 40 ? truncateAtWord(clean, budget - 1) : "";
    return [cleanLead, cut ? `${cut}…` : ""].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  }

  return [cleanLead, body, tail].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };
}

export function medicalProcedureSchema(options: {
  name: string;
  description: string;
  url: string;
  priceFrom?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: options.name,
    description: stripHtml(options.description).slice(0, 500),
    url: options.url,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Performed by Dr. Rajeev Bangalee (MBBch) at Star Aesthetic Centre, Durban North.",
    ...(options.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "ZAR",
            description: options.priceFrom,
          },
        }
      : {}),
  };
}

export function productSchema(options: {
  name: string;
  description: string;
  brand: string;
  image: string | null;
  price: number | null;
  sku: string | null;
  slug: string;
}) {
  const url = canonicalUrl(`/shop/products/${options.slug}`);
  const image = options.image ? absoluteUrl(options.image) : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    brand: { "@type": "Brand", name: options.brand },
    description: stripHtml(options.description).slice(0, 500),
    image,
    sku: options.sku ?? undefined,
    offers: {
      "@type": "Offer",
      price: options.price ?? undefined,
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

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
export const DEFAULT_OG_IMAGE = "/images/star-aesthetic-centre-durban-homepage-hero-005.webp";

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
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
    howPerformed: "Performed by Dr. Rajeev Bangalee (MB, BS) at Star Aesthetic Centre, Durban North.",
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

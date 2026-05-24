import { MetadataRoute } from "next";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { SITE_URL } from "@/lib/seo";
import { ALL_TREATMENT_SLUGS, TREATMENT_SLUG_TO_CATEGORY } from "@/lib/treatment-routes";
import { ALL_GLOSSARY_TERMS } from "@/lib/glossary/index";

const BRAND_SLUGS = [
  "dermaceutic",
  "heliocare",
  "isdin",
  "mesoestetic",
  "neostrata",
  "skinceuticals",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/treatments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/dr-rajeev-bangalee`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/rewards`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/gift-vouchers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/skin-assessment`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/legal/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/returns-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/shipping`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const treatmentPages: MetadataRoute.Sitemap = ALL_TREATMENT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/treatments/${TREATMENT_SLUG_TO_CATEGORY[slug]}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_SLUGS.map((slug) => ({
    url: `${SITE_URL}/shop/brands/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createSupabaseAdmin();
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("slug");

    productPages = (products ?? []).map((p) => ({
      url: `${SITE_URL}/shop/products/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));
  } catch {
    // Non-fatal
  }

  const glossaryPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...ALL_GLOSSARY_TERMS.map((t) => ({
      url: `${SITE_URL}/glossary/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return [...staticPages, ...treatmentPages, ...brandPages, ...productPages, ...glossaryPages];
}

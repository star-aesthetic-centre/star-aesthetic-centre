import { MetadataRoute } from "next";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

const BASE = "https://www.staraesthetic.online";

const TREATMENT_SLUGS = [
  { category: "face",          slug: "botox" },
  { category: "face",          slug: "lip-filler" },
  { category: "face",          slug: "jaw-amp-chin-contouring" },
  { category: "face",          slug: "dermapen-microneedling" },
  { category: "skin",          slug: "skin-peel" },
  { category: "skin",          slug: "pigmentation-treatment" },
  { category: "skin",          slug: "acne" },
  { category: "skin",          slug: "excessive-sweating" },
  { category: "body-wellness", slug: "body-contouring" },
  { category: "body-wellness", slug: "medi-lean" },
  { category: "body-wellness", slug: "varicose-veins" },
  { category: "body-wellness", slug: "vitamin-drips" },
];

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

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/treatments`,              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/shop`,                    lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/book`,                    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/dr-rajeev-bangalee`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/rewards`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/gift-vouchers`,           lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                 lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/skin-assessment`,         lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/legal/privacy-policy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/legal/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/legal/returns-policy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // Treatment pages
  const treatmentPages: MetadataRoute.Sitemap = TREATMENT_SLUGS.map(({ category, slug }) => ({
    url: `${BASE}/treatments/${category}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = BRAND_SLUGS.map((slug) => ({
    url: `${BASE}/shop/brands/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Product pages — fetched from Supabase
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createSupabaseAdmin();
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("slug");

    productPages = (products ?? []).map((p) => ({
      url: `${BASE}/shop/products/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Non-fatal — sitemap still works without product pages
  }

  return [...staticPages, ...treatmentPages, ...brandPages, ...productPages];
}

import { createSupabaseServer } from "@/lib/supabase-server";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SupabaseProductImage {
  id: string;
  url: string;
  alt_text: string;
  sort_order: number;
}

export interface SupabaseProduct {
  id: string;
  brand_slug: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price_cents: number | null;
  regular_price_cents: number | null;
  sku: string | null;
  is_active: boolean;
  subcategory: string | null;
  subcategory_sort: number | null;
  funnel_config?: unknown;
  images: SupabaseProductImage[];
  /** Derived: price_cents / 100 */
  price: number | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format a numeric price (in ZAR, not cents) as "1 250.00" */
export function formatPrice(price: number | null): string | null {
  if (price == null) return null;
  return new Intl.NumberFormat("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/** Convert price_cents integer to ZAR float (e.g. 71500 → 715.00) */
export function centsToRand(cents: number | null): number | null {
  if (cents == null) return null;
  return cents / 100;
}

/** Return the primary image URL (sort_order = 0), or first image URL, or null */
export function getPrimaryImage(images: SupabaseProductImage[]): string | null {
  if (!images || images.length === 0) return null;
  const primary = images.find((img) => img.sort_order === 0);
  return (primary ?? images[0]).url;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all active products across every brand, with images.
 */
export async function getAllProducts(): Promise<SupabaseProduct[]> {
  try {
    const supabase = createSupabaseServer();

    const { data: products, error } = await supabase
      .from("products")
      .select("id, brand_slug, name, slug, short_description, description, price_cents, regular_price_cents, sku, is_active, subcategory, subcategory_sort")
      .eq("is_active", true)
      .order("brand_slug")
      .order("subcategory_sort", { ascending: true, nullsFirst: false })
      .order("name");

    if (error || !products?.length) {
      if (error) console.error("Supabase all products error:", error);
      return [];
    }

    const productIds = products.map((p) => p.id);
    const { data: images, error: imgError } = await supabase
      .from("product_images")
      .select("id, product_id, url, alt_text, sort_order")
      .in("product_id", productIds)
      .order("sort_order");

    if (imgError) console.error("Supabase images error:", imgError);

    const imagesByProduct: Record<string, SupabaseProductImage[]> = {};
    for (const img of images ?? []) {
      if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = [];
      imagesByProduct[img.product_id].push(img);
    }

    return products.map((p) => ({
      ...p,
      price: centsToRand(p.price_cents),
      images: imagesByProduct[p.id] ?? [],
    }));
  } catch (err) {
    console.error("getAllProducts error:", err);
    return [];
  }
}

/**
 * Fetch all products for a given brand slug, with their images.
 * Returns an empty array on error (never throws).
 */
export async function getProductsByBrand(brandSlug: string): Promise<SupabaseProduct[]> {
  try {
    const supabase = createSupabaseServer();

    const { data: products, error } = await supabase
      .from("products")
      .select("id, brand_slug, name, slug, short_description, description, price_cents, regular_price_cents, sku, is_active, subcategory, subcategory_sort")
      .eq("brand_slug", brandSlug)
      .eq("is_active", true)
      .order("subcategory_sort", { ascending: true, nullsFirst: false })
      .order("name");

    if (error) {
      console.error("Supabase products error:", error);
      return [];
    }

    if (!products || products.length === 0) return [];

    // Fetch all images for these products in one query
    const productIds = products.map((p) => p.id);
    const { data: images, error: imgError } = await supabase
      .from("product_images")
      .select("id, product_id, url, alt_text, sort_order")
      .in("product_id", productIds)
      .order("sort_order");

    if (imgError) {
      console.error("Supabase images error:", imgError);
    }

    // Map images onto products
    const imagesByProduct: Record<string, SupabaseProductImage[]> = {};
    for (const img of images ?? []) {
      if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = [];
      imagesByProduct[img.product_id].push(img);
    }

    return products.map((p) => ({
      ...p,
      price: centsToRand(p.price_cents),
      images: imagesByProduct[p.id] ?? [],
    }));
  } catch (err) {
    console.error("getProductsByBrand error:", err);
    return [];
  }
}

/**
 * Fetch a single product by slug, with its images.
 * Returns null if not found or on error.
 */
const PRODUCT_DETAIL_SELECT =
  "id, brand_slug, name, slug, short_description, description, price_cents, regular_price_cents, sku, is_active, subcategory, subcategory_sort";

export async function getProductBySlug(slug: string): Promise<SupabaseProduct | null> {
  try {
    const supabase = createSupabaseServer();

    // funnel_config is optional until product-funnel-migration.sql is applied
    let { data: product, error } = await supabase
      .from("products")
      .select(`${PRODUCT_DETAIL_SELECT}, funnel_config`)
      .eq("slug", slug)
      .single();

    if (error?.code === "42703" || error?.message?.includes("funnel_config")) {
      ({ data: product, error } = await supabase
        .from("products")
        .select(PRODUCT_DETAIL_SELECT)
        .eq("slug", slug)
        .single());
    }

    if (error || !product) {
      console.error("Supabase product detail error:", error);
      return null;
    }

    const { data: images } = await supabase
      .from("product_images")
      .select("id, product_id, url, alt_text, sort_order")
      .eq("product_id", product.id)
      .order("sort_order");

    return {
      ...product,
      price: centsToRand(product.price_cents),
      images: images ?? [],
    };
  } catch (err) {
    console.error("getProductBySlug error:", err);
    return null;
  }
}

/**
 * Look up a product whose former_slugs array contains the given slug.
 * Used to 301-redirect renamed product URLs.
 * Returns { newSlug } if found, or null if not found / column not present.
 */
export async function getProductByFormerSlug(
  slug: string
): Promise<{ newSlug: string } | null> {
  try {
    const supabase = createSupabaseServer();
    const { data, error } = await supabase
      .from("products")
      .select("slug")
      .contains("former_slugs", [slug])
      .eq("is_active", true)
      .limit(1)
      .single();

    if (error || !data) return null;
    return { newSlug: data.slug };
  } catch {
    return null;
  }
}

// ─── Treatment Recommendations ────────────────────────────────────────────────

export interface TreatmentRecommendedProduct {
  id: string;
  name: string;
  slug: string;
  brand_slug: string;
  short_description: string | null;
  price: number | null;
  primaryImage: string | null;
}

export interface TreatmentRecommendation {
  id: string;
  treatment_slug: string;
  phase: string;
  phase_label: string;
  is_essential: boolean;
  notes: string | null;
  sort_order: number;
  product: TreatmentRecommendedProduct;
}

/**
 * Fetch all product recommendations for a treatment, grouped data ready to render.
 * Uses Supabase nested select to join recommendations → products → product_images.
 */
export async function getTreatmentRecommendations(
  treatmentSlug: string
): Promise<TreatmentRecommendation[]> {
  try {
    const supabase = createSupabaseServer();

    const { data, error } = await supabase
      .from("treatment_product_recommendations")
      .select(`
        id, treatment_slug, phase, phase_label, is_essential, notes, sort_order,
        products (
          id, name, slug, brand_slug, short_description, price_cents,
          product_images (url, alt_text, sort_order)
        )
      `)
      .eq("treatment_slug", treatmentSlug)
      .order("sort_order");

    if (error || !data) {
      console.error("getTreatmentRecommendations error:", error);
      return [];
    }

    return data
      .filter((rec: any) => rec.products)
      .map((rec: any) => {
        const p = rec.products;
        const images: SupabaseProductImage[] = (p.product_images ?? [])
          .slice()
          .sort((a: SupabaseProductImage, b: SupabaseProductImage) => a.sort_order - b.sort_order);
        const primaryImage =
          images.find((i) => i.sort_order === 0)?.url ?? images[0]?.url ?? null;

        return {
          id: rec.id,
          treatment_slug: rec.treatment_slug,
          phase: rec.phase,
          phase_label: rec.phase_label,
          is_essential: rec.is_essential,
          notes: rec.notes,
          sort_order: rec.sort_order,
          product: {
            id: p.id,
            name: p.name,
            slug: p.slug,
            brand_slug: p.brand_slug,
            short_description: p.short_description,
            price: centsToRand(p.price_cents),
            primaryImage,
          },
        };
      });
  } catch (err) {
    console.error("getTreatmentRecommendations error:", err);
    return [];
  }
}

export interface ProductTreatmentLink {
  treatment_slug: string;
  treatment_title: string;
  treatment_category: string;
  phase_label: string;
  is_essential: boolean;
}

/**
 * Fetch all treatments that recommend a given product.
 * Used on product pages to show "Recommended for these treatments".
 */
export async function getTreatmentsForProduct(
  productId: string
): Promise<ProductTreatmentLink[]> {
  try {
    const supabase = createSupabaseServer();

    const { data, error } = await supabase
      .from("treatment_product_recommendations")
      .select(`
        phase_label, is_essential,
        treatments (slug, title, category)
      `)
      .eq("product_id", productId)
      .order("is_essential", { ascending: false });

    if (error || !data) return [];

    return data
      .filter((r: any) => r.treatments)
      .map((r: any) => ({
        treatment_slug: r.treatments.slug,
        treatment_title: r.treatments.title,
        treatment_category: r.treatments.category,
        phase_label: r.phase_label,
        is_essential: r.is_essential,
      }));
  } catch {
    return [];
  }
}

/**
 * Fetch products in the same brand as a given product (for "related products").
 * Excludes the current product. Returns up to `limit` products.
 */
export async function getRelatedProducts(
  brandSlug: string,
  excludeSlug: string,
  limit = 4
): Promise<SupabaseProduct[]> {
  try {
    const supabase = createSupabaseServer();

    const { data: products, error } = await supabase
      .from("products")
      .select("id, brand_slug, name, slug, short_description, description, price_cents, regular_price_cents, sku, is_active, subcategory, subcategory_sort")
      .eq("brand_slug", brandSlug)
      .neq("slug", excludeSlug)
      .limit(limit)
      .order("name");

    if (error || !products || products.length === 0) return [];

    const productIds = products.map((p) => p.id);
    const { data: images } = await supabase
      .from("product_images")
      .select("id, product_id, url, alt_text, sort_order")
      .in("product_id", productIds)
      .order("sort_order");

    const imagesByProduct: Record<string, SupabaseProductImage[]> = {};
    for (const img of images ?? []) {
      if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = [];
      imagesByProduct[img.product_id].push(img);
    }

    return products.map((p) => ({
      ...p,
      price: centsToRand(p.price_cents),
      images: imagesByProduct[p.id] ?? [],
    }));
  } catch {
    return [];
  }
}

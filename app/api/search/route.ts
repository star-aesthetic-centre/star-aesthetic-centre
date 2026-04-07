import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const supabase = createSupabaseAdmin();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, slug, brand_slug, price_cents")
    .eq("is_active", true)
    .or(`name.ilike.%${q}%,brand_slug.ilike.%${q}%,short_description.ilike.%${q}%`)
    .order("name")
    .limit(8);

  if (error || !products || products.length === 0) {
    return NextResponse.json({ results: [] });
  }

  // Fetch primary image for each product
  const productIds = products.map((p) => p.id);
  const { data: images } = await supabase
    .from("product_images")
    .select("product_id, url")
    .in("product_id", productIds)
    .order("sort_order");

  const imageByProduct: Record<string, string> = {};
  for (const img of images ?? []) {
    if (!imageByProduct[img.product_id]) {
      imageByProduct[img.product_id] = img.url;
    }
  }

  // Format brand name from slug (e.g. "skinceuticals" → "SkinCeuticals")
  const BRAND_NAMES: Record<string, string> = {
    skinceuticals: "SkinCeuticals",
    neostrata: "NeoStrata",
    dermaceutic: "Dermaceutic",
    heliocare: "Heliocare",
    isdin: "ISDIN",
    mesoestetic: "Mesoestetic",
  };

  const results = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    brand: BRAND_NAMES[p.brand_slug] ?? p.brand_slug,
    price: (p.price_cents ?? 0) / 100,
    image: imageByProduct[p.id] ?? null,
  }));

  return NextResponse.json({ results });
}

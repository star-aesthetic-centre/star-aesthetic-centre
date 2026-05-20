import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { extractPatientQuotes } from "@/lib/checkout-product-quotes";

/** Patient comments from product pages for checkout reassurance (not verified testimonials). */
export async function GET(req: NextRequest) {
  const slugsParam = req.nextUrl.searchParams.get("slugs")?.trim();
  if (!slugsParam) {
    return NextResponse.json({ quotes: [], productName: null });
  }

  const slugs = slugsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (slugs.length === 0) {
    return NextResponse.json({ quotes: [], productName: null });
  }

  const supabase = createSupabaseAdmin();
  const { data: products, error } = await supabase
    .from("products")
    .select("slug, name, description")
    .in("slug", slugs)
    .eq("is_active", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  for (const slug of slugs) {
    const product = products?.find((p) => p.slug === slug);
    if (!product?.description) continue;
    const quotes = extractPatientQuotes(product.description, 3);
    if (quotes.length > 0) {
      return NextResponse.json({
        productName: product.name,
        productSlug: product.slug,
        quotes,
      });
    }
  }

  const first = products?.[0];
  return NextResponse.json({
    productName: first?.name ?? null,
    productSlug: first?.slug ?? null,
    quotes: first ? extractPatientQuotes(first.description, 3) : [],
  });
}

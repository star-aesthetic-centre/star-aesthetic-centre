export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { parseFunnelConfig, type FunnelStepConfig } from "@/lib/funnel";
import { centsToRand, getPrimaryImage } from "@/lib/queries/supabase-products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createSupabaseAdmin();

  let { data: sourceProduct, error: sourceError } = await supabase
    .from("products")
    .select("id, name, slug, funnel_config, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (sourceError?.code === "42703" && sourceError.message?.includes("funnel_config")) {
    ({ data: sourceProduct, error: sourceError } = await supabase
      .from("products")
      .select("id, name, slug, is_active")
      .eq("slug", slug)
      .eq("is_active", true)
      .single());
    if (sourceProduct) sourceProduct = { ...sourceProduct, funnel_config: null };
  }

  if (sourceError || !sourceProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const config = parseFunnelConfig(sourceProduct.funnel_config);
  if (!config.enabled) {
    return NextResponse.json({ enabled: false, steps: [] });
  }

  const allIds = Array.from(
    new Set(config.steps.flatMap((step) => step.productIds).filter(Boolean))
  );

  if (allIds.length === 0) {
    return NextResponse.json({ enabled: true, steps: [] });
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, slug, price_cents, sku, is_active")
    .in("id", allIds)
    .eq("is_active", true);

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const productIds = (products ?? []).map((p) => p.id);
  const { data: images } = await supabase
    .from("product_images")
    .select("product_id, url, sort_order")
    .in("product_id", productIds)
    .order("sort_order");

  const imagesByProduct: Record<string, { url: string; sort_order: number }[]> = {};
  for (const img of images ?? []) {
    if (!imagesByProduct[img.product_id]) imagesByProduct[img.product_id] = [];
    imagesByProduct[img.product_id].push(img);
  }

  const byId = new Map(
    (products ?? []).map((p) => {
      const imgs = imagesByProduct[p.id] ?? [];
      const primary = getPrimaryImage(
        imgs.map((i) => ({ id: "", url: i.url, alt_text: "", sort_order: i.sort_order }))
      );
      return [
        p.id,
        {
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: centsToRand(p.price_cents) ?? 0,
          sku: p.sku,
          image: primary,
        },
      ];
    })
  );

  const steps = (config.steps as FunnelStepConfig[])
    .map((step, idx) => ({
      index: idx,
      title: step.title,
      description: step.description,
      discountPercent: step.discountPercent,
      products: step.productIds.map((id) => byId.get(id)).filter(Boolean),
    }))
    .filter((step) => step.products.length > 0);

  return NextResponse.json({
    enabled: true,
    sourceProduct: { id: sourceProduct.id, slug: sourceProduct.slug, name: sourceProduct.name },
    steps,
  });
}

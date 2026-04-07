import { createSupabaseAdmin } from "@/lib/supabase-admin";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAllProducts() {
  const supabase = createSupabaseAdmin();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      "id, brand_slug, name, slug, short_description, price_cents, is_active, subcategory, subcategory_sort, stock_quantity"
    )
    .order("brand_slug")
    .order("subcategory_sort", { ascending: true, nullsFirst: false })
    .order("name");

  if (error || !products) return [];

  const productIds = products.map((p) => p.id);
  const { data: images } = await supabase
    .from("product_images")
    .select("product_id, url, sort_order")
    .in("product_id", productIds)
    .eq("sort_order", 0);

  const primaryByProduct: Record<string, string> = {};
  for (const img of images ?? []) {
    primaryByProduct[img.product_id] = img.url;
  }

  return products.map((p) => ({
    ...p,
    primaryImage: primaryByProduct[p.id] ?? null,
  }));
}

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1917] mb-1">Products</h1>
        <p className="text-sm text-[#6B6966]">
          Manage prices, stock, descriptions and active status. Click any price or stock figure to edit inline.
        </p>
      </div>

      <ProductsClient products={products} />
    </main>
  );
}

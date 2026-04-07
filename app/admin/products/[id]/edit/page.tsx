import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditProductClient from "./EditProductClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, brand_slug, name, slug, sku, short_description, description, price_cents, is_active, subcategory, stock_quantity"
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

const BRAND_LABELS: Record<string, string> = {
  dermaceutic: "Dermaceutic",
  heliocare: "Heliocare",
  isdin: "ISDIN",
  mesoestetic: "Mesoestetic",
  neostrata: "NeoStrata",
  skinceuticals: "SkinCeuticals",
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B6966] mb-6">
        <Link href="/admin/products" className="hover:text-[#0F2647] transition-colors">
          ← Products
        </Link>
        <span>/</span>
        <span className="text-[#1A1917]">{product.name}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">
            {BRAND_LABELS[product.brand_slug] ?? product.brand_slug}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 ${
            product.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}>
            {product.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1917]">{product.name}</h1>
        <p className="text-xs text-[#939EBA] mt-1 font-mono">slug: {product.slug}</p>
      </div>

      <EditProductClient product={product} />
    </main>
  );
}

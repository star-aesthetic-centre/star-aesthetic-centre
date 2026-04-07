import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import { brands, getBrandBySlug, type BrandSubcategory } from "@/lib/brands";
import { getProductsByBrand, getPrimaryImage, type SupabaseProduct } from "@/lib/queries/supabase-products";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `Shop ${brand.name} | Star Aesthetic Centre`,
    description: brand.tagline,
  };
}

export function generateStaticParams() {
  return brands.map((brand) => ({ brand: brand.slug }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BrandArchivePage({ params }: PageProps) {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);

  if (!brand) notFound();

  const products = await getProductsByBrand(brandSlug);

  // Group products by subcategory if any have one (e.g. NeoStrata ranges)
  const hasSubcategories = products.some((p) => p.subcategory);
  const subcategoryGroups: Array<{
    key: string;
    meta: BrandSubcategory | null;
    items: SupabaseProduct[];
  }> = [];

  if (hasSubcategories) {
    // Build ordered groups preserving subcategory_sort order
    const seen = new Set<string>();
    const noSubcat: SupabaseProduct[] = [];
    for (const p of products) {
      if (!p.subcategory) { noSubcat.push(p); continue; }
      if (!seen.has(p.subcategory)) {
        seen.add(p.subcategory);
        subcategoryGroups.push({
          key: p.subcategory,
          meta: brand.subcategoryDescriptions?.[p.subcategory] ?? null,
          items: [],
        });
      }
      subcategoryGroups.find((g) => g.key === p.subcategory)!.items.push(p);
    }
    if (noSubcat.length > 0) {
      subcategoryGroups.push({ key: "__other", meta: null, items: noSubcat });
    }
  }

  return (
    <div className="bg-[#F7F7F8] min-h-screen">
      {/* Top accent colour strip */}
      <div className="h-2 w-full" style={{ backgroundColor: brand.accent }} />

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 text-xs text-[#636374]">
          <Link href="/" className="hover:text-[#939EBA] font-medium transition-colors">Home</Link>
          <span className="text-[#E2E2E6]">›</span>
          <Link href="/shop" className="hover:text-[#939EBA] font-medium transition-colors">Shop</Link>
          <span className="text-[#E2E2E6]">›</span>
          <span className="text-[#1A1A1F] font-semibold">{brand.name}</span>
        </nav>

        {/* Brand Hero */}
        <div className="bg-white border border-[#E2E2E6] p-8 md:p-12 mb-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative h-32 w-64 sm:h-40 sm:w-80">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold text-[#1A1A1F] uppercase tracking-wide hidden md:block">
              {brand.name}
            </h1>
            <p className="text-lg font-bold" style={{ color: brand.accent }}>
              {brand.tagline}
            </p>
            <p className="text-[#636374] leading-relaxed max-w-2xl mx-auto md:mx-0">
              {brand.shortDescription}
            </p>
          </div>
        </div>

        {/* Layout Grid (Sidebar + Products) */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Brand Meta Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white border border-[#E2E2E6] p-8 sticky top-24">
              <div className="mb-6 pb-4 border-b border-[#E2E2E6]">
                <h2 className="text-lg font-bold font-heading text-[#1A1A1F] flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F8]">
                    🌟
                  </span>
                  Dr. Bangalee Recommends
                </h2>
              </div>
              {brand.whyWeStock ? (
                <p className="text-[#636374] leading-relaxed text-sm italic">
                  &ldquo;{brand.whyWeStock}&rdquo;
                </p>
              ) : (
                <p className="text-[#636374] leading-relaxed text-sm italic">
                  A trusted brand stocked and recommended by Dr. Bangalee.
                </p>
              )}

              {brand.about && (
                <div className="mt-8 pt-6 border-t border-[#E2E2E6]">
                  <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-[#1A1A1F]">
                    About {brand.name}
                  </h3>
                  <p className="text-sm text-[#636374] leading-relaxed">{brand.about}</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[#E2E2E6]">
                <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-[#1A1A1F]">
                  Explore More Brands
                </h3>
                <div className="space-y-2">
                  {brands.filter((b) => b.slug !== brand.slug).map((b) => (
                    <Link
                      key={b.slug}
                      href={`/shop/brands/${b.slug}`}
                      className="block text-sm text-[#636374] hover:text-[#1A1A1F] hover:underline"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E2E6]">
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1F]">
                {brand.name} Products
              </h2>
              <p className="text-sm font-bold text-[#636374] uppercase tracking-widest">
                {products.length} {products.length === 1 ? "Item" : "Items"}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#E2E2E6]">
                <p className="text-lg text-[#636374]">No {brand.name} products found.</p>
                <p className="text-sm text-[#939EBA] mt-2">
                  Products are being added. Please check back soon.
                </p>
              </div>
            ) : hasSubcategories ? (
              /* ── Grouped by range (NeoStrata etc.) ── */
              <div className="space-y-12">
                {subcategoryGroups.map((group) => (
                  <div key={group.key}>
                    {/* Range header */}
                    {group.meta && (
                      <div className="mb-6 pb-3 border-b-2 border-[#E5E4E0]">
                        <h3 className="font-heading text-xl font-bold text-[#1A1917] uppercase tracking-wider">
                          {group.meta.label}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B6966]">{group.meta.subtitle}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {group.items.map((product) => (
                        <ProductCard
                          key={product.id}
                          name={product.name}
                          slug={product.slug}
                          brand={brand.name}
                          priceNumber={product.price}
                          imageUrl={getPrimaryImage(product.images)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Flat grid (all other brands) ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    slug={product.slug}
                    brand={brand.name}
                    priceNumber={product.price}
                    imageUrl={getPrimaryImage(product.images)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

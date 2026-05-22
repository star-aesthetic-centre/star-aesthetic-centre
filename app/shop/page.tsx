import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import ShopPageContent from "@/components/shop/ShopPageContent";
import ShopHero from "@/components/shop/ShopHero";
import BrandShowcase from "@/components/shop/BrandShowcase";
import BrandComparisonTable from "@/components/shop/BrandComparisonTable";
import { buildPageMetadata } from "@/lib/seo";
import { brands } from "@/lib/brands";
import { getAllProducts, getPrimaryImage } from "@/lib/queries/supabase-products";
import type { ShopProduct } from "@/lib/shop-types";

export const metadata: Metadata = buildPageMetadata({
  title: "Medical Skincare Shop | Find Your Skin's Perfect Brand | Star Aesthetic Centre",
  description:
    "Not sure which skincare brand is right for you? Take our 3-minute AI skin assessment or browse Dermaceutic, SkinCeuticals, Mesoestetic, NeoStrata, Heliocare and ISDIN — curated by Dr. Rajeev Bangalee.",
  path: "/shop",
  keywords: [
    "medical skincare Durban North",
    "cosmeceuticals online South Africa",
    "Dermaceutic Durban",
    "SkinCeuticals Durban",
    "Mesoestetic stockist Durban",
    "doctor recommended skincare",
    "skin assessment online South Africa",
    "which skincare brand is right for me",
  ],
});

export const revalidate = 3600;

function toShopProducts(
  products: Awaited<ReturnType<typeof getAllProducts>>
): ShopProduct[] {
  return products.map((p) => {
    const brand = brands.find((b) => b.slug === p.brand_slug);
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      brandSlug: p.brand_slug,
      brandName: brand?.name ?? p.brand_slug,
      subcategory: p.subcategory,
      price: p.price,
      imageUrl: getPrimaryImage(p.images),
    };
  });
}

export default async function ShopPage() {
  const products = toShopProducts(await getAllProducts());

  return (
    <div className="min-h-screen bg-[#F7F7F8]">

      {/* Breadcrumb */}
      <div className="border-b border-[#E2E2E6] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#939EBA]">
            <Link href="/" className="transition-colors hover:text-[#7A87A6]">
              Home
            </Link>
            <span className="text-[#E2E2E6]">/</span>
            <span className="font-medium text-[#1A1A1F]">Shop</span>
          </nav>
        </div>
      </div>

      {/* ── 1. Skin Assessment Hero ──────────────────────────────────────── */}
      <ShopHero />

      {/* ── 2. Brand Showcase — who each brand is and who it's for ───────── */}
      <BrandShowcase />

      {/* ── 3. Brand Comparison Matrix ───────────────────────────────────── */}
      <BrandComparisonTable />

      {/* ── 4. All Products ──────────────────────────────────────────────── */}
      <div id="shop-products" className="bg-[#F7F7F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#939EBA]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
                All Products
              </span>
            </div>
            <h2 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-bold uppercase leading-[1.1] tracking-wide text-[#1A1A1F]">
              Browse the full range
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#636374]">
              Filter by brand, search by name, or browse everything — all products are
              pharmaceutical-grade and stocked by Dr. Rajeev Bangalee's team in Durban North.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="py-24 text-center text-sm text-[#636374]">
                Loading products…
              </div>
            }
          >
            <ShopPageContent products={products} />
          </Suspense>
        </div>
      </div>

    </div>
  );
}

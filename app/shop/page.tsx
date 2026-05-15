import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import ShopPageContent from "@/components/shop/ShopPageContent";
import { buildPageMetadata } from "@/lib/seo";
import { brands } from "@/lib/brands";
import { getAllProducts, getPrimaryImage } from "@/lib/queries/supabase-products";
import type { ShopProduct } from "@/lib/shop-types";

export const metadata: Metadata = buildPageMetadata({
  title: "Shop Medical Skincare | Star Aesthetic Centre",
  description:
    "Shop pharmaceutical-grade skincare curated by Dr. Rajeev Bangalee — Dermaceutic, SkinCeuticals, Mesoestetic, NeoStrata, Heliocare and ISDIN. Buy online with delivery across South Africa.",
  path: "/shop",
  keywords: [
    "medical skincare Durban North",
    "cosmeceuticals online South Africa",
    "Dermaceutic Durban",
    "SkinCeuticals Durban",
    "Mesoestetic stockist Durban",
    "doctor recommended skincare",
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
      <div className="border-b border-[#E2E2E6] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#939EBA]">
            <Link href="/" className="transition-colors hover:text-[#7A87A6]">
              Home
            </Link>
            <span className="text-[#E2E2E6]">/</span>
            <span className="font-medium text-[#1A1A1F]">Shop</span>
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <header className="mb-8 lg:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-2">
            Star Aesthetic Centre
          </p>
          <h1 className="font-heading text-3xl font-bold text-[#1A1A1F] lg:text-4xl">
            Shop Medical Skincare
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#636374] leading-relaxed">
            Pharmaceutical-grade skincare curated by Dr. Rajeev Bangalee — browse by brand,
            search products, and order online with delivery across South Africa.
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
      </main>
    </div>
  );
}

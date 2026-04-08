import Link from "next/link";
import Image from "next/image";
import { getProductsByBrand, getPrimaryImage } from "@/lib/queries/supabase-products";

export default async function FeaturedProducts() {
  const products = await getProductsByBrand("dermaceutic");
  const featured = products.slice(0, 8);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#939EBA]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                Extend Your Results
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
              Dr. Bangalee&apos;s
              <br />skincare picks.
            </h2>
          </div>
          <div className="sm:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-[#636374]">
              Pharmaceutical-grade products, personally curated to maintain your treatment results.
            </p>
            <Link
              href="/shop"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#939EBA] transition-all hover:gap-3"
            >
              View all products
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {featured.map((product) => {
            const imageUrl = getPrimaryImage(product.images);
            const price = product.price != null
              ? new Intl.NumberFormat("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)
              : null;

            return (
              <Link
                key={product.id}
                href={`/shop/products/${product.slug}`}
                className="group block no-underline border border-[#E2E2E6] bg-white transition-all hover:-translate-y-1 hover:border-[#939EBA]/30 hover:shadow-lg hover:shadow-[#939EBA]/10 focus:outline-none focus:ring-2 focus:ring-[#939EBA] focus:ring-offset-2"
              >
                {/* Product image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F8]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xs font-semibold text-[#939EBA]">Dermaceutic</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View Product
                  </div>
                </div>

                {/* Card info */}
                <div className="p-3.5 sm:p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
                    Dermaceutic
                  </p>
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#1A1A1F] group-hover:text-[#939EBA] transition-colors">
                    {product.name}
                  </h3>
                  {price && (
                    <p className="mt-2 font-heading text-sm font-bold text-[#939EBA]">
                      R {price}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

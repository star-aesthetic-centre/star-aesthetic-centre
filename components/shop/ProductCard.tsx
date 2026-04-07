"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  slug: string;
  brand: string;
  /** Numeric price in ZAR (Supabase) — preferred */
  priceNumber?: number | null;
  /** Legacy formatted price string from WooCommerce (fallback) */
  price?: string | null;
  /** Primary image URL (string) */
  imageUrl?: string | null;
  /** Legacy WooCommerce image object (fallback) */
  image?: { sourceUrl: string; altText: string } | null;
}

export default function ProductCard({
  name,
  slug,
  brand,
  priceNumber,
  price,
  imageUrl,
  image,
}: ProductCardProps) {
  // Resolve display price
  let displayPrice: string | null = null;
  if (priceNumber != null) {
    displayPrice = new Intl.NumberFormat("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceNumber);
  } else if (price) {
    displayPrice = price.replace("R", "").replace(/&nbsp;/g, " ").trim();
  }

  // Resolve image source
  const imgSrc = imageUrl ?? image?.sourceUrl ?? null;
  const imgAlt = image?.altText || name;

  return (
    <Link
      href={`/shop/products/${slug}`}
      className="group relative flex flex-col overflow-hidden border border-[#E2E2E6] bg-white transition-all hover:-translate-y-1 hover:border-[#939EBA]/30 hover:shadow-lg hover:shadow-[#939EBA]/10"
    >
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F8]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs font-semibold text-[#939EBA]">{brand}</span>
          </div>
        )}

        {/* Hover overlay — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          View Product
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
          {brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1A1A1F]">
          {name}
        </h3>
        {displayPrice && (
          <p className="mt-2 font-heading text-sm font-bold text-[#1A1A1F]">
            R {displayPrice}
          </p>
        )}
      </div>
    </Link>
  );
}

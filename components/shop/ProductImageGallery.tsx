"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: { url: string; alt_text: string }[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
  const primary = images[0];
  const thumbnails = images.slice(1, 4); // max 3 thumbnails

  const [activeUrl, setActiveUrl] = useState(primary?.url ?? "");
  const [activeAlt, setActiveAlt] = useState(primary?.alt_text || productName);

  if (!primary) {
    return (
      <div className="relative aspect-square w-full bg-[#F7F7F8] flex items-center justify-center">
        <span className="text-sm text-[#939EBA]">{productName}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F8]">
        <Image
          src={activeUrl}
          alt={activeAlt}
          fill
          unoptimized
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>

      {/* Thumbnails — 4 equal columns filling full width */}
      {thumbnails.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {/* Primary thumb */}
          <button
            onClick={() => { setActiveUrl(primary.url); setActiveAlt(primary.alt_text || productName); }}
            className={`relative aspect-square w-full overflow-hidden border-2 transition-colors ${
              activeUrl === primary.url ? "border-[#939EBA]" : "border-[#E2E2E6] hover:border-[#939EBA]/50"
            }`}
            aria-label="View main image"
          >
            <Image src={primary.url} alt={primary.alt_text || productName} fill unoptimized className="object-cover" sizes="25vw" />
          </button>

          {thumbnails.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActiveUrl(img.url); setActiveAlt(img.alt_text || productName); }}
              className={`relative aspect-square w-full overflow-hidden border-2 transition-colors ${
                activeUrl === img.url ? "border-[#939EBA]" : "border-[#E2E2E6] hover:border-[#939EBA]/50"
              }`}
              aria-label={`View image ${i + 2}`}
            >
              <Image src={img.url} alt={img.alt_text || productName} fill unoptimized className="object-cover" sizes="25vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

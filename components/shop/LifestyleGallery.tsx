"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  alt_text?: string | null;
}

interface Props {
  images: GalleryImage[];
  productName: string;
}

export default function LifestyleGallery({ images, productName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const cols =
    images.length === 1 ? "grid-cols-1" :
    images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
    images.length <= 4 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4" :
    "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <>
      <section className="bg-white py-12 border-t border-[#E2E2E6]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-3 ${cols}`}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square w-full overflow-hidden bg-[#F7F7F8] shadow-sm border border-[#E5E4E0] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A882]"
                aria-label={`View ${img.alt_text || productName} enlarged`}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text || productName}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Image */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className="flex items-center justify-center max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Plain img — no Next.js fill constraints in lightbox */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt_text || productName}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

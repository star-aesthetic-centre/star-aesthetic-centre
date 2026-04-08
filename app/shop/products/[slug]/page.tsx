import Link from "next/link";
import Image from "next/image";
import { Truck, RotateCcw } from "lucide-react";
import { RewardsCard } from "@/components/shared/RewardsCard";
import { GiftVoucherCard } from "@/components/shared/GiftVoucherCard";
import type { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import AddToCartControls from "@/components/shop/AddToCartControls";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import LifestyleGallery from "@/components/shop/LifestyleGallery";
import ProductStarRating from "@/components/shop/ProductStarRating";
import NikiProductCard from "@/components/shop/NikiProductCard";
import ProductTrustBadges from "@/components/shop/ProductTrustBadges";
import { getProductBySlug, getRelatedProducts, getPrimaryImage, formatPrice, getTreatmentsForProduct } from "@/lib/queries/supabase-products";
import { getBrandBySlug } from "@/lib/brands";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} | Star Aesthetic Centre` : "Product",
    description: product?.short_description?.replace(/<[^>]+>/g, "").slice(0, 160) ?? undefined,
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <h1 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-2">Product not found</h1>
        <p className="text-[#636374] mb-6">This product may have been removed or renamed.</p>
        <Link href="/shop" className="btn-primary">← Back to Shop</Link>
      </div>
    );
  }

  const brand = getBrandBySlug(product.brand_slug);
  const brandName = brand?.name ?? product.brand_slug;
  const priceFormatted = formatPrice(product.price);
  const priceNumber = product.price ?? 0;

  // Images split by sort_order:
  //   0       = primary (card + hero)
  //   1–3     = thumbnails (below main image)
  //   4+      = description / lifestyle images (landscape gallery in description)
  const primaryImage = getPrimaryImage(product.images);
  const descriptionImages = product.images.filter((img) => img.sort_order >= 4);

  // Related products from same brand
  const related = await getRelatedProducts(product.brand_slug, product.slug, 4);

  // Treatments that recommend this product
  const treatmentLinks = await getTreatmentsForProduct(product.id);

  return (
    <>
      {/* Product header */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-xs text-[#636374]">
            <Link href="/" className="hover:text-[#939EBA] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/shop" className="hover:text-[#939EBA] transition-colors">Shop</Link>
            <span className="mx-2">›</span>
            <Link
              href={`/shop/brands/${product.brand_slug}`}
              className="hover:text-[#939EBA] transition-colors capitalize"
            >
              {brandName}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-[#1A1A1F]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_55%]">
            {/* Image gallery — left */}
            <div>
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
              <NikiProductCard productName={product.name} />
            </div>

            {/* Product info — right */}
            <div>
              <span className="overline mb-2 block">{brandName}</span>
              <h1 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-3">{product.name}</h1>
              <ProductStarRating productId={product.id} productName={product.name} />

              {product.short_description && (
                <div
                  className="mb-6 text-base leading-relaxed text-[#636374] [&_strong]:![font-weight:450] [&_strong]:!text-[#636374] [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 last:[&_p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              <hr className="mb-6 border-[#E2E2E6]" />

              {/* Price */}
              <div className="mb-2">
                {priceFormatted ? (
                  <>
                    <span className="font-heading text-3xl font-bold text-[#1A1A1F]">
                      R {priceFormatted}
                    </span>
                    <span className="ml-2 text-sm text-[#636374]">Inc VAT</span>
                  </>
                ) : (
                  <span className="text-sm text-[#636374]">Price on request</span>
                )}
              </div>
              {product.sku && (
                <p className="mb-6 text-xs text-[#636374]">SKU: {product.sku}</p>
              )}

              {/* Qty + Add to Cart */}
              <div className="mb-4">
                <AddToCartControls
                  productId={product.id}
                  productSlug={product.slug}
                  productName={product.name}
                  productImage={primaryImage ?? ""}
                  productPrice={priceNumber}
                />
              </div>

              {/* WhatsApp order */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27315731325"}?text=Hi%2C%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}%20from%20Star%20Aesthetic%20Centre.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex w-full items-center justify-center border border-[#939EBA] py-3.5 text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
              >
                WhatsApp to Order
              </a>

              {/* Trust icons */}
              <div className="flex flex-col gap-2.5 text-xs text-[#636374]">
                <span className="flex items-center gap-2">
                  <Truck size={14} className="text-[#939EBA]" />
                  <Link href="/legal/shipping" className="hover:text-[#0F2647] transition-colors underline underline-offset-2">
                    Free delivery on orders over R800
                  </Link>
                  <span className="text-[#E5E4E0]">·</span>
                  <span>R120 standard</span>
                </span>
                <span className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-[#939EBA]" />
                  30-day returns · Dr. Bangalee recommended
                </span>
              </div>

              {/* SSL + Payment icons */}
              <ProductTrustBadges />

              {/* Rewards Programme card */}
              <RewardsCard price={priceNumber} />

              {/* Gift Vouchers card */}
              <GiftVoucherCard />
            </div>
          </div>
        </div>
      </section>

      {/* Full description */}
      {product.description && (
        <section className="bg-[#F7F7F8] py-12 border-t border-[#E2E2E6]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-6">About This Product</h2>
            <div
              className="prose prose-sm max-w-none text-[#636374] leading-relaxed [&_strong]:![font-weight:450] [&_strong]:!text-[#636374] [&_b]:![font-weight:450] [&_b]:!text-[#636374]"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      )}

      {/* Description / Lifestyle Image Gallery (sort_order 4+) */}
      {descriptionImages.length > 0 && (
        <LifestyleGallery images={descriptionImages} productName={product.name} />
      )}

      {/* Bottom Call to Action */}
      <section className="bg-white py-16 border-t border-[#E2E2E6]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F7F8] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 bg-white border border-[#E2E2E6] overflow-hidden">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#F7F7F8]">
                  <span className="text-xs text-[#939EBA]">{product.name}</span>
                </div>
              )}
            </div>

            <div className="flex-grow text-center md:text-left">
              <span className="overline mb-2 block">{brandName}</span>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-4">{product.name}</h2>
              {priceFormatted && (
                <div className="text-2xl font-bold text-[#1A1A1F] mb-6">
                  R {priceFormatted} <span className="text-sm font-normal text-[#636374]">incl VAT</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <AddToCartControls
                  productId={product.id}
                  productSlug={product.slug}
                  productName={product.name}
                  productImage={primaryImage ?? ""}
                  productPrice={priceNumber}
                  showQuantity={false}
                />
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27315731325"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center border border-[#939EBA] px-8 py-4 font-semibold text-[#939EBA] hover:bg-[#EEF0F6] transition-colors"
                >
                  WhatsApp to Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended for these treatments */}
      {treatmentLinks.length > 0 && (
        <section className="bg-[#F7F7F8] py-12 border-t border-[#E2E2E6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-2">
              Recommended for These Treatments
            </h2>
            <p className="text-sm text-[#636374] mb-8">
              Dr. Bangalee includes this product in the protocol for the following treatments.
            </p>
            <div className="flex flex-wrap gap-3">
              {treatmentLinks.map((link) => (
                <a
                  key={link.treatment_slug}
                  href={`/treatments/${link.treatment_category}/${link.treatment_slug}`}
                  className="group flex items-center gap-3 bg-white border border-[#E2E2E6] hover:border-[#939EBA] px-5 py-3 transition-colors"
                >
                  {link.is_essential && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#939EBA] text-white px-2 py-0.5">
                      Essential
                    </span>
                  )}
                  <span className="font-semibold text-sm text-[#1A1A1F] group-hover:text-[#939EBA] transition-colors">
                    {link.treatment_title}
                  </span>
                  <span className="text-xs text-[#939EBA]">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-[#F7F7F8] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-8">
              Complete Your Routine
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((rel) => (
                <ProductCard
                  key={rel.id}
                  name={rel.name}
                  slug={rel.slug}
                  brand={brandName}
                  priceNumber={rel.price}
                  imageUrl={getPrimaryImage(rel.images)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import graphqlClient from "@/lib/graphql-client";
import { GET_PRODUCT } from "@/lib/queries/products";
import type { ProductDetail } from "@/lib/queries/products";
import ProductCard from "@/components/shop/ProductCard";
import ProductDescription from "@/components/shop/ProductDescription";
import AddToCartControls from "@/components/shop/AddToCartControls";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<ProductDetail | null> {
    try {
        const data = await graphqlClient.request<{ product: ProductDetail }>(
            GET_PRODUCT,
            { slug }
        );
        return data.product;
    } catch (e) {
        console.error("GraphQL Product Detail Fetch Error:", e);
        return null;
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);
    return {
        title: product?.name ?? "Product",
        description: product?.shortDescription?.replace(/<[^>]+>/g, "").slice(0, 160),
    };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    // Derive brand from first category node
    const brand = product?.productCategories?.nodes?.[0]?.name?.split(" › ")?.[0] ?? "Star Aesthetic";

    if (!product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h1 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-2">
                    Product not found
                </h1>
                <p className="text-[#636374] mb-6">
                    This product may not be in WooCommerce yet.
                </p>
                <Link href="/shop" className="btn-primary">← Back to Shop</Link>
            </div>
        );
    }

    const allImages = [product.image, ...(product.galleryImages?.nodes ?? [])].filter(Boolean);
    const priceFormatted = product.price?.replace("R", "").replace("&nbsp;", " ").trim();
    const priceNumber = parseFloat(
        (product.price ?? "0").replace(/R|&nbsp;|,|\s/g, "")
    ) || 0;
    const tags = product.productTags?.nodes?.map((t) => t.name) ?? [];

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
                        <span className="text-[#1A1A1F] capitalize">{brand}</span>
                        <span className="mx-2">›</span>
                        <span className="text-[#1A1A1F]">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_55%]">
                        {/* Image gallery — left */}
                        <div>
                            {/* Main image */}
                            <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F8]">
                                {allImages[0]?.sourceUrl ? (
                                    <Image
                                        src={allImages[0].sourceUrl}
                                        alt={allImages[0].altText || product.name}
                                        fill unoptimized={true}
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 45vw"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-sm text-[#939EBA]">{product.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="mt-3 flex gap-2 overflow-x-auto">
                                    {allImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-[#E2E2E6] bg-[#F7F7F8]"
                                        >
                                            {img?.sourceUrl && (
                                                <Image
                                                    src={img.sourceUrl}
                                                    alt={img.altText || `${product.name} ${i + 1}`}
                                                    fill unoptimized={true}
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product info — right */}
                        <div>
                            {/* Brand */}
                            <span className="overline mb-2 block">{brand}</span>

                            {/* Product name */}
                            <h1 className="font-heading text-3xl font-bold text-[#1A1A1F] mb-3">
                                {product.name}
                            </h1>

                            {/* Category tags */}
                            {tags.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className=" bg-[#EEF0F6] px-3 py-1 text-xs font-medium text-[#939EBA]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Short description */}
                            {product.shortDescription && (
                                <p
                                    className="mb-6 text-base leading-relaxed text-[#636374]"
                                    dangerouslySetInnerHTML={{
                                        __html: product.shortDescription,
                                    }}
                                />
                            )}

                            {/* Divider */}
                            <hr className="mb-6 border-[#E2E2E6]" />

                            {/* Price */}
                            <div className="mb-2">
                                <span className="font-heading text-3xl font-bold text-[#1A1A1F]">
                                    R {priceFormatted}
                                </span>
                                <span className="ml-2 text-sm text-[#636374]">Inc VAT</span>
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
                                    productImage={product.image?.sourceUrl ?? ""}
                                    productPrice={priceNumber}
                                />
                            </div>

                            {/* WhatsApp order */}
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "27000000000"}?text=Hi%2C%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}%20from%20Star%20Aesthetic%20Centre.`}
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
                                    Free shipping on orders over R999
                                </span>
                                <span className="flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[#939EBA]" />
                                    Dr. Bangalee recommended
                                </span>
                                <span className="flex items-center gap-2">
                                    <RotateCcw size={14} className="text-[#939EBA]" />
                                    30-day returns
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Full-Width Parsed Content Sections */}
            {product.description && (
                <ProductDescription html={product.description} />
            )}

            {/* Bottom Call to Action */}
            <section className="bg-white py-16 border-t border-[#E2E2E6]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#F7F7F8] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">

                        {/* Thumbnail */}
                        <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 bg-white border border-[#E2E2E6] overflow-hidden">
                            {allImages[0]?.sourceUrl ? (
                                <Image
                                    src={allImages[0].sourceUrl}
                                    alt={allImages[0].altText || product.name}
                                    fill unoptimized={true}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#F7F7F8]">
                                    <span className="text-xs text-[#939EBA]">{product.name}</span>
                                </div>
                            )}
                        </div>

                        {/* CTA Info */}
                        <div className="flex-grow text-center md:text-left">
                            <span className="overline mb-2 block">{brand}</span>
                            <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-4">
                                {product.name}
                            </h2>
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
                                    productImage={product.image?.sourceUrl ?? ""}
                                    productPrice={priceNumber}
                                    showQuantity={false}
                                />
                                <a
                                    href="https://wa.me/27830000000"
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto flex items-center justify-center border border-[#939EBA] px-8 py-4 font-semibold text-[#939EBA] hover:bg-[#EEF0F6] transition-colors"
                                >
                                    WhatsApp to Order
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related products */}
            {product.related?.nodes?.length > 0 && (
                <section className="bg-[#F7F7F8] py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-8">
                            Complete Your Routine
                        </h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {product.related.nodes.slice(0, 4).map((rel) => (
                                <ProductCard
                                    key={rel.id}
                                    name={rel.name}
                                    slug={rel.slug}
                                    brand={rel.productCategories?.nodes?.[0]?.name?.split(" › ")?.[0] ?? ""}
                                    price={rel.price}
                                    image={rel.image}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

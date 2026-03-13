import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import graphqlClient from "@/lib/graphql-client";
import { GET_PRODUCTS_BY_CATEGORY_SLUG, ProductNode } from "@/lib/queries/products";
import { brands, getBrandBySlug, getBrandFromCategoryName } from "@/lib/brands";

interface PageProps {
    params: Promise<{ brand: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const brand = getBrandBySlug(resolvedParams.brand);
    if (!brand) return { title: "Brand Not Found" };

    return {
        title: `Shop ${brand.name} | Star Aesthetic Centre`,
        description: brand.tagline,
    };
}

export function generateStaticParams() {
    return brands.map((brand) => ({
        brand: brand.slug,
    }));
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

async function getBrandProducts(categorySlug: string): Promise<ProductNode[]> {
    try {
        const data = await graphqlClient.request<{ products: { nodes: ProductNode[] } }>(
            GET_PRODUCTS_BY_CATEGORY_SLUG,
            { categorySlug, first: 100 }
        );
        return data.products.nodes;
    } catch (e) {
        console.error("Brand Products GraphQL Fetch Error:", e);
        return [];
    }
}

function getBrandFromProduct(product: ProductNode): string {
    const cats = product.productCategories?.nodes ?? [];
    const catName = cats[0]?.name ?? "";
    const brand = getBrandFromCategoryName(catName);
    return brand ? brand.name : catName || "Star Aesthetic";
}

export default async function BrandArchivePage({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const brand = getBrandBySlug(resolvedParams.brand);

    if (!brand) {
        notFound();
    }

    const products = await getBrandProducts(brand.categorySlug);

    return (
        <div className="bg-[#F7F7F8] min-h-screen">
            {/* Top accent colour strip */}
            <div className="h-2 w-full" style={{ backgroundColor: brand.accent }} />

            <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-12 text-xs text-[#636374]">
                    <Link href="/" className="hover:text-[#939EBA] font-medium transition-colors">
                        Home
                    </Link>
                    <span className="text-[#E2E2E6]">›</span>
                    <Link href="/shop" className="hover:text-[#939EBA] font-medium transition-colors">
                        Shop
                    </Link>
                    <span className="text-[#E2E2E6]">›</span>
                    <span className="text-[#1A1A1F] font-semibold">{brand.name}</span>
                </nav>

                {/* Brand Hero */}
                <div className="bg-white border border-[#E2E2E6] p-8 md:p-12 mb-12 uk-card-default grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                        <div className="relative h-20 w-44 sm:h-24 sm:w-56">
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
                        {/* Why We Stock */}
                        <div className="bg-white border border-[#E2E2E6] p-8 sticky top-24 uk-card-default">
                            <div className="mb-6 pb-4 border-b border-[#E2E2E6]">
                                <h2 className="text-lg font-bold font-heading text-[#1A1A1F] flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F8]">
                                        🌟
                                    </span>
                                    Dr. Bangalee Recommends
                                </h2>
                            </div>
                            <p className="text-[#636374] leading-relaxed text-sm italic">
                                "{brand.whyWeStock}"
                            </p>

                            <div className="mt-8 pt-6 border-t border-[#E2E2E6]">
                                <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-[#1A1A1F]">
                                    About {brand.name}
                                </h3>
                                <p className="text-sm text-[#636374] leading-relaxed">
                                    {brand.about}
                                </p>
                            </div>

                            {/* Explore Other Brands Link block */}
                            <div className="mt-8 pt-6 border-t border-[#E2E2E6]">
                                <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-[#1A1A1F]">
                                    Explore More Brands
                                </h3>
                                <div className="space-y-2">
                                    {brands.filter(b => b.slug !== brand.slug).map(b => (
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
                                {products.length} Items
                            </p>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        slug={product.slug}
                                        brand={getBrandFromProduct(product)}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 text-center border border-[#E2E2E6] uk-card-default">
                                <p className="text-lg text-[#636374]">No {brand.name} products found.</p>
                                <p className="text-sm text-[#939EBA] mt-2">Check if the WooCommerce category slug matches "{brand.categorySlug}".</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

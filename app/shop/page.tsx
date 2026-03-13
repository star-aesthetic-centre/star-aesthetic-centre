import Link from "next/link";
import Image from "next/image";
import { ChevronDown, SlidersHorizontal, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import graphqlClient from "@/lib/graphql-client";
import { GET_PRODUCTS_BY_BRAND } from "@/lib/queries/products";
import type { ProductNode } from "@/lib/queries/products";
import { brands, getBrandFromCategoryName } from "@/lib/brands";

export const metadata: Metadata = {
    title: "Shop Medical Skincare | Star Aesthetic Centre",
    description:
        "Every product in our shop is curated by Dr. Rajeev Bangalee — clinically proven, pharmaceutical-grade skincare for real results at home.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getBrandFromProduct(product: ProductNode): string {
    const cats = product.productCategories?.nodes ?? [];
    const catName = cats[0]?.name ?? "";
    const brand = getBrandFromCategoryName(catName);
    return brand ? brand.name : catName || "Star Aesthetic";
}

async function getProducts(): Promise<ProductNode[]> {
    try {
        const data = await graphqlClient.request<{ products: { nodes: ProductNode[] } }>(
            GET_PRODUCTS_BY_BRAND,
            { first: 100 }
        );
        return data.products.nodes;
    } catch (e) {
        console.error("Shop GraphQL Fetch Error:", e);
        return [];
    }
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="bg-[#F7F7F8] min-h-screen">
            <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-xs text-[#636374]">
                    <Link href="/" className="hover:text-[#939EBA] font-medium transition-colors">
                        Home
                    </Link>
                    <span className="text-[#E2E2E6]">›</span>
                    <span className="text-[#1A1A1F] font-semibold">Shop Medical Skincare</span>
                </nav>

                {/* Page Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-tight text-[#1A1A1F]">
                            Shop Medical Skincare
                        </h1>
                        <p className="text-[#636374] font-medium max-w-2xl text-lg">
                            Pharmaceutical-grade skincare — clinically proven, personally curated to maintain your treatment results at home.
                        </p>
                        <p className="text-[#939EBA] font-bold text-sm uppercase tracking-widest mt-2">
                            {products.length} Products Available
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#636374]">Sort by:</span>
                        <select className="bg-white border border-[#E2E2E6] text-sm px-4 py-2 text-[#1A1A1F] focus:ring-[#939EBA] focus:border-[#939EBA] cursor-pointer outline-none transition-colors">
                            <option>Best Selling</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Side Navigation Filter */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="bg-white border border-[#E2E2E6] p-6 sticky top-24 uk-card-default">

                            <div className="flex items-center gap-2 mb-6 border-b border-[#E2E2E6] pb-4">
                                <SlidersHorizontal size={20} className="text-[#1A1A1F]" />
                                <h2 className="text-xl font-bold font-heading text-[#1A1A1F]">Shop By Brand</h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                {brands.map((brand) => (
                                    <Link
                                        key={brand.slug}
                                        href={`/shop/brands/${brand.slug}`}
                                        className="group flex items-center justify-center p-4 border border-[#E2E2E6] bg-[#F7F7F8] hover:bg-white hover:border-[#939EBA] transition-all"
                                    >
                                        <div className="relative h-16 w-40 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                                            <Image
                                                src={brand.logo}
                                                alt={brand.name}
                                                fill
                                                unoptimized
                                                className="object-contain"
                                                sizes="112px"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#E2E2E6]">
                                <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-[#1A1A1F]">
                                    Our Promise
                                </h3>
                                <p className="text-sm text-[#636374] leading-relaxed">
                                    Every product is clinically proven, pharmaceutical-grade skincare carefully curated by Dr. Rajeev Bangalee for real results at home.
                                </p>
                            </div>

                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">

                        {/* Brand Showcase Hero */}
                        <div className="mb-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {brands.map((brand) => {
                                const count = products.filter(p => getBrandFromProduct(p) === brand.name).length;
                                return (
                                    <Link
                                        key={brand.slug}
                                        href={`/shop/brands/${brand.slug}`}
                                        className="group bg-white border border-[#E2E2E6] p-6 hover:border-[#939EBA] hover:shadow-sm transition-all flex flex-col items-center justify-center gap-4 uk-card-default"
                                    >
                                        <div className="relative h-20 w-48">
                                            <Image
                                                src={brand.logo}
                                                alt={brand.name}
                                                fill
                                                unoptimized
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-[#636374] group-hover:text-[#939EBA] transition-colors uppercase tracking-widest">
                                            {count > 0 ? `${count} Products` : 'Shop Range'}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-[#1A1A1F] mb-6 pt-4 border-t border-[#E2E2E6]">All Products</h3>

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

                        {/* Pagination Placeholder */}
                        {products.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-[#E2E2E6] flex items-center justify-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center border border-[#E2E2E6] bg-white hover:bg-[#F7F7F8] text-[#636374] transition-colors">
                                    <ArrowRight className="rotate-180" size={16} />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center bg-[#1A1A1F] text-white font-bold">
                                    1
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center border border-[#E2E2E6] bg-white hover:bg-[#F7F7F8] text-[#636374] transition-colors">
                                    2
                                </button>
                                <span className="px-2 text-[#636374]">...</span>
                                <button className="w-10 h-10 flex items-center justify-center border border-[#E2E2E6] bg-white hover:bg-[#F7F7F8] text-[#636374] transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {products.length === 0 && (
                            <div className="bg-white p-12 text-center border border-[#E2E2E6] uk-card-default">
                                <p className="text-lg text-[#636374]">No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

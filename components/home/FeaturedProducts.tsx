import Link from "next/link";
import Image from "next/image";
import graphqlClient from "@/lib/graphql-client";
import { GET_PRODUCTS_BY_BRAND } from "@/lib/queries/products";
import type { ProductNode } from "@/lib/queries/products";

async function getFeaturedProducts(): Promise<ProductNode[]> {
 try {
 const data = await graphqlClient.request<{ products: { nodes: ProductNode[] } }>(
 GET_PRODUCTS_BY_BRAND,
 { first: 8 }
 );
 return data.products.nodes;
 } catch {
 return [];
 }
}

function getBrand(product: ProductNode): string {
 const name = product.productCategories?.nodes?.[0]?.name ?? "";
 return name.split(" › ")[0] || "Dermaceutic";
}

export default async function FeaturedProducts() {
 let products = await getFeaturedProducts();

 // Create an elegant fallback state for Dermaceutic so the page never looks broken
 if (products.length === 0) {
 products = [
 { id: "1", slug: "dermaceutic-light-ceutic", name: "Dermaceutic Light Ceutic", shortDescription: "Night-time skin tone unifying cream", regularPrice: "1150", price: "1150", sku: "DC-001", image: { sourceUrl: "", altText: "" }, productCategories: { nodes: [] } },
 { id: "2", slug: "dermaceutic-turn-over", name: "Dermaceutic Turn Over", shortDescription: "Stimulating night cream", regularPrice: "1150", price: "1150", sku: "DC-002", image: { sourceUrl: "", altText: "" }, productCategories: { nodes: [] } },
 { id: "3", slug: "dermaceutic-k-ceutic", name: "Dermaceutic K Ceutic", shortDescription: "Post-treatment recovery cream", regularPrice: "1230", price: "1230", sku: "DC-003", image: { sourceUrl: "", altText: "" }, productCategories: { nodes: [] } },
 { id: "4", slug: "dermaceutic-foamer-15", name: "Dermaceutic Foamer 15", shortDescription: "Intense purifying foam", regularPrice: "880", price: "880", sku: "DC-004", image: { sourceUrl: "", altText: "" }, productCategories: { nodes: [] } },
 ];
 }

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
 Dr. Bangalee's
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
 {products.slice(0, 8).map((product) => {
 const brand = getBrand(product);
 const price = product.price?.replace("R", "").replace(/&nbsp;/g, " ").trim();

 return (
 <Link
 key={product.id}
 href={`/shop/products/${product.slug}`}
 className="group uk-card uk-card-default block no-underline transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#939EBA]/10 focus:outline-none focus:ring-2 focus:ring-[#939EBA] focus:ring-offset-2"
 >
 {/* Product image */}
 <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F8]">
 {product.image?.sourceUrl ? (
 <Image
 src={product.image.sourceUrl}
 alt={product.image.altText || product.name}
 fill
 unoptimized={true}
 className="object-cover transition-transform duration-500 group-hover:scale-105"
 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
 />
 ) : (
 <div className="flex h-full w-full items-center justify-center">
 <span className="text-xs font-semibold text-[#939EBA]">{brand}</span>
 </div>
 )}

 {/* Hover overlay */}
 <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#939EBA] py-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
 <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 Add to Cart
 </div>
 </div>

 {/* Card info */}
 <div className="uk-card-body">
 <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#939EBA]">
 {brand}
 </p>
 <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug m-0 group-hover:text-[#939EBA] transition-colors">
 {product.name}
 </h3>
 {price && (
 <p className="mt-2 font-heading text-sm font-bold text-[#939EBA] m-0">
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

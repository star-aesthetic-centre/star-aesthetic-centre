"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { SHOP_NAV } from "@/lib/shop-nav";
import type { ShopProduct } from "@/lib/shop-types";

interface ShopPageContentProps {
  products: ShopProduct[];
}

export default function ShopPageContent({ products }: ShopPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const [neostrataOpen, setNeostrataOpen] = useState(true);

  const activeBrand = searchParams.get("brand") ?? "";
  const activeSubcategory = searchParams.get("subcategory") ?? "";
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";

  const filtered = useMemo(() => {
    let list = products;
    if (activeBrand) {
      list = list.filter((p) => p.brandSlug === activeBrand);
    }
    if (activeSubcategory) {
      list = list.filter(
        (p) => p.subcategory?.toUpperCase() === activeSubcategory.toUpperCase()
      );
    }
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query) ||
          p.brandName.toLowerCase().includes(query)
      );
    }
    return list;
  }, [products, activeBrand, activeSubcategory, query]);

  function setFilters(brand: string, subcategory?: string) {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (subcategory) params.set("subcategory", subcategory);
    if (query) params.set("q", query);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }

  function clearFilters() {
    setSearchInput("");
    router.push("/shop", { scroll: false });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeBrand) params.set("brand", activeBrand);
    if (activeSubcategory) params.set("subcategory", activeSubcategory);
    const q = searchInput.trim();
    if (q) params.set("q", q);
    router.push(params.toString() ? `/shop?${params.toString()}` : "/shop", { scroll: false });
  }

  const activeLabel = activeBrand
    ? SHOP_NAV.find((n) => n.slug === activeBrand)?.label
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 space-y-6">
          <form onSubmit={handleSearch}>
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#939EBA]"
                aria-hidden
              />
              <input
                id="shop-search"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-[#E2E2E6] bg-white py-2.5 pl-9 pr-3 text-sm text-[#1A1A1F] placeholder:text-[#C0C9DD] outline-none transition-colors focus:border-[#939EBA] focus:ring-2 focus:ring-[#939EBA]/20"
              />
            </div>
          </form>

          <nav aria-label="Shop by brand">
            <ul className="divide-y divide-[#E2E2E6] border border-[#E2E2E6] bg-white">
              <li>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#F7F7F8] ${
                    !activeBrand ? "bg-[#EEF0F6] font-semibold text-[#939EBA]" : "text-[#636374]"
                  }`}
                >
                  All Products
                </button>
              </li>
              {SHOP_NAV.map((item) => (
                <li key={item.slug}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setNeostrataOpen((o) => !o);
                          setFilters(item.slug);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-[#F7F7F8] ${
                          activeBrand === item.slug && !activeSubcategory
                            ? "bg-[#EEF0F6] font-semibold text-[#939EBA]"
                            : "text-[#636374]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 transition-transform ${neostrataOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {neostrataOpen && (
                        <ul className="border-t border-[#E2E2E6] bg-[#FAFAFA]">
                          {item.children.map((child) => (
                            <li key={child.subcategory}>
                              <button
                                type="button"
                                onClick={() => setFilters(item.slug, child.subcategory)}
                                className={`flex w-full items-center gap-2 py-2.5 pl-8 pr-4 text-left text-xs transition-colors hover:bg-[#F7F7F8] ${
                                  activeBrand === item.slug &&
                                  activeSubcategory.toUpperCase() === child.subcategory.toUpperCase()
                                    ? "font-semibold text-[#939EBA]"
                                    : "text-[#636374]"
                                }`}
                              >
                                <ChevronRight size={12} className="shrink-0 opacity-40" />
                                {child.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setFilters(item.slug)}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#F7F7F8] ${
                        activeBrand === item.slug
                          ? "bg-[#EEF0F6] font-semibold text-[#939EBA]"
                          : "text-[#636374]"
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {activeLabel && (
          <p className="mb-4 text-sm text-[#636374]">
            Showing: <span className="font-semibold text-[#1A1A1F]">{activeLabel}</span>
            {activeSubcategory && (
              <span className="text-[#939EBA]"> · {activeSubcategory}</span>
            )}
            {" · "}
            <button
              type="button"
              onClick={clearFilters}
              className="text-[#939EBA] underline-offset-2 hover:underline"
            >
              View all
            </button>
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                slug={product.slug}
                brand={product.brandName}
                priceNumber={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="border border-[#E2E2E6] bg-white p-12 text-center">
            <p className="text-lg text-[#636374]">No products found matching your criteria.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-[#939EBA] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

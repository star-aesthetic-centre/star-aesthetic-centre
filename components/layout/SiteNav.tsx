"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { ShoppingCart, Menu, X, ChevronRight, ChevronDown, Search, UserCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

/* ─── Search types ──────────────────────────────────────────── */
type SearchResult = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  image: string | null;
};

/* ─── Data ─────────────────────────────────────────────────── */
const treatmentsColumns = [
    {
        heading: "Face",
        items: [
            { label: "Anti-Wrinkle Treatment", href: "/treatments/face/anti-wrinkle-treatment" },
            { label: "Lip Fillers", href: "/treatments/face/lip-filler" },
            { label: "Jaw & Chin Contouring", href: "/treatments/face/jaw-amp-chin-contouring" },
            { label: "Dermapen Microneedling", href: "/treatments/face/dermapen-microneedling" },
        ],
    },
    {
        heading: "Skin",
        items: [
            { label: "Skin Peels", href: "/treatments/skin/skin-peel" },
            { label: "Pigmentation Treatment", href: "/treatments/skin/pigmentation-treatment" },
            { label: "Acne Treatment", href: "/treatments/skin/acne" },
            { label: "Excessive Sweating", href: "/treatments/skin/excessive-sweating" },
        ],
    },
    {
        heading: "Body & Wellness",
        items: [
            { label: "Body Contouring", href: "/treatments/body-wellness/body-contouring" },
            { label: "Medi-Lean Weight Loss", href: "/treatments/body-wellness/medi-lean" },
            { label: "Varicose Veins", href: "/treatments/body-wellness/varicose-veins" },
            { label: "Vitamin Drips", href: "/treatments/body-wellness/vitamin-drips" },
        ],
    },
];

const shopColumns = [
    {
        brand: "Dermaceutic",
        href: "/shop/brands/dermaceutic",
        tagline: "Pharmaceutical-grade skincare",
    },
    {
        brand: "Heliocare",
        href: "/shop/brands/heliocare",
        tagline: "360° sun protection",
    },
    {
        brand: "ISDIN",
        href: "/shop/brands/isdin",
        tagline: "Dermatologist-developed",
    },
    {
        brand: "Mesoestetic",
        href: "/shop/brands/mesoestetic",
        tagline: "Aesthetic medicine cosmetics",
    },
    {
        brand: "NeoStrata",
        href: "/shop/brands/neostrata",
        tagline: "The science of skin renewal",
    },
    {
        brand: "SkinCeuticals",
        href: "/shop/brands/skinceuticals",
        tagline: "Prevent. Correct. Protect.",
    },
];

/* ─── Types ─────────────────────────────────────────────────── */
type MegaKey = "treatments" | "shop" | null;

/* ─── Component ─────────────────────────────────────────────── */
export default function SiteNav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<"treatments" | "shop" | null>(null);
    const [activeMega, setActiveMega] = useState<MegaKey>(null);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { cartCount, dispatch: cartDispatch } = useCart();

    // Search state
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openSearch = () => {
        setSearchOpen(true);
        setActiveMega(null);
        setTimeout(() => searchInputRef.current?.focus(), 50);
    };

    const closeSearch = useCallback(() => {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
    }, []);

    const handleSearchInput = (value: string) => {
        setSearchQuery(value);
        if (searchDebounce.current) clearTimeout(searchDebounce.current);
        if (value.trim().length < 2) { setSearchResults([]); return; }
        setSearchLoading(true);
        searchDebounce.current = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(value.trim())}`);
                const data = await res.json();
                setSearchResults(data.results ?? []);
            } finally {
                setSearchLoading(false);
            }
        }, 250);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
        if (searchOpen) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [searchOpen, closeSearch]);

    const openMega = (key: MegaKey) => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setActiveMega(key);
    };

    const closeMega = () => {
        hoverTimeout.current = setTimeout(() => setActiveMega(null), 120);
    };

    const toggleMobileSection = (key: "treatments" | "shop") => {
        setMobileExpanded((prev) => (prev === key ? null : key));
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#E2E2E6] bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/star-aesthetic-centre-durban-logo-001.png"
                        alt="Star Aesthetic Centre Durban"
                        width={200}
                        height={66}
                        priority
                        unoptimized
                        className="h-auto w-[200px] object-contain"
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 md:flex">

                    {/* Treatments */}
                    <div
                        className="relative"
                        onMouseEnter={() => openMega("treatments")}
                        onMouseLeave={closeMega}
                    >
                        <Link
                            href="/treatments"
                            className="flex items-center gap-1 text-sm font-medium text-[#636374] transition-colors hover:text-[#1B3D6E]"
                        >
                            Treatments
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${activeMega === "treatments" ? "rotate-180" : ""}`}
                            />
                        </Link>

                        {/* Treatments Mega Panel */}
                        <div
                            className={`absolute left-1/2 top-full mt-3 w-[600px] -translate-x-1/2 rounded-lg bg-white shadow-xl transition-all duration-200 ${
                                activeMega === "treatments"
                                    ? "pointer-events-auto translate-y-0 opacity-100"
                                    : "pointer-events-none translate-y-2 opacity-0"
                            }`}
                            onMouseEnter={() => openMega("treatments")}
                            onMouseLeave={closeMega}
                        >
                            <div className="grid grid-cols-3 gap-0 p-6">
                                {treatmentsColumns.map((col) => (
                                    <div key={col.heading}>
                                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#1B3D6E]">
                                            {col.heading}
                                        </p>
                                        <ul className="space-y-0.5">
                                            {col.items.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setActiveMega(null)}
                                                        className="group flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-[#636374] transition-colors hover:bg-[#F8F9FC] hover:text-[#1B3D6E]"
                                                    >
                                                        <ChevronRight
                                                            size={13}
                                                            className="shrink-0 text-[#939EBA] transition-transform group-hover:translate-x-0.5"
                                                        />
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-[#E2E2E6] px-6 py-4 text-center">
                                <Link
                                    href="/treatments"
                                    onClick={() => setActiveMega(null)}
                                    className="inline-block rounded-full bg-[#1B3D6E] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                                >
                                    View All Treatments
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Shop */}
                    <div
                        className="relative"
                        onMouseEnter={() => openMega("shop")}
                        onMouseLeave={closeMega}
                    >
                        <Link
                            href="/shop"
                            className="flex items-center gap-1 text-sm font-medium text-[#636374] transition-colors hover:text-[#1B3D6E]"
                        >
                            Shop
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${activeMega === "shop" ? "rotate-180" : ""}`}
                            />
                        </Link>

                        {/* Shop Mega Panel */}
                        <div
                            className={`absolute left-1/2 top-full mt-3 w-[380px] -translate-x-1/2 rounded-lg bg-white shadow-xl transition-all duration-200 ${
                                activeMega === "shop"
                                    ? "pointer-events-auto translate-y-0 opacity-100"
                                    : "pointer-events-none translate-y-2 opacity-0"
                            }`}
                            onMouseEnter={() => openMega("shop")}
                            onMouseLeave={closeMega}
                        >
                            <div className="grid grid-cols-2 gap-4 p-6">
                                {shopColumns.map((col) => (
                                    <Link
                                        key={col.href}
                                        href={col.href}
                                        onClick={() => setActiveMega(null)}
                                        className="group flex flex-col gap-1 rounded-lg border border-[#E2E2E6] p-4 transition-colors hover:border-[#939EBA] hover:bg-[#F8F9FC]"
                                    >
                                        <span className="text-sm font-semibold text-[#1B3D6E] group-hover:underline">
                                            {col.brand}
                                        </span>
                                        <span className="text-xs text-[#636374]">{col.tagline}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-[#E2E2E6] px-6 py-4 text-center">
                                <Link
                                    href="/shop"
                                    onClick={() => setActiveMega(null)}
                                    className="inline-block rounded-full bg-[#1B3D6E] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                                >
                                    View All Products
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Static links */}
                    <Link
                        href="/dr-rajeev-bangalee"
                        className="text-sm font-medium text-[#636374] transition-colors hover:text-[#939EBA]"
                    >
                        Dr. Bangalee
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-[#636374] transition-colors hover:text-[#939EBA]"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right: Search + Cart + Book Now + Mobile toggle */}
                <div className="flex items-center gap-3">
                    {/* Search icon */}
                    <button
                        onClick={openSearch}
                        className="flex h-10 w-10 items-center justify-center text-[#636374] transition-colors hover:bg-[#EEF0F6] hover:text-[#1B3D6E]"
                        aria-label="Search products"
                    >
                        <Search size={19} strokeWidth={1.5} />
                    </button>

                    {/* Member account */}
                    <Link
                        href="/member"
                        className="flex h-10 w-10 items-center justify-center text-[#636374] transition-colors hover:bg-[#EEF0F6] hover:text-[#1B3D6E]"
                        aria-label="Member account"
                        title="Member account"
                    >
                        <UserCircle size={20} strokeWidth={1.5} />
                    </Link>

                    {/* Cart */}
                    <button
                        onClick={() => cartDispatch({ type: "OPEN_DRAWER" })}
                        className="relative flex h-10 w-10 items-center justify-center text-[#636374] transition-colors hover:bg-[#EEF0F6] hover:text-[#939EBA]"
                        aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
                    >
                        <ShoppingCart size={20} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center bg-[#939EBA] text-[10px] font-bold text-white">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </button>

                    {/* Book Now */}
                    <Link
                        href="/book"
                        className="hidden bg-[#1B3D6E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162f56] sm:inline-flex"
                    >
                        Book Now »
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        className="flex h-10 w-10 items-center justify-center text-[#636374] md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Search overlay */}
            {searchOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 top-[73px] bg-black/20 z-40"
                        onClick={closeSearch}
                    />
                    {/* Search panel */}
                    <div className="absolute left-0 right-0 top-full z-50 bg-white border-b border-[#E2E2E6] shadow-lg">
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-5">
                            {/* Input row */}
                            <div className="flex items-center gap-3 border-b border-[#1A1917] pb-3">
                                <Search size={18} className="shrink-0 text-[#939EBA]" strokeWidth={1.5} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => handleSearchInput(e.target.value)}
                                    placeholder="Search products, brands…"
                                    className="flex-1 bg-transparent text-base text-[#1A1917] placeholder:text-[#939EBA] focus:outline-none"
                                />
                                {searchQuery && (
                                    <button onClick={() => { setSearchQuery(""); setSearchResults([]); searchInputRef.current?.focus(); }} className="text-[#939EBA] hover:text-[#1A1917] transition-colors">
                                        <X size={16} />
                                    </button>
                                )}
                                <button onClick={closeSearch} className="ml-2 text-xs font-medium text-[#636374] hover:text-[#1A1917] transition-colors whitespace-nowrap">
                                    Close
                                </button>
                            </div>

                            {/* Results */}
                            {searchLoading && (
                                <p className="py-6 text-center text-sm text-[#939EBA]">Searching…</p>
                            )}
                            {!searchLoading && searchResults.length > 0 && (
                                <div className="pt-4">
                                    <ul className="divide-y divide-[#F0F0EE]">
                                        {searchResults.map(r => (
                                            <li key={r.id}>
                                                <Link
                                                    href={`/shop/products/${r.slug}`}
                                                    onClick={closeSearch}
                                                    className="flex items-center gap-4 py-3 group"
                                                >
                                                    <div className="h-14 w-14 shrink-0 bg-[#F8F8F7] flex items-center justify-center overflow-hidden">
                                                        {r.image ? (
                                                            <Image src={r.image} alt={r.name} width={56} height={56} className="object-contain h-full w-full" unoptimized />
                                                        ) : (
                                                            <span className="text-[10px] text-[#939EBA]">No img</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#939EBA] mb-0.5">{r.brand}</p>
                                                        <p className="text-sm font-semibold text-[#1A1917] group-hover:text-[#1B3D6E] transition-colors truncate">{r.name}</p>
                                                    </div>
                                                    <p className="shrink-0 text-sm font-bold text-[#1A1917]">R {r.price.toLocaleString("en-ZA")}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-3 border-t border-[#F0F0EE]">
                                        <Link
                                            href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                                            onClick={closeSearch}
                                            className="text-xs font-semibold text-[#1B3D6E] hover:underline"
                                        >
                                            View all results for "{searchQuery}" →
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {!searchLoading && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                                <p className="py-6 text-center text-sm text-[#636374]">No products found for "<strong>{searchQuery}</strong>"</p>
                            )}
                            {!searchQuery && (
                                <p className="py-4 text-xs text-[#939EBA]">Type to search across all brands and products.</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <div className="border-t border-[#E2E2E6] bg-white px-4 pb-6 md:hidden">
                    <nav className="flex flex-col gap-1 pt-4">

                        {/* Treatments accordion */}
                        <div className="flex w-full items-stretch">
                            <Link
                                href="/treatments"
                                onClick={() => setMobileOpen(false)}
                                className="flex flex-1 items-center px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                            >
                                Treatments
                            </Link>
                            <button
                                type="button"
                                aria-label="Expand treatments menu"
                                className="flex items-center px-4 py-3 text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                                onClick={() => toggleMobileSection("treatments")}
                            >
                                <ChevronDown
                                    size={16}
                                    className={`text-[#939EBA] transition-transform duration-200 ${mobileExpanded === "treatments" ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>
                        {mobileExpanded === "treatments" && (
                            <div className="mb-1 ml-4 border-l-2 border-[#E2E2E6] pl-3">
                                {treatmentsColumns.map((col) => (
                                    <div key={col.heading} className="mb-3">
                                        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#1B3D6E]">
                                            {col.heading}
                                        </p>
                                        {col.items.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-[#636374] transition-colors hover:bg-[#F8F9FC] hover:text-[#1B3D6E]"
                                            >
                                                <ChevronRight size={12} className="text-[#939EBA]" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                                <Link
                                    href="/treatments"
                                    onClick={() => setMobileOpen(false)}
                                    className="mt-1 block rounded px-2 py-1.5 text-sm font-semibold text-[#1B3D6E] hover:bg-[#F8F9FC]"
                                >
                                    View All Treatments →
                                </Link>
                            </div>
                        )}

                        {/* Shop accordion */}
                        <div className="flex w-full items-stretch">
                            <Link
                                href="/shop"
                                onClick={() => setMobileOpen(false)}
                                className="flex flex-1 items-center px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                            >
                                Shop
                            </Link>
                            <button
                                type="button"
                                aria-label="Expand shop menu"
                                className="flex items-center px-4 py-3 text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                                onClick={() => toggleMobileSection("shop")}
                            >
                                <ChevronDown
                                    size={16}
                                    className={`text-[#939EBA] transition-transform duration-200 ${mobileExpanded === "shop" ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>
                        {mobileExpanded === "shop" && (
                            <div className="mb-1 ml-4 border-l-2 border-[#E2E2E6] pl-3">
                                {shopColumns.map((col) => (
                                    <Link
                                        key={col.href}
                                        href={col.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex flex-col rounded px-2 py-2 transition-colors hover:bg-[#F8F9FC]"
                                    >
                                        <span className="text-sm font-medium text-[#1B3D6E]">{col.brand}</span>
                                        <span className="text-xs text-[#636374]">{col.tagline}</span>
                                    </Link>
                                ))}
                                <Link
                                    href="/shop"
                                    onClick={() => setMobileOpen(false)}
                                    className="mt-1 block rounded px-2 py-1.5 text-sm font-semibold text-[#1B3D6E] hover:bg-[#F8F9FC]"
                                >
                                    View All Products →
                                </Link>
                            </div>
                        )}

                        {/* Static links */}
                        <Link
                            href="/dr-rajeev-bangalee"
                            className="px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC] hover:text-[#939EBA]"
                            onClick={() => setMobileOpen(false)}
                        >
                            Dr. Bangalee
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC] hover:text-[#939EBA]"
                            onClick={() => setMobileOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/member"
                            className="px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                            onClick={() => setMobileOpen(false)}
                        >
                            Member account
                        </Link>
                        <Link
                            href="/book"
                            className="mt-4 bg-[#1B3D6E] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                            onClick={() => setMobileOpen(false)}
                        >
                            Book a Consultation »
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { ShoppingCart, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

/* ─── Data ─────────────────────────────────────────────────── */
const treatmentsColumns = [
    {
        heading: "Face",
        items: [
            { label: "Botox", href: "/treatments/face/botox" },
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
        tagline: "Clinical skincare solutions",
    },
    {
        brand: "Heliocare",
        href: "/shop/brands/heliocare",
        tagline: "Advanced sun protection",
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
                        src="http://star-aesthetic-centre.local/wp-content/uploads/star-aesthetic-centre-durban-logo-001.png"
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
                        <button className="flex items-center gap-1 text-sm font-medium text-[#636374] transition-colors hover:text-[#1B3D6E]">
                            Treatments
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${activeMega === "treatments" ? "rotate-180" : ""}`}
                            />
                        </button>

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
                        <button className="flex items-center gap-1 text-sm font-medium text-[#636374] transition-colors hover:text-[#1B3D6E]">
                            Shop
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${activeMega === "shop" ? "rotate-180" : ""}`}
                            />
                        </button>

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

                {/* Right: Book Now + Cart + Mobile toggle */}
                <div className="flex items-center gap-3">
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

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <div className="border-t border-[#E2E2E6] bg-white px-4 pb-6 md:hidden">
                    <nav className="flex flex-col gap-1 pt-4">

                        {/* Treatments accordion */}
                        <button
                            className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                            onClick={() => toggleMobileSection("treatments")}
                        >
                            Treatments
                            <ChevronDown
                                size={16}
                                className={`text-[#939EBA] transition-transform duration-200 ${mobileExpanded === "treatments" ? "rotate-180" : ""}`}
                            />
                        </button>
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
                        <button
                            className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-[#1A1A1F] transition-colors hover:bg-[#F8F9FC]"
                            onClick={() => toggleMobileSection("shop")}
                        >
                            Shop
                            <ChevronDown
                                size={16}
                                className={`text-[#939EBA] transition-transform duration-200 ${mobileExpanded === "shop" ? "rotate-180" : ""}`}
                            />
                        </button>
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

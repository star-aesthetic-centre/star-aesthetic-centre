"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
    const { state, dispatch, subtotal } = useCart();
    const { items, isDrawerOpen } = state;

    // Lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isDrawerOpen]);

    const close = () => dispatch({ type: "CLOSE_DRAWER" });

    return (
        <>
            {/* ── Backdrop ──────────────────────────────────────────── */}
            <div
                onClick={close}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    isDrawerOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                aria-hidden="true"
            />

            {/* ── Drawer panel ──────────────────────────────────────── */}
            <div
                role="dialog"
                aria-label="Shopping cart"
                aria-modal="true"
                className={`fixed top-0 right-0 bottom-24 z-50 flex w-full max-w-md flex-col bg-white border-l border-[#E2E2E6] shadow-2xl transition-transform duration-300 ease-in-out sm:bottom-28 ${
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E2E2E6] px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <ShoppingCart size={18} strokeWidth={1.5} className="text-[#939EBA]" />
                        <h2 className="font-heading text-base font-bold text-[#1A1A1F]">
                            Your Cart
                        </h2>
                        {items.length > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center bg-[#939EBA] text-[10px] font-bold text-white">
                                {items.reduce((s, i) => s + i.quantity, 0)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={close}
                        className="flex h-8 w-8 items-center justify-center text-[#636374] transition-colors hover:bg-[#F7F7F8] hover:text-[#1A1A1F]"
                        aria-label="Close cart"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* ── Empty state ───────────────────────────────────── */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                        <ShoppingCart
                            size={48}
                            strokeWidth={1}
                            className="text-[#E2E2E6]"
                        />
                        <p className="text-sm font-medium text-[#1A1A1F]">
                            Your cart is empty
                        </p>
                        <p className="text-xs text-[#636374]">
                            Add a product to get started.
                        </p>
                        <button
                            onClick={close}
                            className="mt-2 border border-[#939EBA] px-6 py-2.5 text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ── Items list ────────────────────────────── */}
                        <div className="flex-1 overflow-y-auto px-5 py-2">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b border-[#E2E2E6] py-4 last:border-b-0"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-16 w-16 shrink-0 border border-[#E2E2E6] bg-[#F7F7F8] overflow-hidden">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <ShoppingCart
                                                    size={20}
                                                    className="text-[#E2E2E6]"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                                        <p className="truncate text-sm font-semibold leading-snug text-[#1A1A1F]">
                                            {item.name}
                                        </p>
                                        <p className="text-sm font-bold text-[#1A1A1F]">
                                            R {(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        {/* Qty controls + Remove */}
                                        <div className="mt-1 flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    dispatch({
                                                        type: "UPDATE_QUANTITY",
                                                        payload: {
                                                            id: item.id,
                                                            quantity: item.quantity - 1,
                                                        },
                                                    })
                                                }
                                                className="flex h-7 w-7 items-center justify-center border border-[#E2E2E6] text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-6 text-center text-sm font-semibold text-[#1A1A1F]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    dispatch({
                                                        type: "UPDATE_QUANTITY",
                                                        payload: {
                                                            id: item.id,
                                                            quantity: item.quantity + 1,
                                                        },
                                                    })
                                                }
                                                className="flex h-7 w-7 items-center justify-center border border-[#E2E2E6] text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={12} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_ITEM",
                                                        payload: { id: item.id },
                                                    })
                                                }
                                                className="ml-auto flex h-7 w-7 items-center justify-center text-[#636374] transition-colors hover:text-red-500"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── Footer ────────────────────────────────── */}
                        <div className="border-t border-[#E2E2E6] p-5 space-y-3">
                            {/* Subtotal */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#636374]">Subtotal</span>
                                <span className="font-bold text-[#1A1A1F]">
                                    R {subtotal.toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs text-[#636374]">
                                Shipping calculated at checkout
                            </p>

                            {/* Actions */}
                            <button
                                onClick={close}
                                className="w-full border border-[#939EBA] py-3 text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                            >
                                Continue Shopping
                            </button>
                            <Link
                                href="/checkout"
                                onClick={close}
                                className="block w-full bg-[#1B3D6E] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                            >
                                Checkout →
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

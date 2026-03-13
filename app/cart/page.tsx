"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
    const { state, dispatch, subtotal } = useCart();
    const { items } = state;

    /* ── Empty state ──────────────────────────────────────────────── */
    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] bg-[#F7F7F8]">
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <ShoppingCart
                            size={64}
                            strokeWidth={1}
                            className="text-[#E2E2E6]"
                        />
                        <h1 className="font-heading text-3xl font-bold text-[#1A1A1F]">
                            Your cart is empty
                        </h1>
                        <p className="text-sm text-[#636374]">
                            Add some products to get started.
                        </p>
                        <Link
                            href="/shop"
                            className="bg-[#1B3D6E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Cart with items ──────────────────────────────────────────── */
    return (
        <div className="min-h-screen bg-[#F7F7F8]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Page heading */}
                <h1 className="font-heading mb-8 text-3xl font-bold text-[#1A1A1F]">
                    Your Cart
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* ── Items list (2/3 width on lg) ──────────── */}
                    <div className="lg:col-span-2">
                        <div className="border border-[#E2E2E6] bg-white">
                            {/* Table header */}
                            <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-[#E2E2E6] px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-[#939EBA] sm:grid">
                                <span>Product</span>
                                <span className="text-center">Price</span>
                                <span className="text-center">Quantity</span>
                                <span className="text-right">Total</span>
                            </div>

                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#E2E2E6] p-4 last:border-b-0 sm:grid-cols-[auto_1fr_auto_auto_auto] sm:items-center sm:px-6 sm:py-4"
                                >
                                    {/* Image */}
                                    <div className="relative h-20 w-20 shrink-0 border border-[#E2E2E6] bg-[#F7F7F8] overflow-hidden">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <ShoppingCart
                                                    size={24}
                                                    className="text-[#E2E2E6]"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name + mobile controls */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold leading-snug text-[#1A1A1F]">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-[#636374]">
                                            R {item.price.toFixed(2)} each
                                        </p>

                                        {/* Mobile qty + remove */}
                                        <div className="mt-2 flex items-center gap-2 sm:hidden">
                                            <button
                                                onClick={() =>
                                                    dispatch({
                                                        type: "UPDATE_QUANTITY",
                                                        payload: { id: item.id, quantity: item.quantity - 1 },
                                                    })
                                                }
                                                className="flex h-7 w-7 items-center justify-center border border-[#E2E2E6] text-[#939EBA] hover:bg-[#EEF0F6]"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-6 text-center text-sm font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    dispatch({
                                                        type: "UPDATE_QUANTITY",
                                                        payload: { id: item.id, quantity: item.quantity + 1 },
                                                    })
                                                }
                                                className="flex h-7 w-7 items-center justify-center border border-[#E2E2E6] text-[#939EBA] hover:bg-[#EEF0F6]"
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
                                                className="ml-auto text-[#636374] hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Desktop: Unit price */}
                                    <p className="hidden text-center text-sm text-[#636374] sm:block">
                                        R {item.price.toFixed(2)}
                                    </p>

                                    {/* Desktop: Qty controls */}
                                    <div className="hidden items-center gap-1 sm:flex">
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: "UPDATE_QUANTITY",
                                                    payload: { id: item.id, quantity: item.quantity - 1 },
                                                })
                                            }
                                            className="flex h-8 w-8 items-center justify-center border border-[#E2E2E6] text-[#939EBA] hover:bg-[#EEF0F6]"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: "UPDATE_QUANTITY",
                                                    payload: { id: item.id, quantity: item.quantity + 1 },
                                                })
                                            }
                                            className="flex h-8 w-8 items-center justify-center border border-[#E2E2E6] text-[#939EBA] hover:bg-[#EEF0F6]"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    {/* Desktop: Line total + remove */}
                                    <div className="hidden flex-col items-end gap-1 sm:flex">
                                        <p className="text-sm font-bold text-[#1A1A1F]">
                                            R {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_ITEM",
                                                    payload: { id: item.id },
                                                })
                                            }
                                            className="text-[#636374] hover:text-red-500 transition-colors"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue shopping */}
                        <div className="mt-4">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[#939EBA] transition-colors hover:text-[#1B3D6E]"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* ── Order summary (1/3 on lg) ─────────────── */}
                    <div className="self-start border border-[#E2E2E6] bg-white p-6">
                        <h2 className="font-heading mb-5 text-lg font-bold text-[#1A1A1F]">
                            Order Summary
                        </h2>

                        {/* Line items summary */}
                        <div className="mb-4 space-y-2 border-b border-[#E2E2E6] pb-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between text-xs text-[#636374]"
                                >
                                    <span className="truncate pr-4 max-w-[60%]">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="shrink-0 font-medium text-[#1A1A1F]">
                                        R {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#636374]">Subtotal</span>
                            <span className="font-semibold text-[#1A1A1F]">
                                R {subtotal.toFixed(2)}
                            </span>
                        </div>

                        {/* Shipping */}
                        <div className="flex justify-between text-sm mb-5">
                            <span className="text-[#636374]">Shipping</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between border-t border-[#E2E2E6] pt-4 mb-6">
                            <span className="font-bold text-[#1A1A1F]">Total</span>
                            <span className="font-bold text-[#1A1A1F]">
                                R {subtotal.toFixed(2)}
                            </span>
                        </div>

                        <Link
                            href="/checkout"
                            className="flex w-full items-center justify-center gap-2 bg-[#1B3D6E] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                        >
                            Proceed to Checkout
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

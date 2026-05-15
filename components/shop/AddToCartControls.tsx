"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart } from "lucide-react";

interface AddToCartControlsProps {
    productId: string;
    productSlug: string;
    productName: string;
    productImage: string;
    productPrice: number;
    showQuantity?: boolean;
    /** When set, redirect to post-add upsell funnel after adding to cart */
    funnelSlug?: string;
}

export default function AddToCartControls({
    productId,
    productSlug,
    productName,
    productImage,
    productPrice,
    showQuantity = true,
    funnelSlug,
}: AddToCartControlsProps) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { dispatch, isHydrated } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: productId,
                slug: productSlug,
                name: productName,
                image: productImage,
                price: productPrice,
                quantity,
            },
        });

        if (funnelSlug) {
            router.push(`/buy/${funnelSlug}`);
            return;
        }

        dispatch({ type: "OPEN_DRAWER" });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="flex items-center gap-3">
            {showQuantity && (
                <div className="flex items-center border border-[#E2E2E6]">
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-12 w-12 items-center justify-center text-lg text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-[#1A1A1F]">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="flex h-12 w-12 items-center justify-center text-lg text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isHydrated}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
                    added
                        ? "bg-[#4A7C59]"
                        : "bg-[#939EBA] hover:bg-[#7A87A6]"
                } ${!showQuantity ? "w-full sm:w-auto px-8" : ""}`}
            >
                <ShoppingCart size={16} strokeWidth={1.5} />
                {!isHydrated ? "Loading…" : added ? "Added!" : "Add to Cart"}
            </button>
        </div>
    );
}

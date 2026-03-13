"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart } from "lucide-react";

interface AddToCartControlsProps {
    productId: string;
    productSlug: string;
    productName: string;
    productImage: string;
    productPrice: number;
    showQuantity?: boolean;  // default true — set false for bottom CTA button
}

export default function AddToCartControls({
    productId,
    productSlug,
    productName,
    productImage,
    productPrice,
    showQuantity = true,
}: AddToCartControlsProps) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { dispatch } = useCart();

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
        dispatch({ type: "OPEN_DRAWER" });

        // Brief visual feedback
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="flex items-center gap-3">
            {/* Quantity selector */}
            {showQuantity && (
                <div className="flex items-center border border-[#E2E2E6]">
                    <button
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
                        onClick={() => setQuantity((q) => q + 1)}
                        className="flex h-12 w-12 items-center justify-center text-lg text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            )}

            {/* Add to Cart button */}
            <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-colors ${
                    added
                        ? "bg-[#4A7C59]"
                        : "bg-[#939EBA] hover:bg-[#7A87A6]"
                } ${!showQuantity ? "w-full sm:w-auto px-8" : ""}`}
            >
                <ShoppingCart size={16} strokeWidth={1.5} />
                {added ? "Added!" : "Add to Cart"}
            </button>
        </div>
    );
}

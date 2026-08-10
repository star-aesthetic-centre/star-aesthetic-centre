"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { isValidCartProductId } from "@/lib/cart-product-id";

/* ─── Types ──────────────────────────────────────────────────────────── */

export type CartItem = {
    id: string;       // Supabase product UUID
    slug: string;
    name: string;
    image: string;
    price: number;    // parsed float — no currency symbol
    quantity: number;

    /* ── Funnel offer lines ──────────────────────────────────────────────
       A funnel line is discounted ONLY because it was bought alongside a
       specific primary product. These three fields record that condition so
       it can be enforced if the cart changes afterwards. Absent on ordinary
       lines. */
    funnelOriginSlug?: string;      // slug of the product that unlocked the offer
    funnelDiscountPercent?: number; // e.g. 10
    listPrice?: number;             // undiscounted unit price, to restore
};

type CartState = {
    items: CartItem[];
    isDrawerOpen: boolean;
};

/**
 * Enforce the condition attached to funnel offers.
 *
 * The funnel discount is granted for buying an add-on ALONGSIDE a specific
 * primary product. It is baked into the line's unit price at the moment it is
 * added, which means that without this it survives the primary product being
 * removed — the customer keeps 10% off something they no longer qualify for.
 *
 * Applied after every mutating action rather than in the remove handler, so it
 * holds however the cart got into that state: removal, quantity set to zero,
 * or a stale basket rehydrated from localStorage days later.
 *
 * Restores listPrice and strips the "(Funnel Offer -10%)" suffix, so the line
 * stays in the cart at its honest price rather than silently vanishing.
 */
function reconcileFunnelPricing(items: CartItem[]): CartItem[] {
    const presentSlugs = new Set(
        items.filter((i) => !i.funnelOriginSlug).map((i) => i.slug)
    );

    let changed = false;
    const next = items.map((item) => {
        if (!item.funnelOriginSlug || item.listPrice === undefined) return item;
        if (presentSlugs.has(item.funnelOriginSlug)) return item;

        changed = true;
        return {
            ...item,
            price: item.listPrice,
            name: item.name.replace(/\s*\(Funnel Offer -\d+%\)\s*$/, ""),
            funnelOriginSlug: undefined,
            funnelDiscountPercent: undefined,
            listPrice: undefined,
        };
    });

    return changed ? next : items;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "RECONCILE_FUNNEL" }
    | { type: "CLEAR_CART" }
    | { type: "OPEN_DRAWER" }
    | { type: "CLOSE_DRAWER" };

type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    cartCount: number;
    subtotal: number;
    isHydrated: boolean;
};

/* ─── Reducer ────────────────────────────────────────────────────────── */

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + action.payload.quantity }
                            : i
                    ),
                };
            }
            // NOT reconciled here on purpose. Hydration replays ADD_ITEM one
            // item at a time, so a funnel line restored before its primary
            // would be stripped for a condition that is about to be met.
            // A single RECONCILE_FUNNEL pass runs once hydration finishes.
            return { ...state, items: [...state.items, action.payload] };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: reconcileFunnelPricing(
                    state.items.filter((i) => i.id !== action.payload.id)
                ),
            };
        case "UPDATE_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: reconcileFunnelPricing(
                        state.items.filter((i) => i.id !== action.payload.id)
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                ),
            };
        case "RECONCILE_FUNNEL":
            return { ...state, items: reconcileFunnelPricing(state.items) };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "OPEN_DRAWER":
            return { ...state, isDrawerOpen: true };
        case "CLOSE_DRAWER":
            return { ...state, isDrawerOpen: false };
        default:
            return state;
    }
}

/* ─── Context ────────────────────────────────────────────────────────── */

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "star-aesthetic-cart";

/* ─── Provider ───────────────────────────────────────────────────────── */

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        isDrawerOpen: false,
    });

    // Hydration flag — prevents writing empty array before localStorage is read
    const [hydrated, setHydrated] = useState(false);

    // Hydrate from localStorage on mount only
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed: CartItem[] = JSON.parse(stored);
                const valid = parsed.filter((item) => isValidCartProductId(item.id));
                if (valid.length !== parsed.length) {
                    localStorage.removeItem(STORAGE_KEY);
                }
                valid.forEach((item) =>
                    dispatch({ type: "ADD_ITEM", payload: item })
                );
                // Once every restored line is present, check the funnel
                // conditions still hold. A basket abandoned days ago may have
                // had its primary product removed since.
                dispatch({ type: "RECONCILE_FUNNEL" });
            }
        } catch {
            // Corrupt storage — start fresh
        }
        setHydrated(true);
    }, []);

    // Persist items to localStorage on every change (skip isDrawerOpen)
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items, hydrated]);

    const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ state, dispatch, cartCount, subtotal, isHydrated: hydrated }}>
            {children}
        </CartContext.Provider>
    );
}

/* ─── Hook ───────────────────────────────────────────────────────────── */

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}

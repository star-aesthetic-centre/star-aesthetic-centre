"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
    type ReactNode,
} from "react";

/* ─── Types ──────────────────────────────────────────────────────────── */

export type CartItem = {
    id: string;       // WPGraphQL global ID e.g. "cHJvZHVjdDoxMjM="
    slug: string;
    name: string;
    image: string;
    price: number;    // parsed float — no currency symbol
    quantity: number;
};

type CartState = {
    items: CartItem[];
    isDrawerOpen: boolean;
};

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "OPEN_DRAWER" }
    | { type: "CLOSE_DRAWER" };

type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    cartCount: number;
    subtotal: number;
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
            return { ...state, items: [...state.items, action.payload] };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload.id),
            };
        case "UPDATE_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((i) => i.id !== action.payload.id),
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
                parsed.forEach((item) =>
                    dispatch({ type: "ADD_ITEM", payload: item })
                );
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
        <CartContext.Provider value={{ state, dispatch, cartCount, subtotal }}>
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

"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  toggleProductActive,
  updateProductPrice,
  updateProductStock,
  updateProductShortDescription,
} from "./actions";

interface AdminProduct {
  id: string;
  brand_slug: string;
  name: string;
  slug: string;
  short_description: string | null;
  price_cents: number | null;
  is_active: boolean;
  subcategory: string | null;
  stock_quantity: number | null;
  primaryImage: string | null;
}

const BRAND_LABELS: Record<string, string> = {
  dermaceutic: "Dermaceutic",
  heliocare: "Heliocare",
  isdin: "ISDIN",
  mesoestetic: "Mesoestetic",
  neostrata: "NeoStrata",
  skinceuticals: "SkinCeuticals",
};

const BRAND_COLORS: Record<string, string> = {
  dermaceutic: "bg-[#939EBA]/15 text-[#939EBA]",
  heliocare: "bg-orange-50 text-orange-600",
  isdin: "bg-blue-50 text-blue-600",
  mesoestetic: "bg-stone-100 text-stone-600",
  neostrata: "bg-emerald-50 text-emerald-700",
  skinceuticals: "bg-amber-50 text-amber-700",
};

function formatPrice(cents: number | null): string {
  if (cents == null) return "—";
  return `R ${(cents / 100).toFixed(2)}`;
}

function formatStock(qty: number | null): string {
  if (qty == null) return "—";
  return String(qty);
}

type EditField = "price" | "stock" | "desc";

interface EditingState {
  id: string;
  type: EditField;
  value: string;
}

export default function ProductsClient({ products }: { products: AdminProduct[] }) {
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [localProducts, setLocalProducts] = useState(products);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const brands = ["all", ...Object.keys(BRAND_LABELS)];

  const filtered = localProducts.filter((p) => {
    const brandMatch = activeBrand === "all" || p.brand_slug === activeBrand;
    const searchMatch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.subcategory ?? "").toLowerCase().includes(search.toLowerCase());
    return brandMatch && searchMatch;
  });

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Toggle active ──────────────────────────────────────────────────────────
  const handleToggle = (productId: string, current: boolean) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_active: !current } : p))
    );
    startTransition(async () => {
      const res = await toggleProductActive(productId, !current);
      if (!res.success) {
        setLocalProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, is_active: current } : p))
        );
        showToast(res.error ?? "Failed to update", false);
      } else {
        showToast(`${!current ? "Activated" : "Deactivated"}`, true);
      }
    });
  };

  // ── Price editing ──────────────────────────────────────────────────────────
  const startEditPrice = (product: AdminProduct) => {
    const val = product.price_cents != null ? (product.price_cents / 100).toFixed(2) : "";
    setEditing({ id: product.id, type: "price", value: val });
    setTimeout(() => inlineInputRef.current?.select(), 50);
  };

  const commitPrice = (product: AdminProduct) => {
    if (!editing || editing.type !== "price") return;
    const parsed = parseFloat(editing.value);
    if (isNaN(parsed) || parsed < 0) { setEditing(null); return; }
    const newCents = Math.round(parsed * 100);
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, price_cents: newCents } : p))
    );
    setEditing(null);
    startTransition(async () => {
      const res = await updateProductPrice(product.id, newCents);
      if (!res.success) {
        setLocalProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, price_cents: product.price_cents } : p))
        );
        showToast(res.error ?? "Price update failed", false);
      } else {
        showToast("Price updated", true);
      }
    });
  };

  // ── Stock editing ──────────────────────────────────────────────────────────
  const startEditStock = (product: AdminProduct) => {
    const val = product.stock_quantity != null ? String(product.stock_quantity) : "";
    setEditing({ id: product.id, type: "stock", value: val });
    setTimeout(() => inlineInputRef.current?.select(), 50);
  };

  const commitStock = (product: AdminProduct) => {
    if (!editing || editing.type !== "stock") return;
    const trimmed = editing.value.trim();
    const newQty = trimmed === "" ? null : parseInt(trimmed, 10);
    if (trimmed !== "" && (isNaN(newQty!) || newQty! < 0)) { setEditing(null); return; }
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock_quantity: newQty } : p))
    );
    setEditing(null);
    startTransition(async () => {
      const res = await updateProductStock(product.id, newQty);
      if (!res.success) {
        setLocalProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, stock_quantity: product.stock_quantity } : p))
        );
        showToast(res.error ?? "Stock update failed", false);
      } else {
        showToast("Stock updated", true);
      }
    });
  };

  // ── Short description editing ──────────────────────────────────────────────
  const startEditDesc = (product: AdminProduct) => {
    setEditing({ id: product.id, type: "desc", value: product.short_description ?? "" });
  };

  const commitDesc = (product: AdminProduct) => {
    if (!editing || editing.type !== "desc") return;
    const val = editing.value;
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, short_description: val } : p))
    );
    setEditing(null);
    startTransition(async () => {
      const res = await updateProductShortDescription(product.id, val);
      if (!res.success) showToast(res.error ?? "Update failed", false);
      else showToast("Description saved", true);
    });
  };

  const activeCount = localProducts.filter((p) => p.is_active).length;
  const inactiveCount = localProducts.filter((p) => !p.is_active).length;

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.ok ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      {/* Short description modal */}
      {editing?.type === "desc" && (() => {
        const product = localProducts.find((p) => p.id === editing.id)!;
        return (
          <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl p-6 shadow-xl">
              <h3 className="font-bold text-[#1A1917] mb-1">{product.name}</h3>
              <p className="text-xs text-[#6B6966] mb-4">Edit short description (HTML supported)</p>
              <textarea
                autoFocus
                value={editing.value}
                onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                rows={6}
                className="w-full border border-[#E5E4E0] px-3 py-2 text-sm font-mono text-[#1A1917] outline-none focus:border-[#0F2647] resize-none"
              />
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 text-sm text-[#6B6966] border border-[#E5E4E0] hover:border-[#1A1917] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => commitDesc(product)}
                  className="px-4 py-2 text-sm font-semibold bg-[#0F2647] text-white hover:bg-[#1B3D6E] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Stats bar */}
      <div className="flex gap-6 mb-6 text-sm text-[#6B6966]">
        <span><strong className="text-[#1A1917]">{localProducts.length}</strong> total</span>
        <span><strong className="text-emerald-600">{activeCount}</strong> active</span>
        <span><strong className="text-red-500">{inactiveCount}</strong> inactive</span>
        {isPending && <span className="text-[#C8A882]">Saving…</span>}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex flex-wrap gap-1">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                activeBrand === b
                  ? "bg-[#0F2647] text-white"
                  : "bg-white border border-[#E5E4E0] text-[#6B6966] hover:border-[#0F2647] hover:text-[#0F2647]"
              }`}
            >
              {b === "all" ? "All" : BRAND_LABELS[b]}
              {b !== "all" && (
                <span className="ml-1 opacity-60">
                  ({localProducts.filter((p) => p.brand_slug === b).length})
                </span>
              )}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:ml-auto w-full sm:w-64 border border-[#E5E4E0] bg-white px-3 py-1.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E4E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E4E0] bg-[#F8F8F7]">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-12"></th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966]">Product</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-32">Price</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-24 hidden lg:table-cell">Stock</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-20">Active</th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#6B6966] w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#6B6966]">
                    No products found
                  </td>
                </tr>
              )}
              {filtered.map((product) => {
                const isEditingPrice = editing?.type === "price" && editing.id === product.id;
                const isEditingStock = editing?.type === "stock" && editing.id === product.id;
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-[#F2F1EF] transition-colors hover:bg-[#FAFAF9] ${
                      !product.is_active ? "opacity-50" : ""
                    }`}
                  >
                    {/* Thumbnail */}
                    <td className="px-3 py-2">
                      <div className="relative w-10 h-10 bg-[#F2F1EF] flex-shrink-0 overflow-hidden">
                        {product.primaryImage ? (
                          <Image
                            src={product.primaryImage}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-[#939EBA]">
                            {product.brand_slug.slice(0, 3).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name + brand */}
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 mb-1 ${
                          BRAND_COLORS[product.brand_slug] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {BRAND_LABELS[product.brand_slug] ?? product.brand_slug}
                      </span>
                      <p className="text-[#1A1917] font-medium leading-snug">{product.name}</p>
                    </td>

                    {/* Subcategory */}
                    <td className="px-4 py-2 hidden md:table-cell">
                      <span className="text-xs text-[#6B6966]">
                        {product.subcategory ?? "—"}
                      </span>
                    </td>

                    {/* Price — inline edit */}
                    <td className="px-4 py-2">
                      {isEditingPrice ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-[#6B6966]">R</span>
                          <input
                            ref={inlineInputRef}
                            type="number"
                            step="0.01"
                            min="0"
                            value={editing.value}
                            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                            onBlur={() => commitPrice(product)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitPrice(product);
                              if (e.key === "Escape") setEditing(null);
                            }}
                            className="w-20 border border-[#0F2647] px-1.5 py-0.5 text-sm text-[#1A1917] outline-none"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditPrice(product)}
                          className="text-sm text-[#1A1917] hover:text-[#0F2647] font-medium group flex items-center gap-1"
                          title="Click to edit price"
                        >
                          {formatPrice(product.price_cents)}
                          <svg className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      )}
                    </td>

                    {/* Stock — inline edit */}
                    <td className="px-4 py-2 hidden lg:table-cell">
                      {isEditingStock ? (
                        <input
                          ref={inlineInputRef}
                          type="number"
                          step="1"
                          min="0"
                          placeholder="qty"
                          value={editing.value}
                          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                          onBlur={() => commitStock(product)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commitStock(product);
                            if (e.key === "Escape") setEditing(null);
                          }}
                          className="w-16 border border-[#0F2647] px-1.5 py-0.5 text-sm text-[#1A1917] outline-none"
                        />
                      ) : (
                        <button
                          onClick={() => startEditStock(product)}
                          className={`text-sm font-medium group flex items-center gap-1 ${
                            product.stock_quantity === 0
                              ? "text-red-500"
                              : product.stock_quantity != null && product.stock_quantity <= 5
                              ? "text-amber-600"
                              : "text-[#6B6966] hover:text-[#0F2647]"
                          }`}
                          title="Click to edit stock"
                        >
                          {formatStock(product.stock_quantity)}
                          <svg className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      )}
                    </td>

                    {/* Active toggle */}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleToggle(product.id, product.is_active)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          product.is_active ? "bg-emerald-500" : "bg-[#D0CFC9]"
                        }`}
                        title={product.is_active ? "Click to deactivate" : "Click to activate"}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            product.is_active ? "translate-x-4" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => startEditDesc(product)}
                          className="text-xs text-[#6B6966] hover:text-[#0F2647] underline transition-colors"
                          title="Edit short description"
                        >
                          Short desc
                        </button>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-semibold text-[#0F2647] hover:text-[#1B3D6E] border border-[#0F2647]/20 hover:border-[#0F2647] px-2 py-1 transition-colors"
                          title="Full product editor"
                        >
                          Full edit
                        </Link>
                        <Link
                          href={`/shop/products/${product.slug}`}
                          target="_blank"
                          className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors"
                          title="View on site"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#6B6966]">
        {filtered.length} of {localProducts.length} products shown
        {activeBrand !== "all" && ` · filtered by ${BRAND_LABELS[activeBrand]}`}
        {search && ` · searching "${search}"`}
      </p>
    </div>
  );
}

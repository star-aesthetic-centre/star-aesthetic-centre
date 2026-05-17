"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateFullProduct } from "@/app/admin/products/actions";
import FunnelEditor, { type FunnelProductOption } from "@/components/admin/FunnelEditor";
import RichHtmlEditor from "@/components/admin/RichHtmlEditor";
import { parseFunnelConfig, type FunnelConfig } from "@/lib/funnel";

interface Product {
  id: string;
  brand_slug: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  price_cents: number | null;
  is_active: boolean;
  subcategory: string | null;
  stock_quantity: number | null;
  funnel_config?: unknown;
}

interface Props {
  product: Product;
  allProducts: FunnelProductOption[];
  funnelConfigSupported?: boolean;
}

export default function EditProductClient({
  product,
  allProducts,
  funnelConfigSupported = false,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Form state
  const [price, setPrice] = useState(
    product.price_cents != null ? (product.price_cents / 100).toFixed(2) : ""
  );
  const [stock, setStock] = useState(
    product.stock_quantity != null ? String(product.stock_quantity) : ""
  );
  const [shortDesc, setShortDesc] = useState(product.short_description ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [isActive, setIsActive] = useState(product.is_active);
  const [funnelConfig, setFunnelConfig] = useState<FunnelConfig>(() =>
    parseFunnelConfig(product.funnel_config)
  );
  const [activeTab, setActiveTab] = useState<"details" | "short" | "full" | "funnel">("details");

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = () => {
    const parsedPrice = parseFloat(price);
    if (price !== "" && (isNaN(parsedPrice) || parsedPrice < 0)) {
      showToast("Invalid price", false);
      return;
    }

    const stockNum = stock.trim() === "" ? null : parseInt(stock, 10);
    if (stock.trim() !== "" && (isNaN(stockNum!) || stockNum! < 0)) {
      showToast("Invalid stock quantity", false);
      return;
    }

    const payload: Parameters<typeof updateFullProduct>[1] = {
      is_active: isActive,
      short_description: shortDesc,
      description: description,
      stock_quantity: stockNum,
    };

    if (funnelConfigSupported) {
      payload.funnel_config = funnelConfig;
    }

    if (price !== "") {
      payload.price_cents = Math.round(parsedPrice * 100);
    }

    startTransition(async () => {
      const res = await updateFullProduct(product.id, payload);
      if (res.success) {
        showToast("Product saved ✓", true);
      } else {
        showToast(res.error ?? "Save failed", false);
      }
    });
  };

  const inputClass =
    "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
  const readonlyClass =
    "w-full border border-[#E5E4E0] bg-[#F8F8F7] px-3 py-2.5 text-sm text-[#6B6966] font-mono";

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-medium shadow-lg ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.ok ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      {/* Tab nav */}
      <div className="flex border-b border-[#E5E4E0] mb-6">
        {(["details", "short", "full", "funnel"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === tab
                ? "text-[#0F2647] border-[#0F2647]"
                : "text-[#6B6966] border-transparent hover:text-[#1A1917]"
            }`}
          >
            {tab === "details" && "Details & Price"}
            {tab === "short" && "Short Description"}
            {tab === "full" && "Full Description"}
            {tab === "funnel" && "Upsell Funnel"}
          </button>
        ))}
      </div>

      {/* ── TAB: Details & Price ─────────────────────────────────────────── */}
      {activeTab === "details" && (
        <div className="space-y-6">
          {/* Read-only info */}
          <div className="bg-white border border-[#E5E4E0] p-6">
            <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4">
              Product Info (read-only)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Slug</label>
                <div className={readonlyClass}>{product.slug}</div>
              </div>
              <div>
                <label className={labelClass}>SKU</label>
                <div className={readonlyClass}>{product.sku ?? "—"}</div>
              </div>
              <div>
                <label className={labelClass}>Subcategory</label>
                <div className={readonlyClass}>{product.subcategory ?? "—"}</div>
              </div>
            </div>
          </div>

          {/* Editable fields */}
          <div className="bg-white border border-[#E5E4E0] p-6">
            <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-4">
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price (ZAR, inc VAT)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6B6966]">R</span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`${inputClass} pl-7`}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="stock" className={labelClass}>
                  Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  step="1"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={inputClass}
                  placeholder="Leave blank = not tracked"
                />
                <p className="text-xs text-[#6B6966] mt-1">
                  Leave blank to not track stock
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Visibility</label>
              <button
                onClick={() => setIsActive((v) => !v)}
                className={`flex items-center gap-3 px-4 py-3 border transition-colors text-sm font-medium ${
                  isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-[#E5E4E0] bg-[#F8F8F7] text-[#6B6966]"
                }`}
              >
                <span
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isActive ? "bg-emerald-500" : "bg-[#D0CFC9]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      isActive ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </span>
                {isActive ? "Active — visible in shop" : "Inactive — hidden from shop"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Short Description ──────────────────────────────────────── */}
      {activeTab === "short" && (
        <div className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-1">
            Short Description
          </h2>
          <p className="text-xs text-[#6B6966] mb-4">
            2–3 sentences. Opens with emotional pain — not ingredients. Use Normal view to type; switch to HTML only if needed.
          </p>
          <RichHtmlEditor
            value={shortDesc}
            onChange={setShortDesc}
            variant="compact"
            minHeight="160px"
            placeholder="You've been trying every cream on the shelf…"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-[#6B6966]">
            <span>{shortDesc.replace(/<[^>]*>/g, "").length} chars (text only)</span>
            <span className="text-[#939EBA]">Target: 150–300 chars</span>
          </div>
        </div>
      )}

      {activeTab === "funnel" && (
        <div className="space-y-4">
          {!funnelConfigSupported && (
            <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Upsell funnel requires a database migration. Run{" "}
              <code className="text-xs">scripts/output/product-funnel-migration.sql</code> in Supabase,
              then refresh this page. You can still save price, stock, and descriptions on other tabs.
            </div>
          )}
          <FunnelEditor
            config={funnelConfig}
            onChange={setFunnelConfig}
            allProducts={allProducts}
            currentProductId={product.id}
            disabled={!funnelConfigSupported}
          />
        </div>
      )}

      {/* ── TAB: Full Description ───────────────────────────────────────── */}
      {activeTab === "full" && (
        <div className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest mb-1">
            Full Description
          </h2>
          <p className="text-xs text-[#6B6966] mb-4">
            Full product page content. Use headings and lists in Normal view; switch to HTML for fine-tuning.
          </p>
          <RichHtmlEditor
            value={description}
            onChange={setDescription}
            variant="full"
            minHeight="420px"
            placeholder="Start with a heading, then your sections…"
          />
          <div className="mt-3 text-xs text-[#6B6966]">
            {description.length.toLocaleString()} chars
          </div>
        </div>
      )}

      {/* Save bar */}
      <div className="mt-6 flex items-center justify-between bg-white border border-[#E5E4E0] px-6 py-4 sticky bottom-4 shadow-sm">
        <Link
          href="/admin/products"
          className="text-sm text-[#6B6966] hover:text-[#1A1917] transition-colors"
        >
          ← Back to products
        </Link>
        <div className="flex items-center gap-4">
          {isPending && (
            <span className="text-xs text-[#C8A882]">Saving…</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-[#0F2647] text-white text-sm font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Save Product
          </button>
          <Link
            href={`/shop/products/${product.slug}`}
            target="_blank"
            className="text-xs text-[#6B6966] hover:text-[#0F2647] transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View on site
          </Link>
        </div>
      </div>
    </div>
  );
}

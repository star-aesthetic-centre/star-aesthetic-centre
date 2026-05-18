"use client";

import { useState } from "react";
import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";
import {
  DEFAULT_FUNNEL_STEPS,
  excerptPlainText,
  MAX_PRODUCTS_PER_FUNNEL_STEP,
  type FunnelConfig,
  type FunnelDiscountPercent,
  type FunnelStepConfig,
} from "@/lib/funnel";

export type FunnelProductOption = {
  id: string;
  name: string;
  brand_slug: string;
  price_cents: number | null;
  short_description: string | null;
  image_url: string | null;
};

const DISCOUNTS: FunnelDiscountPercent[] = [10, 15, 20, 25];

const labelClass = "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
const inputClass =
  "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";

type Props = {
  config: FunnelConfig;
  onChange: (config: FunnelConfig) => void;
  allProducts: FunnelProductOption[];
  currentProductId: string;
  disabled?: boolean;
  onSuggest?: () => Promise<{ rationale?: string; error?: string }>;
};

function stepCopyFromProduct(product: FunnelProductOption): Pick<FunnelStepConfig, "title" | "description"> {
  return {
    title: product.name,
    description: product.short_description
      ? excerptPlainText(product.short_description)
      : "",
  };
}

export default function FunnelEditor({
  config,
  onChange,
  allProducts,
  currentProductId,
  disabled = false,
  onSuggest,
}: Props) {
  const [previewMobile, setPreviewMobile] = useState<Record<number, boolean>>({});
  const [productSearch, setProductSearch] = useState<Record<number, string>>({});
  const [editingStep, setEditingStep] = useState(0);
  const [suggesting, setSuggesting] = useState(false);
  const [suggestNote, setSuggestNote] = useState<string | null>(null);

  const stepCount = config.steps.length;
  const pickerProducts = allProducts.filter((p) => p.id !== currentProductId);
  const productById = new Map(allProducts.map((p) => [p.id, p]));

  function setEnabled(enabled: boolean) {
    onChange({ ...config, enabled });
  }

  function setStepCount(count: 1 | 2) {
    const steps =
      count === 1
        ? [config.steps[0] ?? DEFAULT_FUNNEL_STEPS[0]]
        : [
            config.steps[0] ?? DEFAULT_FUNNEL_STEPS[0],
            config.steps[1] ?? DEFAULT_FUNNEL_STEPS[1],
          ];
    onChange({ ...config, steps });
  }

  function updateStep(index: number, patch: Partial<FunnelStepConfig>) {
    onChange({
      ...config,
      steps: config.steps.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    });
  }

  function toggleProduct(stepIndex: number, productId: string) {
    const step = config.steps[stepIndex];
    if (!step) return;

    const exists = step.productIds.includes(productId);
    const newIds = exists
      ? step.productIds.filter((id) => id !== productId)
      : [...step.productIds, productId].slice(0, MAX_PRODUCTS_PER_FUNNEL_STEP);

    const patch: Partial<FunnelStepConfig> = { productIds: newIds };

    const primaryId = newIds[0];
    if (primaryId) {
      const primary = productById.get(primaryId);
      if (primary) {
        Object.assign(patch, stepCopyFromProduct(primary));
      }
    }

    updateStep(stepIndex, patch);
  }

  function moveProduct(stepIndex: number, productId: string, direction: -1 | 1) {
    const step = config.steps[stepIndex];
    if (!step) return;
    const idx = step.productIds.indexOf(productId);
    if (idx < 0) return;
    const next = idx + direction;
    if (next < 0 || next >= step.productIds.length) return;

    const newIds = [...step.productIds];
    [newIds[idx], newIds[next]] = [newIds[next], newIds[idx]];

    const primary = productById.get(newIds[0]);
    const patch: Partial<FunnelStepConfig> = { productIds: newIds };
    if (primary) {
      Object.assign(patch, stepCopyFromProduct(primary));
    }
    updateStep(stepIndex, patch);
  }

  return (
    <fieldset
      disabled={disabled}
      className={`m-0 min-w-0 space-y-6 border-0 p-0 ${disabled ? "opacity-60" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border border-[#E5E4E0] bg-white p-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#1A1917]">Post-add upsell funnel</p>
          <p className="text-xs text-[#6B6966] mt-1">
            Suggest routine to pre-fill steps, adjust products, turn on, and save. Off = hidden from
            shoppers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onSuggest && (
            <button
              type="button"
              disabled={suggesting || disabled}
              onClick={async () => {
                setSuggestNote(null);
                setSuggesting(true);
                try {
                  const res = await onSuggest();
                  if (res.error) setSuggestNote(res.error);
                  else if (res.rationale) setSuggestNote(res.rationale);
                } finally {
                  setSuggesting(false);
                }
              }}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-[#C8A882] text-[#0F2647] bg-[#FFF8F0] hover:bg-[#FFF0E0] disabled:opacity-50 transition-colors"
            >
              {suggesting ? "Suggesting…" : "Suggest routine"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setEnabled(!config.enabled)}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium border transition-colors ${
              config.enabled
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[#E5E4E0] bg-[#F8F8F7] text-[#6B6966]"
            }`}
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                config.enabled ? "bg-emerald-500" : "bg-[#D0CFC9]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  config.enabled ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
            {config.enabled ? "On" : "Off"}
          </button>
        </div>
      </div>

      {suggestNote && (
        <p className="text-sm px-4 py-3 border border-blue-200 bg-blue-50 text-blue-900">{suggestNote}</p>
      )}

      {!config.enabled && (
        <p className="text-xs text-[#6B6966] border border-dashed border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3">
          Funnel is off on the live site — configure below, turn on, and save.
        </p>
      )}

      <>
          <div>
            <label className={labelClass}>Number of steps</label>
            <div className="flex gap-2">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStepCount(n)}
                  className={`px-4 py-2 text-xs font-bold border transition-colors ${
                    stepCount === n
                      ? "border-[#0F2647] bg-[#0F2647] text-white"
                      : "border-[#E5E4E0] text-[#6B6966] hover:border-[#939EBA]"
                  }`}
                >
                  {n} step{n > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {stepCount > 1 && (
            <div className="flex gap-2 border border-[#E5E4E0] bg-white p-2">
              {config.steps.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setEditingStep(i)}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    editingStep === i
                      ? "bg-[#0F2647] text-white"
                      : "text-[#6B6966] hover:bg-[#F8F8F7]"
                  }`}
                >
                  Step {i + 1}
                  {s.productIds.length > 0 ? ` (${s.productIds.length})` : ""}
                </button>
              ))}
            </div>
          )}

          {(() => {
            const stepIndex = Math.min(editingStep, Math.max(0, stepCount - 1));
            const step = config.steps[stepIndex];
            if (!step) return null;

            const otherStepIds = new Set(
              config.steps.flatMap((s, i) => (i === stepIndex ? [] : s.productIds))
            );

            const selectedProducts = step.productIds
              .map((id) => productById.get(id))
              .filter((p): p is FunnelProductOption => Boolean(p));

            const query = (productSearch[stepIndex] ?? "").trim().toLowerCase();
            const filteredChoices = pickerProducts.filter((p) => {
              if (otherStepIds.has(p.id)) return false;
              if (!query) return true;
              return (
                p.name.toLowerCase().includes(query) ||
                p.brand_slug.toLowerCase().includes(query)
              );
            });

            const isMobile = previewMobile[stepIndex] ?? false;

            return (
              <div key={stepIndex} className="border border-[#E5E4E0] bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA]">
                    Configure step {stepIndex + 1} of {stepCount}
                  </p>
                  {stepCount > 1 && stepIndex === 0 && (
                    <button
                      type="button"
                      onClick={() => setEditingStep(1)}
                      className="text-xs font-bold text-[#C8A882] hover:underline"
                    >
                      Step 1 done → configure step 2 →
                    </button>
                  )}
                  {stepCount > 1 && stepIndex === 1 && (
                    <button
                      type="button"
                      onClick={() => setEditingStep(0)}
                      className="text-xs font-bold text-[#6B6966] hover:underline"
                    >
                      ← back to step 1
                    </button>
                  )}
                </div>
                {otherStepIds.size > 0 && (
                  <p className="text-xs text-[#6B6966]">
                    Products already used in the other step are hidden from this list.
                  </p>
                )}

                {/* Live preview — reflects title, description, selected products */}
                <div className="border border-dashed border-[#C8A882]/50 bg-[#FFF8F0] px-3 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#939EBA]">
                      Customer preview
                    </p>
                    <div className="inline-flex rounded border border-[#E5E4E0] bg-white p-0.5 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPreviewMobile((p) => ({ ...p, [stepIndex]: false }))}
                        className={`inline-flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                          !isMobile ? "bg-[#0F2647] text-white" : "text-[#6B6966] hover:bg-[#F8F8F7]"
                        }`}
                      >
                        <Monitor className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMobile((p) => ({ ...p, [stepIndex]: true }))}
                        className={`inline-flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                          isMobile ? "bg-[#0F2647] text-white" : "text-[#6B6966] hover:bg-[#F8F8F7]"
                        }`}
                      >
                        <Smartphone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        Mobile
                      </button>
                    </div>
                  </div>

                  <div
                    className={`mx-auto rounded border border-[#E5E4E0] bg-white px-4 py-4 transition-[max-width] duration-200 ${
                      isMobile ? "max-w-[min(100%,20rem)] shadow-sm" : "max-w-2xl"
                    }`}
                  >
                    <h3
                      className={`font-heading font-bold text-[#0F2647] leading-tight mb-2 ${
                        isMobile ? "text-base" : "text-lg"
                      }`}
                    >
                      {step.title?.trim() || `Step ${stepIndex + 1} Offer`}
                    </h3>
                    <p
                      className={`text-[#636374] leading-relaxed mb-4 ${
                        isMobile ? "text-xs" : "text-sm"
                      }`}
                    >
                      {step.description?.trim() ||
                        "Select a product below — its short description will appear here."}
                    </p>

                    {selectedProducts.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {selectedProducts.map((p) => (
                          <div
                            key={p.id}
                            className="flex w-[calc(50%-0.375rem)] min-w-[8rem] flex-col border border-[#E2E2E6] bg-[#F7F7F8] sm:w-28"
                          >
                            <div className="relative aspect-square bg-white">
                              {p.image_url ? (
                                <Image
                                  src={p.image_url}
                                  alt={p.name}
                                  fill
                                  className="object-contain p-2"
                                  sizes="112px"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-[10px] text-[#939EBA]">
                                  No image
                                </div>
                              )}
                            </div>
                            <p className="line-clamp-2 px-2 py-1.5 text-[10px] font-semibold leading-tight text-[#1A1917]">
                              {p.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#939EBA] italic">No offer products selected yet</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(stepIndex, { title: e.target.value })}
                    className={inputClass}
                    placeholder={DEFAULT_FUNNEL_STEPS[stepIndex]?.title}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description (optional)</label>
                  <textarea
                    value={step.description}
                    onChange={(e) => updateStep(stepIndex, { description: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Auto-filled from the first selected product's short description"
                  />
                </div>

                {selectedProducts.length > 0 && (
                  <div>
                    <label className={labelClass}>Selected offers (first = headline source)</label>
                    <ul className="space-y-2">
                      {selectedProducts.map((p, i) => (
                        <li
                          key={p.id}
                          className="flex items-center gap-3 border border-[#E5E4E0] bg-[#F8F8F7] px-3 py-2"
                        >
                          <div className="relative h-12 w-12 shrink-0 bg-white border border-[#E5E4E0]">
                            {p.image_url ? (
                              <Image
                                src={p.image_url}
                                alt=""
                                fill
                                className="object-contain p-1"
                                sizes="48px"
                              />
                            ) : (
                              <span className="flex h-full items-center justify-center text-[9px] text-[#939EBA]">
                                —
                              </span>
                            )}
                          </div>
                          <span className="flex-1 text-sm font-medium text-[#1A1917]">{p.name}</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              disabled={i === 0}
                              onClick={() => moveProduct(stepIndex, p.id, -1)}
                              className="px-2 py-1 text-xs border border-[#E5E4E0] disabled:opacity-30"
                              aria-label="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              disabled={i === selectedProducts.length - 1}
                              onClick={() => moveProduct(stepIndex, p.id, 1)}
                              className="px-2 py-1 text-xs border border-[#E5E4E0] disabled:opacity-30"
                              aria-label="Move down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleProduct(stepIndex, p.id)}
                              className="px-2 py-1 text-xs text-red-700 border border-red-200 hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Bundle discount</label>
                  <select
                    value={step.discountPercent}
                    onChange={(e) =>
                      updateStep(stepIndex, {
                        discountPercent: Number(e.target.value) as FunnelDiscountPercent,
                      })
                    }
                    className={inputClass}
                  >
                    {DISCOUNTS.map((d) => (
                      <option key={d} value={d}>
                        {d}% off
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Offer products (select up to {MAX_PRODUCTS_PER_FUNNEL_STEP} — typically 1–2)
                  </label>
                  <input
                    type="search"
                    value={productSearch[stepIndex] ?? ""}
                    onChange={(e) =>
                      setProductSearch((prev) => ({ ...prev, [stepIndex]: e.target.value }))
                    }
                    placeholder="Search by name or brand…"
                    className={`${inputClass} mb-2`}
                  />
                  <div className="max-h-64 overflow-y-auto border border-[#E5E4E0] divide-y divide-[#E5E4E0]">
                    {filteredChoices.length === 0 ? (
                      <p className="p-3 text-xs text-[#6B6966]">No products match this search.</p>
                    ) : (
                      filteredChoices.map((p) => {
                        const selected = step.productIds.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => toggleProduct(stepIndex, p.id)}
                            className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                              selected
                                ? "bg-[#0F2647]/5 text-[#0F2647]"
                                : "hover:bg-[#F8F8F7] text-[#1A1917]"
                            }`}
                          >
                            <div className="relative h-11 w-11 shrink-0 border border-[#E5E4E0] bg-white">
                              {p.image_url ? (
                                <Image
                                  src={p.image_url}
                                  alt=""
                                  fill
                                  className="object-contain p-1"
                                  sizes="44px"
                                />
                              ) : (
                                <span className="flex h-full items-center justify-center text-[9px] text-[#939EBA]">
                                  —
                                </span>
                              )}
                            </div>
                            <span className="flex-1 min-w-0">
                              <span className="font-semibold block truncate">{p.name}</span>
                              {p.short_description && (
                                <span className="text-[11px] text-[#6B6966] line-clamp-1 block mt-0.5">
                                  {excerptPlainText(p.short_description, 72)}
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-[#6B6966] capitalize shrink-0">
                              {p.brand_slug}
                            </span>
                            <span
                              className={`shrink-0 text-[10px] font-bold uppercase ${
                                selected ? "text-emerald-700" : "text-[#939EBA]"
                              }`}
                            >
                              {selected ? "✓" : "+"}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                  <p className="text-xs text-[#939EBA] mt-1">
                    {step.productIds.length} / {MAX_PRODUCTS_PER_FUNNEL_STEP} selected
                  </p>
                </div>
              </div>
            );
          })()}
      </>
    </fieldset>
  );
}

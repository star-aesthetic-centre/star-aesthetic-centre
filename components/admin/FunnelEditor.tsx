"use client";

import {
  DEFAULT_FUNNEL_STEPS,
  type FunnelConfig,
  type FunnelDiscountPercent,
  type FunnelStepConfig,
} from "@/lib/funnel";

export type FunnelProductOption = {
  id: string;
  name: string;
  brand_slug: string;
  price_cents: number | null;
};

const DISCOUNTS: FunnelDiscountPercent[] = [10, 15, 20];

const labelClass = "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
const inputClass =
  "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";

type Props = {
  config: FunnelConfig;
  onChange: (config: FunnelConfig) => void;
  allProducts: FunnelProductOption[];
  currentProductId: string;
};

export default function FunnelEditor({ config, onChange, allProducts, currentProductId }: Props) {
  const stepCount = config.steps.length;

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
    const ids = step.productIds.includes(productId)
      ? step.productIds.filter((id) => id !== productId)
      : [...step.productIds, productId].slice(0, 6);
    updateStep(stepIndex, { productIds: ids });
  }

  const pickerProducts = allProducts.filter((p) => p.id !== currentProductId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border border-[#E5E4E0] bg-white p-4">
        <div>
          <p className="text-sm font-bold text-[#1A1917]">Post-add upsell funnel</p>
          <p className="text-xs text-[#6B6966] mt-1">
            After Add to cart, show up to 2 discounted offer steps before checkout.
          </p>
        </div>
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
          {config.enabled ? "Enabled" : "Off"}
        </button>
      </div>

      {config.enabled && (
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

          {config.steps.map((step, stepIndex) => (
            <div key={stepIndex} className="border border-[#E5E4E0] bg-white p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA]">
                Step {stepIndex + 1}
              </p>

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
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </div>

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
                <label className={labelClass}>Offer products (select up to 6)</label>
                <div className="max-h-48 overflow-y-auto border border-[#E5E4E0] divide-y divide-[#E5E4E0]">
                  {pickerProducts.length === 0 ? (
                    <p className="p-3 text-xs text-[#6B6966]">No other products available.</p>
                  ) : (
                    pickerProducts.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[#F8F8F7] cursor-pointer text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={step.productIds.includes(p.id)}
                          onChange={() => toggleProduct(stepIndex, p.id)}
                          className="shrink-0"
                        />
                        <span className="flex-1 text-[#1A1917]">{p.name}</span>
                        <span className="text-xs text-[#6B6966] capitalize">{p.brand_slug}</span>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-[#939EBA] mt-1">
                  {step.productIds.length} selected
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

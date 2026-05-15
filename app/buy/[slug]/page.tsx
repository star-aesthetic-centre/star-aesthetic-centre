"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, ChevronRight, Tag, Shield, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { applyFunnelDiscount, FUNNEL_OFFER_LABEL } from "@/lib/funnel";
import type { CartItem } from "@/lib/cart-context";

type FunnelApiProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  sku: string | null;
};

type FunnelApiStep = {
  index: number;
  title: string;
  description: string;
  discountPercent: 10 | 15 | 20;
  products: FunnelApiProduct[];
};

type FunnelResponse = {
  enabled: boolean;
  sourceProduct?: { id: string; slug: string; name: string };
  steps: FunnelApiStep[];
};

const fmt = (n: number) =>
  `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function CartSummary({ items, total }: { items: CartItem[]; total: number }) {
  return (
    <div className="border border-[#E2E2E6] bg-white p-5">
      <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#636374]">
        <ShoppingBag className="h-3.5 w-3.5" /> Your order so far
      </p>
      <div className="mb-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex-1 truncate font-medium text-[#1A1A1F]">{item.name}</span>
            <span className="shrink-0 text-xs text-[#636374]">×{item.quantity}</span>
            <span className="shrink-0 font-bold text-[#1A1A1F]">{fmt(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#E2E2E6] pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#636374]">Total</span>
          <span className="font-heading text-xl font-bold text-[#1A1A1F]">{fmt(total)}</span>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-[#636374]">
        <div className="flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-[#939EBA]" /> Free delivery on orders over R800
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#939EBA]" /> EFT secure checkout
        </div>
      </div>
    </div>
  );
}

export default function FunnelPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { state, dispatch, subtotal, isHydrated } = useCart();
  const { items } = state;

  const [loading, setLoading] = useState(true);
  const [funnel, setFunnel] = useState<FunnelResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedByStep, setSelectedByStep] = useState<Record<number, string[]>>({});
  const [quantityByStep, setQuantityByStep] = useState<Record<number, 1 | 2 | 3>>({});

  const hasPrimaryInCart = useMemo(
    () => items.some((item) => item.slug === slug && !item.name.includes(FUNNEL_OFFER_LABEL)),
    [items, slug]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/funnel/${slug}`, { cache: "no-store" });
      if (!res.ok) {
        router.replace(`/shop/products/${slug}`);
        return;
      }
      const data = (await res.json()) as FunnelResponse;
      if (!data.enabled || data.steps.length === 0) {
        router.replace("/cart");
        return;
      }
      setFunnel(data);
      setLoading(false);
    }
    void load();
  }, [router, slug]);

  useEffect(() => {
    if (!isHydrated || loading) return;
    if (!hasPrimaryInCart) {
      router.replace(`/shop/products/${slug}`);
    }
  }, [hasPrimaryInCart, isHydrated, loading, router, slug]);

  if (!isHydrated || loading || !funnel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F8]">
        <p className="text-sm text-[#636374]">Loading your order…</p>
      </div>
    );
  }

  const funnelData = funnel;
  const step = funnelData.steps[currentStep];
  if (!step) {
    router.replace("/cart");
    return null;
  }

  const selectedProductIds = selectedByStep[currentStep] ?? [];
  const selectedProducts = step.products.filter((p) => selectedProductIds.includes(p.id));
  const qty = quantityByStep[currentStep] ?? 1;
  const lineTotal = selectedProducts.reduce(
    (sum, product) => sum + applyFunnelDiscount(product.price, step.discountPercent),
    0
  );
  const buttonTotal = lineTotal * qty * selectedProducts.length;

  function goNext() {
    const nextIndex = currentStep + 1;
    if (nextIndex < funnelData.steps.length && funnelData.steps[nextIndex]) {
      setCurrentStep(nextIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/cart");
  }

  function addSelectedAndContinue() {
    if (selectedProducts.length === 0) return;
    for (const selectedProduct of selectedProducts) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: `${selectedProduct.id}__funnel_${slug}_step${currentStep + 1}`,
          slug: selectedProduct.slug,
          name: `${selectedProduct.name} (${FUNNEL_OFFER_LABEL} -${step.discountPercent}%)`,
          image: selectedProduct.image ?? "",
          price: applyFunnelDiscount(selectedProduct.price, step.discountPercent),
          quantity: qty,
        },
      });
    }
    goNext();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <header className="sticky top-0 z-50 border-b border-[#E2E2E6] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-heading shrink-0 text-lg font-bold text-[#0F2647]">
            Star Aesthetic
          </Link>
          <div className="hidden flex-1 justify-center sm:flex">
            <div className="flex items-center gap-2">
              {funnelData.steps.map((_, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 text-xs font-bold ${
                    i === currentStep
                      ? "bg-[#C8A882] text-white"
                      : i < currentStep
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-[#E2E2E6] text-[#636374]"
                  }`}
                >
                  Step {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#636374]">Cart total</p>
            <p className="font-heading text-lg font-bold leading-none text-[#1A1A1F]">{fmt(subtotal)}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div key={currentStep}>
          <div className="mb-8">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#939EBA]">
              Step {currentStep + 1} of {funnelData.steps.length}
            </p>
            <h1 className="font-heading mb-3 text-3xl font-bold leading-tight text-[#1A1A1F] sm:text-4xl">
              {step.title || "Complete your routine"}
            </h1>
            {step.description && (
              <p className="mb-2 max-w-xl text-base leading-relaxed text-[#636374]">{step.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 border border-[#C8A882]/30 bg-[#FFF8F0] px-4 py-2">
              <Tag className="h-4 w-4 text-[#C8A882]" />
              <span className="text-sm font-bold text-[#0F2647]">
                Exclusive {step.discountPercent}% off — bundle with your order
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#636374]">
              Quantity per selected item
            </label>
            <div className="inline-flex items-center gap-2 border border-[#E2E2E6] bg-white p-2">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuantityByStep((prev) => ({ ...prev, [currentStep]: n }))}
                  className={`h-9 min-w-9 px-3 text-sm font-bold border transition-colors ${
                    (quantityByStep[currentStep] ?? 1) === n
                      ? "border-[#0F2647] bg-[#0F2647] text-white"
                      : "border-[#E2E2E6] bg-white text-[#1A1A1F] hover:border-[#939EBA]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {step.products.map((product) => {
              const isSelected = selectedProductIds.includes(product.id);
              const discounted = applyFunnelDiscount(product.price, step.discountPercent);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    setSelectedByStep((prev) => {
                      const existing = prev[currentStep] ?? [];
                      const next = existing.includes(product.id)
                        ? existing.filter((id) => id !== product.id)
                        : [...existing, product.id];
                      return { ...prev, [currentStep]: next };
                    })
                  }
                  className={`relative border-2 p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#C8A882] bg-[#FFF8F0] shadow-md"
                      : "border-[#E2E2E6] bg-white hover:border-[#939EBA]"
                  }`}
                >
                  <div
                    className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center ${
                      isSelected ? "bg-[#C8A882]" : "border border-[#E2E2E6] bg-[#F7F7F8]"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="relative mb-3 mt-1 h-28">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-2"
                        sizes="180px"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#F7F7F8]" />
                    )}
                  </div>
                  <p className="mb-2 text-sm font-bold leading-snug text-[#1A1A1F]">{product.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg font-bold text-[#C8A882]">{fmt(discounted)}</span>
                    <span className="text-xs text-[#636374] line-through">{fmt(product.price)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              type="button"
              onClick={addSelectedAndContinue}
              disabled={selectedProducts.length === 0}
              className="flex w-full items-center justify-center gap-2 bg-[#C8A882] py-4 text-base font-bold text-white transition-colors hover:bg-[#A08060] disabled:opacity-40"
            >
              <ShoppingBag className="h-5 w-5" />
              {selectedProducts.length > 0
                ? `Add ${selectedProducts.length * qty} item${selectedProducts.length * qty > 1 ? "s" : ""} for ${fmt(buttonTotal)}`
                : "Select one or more products"}
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="w-full border border-[#E2E2E6] bg-white py-3 text-center text-sm font-bold text-[#636374] transition-colors hover:border-[#939EBA] hover:text-[#1A1A1F]"
            >
              No thanks — skip this step
            </button>
          </div>

          <div className="mt-8">
            <CartSummary items={items} total={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}

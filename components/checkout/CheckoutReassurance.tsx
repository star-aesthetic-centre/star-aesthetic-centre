"use client";

import { useEffect, useState } from "react";
import { Shield, Stethoscope, Truck } from "lucide-react";
import type { CartItem } from "@/lib/cart-context";
import { FUNNEL_OFFER_LABEL } from "@/lib/funnel";

type Quote = { quote: string; attribution: string };

type Props = {
  items: CartItem[];
};

export default function CheckoutReassurance({ items }: Props) {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const primarySlug =
    items.find((i) => !i.name.includes(FUNNEL_OFFER_LABEL))?.slug ??
    items[0]?.slug;

  useEffect(() => {
    if (!primarySlug) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/checkout/reassurance?slugs=${encodeURIComponent(primarySlug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setProductName(data.productName ?? null);
        setQuotes(Array.isArray(data.quotes) ? data.quotes : []);
      })
      .catch(() => {
        if (!cancelled) {
          setProductName(null);
          setQuotes([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [primarySlug]);

  return (
    <div className="space-y-4">
      <div className="border border-[#E2E2E6] bg-white p-5" data-reassurance-trust>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#939EBA] mb-3">
          You&apos;re in good hands
        </p>
        <ul className="space-y-2.5 text-sm text-[#636374]">
          <li className="flex gap-2">
            <Stethoscope className="h-4 w-4 shrink-0 text-[#C8A882] mt-0.5" />
            Medical-grade skincare from brands Dr Bangalee uses in clinic
          </li>
          <li className="flex gap-2">
            <Shield className="h-4 w-4 shrink-0 text-[#C8A882] mt-0.5" />
            EFT banking details sent by email after you place your order
          </li>
          <li className="flex gap-2">
            <Truck className="h-4 w-4 shrink-0 text-[#C8A882] mt-0.5" />
            Free delivery on orders over R800 · dispatched after payment clears
          </li>
        </ul>
      </div>

      {!loading && quotes.length > 0 && (
        <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F2647] mb-1">
            What customers say about {productName}
          </p>
          <p className="text-[10px] text-[#939EBA] mb-4 leading-relaxed">
            From our product information — not verified testimonials. Individual results vary.
          </p>
          <ul className="space-y-4">
            {quotes.map((q, i) => (
              <li key={i} className="text-sm">
                <p className="text-[#1A1A1F] leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
                <p className="mt-1 text-xs font-semibold text-[#939EBA]">— {q.attribution}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

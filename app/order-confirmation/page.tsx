"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, Check, Mail, Package, AlertTriangle, Clock, Store } from "lucide-react";
import { BANK_DETAILS } from "@/lib/constants/banking";
import { COLLECTION_POINT } from "@/lib/constants/fulfilment";
import { calculateStarlights, formatStarlights } from "@/lib/utils/rewards";

const POP_EMAIL = "info@staraesthetic.site";

/**
 * What this page is allowed to say.
 *
 * Landing here proves nothing — it's a URL anyone can open, and PayFast sends
 * the customer back whether the card was approved or declined. So nothing about
 * payment is claimed until the stored order status has been read.
 */
type PaymentView = "loading" | "eft" | "paid" | "failed" | "unconfirmed";

type OrderStatus = {
  reference: string;
  status: string;
  totalCents: number;
  paymentMethod: string;
  deliveryMethod: string;
};

function formatTotal(totalParam: string | null): string | null {
  if (!totalParam) return null;
  const n = parseFloat(totalParam);
  if (isNaN(n) || n <= 0) return null;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(n);
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function CopyReferenceButton({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);
  const ref = `Order #${orderId}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-[#C8A882]/60 bg-[#0F2647] px-3 py-1.5 text-sm font-bold text-[#C8A882] transition-colors hover:bg-[#162E54]"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {ref}
    </button>
  );
}

function BankDetailsCard({ orderId, heading }: { orderId: string; heading: string }) {
  return (
    <div className="overflow-hidden border border-[#E2E2E6] bg-white shadow-sm">
      <div className="border-b border-[#E2E2E6] bg-[#0F2647] px-6 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A882]">
          EFT payment
        </p>
        <p className="mt-1 text-sm text-white/80">{heading}</p>
      </div>

      <div className="p-6">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {[
            ["Bank", BANK_DETAILS.bank],
            ["Account name", BANK_DETAILS.accountName],
            ["Account number", BANK_DETAILS.accountNo],
            ["Branch code", BANK_DETAILS.branchCode],
            ["Account type", BANK_DETAILS.accountType],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#939EBA]">{label}</dt>
              <dd className="mt-0.5 font-semibold text-[#1A1917]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 border-t border-[#E5E4E0] pt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#939EBA]">
            Payment reference (required)
          </p>
          <CopyReferenceButton orderId={orderId} />
          <p className="mt-4 flex items-start gap-2 text-sm text-[#636374]">
            <Mail size={16} className="mt-0.5 shrink-0 text-[#C8A882]" />
            <span>
              Email proof of payment to{" "}
              <a href={`mailto:${POP_EMAIL}`} className="font-semibold text-[#0F2647] hover:underline">
                {POP_EMAIL}
              </a>
              {" "}— include your order number in the subject line.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function CollectionCard() {
  return (
    <div className="mt-6 border border-[#E2E2E6] bg-white p-6">
      <h2 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#939EBA]">
        <Store size={16} />
        Collect from the clinic
      </h2>
      <p className="text-sm font-semibold text-[#1A1917]">{COLLECTION_POINT.name}</p>
      <p className="mt-1 text-sm text-[#636374]">{COLLECTION_POINT.oneLine}</p>
      <p className="mt-1 text-sm text-[#636374]">{COLLECTION_POINT.hours}</p>
      <p className="mt-4 text-sm text-[#636374] leading-relaxed">
        We&apos;ll email you as soon as your order is packed and ready — please don&apos;t travel
        before then.
      </p>
    </div>
  );
}

function StepsCard({ steps }: { steps: string[] }) {
  return (
    <div className="mt-6 border border-[#E2E2E6] bg-white p-6">
      <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#939EBA]">
        <Package size={16} />
        What happens next
      </h2>
      <ol className="space-y-4">
        {steps.map((text, i) => (
          <li key={i} className="flex gap-3 text-sm text-[#636374] leading-relaxed">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#C8A882] text-xs font-bold text-[#0F2647]">
              {i + 1}
            </span>
            <span className="pt-0.5">{text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "—";
  const token = params.get("token");
  const wasCancelled = params.get("cancelled") === "1";

  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [view, setView] = useState<PaymentView>(token ? "loading" : "eft");

  useEffect(() => {
    if (!token || orderId === "—") return;

    let cancelled = false;

    (async () => {
      // The customer bailed out or was declined at PayFast. Record it and tell
      // both parties — PayFast doesn't reliably send an ITN for this path.
      if (wasCancelled) {
        await fetch("/api/payfast/failed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: orderId, token }),
        }).catch(() => {});
      }

      let status: OrderStatus | null = null;
      try {
        const res = await fetch(
          `/api/checkout/order-status?order=${encodeURIComponent(orderId)}&token=${encodeURIComponent(token)}`
        );
        if (res.ok) status = await res.json();
      } catch {
        /* fall through to the honest "we're checking" state */
      }

      if (cancelled) return;

      if (!status) {
        setView(wasCancelled ? "failed" : "unconfirmed");
        return;
      }

      setOrder(status);

      if (status.paymentMethod === "bank_transfer") {
        setView("eft");
        return;
      }

      if (status.status === "paid") {
        setView("paid");
        return;
      }

      if (status.status === "failed" || status.status === "cancelled") {
        setView("failed");
        return;
      }

      // Card order, back from PayFast, still pending: the ITN hasn't arrived.
      // Say exactly that — and make sure the clinic is told, once.
      setView("unconfirmed");
      await fetch("/api/payfast/returned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderId, token }),
      }).catch(() => {});
    })();

    return () => {
      cancelled = true;
    };
  }, [orderId, token, wasCancelled]);

  const isCollection = order?.deliveryMethod === "collection";
  const totalFormatted = order
    ? formatCents(order.totalCents)
    : formatTotal(params.get("total"));
  const totalRands = order
    ? order.totalCents / 100
    : params.get("total")
      ? parseFloat(params.get("total")!)
      : 0;
  const starlights = totalRands > 0 ? calculateStarlights(totalRands) : 0;

  if (view === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F7F8]">
        <p className="text-sm text-[#636374]">Checking your payment…</p>
      </div>
    );
  }

  /* ── Hero copy per state — no payment claim without a status behind it ─── */
  const hero = {
    eft: {
      eyebrow: "Order received",
      title: "Thank you — we're excited for you",
      lead: "Your order is in. Complete your EFT below and we'll get your skincare on its way.",
      badge: totalFormatted ? `${totalFormatted} · To pay via EFT` : null,
      tone: "navy" as const,
    },
    paid: {
      eyebrow: "Payment confirmed",
      title: "Thank you — your payment came through",
      lead: isCollection
        ? "PayFast has confirmed your payment. We'll email you the moment your order is ready to collect."
        : "PayFast has confirmed your payment. We'll pack your order and send tracking details shortly.",
      badge: totalFormatted ? `${totalFormatted} · Paid` : null,
      tone: "navy" as const,
    },
    failed: {
      eyebrow: "Payment not completed",
      title: "Your payment didn't go through",
      lead: "Nothing has been charged and your order has not been dispatched. Your order is still on file — you can pay by EFT below, or call us and we'll help.",
      badge: totalFormatted ? `${totalFormatted} · Unpaid` : null,
      tone: "red" as const,
    },
    unconfirmed: {
      eyebrow: "Confirming your payment",
      title: "We're still confirming your payment",
      lead: "We haven't had confirmation from PayFast yet. Please don't pay again — we're checking and will email you as soon as we know.",
      badge: totalFormatted ? `${totalFormatted} · Awaiting confirmation` : null,
      tone: "amber" as const,
    },
  }[view];

  const heroClass =
    hero.tone === "red"
      ? "bg-gradient-to-br from-[#7F1D1D] via-[#991B1B] to-[#B91C1C]"
      : hero.tone === "amber"
        ? "bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#B45309]"
        : "bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E]";

  const HeroIcon = view === "failed" ? AlertTriangle : view === "unconfirmed" ? Clock : CheckCircle;

  const steps =
    view === "paid"
      ? isCollection
        ? [
            "We pack your order — usually within one business day.",
            "We email you as soon as it's ready to collect.",
            `Collect from ${COLLECTION_POINT.oneLine} (${COLLECTION_POINT.hours}).`,
          ]
        : [
            "We pack your order — usually within one business day.",
            "Your order is dispatched and you'll receive tracking details.",
          ]
      : view === "eft"
        ? isCollection
          ? [
              "Pay via EFT using the reference above.",
              "We confirm your payment (usually within one business day).",
              `We email you when your order is ready to collect from ${COLLECTION_POINT.suburb}.`,
            ]
          : [
              "Pay via EFT using the reference above.",
              "We confirm your payment (usually within one business day).",
              "Your order is packed and dispatched — allow 1–2 business days after confirmation.",
            ]
        : [];

  return (
    <div className="min-h-[70vh] bg-[#F7F7F8]">
      {/* Hero */}
      <div className={`border-b border-[#E2E2E6] px-4 py-12 text-center text-white sm:py-16 ${heroClass}`}>
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
            <HeroIcon size={36} className="text-white" strokeWidth={1.5} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading mb-3 text-3xl font-bold text-white sm:text-4xl">
            {hero.title}
          </h1>
          <p className="mx-auto max-w-md text-base text-white/75 leading-relaxed">{hero.lead}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              #{orderId}
            </span>
            {hero.badge && (
              <span className="bg-white px-4 py-2 text-sm font-bold text-[#0F2647]">
                {hero.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        {view === "failed" && (
          <div className="mb-6 flex items-start gap-3 border-2 border-red-300 bg-red-50 p-5 text-sm text-red-800">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong className="block text-base text-red-900">Your order has not been paid.</strong>
              We&apos;ve emailed you the details. Nothing will be dispatched until payment is
              received — pay by EFT below, or call{" "}
              <a href="tel:+27315731325" className="font-semibold underline">031 573 1325</a>{" "}
              and we&apos;ll sort it out with you.
            </p>
          </div>
        )}

        {view === "unconfirmed" && (
          <div className="mb-6 flex items-start gap-3 border-2 border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
            <Clock size={18} className="mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong className="block text-base">Please don&apos;t pay again.</strong>
              If your card was charged, your order is safe — quote{" "}
              <strong>#{orderId}</strong> if you call us. We&apos;re checking with PayFast and will
              email you either way.
            </p>
          </div>
        )}

        {(view === "eft" || view === "failed") && (
          <BankDetailsCard
            orderId={orderId}
            heading={
              view === "failed"
                ? "Rather pay by EFT? Use these details and your order continues as normal."
                : "Use these details in your banking app. Your order is reserved once we receive payment."
            }
          />
        )}

        {isCollection && view !== "failed" && <CollectionCard />}

        {steps.length > 0 && <StepsCard steps={steps} />}

        {starlights > 0 && view !== "failed" && view !== "unconfirmed" && (
          <div className="mt-6 border border-[#C8A882]/40 bg-[#FFF8F0] px-6 py-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#939EBA]">
              Star Light Rewards
            </p>
            <p className="font-heading mt-2 text-2xl font-bold text-[#C8A882]">
              {formatStarlights(starlights)}
            </p>
            <p className="mt-3 text-sm text-[#636374] leading-relaxed">
              {view === "paid" ? "You've earned " : "You'll earn "}
              <strong className="text-[#0F2647]">{formatStarlights(starlights)}</strong>
              {" "}(worth R {starlights.toLocaleString("en-ZA")})
              {view === "paid"
                ? " — credited to the email you used at checkout. "
                : " once we confirm your EFT — credited to the email you used at checkout. "}
              <Link href="/rewards" className="font-semibold text-[#0F2647] underline underline-offset-2">
                View your balance
              </Link>
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="bg-[#0F2647] px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1B3D6E]"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="border border-[#939EBA] bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
          >
            Return home
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-[#939EBA]">
          Questions? Call{" "}
          <a href="tel:+27315731325" className="hover:text-[#0F2647]">
            031 573 1325
          </a>
          {" · "}
          Mon–Fri 08:00–17:00, Sat 08:00–13:00
        </p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-[#636374]">Loading…</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

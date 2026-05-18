"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, Check, Mail, Package } from "lucide-react";
import { BANK_DETAILS } from "@/lib/constants/banking";
import { calculateStarlights, formatStarlights } from "@/lib/utils/rewards";

const POP_EMAIL = "info@staraesthetic.site";

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

function BankDetailsCard({ orderId }: { orderId: string }) {
  return (
    <div className="overflow-hidden border border-[#E2E2E6] bg-white shadow-sm">
      <div className="border-b border-[#E2E2E6] bg-[#0F2647] px-6 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A882]">
          EFT payment
        </p>
        <p className="mt-1 text-sm text-white/80">
          Use these details in your banking app. Your order is reserved once we receive payment.
        </p>
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

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "—";
  const totalFormatted = formatTotal(params.get("total"));
  const totalRands = params.get("total") ? parseFloat(params.get("total")!) : 0;
  const starlights = totalRands > 0 ? calculateStarlights(totalRands) : 0;

  return (
    <div className="min-h-[70vh] bg-[#F7F7F8]">
      {/* Hero */}
      <div className="border-b border-[#E2E2E6] bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-4 py-12 text-center text-white sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C8A882]/40 bg-[#C8A882]/10">
            <CheckCircle size={36} className="text-[#C8A882]" strokeWidth={1.5} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C8A882]">
            Order confirmed
          </p>
          <h1 className="font-heading mb-3 text-3xl font-bold sm:text-4xl">
            Thank you — we&apos;re excited for you
          </h1>
          <p className="mx-auto max-w-md text-base text-white/75 leading-relaxed">
            Your order is in. Complete your EFT below and we&apos;ll get your skincare on its way.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              #{orderId}
            </span>
            {totalFormatted && (
              <span className="bg-[#C8A882] px-4 py-2 text-sm font-bold text-[#0F2647]">
                {totalFormatted} paid via EFT
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Bank details first */}
        <BankDetailsCard orderId={orderId} />

        {/* What happens next — below banking, no duplicate copy */}
        <div className="mt-6 border border-[#E2E2E6] bg-white p-6">
          <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#939EBA]">
            <Package size={16} />
            What happens next
          </h2>
          <ol className="space-y-4">
            {[
              "Pay via EFT using the reference above.",
              "We confirm your payment (usually within one business day).",
              "Your order is packed and dispatched — allow 1–2 business days after confirmation.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#636374] leading-relaxed">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#C8A882] text-xs font-bold text-[#0F2647]">
                  {i + 1}
                </span>
                <span className="pt-0.5">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {starlights > 0 && (
          <div className="mt-6 border border-[#C8A882]/40 bg-[#FFF8F0] px-6 py-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#939EBA]">
              Starlight Rewards
            </p>
            <p className="font-heading mt-2 text-2xl font-bold text-[#C8A882]">
              {formatStarlights(starlights)}
            </p>
            <p className="mt-3 text-sm text-[#636374] leading-relaxed">
              You&apos;ll earn <strong className="text-[#0F2647]">{formatStarlights(starlights)}</strong>
              {" "}(worth R {starlights.toLocaleString("en-ZA")}) once we confirm your EFT — credited to the
              email you used at checkout.{" "}
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

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BANK_DETAILS } from "@/lib/constants/banking";

function PendingContent() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "";
  const amount = Number(params.get("amount") ?? 0);
  const qty = Number(params.get("qty") ?? 1);
  const denom = Number(params.get("denom") ?? amount);
  const recipient = params.get("recipient") ?? "your recipient";

  const lineLabel =
    qty > 1 ? `${qty} × R ${denom.toLocaleString("en-ZA")} gift vouchers` : `R ${amount.toLocaleString("en-ZA")} gift voucher`;

  return (
    <div className="min-h-screen bg-[#F8F8F7] py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0F2647] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A882" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#1A1917] mb-3">
            Almost there — complete your payment
          </h1>
          <p className="text-[#6B6966] leading-relaxed">
            Your order ({lineLabel}) for <strong className="text-[#1A1917]">{recipient}</strong> is reserved.
            Once we confirm your EFT payment, {qty > 1 ? "each voucher will be emailed to its recipient" : "it will be emailed directly to them"}.
          </p>
        </div>

        <div className="bg-[#0F2647] p-6 text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-2">Your Payment Reference</p>
          <p className="font-heading text-3xl font-bold text-[#C8A882] tracking-widest">{ref}</p>
          <p className="text-xs text-white/60 mt-2">Use this as your EFT payment reference</p>
        </div>

        <div className="bg-white border border-[#E5E4E0] overflow-hidden mb-6">
          <div className="bg-[#F8F8F7] px-6 py-4 border-b border-[#E5E4E0]">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966]">EFT Banking Details</p>
          </div>
          <div className="divide-y divide-[#E5E4E0]">
            {[
              ["Bank", BANK_DETAILS.bank],
              ["Account Name", BANK_DETAILS.accountName],
              ["Account No", BANK_DETAILS.accountNo],
              ["Branch Code", BANK_DETAILS.branchCode],
              ["Account Type", BANK_DETAILS.accountType],
              ...(qty > 1 ? [["Order", `${qty} × R ${denom.toLocaleString("en-ZA")}`] as const] : []),
              ["Amount", `R ${amount.toLocaleString("en-ZA")}`],
              ["Reference", ref],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-6 py-3">
                <span className="text-sm text-[#6B6966]">{label}</span>
                <span className={`text-sm font-bold ${label === "Reference" ? "text-[#C8A882] font-mono tracking-widest text-base" : "text-[#1A1917]"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF8F0] border border-[#C8A882] border-l-4 px-6 py-4 mb-8">
          <p className="text-sm text-[#6B6966] leading-relaxed">
            <strong className="text-[#1A1917]">Next steps:</strong> Make one EFT payment for the total amount above using the reference shown,
            then email your proof of payment to{" "}
            <a href={`mailto:${BANK_DETAILS.email}`} className="text-[#C8A882] font-semibold hover:underline">
              {BANK_DETAILS.email}
            </a>
            . We&apos;ll activate your voucher{qty > 1 ? "s" : ""} within 2 business hours.
          </p>
        </div>

        <p className="text-xs text-[#6B6966] text-center mb-8">
          These payment instructions have also been sent to your email address.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="flex-1 text-center border border-[#E5E4E0] py-3 text-sm font-semibold text-[#6B6966] hover:border-[#939EBA] transition-colors">
            Return to Home
          </Link>
          <Link href="/shop" className="flex-1 text-center bg-[#0F2647] text-white py-3 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors">
            Browse Shop
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function GiftVoucherPendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-[#6B6966]">Loading…</div>}>
      <PendingContent />
    </Suspense>
  );
}

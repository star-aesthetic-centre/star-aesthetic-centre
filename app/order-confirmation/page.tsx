"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { BANK_DETAILS } from "@/lib/constants/banking";

/* ─── Bank details block (reused in checkout + here) ─────────── */
function BankDetails({ orderId }: { orderId: string }) {
    return (
        <div className="border border-[#E2E2E6] bg-[#F7F7F8] p-6 text-left">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-[#939EBA]">
                Payment Instructions
            </p>
            <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Bank</dt>
                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.bank}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Account Name</dt>
                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountName}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Account No</dt>
                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountNo}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Branch Code</dt>
                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.branchCode}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Account Type</dt>
                    <dd className="font-semibold text-[#1A1A1F]">{BANK_DETAILS.accountType}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-[#636374]">Reference</dt>
                    <dd className="font-bold text-[#1B3D6E]">
                        Order #{orderId}
                    </dd>
                </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-[#636374]">
                Please email your proof of payment to{" "}
                <a
                    href="mailto:info@staraesthetic.site"
                    className="text-[#939EBA] hover:underline"
                >
                    info@staraesthetic.site
                </a>{" "}
                with your order number as reference. Your order will be
                dispatched once payment is confirmed.
            </p>
        </div>
    );
}

/* ─── Page content (needs useSearchParams → must be in Suspense) */
function ConfirmationContent() {
    const params = useSearchParams();
    const orderId = params.get("orderId") ?? "—";

    return (
        <div className="min-h-[70vh] bg-[#F7F7F8]">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Success icon */}
                <div className="mb-8 text-center">
                    <CheckCircle
                        size={56}
                        strokeWidth={1.5}
                        className="mx-auto mb-5 text-[#939EBA]"
                    />
                    <h1 className="font-heading mb-3 text-3xl font-bold text-[#1A1A1F]">
                        Thank You for Your Order!
                    </h1>
                    <p className="text-[#636374]">
                        Your order{" "}
                        <span className="font-bold text-[#1A1A1F]">
                            #{orderId}
                        </span>{" "}
                        has been received.
                    </p>
                </div>

                {/* What happens next */}
                <div className="mb-6 border border-[#E2E2E6] bg-white p-6">
                    <h2 className="font-heading mb-4 text-sm font-bold uppercase tracking-wider text-[#939EBA]">
                        What Happens Next
                    </h2>
                    <ol className="space-y-3 text-sm text-[#636374]">
                        <li className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#939EBA] text-xs font-bold text-white">
                                1
                            </span>
                            <span>
                                Complete your EFT payment using the bank details
                                below. Use{" "}
                                <strong className="text-[#1A1A1F]">
                                    Order #{orderId}
                                </strong>{" "}
                                as your reference.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#939EBA] text-xs font-bold text-white">
                                2
                            </span>
                            <span>
                                Email your proof of payment to{" "}
                                <a
                                    href="mailto:info@staraesthetic.site"
                                    className="text-[#939EBA] hover:underline"
                                >
                                    info@staraesthetic.site
                                </a>
                                .
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#939EBA] text-xs font-bold text-white">
                                3
                            </span>
                            <span>
                                Once payment is confirmed, we'll process and
                                dispatch your order within 1–2 business days.
                            </span>
                        </li>
                    </ol>
                </div>

                {/* Bank details */}
                <BankDetails orderId={orderId} />

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/shop"
                        className="bg-[#1B3D6E] px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#162f56]"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="border border-[#939EBA] px-8 py-3 text-center text-sm font-semibold text-[#939EBA] transition-colors hover:bg-[#EEF0F6]"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Page export — Suspense required for useSearchParams ──────── */
export default function OrderConfirmationPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[70vh] flex items-center justify-center">
                    <p className="text-sm text-[#636374]">Loading…</p>
                </div>
            }
        >
            <ConfirmationContent />
        </Suspense>
    );
}

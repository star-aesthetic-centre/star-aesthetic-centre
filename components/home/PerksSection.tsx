import Link from "next/link";
import { Gift, Star, ArrowRight } from "lucide-react";
import type { HomePageContent } from "@/lib/content/site-pages-types";

type Props = {
  perksRewards: HomePageContent["perksRewards"];
};

export default function PerksSection({ perksRewards }: Props) {
    return (
        <section className="bg-[#F8F8F7] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section label */}
                <div className="mb-10 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#939EBA]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#939EBA]">
                        Member Benefits
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* ── Rewards Card ─────────────────────────────────── */}
                    <div className="relative overflow-hidden bg-[#0F2647] p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
                        {/* Subtle background star */}
                        <div className="absolute right-6 top-6 opacity-[0.06]">
                            <Star size={140} strokeWidth={0.5} className="text-white" />
                        </div>

                        <div className="relative z-10">
                            {/* Icon + label */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center bg-[#C8A882]/20 text-[#C8A882]">
                                    <Star size={18} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A882]">
                                    {perksRewards.label}
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                                {perksRewards.titleLine1}<br />
                                <span className="text-[#C8A882]">{perksRewards.titleLine2}</span><br />
                                {perksRewards.titleLine3}
                            </h3>

                            <p className="text-[#A8B4CC] text-sm leading-relaxed mb-8 max-w-sm">
                                {perksRewards.body}
                            </p>

                            {/* Example earnings */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {[
                                    { treatment: "Botox", earn: "R 190" },
                                    { treatment: "Lip Filler", earn: "R 250" },
                                    { treatment: "Skin Peel", earn: "R 130" },
                                ].map(({ treatment, earn }) => (
                                    <div key={treatment} className="bg-white/5 border border-white/10 p-3 text-center">
                                        <p className="text-[#C8A882] text-base font-bold mb-1">{earn}</p>
                                        <p className="text-[#939EBA] text-[10px] leading-snug">{treatment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/rewards"
                            className="relative z-10 inline-flex items-center gap-2 bg-[#C8A882] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-[#A08060] transition-colors self-start"
                        >
                            {perksRewards.ctaLabel}
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* ── Gift Vouchers Card ──────────────────────────── */}
                    <div className="relative overflow-hidden bg-white border border-[#E5E4E0] p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
                        {/* Subtle background gift icon */}
                        <div className="absolute right-6 top-6 opacity-[0.05]">
                            <Gift size={140} strokeWidth={0.5} className="text-[#0F2647]" />
                        </div>

                        <div className="relative z-10">
                            {/* Icon + label */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center bg-[#0F2647]/8 text-[#0F2647]">
                                    <Gift size={18} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F2647]">
                                    Gift Vouchers
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1917] leading-tight mb-4">
                                Give the Gift<br />
                                <span className="text-[#C8A882]">of Confidence</span>
                            </h3>

                            <p className="text-[#6B6966] text-sm leading-relaxed mb-8 max-w-sm">
                                The perfect gift for someone you love. Choose a denomination, add a personal message, and we&apos;ll send a beautifully designed voucher directly to them.
                            </p>

                            {/* Denomination grid */}
                            <div className="grid grid-cols-4 gap-2 mb-8">
                                {["R 250", "R 500", "R 750", "R 1,000"].map((amount) => (
                                    <Link
                                        key={amount}
                                        href={`/gift-vouchers?amount=${amount.replace("R ", "").replace(",", "")}`}
                                        className="border border-[#E5E4E0] p-3 text-center hover:border-[#C8A882] hover:bg-[#C8A882]/5 transition-colors group"
                                    >
                                        <span className="text-sm font-bold text-[#1A1917] group-hover:text-[#C8A882] transition-colors">{amount}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/gift-vouchers"
                            className="relative z-10 inline-flex items-center gap-2 bg-[#0F2647] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-[#1B3D6E] transition-colors self-start"
                        >
                            Send a Gift Voucher
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

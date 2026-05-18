import Link from "next/link";
import { calculateStarlights } from "@/lib/utils/rewards";

/**
 * Sidebar card — introduces Star Light Rewards.
 * Used on treatment detail pages and product detail pages.
 */
export function RewardsCard({ price }: { price?: number }) {
  const starlights = price ? calculateStarlights(price) : null;

  return (
    <div className="border border-[#E5E4E0] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#0F2647] px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#C8A882]/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8A882" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA]">Star Aesthetic</p>
            <p className="text-sm font-bold text-white leading-tight">Star Light Rewards</p>
          </div>
        </div>
        {starlights ? (
          <p className="text-xs text-white/60 mt-2">
            Earn <span className="text-[#C8A882] font-bold">{starlights.toLocaleString("en-ZA")} Star Lights</span> on this purchase
          </p>
        ) : (
          <p className="text-xs text-white/60 mt-2">Earn <span className="text-[#C8A882] font-bold">Star Lights</span> on every purchase — 5% back</p>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-3">
        {[
          { text: "5% back in Star Lights on all treatments & products" },
          { text: "1 Star Light = R1 of rewards value" },
          { text: "Redeemable against any future visit or purchase" },
          { text: "No sign-up needed — created on your first visit" },
        ].map(({ text }) => (
          <div key={text} className="flex gap-2.5 items-start">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A882" stroke="none" className="mt-0.5 shrink-0">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <p className="text-xs text-[#6B6966] leading-relaxed">{text}</p>
          </div>
        ))}

        <div className="pt-3 border-t border-[#E5E4E0]">
          <Link
            href="/rewards"
            className="block text-center bg-[#0F2647] text-white text-xs font-semibold py-3 px-4 hover:bg-[#1B3D6E] transition-colors"
          >
            Learn More & Check Your Balance
          </Link>
        </div>
      </div>
    </div>
  );
}

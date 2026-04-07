import Link from "next/link";

const DENOMINATIONS = [
  { value: 250,  label: "R 250" },
  { value: 500,  label: "R 500" },
  { value: 750,  label: "R 750" },
  { value: 1000, label: "R 1,000" },
];

/**
 * Sidebar card — showcases the 4 gift voucher denominations.
 * Used on treatment detail pages and product detail pages.
 */
export function GiftVoucherCard() {
  return (
    <div className="border border-[#E5E4E0] bg-white overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{
          background: "linear-gradient(135deg, #0F2647 0%, #1B3D6E 60%, #C8A882 100%)",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v10H4V12"/>
              <path d="M22 7H2v5h20V7z"/>
              <path d="M12 22V7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Star Aesthetic</p>
            <p className="text-sm font-bold text-white leading-tight">Gift Vouchers</p>
          </div>
        </div>
        <p className="text-xs text-white/70 mt-1">The perfect gift for someone you love</p>
      </div>

      {/* Denomination grid */}
      <div className="p-4 grid grid-cols-2 gap-2">
        {DENOMINATIONS.map(({ value, label }) => (
          <Link
            key={value}
            href={`/gift-vouchers?amount=${value}`}
            className="group border border-[#E5E4E0] hover:border-[#C8A882] bg-[#F8F8F7] hover:bg-white transition-all px-3 py-3 text-center"
          >
            <p className="font-heading font-bold text-[#0F2647] text-base leading-tight group-hover:text-[#C8A882] transition-colors">
              {label}
            </p>
            <p className="text-[10px] text-[#6B6966] mt-0.5">Gift Voucher</p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 space-y-2">
        <p className="text-[10px] text-[#6B6966] text-center">
          Delivered by email · Valid 3 years · Redeemable on all treatments & products
        </p>
        <Link
          href="/gift-vouchers"
          className="block text-center bg-[#C8A882] text-white text-xs font-semibold py-3 px-4 hover:bg-[#A08060] transition-colors"
        >
          Send a Gift Voucher →
        </Link>
      </div>
    </div>
  );
}

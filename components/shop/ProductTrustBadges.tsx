import Image from "next/image";
import { ShieldCheck, Lock } from "lucide-react";

export default function ProductTrustBadges() {
  return (
    <div className="mt-6 space-y-3">
      {/* SSL row */}
      <div className="flex items-center gap-2.5 bg-[#F8F8F7] border border-[#E5E4E0] px-4 py-3">
        <Lock size={14} className="text-[#0F2647] shrink-0" />
        <p className="text-xs text-[#6B6966] leading-snug">
          <span className="font-semibold text-[#1A1917]">SSL Secured Checkout.</span>{" "}
          We never store your credit card details on this website.
        </p>
      </div>

      {/* Payment icons */}
      <div className="w-full bg-[#F8F8F7] border border-[#E5E4E0] px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6966] block mb-2.5">We accept:</span>
        <div className="flex items-center justify-between gap-2">
          {[
            { src: "/images/bank-icons/visa-logo-100a.png", alt: "Visa" },
            { src: "/images/bank-icons/mastercard-logo-100a.png", alt: "Mastercard" },
            { src: "/images/bank-icons/payfast-logo-100a.png", alt: "PayFast" },
            { src: "/images/bank-icons/verified-by-visa-logo-100a.png", alt: "Verified by Visa" },
            { src: "/images/bank-icons/mastercard-securecode-logo-100a.png", alt: "Mastercard SecureCode" },
          ].map(({ src, alt }) => (
            <div
              key={alt}
              className="flex-1 h-14 bg-white border border-[#E5E4E0] px-2 flex items-center justify-center"
            >
              <Image
                src={src}
                alt={alt}
                width={80}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

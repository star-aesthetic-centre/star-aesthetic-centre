"use client";

import { useState } from "react";

interface NikiProductCardProps {
  productName: string;
}

export default function NikiProductCard({ productName }: NikiProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const whatsappMsg = encodeURIComponent(
    `Hi Niki, I have a question about ${productName}. Can you help me?`
  );
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27315731325"}?text=${whatsappMsg}`;

  return (
    <div className="mt-4 bg-[#0F2647] text-white overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-4">
        {/* Avatar bubble */}
        <div className="shrink-0 w-11 h-11 rounded-full bg-[#C8A882]/20 border border-[#C8A882]/40 flex items-center justify-center">
          {/* Simple waveform / mic icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#C8A882]">
            <rect x="9" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#C8A882] mb-0.5">
            Niki · AI Skin Advisor
          </p>
          <p className="text-sm font-medium text-white leading-snug">
            Have a question about this product?
          </p>
          <p className="text-xs text-[#939EBA] mt-0.5 leading-snug hidden sm:block">
            Ask Niki about ingredients, suitability, or how to use it.
          </p>
        </div>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="shrink-0 bg-[#C8A882] text-[#0F2647] text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors hover:bg-[#A08060] whitespace-nowrap"
        >
          {hovered ? "Chat →" : "Ask Niki"}
        </a>
      </div>

      {/* Subtle animated pulse bar at bottom */}
      <div className="h-0.5 bg-gradient-to-r from-[#0F2647] via-[#C8A882] to-[#0F2647] opacity-60" />
    </div>
  );
}

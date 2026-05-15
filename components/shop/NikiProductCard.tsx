"use client";

import { MessageCircle } from "lucide-react";
import { useNiki } from "@/components/niki/NikiProvider";

interface NikiProductCardProps {
  productName: string;
}

export default function NikiProductCard({ productName }: NikiProductCardProps) {
  const { open } = useNiki();

  return (
    <div className="mt-4 overflow-hidden border border-[#E5E4E0] bg-[#0F2647] text-white">
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C8A882]/40 bg-[#C8A882]/20">
          <MessageCircle className="h-5 w-5 text-[#C8A882]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#C8A882]">
            Niki · AI Skin Advisor
          </p>
          <p className="text-sm font-medium leading-snug text-white">
            Have a question about {productName}?
          </p>
          <p className="mt-0.5 hidden text-xs leading-snug text-[#939EBA] sm:block">
            Ingredients, suitability, how to use — ask Niki.
          </p>
        </div>

        <button
          type="button"
          onClick={open}
          className="shrink-0 whitespace-nowrap bg-[#C8A882] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0F2647] transition-colors hover:bg-[#A08060]"
        >
          Chat Now
        </button>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-[#0F2647] via-[#C8A882] to-[#0F2647] opacity-60" />
    </div>
  );
}

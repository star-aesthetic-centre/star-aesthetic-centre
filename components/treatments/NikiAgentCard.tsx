"use client";

import { Mic } from "lucide-react";
import { useNiki } from "@/components/niki/NikiProvider";

interface NikiAgentCardProps {
  treatmentName?: string;
  treatmentPage?: string;
}

export function NikiAgentCard({ treatmentName }: NikiAgentCardProps) {
  const { open } = useNiki();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Chat with Niki"
      className="group w-full cursor-pointer overflow-hidden border border-[#E5E4E0] bg-[#F8F8F7] text-left transition-all duration-300 hover:border-[#C8A882] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A882]"
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-[#C8A882] to-[#A08060]" />

      <div className="px-6 pb-0 pt-6 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#939EBA]">Your personal guide</p>
        <p className="text-[15px] font-semibold leading-snug text-[#1A1917]">Hi — I&apos;m Niki</p>
        <p className="mt-1 text-sm leading-snug text-[#6B6966]">
          {treatmentName ? (
            <>
              <span>Ask me anything about</span>
              <br />
              <span className="font-medium text-[#1A1917]">{treatmentName}</span>
            </>
          ) : (
            "I'm here whenever you have a question"
          )}
        </p>
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#C8A882] opacity-[0.07]"
            style={{ animationDuration: "2.4s" }}
          />
          <span
            className="absolute animate-ping rounded-full bg-[#C8A882] opacity-[0.10]"
            style={{ inset: 8, animationDuration: "2.4s", animationDelay: "0.8s" }}
          />
          <span
            className="absolute rounded-full bg-[#C8A882] opacity-[0.14] transition-opacity duration-500 group-hover:opacity-[0.22]"
            style={{ inset: 18 }}
          />
          <div
            className="absolute flex items-center justify-center rounded-full bg-[#0F2647] shadow-[0_4px_20px_rgba(15,38,71,0.35)] transition-colors duration-300 group-hover:bg-[#162E54]"
            style={{ inset: 26 }}
          >
            <Mic size={16} className="text-[#C8A882]" />
          </div>
        </div>
      </div>

      <div className="pb-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#939EBA]">Tap to chat</span>
      </div>
    </button>
  );
}

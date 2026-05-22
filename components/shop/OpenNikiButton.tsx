"use client";

import { useNiki } from "@/components/niki/NikiProvider";
import { ArrowRight } from "lucide-react";

export default function OpenNikiButton() {
  const { open } = useNiki();
  return (
    <button
      type="button"
      onClick={open}
      className="group inline-flex items-center gap-3 bg-[#939EBA] px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/20 transition-all hover:bg-[#7A87A6] hover:-translate-y-0.5"
    >
      Start My Skin Assessment
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

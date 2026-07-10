"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "star_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available (SSR guard)
    }
  }, []);

  function save(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[300] bg-white border-t border-[#E5E4E0] shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Text */}
        <div className="flex-1 text-xs text-[#6B6966] leading-relaxed">
          <span className="font-semibold text-[#1A1917]">Your privacy matters to us. </span>
          We use cookies to analyse website usage and improve your experience.
          You can accept all cookies, or decline non-essential ones.{" "}
          <Link
            href="/legal/privacy-policy"
            className="underline underline-offset-2 hover:text-[#0F2647] transition-colors"
          >
            Cookie Policy
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => save("declined")}
            className="text-xs font-semibold text-[#6B6966] hover:text-[#1A1917] px-4 py-2.5 border border-[#E5E4E0] hover:border-[#1A1917] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => save("accepted")}
            className="text-xs font-bold text-white bg-[#0F2647] hover:bg-[#1B3D6E] px-5 py-2.5 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => save("declined")}
            aria-label="Dismiss"
            className="ml-1 p-1.5 text-[#6B6966] hover:text-[#1A1917] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/glossary/index";
import type { GlossaryCategory } from "@/lib/glossary/types";

type Props = {
  slug: string;
  term: string;
  shortDesc: string;
  category: GlossaryCategory;
  children: React.ReactNode;
};

type TooltipStyle = {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
};

export function GlossaryTermClient({ slug, term, shortDesc, category, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyle>({ left: 0, width: 300 });
  const anchorRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const W = Math.min(300, window.innerWidth - 24);
    const vw = window.innerWidth;

    let left = rect.left + rect.width / 2 - W / 2;
    left = Math.max(12, Math.min(left, vw - W - 12));

    const spaceAbove = rect.top;
    const above = spaceAbove > 180;

    setTooltipStyle({
      left,
      width: W,
      ...(above
        ? { bottom: window.innerHeight - rect.top + 10 }
        : { top: rect.bottom + 10 }),
    });
  }, []);

  function handleMouseEnter() {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    calculatePosition();
    setVisible(true);
  }

  function handleMouseLeave() {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }

  function handleTooltipEnter() {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }

  function handleTooltipLeave() {
    hideTimer.current = setTimeout(() => setVisible(false), 150);
  }

  const categoryLabel = CATEGORY_LABELS[category];
  const categoryColor = CATEGORY_COLORS[category];

  return (
    <span ref={anchorRef} className="inline">
      {/* The term text — styled as an underlined interactive word */}
      <Link
        href={`/glossary/${slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help border-b border-dashed border-[#0F2647]/50 text-[#0F2647] no-underline transition-colors hover:border-[#C8A882] hover:text-[#C8A882]"
      >
        {children}
      </Link>

      {/* Tooltip — rendered via fixed positioning to escape any overflow:hidden parent */}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: "fixed",
            left: tooltipStyle.left,
            width: tooltipStyle.width,
            top: tooltipStyle.top,
            bottom: tooltipStyle.bottom,
            zIndex: 9999,
          }}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
          className="pointer-events-auto block overflow-hidden rounded border border-[#E2E2E6] bg-white shadow-xl"
        >
          {/* Gold top accent */}
          <span className="block h-0.5 w-full bg-[#C8A882]" />

          <span className="block px-4 pb-4 pt-3">
            {/* Header row */}
            <span className="mb-2 flex items-center justify-between gap-2">
              <span className="font-heading text-sm font-bold text-[#0F2647] leading-tight">
                {term}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}
              >
                {categoryLabel}
              </span>
            </span>

            {/* Short description */}
            <span className="block text-xs text-[#636374] leading-relaxed">
              {shortDesc}
            </span>

            {/* Full article link */}
            <Link
              href={`/glossary/${slug}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A882] hover:underline"
            >
              Full article
              <ExternalLink size={11} />
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}

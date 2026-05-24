"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/glossary/index";
import type { InjectedTerm } from "@/lib/glossary/inject";

type Props = {
  html: string;
  /** Map of slug → term data for every glossary anchor in `html` */
  terms: Record<string, InjectedTerm>;
  className?: string;
};

type TooltipState = {
  visible: boolean;
  slug: string | null;
  left: number;
  width: number;
  top?: number;
  bottom?: number;
};

const TOOLTIP_WIDTH = 300;

/**
 * Renders HTML content that may contain auto-injected glossary anchors
 * (<a data-glossary-slug="...">) and attaches a shared tooltip popover to
 * every such anchor via event delegation. No per-link React component needed.
 */
export function GlossaryContent({ html, terms, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<TooltipState>({
    visible: false,
    slug: null,
    left: 0,
    width: TOOLTIP_WIDTH,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function positionFor(el: HTMLElement, slug: string): TooltipState {
      const rect = el.getBoundingClientRect();
      const W = Math.min(TOOLTIP_WIDTH, window.innerWidth - 24);
      const vw = window.innerWidth;

      let left = rect.left + rect.width / 2 - W / 2;
      left = Math.max(12, Math.min(left, vw - W - 12));

      const above = rect.top > 180;

      return {
        visible: true,
        slug,
        left,
        width: W,
        ...(above
          ? { bottom: window.innerHeight - rect.top + 10, top: undefined }
          : { top: rect.bottom + 10, bottom: undefined }),
      };
    }

    function findAnchor(target: EventTarget | null): HTMLElement | null {
      let node = target as HTMLElement | null;
      while (node && node !== root) {
        if (node.dataset && node.dataset.glossarySlug) return node;
        node = node.parentElement;
      }
      return null;
    }

    function onMouseOver(e: MouseEvent) {
      const anchor = findAnchor(e.target);
      if (!anchor) return;
      const slug = anchor.dataset.glossarySlug!;
      if (!terms[slug]) return;
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setState(positionFor(anchor, slug));
    }

    function onMouseOut(e: MouseEvent) {
      const anchor = findAnchor(e.target);
      if (!anchor) return;
      // Don't hide if moving into the anchor's children
      const related = e.relatedTarget as HTMLElement | null;
      if (related && anchor.contains(related)) return;
      hideTimer.current = setTimeout(() => {
        setState((s) => ({ ...s, visible: false }));
      }, 200);
    }

    root.addEventListener("mouseover", onMouseOver);
    root.addEventListener("mouseout", onMouseOut);

    return () => {
      root.removeEventListener("mouseover", onMouseOver);
      root.removeEventListener("mouseout", onMouseOut);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [terms]);

  const activeTerm = state.slug ? terms[state.slug] : null;

  return (
    <>
      <div
        ref={rootRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {state.visible && activeTerm && (
        <div
          role="tooltip"
          style={{
            position: "fixed",
            left: state.left,
            width: state.width,
            top: state.top,
            bottom: state.bottom,
            zIndex: 9999,
          }}
          onMouseEnter={() => {
            if (hideTimer.current) {
              clearTimeout(hideTimer.current);
              hideTimer.current = null;
            }
          }}
          onMouseLeave={() => {
            hideTimer.current = setTimeout(
              () => setState((s) => ({ ...s, visible: false })),
              150
            );
          }}
          className="pointer-events-auto overflow-hidden rounded border border-[#E2E2E6] bg-white shadow-xl"
        >
          <div className="h-0.5 w-full bg-[#C8A882]" />
          <div className="px-4 pb-4 pt-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-heading text-sm font-bold leading-tight text-[#0F2647]">
                {activeTerm.term}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[activeTerm.category]}`}
              >
                {CATEGORY_LABELS[activeTerm.category]}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#636374]">
              {activeTerm.shortDesc}
            </p>
            <Link
              href={`/glossary/${activeTerm.slug}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A882] hover:underline"
            >
              Full article
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

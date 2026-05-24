/**
 * Glossary auto-injection — scans HTML strings for glossary term mentions
 * and wraps the first occurrence of each term with a tooltip anchor.
 *
 * Design notes:
 * - Server-side only — operates on raw HTML strings (e.g. from Supabase product
 *   descriptions stored via a TipTap rich-text editor).
 * - Only the FIRST occurrence of each term gets wrapped (Wikipedia-style — avoids
 *   over-linking the same word a dozen times in one paragraph).
 * - Matches happen ONLY in text nodes outside existing tags; we never inject
 *   inside <a>, <script>, <style>, or attribute values.
 * - Match patterns are case-insensitive with word boundaries.
 * - Longer patterns are tried first ("hyaluronic acid" before "acid"), so
 *   multi-word terms aren't broken up by sub-string matches.
 *
 * Returns the modified HTML AND a lookup of every term that was injected,
 * so the client-side renderer has the data it needs for tooltips without
 * pulling the full glossary into the client bundle.
 */

import { ALL_GLOSSARY_TERMS } from "./index";
import type { GlossaryCategory } from "./types";

export type InjectedTerm = {
  slug: string;
  term: string;
  shortDesc: string;
  category: GlossaryCategory;
};

export type InjectGlossaryResult = {
  html: string;
  /** Lookup map of every slug that ended up in the result, for tooltip data */
  terms: Record<string, InjectedTerm>;
};

type Pattern = {
  slug: string;
  /** Lowercased, regex-safe match text */
  match: string;
};

let cachedPatterns: Pattern[] | null = null;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildPatterns(): Pattern[] {
  if (cachedPatterns) return cachedPatterns;
  const patterns: Pattern[] = [];
  for (const term of ALL_GLOSSARY_TERMS) {
    const matches = term.matchTerms ?? [term.term];
    for (const m of matches) {
      patterns.push({ slug: term.slug, match: m });
    }
  }
  // Sort longest first so multi-word phrases beat their sub-words
  patterns.sort((a, b) => b.match.length - a.match.length);
  cachedPatterns = patterns;
  return patterns;
}

/**
 * Walk the HTML splitting it into alternating text and tag segments.
 * Returns segments tagged with their type so the matcher can skip tags.
 */
type Segment = { type: "tag" | "text"; content: string };

function tokenize(html: string): Segment[] {
  const segments: Segment[] = [];
  const tagRe = /<[^>]+>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    if (m.index > last) {
      segments.push({ type: "text", content: html.slice(last, m.index) });
    }
    segments.push({ type: "tag", content: m[0] });
    last = m.index + m[0].length;
  }
  if (last < html.length) {
    segments.push({ type: "text", content: html.slice(last) });
  }
  return segments;
}

/**
 * Find and replace the first match of `pattern` (case-insensitive, word-bounded)
 * in `text`. Returns the new text plus whether a replacement was made.
 *
 * Word boundaries here: the match must start either at the beginning of the
 * string, after whitespace, or after common punctuation; and end before
 * whitespace, punctuation, or end of string. We don't use \b directly because
 * \b doesn't handle multi-word phrases sensibly (every space resets it).
 */
function replaceFirst(
  text: string,
  pattern: string,
  slug: string
): { text: string; matched: boolean } {
  const escaped = escapeRegex(pattern);
  // Word-boundary at start: line start or non-word char before
  // Word-boundary at end: non-word char after or end
  const re = new RegExp(`(^|[^A-Za-z0-9])(${escaped})(?=[^A-Za-z0-9]|$)`, "i");
  const m = re.exec(text);
  if (!m) return { text, matched: false };
  const before = text.slice(0, m.index) + m[1];
  const matched = m[2];
  const after = text.slice(m.index + m[0].length);
  const replacement = `<a href="/glossary/${slug}" data-glossary-slug="${slug}" class="glossary-link">${escapeHtml(
    matched
  )}</a>`;
  return { text: before + replacement + after, matched: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Main entry point. Pass any raw HTML — product descriptions, treatment copy,
 * static page content — and get back HTML with glossary anchors injected.
 *
 * If `usedSlugs` is provided, terms already used (e.g. on a previous block of
 * content rendered on the same page) won't be re-linked. The set is mutated
 * so callers can chain multiple HTML blocks on a single page.
 */
export function injectGlossaryLinks(
  html: string | null | undefined,
  options: { usedSlugs?: Set<string> } = {}
): InjectGlossaryResult {
  if (!html) return { html: html ?? "", terms: {} };

  const patterns = buildPatterns();
  const used = options.usedSlugs ?? new Set<string>();
  const segments = tokenize(html);
  const lookup: Record<string, InjectedTerm> = {};

  let aDepth = 0; // skip text inside existing <a>...</a>

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    if (seg.type === "tag") {
      const t = seg.content;
      if (/^<a\b/i.test(t)) aDepth++;
      else if (/^<\/a>/i.test(t)) aDepth = Math.max(0, aDepth - 1);
      continue;
    }

    if (aDepth > 0) continue;

    let text = seg.content;
    for (const p of patterns) {
      if (used.has(p.slug)) continue;
      const result = replaceFirst(text, p.match, p.slug);
      if (result.matched) {
        used.add(p.slug);
        text = result.text;
        const termData = ALL_GLOSSARY_TERMS.find((t) => t.slug === p.slug);
        if (termData) {
          lookup[p.slug] = {
            slug: termData.slug,
            term: termData.term,
            shortDesc: termData.shortDescription,
            category: termData.category,
          };
        }
      }
    }
    segments[i] = { type: "text", content: text };
  }

  return {
    html: segments.map((s) => s.content).join(""),
    terms: lookup,
  };
}

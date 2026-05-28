import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import {
  ALL_GLOSSARY_TERMS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/glossary/index";
import type { GlossaryCategory } from "@/lib/glossary/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Skincare & Aesthetic Treatments Glossary | Star Aesthetic Centre Durban",
  description:
    "Plain-language definitions of skincare ingredients, treatments, skin conditions, and aesthetic concepts — from retinol and hyaluronic acid to melasma and microneedling. Written by the team at Star Aesthetic Centre, Durban North.",
  path: "/glossary",
  keywords: [
    "skincare glossary south africa",
    "aesthetic treatments glossary",
    "skincare ingredients explained",
    "retinol explained",
    "hyaluronic acid explained",
    "melasma treatment south africa",
    "skin treatments durban",
  ],
});

const CATEGORIES: { value: GlossaryCategory | "all"; label: string }[] = [
  { value: "all", label: "All terms" },
  { value: "ingredient", label: "Ingredients" },
  { value: "treatment", label: "Treatments" },
  { value: "condition", label: "Skin Conditions" },
  { value: "concept", label: "Concepts" },
  { value: "brand", label: "Brands & Products" },
];

// Group terms A-Z
function groupAlphabetically(terms: typeof ALL_GLOSSARY_TERMS) {
  const groups: Record<string, typeof ALL_GLOSSARY_TERMS> = {};
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  }
  return groups;
}

export default function GlossaryIndexPage() {
  const groups = groupAlphabetically(ALL_GLOSSARY_TERMS);
  const letters = Object.keys(groups).sort();

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A882]">
            Knowledge Base
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-white sm:text-4xl">
            Skincare &amp; Treatments Glossary
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/75 leading-relaxed">
            Plain-language definitions of the ingredients, treatments, conditions, and
            concepts that matter for your skin — written by the clinical team at Star
            Aesthetic Centre, Durban North.
          </p>
          <p className="mt-4 text-sm text-white/50">
            {ALL_GLOSSARY_TERMS.length} terms · hover any term on our website to see a
            quick definition
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Category filter (static links — full-page navigation) */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/glossary" : `/glossary?cat=${cat.value}`}
              className="rounded-full border border-[#E2E2E6] bg-white px-4 py-1.5 text-sm font-semibold text-[#636374] transition-colors hover:border-[#0F2647] hover:text-[#0F2647]"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* A-Z anchor nav */}
        <div className="mb-8 flex flex-wrap gap-1">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded bg-white border border-[#E2E2E6] text-sm font-bold text-[#636374] transition-colors hover:bg-[#0F2647] hover:text-white hover:border-[#0F2647]"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Term groups */}
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-6">
            <h2 className="mb-4 font-heading text-2xl font-bold text-[#0F2647]">
              {letter}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {groups[letter].map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="group flex flex-col rounded border border-[#E2E2E6] bg-white p-4 transition-all hover:border-[#C8A882] hover:shadow-sm"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="font-heading font-bold text-[#0F2647] group-hover:text-[#C8A882] transition-colors">
                      {term.term}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[term.category]}`}
                    >
                      {CATEGORY_LABELS[term.category]}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-[#636374] leading-relaxed">
                    {term.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Footer CTA */}
        <div className="mt-8 border border-[#E2E2E6] bg-white px-6 py-6 text-center">
          <p className="font-heading text-lg font-bold text-[#0F2647]">
            Not sure what&apos;s right for your skin?
          </p>
          <p className="mt-2 text-sm text-[#636374]">
            Niki can conduct a full voice skin assessment and recommend the right brand
            and products for you specifically.
          </p>
          <Link
            href="/shop#skin-assessment"
            className="mt-4 inline-flex items-center gap-2 bg-[#0F2647] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B3D6E]"
          >
            Start skin assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}

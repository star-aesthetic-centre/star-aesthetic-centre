import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  ALL_GLOSSARY_TERMS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  getGlossaryTerm,
} from "@/lib/glossary/index";
import { buildPageMetadata, breadcrumbSchema, faqPageSchema, SITE_URL } from "@/lib/seo";

// Generate static pages for every term at build time
export async function generateStaticParams() {
  return ALL_GLOSSARY_TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return buildPageMetadata({
    title: term.title,
    description: term.metaDescription,
    path: `/glossary/${term.slug}`,
    keywords: term.keywords,
    ogType: "article",
  });
}

function definedTermSchema(term: ReturnType<typeof getGlossaryTerm>) {
  if (!term) return null;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDescription,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Star Aesthetic Centre Skincare & Treatments Glossary",
      url: `${SITE_URL}/glossary`,
    },
    url: `${SITE_URL}/glossary/${term.slug}`,
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const relatedTerms = term.relatedTerms
    .map((s) => getGlossaryTerm(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getGlossaryTerm>>[];

  const categoryLabel = CATEGORY_LABELS[term.category];
  const categoryColor = CATEGORY_COLORS[term.category];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Glossary", path: "/glossary" },
      { name: term.term, path: `/glossary/${term.slug}` },
    ]),
    definedTermSchema(term),
    term.faq.length > 0
      ? faqPageSchema(term.faq.map((f) => ({ question: f.q, answer: f.a })))
      : null,
  ].filter(Boolean);

  return (
    <>
      {/* Schema markup */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-[#F7F7F8]">
        {/* Hero */}
        <header className="bg-gradient-to-br from-[#0F2647] via-[#162E54] to-[#1B3D6E] px-6 py-12">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-1.5 text-xs text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/glossary" className="hover:text-white transition-colors">
                Glossary
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/80">{term.term}</span>
            </nav>

            {/* Category badge */}
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${categoryColor}`}
            >
              {categoryLabel}
            </span>

            <h1 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
              {term.term}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/75 leading-relaxed">
              {term.heroLine}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {/* Quick-definition callout */}
          <div className="mb-8 border-l-4 border-[#C8A882] bg-white px-6 py-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA] mb-1">
              In brief
            </p>
            <p className="text-sm text-[#1A1917] leading-relaxed">{term.shortDescription}</p>
          </div>

          {/* Main article sections */}
          <article className="space-y-8">
            {term.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading mb-3 text-xl font-bold text-[#0F2647]">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((para, i) => (
                    <p key={i} className="text-sm text-[#636374] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          {/* At Star Aesthetic Centre */}
          <div className="mt-10 rounded border border-[#C8A882]/40 bg-[#FFF8EE] px-6 py-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8A882] mb-2">
              At Star Aesthetic Centre
            </p>
            <p className="text-sm text-[#1A1917] leading-relaxed">{term.clinicRelevance}</p>
          </div>

          {/* FAQ */}
          {term.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading mb-5 text-xl font-bold text-[#0F2647]">
                Frequently asked questions
              </h2>
              <div className="space-y-5">
                {term.faq.map((item) => (
                  <div
                    key={item.q}
                    className="border border-[#E2E2E6] bg-white px-5 py-5"
                  >
                    <h3 className="mb-2 text-sm font-bold text-[#0F2647]">{item.q}</h3>
                    <p className="text-sm text-[#636374] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related terms */}
          {relatedTerms.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading mb-4 text-lg font-bold text-[#0F2647]">
                Related terms
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className="group flex items-center gap-2 rounded border border-[#E2E2E6] bg-white px-4 py-2.5 text-sm transition-all hover:border-[#C8A882] hover:shadow-sm"
                  >
                    <span className="font-semibold text-[#0F2647] group-hover:text-[#C8A882] transition-colors">
                      {related.term}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[related.category]}`}
                    >
                      {CATEGORY_LABELS[related.category]}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA block */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="border border-[#E2E2E6] bg-white px-5 py-5">
              <p className="font-heading font-bold text-[#0F2647]">
                Not sure which products are right for you?
              </p>
              <p className="mt-2 text-sm text-[#636374] leading-relaxed">
                Niki can conduct a 3-minute voice skin assessment and recommend the right
                brand, products, and regime for your skin specifically.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8A882] hover:underline"
              >
                Start skin assessment →
              </Link>
            </div>
            <div className="border border-[#E2E2E6] bg-white px-5 py-5">
              <p className="font-heading font-bold text-[#0F2647]">
                Ready for a clinical assessment?
              </p>
              <p className="mt-2 text-sm text-[#636374] leading-relaxed">
                Book a consultation with Dr Bangalee for a medical-grade skin evaluation
                and personalised treatment plan.
              </p>
              <Link
                href="/book"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8A882] hover:underline"
              >
                Book consultation →
              </Link>
            </div>
          </div>

          {/* Back to glossary */}
          <div className="mt-8">
            <Link
              href="/glossary"
              className="text-sm font-semibold text-[#939EBA] hover:text-[#0F2647] transition-colors"
            >
              ← Back to full glossary
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

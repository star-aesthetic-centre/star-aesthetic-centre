import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Information — Star Aesthetic Centre",
  robots: { index: false, follow: false },
};

const features = [
  {
    category: "Treatments",
    items: [
      "12 dedicated treatment pages with full SEO metadata",
      "3 categories: Face & Injectables, Medical Skin, Health & Body",
      "Botox, Lip Filler, Jaw Contouring, Microneedling, Skin Peel, Pigmentation, Acne, Body Contouring, Medi-Lean, Vitamin Drips, Varicose Veins, Excessive Sweating",
      "MedicalProcedure structured data on every treatment page",
      "FAQ schema on treatment pages for Google AI Overviews",
    ],
  },
  {
    category: "Medical Glossary",
    items: [
      "17 expert glossary terms (ingredients, treatments, conditions, concepts)",
      "Individual SEO-optimised pages per term",
      "Linked from treatment and product pages",
    ],
  },
  {
    category: "Shop & Skincare",
    items: [
      "6 medical-grade skincare brands: NeoStrata, SkinCeuticals, Heliocare, Dermaceutic, ISDIN, Mesoestetic",
      "Full product catalogue with database-driven pages (Supabase)",
      "Product + Offer schema with ZAR pricing for Google Shopping",
      "Individual brand landing pages",
      "Cart, checkout, and order management",
    ],
  },
  {
    category: "Patient Features",
    items: [
      "Online booking system (/book)",
      "Gift vouchers (/gift-vouchers)",
      "Loyalty rewards programme (/rewards)",
      "Member dashboard with purchase history and points",
      "Free AI skin assessment quiz (/skin-assessment)",
      "Niki — AI skin & treatment consultant (voice-capable)",
    ],
  },
  {
    category: "SEO & AI Search",
    items: [
      "6 types of structured data: MedicalBusiness, LocalBusiness, HealthAndBeautyBusiness, MedicalProcedure, Product, Person, FAQPage, BreadcrumbList",
      "AI crawler allowlist: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended",
      "llms.txt for LLM discovery and citation",
      "Dynamic sitemap.xml covering all 60+ pages",
      "Canonical domain: staraesthetic.co.za (apex)",
      "301 redirects from all legacy WordPress URLs",
      "robots.txt with full configuration",
    ],
  },
  {
    category: "Technical Platform",
    items: [
      "Next.js 16 (App Router) — server-side rendered for full SEO visibility",
      "Deployed on Vercel with automatic scaling",
      "Supabase database (PostgreSQL) for products, orders, members, rewards",
      "Resend for transactional email",
      "Cloudflare Turnstile spam protection on forms",
      "TypeScript throughout — type-safe and maintainable",
      "Tailwind CSS — responsive mobile-first design",
    ],
  },
  {
    category: "Admin Panel",
    items: [
      "Full product management (create, edit, images, pricing, SEO)",
      "Order management and status updates",
      "Lead and enquiry tracking",
      "Member and rewards management",
      "Booking overview",
      "KPI dashboard",
    ],
  },
];

const seoScores = [
  { label: "Overall SEO Health", score: 72, max: 100, color: "bg-[#1B3D6E]" },
  { label: "Technical SEO", score: 82, max: 100, color: "bg-emerald-600" },
  { label: "Schema / Structured Data", score: 78, max: 100, color: "bg-emerald-600" },
  { label: "Content Quality (E-E-A-T)", score: 70, max: 100, color: "bg-[#C8A882]" },
  { label: "On-Page SEO", score: 74, max: 100, color: "bg-[#C8A882]" },
  { label: "AI Search Readiness (GEO)", score: 63, max: 100, color: "bg-[#939EBA]" },
  { label: "Performance (CWV est.)", score: 68, max: 100, color: "bg-[#939EBA]" },
];

const priorities = [
  { label: "Submit site to Google Search Console + sitemap", done: false, urgent: true },
  { label: "Optimise Google Business Profile (photos, services, categories)", done: false, urgent: true },
  { label: "Register on Fresha (appears 4× on competitor SERPs)", done: false, urgent: true },
  { label: "Register on Procompare.co.za and WhatClinic.com", done: false, urgent: false },
  { label: "Add HPCSA registration number to Dr. Bangalee page", done: false, urgent: false },
  { label: "Add pricing ranges to treatment pages (From R X)", done: false, urgent: false },
  { label: "WhatsApp click-to-chat widget", done: false, urgent: false },
  { label: "Google Review widget on homepage", done: false, urgent: false },
  { label: "Write 4 first blog articles", done: false, urgent: false },
  { label: "Verify Bing Webmaster Tools + submit sitemap", done: false, urgent: false },
  { label: "OAI-SearchBot added to robots.txt", done: true, urgent: false },
  { label: "llms.txt implemented", done: true, urgent: false },
  { label: "ALLOW_SEARCH_INDEXING=true set in Vercel", done: true, urgent: false },
  { label: "robots.txt and sitemap.xml publicly accessible", done: true, urgent: false },
  { label: "Primary domain: staraesthetic.co.za (apex)", done: true, urgent: false },
  { label: "Password gate: StarAesthetic2026!", done: true, urgent: false },
  { label: "Brand favicon deployed", done: true, urgent: false },
];

export default function SiteInfoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0F2647] text-white py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A882] mb-3">
            Website Information · 26 May 2026
          </p>
          <h1 className="text-3xl font-bold mb-3">Star Aesthetic Centre</h1>
          <p className="text-[#939EBA] text-lg">
            New website overview for Dr. Rajeev Bangalee &amp; Nakita
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-800/40 border border-emerald-600/40 px-3 py-1 text-xs font-semibold text-emerald-300">
              ✓ Live on staraesthetic.co.za
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#C8A882]/10 border border-[#C8A882]/30 px-3 py-1 text-xs font-semibold text-[#C8A882]">
              ⚠ Password Protected (pre-launch)
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-14">

        {/* SEO Scores */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-6">
            SEO Health Score — Audit 26 May 2026
          </h2>
          <p className="text-sm text-[#636374] mb-6">
            Scores reflect the new site&apos;s built-in capabilities. Full Google indexation takes 4–8 weeks after launch.
            The old staraesthetic.online site scored 31/100. The new site scored 72/100 before Google has even seen it.
          </p>
          <div className="space-y-4">
            {seoScores.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-[#1A1A1F]">{s.label}</span>
                  <span className="text-sm font-bold text-[#1B3D6E]">{s.score} / {s.max}</span>
                </div>
                <div className="h-2 bg-[#E2E2E6] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full`}
                    style={{ width: `${(s.score / s.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Launch Checklist */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-6">
            Launch Checklist
          </h2>
          <div className="space-y-2">
            {priorities.map((p) => (
              <div
                key={p.label}
                className={`flex items-start gap-3 p-3 border ${
                  p.done
                    ? "border-emerald-200 bg-emerald-50"
                    : p.urgent
                    ? "border-amber-200 bg-amber-50"
                    : "border-[#E2E2E6] bg-[#F7F7F8]"
                }`}
              >
                <span className="shrink-0 mt-0.5">
                  {p.done ? (
                    <span className="text-emerald-600 font-bold text-sm">✓</span>
                  ) : p.urgent ? (
                    <span className="text-amber-600 font-bold text-sm">!</span>
                  ) : (
                    <span className="text-[#939EBA] font-bold text-sm">○</span>
                  )}
                </span>
                <span className={`text-sm ${p.done ? "text-emerald-800" : p.urgent ? "text-amber-900 font-medium" : "text-[#636374]"}`}>
                  {p.label}
                </span>
                {p.urgent && !p.done && (
                  <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 px-2 py-0.5">
                    Do Now
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-6">
            What&apos;s Built Into The New Site
          </h2>
          <div className="space-y-8">
            {features.map((section) => (
              <div key={section.category}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1B3D6E] mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#636374]">
                      <span className="mt-1.5 shrink-0 h-1.5 w-1.5 bg-[#C8A882] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Competitor comparison */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-6">
            What No Competitor In Durban North Has
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "AI skin & treatment consultant (Niki)",
              "Voice-capable AI assistant on the website",
              "Member dashboard with loyalty points",
              "Gift voucher system",
              "Medical glossary (17 expert terms)",
              "6 types of structured data / schema markup",
              "AI search crawler allowlist (ChatGPT, Claude, Perplexity)",
              "llms.txt for LLM indexing",
              "Server-side rendering (Next.js) — full SEO visibility",
              "Dynamic sitemap covering all pages in real time",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 bg-[#0F2647]/5 border border-[#0F2647]/10 p-3 text-sm text-[#1A1A1F]">
                <span className="text-[#C8A882] font-bold shrink-0">★</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Key pages */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-6">
            Key Pages To Review
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "Homepage", href: "/" },
              { label: "All Treatments", href: "/treatments" },
              { label: "Anti-Wrinkle Treatment", href: "/treatments/face/anti-wrinkle-treatment" },
              { label: "Lip Filler", href: "/treatments/face/lip-filler" },
              { label: "Skin Peel", href: "/treatments/skin/skin-peel" },
              { label: "Dr. Rajeev Bangalee", href: "/dr-rajeev-bangalee" },
              { label: "Shop", href: "/shop" },
              { label: "NeoStrata", href: "/shop/brands/neostrata" },
              { label: "SkinCeuticals", href: "/shop/brands/skinceuticals" },
              { label: "Glossary", href: "/glossary" },
              { label: "Book a Consultation", href: "/book" },
              { label: "Skin Assessment", href: "/skin-assessment" },
              { label: "Gift Vouchers", href: "/gift-vouchers" },
              { label: "Rewards", href: "/rewards" },
              { label: "Contact", href: "/contact" },
              { label: "Admin Panel", href: "/admin" },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="flex items-center justify-between border border-[#E2E2E6] px-4 py-2.5 text-sm text-[#1B3D6E] hover:bg-[#F7F7F8] transition-colors"
              >
                {page.label}
                <span className="text-[#939EBA]">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Technical details */}
        <section className="border-t border-[#E2E2E6] pt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-4">
            Technical Details
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[
              ["Platform", "Next.js 16 (App Router)"],
              ["Hosting", "Vercel (auto-scaling)"],
              ["Database", "Supabase (PostgreSQL)"],
              ["Primary Domain", "staraesthetic.co.za"],
              ["Email", "Resend"],
              ["Spam Protection", "Cloudflare Turnstile"],
              ["Indexing", "ALLOW_SEARCH_INDEXING = true"],
              ["Password Gate", "StarAesthetic2026!"],
              ["AI Assistant", "Niki (Gemini-powered)"],
              ["Repository", "GitHub (private)"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="font-semibold text-[#1A1A1F] shrink-0">{label}:</dt>
                <dd className="text-[#636374]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

      </div>
    </main>
  );
}

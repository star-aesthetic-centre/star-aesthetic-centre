import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site Info — Pre-launch Checklist",
  robots: { index: false, follow: false },
};

type Status = "pass" | "warn" | "fail" | "info";

type CheckItem = {
  title: string;
  detail: string;
  status: Status;
};

type CheckSection = {
  id: string;
  title: string;
  description: string;
  items: CheckItem[];
};

const AUDIT_DATE = "10 July 2026";

const STATUS_STYLES: Record<
  Status,
  { label: string; badge: string; row: string }
> = {
  pass: {
    label: "PASS",
    badge: "bg-emerald-600 text-white",
    row: "border-emerald-200 bg-emerald-50/60",
  },
  warn: {
    label: "WARN",
    badge: "bg-amber-400 text-amber-950",
    row: "border-amber-200 bg-amber-50/70",
  },
  fail: {
    label: "FAIL",
    badge: "bg-red-600 text-white",
    row: "border-red-200 bg-red-50/70",
  },
  info: {
    label: "INFO",
    badge: "bg-sky-600 text-white",
    row: "border-sky-200 bg-sky-50/60",
  },
};

const sections: CheckSection[] = [
  {
    id: "critical",
    title: "Critical Checks",
    description: "Must be solid before removing the preview password and opening the site publicly.",
    items: [
      {
        title: "Domain & canonical URL",
        detail:
          "Primary host is https://staraesthetic.co.za (apex). Canonicals and metadataBase are set in lib/seo.ts; www redirects via Vercel.",
        status: "pass",
      },
      {
        title: "SSL / HTTPS",
        detail: "Production traffic is HTTPS via Vercel. No mixed-content config required for the Next.js app.",
        status: "pass",
      },
      {
        title: "Responsive design",
        detail: "Tailwind mobile-first layout across homepage, treatments, shop, booking, and admin.",
        status: "pass",
      },
      {
        title: "Primary contact info",
        detail:
          "Phone +27 (0)31 573 1325 and address 22 Ennisdale Drive appear in footer, contact, schema, and emails. Public email still mixed: schema/footer use info@staraesthetic.co.za; order/booking mail often uses info@staraesthetic.site.",
        status: "warn",
      },
      {
        title: "Broken links / URL accuracy",
        detail:
          "Cookie consent privacy link and llms.txt treatment URLs corrected in this audit. Spot-check Instagram/Facebook profile URLs and any CMS-edited contact WhatsApp placeholder before launch.",
        status: "warn",
      },
      {
        title: "Form submissions",
        detail:
          "Contact, booking, skin assessment, rewards, and member forms use honeypot + Cloudflare Turnstile. Confirm NEXT_PUBLIC_TURNSTILE_SITE_KEY (not a typo’d EXT_…) and TURNSTILE_SECRET_KEY are set on Vercel.",
        status: "warn",
      },
      {
        title: "Preview password gate",
        detail:
          "SITE_PASSWORD still gates public HTML via middleware. Expected pre-launch — remove/unset on go-live. Do not enable public indexing while the gate is on.",
        status: "info",
      },
      {
        title: "Search indexing switch",
        detail:
          "ALLOW_SEARCH_INDEXING controls robots.txt, meta robots, and X-Robots-Tag. Must be true at launch, and the password gate must be off so Google can crawl pages.",
        status: "warn",
      },
    ],
  },
  {
    id: "seo",
    title: "Content & SEO",
    description: "On-page foundations, crawlability, and structured data for Google and AI search.",
    items: [
      {
        title: "Page titles & metadata",
        detail: "Root title template and buildPageMetadata() provide titles, descriptions, canonicals, and keywords across key routes.",
        status: "pass",
      },
      {
        title: "Meta descriptions",
        detail: "Homepage, treatments, shop, legal, and doctor pages ship dedicated descriptions.",
        status: "pass",
      },
      {
        title: "Image alt text",
        detail: "Hero, treatment cards, products, and doctor imagery use descriptive alt attributes (not empty decorative defaults on public surfaces).",
        status: "pass",
      },
      {
        title: "Open Graph / social share",
        detail: "Default OG image and per-page OG/Twitter cards via lib/seo.ts and root layout.",
        status: "pass",
      },
      {
        title: "XML sitemap",
        detail: "Dynamic /sitemap.xml covers static pages, 12 treatments, brands, active products, and glossary terms.",
        status: "pass",
      },
      {
        title: "robots.txt + AI crawlers",
        detail: "When indexing is allowed: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended are permitted; admin/api/cart/checkout disallowed.",
        status: "pass",
      },
      {
        title: "Structured data",
        detail: "LocalBusiness / MedicalBusiness / HealthAndBeautyBusiness on layout; MedicalProcedure + FAQ on treatments; Product offers; Person on doctor page; BreadcrumbList helpers.",
        status: "pass",
      },
      {
        title: "llms.txt",
        detail: "Public /llms.txt present for LLM discovery; treatment URLs aligned with live routes.",
        status: "pass",
      },
      {
        title: "Legal pages",
        detail: "Privacy, Terms, Returns, and Shipping live under /legal/* and are in the sitemap.",
        status: "pass",
      },
      {
        title: "Favicon / app icon",
        detail: "No app/icon.tsx, apple-icon, or public/favicon.ico found in the Next.js app. Browser tab may show a generic icon — add a brand favicon before launch.",
        status: "fail",
      },
      {
        title: "HPCSA registration number",
        detail: "Dr Bangalee page states HPCSA registration but does not show a registration number. Add when available for E-E-A-T.",
        status: "warn",
      },
      {
        title: "Concerns / content pillar",
        detail: "Future Plans roadmap (concerns hubs) is not live yet — optional post-launch SEO expansion, not a hard launch blocker.",
        status: "info",
      },
      {
        title: "Google Search Console + sitemap submit",
        detail: "Add staraesthetic.co.za property, Change of Address from legacy .site if applicable, submit https://staraesthetic.co.za/sitemap.xml.",
        status: "fail",
      },
      {
        title: "Legacy domain 301s",
        detail: "In-app legacy path redirects exist. Host/DNS still needs staraesthetic.site (and .online if still live) → 301 → staraesthetic.co.za.",
        status: "warn",
      },
    ],
  },
  {
    id: "tracking",
    title: "Tracking & Analytics",
    description: "Measurement and marketing pixels — none are required for soft launch, but GSC is.",
    items: [
      {
        title: "Google Analytics 4",
        detail: "No GA4 / gtag / GTM implementation found in the Next.js app.",
        status: "fail",
      },
      {
        title: "Meta (Facebook) Pixel",
        detail: "No fbq / Meta Pixel code present.",
        status: "fail",
      },
      {
        title: "Cookie / privacy consent",
        detail: "CookieConsent banner stores accept/decline. Privacy policy covers POPIA. Banner links to /legal/privacy-policy.",
        status: "pass",
      },
      {
        title: "Google Business Profile",
        detail: "Update GBP website URL to https://staraesthetic.co.za and refresh photos/services/categories at launch.",
        status: "warn",
      },
    ],
  },
  {
    id: "security",
    title: "Accessibility & Security",
    description: "Spam protection, admin access, and baseline a11y posture.",
    items: [
      {
        title: "Admin authentication",
        detail: "Middleware protects /admin/* behind admin_session cookie; login at /admin/login.",
        status: "pass",
      },
      {
        title: "Spam protection (Turnstile + honeypot)",
        detail: "Public write APIs go through public-form-guard. Preview mode also blocks unauthenticated POSTs to gated APIs when SITE_PASSWORD is set.",
        status: "pass",
      },
      {
        title: "Custom security headers",
        detail: "No CSP / HSTS / X-Frame-Options overrides in next.config.ts. Vercel supplies HTTPS; consider adding headers post-launch.",
        status: "info",
      },
      {
        title: "Accessibility (contrast / keyboard / ARIA)",
        detail: "Some ARIA labels and dialog roles exist (e.g. cookie banner). No formal WCAG audit run in this pass — schedule a mobile keyboard pass before launch.",
        status: "info",
      },
    ],
  },
  {
    id: "commerce",
    title: "Commerce & Patient Features",
    description: "Shop, booking, and engagement systems that must smoke-test cleanly.",
    items: [
      {
        title: "Shop + checkout (EFT)",
        detail: "Supabase-backed catalogue, cart, checkout, and EFT proof-of-payment flow. PayFast is planned later — not a launch blocker.",
        status: "pass",
      },
      {
        title: "Online booking",
        detail: "/book wizard with Turnstile, emails to clinic inboxes, confirmation UX.",
        status: "pass",
      },
      {
        title: "Gift vouchers & rewards",
        detail: "Voucher purchase/activation and Starlights loyalty programme are implemented.",
        status: "pass",
      },
      {
        title: "Niki AI assistant",
        detail: "Floating widget + skin assessment flows; requires GEMINI_API_KEY on Vercel.",
        status: "pass",
      },
      {
        title: "WhatsApp click-to-chat",
        detail: "wa.me links on contact, booking, products, and Niki. Confirm NEXT_PUBLIC_WHATSAPP_NUMBER on Vercel matches the live clinic number (defaults/content still include a placeholder in one CMS default).",
        status: "warn",
      },
    ],
  },
];

const allItems = sections.flatMap((s) => s.items);
const passCount = allItems.filter((i) => i.status === "pass").length;
const warnCount = allItems.filter((i) => i.status === "warn").length;
const failCount = allItems.filter((i) => i.status === "fail").length;
const infoCount = allItems.filter((i) => i.status === "info").length;
const totalChecks = allItems.length;
const completePct = Math.round((passCount / totalChecks) * 100);

const performanceScores = [
  { label: "Overall SEO health (May 2026 audit)", score: 72, max: 100, note: "Pre-indexation capability score" },
  { label: "Technical SEO", score: 82, max: 100, note: "SSR, sitemap, canonicals, AI crawlers" },
  { label: "Schema / structured data", score: 78, max: 100, note: "6+ schema types live" },
  { label: "On-page SEO", score: 74, max: 100, note: "Metadata solid; content depth still growing" },
  { label: "Content quality (E-E-A-T)", score: 70, max: 100, note: "Doctor page strong; HPCSA number + blog still open" },
  { label: "AI search readiness (GEO)", score: 68, max: 100, note: "llms.txt + crawler allowlist in place" },
  { label: "Performance (CWV estimate)", score: 68, max: 100, note: "Run PageSpeed on production after gate removal" },
];

const siteFacts = [
  { label: "Hosting", value: "Vercel (auto-deploy from main)" },
  { label: "Framework", value: "Next.js 16.1.6 (App Router)" },
  { label: "UI stack", value: "React 19 · Tailwind CSS v4 · TypeScript" },
  { label: "Database", value: "Supabase (PostgreSQL)" },
  { label: "Email", value: "Resend" },
  { label: "Spam protection", value: "Cloudflare Turnstile + honeypot" },
  { label: "Primary domain", value: "staraesthetic.co.za" },
  { label: "Payments (live)", value: "EFT / banking details" },
  { label: "AI assistant", value: "Niki (Gemini)" },
  { label: "Repository", value: "GitHub (private) → Vercel" },
  { label: "Audit date", value: AUDIT_DATE },
  { label: "Prior SEO report", value: "26 May 2026 (72/100)" },
];

const goLiveSteps = [
  "Unset SITE_PASSWORD in Vercel (remove preview gate).",
  "Confirm ALLOW_SEARCH_INDEXING=true in Vercel.",
  "Confirm Turnstile + WhatsApp env vars on Vercel (correct NEXT_PUBLIC_ names).",
  "301 staraesthetic.site → staraesthetic.co.za at DNS/host level.",
  "Google Search Console: add .co.za, submit sitemap, request indexing for home + top treatments.",
  "Update Google Business Profile website URL to https://staraesthetic.co.za.",
  "Align public email (.site vs .co.za) across footer, schema, and transactional mail.",
  "Add brand favicon (app/icon or public/favicon.ico).",
  "Smoke test: home, shop → checkout EFT, /book, contact form, admin login, Niki, mobile nav/footer.",
];

const keyPages = [
  { label: "Homepage", href: "/" },
  { label: "Treatments", href: "/treatments" },
  { label: "Anti-Wrinkle Treatment", href: "/treatments/face/anti-wrinkle-treatment" },
  { label: "Dr. Rajeev Bangalee", href: "/dr-rajeev-bangalee" },
  { label: "Shop", href: "/shop" },
  { label: "Book", href: "/book" },
  { label: "Skin Assessment", href: "/skin-assessment" },
  { label: "Gift Vouchers", href: "/gift-vouchers" },
  { label: "Rewards", href: "/rewards" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Admin", href: "/admin" },
];

function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex min-w-[3.5rem] items-center justify-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${s.badge}`}
    >
      {s.label}
    </span>
  );
}

function barColor(score: number): string {
  if (score >= 80) return "bg-emerald-600";
  if (score >= 70) return "bg-[#1B3D6E]";
  if (score >= 60) return "bg-[#C8A882]";
  return "bg-[#939EBA]";
}

export default function SiteInfoPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F8]">
      {/* Header */}
      <div className="bg-[#0F2647] text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A882]">
            Site Info · Pre-launch Checklist · {AUDIT_DATE}
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Star Aesthetic Centre
          </h1>
          <p className="max-w-2xl text-base text-[#939EBA] sm:text-lg">
            Launch readiness overview for Dr. Rajeev Bangalee &amp; Nakita — technical status,
            SEO, tracking, and go-live actions.
          </p>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm text-[#939EBA]">
                Status:{" "}
                <span className="font-semibold text-white">
                  {completePct}% complete
                </span>{" "}
                ({passCount}/{totalChecks} checks passed)
              </p>
              <div className="mt-3 h-2 w-64 max-w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#C8A882]"
                  style={{ width: `${completePct}%` }}
                />
              </div>
              <p className="mt-3 flex flex-wrap gap-3 text-xs text-[#939EBA]">
                <span className="text-emerald-300">{passCount} pass</span>
                <span className="text-amber-300">{warnCount} warn</span>
                <span className="text-red-300">{failCount} fail</span>
                <span className="text-sky-300">{infoCount} info</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 border border-emerald-600/40 bg-emerald-800/40 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                Live on staraesthetic.co.za
              </span>
              <span className="inline-flex items-center gap-1.5 border border-[#C8A882]/30 bg-[#C8A882]/10 px-3 py-1.5 text-xs font-semibold text-[#C8A882]">
                Password gate active
              </span>
            </div>
          </div>

          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Checklist sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#939EBA] transition-colors hover:border-[#C8A882]/40 hover:text-[#C8A882]"
              >
                {s.title}
              </a>
            ))}
            <a
              href="#performance"
              className="border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#939EBA] transition-colors hover:border-[#C8A882]/40 hover:text-[#C8A882]"
            >
              Performance
            </a>
            <a
              href="#go-live"
              className="border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#939EBA] transition-colors hover:border-[#C8A882]/40 hover:text-[#C8A882]"
            >
              Go-live
            </a>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
        {/* Checklist sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
                {section.title}
              </h2>
              <p className="mt-2 text-sm text-[#636374]">{section.description}</p>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => {
                const styles = STATUS_STYLES[item.status];
                return (
                  <div
                    key={item.title}
                    className={`flex flex-col gap-3 border p-4 sm:flex-row sm:items-start sm:justify-between ${styles.row}`}
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#1A1A1F]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#636374]">{item.detail}</p>
                    </div>
                    <div className="shrink-0 sm:pt-0.5">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Performance */}
        <section id="performance" className="scroll-mt-24">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
            Performance &amp; SEO Scores
          </h2>
          <p className="mb-6 text-sm text-[#636374]">
            Scores from the 26 May 2026 SEO audit, lightly adjusted for work completed since
            (llms.txt, indexing wiring). Re-measure Core Web Vitals on the live ungated site.
          </p>
          <div className="space-y-4 rounded-none border border-[#E2E2E6] bg-white p-5 sm:p-6">
            {performanceScores.map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <div>
                    <span className="text-sm font-medium text-[#1A1A1F]">{s.label}</span>
                    <p className="text-xs text-[#939EBA]">{s.note}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-[#1B3D6E]">
                    {s.score}/{s.max}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E2E2E6]">
                  <div
                    className={`h-full rounded-full ${barColor(s.score)}`}
                    style={{ width: `${(s.score / s.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Site information grid */}
        <section>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
            Site Information
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siteFacts.map((fact) => (
              <div key={fact.label} className="border border-[#E2E2E6] bg-white p-4">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-[#939EBA]">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-[#1A1A1F]">{fact.value}</dd>
              </div>
            ))}
          </div>
        </section>

        {/* Go-live */}
        <section id="go-live" className="scroll-mt-24">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
            Go-live Sequence
          </h2>
          <p className="mb-6 text-sm text-[#636374]">
            Do these in order when Nakita and Dr Bangalee are ready for public traffic.
          </p>
          <ol className="space-y-2 border border-[#E2E2E6] bg-white p-5 sm:p-6">
            {goLiveSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-[#636374]">
                <span className="shrink-0 font-bold text-[#1B3D6E]">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Key pages */}
        <section>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
            Key Pages To Review
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {keyPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="flex items-center justify-between border border-[#E2E2E6] bg-white px-4 py-2.5 text-sm text-[#1B3D6E] transition-colors hover:bg-[#F7F7F8]"
              >
                {page.label}
                <span className="text-[#939EBA]">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="border border-[#E2E2E6] bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">
            Troubleshooting Notes
          </h2>
          <ul className="space-y-2 text-sm text-[#636374]">
            <li>
              <strong className="text-[#1A1A1F]">FAIL items</strong> — favicon, Search Console
              submit, and analytics pixels. Favicon + GSC are the only hard SEO blockers among
              them; GA4/Pixel can follow launch if desired.
            </li>
            <li>
              <strong className="text-[#1A1A1F]">WARN items</strong> — email consistency, Turnstile
              env naming, legacy domain 301s, WhatsApp number, GBP update. Resolve before or on
              launch day.
            </li>
            <li>
              <strong className="text-[#1A1A1F]">Password + indexing</strong> — never leave
              ALLOW_SEARCH_INDEXING=true while SITE_PASSWORD still blocks HTML; crawlers will hit
              the preview login.
            </li>
            <li>
              Local health check:{" "}
              <code className="text-xs text-[#1B3D6E]">node scripts/health-check.mjs</code> from{" "}
              <code className="text-xs text-[#1B3D6E]">nextjs/</code> (needs Supabase keys).
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

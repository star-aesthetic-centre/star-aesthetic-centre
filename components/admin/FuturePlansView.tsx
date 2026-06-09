import Link from "next/link";
import {
  CANNIBALIZATION_RULES,
  COMPARISON_TABLE_IDEAS,
  CONCERN_CATEGORIES,
  CONTENT_TEMPLATE_PER_PILLAR,
  DIRECT_AESTHETICS_TAKEAWAYS,
  DR_BANGALEE_VOICE,
  FUTURE_PLANS_META,
  IMPLEMENTATION_PHASES,
  NIKI_SYNC_TASKS,
  PATIENT_LANGUAGE_RESEARCH,
  SITE_ARCHITECTURE_LAYERS,
  STATUS_COLORS,
  STATUS_LABELS,
  type PlanStatus,
  type PlanTask,
} from "@/lib/admin/future-plans";

function StatusBadge({ status }: { status: PlanStatus }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function TaskList({ tasks }: { tasks: PlanTask[] }) {
  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <li key={t.id} className="flex gap-3 border border-[#E5E4E0] bg-[#F8F8F7] p-3">
          <StatusBadge status={t.status} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-[#1A1917]">{t.label}</p>
            {t.notes && <p className="mt-1 text-xs text-[#6B6966] leading-relaxed">{t.notes}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group border border-[#E5E4E0] bg-white"
    >
      <summary className="cursor-pointer list-none px-5 py-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between hover:bg-[#F8F8F7]">
        <span className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647]">
          {title}
        </span>
        {summary && (
          <span className="text-xs text-[#6B6966] sm:max-w-[55%] sm:text-right">{summary}</span>
        )}
      </summary>
      <div className="border-t border-[#E5E4E0] px-5 py-5 space-y-4">{children}</div>
    </details>
  );
}

export default function FuturePlansView() {
  const totalConcernPages = CONCERN_CATEGORIES.reduce((n, c) => n + c.pages.length, 0);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="border border-[#939EBA]/30 bg-[#EEF0F6] px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-2">
          Strategic roadmap · Not live on site
        </p>
        <p className="text-sm text-[#1A1917] leading-relaxed max-w-3xl">{FUTURE_PLANS_META.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#6B6966]">
          <span>
            Last updated: <strong className="text-[#1A1917]">{FUTURE_PLANS_META.lastUpdated}</strong>
          </span>
          <span>
            Concern pillars planned: <strong className="text-[#1A1917]">{totalConcernPages}</strong>
          </span>
          <a
            href={FUTURE_PLANS_META.competitorReference}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#939EBA] hover:text-[#0F2647]"
          >
            Direct Aesthetics reference ↗
          </a>
        </div>
      </div>

      {/* Quick nav */}
      <nav className="flex flex-wrap gap-2 text-xs">
        {[
          ["#architecture", "Architecture"],
          ["#page-map", "Page map"],
          ["#cannibalization", "SEO rules"],
          ["#dr-voice", "Dr Bangalee voice"],
          ["#patient-language", "Patient language"],
          ["#content-template", "Content template"],
          ["#direct-aesthetics", "Direct Aesthetics"],
          ["#niki", "Niki sync"],
          ["#phases", "Phases"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="border border-[#E5E4E0] bg-white px-3 py-1.5 font-semibold text-[#0F2647] hover:border-[#939EBA]"
          >
            {label}
          </a>
        ))}
      </nav>

      <Section
        id="architecture"
        title="Site architecture — where each layer lives"
        summary="Treatment = convert · Concerns = educate · Learn = support"
        defaultOpen
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E5E4E0] text-xs uppercase tracking-wider text-[#6B6966]">
                <th className="py-2 pr-4 font-semibold">Layer</th>
                <th className="py-2 pr-4 font-semibold">URL pattern</th>
                <th className="py-2 pr-4 font-semibold">Purpose</th>
                <th className="py-2 font-semibold">Cannibalization note</th>
              </tr>
            </thead>
            <tbody>
              {SITE_ARCHITECTURE_LAYERS.map((row) => (
                <tr key={row.layer} className="border-b border-[#E5E4E0] align-top">
                  <td className="py-3 pr-4 font-semibold text-[#0F2647] whitespace-nowrap">{row.layer}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-[#939EBA]">{row.pathPattern}</td>
                  <td className="py-3 pr-4 text-[#636374]">{row.purpose}</td>
                  <td className="py-3 text-[#636374] text-xs">{row.cannibalization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6B6966] leading-relaxed">
          <strong className="text-[#1A1917]">Not a blog-only strategy.</strong> Direct Aesthetics ranks with{" "}
          <code className="text-[11px] bg-[#F2F1EF] px-1">/concerns/</code> pillar pages, not dated blog posts.
          Use <code className="text-[11px] bg-[#F2F1EF] px-1">/learn/</code> (or Skin School) for supporting articles
          that link into concerns and treatments.
        </p>
      </Section>

      <Section
        id="page-map"
        title="Page map — 3 hubs × 4 concern pillars"
        summary="12 new concern pages + 3 category hubs (+ learn articles later)"
      >
        {CONCERN_CATEGORIES.map((cat) => (
          <div key={cat.slug} className="mb-6 last:mb-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="font-heading font-bold text-[#0F2647]">{cat.name}</h3>
              <code className="text-xs bg-[#F2F1EF] px-2 py-1 text-[#939EBA]">{cat.hubPath}</code>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-[#E5E4E0] text-[10px] uppercase tracking-wider text-[#6B6966]">
                    <th className="py-2 pr-3">Concern page (new)</th>
                    <th className="py-2 pr-3">Links to treatment (existing)</th>
                    <th className="py-2 pr-3">Primary keywords</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.pages.map((p) => (
                    <tr key={p.slug} className="border-b border-[#E5E4E0] align-top">
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-[#1A1917]">{p.title}</p>
                        <code className="text-[10px] text-[#939EBA]">{p.concernPath}</code>
                      </td>
                      <td className="py-3 pr-3">
                        <Link
                          href={p.treatmentPath}
                          target="_blank"
                          className="text-xs font-semibold text-[#939EBA] hover:text-[#0F2647]"
                        >
                          {p.treatmentPath} ↗
                        </Link>
                      </td>
                      <td className="py-3 pr-3 text-xs text-[#636374]">
                        {p.primaryKeywords.join(" · ")}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Section>

      <Section
        id="cannibalization"
        title="SEO — avoid competing with treatment pages"
        summary="Different intent, title, H1, and CTA for each layer"
      >
        <ul className="space-y-2 text-sm text-[#636374] list-disc pl-5">
          {CANNIBALIZATION_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="dr-voice"
        title="Dr Bangalee authority & voice"
        summary="Should read as clinically reviewed — not generic AI or US med-spa copy"
      >
        <p className="text-sm text-[#636374] leading-relaxed">{DR_BANGALEE_VOICE.summary}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mb-2">Must feel like</p>
            <ul className="text-sm text-[#636374] space-y-1 list-disc pl-5">
              {DR_BANGALEE_VOICE.mustFeelLike.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mb-2">Publish workflow</p>
            <ol className="text-sm text-[#636374] space-y-1 list-decimal pl-5">
              {DR_BANGALEE_VOICE.workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mb-2">Avoid</p>
        <ul className="text-sm text-[#636374] space-y-1 list-disc pl-5">
          {DR_BANGALEE_VOICE.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-[#1A1917] border-l-2 border-[#C8A882] pl-4">
          <strong>Yes — content should appear as if Dr Bangalee wrote or endorsed it.</strong> Ghost-writing is fine
          for the first draft, but every concern and learn article needs a medical review pass before publish.
        </p>
      </Section>

      <Section
        id="patient-language"
        title="Patient language research"
        summary="Use words patients type — research before writing each pillar"
      >
        <p className="text-sm text-[#636374]">{PATIENT_LANGUAGE_RESEARCH.summary}</p>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mt-2 mb-2">Research sources</p>
        <ul className="text-sm text-[#636374] list-disc pl-5 space-y-1">
          {PATIENT_LANGUAGE_RESEARCH.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mt-4 mb-2">
          Deliverable per concern page
        </p>
        <ul className="text-sm text-[#636374] list-disc pl-5 space-y-1">
          {PATIENT_LANGUAGE_RESEARCH.deliverablePerPage.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="content-template"
        title="Concern pillar content template"
        summary="Question H2s · bullets · tables · FAQ schema"
      >
        <p className="text-sm text-[#636374]">
          H1 example pattern: concern-led (e.g. “Fine Lines & Wrinkles”), not service name (“Anti-Wrinkle Treatment”).
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mt-3 mb-2">Standard H2 questions</p>
        <ul className="text-sm text-[#636374] list-disc pl-5 space-y-1">
          {CONTENT_TEMPLATE_PER_PILLAR.h2Questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mt-4 mb-2">Page sections (in order)</p>
        <ol className="text-sm text-[#636374] list-decimal pl-5 space-y-1">
          {CONTENT_TEMPLATE_PER_PILLAR.sections.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="text-xs font-bold uppercase tracking-wider text-[#939EBA] mt-4 mb-2">Comparison table ideas</p>
        <div className="space-y-3">
          {COMPARISON_TABLE_IDEAS.map((t) => (
            <div key={t.name} className="border border-[#E5E4E0] bg-[#F8F8F7] p-3">
              <p className="text-sm font-semibold text-[#0F2647]">{t.name}</p>
              <p className="text-xs text-[#939EBA] mt-1">Columns: {t.columns.join(" · ")}</p>
              {t.note && <p className="text-xs text-[#6B6966] mt-1">{t.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="direct-aesthetics"
        title="Direct Aesthetics competitive checklist"
        summary="Hidden tactics from competitor audit — June 2026"
      >
        <TaskList tasks={DIRECT_AESTHETICS_TAKEAWAYS} />
      </Section>

      <Section
        id="niki"
        title="Niki education & voice agent"
        summary="Niki must know concern pages when they go live"
      >
        <TaskList tasks={NIKI_SYNC_TASKS} />
      </Section>

      <Section
        id="phases"
        title="Implementation phases"
        summary="Start with Anti-Wrinkle pilot — measure before scaling"
      >
        <div className="space-y-5">
          {IMPLEMENTATION_PHASES.map((phase) => (
            <div key={phase.phase} className="border-l-2 border-[#939EBA] pl-4">
              <p className="font-heading font-bold text-[#0F2647]">{phase.phase}</p>
              <p className="text-xs text-[#939EBA] mb-2">{phase.timing}</p>
              <ul className="text-sm text-[#636374] list-disc pl-5 space-y-1">
                {phase.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-xs text-[#6B6966] text-center pt-4">
        Edit roadmap data in{" "}
        <code className="bg-[#F2F1EF] px-1">lib/admin/future-plans.ts</code> · This admin page is internal only
        (noindex)
      </p>
    </div>
  );
}

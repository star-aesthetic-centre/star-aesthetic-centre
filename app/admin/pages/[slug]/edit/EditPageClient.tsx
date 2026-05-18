"use client";

import { useState, useTransition } from "react";
import RichHtmlEditor from "@/components/admin/RichHtmlEditor";
import { updateSitePageAction } from "@/app/admin/pages/actions";
import type {
  ContactPageContent,
  DrPageContent,
  HomePageContent,
  SitePageContentMap,
  SitePageSlug,
  StatItem,
  ContactTestimonial,
  HoursRow,
} from "@/lib/content/site-pages-types";

const inputClass =
  "w-full border border-[#E5E4E0] bg-white px-3 py-2.5 text-sm text-[#1A1917] outline-none focus:border-[#0F2647] transition-colors";
const labelClass = "block text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-2";
const sectionClass = "bg-white border border-[#E5E4E0] p-6 space-y-4";

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {multiline ? (
        <textarea
          className={`${inputClass} min-h-[88px] resize-y`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function StatsEditor({
  stats,
  onChange,
  count = 3,
}: {
  stats: StatItem[];
  onChange: (stats: StatItem[]) => void;
  count?: number;
}) {
  const items = [...stats];
  while (items.length < count) items.push({ value: "", label: "" });
  const trimmed = items.slice(0, count);

  return (
    <div className="space-y-3">
      {trimmed.map((s, i) => (
        <div key={i} className="grid grid-cols-2 gap-3">
          <Field
            label={`Stat ${i + 1} — value`}
            value={s.value}
            onChange={(value) => {
              const next = [...trimmed];
              next[i] = { ...next[i], value };
              onChange(next);
            }}
          />
          <Field
            label={`Stat ${i + 1} — label`}
            value={s.label}
            onChange={(label) => {
              const next = [...trimmed];
              next[i] = { ...next[i], label };
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputClass}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 px-2 text-xs text-red-600 border border-red-200"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-xs font-semibold text-[#939EBA] hover:text-[#0F2647]"
        >
          + Add line
        </button>
      </div>
    </div>
  );
}

function HomeEditor({
  content,
  setContent,
}: {
  content: HomePageContent;
  setContent: (c: HomePageContent) => void;
}) {
  const h = content.hero;
  const d = content.doctorTrust;
  const p = content.perksRewards;
  const b = content.bookingCta;
  const seo = content.seo;

  return (
    <>
      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Hero</h2>
        <Field label="Overline" value={h.overline} onChange={(overline) => setContent({ ...content, hero: { ...h, overline } })} />
        <Field label="Heading line 1" value={h.headingLine1} onChange={(headingLine1) => setContent({ ...content, hero: { ...h, headingLine1 } })} />
        <Field label="Heading emphasis (coloured)" value={h.headingEmphasis} onChange={(headingEmphasis) => setContent({ ...content, hero: { ...h, headingEmphasis } })} />
        <Field label="Subtitle" value={h.subtitle} onChange={(subtitle) => setContent({ ...content, hero: { ...h, subtitle } })} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary button" value={h.ctaPrimary} onChange={(ctaPrimary) => setContent({ ...content, hero: { ...h, ctaPrimary } })} />
          <Field label="Secondary button" value={h.ctaSecondary} onChange={(ctaSecondary) => setContent({ ...content, hero: { ...h, ctaSecondary } })} />
        </div>
        <StatsEditor stats={h.stats} onChange={(stats) => setContent({ ...content, hero: { ...h, stats } })} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Meet your doctor</h2>
        <Field label="Overline" value={d.overline} onChange={(overline) => setContent({ ...content, doctorTrust: { ...d, overline } })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name line 1" value={d.nameLine1} onChange={(nameLine1) => setContent({ ...content, doctorTrust: { ...d, nameLine1 } })} />
          <Field label="Name line 2" value={d.nameLine2} onChange={(nameLine2) => setContent({ ...content, doctorTrust: { ...d, nameLine2 } })} />
        </div>
        <Field label="Role / subtitle" value={d.role} onChange={(role) => setContent({ ...content, doctorTrust: { ...d, role } })} />
        <Field label="Quote" value={d.quote} onChange={(quote) => setContent({ ...content, doctorTrust: { ...d, quote } })} multiline />
        <Field label="Body paragraph" value={d.body} onChange={(body) => setContent({ ...content, doctorTrust: { ...d, body } })} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge value" value={d.badgeValue} onChange={(badgeValue) => setContent({ ...content, doctorTrust: { ...d, badgeValue } })} />
          <Field label="Badge label" value={d.badgeLabel} onChange={(badgeLabel) => setContent({ ...content, doctorTrust: { ...d, badgeLabel } })} />
        </div>
        <Field label="Button label" value={d.ctaLabel} onChange={(ctaLabel) => setContent({ ...content, doctorTrust: { ...d, ctaLabel } })} />
        <StringListEditor label="Credentials" items={d.credentials} onChange={(credentials) => setContent({ ...content, doctorTrust: { ...d, credentials } })} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Star Light Rewards card</h2>
        <Field label="Label" value={p.label} onChange={(label) => setContent({ ...content, perksRewards: { ...p, label } })} />
        <Field label="Title line 1" value={p.titleLine1} onChange={(titleLine1) => setContent({ ...content, perksRewards: { ...p, titleLine1 } })} />
        <Field label="Title line 2" value={p.titleLine2} onChange={(titleLine2) => setContent({ ...content, perksRewards: { ...p, titleLine2 } })} />
        <Field label="Title line 3" value={p.titleLine3} onChange={(titleLine3) => setContent({ ...content, perksRewards: { ...p, titleLine3 } })} />
        <Field label="Body" value={p.body} onChange={(body) => setContent({ ...content, perksRewards: { ...p, body } })} multiline />
        <Field label="Button" value={p.ctaLabel} onChange={(ctaLabel) => setContent({ ...content, perksRewards: { ...p, ctaLabel } })} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Booking CTA</h2>
        <Field label="Overline" value={b.overline} onChange={(overline) => setContent({ ...content, bookingCta: { ...b, overline } })} />
        <Field label="Title line 1" value={b.titleLine1} onChange={(titleLine1) => setContent({ ...content, bookingCta: { ...b, titleLine1 } })} />
        <Field label="Title emphasis" value={b.titleEmphasis} onChange={(titleEmphasis) => setContent({ ...content, bookingCta: { ...b, titleEmphasis } })} />
        <Field label="Body" value={b.body} onChange={(body) => setContent({ ...content, bookingCta: { ...b, body } })} multiline />
      </section>

      <SeoFields seo={seo} onChange={(seo) => setContent({ ...content, seo })} />
    </>
  );
}

function SeoFields({
  seo,
  onChange,
}: {
  seo: { title: string; description: string };
  onChange: (seo: { title: string; description: string }) => void;
}) {
  return (
    <section className={sectionClass}>
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">SEO (Google)</h2>
      <Field label="Page title" value={seo.title} onChange={(title) => onChange({ ...seo, title })} />
      <Field label="Meta description" value={seo.description} onChange={(description) => onChange({ ...seo, description })} multiline />
    </section>
  );
}

function ContactEditor({
  content,
  setContent,
}: {
  content: ContactPageContent;
  setContent: (c: ContactPageContent) => void;
}) {
  const hero = content.hero;
  const form = content.formIntro;
  const doc = content.doctorCard;
  const c = content.contact;

  const updateTestimonial = (i: number, patch: Partial<ContactTestimonial>) => {
    const testimonials = content.testimonials.map((t, j) => (j === i ? { ...t, ...patch } : t));
    setContent({ ...content, testimonials });
  };

  const updateHours = (i: number, patch: Partial<HoursRow>) => {
    const hours = content.hours.map((row, j) => (j === i ? { ...row, ...patch } : row));
    setContent({ ...content, hours });
  };

  return (
    <>
      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Hero</h2>
        <Field label="Overline" value={hero.overline} onChange={(overline) => setContent({ ...content, hero: { ...hero, overline } })} />
        <Field label="Title" value={hero.title} onChange={(title) => setContent({ ...content, hero: { ...hero, title } })} />
        <Field label="Subtitle" value={hero.subtitle} onChange={(subtitle) => setContent({ ...content, hero: { ...hero, subtitle } })} multiline />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Contact form intro</h2>
        <Field label="Heading" value={form.title} onChange={(title) => setContent({ ...content, formIntro: { ...form, title } })} />
        <Field label="Body" value={form.body} onChange={(body) => setContent({ ...content, formIntro: { ...form, body } })} multiline />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Dr. Bangalee card</h2>
        <Field label="Body" value={doc.body} onChange={(body) => setContent({ ...content, doctorCard: { ...doc, body } })} multiline />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Contact details</h2>
        <Field label="Phone (digits only, for links)" value={c.phone} onChange={(phone) => setContent({ ...content, contact: { ...c, phone } })} />
        <Field label="Phone (display)" value={c.phoneDisplay} onChange={(phoneDisplay) => setContent({ ...content, contact: { ...c, phoneDisplay } })} />
        <Field label="WhatsApp display" value={c.whatsappNote} onChange={(whatsappNote) => setContent({ ...content, contact: { ...c, whatsappNote } })} />
        <Field label="Email" value={c.email} onChange={(email) => setContent({ ...content, contact: { ...c, email } })} />
        <Field label="Address line 1" value={c.addressLine1} onChange={(addressLine1) => setContent({ ...content, contact: { ...c, addressLine1 } })} />
        <Field label="Address line 2" value={c.addressLine2} onChange={(addressLine2) => setContent({ ...content, contact: { ...c, addressLine2 } })} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Hours</h2>
        {content.hours.map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label="Day" value={row.day} onChange={(day) => updateHours(i, { day })} />
            <Field label="Hours" value={row.hours} onChange={(hours) => updateHours(i, { hours })} />
          </div>
        ))}
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Testimonials</h2>
        {content.testimonials.map((t, i) => (
          <div key={i} className="border-t border-[#E5E4E0] pt-4 space-y-3 first:border-0 first:pt-0">
            <p className="text-xs font-bold text-[#939EBA]">Testimonial {i + 1}</p>
            <Field label="Name" value={t.name} onChange={(name) => updateTestimonial(i, { name })} />
            <Field label="Location" value={t.location} onChange={(location) => updateTestimonial(i, { location })} />
            <Field label="Treatment tag" value={t.treatment} onChange={(treatment) => updateTestimonial(i, { treatment })} />
            <Field label="Quote" value={t.text} onChange={(text) => updateTestimonial(i, { text })} multiline />
          </div>
        ))}
      </section>

      <SeoFields seo={content.seo} onChange={(seo) => setContent({ ...content, seo })} />
    </>
  );
}

function DrEditor({
  content,
  setContent,
}: {
  content: DrPageContent;
  setContent: (c: DrPageContent) => void;
}) {
  const h = content.hero;
  const a = content.about;

  return (
    <>
      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Hero</h2>
        <Field label="Overline" value={h.overline} onChange={(overline) => setContent({ ...content, hero: { ...h, overline } })} />
        <Field label="Title (use CAPS if needed)" value={h.title} onChange={(title) => setContent({ ...content, hero: { ...h, title } })} />
        <Field label="Subtitle" value={h.subtitle} onChange={(subtitle) => setContent({ ...content, hero: { ...h, subtitle } })} />
        <Field label="Intro" value={h.intro} onChange={(intro) => setContent({ ...content, hero: { ...h, intro } })} multiline />
        <StringListEditor label="Credential pills" items={h.credentialPills} onChange={(credentialPills) => setContent({ ...content, hero: { ...h, credentialPills } })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA" value={h.ctaPrimary} onChange={(ctaPrimary) => setContent({ ...content, hero: { ...h, ctaPrimary } })} />
          <Field label="Secondary CTA" value={h.ctaSecondary} onChange={(ctaSecondary) => setContent({ ...content, hero: { ...h, ctaSecondary } })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge value" value={h.badgeValue} onChange={(badgeValue) => setContent({ ...content, hero: { ...h, badgeValue } })} />
          <Field label="Badge label" value={h.badgeLabel} onChange={(badgeLabel) => setContent({ ...content, hero: { ...h, badgeLabel } })} />
        </div>
        <StatsEditor stats={content.stats} onChange={(stats) => setContent({ ...content, stats })} count={4} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647]">Biography</h2>
        <Field label="Overline" value={a.overline} onChange={(overline) => setContent({ ...content, about: { ...a, overline } })} />
        <Field label="Heading" value={a.heading} onChange={(heading) => setContent({ ...content, about: { ...a, heading } })} />
        <Field label="Quote" value={a.quote} onChange={(quote) => setContent({ ...content, about: { ...a, quote } })} multiline />
        <div>
          <label className={labelClass}>Biography (rich text)</label>
          <RichHtmlEditor
            value={a.bodyHtml}
            onChange={(bodyHtml) => setContent({ ...content, about: { ...a, bodyHtml } })}
            variant="full"
          />
        </div>
      </section>

      <SeoFields seo={content.seo} onChange={(seo) => setContent({ ...content, seo })} />
    </>
  );
}

export default function EditPageClient<S extends SitePageSlug>({
  slug,
  initialContent,
}: {
  slug: S;
  initialContent: SitePageContentMap[S];
}) {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateSitePageAction(slug, content);
      if (res.success) showToast("Page saved — live site updated", true);
      else showToast(res.error ?? "Save failed", false);
    });
  };

  return (
    <div>
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-medium shadow-lg ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.ok ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      <div className="space-y-6 pb-24">
        {slug === "home" && (
          <HomeEditor content={content as HomePageContent} setContent={setContent as (c: HomePageContent) => void} />
        )}
        {slug === "contact" && (
          <ContactEditor content={content as ContactPageContent} setContent={setContent as (c: ContactPageContent) => void} />
        )}
        {slug === "dr-rajeev-bangalee" && (
          <DrEditor content={content as DrPageContent} setContent={setContent as (c: DrPageContent) => void} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-[#E5E4E0] bg-white/95 backdrop-blur px-6 py-4 flex justify-end gap-3 z-20">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="bg-[#0F2647] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1B3D6E] disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving…" : "Save page"}
        </button>
      </div>
    </div>
  );
}

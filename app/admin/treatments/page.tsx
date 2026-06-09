import { createSupabaseAdmin } from "@/lib/supabase-admin";
import treatmentsJson from "@/lib/data/treatments.json";
import TreatmentsClient from "./TreatmentsClient";
import SeedTreatmentsButton from "./SeedTreatmentsButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Title map from JSON (slug → title) for display
const JSON_TITLES: Record<string, string> = Object.fromEntries(
  (treatmentsJson as { slug: string; title: string; tagline: string }[]).map((t) => [
    t.slug,
    t.title,
  ])
);

// Fallback taglines from JSON (used when Supabase tagline is null/empty)
const JSON_TAGLINES: Record<string, string> = Object.fromEntries(
  (treatmentsJson as { slug: string; tagline: string }[]).map((t) => [t.slug, t.tagline])
);

const CATEGORY_LABELS: Record<string, string> = {
  face: "Face",
  skin: "Skin",
  "body-wellness": "Body & Wellness",
};

const CATEGORY_COLORS: Record<string, string> = {
  face: "bg-rose-50 text-rose-700",
  skin: "bg-amber-50 text-amber-700",
  "body-wellness": "bg-sky-50 text-sky-700",
};

async function getTreatments() {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("treatments")
    .select("slug, title, category, is_active, tagline, price_from, duration, downtime")
    .order("category")
    .order("title");

  if (error || !data) return [];

  return data.map((t) => ({
    ...t,
    title: t.title ?? JSON_TITLES[t.slug] ?? t.slug,
    tagline: t.tagline || JSON_TAGLINES[t.slug] || "",
  }));
}

export default async function AdminTreatmentsPage() {
  const treatments = await getTreatments();

  // Category summary counts
  const byCat = treatments.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1917] mb-1">Treatments</h1>
        <p className="text-sm text-[#6B6966]">
          Toggle visibility, update pricing, edit treatment details, and upload grid card images for the
          homepage and /treatments page.
        </p>
      </div>

      {/* Category summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["face", "skin", "body-wellness"] as const).map((cat) => (
          <div key={cat} className="bg-white border border-[#E5E4E0] px-5 py-4">
            <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2 py-0.5 mb-2 ${CATEGORY_COLORS[cat]}`}>
              {CATEGORY_LABELS[cat]}
            </span>
            <p className="text-2xl font-bold text-[#1A1917]">{byCat[cat] ?? 0}</p>
            <p className="text-xs text-[#6B6966]">treatments</p>
          </div>
        ))}
      </div>

      {treatments.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-800">No treatments found in database.</p>
            <p className="text-xs text-amber-700 mt-0.5">Click &ldquo;Sync from JSON&rdquo; to populate the database from the built-in treatment data.</p>
          </div>
          <SeedTreatmentsButton />
        </div>
      )}

      <TreatmentsClient treatments={treatments} />
    </main>
  );
}

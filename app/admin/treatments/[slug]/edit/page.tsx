import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import treatmentsData from "@/lib/data/treatments.json";
import EditTreatmentClient from "./EditTreatmentClient";
import {
  mergePricingBreakdown,
  pricingBreakdownFromJson,
} from "@/lib/treatment-pricing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getTreatment(slug: string) {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("treatments")
    .select(`
      slug, title, category, is_active, tagline, price_from, duration, downtime,
      meta_title, meta_description, meta_keywords, og_image,
      hero_text, what_is, expected_results, downtime_detail, how_works, suitable_for, faqs,
      pricing_breakdown
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

const CATEGORY_LABELS: Record<string, string> = {
  face: "Face",
  skin: "Skin",
  "body-wellness": "Body & Wellness",
};

export default async function EditTreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonFallback = (treatmentsData as any[]).find((t) => t.slug === slug) ?? null;
  const jsonPricing = pricingBreakdownFromJson(jsonFallback);
  const mergedPricing = mergePricingBreakdown(treatment.pricing_breakdown, jsonPricing);

  // Computed SEO defaults — shown as placeholder values the editor can override
  const displayTitle = treatment.title ?? jsonFallback?.title ?? slug;
  const seoDefaults = {
    metaTitle: `${displayTitle} in Durban North | Star Aesthetic Centre`,
    metaDescription: `${displayTitle} at Star Aesthetic Centre, Durban North. ${
      ((jsonFallback?.quickSummary ?? jsonFallback?.tagline ?? "") as string)
        .replace(/\*\*/g, "").slice(0, 130)
    } Book a consultation today.`,
    metaKeywords: [
      `${displayTitle} Durban`,
      `${displayTitle} Durban North`,
      `${displayTitle.toLowerCase()} KZN`,
      "Dr Rajeev Bangalee",
      "Star Aesthetic Centre Durban",
    ].join(", "),
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B6966] mb-6">
        <Link href="/admin/treatments" className="hover:text-[#0F2647] transition-colors">
          ← Treatments
        </Link>
        <span>/</span>
        <span className="text-[#1A1917]">{treatment.title}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">
            {CATEGORY_LABELS[treatment.category] ?? treatment.category}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 ${
            treatment.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}>
            {treatment.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1917]">{treatment.title}</h1>
        <p className="text-xs text-[#939EBA] mt-1 font-mono">
          /treatments/{treatment.category}/{treatment.slug}
        </p>
      </div>

      <EditTreatmentClient
        treatment={treatment}
        jsonFallback={jsonFallback}
        seoDefaults={seoDefaults}
        initialPricingSections={mergedPricing?.sections ?? []}
        initialPricingNotes={mergedPricing?.notes?.join("\n") ?? ""}
      />
    </main>
  );
}

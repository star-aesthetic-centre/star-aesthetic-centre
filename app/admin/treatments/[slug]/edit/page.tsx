import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditTreatmentClient from "./EditTreatmentClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getTreatment(slug: string) {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("treatments")
    .select("slug, title, category, is_active, tagline, price_from, duration, downtime")
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
        <p className="text-xs text-[#939EBA] mt-1 font-mono">slug: {treatment.slug}</p>
      </div>

      <EditTreatmentClient treatment={treatment} />
    </main>
  );
}

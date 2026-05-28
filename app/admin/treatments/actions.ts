"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import treatmentsJson from "@/lib/data/treatments.json";
import { TREATMENT_SLUG_TO_CATEGORY as SLUG_TO_CATEGORY } from "@/lib/treatment-routes";

export async function seedTreatmentsFromJson(): Promise<{ success: boolean; count?: number; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const rows = (treatmentsJson as { slug: string; title: string; tagline: string; priceFrom: string; duration: string; downtime: string }[]).map((t) => ({
      slug:       t.slug,
      title:      t.title,
      tagline:    t.tagline ?? "",
      category:   SLUG_TO_CATEGORY[t.slug] ?? "skin",
      price_from: t.priceFrom ?? null,
      duration:   t.duration ?? null,
      downtime:   t.downtime ?? null,
      is_active:  true,
    }));

    const { error } = await supabase.from("treatments").upsert(rows, { onConflict: "slug" });
    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/treatments");
    revalidatePath("/treatments");
    return { success: true, count: rows.length };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function toggleTreatmentActive(
  slug: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("treatments")
      .update({ is_active: isActive })
      .eq("slug", slug);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/treatments");
    revalidatePath("/treatments");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

type TreatmentUpdateData = {
  title?: string;
  tagline?: string | null;
  price_from?: string | null;
  duration?: string | null;
  downtime?: string | null;
  is_active?: boolean;
  // SEO
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
  // Content
  hero_text?: string | null;
  what_is?: string | null;
  expected_results?: string | null;
  how_works?: string[] | null;
  suitable_for?: string[] | null;
  faqs?: { question: string; answer: string }[] | null;
};

export async function updateTreatmentMeta(
  slug: string,
  data: TreatmentUpdateData
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("treatments")
      .update(data)
      .eq("slug", slug);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/treatments");
    revalidatePath(`/admin/treatments/${slug}/edit`);
    revalidatePath("/treatments");
    revalidatePath(`/treatments/face/${slug}`);
    revalidatePath(`/treatments/skin/${slug}`);
    revalidatePath(`/treatments/body-wellness/${slug}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

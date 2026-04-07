"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

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

export async function updateTreatmentMeta(
  slug: string,
  data: {
    tagline?: string;
    price_from?: string;
    duration?: string;
    downtime?: string;
    is_active?: boolean;
  }
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
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

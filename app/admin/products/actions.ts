"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { suggestFunnelConfig } from "@/lib/funnel-suggestions";
import { updateAdminProduct } from "@/lib/queries/admin-products";

export async function toggleProductActive(
  productId: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("products")
      .update({ is_active: isActive })
      .eq("id", productId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function updateProductPrice(
  productId: string,
  priceCents: number
): Promise<{ success: boolean; error?: string }> {
  if (priceCents < 0 || priceCents > 10_000_00) {
    return { success: false, error: "Price out of range" };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("products")
      .update({ price_cents: priceCents })
      .eq("id", productId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function updateProductStock(
  productId: string,
  stockQuantity: number | null
): Promise<{ success: boolean; error?: string }> {
  if (stockQuantity !== null && (stockQuantity < 0 || stockQuantity > 99999)) {
    return { success: false, error: "Stock quantity out of range" };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("products")
      .update({ stock_quantity: stockQuantity })
      .eq("id", productId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function updateProductShortDescription(
  productId: string,
  shortDescription: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("products")
      .update({ short_description: shortDescription })
      .eq("id", productId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

/** Pre-fill funnel steps from brand routine order; leaves funnel disabled until you turn it on. */
export async function suggestFunnelForProduct(productId: string): Promise<{
  success: boolean;
  config?: unknown;
  rationale?: string;
  error?: string;
}> {
  try {
    const supabase = createSupabaseAdmin();

    const { data: source, error: sourceErr } = await supabase
      .from("products")
      .select(
        "id, name, slug, brand_slug, subcategory, subcategory_sort, short_description, is_active"
      )
      .eq("id", productId)
      .single();

    if (sourceErr || !source) {
      return { success: false, error: sourceErr?.message ?? "Product not found" };
    }

    const { data: catalog, error: catalogErr } = await supabase
      .from("products")
      .select(
        "id, name, slug, brand_slug, subcategory, subcategory_sort, short_description, is_active"
      )
      .eq("is_active", true);

    if (catalogErr) {
      return { success: false, error: catalogErr.message };
    }

    let coPurchasedIds: string[] | undefined;
    const { data: tpr } = await supabase
      .from("treatment_product_recommendations")
      .select("treatment_slug, product_id")
      .eq("product_id", productId);

    if (tpr?.length) {
      const slugs = [...new Set(tpr.map((r) => r.treatment_slug))];
      const { data: siblings } = await supabase
        .from("treatment_product_recommendations")
        .select("product_id, sort_order, is_essential")
        .in("treatment_slug", slugs)
        .neq("product_id", productId)
        .order("is_essential", { ascending: false })
        .order("sort_order", { ascending: true });

      coPurchasedIds = [...new Set((siblings ?? []).map((s) => s.product_id))];
    }

    const result = suggestFunnelConfig(source, catalog ?? [], coPurchasedIds);
    if (!result) {
      return {
        success: false,
        error:
          "No complementary product found in this brand. Pick offers manually or add subcategory_sort in Supabase.",
      };
    }

    return {
      success: true,
      config: result.config,
      rationale: [
        result.rationale,
        result.step1ProductName && `Step 1: ${result.step1ProductName}`,
        result.step2ProductName && `Step 2: ${result.step2ProductName}`,
      ]
        .filter(Boolean)
        .join(" · "),
    };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function updateFullProduct(
  productId: string,
  data: {
    price_cents?: number;
    stock_quantity?: number | null;
    short_description?: string;
    description?: string;
    is_active?: boolean;
    funnel_config?: unknown;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await updateAdminProduct(productId, data);
    if (!result.success) return result;

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath("/shop");
    revalidatePath("/buy", "layout");
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

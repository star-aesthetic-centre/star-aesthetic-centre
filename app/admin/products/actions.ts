"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { suggestFunnelConfig } from "@/lib/funnel-suggestions";
import { updateAdminProduct } from "@/lib/queries/admin-products";
import { toSlug } from "@/lib/utils";

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

/**
 * Rename a product: updates name and (if it changed) the slug.
 * The old slug is pushed into former_slugs[] so existing URLs 301-redirect.
 * Requires: ALTER TABLE products ADD COLUMN IF NOT EXISTS former_slugs text[] DEFAULT '{}';
 */
export async function renameProduct(
  productId: string,
  newName: string,
  currentSlug: string
): Promise<{ success: boolean; newSlug?: string; error?: string }> {
  const trimmedName = newName.trim();
  if (!trimmedName) return { success: false, error: "Name cannot be empty" };

  const newSlug = toSlug(trimmedName);
  if (!newSlug) return { success: false, error: "Could not generate a valid slug from that name" };

  try {
    const supabase = createSupabaseAdmin();
    const slugChanged = newSlug !== currentSlug;

    // Check slug uniqueness if it changed
    if (slugChanged) {
      const { data: existing } = await supabase
        .from("products")
        .select("id")
        .eq("slug", newSlug)
        .neq("id", productId)
        .limit(1)
        .single();
      if (existing) {
        return { success: false, error: `Slug "${newSlug}" is already used by another product` };
      }
    }

    const updatePayload: Record<string, unknown> = { name: trimmedName };

    if (slugChanged) {
      updatePayload.slug = newSlug;
      // Append old slug to former_slugs (Postgres array append via RPC or raw update)
      // We use a raw Supabase query with array_append
      const { error: appendErr } = await supabase.rpc("append_former_slug", {
        product_id: productId,
        old_slug: currentSlug,
      });

      // If the RPC doesn't exist yet (migration not run), fall back silently —
      // the rename still works, just without the redirect alias.
      if (appendErr && !appendErr.message.includes("does not exist")) {
        console.error("append_former_slug RPC error:", appendErr.message);
      }
    }

    const { error } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", productId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath("/shop");
    if (slugChanged) {
      revalidatePath(`/shop/products/${currentSlug}`);
      revalidatePath(`/shop/products/${newSlug}`);
    }

    return { success: true, newSlug: slugChanged ? newSlug : currentSlug };
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

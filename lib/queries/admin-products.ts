import { createSupabaseAdmin } from "@/lib/supabase-admin";

const ADMIN_PRODUCT_SELECT =
  "id, brand_slug, name, slug, sku, short_description, description, price_cents, is_active, subcategory, stock_quantity";

export type AdminProductRow = {
  id: string;
  brand_slug: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  price_cents: number | null;
  is_active: boolean;
  subcategory: string | null;
  stock_quantity: number | null;
  funnel_config?: unknown;
};

/** Postgres 42703 or Supabase PostgREST "schema cache" when column not migrated. */
function isMissingColumnError(error: { code?: string; message?: string } | null, column: string) {
  if (!error?.message) return false;
  const msg = error.message.toLowerCase();
  const col = column.toLowerCase();
  if (!msg.includes(col)) return false;
  return (
    error.code === "42703" ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("could not find")
  );
}

let funnelConfigColumnAvailable: boolean | null = null;

async function hasFunnelConfigColumn(
  supabase: ReturnType<typeof createSupabaseAdmin>
): Promise<boolean> {
  if (funnelConfigColumnAvailable !== null) return funnelConfigColumnAvailable;

  const { error } = await supabase.from("products").select("funnel_config").limit(1);
  funnelConfigColumnAvailable = !error || !isMissingColumnError(error, "funnel_config");
  return funnelConfigColumnAvailable;
}

/** Load a product for the admin edit screen (funnel_config optional until migration). */
export async function getAdminProductById(id: string): Promise<AdminProductRow | null> {
  const supabase = createSupabaseAdmin();
  const withFunnel = await hasFunnelConfigColumn(supabase);

  if (withFunnel) {
    const { data, error } = await supabase
      .from("products")
      .select(`${ADMIN_PRODUCT_SELECT}, funnel_config`)
      .eq("id", id)
      .single();
    if (error || !data) {
      console.error("getAdminProductById:", error);
      return null;
    }
    return data as AdminProductRow;
  }

  const { data, error } = await supabase
    .from("products")
    .select(ADMIN_PRODUCT_SELECT)
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getAdminProductById:", error);
    return null;
  }

  return { ...(data as Omit<AdminProductRow, "funnel_config">), funnel_config: null };
}

/** Persist product updates; omits funnel_config if column not migrated yet. */
export async function updateAdminProduct(
  productId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createSupabaseAdmin();
  const withFunnel = await hasFunnelConfigColumn(supabase);

  const payload = { ...data };
  if (!withFunnel && "funnel_config" in payload) {
    delete payload.funnel_config;
  }

  const { error } = await supabase.from("products").update(payload).eq("id", productId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Whether upsell funnel can be saved (requires SQL migration). */
export async function isFunnelConfigEnabled(): Promise<boolean> {
  return hasFunnelConfigColumn(createSupabaseAdmin());
}

import { createSupabaseAdmin } from "@/lib/supabase-admin";
import type { CartItem } from "@/lib/cart-context";
import { normalizeZaPhone } from "@/lib/utils/phone";
import { randToCents } from "@/lib/utils/orders";

export type AbandonedCheckoutRow = {
  id: string;
  recovery_token: string;
  email: string;
  phone: string;
  first_name: string | null;
  last_name: string | null;
  cart_items: CartItem[];
  subtotal_cents: number;
  status: string;
  whatsapp_sent_at: string | null;
  email_sent_at: string | null;
  last_activity_at: string;
};

function subtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + randToCents(i.price) * i.quantity, 0);
}

export async function upsertAbandonedCheckout(input: {
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  items: CartItem[];
}): Promise<{ success: boolean; recoveryToken?: string; error?: string }> {
  const email = input.email.trim().toLowerCase();
  const phone = normalizeZaPhone(input.phone);

  if (!email.includes("@") || !phone) {
    return { success: false, error: "Valid email and phone required" };
  }
  if (!input.items.length) {
    return { success: false, error: "Cart is empty" };
  }

  try {
    const supabase = createSupabaseAdmin();
    const cents = subtotalCents(input.items);

    const { data: existing } = await supabase
      .from("abandoned_checkouts")
      .select("id, recovery_token, status")
      .eq("email", email)
      .eq("status", "active")
      .maybeSingle();

    const payload = {
      email,
      phone,
      first_name: input.firstName?.trim() || null,
      last_name: input.lastName?.trim() || null,
      cart_items: input.items,
      subtotal_cents: cents,
      last_activity_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existing?.recovery_token) {
      const { error } = await supabase
        .from("abandoned_checkouts")
        .update(payload)
        .eq("id", existing.id);

      if (error) return { success: false, error: error.message };
      return { success: true, recoveryToken: existing.recovery_token };
    }

    const { data, error } = await supabase
      .from("abandoned_checkouts")
      .insert({ ...payload, status: "active" })
      .select("recovery_token")
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, recoveryToken: data.recovery_token };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function getAbandonedCheckoutByToken(
  token: string
): Promise<AbandonedCheckoutRow | null> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("abandoned_checkouts")
      .select("*")
      .eq("recovery_token", token)
      .eq("status", "active")
      .maybeSingle();

    if (error || !data) return null;
    return data as AbandonedCheckoutRow;
  } catch {
    return null;
  }
}

export async function markAbandonedCheckoutConverted(
  email: string,
  phone: string
): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = normalizeZaPhone(phone);
  if (!normalizedEmail) return;

  try {
    const supabase = createSupabaseAdmin();
    const patch = {
      status: "converted",
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("abandoned_checkouts")
      .update(patch)
      .eq("status", "active")
      .eq("email", normalizedEmail);

    if (normalizedPhone) {
      await supabase
        .from("abandoned_checkouts")
        .update(patch)
        .eq("status", "active")
        .eq("phone", normalizedPhone);
    }
  } catch (err) {
    console.warn("[abandoned-checkout] mark converted:", err);
  }
}

export async function listAbandonedCheckoutsForReminder(opts: {
  inactiveMinutes: number;
  limit?: number;
}): Promise<AbandonedCheckoutRow[]> {
  const supabase = createSupabaseAdmin();
  const cutoff = new Date(Date.now() - opts.inactiveMinutes * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("abandoned_checkouts")
    .select("*")
    .eq("status", "active")
    .lt("last_activity_at", cutoff)
    .is("whatsapp_sent_at", null)
    .is("email_sent_at", null)
    .gt("subtotal_cents", 0)
    .order("last_activity_at", { ascending: true })
    .limit(opts.limit ?? 20);

  if (error) {
    console.error("[abandoned-checkout] list:", error.message);
    return [];
  }

  return (data ?? []) as AbandonedCheckoutRow[];
}

export async function markAbandonedReminderSent(
  id: string,
  channel: "whatsapp" | "email"
): Promise<void> {
  const supabase = createSupabaseAdmin();
  const patch =
    channel === "whatsapp"
      ? { whatsapp_sent_at: new Date().toISOString() }
      : { email_sent_at: new Date().toISOString() };

  await supabase.from("abandoned_checkouts").update(patch).eq("id", id);
}

import { createSupabaseAdmin } from "@/lib/supabase-admin";
import type { CustomerSummary } from "@/lib/crm/types";

const REVENUE_STATUSES = new Set(["paid", "processing", "shipped", "delivered"]);

export async function listCustomers(): Promise<{
  customers: CustomerSummary[];
  error?: string;
}> {
  try {
    const supabase = createSupabaseAdmin();
    const map = new Map<string, CustomerSummary>();

    const touch = (email: string) => {
      const key = email.toLowerCase().trim();
      if (!key.includes("@")) return null;
      if (!map.has(key)) {
        map.set(key, {
          email: key,
          firstName: "",
          lastName: "",
          phone: null,
          sources: [],
          orderCount: 0,
          revenueCents: 0,
          pendingOrderCount: 0,
          bookingCount: 0,
          leadCount: 0,
          hasRewards: false,
          rewardsBalanceRands: 0,
          lastActivityAt: null,
        });
      }
      return map.get(key)!;
    };

    const addSource = (c: CustomerSummary, source: string) => {
      if (!c.sources.includes(source)) c.sources.push(source);
    };

    const bumpActivity = (c: CustomerSummary, iso: string | null) => {
      if (!iso) return;
      if (!c.lastActivityAt || iso > c.lastActivityAt) c.lastActivityAt = iso;
    };

    const { data: profiles, error: profilesErr } = await supabase
      .from("customer_profiles")
      .select("email, first_name, last_name, phone, created_at, updated_at");

    if (profilesErr && !profilesErr.message.includes("does not exist")) {
      return { customers: [], error: profilesErr.message };
    }

    for (const row of profiles ?? []) {
      const c = touch(row.email);
      if (!c) continue;
      c.firstName = row.first_name || c.firstName;
      c.lastName = row.last_name || c.lastName;
      c.phone = row.phone || c.phone;
      addSource(c, "Profile");
      bumpActivity(c, row.updated_at ?? row.created_at);
    }

    const { data: loyalty, error: loyaltyErr } = await supabase
      .from("loyalty_accounts")
      .select("email, first_name, last_name, phone, balance_rands, created_at, updated_at");

    if (loyaltyErr && !loyaltyErr.message.includes("does not exist")) {
      return { customers: [], error: loyaltyErr.message };
    }

    for (const row of loyalty ?? []) {
      const c = touch(row.email);
      if (!c) continue;
      c.firstName = row.first_name || c.firstName;
      c.lastName = row.last_name || c.lastName;
      c.phone = row.phone || c.phone;
      c.hasRewards = true;
      c.rewardsBalanceRands = row.balance_rands ?? 0;
      addSource(c, "Star Light Rewards");
      bumpActivity(c, row.updated_at ?? row.created_at);
    }

    const { data: orders, error: ordersErr } = await supabase
      .from("orders")
      .select("customer_email, customer_name, customer_phone, total_cents, status, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (ordersErr) {
      return { customers: [], error: ordersErr.message };
    }

    for (const o of orders ?? []) {
      const c = touch(o.customer_email);
      if (!c) continue;
      c.orderCount++;
      if (REVENUE_STATUSES.has((o.status ?? "").toLowerCase())) {
        c.revenueCents += o.total_cents ?? 0;
      } else if ((o.status ?? "").toLowerCase() === "pending") {
        c.pendingOrderCount++;
      }
      addSource(c, "Shop");
      bumpActivity(c, o.created_at);
      if (!c.firstName && o.customer_name) {
        const parts = o.customer_name.trim().split(/\s+/);
        c.firstName = parts[0] ?? "";
        c.lastName = parts.slice(1).join(" ");
      }
      c.phone = c.phone || o.customer_phone;
    }

    const { data: bookings, error: bookingsErr } = await supabase
      .from("bookings")
      .select("patient_email, patient_name, patient_phone, treatment, treatment_slug, date, status, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (!bookingsErr) {
      for (const b of bookings ?? []) {
        const c = touch(b.patient_email);
        if (!c) continue;
        c.bookingCount++;
        addSource(c, "Booking");
        bumpActivity(c, b.created_at ?? b.date);
        if (!c.firstName && b.patient_name) {
          const parts = b.patient_name.trim().split(/\s+/);
          c.firstName = parts[0] ?? "";
          c.lastName = parts.slice(1).join(" ");
        }
        c.phone = c.phone || b.patient_phone;
      }
    }

    const { data: leads, error: leadsErr } = await supabase
      .from("leads")
      .select("email, first_name, last_name, phone, created_at")
      .limit(2000);

    if (!leadsErr) {
      for (const l of leads ?? []) {
        const c = touch(l.email);
        if (!c) continue;
        c.leadCount++;
        addSource(c, "Lead");
        bumpActivity(c, l.created_at);
        c.firstName = c.firstName || l.first_name || "";
        c.lastName = c.lastName || l.last_name || "";
        c.phone = c.phone || l.phone;
      }
    }

    const customers = [...map.values()].sort((a, b) => {
      const ta = a.lastActivityAt ?? "";
      const tb = b.lastActivityAt ?? "";
      return tb.localeCompare(ta);
    });

    return { customers };
  } catch (err) {
    return { customers: [], error: String(err) };
  }
}

export async function getCustomerDetail(email: string) {
  const normalized = email.toLowerCase().trim();
  const supabase = createSupabaseAdmin();

  const [loyaltyRes, profileRes, ordersRes, bookingsRes, leadsRes, nikiRes] = await Promise.all([
    supabase.from("loyalty_accounts").select("*").eq("email", normalized).maybeSingle(),
    supabase.from("customer_profiles").select("*").eq("email", normalized).maybeSingle(),
    supabase
      .from("orders")
      .select("id, reference, customer_name, total_cents, status, created_at, order_items(product_name, quantity)")
      .eq("customer_email", normalized)
      .order("created_at", { ascending: false }),
    supabase
      .from("bookings")
      .select("*")
      .eq("patient_email", normalized)
      .order("date", { ascending: false }),
    supabase.from("leads").select("*").eq("email", normalized).order("created_at", { ascending: false }),
    supabase
      .from("niki_sessions")
      .select("id, treatment_page, duration_seconds, started_at, contact_name")
      .eq("contact_email", normalized)
      .order("started_at", { ascending: false })
      .limit(20),
  ]);

  return {
    email: normalized,
    loyalty: loyaltyRes.data,
    profile: profileRes.data,
    orders: ordersRes.data ?? [],
    bookings: bookingsRes.data ?? [],
    leads: leadsRes.data ?? [],
    nikiSessions: nikiRes.data ?? [],
  };
}

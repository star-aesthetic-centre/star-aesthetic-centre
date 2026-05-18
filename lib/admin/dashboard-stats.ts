import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { listCustomers } from "@/lib/crm/customers";
import { formatMonthShort, formatZAR, formatZARDetailed } from "@/lib/admin/format";

/** Orders that count as realised revenue (EFT confirmed or fulfilled). */
const REVENUE_STATUSES = new Set(["paid", "processing", "shipped", "delivered"]);

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  paid: "#3b82f6",
  processing: "#8b5cf6",
  shipped: "#6366f1",
  delivered: "#10b981",
  cancelled: "#ef4444",
  refunded: "#6b7280",
};

export type MonthlyDataPoint = {
  month: string;
  revenue: number;
  orders: number;
};

export type StatusDataPoint = {
  status: string;
  count: number;
  color: string;
};

export type DashboardStats = {
  loadErrors: string[];
  productCount: number;
  activeProductCount: number;
  outOfStockCount: number;
  loyaltyMemberCount: number;
  totalRevenueCents: number;
  revenueOrderCount: number;
  pendingEftCount: number;
  pendingEftCents: number;
  revenueThisMonthCents: number;
  ordersThisMonth: number;
  revenueYtdCents: number;
  avgOrderValueCents: number;
  allOrdersCount: number;
  monthlyData: MonthlyDataPoint[];
  statusData: StatusDataPoint[];
  topProducts: Array<{ name: string; units: number; revenueCents: number }>;
  topCustomers: Array<{ email: string; revenueCents: number; orders: number }>;
  largestOrder: { reference: string; totalCents: number; dateLabel: string } | null;
  abandoned: {
    active: number;
    reminded: number;
    converted: number;
    totalValueCents: number;
    recent: Array<{
      email: string;
      subtotalCents: number;
      lastActivity: string;
      status: string;
    }>;
  };
  niki: {
    totalSessions: number;
    sessionsThisWeek: number;
    withContact: number;
    recent: Array<{
      id: string;
      sessionId: string;
      treatmentPage: string | null;
      contactName: string | null;
      contactPhone: string | null;
      contactEmail: string | null;
      durationSeconds: number;
      startedAt: string;
      transcriptPreview: string;
    }>;
  };
  /** Placeholder until WooCommerce / historical import exists */
  historicalImport: {
    available: boolean;
    orderHistoryCount: number;
    note: string;
  };
  crm: {
    leadCount: number;
    newLeadCount: number;
    customerCount: number;
  };
  revenueLensExplanation: string;
};

function centsToZar(cents: number): number {
  return cents / 100;
}

function isMissingTable(msg: string): boolean {
  const m = msg.toLowerCase();
  return m.includes("does not exist") || m.includes("schema cache") || m.includes("could not find");
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const loadErrors: string[] = [];
  const supabase = createSupabaseAdmin();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let productCount = 0;
  let activeProductCount = 0;
  let outOfStockCount = 0;
  let loyaltyMemberCount = 0;

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, is_active, stock_quantity");

  if (productsError) {
    if (!isMissingTable(productsError.message)) loadErrors.push(`products: ${productsError.message}`);
  } else {
    productCount = products?.length ?? 0;
    activeProductCount = products?.filter((p) => p.is_active).length ?? 0;
    outOfStockCount =
      products?.filter((p) => p.is_active && (p.stock_quantity ?? 0) <= 0).length ?? 0;
  }

  const { count: loyaltyCount, error: loyaltyError } = await supabase
    .from("loyalty_accounts")
    .select("id", { count: "exact", head: true });

  if (!loyaltyError) loyaltyMemberCount = loyaltyCount ?? 0;
  else if (!isMissingTable(loyaltyError.message)) loadErrors.push(`loyalty_accounts: ${loyaltyError.message}`);

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      `
      id,
      reference,
      customer_email,
      customer_name,
      total_cents,
      status,
      created_at,
      order_items ( product_name, quantity, line_total_cents )
    `
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (ordersError) {
    loadErrors.push(`orders: ${ordersError.message}`);
  }

  const orderRows = orders ?? [];
  const allOrdersCount = orderRows.length;

  let totalRevenueCents = 0;
  let revenueOrderCount = 0;
  let pendingEftCount = 0;
  let pendingEftCents = 0;
  let revenueThisMonthCents = 0;
  let ordersThisMonth = 0;
  let revenueYtdCents = 0;
  let largestOrder: DashboardStats["largestOrder"] = null;

  const statusCounts = new Map<string, number>();
  const monthlyBuckets = new Map<string, { revenue: number; orders: number }>();
  const customerMap = new Map<string, { revenueCents: number; orders: number }>();
  const productMap = new Map<string, { units: number; revenueCents: number }>();

  for (const o of orderRows) {
    const status = (o.status ?? "pending").toLowerCase();
    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);

    const created = new Date(o.created_at);
    const totalCents = o.total_cents ?? 0;

    if (status === "pending") {
      pendingEftCount++;
      pendingEftCents += totalCents;
    }

    if (REVENUE_STATUSES.has(status)) {
      totalRevenueCents += totalCents;
      revenueOrderCount++;

      if (created.getFullYear() === year) {
        revenueYtdCents += totalCents;
        if (created.getMonth() === month) {
          revenueThisMonthCents += totalCents;
          ordersThisMonth++;
        }
      }

      const monthKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
      const bucket = monthlyBuckets.get(monthKey) ?? { revenue: 0, orders: 0 };
      bucket.revenue += centsToZar(totalCents);
      bucket.orders++;
      monthlyBuckets.set(monthKey, bucket);

      const email = (o.customer_email ?? "").toLowerCase();
      if (email) {
        const c = customerMap.get(email) ?? { revenueCents: 0, orders: 0 };
        c.revenueCents += totalCents;
        c.orders++;
        customerMap.set(email, c);
      }

      if (!largestOrder || totalCents > largestOrder.totalCents) {
        largestOrder = {
          reference: o.reference,
          totalCents,
          dateLabel: created.toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };
      }

      for (const item of o.order_items ?? []) {
        const name = item.product_name ?? "Unknown";
        const p = productMap.get(name) ?? { units: 0, revenueCents: 0 };
        p.units += item.quantity ?? 0;
        p.revenueCents += item.line_total_cents ?? 0;
        productMap.set(name, p);
      }
    }
  }

  const monthlyData: MonthlyDataPoint[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(year, month - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = monthlyBuckets.get(key) ?? { revenue: 0, orders: 0 };
    monthlyData.push({
      month: formatMonthShort(d),
      revenue: bucket.revenue,
      orders: bucket.orders,
    });
  }

  const statusData: StatusDataPoint[] = [...statusCounts.entries()]
    .map(([status, count]) => ({
      status,
      count,
      color: STATUS_COLORS[status] ?? "#94a3b8",
    }))
    .sort((a, b) => b.count - a.count);

  const topProducts = [...productMap.entries()]
    .map(([name, v]) => ({ name, units: v.units, revenueCents: v.revenueCents }))
    .sort((a, b) => b.revenueCents - a.revenueCents)
    .slice(0, 5);

  const topCustomers = [...customerMap.entries()]
    .map(([email, v]) => ({ email, revenueCents: v.revenueCents, orders: v.orders }))
    .sort((a, b) => b.revenueCents - a.revenueCents)
    .slice(0, 5);

  const avgOrderValueCents =
    revenueOrderCount > 0 ? Math.round(totalRevenueCents / revenueOrderCount) : 0;

  // Abandoned checkouts
  let abandoned: DashboardStats["abandoned"] = {
    active: 0,
    reminded: 0,
    converted: 0,
    totalValueCents: 0,
    recent: [],
  };

  const { data: abandonedRows, error: abandonedError } = await supabase
    .from("abandoned_checkouts")
    .select("email, subtotal_cents, status, last_activity_at, whatsapp_sent_at, email_sent_at")
    .order("last_activity_at", { ascending: false })
    .limit(100);

  if (abandonedError) {
    if (!isMissingTable(abandonedError.message)) loadErrors.push(`abandoned_checkouts: ${abandonedError.message}`);
  } else {
    for (const row of abandonedRows ?? []) {
      if (row.status === "active") {
        abandoned.active++;
        abandoned.totalValueCents += row.subtotal_cents ?? 0;
      } else if (row.status === "converted") {
        abandoned.converted++;
      }
      if (row.whatsapp_sent_at || row.email_sent_at) abandoned.reminded++;
    }
    abandoned.recent = (abandonedRows ?? [])
      .filter((r) => r.status === "active")
      .slice(0, 5)
      .map((r) => ({
        email: r.email,
        subtotalCents: r.subtotal_cents ?? 0,
        lastActivity: new Date(r.last_activity_at).toLocaleString("en-ZA", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: r.status,
      }));
  }

  // Niki sessions
  let niki: DashboardStats["niki"] = {
    totalSessions: 0,
    sessionsThisWeek: 0,
    withContact: 0,
    recent: [],
  };

  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { count: nikiTotal, error: nikiCountError } = await supabase
    .from("niki_sessions")
    .select("id", { count: "exact", head: true });

  const { data: nikiRows, error: nikiError } = await supabase
    .from("niki_sessions")
    .select(
      "id, session_id, treatment_page, transcript, contact_name, contact_phone, contact_email, duration_seconds, started_at, created_at"
    )
    .order("started_at", { ascending: false })
    .limit(50);

  if (nikiError || nikiCountError) {
    const msg = nikiError?.message ?? nikiCountError?.message ?? "";
    if (msg && !isMissingTable(msg)) loadErrors.push(`niki_sessions: ${msg}`);
  } else {
    niki.totalSessions = nikiTotal ?? 0;

    const { count: weekCount } = await supabase
      .from("niki_sessions")
      .select("id", { count: "exact", head: true })
      .gte("started_at", weekAgo);

    niki.sessionsThisWeek = weekCount ?? 0;

    const { count: contactCount } = await supabase
      .from("niki_sessions")
      .select("id", { count: "exact", head: true })
      .or("contact_email.not.is.null,contact_phone.not.is.null,contact_name.not.is.null");

    niki.withContact = contactCount ?? 0;

    niki.recent = (nikiRows ?? []).slice(0, 5).map((row) => ({
      id: row.id,
      sessionId: row.session_id,
      treatmentPage: row.treatment_page,
      contactName: row.contact_name,
      contactPhone: row.contact_phone,
      contactEmail: row.contact_email,
      durationSeconds: row.duration_seconds ?? 0,
      startedAt: row.started_at ?? row.created_at ?? "",
      transcriptPreview: (row.transcript ?? "").slice(0, 160),
    }));
  }

  const { count: historyCount, error: historyError } = await supabase
    .from("order_history")
    .select("id", { count: "exact", head: true });

  const historicalAvailable = !historyError && (historyCount ?? 0) > 0;

  let leadCount = 0;
  let newLeadCount = 0;
  const { count: totalLeads, error: leadsCountErr } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });
  if (!leadsCountErr) leadCount = totalLeads ?? 0;

  const { count: newLeads } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");
  if (!leadsCountErr) newLeadCount = newLeads ?? 0;

  const { customers: customerList } = await listCustomers();

  return {
    loadErrors,
    productCount,
    activeProductCount,
    outOfStockCount,
    loyaltyMemberCount,
    totalRevenueCents,
    revenueOrderCount,
    pendingEftCount,
    pendingEftCents,
    revenueThisMonthCents,
    ordersThisMonth,
    revenueYtdCents,
    avgOrderValueCents,
    allOrdersCount,
    monthlyData,
    statusData,
    topProducts,
    topCustomers,
    largestOrder,
    abandoned,
    niki,
    historicalImport: {
      available: historicalAvailable,
      orderHistoryCount: historyCount ?? 0,
      note: historicalAvailable
        ? `${historyCount} historical orders imported.`
        : "No imported sale history yet — live shop orders only. Import can be added when legacy WooCommerce data is ready.",
    },
    crm: {
      leadCount,
      newLeadCount,
      customerCount: customerList.length,
    },
    revenueLensExplanation:
      "Revenue includes orders marked Paid, Processing, Shipped, or Delivered (EFT confirmed or fulfilled). Pending = checkout placed, awaiting EFT. Cancelled and refunded orders are excluded.",
  };
}


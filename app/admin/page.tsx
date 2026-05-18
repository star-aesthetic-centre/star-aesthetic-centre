export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Clock,
  ShoppingBag,
  Mic,
  Target,
  AlertCircle,
  Mail,
} from "lucide-react";
import KPICard from "@/components/admin/KPICard";
import MonthlyRevenueChart from "@/components/admin/charts/MonthlyRevenueChart";
import OrderStatusChart from "@/components/admin/charts/OrderStatusChart";
import { getDashboardStats } from "@/lib/admin/dashboard-stats";
import { formatZAR, formatZARDetailed } from "@/lib/admin/format";
import { formatNumber } from "@/lib/admin/format";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const abandonedRecoveryRate =
    stats.abandoned.converted + stats.abandoned.active > 0
      ? Math.round(
          (stats.abandoned.converted / (stats.abandoned.converted + stats.abandoned.active)) * 100
        )
      : 0;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0F2647]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#6B6966]">
            Star Aesthetic Centre — shop, checkout, and Niki at a glance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 bg-[#0F2647] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1B3D6E]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            View orders
          </Link>
          <Link
            href="/admin/niki"
            className="inline-flex items-center gap-2 border border-[#E5E4E0] bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0F2647] hover:border-[#939EBA]"
          >
            <Mic className="h-3.5 w-3.5" />
            Niki transcripts
          </Link>
        </div>
      </div>

      <div className="mb-6 border border-[#939EBA]/30 bg-[#EEF0F6] px-4 py-3 text-sm text-[#1A1917] leading-relaxed">
        <p className="font-semibold text-[#0F2647] mb-1">How revenue is counted</p>
        <p>{stats.revenueLensExplanation}</p>
        <p className="mt-2 text-xs text-[#6B6966]">{stats.historicalImport.note}</p>
      </div>

      {stats.loadErrors.length > 0 && (
        <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          <p className="font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Some data could not be loaded
          </p>
          <ul className="mt-2 list-disc pl-5 text-xs space-y-1">
            {stats.loadErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 border border-[#E5E4E0] bg-white px-4 py-3 text-xs text-[#6B6966]">
        <span className="font-bold uppercase tracking-wider text-[#939EBA]">Snapshot</span>
        <span>
          <strong className="text-[#1A1917]">{formatNumber(stats.allOrdersCount)}</strong> live orders
        </span>
        <span>
          <strong className="text-[#1A1917]">{formatNumber(stats.revenueOrderCount)}</strong> revenue-eligible
        </span>
        <span>
          <strong className="text-[#1A1917]">{formatNumber(stats.loyaltyMemberCount)}</strong> rewards members
        </span>
        {stats.historicalImport.available && (
          <span>
            <strong className="text-[#1A1917]">{formatNumber(stats.historicalImport.orderHistoryCount)}</strong>{" "}
            imported history rows
          </span>
        )}
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KPICard
          label="Total revenue"
          value={formatZAR(stats.totalRevenueCents / 100)}
          sub={`${stats.revenueOrderCount} paid orders`}
          icon={Wallet}
          href="/admin/orders"
          accent="bg-[#0F2647]"
        />
        <KPICard
          label="Revenue this month"
          value={formatZAR(stats.revenueThisMonthCents / 100)}
          sub={`${stats.ordersThisMonth} orders`}
          icon={TrendingUp}
          accent="bg-emerald-600"
        />
        <KPICard
          label="Awaiting EFT"
          value={formatZAR(stats.pendingEftCents / 100)}
          sub={`${stats.pendingEftCount} pending payment`}
          icon={Clock}
          href="/admin/orders"
          accent="bg-amber-500"
        />
        <KPICard
          label="Avg order value"
          value={formatZAR(stats.avgOrderValueCents / 100)}
          icon={Target}
          accent="bg-[#939EBA]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          label="YTD revenue"
          value={formatZAR(stats.revenueYtdCents / 100)}
          icon={TrendingUp}
          accent="bg-[#1B3D6E]"
        />
        <KPICard
          label="Active products"
          value={formatNumber(stats.activeProductCount)}
          sub={`${stats.productCount} total in catalogue`}
          icon={Package}
          href="/admin/products"
        />
        <KPICard
          label="Out of stock"
          value={formatNumber(stats.outOfStockCount)}
          icon={AlertTriangle}
          accent={stats.outOfStockCount > 0 ? "bg-red-500" : "bg-gray-400"}
          href="/admin/products"
        />
        <KPICard
          label="Star Light members"
          value={formatNumber(stats.loyaltyMemberCount)}
          icon={Users}
          href="/admin/rewards"
          accent="bg-[#C8A882]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <KPICard
          label="CRM customers"
          value={formatNumber(stats.crm.customerCount)}
          sub="unified by email"
          icon={Users}
          href="/admin/customers"
        />
        <KPICard
          label="Leads"
          value={formatNumber(stats.crm.leadCount)}
          sub={`${stats.crm.newLeadCount} new`}
          icon={Mail}
          href="/admin/leads"
        />
        <KPICard
          label="Import enquiries"
          value="CSV"
          sub="Admin → Leads"
          icon={Target}
          href="/admin/leads"
          accent="bg-[#636374]"
        />
      </div>

      {/* Abandoned carts + Niki */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="bg-white border border-[#E5E4E0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-amber-500" />
              Abandoned checkouts
            </h2>
            <span className="text-xs text-[#6B6966]">{abandonedRecoveryRate}% recovered</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-amber-200 bg-amber-50 p-3 text-center">
              <p className="text-xl font-bold text-amber-800">{stats.abandoned.active}</p>
              <p className="text-[10px] uppercase tracking-wider text-amber-700">Active</p>
            </div>
            <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-3 text-center">
              <p className="text-xl font-bold text-[#1A1917]">{stats.abandoned.reminded}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#6B6966]">Reminded</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-xl font-bold text-emerald-800">{stats.abandoned.converted}</p>
              <p className="text-[10px] uppercase tracking-wider text-emerald-700">Recovered</p>
            </div>
          </div>
          <p className="text-xs text-[#6B6966] mb-4">
            Pipeline value (active):{" "}
            <strong className="text-[#1A1917]">{formatZAR(stats.abandoned.totalValueCents / 100)}</strong>
          </p>
          {stats.abandoned.recent.length === 0 ? (
            <p className="text-sm text-[#6B6966]">No active abandoned carts.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {stats.abandoned.recent.map((a) => (
                <li
                  key={a.email + a.lastActivity}
                  className="flex justify-between border-b border-[#E5E4E0] pb-2 last:border-0"
                >
                  <span className="text-[#1A1917] truncate max-w-[60%]">{a.email}</span>
                  <span className="text-[#6B6966] tabular-nums shrink-0">
                    {formatZARDetailed(a.subtotalCents)} · {a.lastActivity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white border border-[#E5E4E0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] flex items-center gap-2">
              <Mic className="h-4 w-4 text-[#939EBA]" />
              Niki voice calls
            </h2>
            <Link href="/admin/niki" className="text-xs font-semibold text-[#939EBA] hover:text-[#0F2647]">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-[#E5E4E0] p-3 text-center">
              <p className="text-xl font-bold text-[#1A1917]">{stats.niki.totalSessions}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#6B6966]">Total</p>
            </div>
            <div className="border border-[#E5E4E0] p-3 text-center">
              <p className="text-xl font-bold text-[#1A1917]">{stats.niki.sessionsThisWeek}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#6B6966]">This week</p>
            </div>
            <div className="border border-[#E5E4E0] p-3 text-center">
              <p className="text-xl font-bold text-[#1A1917]">{stats.niki.withContact}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#6B6966]">With contact</p>
            </div>
          </div>
          {stats.niki.recent.length === 0 ? (
            <p className="text-sm text-[#6B6966]">No Niki sessions recorded yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.niki.recent.map((s) => (
                <li key={s.id} className="border border-[#E5E4E0] bg-[#F8F8F7] p-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#1A1917]">
                      {s.contactName || s.contactEmail || "Visitor"}
                    </span>
                    <span className="text-[#6B6966]">{Math.round(s.durationSeconds / 60)}m</span>
                  </div>
                  {s.treatmentPage && (
                    <p className="text-[10px] text-[#939EBA] mb-1 truncate">{s.treatmentPage}</p>
                  )}
                  <p className="text-xs text-[#6B6966] line-clamp-2 italic">
                    {s.transcriptPreview || "(no transcript)"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">
            Monthly revenue (12 months)
          </h2>
          <MonthlyRevenueChart data={stats.monthlyData} />
        </section>
        <section className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">
            Orders by status
          </h2>
          <OrderStatusChart data={stats.statusData} total={stats.allOrdersCount} />
        </section>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">
            Top customers
          </h2>
          {stats.topCustomers.length === 0 ? (
            <p className="text-sm text-[#6B6966]">No revenue-eligible orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.topCustomers.map((c, i) => (
                <li key={c.email} className="flex justify-between text-sm">
                  <span className="text-[#1A1917] truncate max-w-[55%]">
                    {i + 1}. {c.email}
                  </span>
                  <span className="text-[#6B6966] tabular-nums shrink-0">
                    {formatZARDetailed(c.revenueCents)} · {c.orders} orders
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="bg-white border border-[#E5E4E0] p-6">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">
            Top products by revenue
          </h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-[#6B6966]">No product sales yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <li key={p.name} className="flex justify-between text-sm gap-4">
                  <span className="text-[#1A1917] truncate">
                    {i + 1}. {p.name}
                  </span>
                  <span className="text-[#6B6966] tabular-nums shrink-0">
                    {formatZARDetailed(p.revenueCents)} · {p.units} sold
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Highlights + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stats.largestOrder && (
          <section className="bg-[#0F2647] text-white p-6">
            <p className="text-xs uppercase tracking-widest text-[#939EBA] mb-2">Largest order</p>
            <p className="font-heading text-2xl font-bold">{formatZARDetailed(stats.largestOrder.totalCents)}</p>
            <p className="text-sm text-white/70 mt-1">#{stats.largestOrder.reference}</p>
            <p className="text-xs text-white/50 mt-1">{stats.largestOrder.dateLabel}</p>
          </section>
        )}
        <section className="bg-white border border-[#E5E4E0] p-6 lg:col-span-2">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            <Link href="/admin/orders" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Confirm EFT payments
            </Link>
            <Link href="/admin/products" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Manage products
            </Link>
            <Link href="/admin/niki" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Niki transcripts
            </Link>
            <Link href="/admin/customers" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Customers
            </Link>
            <Link href="/admin/leads" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Leads & import
            </Link>
            <Link href="/admin/pages" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Edit site pages
            </Link>
            <Link href="/admin/vouchers" className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]">
              Gift vouchers
            </Link>
            <a
              href="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#E5E4E0] px-3 py-2 hover:border-[#939EBA]"
            >
              View live shop ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

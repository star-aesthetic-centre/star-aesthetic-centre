import Link from "next/link";
import { listCustomers } from "@/lib/crm/customers";
import { formatZARDetailed } from "@/lib/admin/format";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const { customers, error } = await listCustomers();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">Customers</h1>
        <p className="mt-2 text-sm text-[#6B6966]">
          Unified view from shop orders, bookings, Star Light Rewards, and leads — one profile per email.
        </p>
      </div>

      {error && (
        <div className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm">{error}</div>
      )}

      <div className="bg-white border border-[#E5E4E0] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F8F7] text-left text-xs uppercase tracking-wider text-[#6B6966]">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Sources</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Bookings</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Rewards</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email} className="border-t border-[#E5E4E0] hover:bg-[#F8F8F7]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/customers/${encodeURIComponent(c.email)}`}
                    className="font-semibold text-[#0F2647] hover:underline"
                  >
                    {[c.firstName, c.lastName].filter(Boolean).join(" ") || c.email}
                  </Link>
                  <p className="text-xs text-[#6B6966]">{c.email}</p>
                  {c.phone && <p className="text-xs text-[#939EBA]">{c.phone}</p>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {c.sources.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] uppercase tracking-wider bg-[#EEF0F6] text-[#636374] px-1.5 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {c.orderCount}
                  {c.pendingOrderCount > 0 && (
                    <span className="text-xs text-amber-600 block">{c.pendingOrderCount} pending EFT</span>
                  )}
                </td>
                <td className="px-4 py-3 tabular-nums">{c.bookingCount}</td>
                <td className="px-4 py-3 tabular-nums font-semibold">
                  {c.revenueCents > 0 ? formatZARDetailed(c.revenueCents) : "—"}
                </td>
                <td className="px-4 py-3">
                  {c.hasRewards ? (
                    <span className="text-[#C8A882] font-semibold">
                      R {c.rewardsBalanceRands.toLocaleString("en-ZA")}
                    </span>
                  ) : (
                    <span className="text-[#A9A8A4]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="p-8 text-center text-sm text-[#6B6966]">No customers yet.</p>
        )}
      </div>
    </main>
  );
}

"use client";

import type { MonthlyDataPoint } from "@/lib/admin/dashboard-stats";

export default function MonthlyRevenueChart({ data }: { data: MonthlyDataPoint[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => {
          const heightPct = (d.revenue / maxRevenue) * 100;
          return (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1 min-w-0">
              <div className="w-full flex flex-col justify-end h-32">
                <div
                  className="w-full bg-[#939EBA] transition-all"
                  style={{ height: `${Math.max(heightPct, d.revenue > 0 ? 4 : 0)}%` }}
                  title={`${d.month}: R ${d.revenue.toLocaleString("en-ZA")} (${d.orders} orders)`}
                />
              </div>
              <span className="text-[10px] text-[#6B6966] font-medium truncate w-full text-center">
                {d.month}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-[#6B6966] text-center">
        Hover bars for revenue · last 12 months
      </p>
    </div>
  );
}

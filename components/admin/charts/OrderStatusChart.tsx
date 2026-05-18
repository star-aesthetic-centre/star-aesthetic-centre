"use client";

import type { StatusDataPoint } from "@/lib/admin/dashboard-stats";

export default function OrderStatusChart({
  data,
  total,
}: {
  data: StatusDataPoint[];
  total: number;
}) {
  if (total === 0) {
    return <p className="text-sm text-[#6B6966] py-8 text-center">No orders yet.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((s) => {
        const pct = Math.round((s.count / total) * 100);
        return (
          <div key={s.status}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold capitalize text-[#1A1917]">{s.status}</span>
              <span className="text-[#6B6966] tabular-nums">
                {s.count} ({pct}%)
              </span>
            </div>
            <div className="h-2 bg-[#F2F1EF] overflow-hidden">
              <div
                className="h-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: s.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

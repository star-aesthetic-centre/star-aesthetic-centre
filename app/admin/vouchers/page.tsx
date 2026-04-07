"use client";

import { useState, useEffect, useTransition } from "react";

type Voucher = {
  id: string;
  code: string;
  order_reference: string;
  denomination_rands: number;
  balance_rands: number;
  status: string;
  purchaser_name: string;
  purchaser_email: string;
  recipient_name: string;
  recipient_email: string;
  message: string | null;
  theme: string;
  expires_at: string | null;
  activated_at: string | null;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending_payment:   "bg-amber-100 text-amber-800",
  active:            "bg-green-100 text-green-800",
  partially_redeemed:"bg-blue-100 text-blue-800",
  redeemed:          "bg-gray-100 text-gray-600",
  expired:           "bg-red-100 text-red-700",
  cancelled:         "bg-red-100 text-red-700",
};

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activating, setActivating] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/vouchers/admin-list");
      if (res.ok) {
        const data = await res.json();
        setVouchers(data.vouchers ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function activate(orderRef: string) {
    setActivating(orderRef);
    setMsg("");
    try {
      const res = await fetch("/api/vouchers/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_reference: orderRef }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`✓ Voucher activated — sent to ${data.recipient_email}`);
        await load();
      } else {
        setMsg(`✗ ${data.error}`);
      }
    } finally {
      setActivating(null);
    }
  }

  const filtered = filter === "all" ? vouchers : vouchers.filter(v => v.status === filter);
  const pending = vouchers.filter(v => v.status === "pending_payment").length;
  const totalOutstanding = vouchers
    .filter(v => ["active", "partially_redeemed"].includes(v.status))
    .reduce((s, v) => s + v.balance_rands, 0);

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1A1917]">Gift Vouchers</h1>
          <p className="text-sm text-[#6B6966] mt-1">{vouchers.length} total vouchers issued</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Awaiting Payment", value: String(pending), sub: "require activation", urgent: pending > 0 },
            { label: "Outstanding Balance", value: `R ${totalOutstanding.toLocaleString("en-ZA")}`, sub: "active + partial vouchers" },
            { label: "Total Issued", value: String(vouchers.length), sub: "all time" },
          ].map(({ label, value, sub, urgent }) => (
            <div key={label} className={`border p-6 ${urgent ? "bg-amber-50 border-amber-200" : "bg-white border-[#E5E4E0]"}`}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-2">{label}</p>
              <p className={`font-heading text-3xl font-bold ${urgent ? "text-amber-700" : "text-[#1A1917]"}`}>{value}</p>
              <p className="text-xs text-[#6B6966] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {msg && (
          <div className={`px-4 py-3 text-sm font-semibold border ${msg.startsWith("✓") ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-700"}`}>
            {msg}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-1 flex-wrap">
          {["all", "pending_payment", "active", "partially_redeemed", "redeemed", "expired"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${filter === f ? "bg-[#0F2647] text-white" : "bg-white border border-[#E5E4E0] text-[#6B6966] hover:border-[#939EBA]"}`}>
              {f === "all" ? "All" : f.replace(/_/g, " ")}
              {f === "pending_payment" && pending > 0 && (
                <span className="ml-1.5 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pending}</span>
              )}
            </button>
          ))}
        </div>

        {/* Vouchers table */}
        {loading ? (
          <p className="text-sm text-[#6B6966]">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#E5E4E0] p-8 text-center text-sm text-[#6B6966]">
            No vouchers found.
          </div>
        ) : (
          <div className="bg-white border border-[#E5E4E0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
                    {["Reference", "Amount / Balance", "Purchaser", "Recipient", "Status", "Created", "Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6B6966]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E4E0]">
                  {filtered.map((v, i) => (
                    <tr key={v.id} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs font-bold text-[#0F2647]">{v.order_reference}</p>
                        <p className="font-mono text-[10px] text-[#939EBA] mt-0.5">{v.code}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-[#1A1917]">R {v.denomination_rands.toLocaleString("en-ZA")}</p>
                        {v.balance_rands < v.denomination_rands && (
                          <p className="text-xs text-[#939EBA]">Balance: R {v.balance_rands.toLocaleString("en-ZA")}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1A1917] text-xs">{v.purchaser_name}</p>
                        <p className="text-[#6B6966] text-[11px]">{v.purchaser_email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1A1917] text-xs">{v.recipient_name}</p>
                        <p className="text-[#6B6966] text-[11px]">{v.recipient_email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${STATUS_COLORS[v.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {v.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#6B6966]">
                        {new Date(v.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        {v.status === "pending_payment" && (
                          <button
                            onClick={() => activate(v.order_reference)}
                            disabled={activating === v.order_reference}
                            className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 hover:bg-green-800 transition-colors disabled:opacity-60 whitespace-nowrap">
                            {activating === v.order_reference ? "Sending…" : "✓ Activate & Send"}
                          </button>
                        )}
                        {v.status === "active" && (
                          <span className="text-xs text-green-700 font-semibold">Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

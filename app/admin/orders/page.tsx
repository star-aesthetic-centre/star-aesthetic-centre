"use client";

import { useState, useEffect } from "react";
import { formatStarlights } from "@/lib/utils/rewards";

type OrderItem = {
  product_name: string;
  quantity: number;
  line_total_cents: number;
};

type Order = {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  total_cents: number;
  subtotal_cents: number;
  shipping_cents: number;
  status: string;
  notes: string | null;
  created_at: string;
  starlights: number;
  starlights_credited: boolean;
  order_items: OrderItem[];
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
};

function formatZar(cents: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "done">("all");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/admin-list");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function confirmPayment(order: Order) {
    setConfirming(order.id);
    setMsg("");
    try {
      const res = await fetch("/api/orders/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(data.message ?? "✓ Done");
        await load();
      } else {
        setMsg(`✗ ${data.error ?? "Failed"}`);
      }
    } finally {
      setConfirming(null);
    }
  }

  const filtered = orders.filter((o) => {
    if (filter === "pending") return o.status === "pending";
    if (filter === "processing")
      return ["paid", "processing"].includes(o.status) && !o.starlights_credited;
    if (filter === "done")
      return o.starlights_credited || ["shipped", "delivered"].includes(o.status);
    return true;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const awaitingCredit = orders.filter(
    (o) => o.status !== "pending" && o.status !== "cancelled" && !o.starlights_credited && o.starlights > 0
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1A1917]">Shop Orders</h1>
          <p className="text-sm text-[#6B6966] mt-1">
            Confirm EFT payment and credit Starlights in one step
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Awaiting payment",
              value: String(pendingCount),
              sub: "pending EFT",
              urgent: pendingCount > 0,
            },
            {
              label: "Needs Starlights",
              value: String(awaitingCredit),
              sub: "paid but not credited",
              urgent: awaitingCredit > 0,
            },
            { label: "All orders", value: String(orders.length), sub: "last 200" },
          ].map(({ label, value, sub, urgent }) => (
            <div
              key={label}
              className={`border p-6 ${urgent ? "bg-amber-50 border-amber-200" : "bg-white border-[#E5E4E0]"}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-2">{label}</p>
              <p
                className={`font-heading text-3xl font-bold ${urgent ? "text-amber-700" : "text-[#1A1917]"}`}
              >
                {value}
              </p>
              <p className="text-xs text-[#6B6966] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {msg && (
          <div
            className={`px-4 py-3 text-sm font-semibold border ${
              msg.startsWith("✓") || msg.includes("credited")
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {msg}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["pending", "Awaiting payment"],
              ["processing", "Needs credit"],
              ["done", "Completed"],
            ] as const
          ).map(([f, label]) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === f
                  ? "bg-[#0F2647] text-white"
                  : "bg-white border border-[#E5E4E0] text-[#6B6966] hover:border-[#939EBA]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-[#6B6966]">Loading orders…</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#E5E4E0] p-8 text-center text-sm text-[#6B6966]">
            No orders in this view.
          </div>
        ) : (
          <div className="bg-white border border-[#E5E4E0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Order
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Items
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Total
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Starlights
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6B6966]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-b border-[#F2F1EF] hover:bg-[#FAFAF9] align-top">
                      <td className="px-4 py-4">
                        <p className="font-mono text-xs font-bold text-[#0F2647]">{o.reference}</p>
                        <p className="text-[11px] text-[#6B6966] mt-1">{formatDate(o.created_at)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#1A1917]">{o.customer_name}</p>
                        <a
                          href={`mailto:${o.customer_email}`}
                          className="text-[11px] text-[#0F2647] hover:underline block mt-0.5"
                        >
                          {o.customer_email}
                        </a>
                        {o.customer_phone && (
                          <a
                            href={`tel:${o.customer_phone.replace(/\s/g, "")}`}
                            className="text-[11px] text-[#6B6966] hover:text-[#0F2647]"
                          >
                            {o.customer_phone}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-4 text-[#6B6966] max-w-xs">
                        <ul className="space-y-1 text-xs">
                          {(o.order_items ?? []).map((item, i) => (
                            <li key={i}>
                              {item.quantity}× {item.product_name}
                            </li>
                          ))}
                        </ul>
                        {o.notes && (
                          <p className="text-[11px] text-amber-700 mt-2 font-medium">{o.notes}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-[#1A1917] whitespace-nowrap">
                        {formatZar(o.total_cents)}
                      </td>
                      <td className="px-4 py-4">
                        {o.starlights > 0 ? (
                          <div>
                            <p className="text-sm font-bold text-[#C8A882]">
                              {formatStarlights(o.starlights)}
                            </p>
                            {o.starlights_credited ? (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                                Credited
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                                Pending
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-[#6B6966]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            STATUS_COLORS[o.status] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {o.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        {o.status === "cancelled" || o.status === "refunded" ? (
                          <span className="text-xs text-[#6B6966]">—</span>
                        ) : o.starlights_credited ? (
                          <span className="text-xs font-semibold text-green-700">✓ Starlights credited</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => confirmPayment(o)}
                            disabled={confirming === o.id}
                            className="bg-[#0F2647] text-white text-xs font-bold px-3 py-2 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60"
                          >
                            {confirming === o.id
                              ? "Processing…"
                              : o.status === "pending"
                                ? "✓ Confirm payment & credit"
                                : "✓ Credit Starlights"}
                          </button>
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

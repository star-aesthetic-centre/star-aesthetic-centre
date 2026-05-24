"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  CalendarDays,
  Star,
  Gift,
  LogOut,
  ChevronRight,
  Package,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { MemberProfileData } from "@/lib/member/profile-data";
import { THEME_LABELS } from "@/lib/utils/vouchers";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRands(cents: number) {
  return `R ${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtBookingDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  if (s === "confirmed" || s === "active" || s === "paid") {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
        <CheckCircle size={10} /> {status}
      </span>
    );
  }
  if (s === "pending" || s === "pending_payment") {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
        <Clock size={10} /> Pending
      </span>
    );
  }
  if (s === "cancelled" || s === "expired") {
    return (
      <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-red-600">
        <XCircle size={10} /> {status}
      </span>
    );
  }
  if (s === "partially_redeemed") {
    return (
      <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
        <AlertCircle size={10} /> Partial
      </span>
    );
  }
  if (s === "redeemed") {
    return (
      <span className="inline-flex items-center gap-1 bg-[#F7F7F8] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#636374]">
        <CheckCircle size={10} /> Redeemed
      </span>
    );
  }
  return (
    <span className="inline-block bg-[#F7F7F8] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#636374]">
      {status}
    </span>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────

type Tab = "overview" | "orders" | "bookings" | "rewards" | "vouchers" | "enquiries";

const TABS: { id: Tab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "overview",  label: "Overview",   icon: Sparkles },
  { id: "orders",    label: "Orders",     icon: ShoppingBag },
  { id: "bookings",  label: "Bookings",   icon: CalendarDays },
  { id: "rewards",   label: "Rewards",    icon: Star },
  { id: "vouchers",  label: "Vouchers",   icon: Gift },
  { id: "enquiries", label: "Enquiries",  icon: MessageSquare },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function MemberDashboard({ data }: { data: MemberProfileData }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [isPending, startTransition] = useTransition();

  const totalSpentCents = data.orders.reduce((sum, o) => sum + (o.total_cents ?? 0), 0);
  const allVouchers = [...data.vouchersPurchased, ...data.vouchersReceived];

  async function handleLogout() {
    await fetch("/api/member/logout", { method: "POST" });
    startTransition(() => router.push("/member"));
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#0F2647] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA] mb-1">
              Star Aesthetic Centre · Member Account
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {data.firstName}
            </h1>
            <p className="mt-1 text-sm text-[#A8B4CC]">
              {data.email} · Member since {fmtDate(data.memberSince)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:border-white/50 hover:text-white disabled:opacity-50"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      {/* ── Rewards balance strip ─────────────────────────────────────────────── */}
      {data.rewards && (
        <div className="border-b border-[#C8A882]/30 bg-gradient-to-r from-[#1B3D6E] to-[#0F2647]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-[#C8A882]/15">
                <Star size={18} className="text-[#C8A882]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#939EBA]">Star Light Rewards</p>
                <p className="font-heading text-xl font-bold text-[#C8A882]">
                  {data.rewards.balance_rands.toLocaleString("en-ZA")} Star Lights
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="text-xs text-[#939EBA]">
              <span className="text-white font-semibold">{data.rewards.total_earned.toLocaleString("en-ZA")}</span> earned
              <span className="mx-2 text-white/20">·</span>
              <span className="text-white font-semibold">{data.rewards.total_redeemed.toLocaleString("en-ZA")}</span> redeemed
            </div>
            <div className="ml-auto">
              <p className="text-xs text-[#636E85]">1 Star Light = R1 value at checkout</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Tab nav ────────────────────────────────────────────────────────── */}
        <div className="mb-8 flex gap-1 overflow-x-auto border-b border-[#E2E2E6] pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === id
                  ? "border-[#939EBA] text-[#1A1A1F]"
                  : "border-transparent text-[#636374] hover:text-[#1A1A1F]"
              }`}
            >
              <Icon size={14} />
              {label}
              {id === "orders" && data.orders.length > 0 && (
                <span className="ml-1 rounded-full bg-[#939EBA]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#939EBA]">
                  {data.orders.length}
                </span>
              )}
              {id === "bookings" && data.bookings.length > 0 && (
                <span className="ml-1 rounded-full bg-[#939EBA]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#939EBA]">
                  {data.bookings.length}
                </span>
              )}
              {id === "vouchers" && allVouchers.length > 0 && (
                <span className="ml-1 rounded-full bg-[#939EBA]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#939EBA]">
                  {allVouchers.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ───────────────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Total orders", value: data.orders.length.toString(), icon: ShoppingBag, cta: "orders" as Tab },
                { label: "Total spent", value: fmtRands(totalSpentCents), icon: TrendingUp, cta: "orders" as Tab },
                { label: "Bookings", value: data.bookings.length.toString(), icon: CalendarDays, cta: "bookings" as Tab },
                { label: "Star Lights balance", value: (data.rewards?.balance_rands ?? 0).toLocaleString("en-ZA"), icon: Star, cta: "rewards" as Tab },
              ].map(({ label, value, icon: Icon, cta }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTab(cta)}
                  className="group border border-[#E2E2E6] bg-white p-5 text-left transition-all hover:border-[#939EBA]/50 hover:shadow-sm"
                >
                  <Icon size={18} className="mb-3 text-[#939EBA]" />
                  <p className="font-heading text-xl font-bold text-[#1A1A1F]">{value}</p>
                  <p className="mt-0.5 text-xs text-[#636374]">{label}</p>
                </button>
              ))}
            </div>

            {/* Recent orders */}
            {data.orders.length > 0 && (
              <div className="border border-[#E2E2E6] bg-white">
                <div className="flex items-center justify-between border-b border-[#E2E2E6] px-5 py-3">
                  <p className="text-sm font-bold text-[#1A1A1F]">Recent orders</p>
                  <button type="button" onClick={() => setTab("orders")} className="text-xs text-[#939EBA] hover:underline">View all</button>
                </div>
                <div className="divide-y divide-[#E2E2E6]">
                  {data.orders.slice(0, 3).map((o) => (
                    <div key={o.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1A1A1F]">{o.reference}</p>
                        <p className="text-xs text-[#636374]">{fmtDate(o.created_at)} · {o.order_items?.length ?? 0} item{o.order_items?.length !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={o.status} />
                        <p className="text-sm font-bold text-[#1A1A1F]">{fmtRands(o.total_cents)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming bookings */}
            {data.bookings.filter(b => b.status !== "cancelled").length > 0 && (
              <div className="border border-[#E2E2E6] bg-white">
                <div className="flex items-center justify-between border-b border-[#E2E2E6] px-5 py-3">
                  <p className="text-sm font-bold text-[#1A1A1F]">Treatment bookings</p>
                  <button type="button" onClick={() => setTab("bookings")} className="text-xs text-[#939EBA] hover:underline">View all</button>
                </div>
                <div className="divide-y divide-[#E2E2E6]">
                  {data.bookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1F]">{b.treatment}</p>
                        <p className="text-xs text-[#636374]">{fmtBookingDate(b.date)} at {b.time_slot}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick links */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { href: "/shop", icon: ShoppingBag, label: "Browse the shop", sub: "Pharmaceutical-grade skincare" },
                { href: "/treatments", icon: CalendarDays, label: "Book a treatment", sub: "Consultations & procedures" },
                { href: "/gift-vouchers", icon: Gift, label: "Gift vouchers", sub: "Give the gift of wellness" },
              ].map(({ href, icon: Icon, label, sub }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 border border-[#E2E2E6] bg-white p-4 transition-all hover:border-[#939EBA]/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F7F7F8] text-[#939EBA] transition-colors group-hover:bg-[#939EBA]/10">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1A1A1F]">{label}</span>
                    <span className="block text-xs text-[#636374]">{sub}</span>
                  </span>
                  <ChevronRight size={16} className="ml-auto text-[#C0C9DD] group-hover:text-[#939EBA]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ─────────────────────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-[#1A1A1F]">Product orders</h2>
              <Link href="/shop" className="text-sm font-semibold text-[#939EBA] hover:underline">
                Shop now →
              </Link>
            </div>

            {data.orders.length === 0 ? (
              <EmptyState icon={ShoppingBag} title="No orders yet" body="Your product orders will appear here once you've made a purchase.">
                <Link href="/shop" className="mt-4 inline-flex items-center gap-2 bg-[#0F2647] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1B3D6E]">
                  Browse the shop <ChevronRight size={14} />
                </Link>
              </EmptyState>
            ) : (
              <div className="space-y-4">
                {data.orders.map((o) => (
                  <div key={o.id} className="border border-[#E2E2E6] bg-white">
                    {/* Order header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E2E6] bg-[#F7F7F8] px-5 py-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-[#636374]">Order</p>
                          <p className="font-mono text-sm font-bold text-[#1A1A1F]">{o.reference}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#636374]">Date</p>
                          <p className="text-sm font-semibold text-[#1A1A1F]">{fmtDate(o.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#636374]">Total</p>
                          <p className="text-sm font-bold text-[#1A1A1F]">{fmtRands(o.total_cents)}</p>
                        </div>
                      </div>
                      <StatusBadge status={o.status} />
                    </div>

                    {/* Order items */}
                    {o.order_items && o.order_items.length > 0 && (
                      <div className="divide-y divide-[#E2E2E6]">
                        {o.order_items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#F7F7F8]">
                                <Package size={14} className="text-[#939EBA]" />
                              </div>
                              <div>
                                <p className="text-sm text-[#1A1A1F]">{item.product_name}</p>
                                <p className="text-xs text-[#636374]">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm font-semibold text-[#1A1A1F]">{fmtRands(item.line_total_cents)}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Order footer */}
                    <div className="flex items-center justify-between border-t border-[#E2E2E6] px-5 py-2 text-xs text-[#636374]">
                      <span>
                        {o.shipping_cents === 0
                          ? "Free delivery"
                          : `Delivery: ${fmtRands(o.shipping_cents)}`}
                      </span>
                      <span className="font-semibold text-[#1A1A1F]">Total: {fmtRands(o.total_cents)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BOOKINGS TAB ───────────────────────────────────────────────────── */}
        {tab === "bookings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-[#1A1A1F]">Treatment bookings</h2>
              <Link href="/treatments" className="text-sm font-semibold text-[#939EBA] hover:underline">
                Book a treatment →
              </Link>
            </div>

            {data.bookings.length === 0 ? (
              <EmptyState icon={CalendarDays} title="No bookings yet" body="Your treatment bookings will appear here once you've made a reservation.">
                <Link href="/treatments" className="mt-4 inline-flex items-center gap-2 bg-[#0F2647] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1B3D6E]">
                  View treatments <ChevronRight size={14} />
                </Link>
              </EmptyState>
            ) : (
              <div className="space-y-3">
                {data.bookings.map((b) => (
                  <div key={b.id} className="border border-[#E2E2E6] bg-white">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#0F2647]">
                          <CalendarDays size={18} className="text-[#C8A882]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1A1A1F]">{b.treatment}</p>
                          <p className="mt-0.5 text-sm text-[#636374]">
                            {fmtBookingDate(b.date)} at {b.time_slot}
                          </p>
                          {b.notes && (
                            <p className="mt-1 text-xs italic text-[#939EBA]">{b.notes}</p>
                          )}
                          <p className="mt-1 font-mono text-xs text-[#C0C9DD]">{b.reference}</p>
                        </div>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REWARDS TAB ────────────────────────────────────────────────────── */}
        {tab === "rewards" && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-[#1A1A1F]">Star Light Rewards</h2>

            {!data.rewards ? (
              <EmptyState icon={Star} title="No rewards account" body="A Star Lights account is created automatically when you make your first purchase or sign up for rewards." />
            ) : (
              <>
                {/* Balance card */}
                <div className="bg-gradient-to-br from-[#0F2647] to-[#1B3D6E] p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#939EBA]">Current balance</p>
                  <p className="mt-2 font-heading text-5xl font-bold text-[#C8A882]">
                    {data.rewards.balance_rands.toLocaleString("en-ZA")}
                  </p>
                  <p className="mt-1 text-sm text-[#939EBA]">Star Lights · R{data.rewards.balance_rands.toLocaleString("en-ZA")} value at checkout</p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {[
                      { label: "Total earned", value: data.rewards.total_earned.toLocaleString("en-ZA") },
                      { label: "Total redeemed", value: data.rewards.total_redeemed.toLocaleString("en-ZA") },
                      { label: "Earn rate", value: "5%" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-[#636E85]">{label}</p>
                        <p className="mt-0.5 font-heading text-xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ledger */}
                {data.rewards.ledger.length > 0 && (
                  <div className="border border-[#E2E2E6] bg-white">
                    <div className="border-b border-[#E2E2E6] px-5 py-3">
                      <p className="text-sm font-bold text-[#1A1A1F]">Transaction history</p>
                    </div>
                    <div className="divide-y divide-[#E2E2E6]">
                      {data.rewards.ledger.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between px-5 py-3">
                          <div>
                            <p className="text-sm text-[#1A1A1F]">{entry.description}</p>
                            <p className="text-xs text-[#636374]">{fmtDate(entry.created_at)}</p>
                          </div>
                          <span
                            className={`font-heading text-base font-bold ${
                              entry.type === "earn" ? "text-emerald-600" :
                              entry.type === "redeem" ? "text-[#939EBA]" :
                              "text-[#636374]"
                            }`}
                          >
                            {entry.type === "earn" ? "+" : entry.type === "redeem" ? "−" : ""}
                            {Math.abs(entry.amount_rands).toLocaleString("en-ZA")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border border-[#E2E2E6] bg-[#F7F7F8] p-4 text-xs text-[#636374] leading-relaxed">
                  <strong className="text-[#1A1A1F]">How Star Lights work:</strong> You earn 5 Star Lights for every R100 spent on products or treatments. 1 Star Light = R1 redeemable value at checkout. Star Lights never expire while your account is active.
                </div>
              </>
            )}
          </div>
        )}

        {/* ── VOUCHERS TAB ───────────────────────────────────────────────────── */}
        {tab === "vouchers" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-[#1A1A1F]">Gift vouchers</h2>
              <Link href="/gift-vouchers" className="text-sm font-semibold text-[#939EBA] hover:underline">
                Buy a voucher →
              </Link>
            </div>

            {allVouchers.length === 0 ? (
              <EmptyState icon={Gift} title="No gift vouchers" body="Gift vouchers you purchase or receive will appear here.">
                <Link href="/gift-vouchers" className="mt-4 inline-flex items-center gap-2 bg-[#C8A882] px-6 py-3 text-sm font-bold text-[#0F2647] hover:bg-[#A08060]">
                  Browse gift vouchers <ChevronRight size={14} />
                </Link>
              </EmptyState>
            ) : (
              <div className="space-y-6">
                {data.vouchersPurchased.length > 0 && (
                  <section>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#636374]">
                      Vouchers you purchased ({data.vouchersPurchased.length})
                    </p>
                    <VoucherGrid vouchers={data.vouchersPurchased} memberEmail={data.email} />
                  </section>
                )}
                {data.vouchersReceived.length > 0 && (
                  <section>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#636374]">
                      Vouchers received ({data.vouchersReceived.length})
                    </p>
                    <VoucherGrid vouchers={data.vouchersReceived} memberEmail={data.email} />
                  </section>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── ENQUIRIES TAB ──────────────────────────────────────────────────── */}
        {tab === "enquiries" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-[#1A1A1F]">Treatment enquiries</h2>
              <Link href="/contact" className="text-sm font-semibold text-[#939EBA] hover:underline">
                New enquiry →
              </Link>
            </div>

            {data.enquiries.length === 0 ? (
              <EmptyState icon={MessageSquare} title="No enquiries on record" body="Treatment enquiries and contact form submissions associated with your email will appear here." />
            ) : (
              <div className="space-y-3">
                {data.enquiries.map((e) => (
                  <div key={e.id} className="border border-[#E2E2E6] bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1A1A1F] capitalize">
                          {e.interest_value ?? e.interest_type ?? "General enquiry"}
                        </p>
                        <p className="mt-0.5 text-xs text-[#636374]">
                          {fmtDate(e.created_at)} · via {e.source}
                        </p>
                        {e.notes && (
                          <p className="mt-2 text-sm italic text-[#636374]">&ldquo;{e.notes}&rdquo;</p>
                        )}
                      </div>
                      <StatusBadge status={e.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  body,
  children,
}: {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-[#E2E2E6] bg-white py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center bg-[#F7F7F8]">
        <Icon size={24} className="text-[#C0C9DD]" />
      </div>
      <p className="mt-4 font-semibold text-[#1A1A1F]">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-[#636374] leading-relaxed">{body}</p>
      {children}
    </div>
  );
}

function VoucherGrid({
  vouchers,
  memberEmail,
}: {
  vouchers: MemberProfileData["vouchersPurchased"];
  memberEmail: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {vouchers.map((v) => {
        const isRecipient = v.recipient_email === memberEmail;
        return (
          <div key={v.id} className="border border-[#E2E2E6] bg-white">
            {/* Voucher top bar */}
            <div className="bg-[#0F2647] px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#939EBA]">
                  {THEME_LABELS[v.theme as keyof typeof THEME_LABELS] ?? v.theme} Gift Voucher
                </p>
                <StatusBadge status={v.status} />
              </div>
              <p className="mt-2 font-heading text-3xl font-bold text-[#C8A882]">
                R {v.denomination_rands.toLocaleString("en-ZA")}
              </p>
              {v.balance_rands !== v.denomination_rands && (
                <p className="text-xs text-[#939EBA]">
                  Balance: R {v.balance_rands.toLocaleString("en-ZA")}
                </p>
              )}
            </div>

            {/* Voucher details */}
            <div className="divide-y divide-[#E2E2E6]">
              <div className="px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#636374]">
                  Voucher code
                </p>
                <p className="mt-0.5 font-mono text-base font-bold tracking-widest text-[#1A1A1F]">
                  {v.code}
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-[#E2E2E6]">
                <div className="px-5 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#636374]">
                    {isRecipient ? "From" : "To"}
                  </p>
                  <p className="mt-0.5 text-sm text-[#1A1A1F]">
                    {isRecipient ? v.purchaser_name : v.recipient_name}
                  </p>
                </div>
                <div className="px-5 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#636374]">
                    Purchased
                  </p>
                  <p className="mt-0.5 text-sm text-[#1A1A1F]">{fmtDate(v.created_at)}</p>
                </div>
              </div>
              {v.message && (
                <div className="px-5 py-3">
                  <p className="text-xs italic text-[#636374]">&ldquo;{v.message}&rdquo;</p>
                </div>
              )}
              {v.expires_at && (
                <div className="px-5 py-2">
                  <p className="text-xs text-[#939EBA]">
                    Valid until {fmtDate(v.expires_at)}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

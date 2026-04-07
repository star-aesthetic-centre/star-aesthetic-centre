"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { VOUCHER_DENOMINATIONS, THEME_LABELS, type VoucherTheme, type VoucherDenomination } from "@/lib/utils/vouchers";

const THEMES: VoucherTheme[] = ["mothers_day", "general", "birthday", "anniversary", "christmas"];

const THEME_ICONS: Record<VoucherTheme, string> = {
  mothers_day: "💐",
  general:     "🌟",
  birthday:    "🎂",
  anniversary: "❤️",
  christmas:   "🎄",
};

function GiftVoucherForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = Number(searchParams.get("amount"));

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<VoucherDenomination>(
    VOUCHER_DENOMINATIONS.includes(preselected as VoucherDenomination)
      ? (preselected as VoucherDenomination)
      : 500
  );
  const [theme, setTheme] = useState<VoucherTheme>("mothers_day");
  const [form, setForm] = useState({
    purchaser_name: "", purchaser_email: "",
    recipient_name: "", recipient_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/vouchers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ denomination_rands: amount, theme, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      router.push(`/gift-vouchers/pending?ref=${data.order_reference}&amount=${amount}&recipient=${encodeURIComponent(data.recipient_name)}`);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

      {/* Left — form */}
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map(s => (
            <button key={s} onClick={() => s < step && setStep(s)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${s === step ? "text-[#1A1917]" : s < step ? "text-[#C8A882] cursor-pointer" : "text-[#6B6966]"}`}>
              <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${s === step ? "bg-[#0F2647] text-white" : s < step ? "bg-[#C8A882] text-white" : "bg-[#E5E4E0] text-[#6B6966]"}`}>{s}</span>
              {s === 1 ? "Voucher Details" : "Personal Details"}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            {/* Choose amount */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Choose Amount</label>
              <div className="grid grid-cols-2 gap-3">
                {VOUCHER_DENOMINATIONS.map(d => (
                  <button key={d} onClick={() => setAmount(d)}
                    className={`border-2 py-4 text-center transition-all ${amount === d ? "border-[#C8A882] bg-[#FFF8F0]" : "border-[#E5E4E0] bg-white hover:border-[#939EBA]"}`}>
                    <p className={`font-heading text-2xl font-bold ${amount === d ? "text-[#C8A882]" : "text-[#0F2647]"}`}>
                      R {d.toLocaleString("en-ZA")}
                    </p>
                    <p className="text-xs text-[#6B6966] mt-1">Gift Voucher</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Choose occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Choose Occasion</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {THEMES.map(t => (
                  <button key={t} onClick={() => setTheme(t)}
                    className={`border-2 py-3 px-2 text-center transition-all ${theme === t ? "border-[#C8A882] bg-[#FFF8F0]" : "border-[#E5E4E0] bg-white hover:border-[#939EBA]"}`}>
                    <span className="text-xl block mb-1">{THEME_ICONS[t]}</span>
                    <p className={`text-xs font-semibold ${theme === t ? "text-[#C8A882]" : "text-[#1A1917]"}`}>{THEME_LABELS[t]}</p>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep(2)}
              className="w-full bg-[#0F2647] text-white py-4 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors">
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your details */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Your Details (Purchaser)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "purchaser_name", label: "Your Name", type: "text" },
                  { key: "purchaser_email", label: "Your Email", type: "email" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">{f.label}</label>
                    <input required type={f.type} value={form[f.key as keyof typeof form]}
                      onChange={e => update(f.key, e.target.value)}
                      className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient details */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Recipient Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "recipient_name", label: "Recipient's Name", type: "text" },
                  { key: "recipient_email", label: "Recipient's Email", type: "email" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">{f.label}</label>
                    <input required type={f.type} value={form[f.key as keyof typeof form]}
                      onChange={e => update(f.key, e.target.value)}
                      className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Personal message */}
            <div>
              <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">
                Personal Message <span className="font-normal">(optional)</span>
              </label>
              <textarea value={form.message} onChange={e => update("message", e.target.value)}
                rows={3} maxLength={200} placeholder="Write a heartfelt message..."
                className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882] resize-none" />
              <p className="text-xs text-[#939EBA] mt-1">{form.message.length}/200</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 border border-[#E5E4E0] py-4 text-sm font-semibold text-[#6B6966] hover:border-[#939EBA] transition-colors">
                ← Back
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 bg-[#C8A882] text-white py-4 text-sm font-semibold hover:bg-[#A08060] transition-colors disabled:opacity-60">
                {loading ? "Processing…" : `Purchase R ${amount.toLocaleString("en-ZA")} Voucher`}
              </button>
            </div>
            <p className="text-xs text-[#6B6966] text-center">Payment via EFT / direct bank transfer. Voucher emailed once payment confirmed.</p>
          </form>
        )}
      </div>

      {/* Right — preview card */}
      <div className="lg:sticky lg:top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Preview</p>
        <div className="border border-[#E5E4E0] overflow-hidden">
          {/* Voucher card */}
          <div className="bg-[#0F2647] p-8 text-center"
            style={{ background: "linear-gradient(135deg, #0F2647 0%, #1B3D6E 60%, #2A4A80 100%)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">Star Aesthetic Centre</p>
            <p className="text-2xl mb-6">{THEME_ICONS[theme]}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">Gift Voucher</p>
            <p className="font-heading text-5xl font-bold text-[#C8A882] mb-6">
              R {amount.toLocaleString("en-ZA")}
            </p>
            {form.recipient_name && (
              <p className="text-sm text-white/80 mb-1">For <strong className="text-white">{form.recipient_name}</strong></p>
            )}
            {form.purchaser_name && (
              <p className="text-xs text-white/50">With love from {form.purchaser_name}</p>
            )}
          </div>
          {/* Message preview */}
          {form.message && (
            <div className="bg-[#FFF8F0] px-6 py-4 border-t border-[#E5E4E0]">
              <p className="text-sm text-[#6B6966] italic">"{form.message}"</p>
            </div>
          )}
          {/* Details */}
          <div className="bg-white px-6 py-4 border-t border-[#E5E4E0] space-y-2">
            {[
              ["Occasion", THEME_LABELS[theme]],
              ["Valid for", "3 years from activation"],
              ["Redeemable on", "All treatments & products"],
              ["Delivery", "Email to recipient"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-[#6B6966]">{label}</span>
                <span className="font-semibold text-[#1A1917]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GiftVouchersPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F7]">

      {/* ── Mother's Day Hero Banner ── */}
      <section className="bg-[#0F2647] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-lg">💐</span>
            <p className="text-sm text-white">
              <strong className="text-[#C8A882]">Mother's Day — 11 May 2026</strong>
              <span className="text-white/70 ml-2">Give Mum the gift of confidence.</span>
            </p>
            <span className="text-lg">💐</span>
          </div>
        </div>
      </section>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#E5E4E0] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-4">Star Aesthetic Centre</p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1917] mb-4 leading-tight">
              Give the Gift of <span className="text-[#C8A882]">Confidence</span>
            </h1>
            <p className="text-lg text-[#6B6966] leading-relaxed mb-6">
              A Star Aesthetic gift voucher lets someone you love choose exactly what they need —
              from a skin peel to a full treatment plan, or any product from our clinic shop.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {["Delivered by email instantly", "Valid for 3 years", "Redeemable on all treatments & products", "Personal message included"].map(f => (
                <span key={f} className="flex items-center gap-1.5 text-[#6B6966]">
                  <span className="text-[#C8A882] font-bold">✓</span> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Voucher form ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-sm text-[#6B6966]">Loading…</div>}>
            <GiftVoucherForm />
          </Suspense>
        </div>
      </section>

    </main>
  );
}

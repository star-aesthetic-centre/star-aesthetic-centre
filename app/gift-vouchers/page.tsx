"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  VOUCHER_DENOMINATIONS,
  THEME_LABELS,
  MAX_VOUCHER_QUANTITY,
  formatPurchaserName,
  type VoucherTheme,
  type VoucherDenomination,
} from "@/lib/utils/vouchers";

const THEMES: VoucherTheme[] = ["mothers_day", "general", "birthday", "anniversary", "christmas"];

const THEME_ICONS: Record<VoucherTheme, string> = {
  mothers_day: "💐",
  general:     "🌟",
  birthday:    "🎂",
  anniversary: "❤️",
  christmas:   "🎄",
};

type RecipientForm = { name: string; email: string };

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
  const [quantity, setQuantity] = useState(1);
  const [theme, setTheme] = useState<VoucherTheme>("mothers_day");
  const [differentRecipients, setDifferentRecipients] = useState(false);
  const [purchaser, setPurchaser] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [recipient, setRecipient] = useState<RecipientForm>({ name: "", email: "" });
  const [recipients, setRecipients] = useState<RecipientForm[]>([{ name: "", email: "" }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalRands = amount * quantity;
  const purchaserDisplayName = formatPurchaserName(purchaser.first_name, purchaser.surname);

  useEffect(() => {
    if (quantity <= 1) {
      setDifferentRecipients(false);
    }
    setRecipients((prev) => {
      const next = Array.from({ length: quantity }, (_, i) => prev[i] ?? { name: "", email: "" });
      return next;
    });
  }, [quantity]);

  function updatePurchaser(key: keyof typeof purchaser, value: string) {
    setPurchaser((prev) => ({ ...prev, [key]: value }));
  }

  function updateRecipient(key: keyof RecipientForm, value: string) {
    setRecipient((prev) => ({ ...prev, [key]: value }));
  }

  function updateRecipients(index: number, key: keyof RecipientForm, value: string) {
    setRecipients((prev) => prev.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        denomination_rands: amount,
        quantity,
        theme,
        purchaser_first_name: purchaser.first_name,
        purchaser_surname: purchaser.surname,
        purchaser_email: purchaser.email,
        purchaser_phone: purchaser.phone,
        message,
      };

      if (differentRecipients && quantity > 1) {
        payload.recipients = recipients;
      } else {
        payload.recipient_name = recipient.name;
        payload.recipient_email = recipient.email;
      }

      const res = await fetch("/api/vouchers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      const ref = data.payment_reference ?? data.order_reference;
      router.push(
        `/gift-vouchers/pending?ref=${encodeURIComponent(ref)}&amount=${data.total_rands ?? totalRands}&qty=${quantity}&denom=${amount}&recipient=${encodeURIComponent(data.recipient_name)}`
      );
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const previewRecipient =
    differentRecipients && quantity > 1
      ? recipients.filter((r) => r.name).map((r) => r.name).join(", ") || "your recipients"
      : recipient.name || "your recipient";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

      <div>
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => s < step && setStep(s)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${s === step ? "text-[#1A1917]" : s < step ? "text-[#C8A882] cursor-pointer" : "text-[#6B6966]"}`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${s === step ? "bg-[#0F2647] text-white" : s < step ? "bg-[#C8A882] text-white" : "bg-[#E5E4E0] text-[#6B6966]"}`}
              >
                {s}
              </span>
              {s === 1 ? "Voucher Details" : "Your Details"}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">
                Choose Amount
              </label>
              <div className="grid grid-cols-2 gap-3">
                {VOUCHER_DENOMINATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setAmount(d)}
                    className={`border-2 py-4 text-center transition-all ${amount === d ? "border-[#C8A882] bg-[#FFF8F0]" : "border-[#E5E4E0] bg-white hover:border-[#939EBA]"}`}
                  >
                    <p className={`font-heading text-2xl font-bold ${amount === d ? "text-[#C8A882]" : "text-[#0F2647]"}`}>
                      R {d.toLocaleString("en-ZA")}
                    </p>
                    <p className="text-xs text-[#6B6966] mt-1">Gift Voucher</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border-2 border-[#E5E4E0] text-lg font-bold text-[#0F2647] disabled:opacity-40 hover:border-[#C8A882] transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-heading text-3xl font-bold text-[#0F2647] w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(MAX_VOUCHER_QUANTITY, q + 1))}
                  disabled={quantity >= MAX_VOUCHER_QUANTITY}
                  className="w-10 h-10 border-2 border-[#E5E4E0] text-lg font-bold text-[#0F2647] disabled:opacity-40 hover:border-[#C8A882] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <p className="text-sm text-[#6B6966]">
                  {quantity > 1 ? `${quantity} separate voucher codes` : "1 voucher"}
                </p>
              </div>
              {quantity > 1 && (
                <p className="text-xs text-[#939EBA] mt-2">
                  Total: R {totalRands.toLocaleString("en-ZA")} ({quantity} × R {amount.toLocaleString("en-ZA")})
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">
                Choose Occasion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`border-2 py-3 px-2 text-center transition-all ${theme === t ? "border-[#C8A882] bg-[#FFF8F0]" : "border-[#E5E4E0] bg-white hover:border-[#939EBA]"}`}
                  >
                    <span className="text-xl block mb-1">{THEME_ICONS[t]}</span>
                    <p className={`text-xs font-semibold ${theme === t ? "text-[#C8A882]" : "text-[#1A1917]"}`}>
                      {THEME_LABELS[t]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-[#0F2647] text-white py-4 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">
                Your Details (Purchaser)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "first_name" as const, label: "First Name", type: "text" },
                  { key: "surname" as const, label: "Surname", type: "text" },
                  { key: "email" as const, label: "Email", type: "email" },
                  { key: "phone" as const, label: "Phone", type: "tel", placeholder: "+27 …" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">{f.label}</label>
                    <input
                      required
                      type={f.type}
                      placeholder={"placeholder" in f ? f.placeholder : undefined}
                      value={purchaser[f.key]}
                      onChange={(e) => updatePurchaser(f.key, e.target.value)}
                      className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">
                Recipient Details
              </p>

              {quantity > 1 && (
                <label className="flex items-start gap-3 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={differentRecipients}
                    onChange={(e) => setDifferentRecipients(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-[#6B6966]">
                    Each voucher is for a <strong className="text-[#1A1917]">different person</strong>
                  </span>
                </label>
              )}

              {differentRecipients && quantity > 1 ? (
                <div className="space-y-4">
                  {recipients.map((r, i) => (
                    <div key={i} className="border border-[#E5E4E0] p-4 bg-white">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-3">
                        Voucher {i + 1} — R {amount.toLocaleString("en-ZA")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">Name</label>
                          <input
                            required
                            type="text"
                            value={r.name}
                            onChange={(e) => updateRecipients(i, "name", e.target.value)}
                            className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">Email</label>
                          <input
                            required
                            type="email"
                            value={r.email}
                            onChange={(e) => updateRecipients(i, "email", e.target.value)}
                            className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">Recipient&apos;s Name</label>
                    <input
                      required
                      type="text"
                      value={recipient.name}
                      onChange={(e) => updateRecipient("name", e.target.value)}
                      className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">Recipient&apos;s Email</label>
                    <input
                      required
                      type="email"
                      value={recipient.email}
                      onChange={(e) => updateRecipient("email", e.target.value)}
                      className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882]"
                    />
                  </div>
                </div>
              )}
              {quantity > 1 && !differentRecipients && (
                <p className="text-xs text-[#939EBA] mt-2">
                  All {quantity} vouchers will be sent to this person (each with its own code).
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6966] mb-1.5">
                Personal Message <span className="font-normal">(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="Write a heartfelt message..."
                className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:outline-none focus:border-[#C8A882] resize-none"
              />
              <p className="text-xs text-[#939EBA] mt-1">{message.length}/200</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-[#E5E4E0] py-4 text-sm font-semibold text-[#6B6966] hover:border-[#939EBA] transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C8A882] text-white py-4 text-sm font-semibold hover:bg-[#A08060] transition-colors disabled:opacity-60"
              >
                {loading
                  ? "Processing…"
                  : quantity > 1
                    ? `Purchase ${quantity} × R ${amount.toLocaleString("en-ZA")} (R ${totalRands.toLocaleString("en-ZA")})`
                    : `Purchase R ${amount.toLocaleString("en-ZA")} Voucher`}
              </button>
            </div>
            <p className="text-xs text-[#6B6966] text-center">
              Payment via EFT — same as our online shop. One payment reference for your order. Vouchers emailed once
              payment is confirmed.
            </p>
          </form>
        )}
      </div>

      <div className="lg:sticky lg:top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-4">Preview</p>
        <div className="border border-[#E5E4E0] overflow-hidden">
          <div
            className="bg-[#0F2647] p-8 text-center"
            style={{ background: "linear-gradient(135deg, #0F2647 0%, #1B3D6E 60%, #2A4A80 100%)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">Star Aesthetic Centre</p>
            <p className="text-2xl mb-6">{THEME_ICONS[theme]}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">Gift Voucher</p>
            <p className="font-heading text-5xl font-bold text-[#C8A882] mb-2">
              R {amount.toLocaleString("en-ZA")}
            </p>
            {quantity > 1 && (
              <p className="text-sm text-white/70 mb-4">× {quantity} vouchers · R {totalRands.toLocaleString("en-ZA")} total</p>
            )}
            {previewRecipient !== "your recipient" && (
              <p className="text-sm text-white/80 mb-1">
                For <strong className="text-white">{previewRecipient}</strong>
              </p>
            )}
            {purchaserDisplayName && (
              <p className="text-xs text-white/50">With love from {purchaserDisplayName}</p>
            )}
          </div>
          {message && (
            <div className="bg-[#FFF8F0] px-6 py-4 border-t border-[#E5E4E0]">
              <p className="text-sm text-[#6B6966] italic">&ldquo;{message}&rdquo;</p>
            </div>
          )}
          <div className="bg-white px-6 py-4 border-t border-[#E5E4E0] space-y-2">
            {[
              ["Occasion", THEME_LABELS[theme]],
              ["Quantity", String(quantity)],
              ["Valid for", "3 years from activation"],
              ["Redeemable on", "All treatments & products"],
              ["Delivery", "Email to recipient(s)"],
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
      <section className="bg-[#0F2647] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-lg">💐</span>
            <p className="text-sm text-white">
              <strong className="text-[#C8A882]">Mother&apos;s Day — 11 May 2026</strong>
              <span className="text-white/70 ml-2">Give Mum the gift of confidence.</span>
            </p>
            <span className="text-lg">💐</span>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-[#E5E4E0] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-4">Star Aesthetic Centre</p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#1A1917] mb-4 leading-tight">
              Give the Gift of <span className="text-[#C8A882]">Confidence</span>
            </h1>
            <p className="text-lg text-[#6B6966] leading-relaxed mb-6">
              A Star Aesthetic gift voucher lets someone you love choose exactly what they need — from a skin peel to a
              full treatment plan, or any product from our clinic shop.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {[
                "Delivered by email once payment confirmed",
                "Valid for 3 years",
                "Redeemable on all treatments & products",
                "Buy multiple vouchers in one order",
              ].map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-[#6B6966]">
                  <span className="text-[#C8A882] font-bold">✓</span> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

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

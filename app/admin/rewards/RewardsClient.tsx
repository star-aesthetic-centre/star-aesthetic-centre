"use client";

import { useState, useTransition } from "react";
import { calculateReward, formatRewardRands, type LoyaltyAccount, type LedgerEntry } from "@/lib/utils/rewards";
import { lookupAccount, createAccount, creditReward, redeemReward } from "./actions";

type AccountWithLedger = {
  account: LoyaltyAccount | null;
  ledger: LedgerEntry[];
};

export function AccountSearch() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<AccountWithLedger | null>(null);
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  function search(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    startTransition(async () => {
      const data = await lookupAccount(email.trim());
      setResult(data as AccountWithLedger);
      setMsg("");
    });
  }

  async function handleCredit(amountRands: number, description: string, refType: "treatment" | "product" | "manual") {
    const res = await creditReward({ email: email.trim(), amountRands, description, referenceType: refType });
    if (res.success) {
      setMsg(`✓ Credited ${formatRewardRands(amountRands)} successfully`);
      const data = await lookupAccount(email.trim());
      setResult(data as AccountWithLedger);
    } else {
      setMsg(`✗ Error: ${res.error}`);
    }
  }

  async function handleRedeem(amountRands: number, description: string) {
    const res = await redeemReward({ email: email.trim(), amountRands, description });
    if (res.success) {
      setMsg(`✓ Redeemed ${formatRewardRands(amountRands)} successfully`);
      const data = await lookupAccount(email.trim());
      setResult(data as AccountWithLedger);
    } else {
      setMsg(`✗ Error: ${res.error}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={search} className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Search patient by email…"
          className="flex-1 border border-[#E5E4E0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C8A882]"
        />
        <button type="submit" disabled={isPending}
          className="bg-[#0F2647] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors disabled:opacity-60">
          {isPending ? "Searching…" : "Search"}
        </button>
      </form>

      {msg && (
        <div className={`px-4 py-3 text-sm font-semibold border ${msg.startsWith("✓") ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-700"}`}>
          {msg}
        </div>
      )}

      {result && !result.account && (
        <div className="bg-[#F8F8F7] border border-[#E5E4E0] p-6 text-sm text-[#6B6966]">
          No account found for <strong>{email}</strong>. Use "New Account" to create one.
        </div>
      )}

      {result?.account && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Balance card */}
          <div className="bg-[#0F2647] p-6 text-white lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">
              {result.account.first_name} {result.account.last_name}
            </p>
            <p className="text-xs text-white/50 mb-3">{email}</p>
            <p className="font-heading text-4xl font-bold text-[#C8A882]">
              {formatRewardRands(result.account.balance_rands)}
            </p>
            <p className="text-xs text-white/50 mt-1 mb-4">Current balance</p>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 text-xs">
              <div>
                <p className="text-white/50">Total Earned</p>
                <p className="text-white font-semibold">{formatRewardRands(result.account.total_earned)}</p>
              </div>
              <div>
                <p className="text-white/50">Total Redeemed</p>
                <p className="text-white font-semibold">{formatRewardRands(result.account.total_redeemed)}</p>
              </div>
            </div>
            {result.account.phone && (
              <p className="mt-4 text-xs text-white/50">{result.account.phone}</p>
            )}
            <p className="text-xs text-white/30 mt-1">
              Member since {new Date(result.account.created_at).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}
            </p>
          </div>

          {/* Actions + ledger */}
          <div className="lg:col-span-2 space-y-4">
            <QuickCreditPanel email={email} onCredit={handleCredit} onRedeem={handleRedeem} balance={result.account.balance_rands} />
            <LedgerTable ledger={result.ledger} />
          </div>
        </div>
      )}
    </div>
  );
}

function QuickCreditPanel({
  email, onCredit, onRedeem, balance
}: {
  email: string;
  onCredit: (amount: number, desc: string, type: "treatment" | "product" | "manual") => void;
  onRedeem: (amount: number, desc: string) => void;
  balance: number;
}) {
  const [tab, setTab] = useState<"credit" | "redeem">("credit");
  const [treatmentPrice, setTreatmentPrice] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [redeemDesc, setRedeemDesc] = useState("");

  const suggestedReward = treatmentPrice ? calculateReward(Number(treatmentPrice)) : null;

  return (
    <div className="bg-white border border-[#E5E4E0]">
      <div className="flex border-b border-[#E5E4E0]">
        {(["credit", "redeem"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${tab === t ? "bg-[#0F2647] text-white" : "text-[#6B6966] hover:bg-[#F8F8F7]"}`}>
            {t === "credit" ? "Credit Reward" : "Redeem Balance"}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tab === "credit" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6966] mb-1">Treatment Name</label>
              <input value={treatmentName} onChange={e => setTreatmentName(e.target.value)}
                placeholder="e.g. Botox — Optimal Dosing"
                className="w-full border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6966] mb-1">Treatment Price (R)</label>
              <input type="number" value={treatmentPrice} onChange={e => setTreatmentPrice(e.target.value)}
                placeholder="e.g. 5440"
                className="w-full border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
              {suggestedReward !== null && suggestedReward > 0 && (
                <p className="mt-1.5 text-xs text-[#6B6966]">
                  5% reward = <strong className="text-[#0F2647]">{formatRewardRands(suggestedReward)}</strong>
                  <button onClick={() => onCredit(suggestedReward, `Treatment: ${treatmentName || "Treatment"}`, "treatment")}
                    className="ml-3 bg-[#0F2647] text-white px-3 py-1 text-xs font-bold hover:bg-[#1B3D6E] transition-colors">
                    Credit {formatRewardRands(suggestedReward)}
                  </button>
                </p>
              )}
            </div>
            <div className="border-t border-[#E5E4E0] pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6B6966] mb-3">Or enter a custom amount</p>
              <div className="flex gap-3">
                <input type="number" value={customAmount} onChange={e => setCustomAmount(e.target.value)}
                  placeholder="R amount"
                  className="flex-1 border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
                <input value={customDesc} onChange={e => setCustomDesc(e.target.value)}
                  placeholder="Description"
                  className="flex-1 border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
                <button
                  onClick={() => customAmount && customDesc && onCredit(Number(customAmount), customDesc, "manual")}
                  className="bg-[#C8A882] text-white px-4 py-2 text-sm font-bold hover:bg-[#A08060] transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[#6B6966]">Current balance: <strong className="text-[#0F2647]">{formatRewardRands(balance)}</strong></p>
            <div className="flex gap-3">
              <input type="number" value={redeemAmount} onChange={e => setRedeemAmount(e.target.value)}
                placeholder="Amount to redeem (R)" max={balance}
                className="flex-1 border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
              <input value={redeemDesc} onChange={e => setRedeemDesc(e.target.value)}
                placeholder="e.g. Redeemed against Botox"
                className="flex-1 border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
              <button
                onClick={() => redeemAmount && redeemDesc && onRedeem(Number(redeemAmount), redeemDesc)}
                className="bg-red-700 text-white px-4 py-2 text-sm font-bold hover:bg-red-800 transition-colors">
                Redeem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LedgerTable({ ledger }: { ledger: LedgerEntry[] }) {
  if (!ledger.length) return (
    <div className="bg-[#F8F8F7] border border-[#E5E4E0] px-6 py-4 text-sm text-[#6B6966]">
      No transactions yet.
    </div>
  );
  return (
    <div className="bg-white border border-[#E5E4E0] overflow-hidden">
      <div className="px-6 py-3 bg-[#F8F8F7] border-b border-[#E5E4E0]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966]">Transaction History</p>
      </div>
      <div className="divide-y divide-[#E5E4E0] max-h-64 overflow-y-auto">
        {ledger.map(tx => (
          <div key={tx.id} className="flex items-center justify-between px-6 py-3">
            <div>
              <p className="text-sm text-[#1A1917]">{tx.description}</p>
              <p className="text-xs text-[#6B6966] mt-0.5">
                {new Date(tx.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                {tx.created_by && tx.created_by !== "system" && <span className="ml-2 text-[#939EBA]">by {tx.created_by}</span>}
              </p>
            </div>
            <span className={`font-bold text-sm ${tx.amount_rands >= 0 ? "text-green-700" : "text-red-600"}`}>
              {tx.amount_rands >= 0 ? "+" : ""}{formatRewardRands(tx.amount_rands)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewAccountForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createAccount({ email: form.email, firstName: form.firstName, lastName: form.lastName, phone: form.phone });
      if (res.success) {
        setMsg("✓ Account created successfully");
        setForm({ email: "", firstName: "", lastName: "", phone: "" });
        setOpen(false);
      } else {
        setMsg(`✗ ${res.error}`);
      }
    });
  }

  return (
    <div>
      <button onClick={() => setOpen(!open)}
        className="bg-[#C8A882] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#A08060] transition-colors">
        + New Account
      </button>
      {msg && <p className={`mt-3 text-sm font-semibold ${msg.startsWith("✓") ? "text-green-700" : "text-red-600"}`}>{msg}</p>}
      {open && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white border border-[#E5E4E0] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "email", label: "Email", type: "email", required: true },
            { key: "firstName", label: "First Name", type: "text", required: true },
            { key: "lastName", label: "Last Name", type: "text", required: true },
            { key: "phone", label: "Phone", type: "tel", required: false },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6966] mb-1">{f.label}</label>
              <input type={f.type} required={f.required}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full border border-[#E5E4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#C8A882]" />
            </div>
          ))}
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={isPending}
              className="bg-[#0F2647] text-white px-6 py-2 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors disabled:opacity-60">
              {isPending ? "Creating…" : "Create Account"}
            </button>
            <button type="button" onClick={() => setOpen(false)}
              className="border border-[#E5E4E0] px-6 py-2 text-sm text-[#6B6966] hover:border-[#C8A882] transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

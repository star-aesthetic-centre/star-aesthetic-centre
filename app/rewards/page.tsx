"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateReward, formatRewardRands, type LedgerEntry } from "@/lib/utils/rewards";
import { RewardsSignup } from "@/components/rewards/RewardsSignup";

const EARN_EXAMPLES = [
  { label: "20% Glycolic Peel", price: 665 },
  { label: "Dermapen — Face", price: 1900 },
  { label: "Botox — Optimal (64 units)", price: 5440 },
  { label: "HarmonyCA", price: 11990 },
  { label: "Vitamin Drip", price: 1265 },
  { label: "Any skincare product", price: 745, isProduct: true },
];

function BalanceChecker() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    found: boolean;
    account?: {
      first_name: string;
      last_name: string;
      balance_rands: number;
      total_earned: number;
      total_redeemed: number;
      member_since: string;
    };
    recent?: LedgerEntry[];
  }>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/rewards/lookup?email=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ found: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="check-balance" className="scroll-mt-24 bg-white border border-[#E5E4E0] p-8">
      <h3 className="font-heading text-xl font-bold text-[#1A1917] mb-2">Check Your Balance</h3>
      <p className="text-sm text-[#6B6966] mb-6">Enter the email address registered with your account.</p>
      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-[#E5E4E0] px-4 py-3 text-sm text-[#1A1917] placeholder-[#939EBA] focus:outline-none focus:border-[#C8A882]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0F2647] text-white px-8 py-3 text-sm font-semibold hover:bg-[#1B3D6E] transition-colors disabled:opacity-60"
        >
          {loading ? "Checking…" : "Check Balance"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          {!result.found ? (
            <div className="bg-[#F8F8F7] border border-[#E5E4E0] p-6">
              <p className="text-sm text-[#6B6966]">No rewards account found for <strong>{email}</strong>.</p>
              <p className="text-sm text-[#6B6966] mt-2">
                <a href="#join-rewards" className="font-semibold text-[#C8A882] hover:underline">
                  Sign up for the Rewards Programme →
                </a>
              </p>
            </div>
          ) : result.account ? (
            <div className="space-y-4">
              {/* Balance card */}
              <div className="bg-[#0F2647] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-1">
                  {result.account.first_name} {result.account.last_name}
                </p>
                <p className="font-heading text-4xl font-bold text-[#C8A882]">
                  {formatRewardRands(result.account.balance_rands)}
                </p>
                <p className="text-sm text-white/60 mt-1">Available reward balance</p>
                <div className="flex gap-8 mt-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/50">Total Earned</p>
                    <p className="font-semibold text-white">{formatRewardRands(result.account.total_earned)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Total Redeemed</p>
                    <p className="font-semibold text-white">{formatRewardRands(result.account.total_redeemed)}</p>
                  </div>
                </div>
              </div>

              {/* Recent transactions */}
              {result.recent && result.recent.length > 0 && (
                <div className="border border-[#E5E4E0]">
                  <div className="px-6 py-3 bg-[#F8F8F7] border-b border-[#E5E4E0]">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966]">Recent Activity</p>
                  </div>
                  {result.recent.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between px-6 py-3 border-b border-[#E5E4E0] last:border-0">
                      <div>
                        <p className="text-sm text-[#1A1917]">{tx.description}</p>
                        <p className="text-xs text-[#6B6966] mt-0.5">
                          {new Date(tx.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <span className={`font-bold text-sm ${tx.amount_rands >= 0 ? "text-green-700" : "text-red-600"}`}>
                        {tx.amount_rands >= 0 ? "+" : ""}{formatRewardRands(tx.amount_rands)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function EarningsCalculator() {
  const [price, setPrice] = useState("");
  const reward = price && !isNaN(Number(price)) ? calculateReward(Number(price)) : null;

  return (
    <div className="bg-[#F8F8F7] border border-[#E5E4E0] p-8">
      <h3 className="font-heading text-xl font-bold text-[#1A1917] mb-2">Earnings Calculator</h3>
      <p className="text-sm text-[#6B6966] mb-6">Enter any treatment or product price to see what you'd earn.</p>
      <div className="flex items-center gap-3">
        <span className="text-[#6B6966] text-sm font-semibold">R</span>
        <input
          type="number"
          min="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="e.g. 1900"
          className="flex-1 border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] placeholder-[#939EBA] focus:outline-none focus:border-[#C8A882]"
        />
      </div>
      {reward !== null && reward > 0 && (
        <div className="mt-4 bg-[#0F2647] px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-white/70">You would earn</p>
          <p className="font-heading text-2xl font-bold text-[#C8A882]">{formatRewardRands(reward)}</p>
        </div>
      )}
      {reward === 0 && price && (
        <p className="mt-4 text-xs text-[#6B6966]">Minimum reward is R 10 (minimum spend R 100).</p>
      )}
    </div>
  );
}

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F7]">

      {/* ── Hero ── */}
      <section className="bg-[#0F2647] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-4">
              Star Aesthetic Rewards
            </p>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Every Rand You Spend<br />
              <span className="text-[#C8A882]">Works Harder for You</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Earn <strong className="text-white">10%</strong> back on every treatment and product purchase —
              automatically credited to your rewards balance and redeemable against your next visit.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#join-rewards"
                className="bg-[#C8A882] px-8 py-4 text-sm font-bold text-[#0F2647] transition-colors hover:bg-[#A08060]"
              >
                Sign up — join the Rewards Programme
              </a>
              <Link
                href="/book"
                className="border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sign up ── */}
      <section className="border-b border-[#E5E4E0] bg-[#F8F8F7] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RewardsSignup />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-16 border-b border-[#E5E4E0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-3">Simple by Design</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#1A1917]">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Join or Visit",
                body: "Sign up free below, or visit us for a treatment or shop purchase — we create your account and start crediting rewards automatically.",
              },
              {
                step: "02",
                title: "Earn 10% Back",
                body: "10% of every Rand you spend is credited to your rewards balance, rounded to the nearest R 10. Treatments credited after payment. Products credited on purchase.",
              },
              {
                step: "03",
                title: "Redeem Anytime",
                body: "Use your balance towards your next treatment or product purchase. Simply tell Nakita at reception, or apply at checkout online.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-[#0F2647] text-[#C8A882] flex items-center justify-center font-heading font-bold text-sm">
                  {step}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#1A1917] text-lg mb-2">{title}</h3>
                  <p className="text-sm text-[#6B6966] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Earn Rate Table ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Earn rates */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-3">Earn Rates</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1917] mb-8">What You Earn</h2>

              {/* Rates summary */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Treatments", rate: "10%", note: "Credited after payment" },
                  { label: "Products", rate: "10%", note: "Credited on purchase" },
                ].map(({ label, rate, note }) => (
                  <div key={label} className="bg-white border border-[#E5E4E0] p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#939EBA] mb-2">{label}</p>
                    <p className="font-heading text-4xl font-bold text-[#C8A882]">{rate}</p>
                    <p className="text-xs text-[#6B6966] mt-2">{note}</p>
                  </div>
                ))}
              </div>

              {/* Example earn table */}
              <div className="bg-white border border-[#E5E4E0] overflow-hidden">
                <div className="bg-[#0F2647] px-6 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">Example Earnings</p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6B6966]">Treatment / Product</th>
                      <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6B6966]">Price</th>
                      <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#C8A882]">You Earn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EARN_EXAMPLES.map((ex, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                        <td className="px-6 py-3 text-[#1A1917]">
                          {ex.label}
                          {ex.isProduct && <span className="ml-2 text-[10px] bg-[#EEF0F6] text-[#939EBA] px-1.5 py-0.5 font-bold uppercase tracking-wider">Product</span>}
                        </td>
                        <td className="px-6 py-3 text-right text-[#6B6966]">R {ex.price.toLocaleString("en-ZA")}</td>
                        <td className="px-6 py-3 text-right font-bold text-[#0F2647]">{formatRewardRands(calculateReward(ex.price))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-6 py-3 text-xs text-[#6B6966] border-t border-[#E5E4E0]">
                  * Rewards rounded to nearest R 10. No expiry. No minimum redemption.
                </p>
              </div>
            </div>

            {/* Calculator + Balance checker */}
            <div className="space-y-6">
              <EarningsCalculator />
              <BalanceChecker />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0F2647] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Earning Today
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Sign up in seconds, or earn automatically when you book or shop with us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#join-rewards"
              className="bg-[#C8A882] px-10 py-4 text-sm font-bold text-[#0F2647] transition-colors hover:bg-[#A08060]"
            >
              Sign up — join the Rewards Programme
            </a>
            <Link href="/book" className="border border-white/30 px-10 py-4 text-sm font-semibold text-white transition-colors hover:border-white/60">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

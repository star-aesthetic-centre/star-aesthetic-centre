"use client";

import { useState } from "react";
import Link from "next/link";

type SignupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; name: string }
  | { status: "error"; message: string };

export function RewardsSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SignupState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/rewards/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }

      setState({
        status: "success",
        name: `${data.account.first_name} ${data.account.last_name}`.trim(),
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch {
      setState({ status: "error", message: "Network error. Please try again or call the clinic." });
    }
  }

  return (
    <div id="join-rewards" className="scroll-mt-24 border border-[#E5E4E0] bg-white p-8 lg:p-10">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#939EBA]">Join free</p>
      <h2 className="mb-2 font-heading text-2xl font-bold text-[#1A1917] lg:text-3xl">
        Sign up for Star Light Rewards
      </h2>
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-[#6B6966]">
        Sign up to become a member of Star Light Rewards and earn 5% back in Star Lights on treatments and products.
        Already visited us? You may already have an account —{" "}
        <a href="#check-balance" className="font-semibold text-[#C8A882] hover:underline">
          check your balance
        </a>{" "}
        below.
      </p>

      {state.status === "success" ? (
        <div className="bg-[#0F2647] p-6 text-white">
          <p className="mb-2 font-heading text-xl font-bold text-[#C8A882]">You&apos;re in, {state.name}!</p>
          <p className="text-sm leading-relaxed text-white/80">
            Your Star Light Rewards membership is active. Earn 5% in Star Lights on your next treatment or shop purchase — we&apos;ll
            credit your balance automatically.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="bg-[#C8A882] px-6 py-3 text-sm font-semibold text-[#0F2647] transition-colors hover:bg-[#A08060]"
            >
              Book a consultation
            </Link>
            <Link
              href="/shop"
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              Shop products
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rewards-first-name"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#6B6966]"
              >
                First name
              </label>
              <input
                id="rewards-first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-[#E5E4E0] px-4 py-3 text-sm text-[#1A1917] focus:border-[#C8A882] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="rewards-last-name"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#6B6966]"
              >
                Surname
              </label>
              <input
                id="rewards-last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-[#E5E4E0] px-4 py-3 text-sm text-[#1A1917] focus:border-[#C8A882] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="rewards-email"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#6B6966]"
            >
              Email
            </label>
            <input
              id="rewards-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E5E4E0] px-4 py-3 text-sm text-[#1A1917] focus:border-[#C8A882] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="rewards-phone"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#6B6966]"
            >
              Mobile <span className="font-normal normal-case text-[#939EBA]">(optional)</span>
            </label>
            <input
              id="rewards-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+27 …"
              className="w-full border border-[#E5E4E0] px-4 py-3 text-sm text-[#1A1917] focus:border-[#C8A882] focus:outline-none"
            />
          </div>

          {state.status === "error" && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={state.status === "loading"}
            className="w-full bg-[#C8A882] px-10 py-4 text-sm font-bold text-[#0F2647] transition-colors hover:bg-[#A08060] disabled:opacity-60 sm:w-auto"
          >
            {state.status === "loading" ? "Joining…" : "Sign up — join Star Light Rewards"}
          </button>
        </form>
      )}
    </div>
  );
}

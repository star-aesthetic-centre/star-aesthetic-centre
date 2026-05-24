"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";

export function MemberLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | {
    found: boolean;
    member?: { firstName: string; lastName: string; email: string };
    redirectTo?: string;
    message?: string;
  }>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
    if (siteKey && !turnstileToken) {
      setError("Please complete the security check below.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: turnstileToken || undefined, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not sign in. Please try again.");
        return;
      }
      if (data.redirectTo) {
        router.push(data.redirectTo);
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result?.found && result.member) {
    return (
      <div className="border border-[#E5E4E0] bg-[#F8F8F7] p-8">
        <p className="font-heading text-xl font-bold text-[#1A1917]">
          Hello, {result.member.firstName}
        </p>
        <p className="mt-3 text-sm text-[#6B6966] leading-relaxed">
          {result.message}
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link
              href="/rewards#check-balance"
              className="font-semibold text-[#0F2647] hover:text-[#C8A882] transition-colors"
            >
              Check Star Light Rewards balance →
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="font-semibold text-[#0F2647] hover:text-[#C8A882] transition-colors"
            >
              Browse the shop →
            </Link>
          </li>
          <li>
            <Link
              href="/book"
              className="font-semibold text-[#0F2647] hover:text-[#C8A882] transition-colors"
            >
              Book a consultation →
            </Link>
          </li>
        </ul>
        <p className="mt-8 text-xs text-[#939EBA]">
          Password sign-in and your full order history dashboard will be added in a future update.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="member-email" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
          Email address <span className="text-[#C8A882]">*</span>
        </label>
        <input
          id="member-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
        />
      </div>

      <p className="text-xs text-[#6B6966] leading-relaxed">
        Enter the email you used to sign up. Full password sign-in and your member dashboard are
        coming soon.
      </p>

      <TurnstileWidget onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

      {error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {result && !result.found && (
        <p className="border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3 text-sm text-[#6B6966]">
          {result.message}{" "}
          <Link href="/member/signup" className="font-semibold text-[#0F2647] hover:text-[#C8A882]">
            Create an account
          </Link>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 bg-[#0F2647] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1B3D6E] disabled:opacity-60 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Checking…
          </>
        ) : (
          "Continue"
        )}
      </button>

      <p className="text-xs text-[#A9A8A4]">
        New here?{" "}
        <Link href="/member/signup" className="font-semibold text-[#0F2647] hover:text-[#C8A882]">
          Member signup
        </Link>
      </p>
    </form>
  );
}

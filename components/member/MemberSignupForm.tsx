"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";

const INTEREST_OPTIONS = [
  "Book a consultation",
  "Treatment information",
  "Skincare products",
  "Star Light Rewards",
  "Gift vouchers",
  "General enquiry",
];

export function MemberSignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    interest: "",
    comment: "",
    website: "", // honeypot
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
    if (siteKey && !turnstileToken) {
      setErrorMessage("Please complete the security check below.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    const res = await fetch("/api/member/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        interest: form.interest,
        comment: form.comment,
        turnstileToken: turnstileToken || undefined,
        website: form.website,
      }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data.error ?? "Something went wrong. Please try again or call the clinic.");
      return;
    }

    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2647]/10">
          <CheckCircle2 className="h-8 w-8 text-[#0F2647]" />
        </div>
        <div>
          <p className="font-heading text-xl font-semibold text-[#1A1917]">
            Welcome, {form.firstName}!
          </p>
          <p className="mt-2 text-sm text-[#6B6966] leading-relaxed max-w-md mx-auto">
            Your member account has been created. Your full dashboard — order history and Star Light
            Rewards — will be available here soon. You can{" "}
            <Link href="/rewards#check-balance" className="font-semibold text-[#C8A882] hover:underline">
              check your rewards balance
            </Link>{" "}
            in the meantime.
          </p>
        </div>
        <Link
          href="/member/login"
          className="text-sm font-semibold text-[#0F2647] hover:text-[#C8A882] transition-colors"
        >
          Go to member login →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
            First name <span className="text-[#C8A882]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
            Last name <span className="text-[#C8A882]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
            Phone <span className="text-[#C8A882]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="082 000 0000"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
            Email address <span className="text-[#C8A882]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none appearance-none"
        >
          <option value="">Select your main interest…</option>
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="block text-xs font-semibold uppercase tracking-widest text-[#6B6966] mb-1.5">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          value={form.comment}
          onChange={handleChange}
          placeholder="Anything else you'd like us to know…"
          className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none resize-none"
        />
      </div>

      <TurnstileWidget
        className="pt-1"
        onToken={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      {status === "error" && errorMessage && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 bg-[#C8A882] px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#0F2647] transition-colors hover:bg-[#A08060] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
          </>
        ) : (
          "Create member account"
        )}
      </button>

      <p className="text-xs text-[#A9A8A4] leading-relaxed">
        Protected by Cloudflare Turnstile. Your details are private and used only by Star Aesthetic
        Centre. Already a member?{" "}
        <Link href="/member/login" className="font-semibold text-[#0F2647] hover:text-[#C8A882]">
          Sign in
        </Link>
        .
      </p>
    </form>
  );
}

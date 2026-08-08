"use client";

import { useMemo, useState } from "react";
import { Star, CheckCircle2, Loader2 } from "lucide-react";
import { HoneypotField } from "@/components/security/HoneypotField";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";
import { questionsFor, type ReviewQuestion } from "@/lib/reviews/questions";
import type { ReviewSubjectOption } from "@/lib/reviews/types";

/**
 * Guided review form.
 *
 * Four prompts rather than one blank textarea — people freeze in front of an
 * empty box. None of the four is individually required; the API asks only for
 * ~80 characters across the whole set, so someone with one thing to say can
 * still submit. The counters below each box encourage rather than block.
 */
export default function ReviewForm({
  options,
  initialTreatmentSlug,
  bookingReference,
}: {
  options: ReviewSubjectOption[];
  initialTreatmentSlug?: string;
  bookingReference?: string;
}) {
  const [treatmentSlug, setTreatmentSlug] = useState(initialTreatmentSlug ?? "");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", city: "", headline: "", website: "" });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Grouped so a 13-item dropdown reads as three short lists.
  const grouped = useMemo(() => {
    const groups = new Map<string, ReviewSubjectOption[]>();
    for (const o of options) {
      const list = groups.get(o.categoryLabel) ?? [];
      list.push(o);
      groups.set(o.categoryLabel, list);
    }
    return [...groups.entries()];
  }, [options]);

  const selected = options.find((o) => (o.slug ?? "") === treatmentSlug);

  // Questions change with the treatment — a weight-loss programme and a lip
  // filler appointment have almost nothing in common from the patient's side.
  const questions = useMemo(() => questionsFor(treatmentSlug || null), [treatmentSlug]);

  // Count only answers belonging to the CURRENT question set, so text left
  // behind by a previously selected treatment can't satisfy the threshold for
  // a form the patient hasn't actually filled in.
  const written = questions.reduce((n, q) => n + (answers[q.id] ?? "").trim().length, 0);
  const enough = written >= 80;

  function setAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (rating < 1) {
      setErrorMessage("Please choose a star rating.");
      setStatus("error");
      return;
    }
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
    if (siteKey && !turnstileToken) {
      setErrorMessage("Please complete the security check below.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        city: form.city,
        headline: form.headline,
        rating,
        treatmentSlug: treatmentSlug || undefined,
        answers,
        bookingReference,
        turnstileToken: turnstileToken || undefined,
        website: form.website,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2647]/10">
          <CheckCircle2 className="h-8 w-8 text-[#0F2647]" />
        </div>
        <div>
          <p className="font-heading text-xl font-semibold text-[#1A1917]">
            Thank you, {form.name.split(" ")[0]}!
          </p>
          <p className="mt-1 max-w-md text-sm text-[#6B6966]">
            Your review has been received. Our team reads every one before it goes on the site, so
            it may take a day or two to appear.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <HoneypotField
        value={form.website}
        onChange={(v: string) => setForm((p) => ({ ...p, website: v }))}
      />

      {/* ── What are you reviewing ─────────────────────────────────────── */}
      <div>
        <label htmlFor="treatment" className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
          What are you reviewing?
        </label>
        <select
          id="treatment"
          value={treatmentSlug}
          onChange={(e) => setTreatmentSlug(e.target.value)}
          className="w-full border border-[#E5E4E0] bg-white px-4 py-3 text-sm text-[#1A1917] focus:border-[#C8A882] focus:outline-none"
        >
          {grouped.map(([category, items]) =>
            category === "General" ? (
              items.map((o) => (
                <option key={o.label} value="">
                  {o.label}
                </option>
              ))
            ) : (
              <optgroup key={category} label={category}>
                {items.map((o) => (
                  <option key={o.slug ?? o.label} value={o.slug ?? ""}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            )
          )}
        </select>
        {selected && selected.slug && (
          <p className="mt-2 text-xs text-[#6B6966]">
            Your review will appear on the {selected.label} page.
          </p>
        )}
      </div>

      {/* ── Rating ─────────────────────────────────────────────────────── */}
      <div>
        <span className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
          Your rating
        </span>
        <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = n <= (hoverRating || rating);
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                aria-pressed={rating === n}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-7 w-7 ${filled ? "fill-[#C8A882] text-[#C8A882]" : "text-[#E5E4E0]"}`}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-3 text-sm text-[#6B6966]">
              {["Poor", "Fair", "Good", "Very good", "Excellent"][rating - 1]}
            </span>
          )}
        </div>
      </div>

      {/* ── Headline ───────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="headline" className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
          Sum it up in a line
        </label>
        <input
          id="headline"
          required
          maxLength={90}
          value={form.headline}
          onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))}
          placeholder="e.g. Honest advice and no pressure at all"
          className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:border-[#C8A882] focus:outline-none"
        />
      </div>

      {/* ── Guided questions ───────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xs uppercase tracking-[2px] text-[#6B6966]">Tell us more</h3>
          <span className={`text-xs ${enough ? "text-[#0F2647]" : "text-[#6B6966]"}`}>
            {enough ? "✓ Ready to submit" : `${Math.max(0, 80 - written)} more characters`}
          </span>
        </div>
        <p className="-mt-3 text-xs text-[#6B6966]">
          Answer whichever you like — you don&apos;t need to fill in all four.
        </p>

        {questions.map((q: ReviewQuestion) => (
          <div key={q.id}>
            <label htmlFor={q.id} className="mb-2 block text-sm font-semibold text-[#1A1917]">
              {q.label}
            </label>
            <textarea
              id={q.id}
              rows={q.rows}
              value={answers[q.id] ?? ""}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              placeholder={q.placeholder}
              className="w-full border border-[#E5E4E0] px-4 py-3 text-sm leading-relaxed focus:border-[#C8A882] focus:outline-none"
            />
            {q.hint && <p className="mt-1 text-xs text-[#939EBA]">{q.hint}</p>}
          </div>
        ))}
      </div>

      {/* ── About you ──────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
            Your name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:border-[#C8A882] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="city" className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
            Suburb / city <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="city"
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            placeholder="Durban North"
            className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:border-[#C8A882] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[2px] text-[#6B6966]">
          Your email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="w-full border border-[#E5E4E0] px-4 py-3 text-sm focus:border-[#C8A882] focus:outline-none"
        />
        <p className="mt-1 text-xs text-[#6B6966]">
          Never published — we only use it to verify the review is genuine.
        </p>
      </div>

      <TurnstileWidget onToken={setTurnstileToken} />

      {status === "error" && errorMessage && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 bg-[#C8A882] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#A08060] disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Submit my review"
        )}
      </button>

      <p className="text-center text-xs text-[#6B6966]">
        Reviews are read by our team before publishing.
      </p>
    </form>
  );
}

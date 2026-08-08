"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

type Answer = { question: string; answer: string };

type Review = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  city: string | null;
  scope: string;
  treatment_slug: string | null;
  subject_label: string | null;
  rating: number;
  headline: string;
  answers_json: Answer[];
  approved: boolean;
  booking_reference: string | null;
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/reviews/admin");
    if (!res.ok) {
      setError(res.status === 401 ? "Please log in as admin." : "Could not load reviews.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setReviews(data.reviews ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function act(id: string, action: "approve" | "unapprove" | "delete") {
    if (action === "delete" && !confirm("Delete this review permanently?")) return;
    setBusy(id);
    setError("");
    const res = await fetch("/api/reviews/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Action failed.");
    } else {
      await load();
    }
    setBusy(null);
  }

  const shown = reviews.filter((r) =>
    filter === "all" ? true : filter === "pending" ? !r.approved : r.approved
  );
  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-[#1A1917]">Patient Reviews</h1>
          <p className="mt-1 text-sm text-[#6B6966]">
            Nothing appears on the site until you approve it.
            {pendingCount > 0 && (
              <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                {pendingCount} awaiting review
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {(["pending", "approved", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-3 py-2 text-sm capitalize transition-colors ${
                filter === f
                  ? "border-[#C8A882] bg-[#FFF8F0] text-[#A08060]"
                  : "border-[#E5E4E0] text-[#6B6966] hover:border-[#939EBA]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <p className="text-sm text-[#6B6966]">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="text-sm text-[#6B6966]">No {filter === "all" ? "" : filter} reviews.</p>
      ) : (
        <div className="space-y-4">
          {shown.map((r) => (
            <article key={r.id} className="border border-[#E5E4E0] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex" aria-label={`${r.rating} of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`h-4 w-4 ${
                            n <= r.rating ? "fill-[#C8A882] text-[#C8A882]" : "text-[#E5E4E0]"
                          }`}
                        />
                      ))}
                    </span>
                    <h2 className="font-heading text-base text-[#1A1917]">{r.headline}</h2>
                  </div>
                  <p className="mt-1 text-xs text-[#6B6966]">
                    {r.name} · {r.email}
                    {r.city ? ` · ${r.city}` : ""} ·{" "}
                    {new Date(r.created_at).toLocaleDateString("en-ZA")}
                  </p>
                  <p className="mt-1 text-xs text-[#939EBA]">
                    {r.subject_label ?? "Clinic experience"}
                    {r.booking_reference ? ` · from booking ${r.booking_reference}` : ""}
                  </p>
                </div>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${
                    r.approved ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {r.approved ? "Published" : "Pending"}
                </span>
              </div>

              <div className="mt-4 space-y-3 border-t border-[#F0EFEC] pt-4">
                {(r.answers_json ?? []).map((a, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-[#939EBA]">{a.question}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#1A1917]">{a.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                {r.approved ? (
                  <button
                    onClick={() => act(r.id, "unapprove")}
                    disabled={busy === r.id}
                    className="border border-[#E5E4E0] px-4 py-2 text-sm text-[#6B6966] hover:border-[#939EBA] disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => act(r.id, "approve")}
                    disabled={busy === r.id}
                    className="bg-[#C8A882] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A08060] disabled:opacity-50"
                  >
                    {busy === r.id ? "Working…" : "Approve & publish"}
                  </button>
                )}
                <button
                  onClick={() => act(r.id, "delete")}
                  disabled={busy === r.id}
                  className="border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

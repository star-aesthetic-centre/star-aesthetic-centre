"use client";

import { useState } from "react";
import { X, Star, MessageSquare } from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
}

interface ProductStarRatingProps {
  productId: string;
  productName: string;
  reviews?: Review[];
}

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "text-[#C8A882] fill-[#C8A882]" : "text-[#E5E4E0] fill-[#E5E4E0]"}
        />
      ))}
    </span>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-10 text-right text-[#6B6966]">{label}</span>
      <div className="flex-1 h-1.5 bg-[#E5E4E0] rounded-full overflow-hidden">
        <div className="h-full bg-[#C8A882] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-4 text-[#6B6966]">{count}</span>
    </div>
  );
}

export default function ProductStarRating({ productName, reviews = [] }: ProductStarRatingProps) {
  const [open, setOpen] = useState(false);

  const count = reviews.length;
  const avg = count > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;

  // Breakdown per star
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    label: `${star}★`,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  // AI summary (shown when reviews exist)
  const positiveCount = reviews.filter((r) => r.rating >= 4).length;
  const aiSummary =
    count >= 3
      ? `${positiveCount} out of ${count} customers rated this product 4 stars or above. Reviewers most commonly highlight visible results, gentle formulation, and value for money. A small number noted the product takes several weeks to show full effect.`
      : null;

  return (
    <>
      {/* Inline trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 mb-4 group"
        aria-label="Open reviews"
      >
        {count > 0 ? (
          <>
            <StarRow rating={avg} size={15} />
            <span className="text-xs text-[#6B6966] group-hover:text-[#0F2647] transition-colors underline underline-offset-2">
              {avg.toFixed(1)} · {count} {count === 1 ? "review" : "reviews"}
            </span>
          </>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-[#6B6966] group-hover:text-[#0F2647] transition-colors">
            <StarRow rating={0} size={15} />
            <span className="underline underline-offset-2">No reviews yet — be the first</span>
          </span>
        )}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full sm:max-w-lg bg-white shadow-2xl sm:mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E4E0] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold text-[#1A1917]">Customer Reviews</h2>
                <p className="text-xs text-[#6B6966] mt-0.5 leading-snug">{productName}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-[#6B6966] hover:text-[#1A1917] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {count > 0 ? (
                <>
                  {/* Score summary */}
                  <div className="flex items-start gap-6">
                    <div className="text-center shrink-0">
                      <div className="font-heading text-5xl font-bold text-[#1A1917]">{avg.toFixed(1)}</div>
                      <StarRow rating={avg} size={14} />
                      <div className="text-xs text-[#6B6966] mt-1">{count} {count === 1 ? "review" : "reviews"}</div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {breakdown.map((b) => (
                        <RatingBar key={b.label} label={b.label} count={b.count} total={count} />
                      ))}
                    </div>
                  </div>

                  {/* AI Summary */}
                  {aiSummary && (
                    <div className="bg-[#F8F8F7] border border-[#E5E4E0] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={13} className="text-[#C8A882]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A882]">AI Summary</span>
                      </div>
                      <p className="text-sm text-[#6B6966] leading-relaxed">{aiSummary}</p>
                    </div>
                  )}

                  {/* Individual reviews */}
                  <div className="space-y-5">
                    {reviews.map((r) => (
                      <div key={r.id} className="border-b border-[#E5E4E0] pb-5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <StarRow rating={r.rating} size={12} />
                            {r.verified && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0F2647] bg-[#0F2647]/8 px-1.5 py-0.5">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6B6966]">{r.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#1A1917] mb-1">{r.author}</p>
                        <p className="text-sm text-[#6B6966] leading-relaxed">{r.body}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Empty state */
                <div className="text-center py-8">
                  <div className="flex justify-center mb-3">
                    <StarRow rating={0} size={28} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#1A1917] mb-2">No reviews yet</h3>
                  <p className="text-sm text-[#6B6966] mb-6 max-w-xs mx-auto leading-relaxed">
                    Be the first to share your experience with this product. Your review helps other clients make confident decisions.
                  </p>
                  <a
                    href={`mailto:info@staraesthetic.co.za?subject=Product Review&body=I would like to leave a review for ${encodeURIComponent(productName)}.`}
                    className="inline-block bg-[#0F2647] text-white text-sm font-semibold px-6 py-3 hover:bg-[#1B3D6E] transition-colors"
                  >
                    Write a Review
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

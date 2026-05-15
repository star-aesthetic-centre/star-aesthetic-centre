"use client";

import { useState, useTransition } from "react";
import { seedTreatmentsFromJson } from "./actions";

export default function SeedTreatmentsButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = () => {
    startTransition(async () => {
      const res = await seedTreatmentsFromJson();
      if (res.success) {
        setResult({ success: true, message: `${res.count} treatments synced. Refreshing…` });
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setResult({ success: false, message: res.error ?? "Unknown error" });
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <button
        onClick={handleSeed}
        disabled={isPending}
        className="bg-amber-700 text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 hover:bg-amber-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isPending ? "Syncing…" : "Sync from JSON"}
      </button>
      {result && (
        <p className={`text-xs ${result.success ? "text-emerald-700" : "text-red-600"}`}>
          {result.message}
        </p>
      )}
    </div>
  );
}

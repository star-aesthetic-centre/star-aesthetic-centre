"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Mic } from "lucide-react";

type NikiSession = {
  id: string;
  session_id: string;
  treatment_page: string | null;
  transcript: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  duration_seconds: number;
  started_at: string;
  created_at?: string;
};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NikiSessionsClient() {
  const [sessions, setSessions] = useState<NikiSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/niki-sessions?limit=150");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load");
        setSessions(data.sessions ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-sm text-[#6B6966]">Loading Niki sessions…</p>;
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        {error}
        <p className="mt-2 text-xs">
          Ensure the <code className="bg-red-100 px-1">niki_sessions</code> table exists in Supabase.
        </p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="border border-[#E5E4E0] bg-white p-12 text-center">
        <Mic className="mx-auto h-10 w-10 text-[#E2E2E6] mb-4" />
        <p className="text-[#1A1917] font-semibold">No voice sessions yet</p>
        <p className="text-sm text-[#6B6966] mt-2">
          Transcripts appear here when visitors complete a chat with Niki on the site.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((s) => {
        const open = expanded === s.id;
        const when = s.started_at || s.created_at || "";
        return (
          <article key={s.id} className="border border-[#E5E4E0] bg-white">
            <button
              type="button"
              onClick={() => setExpanded(open ? null : s.id)}
              className="w-full flex items-start justify-between gap-4 p-4 text-left hover:bg-[#F8F8F7] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-[#1A1917]">
                    {s.contact_name || s.contact_email || "Anonymous visitor"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#939EBA] border border-[#E5E4E0] px-2 py-0.5">
                    {Math.max(1, Math.round((s.duration_seconds ?? 0) / 60))} min
                  </span>
                </div>
                {s.treatment_page && (
                  <p className="text-xs text-[#939EBA] truncate mb-1">{s.treatment_page}</p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-[#6B6966]">
                  {s.contact_phone && <span>{s.contact_phone}</span>}
                  {s.contact_email && <span>{s.contact_email}</span>}
                  {when && <span>{formatWhen(when)}</span>}
                </div>
                {!open && s.transcript && (
                  <p className="mt-2 text-sm text-[#6B6966] line-clamp-2 italic">{s.transcript}</p>
                )}
              </div>
              {open ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-[#939EBA]" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-[#939EBA]" />
              )}
            </button>
            {open && (
              <div className="border-t border-[#E5E4E0] px-4 pb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#939EBA] mt-4 mb-2">
                  Full transcript
                </p>
                <pre className="whitespace-pre-wrap text-sm text-[#1A1917] leading-relaxed bg-[#F8F8F7] p-4 border border-[#E5E4E0] max-h-96 overflow-y-auto font-sans">
                  {s.transcript || "(No transcript captured)"}
                </pre>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

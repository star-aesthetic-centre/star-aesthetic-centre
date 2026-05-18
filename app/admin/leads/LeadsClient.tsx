"use client";

import { useState, useTransition } from "react";
import type { LeadRow, LeadSource, LeadStatus } from "@/lib/crm/types";
import { importLeadsCsvAction, updateLeadStatusAction } from "./actions";

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "booked", "converted", "archived"];

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  booked: "bg-indigo-100 text-indigo-800",
  converted: "bg-emerald-100 text-emerald-800",
  archived: "bg-gray-100 text-gray-600",
};

export default function LeadsClient({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | LeadSource>("all");
  const [csv, setCsv] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
    return true;
  });

  const handleStatus = (id: string, status: LeadStatus) => {
    startTransition(async () => {
      const res = await updateLeadStatusAction(id, status);
      if (res.success) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      }
    });
  };

  const handleImport = () => {
    setImportMsg("");
    startTransition(async () => {
      const res = await importLeadsCsvAction(csv);
      if (res.imported > 0) {
        setImportMsg(`Imported ${res.imported} lead(s). Refresh to see all rows.`);
        setCsv("");
        window.location.reload();
      } else {
        setImportMsg(res.errors?.[0] ?? "Import failed");
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="bg-white border border-[#E5E4E0] p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-2">
          Import older enquiries
        </h2>
        <p className="text-sm text-[#6B6966] mb-4">
          Paste CSV with header:{" "}
          <code className="text-xs bg-[#F8F8F7] px-1">
            email, first_name, last_name, phone, interest_type, interest_value, notes
          </code>
        </p>
        <textarea
          className="w-full min-h-[120px] border border-[#E5E4E0] p-3 text-sm font-mono"
          placeholder="email,first_name,last_name,phone,interest_type,interest_value&#10;jane@example.com,Jane,Smith,082...,treatment,Botox,Called back"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={isPending || !csv.trim()}
          className="mt-3 bg-[#0F2647] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {isPending ? "Importing…" : "Import CSV"}
        </button>
        {importMsg && <p className="mt-2 text-sm text-[#6B6966]">{importMsg}</p>}
      </section>

      <div className="flex flex-wrap gap-2">
        <select
          className="border border-[#E5E4E0] px-3 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border border-[#E5E4E0] px-3 py-2 text-sm"
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as typeof sourceFilter)}
        >
          <option value="all">All sources</option>
          <option value="import">Import</option>
          <option value="contact">Contact</option>
          <option value="skin_assessment">Skin assessment</option>
          <option value="booking">Booking</option>
          <option value="niki">Niki</option>
        </select>
        <span className="text-sm text-[#6B6966] self-center ml-auto">
          {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="bg-white border border-[#E5E4E0] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F8F7] text-left text-xs uppercase tracking-wider text-[#6B6966]">
            <tr>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-[#E5E4E0]">
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1A1917]">
                    {[l.first_name, l.last_name].filter(Boolean).join(" ") || "—"}
                  </p>
                  <p className="text-xs text-[#6B6966]">{l.email}</p>
                  {l.phone && <p className="text-xs text-[#939EBA]">{l.phone}</p>}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs uppercase text-[#939EBA]">{l.interest_type}</span>
                  <p className="text-[#1A1917]">{l.interest_value || "—"}</p>
                </td>
                <td className="px-4 py-3 capitalize">{l.source.replace(/_/g, " ")}</td>
                <td className="px-4 py-3">
                  <select
                    value={l.status}
                    onChange={(e) => handleStatus(l.id, e.target.value as LeadStatus)}
                    className={`text-xs font-semibold uppercase px-2 py-1 border-0 ${STATUS_COLORS[l.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-[#6B6966] whitespace-nowrap">
                  {new Date(l.created_at).toLocaleDateString("en-ZA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-[#6B6966]">No leads match this filter.</p>
        )}
      </div>
    </div>
  );
}

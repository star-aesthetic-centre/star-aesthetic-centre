import Link from "next/link";
import { listLeads } from "@/lib/crm/leads";
import LeadsClient from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { leads, error } = await listLeads();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">Leads</h1>
        <p className="mt-2 text-sm text-[#6B6966]">
          Enquiries from contact forms, skin assessments, bookings, Niki, and imported history.
        </p>
      </div>

      {error && (
        <div className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {error.includes("does not exist") || error.includes("schema")
            ? "Run scripts/output/leads-schema.sql in Supabase first."
            : error}
        </div>
      )}

      <LeadsClient initialLeads={leads} />
    </main>
  );
}

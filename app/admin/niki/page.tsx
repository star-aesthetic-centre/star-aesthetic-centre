import Link from "next/link";
import NikiSessionsClient from "./NikiSessionsClient";

export const dynamic = "force-dynamic";

export default function AdminNikiSessionsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">Niki voice transcripts</h1>
        <p className="mt-2 text-sm text-[#6B6966]">
          AI skin consultant calls from product and treatment pages. Contact details are extracted from the
          transcript when Niki confirms them.
        </p>
      </div>
      <NikiSessionsClient />
    </main>
  );
}

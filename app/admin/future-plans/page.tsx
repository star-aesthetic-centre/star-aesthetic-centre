import Link from "next/link";
import FuturePlansView from "@/components/admin/FuturePlansView";
import { FUTURE_PLANS_META } from "@/lib/admin/future-plans";

export const dynamic = "force-dynamic";

export default function AdminFuturePlansPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">{FUTURE_PLANS_META.title}</h1>
        <p className="mt-2 text-sm text-[#6B6966] max-w-2xl">
          Concerns pillar SEO, content standards, and Niki sync — structured roadmap for when the team is ready to
          build.
        </p>
      </div>
      <FuturePlansView />
    </main>
  );
}

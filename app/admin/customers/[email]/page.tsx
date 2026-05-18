import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerDetail } from "@/lib/crm/customers";
import { formatZARDetailed } from "@/lib/admin/format";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email: raw } = await params;
  const email = decodeURIComponent(raw);
  const detail = await getCustomerDetail(email);

  if (
    !detail.orders.length &&
    !detail.bookings.length &&
    !detail.loyalty &&
    !detail.leads.length &&
    !detail.profile
  ) {
    notFound();
  }

  const name =
    (detail.profile
      ? `${detail.profile.first_name} ${detail.profile.last_name}`.trim()
      : "") ||
    (detail.loyalty
      ? `${detail.loyalty.first_name} ${detail.loyalty.last_name}`.trim()
      : "") ||
    detail.orders[0]?.customer_name ||
    detail.bookings[0]?.patient_name ||
    [detail.leads[0]?.first_name, detail.leads[0]?.last_name].filter(Boolean).join(" ") ||
    email;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/admin/customers"
        className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
      >
        ← All customers
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-bold text-[#0F2647]">{name}</h1>
      <p className="text-sm text-[#6B6966]">{email}</p>

      {detail.profile && (
        <section className="mt-6 border border-[#E5E4E0] bg-white p-6 text-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F2647] mb-3">
            Saved profile
            {detail.profile.is_test && (
              <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px]">
                Test
              </span>
            )}
          </h2>
          <p>{detail.profile.phone}</p>
          <p className="mt-1 text-[#6B6966]">
            {detail.profile.address_line1}
            {detail.profile.address_line2 ? `, ${detail.profile.address_line2}` : ""}
            <br />
            {detail.profile.city}, {detail.profile.province} {detail.profile.postal_code}
          </p>
        </section>
      )}

      {detail.loyalty && (
        <section className="mt-8 bg-[#0F2647] text-white p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#C8A882] mb-2">
            Star Light Rewards
          </h2>
          <p className="text-2xl font-bold">R {detail.loyalty.balance_rands.toLocaleString("en-ZA")}</p>
          <p className="text-sm text-white/70 mt-1">
            Earned R {detail.loyalty.total_earned} · Redeemed R {detail.loyalty.total_redeemed}
          </p>
        </section>
      )}

      {detail.orders.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">Shop orders</h2>
          <ul className="space-y-2">
            {detail.orders.map((o) => (
              <li key={o.id} className="border border-[#E5E4E0] bg-white p-4 flex justify-between">
                <div>
                  <p className="font-semibold">#{o.reference}</p>
                  <p className="text-xs text-[#6B6966] capitalize">{o.status}</p>
                </div>
                <p className="font-semibold tabular-nums">{formatZARDetailed(o.total_cents)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.bookings.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">Bookings</h2>
          <ul className="space-y-2">
            {detail.bookings.map((b) => (
              <li key={b.reference} className="border border-[#E5E4E0] bg-white p-4">
                <p className="font-semibold">{b.treatment}</p>
                <p className="text-sm text-[#6B6966]">
                  {b.date} · {b.time_slot} · {b.status}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.leads.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">Lead history</h2>
          <ul className="space-y-2">
            {detail.leads.map((l) => (
              <li key={l.id} className="border border-[#E5E4E0] bg-[#F8F8F7] p-4 text-sm">
                <span className="text-xs uppercase text-[#939EBA]">{l.source}</span>
                <p className="text-[#1A1917]">
                  {l.interest_type}: {l.interest_value || "—"} · {l.status}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.nikiSessions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-4">Niki calls</h2>
          <ul className="space-y-2 text-sm text-[#6B6966]">
            {detail.nikiSessions.map((s) => (
              <li key={s.id}>
                {s.treatment_page} · {Math.round((s.duration_seconds ?? 0) / 60)}m
              </li>
            ))}
          </ul>
          <Link href="/admin/niki" className="text-xs text-[#939EBA] hover:underline mt-2 inline-block">
            View transcripts →
          </Link>
        </section>
      )}
    </main>
  );
}

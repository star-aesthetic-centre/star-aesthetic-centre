import Link from "next/link";
import { getDripBookings, type AdminDripBooking } from "@/lib/queries/drip-bookings-admin";

export const dynamic = "force-dynamic";

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function BookingRow({ b }: { b: AdminDripBooking }) {
  return (
    <tr className="border-b border-[#E5E4E0] last:border-0 align-top">
      <td className="whitespace-nowrap p-3">
        <span className="block font-semibold text-[#0F2647]">{longDate(b.date)}</span>
        <span className="block text-xs text-[#6B6966]">{b.timeLabel}</span>
      </td>
      <td className="p-3">
        <span className="block font-semibold text-[#1A1917]">{b.patientName}</span>
        <a href={`tel:${b.patientPhone.replace(/\s/g, "")}`} className="block text-xs text-[#6B6966] hover:text-[#0F2647]">
          {b.patientPhone}
        </a>
        <a href={`mailto:${b.patientEmail}`} className="block text-xs text-[#6B6966] hover:text-[#0F2647]">
          {b.patientEmail}
        </a>
      </td>
      <td className="p-3 text-sm text-[#1A1917]">{b.dripTitle}</td>
      <td className="p-3 text-xs text-[#6B6966]">{b.notes || "—"}</td>
      <td className="whitespace-nowrap p-3 text-xs text-[#6B6966]">{b.reference}</td>
    </tr>
  );
}

export default async function AdminDripBookingsPage() {
  const { upcoming, past, todayCount, upcomingCount, weekLoad, error } = await getDripBookings();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-[#6B6966] hover:text-[#0F2647]"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-[#0F2647]">Vitamin Drip Bookings</h1>
        <p className="mt-2 text-sm text-[#6B6966]">
          The drip lounge diary. Two chairs per hourly slot, 09:00–16:00 Monday to Friday and
          09:00–12:00 on Saturdays.
        </p>
      </div>

      {error && (
        <div className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {error.includes("does not exist") || error.includes("schema")
            ? "Run supabase/drip-bookings.sql in Supabase first."
            : error}
        </div>
      )}

      {/* Counters */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="border border-[#E5E4E0] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">Today</p>
          <p className="font-heading mt-1 text-3xl font-bold text-[#0F2647]">{todayCount}</p>
        </div>
        <div className="border border-[#E5E4E0] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">Upcoming</p>
          <p className="font-heading mt-1 text-3xl font-bold text-[#0F2647]">{upcomingCount}</p>
        </div>
        <div className="border border-[#E5E4E0] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966]">All time</p>
          <p className="font-heading mt-1 text-3xl font-bold text-[#0F2647]">
            {upcoming.length + past.length}
          </p>
        </div>
      </div>

      {/* Next seven days — an empty week should be obvious. */}
      <div className="mb-10 border border-[#E5E4E0] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B6966]">
          Next seven days
        </p>
        <div className="grid grid-cols-7 gap-2">
          {weekLoad.map((d) => {
            const pct = d.capacity ? Math.round((d.booked / d.capacity) * 100) : 0;
            return (
              <div key={d.date} className="text-center">
                <p className="text-[11px] font-semibold text-[#6B6966]">{longDate(d.date)}</p>
                <div className="mt-1 h-16 w-full bg-[#F4F4F2]" title={`${d.booked} of ${d.capacity} chairs`}>
                  <div
                    className="w-full bg-[#0F2647]"
                    style={{ height: `${Math.min(100, pct)}%`, marginTop: `${100 - Math.min(100, pct)}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-[#1A1917]">
                  {d.capacity === 0 ? "closed" : `${d.booked}/${d.capacity}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="font-heading mb-3 text-lg font-bold text-[#0F2647]">Upcoming</h2>
      {upcoming.length === 0 ? (
        <p className="mb-10 border border-[#E5E4E0] p-6 text-sm text-[#6B6966]">
          No upcoming drip bookings.
        </p>
      ) : (
        <div className="mb-10 overflow-x-auto border border-[#E5E4E0]">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <thead className="bg-[#F8F8F7] text-left text-xs uppercase tracking-wider text-[#6B6966]">
              <tr>
                <th className="p-3">When</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Drip</th>
                <th className="p-3">Notes</th>
                <th className="p-3">Reference</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((b) => (
                <BookingRow key={b.id} b={b} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="font-heading mb-3 text-lg font-bold text-[#0F2647]">Past</h2>
          <div className="overflow-x-auto border border-[#E5E4E0]">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <thead className="bg-[#F8F8F7] text-left text-xs uppercase tracking-wider text-[#6B6966]">
                <tr>
                  <th className="p-3">When</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Drip</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3">Reference</th>
                </tr>
              </thead>
              <tbody>
                {past.slice(0, 50).map((b) => (
                  <BookingRow key={b.id} b={b} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

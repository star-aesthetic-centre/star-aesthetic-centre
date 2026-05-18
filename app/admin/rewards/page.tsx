import { getAllAccounts } from "./actions";
import { AccountSearch, NewAccountForm } from "./RewardsClient";
import { formatRewardRands } from "@/lib/utils/rewards";

export default async function AdminRewardsPage() {
  const accounts = await getAllAccounts();

  const totalBalance = accounts.reduce((s, a) => s + a.balance_rands, 0);
  const totalEarned = accounts.reduce((s, a) => s + a.total_earned, 0);
  const totalRedeemed = accounts.reduce((s, a) => s + a.total_redeemed, 0);

  return (
    <div className="min-h-screen bg-[#F8F8F7]">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#1A1917]">Star Light Rewards</h1>
            <p className="text-sm text-[#6B6966] mt-1">{accounts.length} members · 5% earn rate (Star Lights) on treatments and products</p>
          </div>
          <NewAccountForm />
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Members", value: String(accounts.length), sub: "loyalty accounts" },
            { label: "Outstanding Balance", value: formatRewardRands(totalBalance), sub: "owed to patients" },
            { label: "Total Earned (all time)", value: formatRewardRands(totalEarned), sub: `Redeemed: ${formatRewardRands(totalRedeemed)}` },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-[#E5E4E0] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#6B6966] mb-2">{label}</p>
              <p className="font-heading text-3xl font-bold text-[#1A1917]">{value}</p>
              <p className="text-xs text-[#6B6966] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Account search + management */}
        <div className="bg-white border border-[#E5E4E0] p-6 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-[#1A1917] mb-1">Find a Patient</h2>
            <p className="text-sm text-[#6B6966]">Search by email to credit treatment rewards or process a redemption.</p>
          </div>
          <AccountSearch />
        </div>

        {/* All accounts table */}
        {accounts.length > 0 && (
          <div className="bg-white border border-[#E5E4E0] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E4E0] flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-[#1A1917]">All Members</h2>
              <span className="text-xs text-[#6B6966]">Sorted by balance</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8F8F7] border-b border-[#E5E4E0]">
                    {["Patient", "Email", "Balance", "Total Earned", "Total Redeemed", "Member Since"].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6B6966]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E4E0]">
                  {accounts.map((a, i) => (
                    <tr key={a.id} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F8F7]"}>
                      <td className="px-6 py-3 font-semibold text-[#1A1917]">{a.first_name} {a.last_name}</td>
                      <td className="px-6 py-3 text-[#6B6966]">{a.email}</td>
                      <td className="px-6 py-3 font-bold text-[#0F2647]">{formatRewardRands(a.balance_rands)}</td>
                      <td className="px-6 py-3 text-[#6B6966]">{formatRewardRands(a.total_earned)}</td>
                      <td className="px-6 py-3 text-[#6B6966]">{formatRewardRands(a.total_redeemed)}</td>
                      <td className="px-6 py-3 text-[#6B6966]">
                        {new Date(a.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

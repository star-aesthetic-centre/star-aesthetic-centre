import { ExternalLink, BarChart3 } from "lucide-react";
import type { AnalyticsStatus, Channel } from "@/lib/admin/channels";
import { formatNumber } from "@/lib/admin/format";

const STATE_STYLES: Record<Channel["state"], string> = {
  connected: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-700",
  unconfigured: "bg-[#EDEDF0] text-[#6B6966]",
};

const STATE_LABELS: Record<Channel["state"], string> = {
  connected: "Live",
  error: "Error",
  unconfigured: "Not connected",
};

export default function ChannelsPanel({
  channels,
  analytics,
}: {
  channels: Channel[];
  analytics: AnalyticsStatus;
}) {
  return (
    <section className="bg-white border border-[#E5E4E0] p-6 mb-8">
      <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F2647] mb-1">
        Channels
      </h2>
      <p className="mb-4 text-xs text-[#6B6966]">
        Follower counts come from Meta&apos;s Graph API and need a page access token. Where no
        token is configured the number is left blank rather than guessed.
      </p>

      <ul className="divide-y divide-[#F0EFEC]">
        {channels.map((c) => (
          <li key={c.key} className="flex flex-wrap items-center gap-3 py-3">
            <div className="min-w-0 flex-grow">
              <div className="flex items-center gap-2">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#0F2647] hover:underline"
                >
                  {c.label}
                </a>
                <ExternalLink className="h-3 w-3 text-[#939EBA]" aria-hidden="true" />
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATE_STYLES[c.state]}`}>
                  {STATE_LABELS[c.state]}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#939EBA]">{c.handle}</p>
              {c.context && (
                <p className="mt-1 text-xs leading-relaxed text-[#6B6966]">{c.context}</p>
              )}
              {c.note && <p className="mt-1 text-xs leading-relaxed text-[#939EBA]">{c.note}</p>}
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold text-[#0F2647]">
                {c.followers === null ? "—" : formatNumber(c.followers)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#939EBA]">followers</p>
            </div>
          </li>
        ))}

        <li className="flex flex-wrap items-center gap-3 py-3">
          <div className="min-w-0 flex-grow">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#939EBA]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#0F2647]">Google Analytics</span>
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATE_STYLES[analytics.state]}`}>
                {STATE_LABELS[analytics.state]}
              </span>
            </div>
            {analytics.propertyId && (
              <p className="mt-0.5 text-xs text-[#939EBA]">Property {analytics.propertyId}</p>
            )}
            <p className="mt-1 text-xs leading-relaxed text-[#6B6966]">{analytics.note}</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-xl font-bold text-[#0F2647]">—</p>
            <p className="text-[10px] uppercase tracking-wider text-[#939EBA]">sessions</p>
          </div>
        </li>
      </ul>
    </section>
  );
}

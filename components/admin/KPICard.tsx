import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  href?: string;
  accent?: string;
};

export default function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  href,
  accent = "bg-[#0F2647]",
}: Props) {
  const inner = (
    <>
      <div className={`h-10 w-10 ${accent} flex items-center justify-center mb-3`}>
        <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
      </div>
      <p className="font-heading text-2xl font-bold text-[#1A1917] tabular-nums">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6966] mt-1">{label}</p>
      {sub && <p className="text-[10px] text-[#939EBA] mt-1">{sub}</p>}
    </>
  );

  const className =
    "block bg-white border border-[#E5E4E0] p-5 hover:border-[#939EBA] hover:shadow-sm transition-all";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

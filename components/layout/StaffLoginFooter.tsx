import Link from "next/link";
import { Lock } from "lucide-react";

type Props = {
  className?: string;
};

/** Discrete staff / admin access */
export function StaffLoginFooter({ className = "" }: Props) {
  return (
    <div className={`mt-12 pt-8 border-t border-[#E5E4E0] ${className}`.trim()}>
      <Link
        href="/admin/login"
        className="inline-flex items-center gap-2 text-xs font-medium text-[#939EBA] hover:text-[#0F2647] transition-colors"
      >
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Staff login
      </Link>
    </div>
  );
}

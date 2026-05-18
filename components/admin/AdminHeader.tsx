"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/login/actions";

const NAV = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/treatments", label: "Treatments" },
  { href: "/admin/rewards", label: "Rewards" },
  { href: "/admin/vouchers", label: "Gift Vouchers" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-[#0F2647] text-white sticky top-0 z-30 shadow-md">
      {/* Top row */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-heading text-base font-bold tracking-wide">
            Star Aesthetic Centre
          </span>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/shop"
            target="_blank"
            className="text-xs text-white/60 hover:text-white transition-colors hidden sm:block"
          >
            View site ↗
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs border border-white/30 px-3 py-1.5 text-white/70 hover:text-white hover:border-white/60 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="flex border-t border-white/10 px-3">
        {NAV.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 ${
                active
                  ? "text-white border-[#C8A882]"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

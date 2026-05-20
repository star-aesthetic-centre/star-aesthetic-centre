"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

/** Admin shell — nav only after login (not on /admin/login) */
export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  return (
    <div className="min-h-screen bg-[#F2F1EF]">
      {!isLoginPage && <AdminHeader />}
      {children}
    </div>
  );
}

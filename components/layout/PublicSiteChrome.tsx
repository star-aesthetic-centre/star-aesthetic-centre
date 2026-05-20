"use client";

import { usePathname } from "next/navigation";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import CookieConsent from "@/components/layout/CookieConsent";

/** Public storefront chrome — hidden on /admin routes */
export function PublicSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <SiteNav />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}

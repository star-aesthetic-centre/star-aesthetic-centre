import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin protection ─────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ── Site preview password (soft-launch gate) ─────────────────────────────
  // Only active when PREVIEW_PASSWORD is set in environment variables.
  // Set PREVIEW_PASSWORD=yourword in Vercel env vars (or .env.local for local testing).
  const previewPassword = process.env.PREVIEW_PASSWORD;

  if (previewPassword) {
    // Skip: the login page itself, all API routes, Next.js internals, static assets
    const isExcluded =
      pathname === "/preview-login" ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/images/") ||
      pathname === "/favicon.ico" ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml";

    if (!isExcluded) {
      const previewSession = request.cookies.get("preview_session");
      if (previewSession?.value !== previewPassword) {
        const loginUrl = new URL("/preview-login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

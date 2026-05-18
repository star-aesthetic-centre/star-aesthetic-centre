import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Set ALLOW_SEARCH_INDEXING=true in Vercel when the site launches publicly. */
const allowSearchIndexing = process.env.ALLOW_SEARCH_INDEXING === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin protection ─────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const response = NextResponse.next();

  // Block search engines until launch (robots.txt + meta + header)
  if (!allowSearchIndexing && !pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

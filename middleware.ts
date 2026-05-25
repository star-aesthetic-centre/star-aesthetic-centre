import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Set ALLOW_SEARCH_INDEXING=true in Vercel when the site launches publicly. */
const allowSearchIndexing = process.env.ALLOW_SEARCH_INDEXING === "true";

/**
 * Site-wide password gate — pre-launch only.
 * Set SITE_PASSWORD in Vercel env vars to enable.
 * Remove (or leave blank) to open the site publicly.
 */
const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin protection ─────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ── Site password gate (pre-launch) ──────────────────────────────────────
  if (SITE_PASSWORD && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const auth = request.headers.get("authorization") ?? "";
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const password = decoded.split(":").slice(1).join(":"); // everything after first colon
      if (password === SITE_PASSWORD) {
        // Correct password — let through
        const response = NextResponse.next();
        if (!allowSearchIndexing && !pathname.startsWith("/admin")) {
          response.headers.set("X-Robots-Tag", "noindex, nofollow");
        }
        return response;
      }
    }
    // No auth or wrong password — challenge
    return new NextResponse("Password required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Star Aesthetic Centre — Coming Soon"',
      },
    });
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

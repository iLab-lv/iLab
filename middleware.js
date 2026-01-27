// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host");
  const pathname = req.nextUrl.pathname;

  // Only apply to the ads subdomain
  if (host === "serviss.ilab.lv") {
    const url = req.nextUrl.clone();
    url.pathname = `/(ads)${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Avoid running middleware on Next.js internals/static files
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};


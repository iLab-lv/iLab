import { NextResponse } from "next/server";

export function middleware(req) {
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.split(":")[0];
  const pathname = req.nextUrl.pathname;

  // Don't touch Next internals
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // On ads subdomain: rewrite clean URL -> internal /_ads URL
  if (host === "serviss.ilab.lv") {
    // Avoid double prefix if someone requests /_ads directly
    if (!pathname.startsWith("/_ads")) {
      const url = req.nextUrl.clone();
      url.pathname = `/_ads${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Optional: hide internal /_ads paths on main domain
  if (pathname.startsWith("/_ads")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

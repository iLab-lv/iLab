import { NextResponse } from "next/server";

export function middleware(req) {
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.split(":")[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const isAdsHost = host === "serviss.ilab.lv";
  const isInternalAdsPath =
    pathname === "/ads" || pathname.startsWith("/ads/");

  // 🚫 Never touch static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 🔁 Redirect ROOT of ads subdomain to main site
  if (isAdsHost && pathname === "/") {
    return NextResponse.redirect("https://ilab.lv", 301);
  }

  // ✅ Ads subdomain: rewrite clean URLs → /ads/*
  if (isAdsHost) {
    if (isInternalAdsPath) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = `/ads${pathname}`;
    return NextResponse.rewrite(url);
  }

  // 🚫 Block /ads/* on main domain
  if (isInternalAdsPath) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|robots.txt|sitemap.xml|favicon.ico).*)"],
};

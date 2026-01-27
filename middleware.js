// middleware.js (TEMP DEBUG VERSION)
import { NextResponse } from "next/server";

export function middleware(req) {
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.split(":")[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const isAdsHost = host === "serviss.ilab.lv";
  const isInternalAdsPath = pathname === "/ads" || pathname.startsWith("/ads/");

  // If on serviss subdomain: rewrite clean URL -> /ads/*
  if (isAdsHost) {
    // If already /ads/*, don't rewrite again
    if (!isInternalAdsPath) {
      const url = req.nextUrl.clone();
      url.pathname = `/ads${pathname}`;
      const res = NextResponse.rewrite(url);
      res.headers.set("x-ilab-mw-host", host);
      res.headers.set("x-ilab-mw-rewrite", `/ads${pathname}`);
      return res;
    }

    const res = NextResponse.next();
    res.headers.set("x-ilab-mw-host", host);
    res.headers.set("x-ilab-mw-rewrite", "none");
    return res;
  }

  // MAIN DOMAIN: do NOT block /ads/* (so you can test ilab.lv/ads/...)
  const res = NextResponse.next();
  res.headers.set("x-ilab-mw-host", host);
  res.headers.set("x-ilab-mw-rewrite", "none");
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.split(":")[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const isAdsHost = host === "serviss.ilab.lv";

  // Local dev convenience:
  // - If you open http://localhost:3000/ads/... it should work.
  // - If you use hosts-file and open http://serviss.ilab.lv:3000/... it should behave like production.
  const isLocalDev = host === "localhost" || host === "127.0.0.1";

  const isInternalAdsPath = pathname === "/ads" || pathname.startsWith("/ads/");

  // 1) If request comes to serviss.ilab.lv:
  //    - If it already targets /ads/*, let it pass.
  //    - Otherwise rewrite /x -> /ads/x
  if (isAdsHost) {
    if (isInternalAdsPath) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = `/ads${pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2) On main domain (and localhost), BLOCK /ads/* so it can't be accessed there.
  //    If you want /ads/* to be accessible on localhost for dev, keep localhost allowed.
  if (isInternalAdsPath) {
    if (isLocalDev) return NextResponse.next(); // dev convenience
    return new NextResponse(null, { status: 404 });
  }

  // 3) Everything else = normal site
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

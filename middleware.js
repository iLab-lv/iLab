import { NextResponse } from 'next/server';

export function middleware(req) {
  const rawHost = req.headers.get('host') || '';
  const host = rawHost.split(':')[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const isRigaHost = host === 'riga.ilab.lv';
  const isInternalAdsPath =
    pathname === '/ads' || pathname.startsWith('/ads/');

  // 🚫 Never touch static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  /**
   * =========================
   * riga.ilab.lv behavior
   * =========================
   */

  // ✅ Root of riga.ilab.lv → ads landing
  if (isRigaHost && pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/ads/servisa-centri';
    return NextResponse.rewrite(url);
  }

  // ✅ Any path on riga.ilab.lv → /ads/*
  if (isRigaHost) {
    if (isInternalAdsPath) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = `/ads${pathname}`;
    return NextResponse.rewrite(url);
  }

  /**
   * =========================
   * ilab.lv (main domain)
   * =========================
   */

  // 🚫 Optional: block direct access to /ads/* on main domain
  // (recommended once ads are stable)
  /*
  if (isInternalAdsPath) {
    return new NextResponse(null, { status: 404 });
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|robots.txt|sitemap.xml|favicon.ico).*)'],
};

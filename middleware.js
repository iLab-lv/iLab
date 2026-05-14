import { NextResponse } from 'next/server';

export function middleware(req) {
  const rawHost = req.headers.get('host') || '';
  const host = rawHost.split(':')[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const isAdsPreview =
    req.nextUrl.searchParams.get('ads') === '1';

  const isRigaHost =
    host === 'riga.ilab.lv' || isAdsPreview;

  const isInternalAdsPath =
    pathname === '/ads' || pathname.startsWith('/ads/');

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

  if (isRigaHost) {
    const url = req.nextUrl.clone();
    url.pathname = '/ads';
    return NextResponse.rewrite(url);
  }

  if (isInternalAdsPath) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|robots.txt|sitemap.xml|favicon.ico).*)'],
};

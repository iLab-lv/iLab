import { NextResponse } from 'next/server';

export function middleware(req) {
  const rawHost = req.headers.get('host') || '';
  const host = rawHost.split(':')[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  const isAdsPreview = req.nextUrl.searchParams.get('ads') === '1';

  const isRigaHost = host === 'riga.ilab.lv' || isAdsPreview;

  const isInternalAdsPath =
    pathname === '/ads' || pathname.startsWith('/ads/');

  /*
    Important:
    This must be BEFORE isPublicAsset,
    because /robots.txt contains a dot.
  */
  if (pathname === '/robots.txt' && isRigaHost) {
    const url = req.nextUrl.clone();

    /*
      Browser URL stays:
      https://riga.ilab.lv/robots.txt

      Internally served from:
      public/ads-robots.txt
    */
    url.pathname = '/ads-robots.txt';

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.');

  if (isPublicAsset) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isRigaHost) {
    const url = req.nextUrl.clone();
    url.pathname = '/ads';

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isInternalAdsPath) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|sitemap.xml|favicon.ico).*)'],
};
// Typography ownership only. This does not redirect, rewrite, or resolve routes.
export function usesServiceTypography(pathname = '/', { advertising = false } = {}) {
  if (advertising) return false;
  const path = pathname.replace(/\/+$/, '') || '/';
  if (/^\/(?:admin|api|ads|adsV2|adsV3|landings|shop|temp|_next)(?:\/|$)/.test(path)) return false;
  if (['/iphone-remonts-riga', '/iphone-baterijas-maina'].includes(path)) return false;
  return !path.includes('.');
}

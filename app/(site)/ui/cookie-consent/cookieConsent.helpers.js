export const COOKIE_CONSENT_NAME = 'ilab_cookie_consent';
export const COOKIE_CONSENT_ACCEPTED = 'accepted';
export const COOKIE_CONSENT_REJECTED = 'rejected';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function getCookieConsent() {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const consentCookie = cookies.find((cookie) =>
    cookie.startsWith(`${COOKIE_CONSENT_NAME}=`)
  );

  if (!consentCookie) return null;

  return consentCookie.split('=')[1] || null;
}

export function setCookieConsent(value) {
  if (typeof document === 'undefined') return;

  document.cookie = [
    `${COOKIE_CONSENT_NAME}=${value}`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    'Path=/',
    'SameSite=Lax',
  ].join('; ');
}
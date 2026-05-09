'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

import {
  COOKIE_CONSENT_ACCEPTED,
  getCookieConsent,
} from './cookieConsent.helpers';

const GA_MEASUREMENT_ID = 'G-KYDSG504F8';

export default function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncConsent() {
      setEnabled(getCookieConsent() === COOKIE_CONSENT_ACCEPTED);
    }

    syncConsent();

    window.addEventListener('ilab-cookie-consent-change', syncConsent);

    return () => {
      window.removeEventListener('ilab-cookie-consent-change', syncConsent);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga4-init-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
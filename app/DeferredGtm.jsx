'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-K8C3GNKB';
const SCRIPT_ID = 'gtm-base';

function injectGtm() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.getElementById(SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const firstScript = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');

  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

  firstScript?.parentNode?.insertBefore(script, firstScript);
}

export default function DeferredGtm() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      injectGtm();
    };

    const events = ['pointerdown', 'keydown', 'touchstart'];
    const cleanup = () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, load);
      });
    };

    events.forEach((eventName) => {
      window.addEventListener(eventName, load, { passive: true, once: true });
    });

    return cleanup;
  }, []);

  return null;
}

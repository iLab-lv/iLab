'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-K8C3GNKB';
const SCRIPT_ID = 'gtm-base';
const LOAD_DELAY_MS = 7000;

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
    let timer;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      injectGtm();
    };

    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((eventName) => {
        window.removeEventListener(eventName, load);
      });
    };

    events.forEach((eventName) => {
      window.addEventListener(eventName, load, { passive: true, once: true });
    });

    timer = window.setTimeout(load, LOAD_DELAY_MS);

    return cleanup;
  }, []);

  return null;
}

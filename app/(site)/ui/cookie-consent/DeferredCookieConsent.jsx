'use client';

import dynamic from 'next/dynamic';

import DeferredClientWidget from '../deferred/DeferredClientWidget';

const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false });

export default function DeferredCookieConsent(props) {
  return (
    <DeferredClientWidget>
      <CookieConsent {...props} />
    </DeferredClientWidget>
  );
}

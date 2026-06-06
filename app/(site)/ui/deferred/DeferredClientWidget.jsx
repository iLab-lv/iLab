'use client';

import { useEffect, useState } from 'react';

function scheduleIdle(callback) {
  if (typeof window === 'undefined') return undefined;

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1800 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, 1200);
  return () => window.clearTimeout(id);
}

export default function DeferredClientWidget({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => scheduleIdle(() => setReady(true)), []);

  return ready ? children : null;
}

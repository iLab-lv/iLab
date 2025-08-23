'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Mounts children into one of two DOM nodes depending on screen size:
 * - mobileTargetId  -> used when matchMedia('(max-width: 768px)') is true
 * - desktopTargetId -> used otherwise
 */
export default function ResponsivePortal({
  mobileTargetId,
  desktopTargetId,
  children,
  query = '(max-width: 768px)',
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener?.('change', handler);
    setMounted(true);
    return () => mql.removeEventListener?.('change', handler);
  }, [query]);

  const targetEl = useMemo(() => {
    const id = isMobile ? mobileTargetId : desktopTargetId;
    return typeof document !== 'undefined' ? document.getElementById(id) : null;
  }, [isMobile, mobileTargetId, desktopTargetId]);

  if (!mounted || !targetEl) return null;
  return createPortal(children, targetEl);
}

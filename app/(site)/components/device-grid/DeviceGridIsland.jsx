'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import s from './DeviceGrid.module.scss';

const DeviceGrid = dynamic(() => import('./DeviceGrid'), { ssr: false });

export default function DeviceGridIsland({ children, ...props }) {
  const rootRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;

    const node = rootRef.current;
    if (!node) return undefined;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={rootRef}>
      {shouldLoad ? <DeviceGrid {...props} /> : children || <div className={s.emptyAll}>Loading...</div>}
    </div>
  );
}

'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { startServiceMotion } from './serviceMotionRuntime';
import { startNavigationMotion } from './serviceNavigationMotion';
import { useUiDialogs } from './ui/providers/UiDialogsProvider';
import s from './ServiceMotion.module.scss';

// Only mounted by the service layout; advertising and shop layouts never opt in.
export default function ServiceMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const dialogs = useUiDialogs();
  const dialogsRef = useRef(dialogs);
  useLayoutEffect(() => { dialogsRef.current = dialogs; });
  useLayoutEffect(() => {
    const root = document.querySelector('[data-service-redesign]');
    return startNavigationMotion(root, href => router.push(href), () => {
      const api = dialogsRef.current;
      api.closeBook(); api.closeContact(); api.closeLocator(); api.setNavigationOpen(false);
    });
  }, [router, pathname]);
  useLayoutEffect(() => {
    const root = document.querySelector('[data-service-redesign]');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};
    const restart = () => {
      stop();
      if (!media.matches && new URLSearchParams(location.search).get('motion') !== 'off') {
        stop = startServiceMotion(root);
      }
    };
    restart();
    media.addEventListener('change', restart);
    return () => { stop(); media.removeEventListener('change', restart); };
  }, [pathname]);
  return <><i className={s.shutter} data-page-shutter aria-hidden="true" /><i className={s.scan} data-page-scan aria-hidden="true" /></>;
}

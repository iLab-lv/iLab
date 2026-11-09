'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import s from './NavigationRulers.module.scss';

const clamp = value => Math.max(0, Math.min(1, value));
function scrollToPosition(top) {
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

// Use actual rendered elements, including sections without IDs; never create page anchors.
export function getRulerSections(main) {
  const home = main.querySelector('[data-homepage]');
  const elements = home
    ? [...home.querySelectorAll(':scope > section')]
    : [...main.querySelectorAll('section')].filter(element => !element.parentElement.closest('section'));
  // Error/utility content without semantic sections must not gain ruler controls.
  if (!elements.length) return [];
  const heading = main.querySelector('h1');
  if (!home && heading && !elements.some(element => element.contains(heading))) elements.unshift(heading);
  return elements.filter(element => element.getClientRects().length && !element.closest('[hidden], [inert], [aria-hidden="true"]'))
    .map(element => ({
      element,
      title: (element.querySelector('h1,h2')?.textContent || element.getAttribute('aria-label') || (element === heading ? heading.textContent : '')).trim(),
    })).filter(section => home || section.title);
}

export default function NavigationRulers() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/ru') ? 'ru' : 'lv';
  const { navigationOpen, locatorOpen, contactOpen, bookOpen } = useUiDialogs();
  const blocked = navigationOpen || locatorOpen || contactOpen || bookOpen;
  const [page, setPage] = useState({ pathname: null, sections: [] });
  const [active, setActive] = useState(0);
  const right = useRef(null);
  const range = useRef(null);
  const sections = page.pathname === pathname ? page.sections : [];

  useEffect(() => {
    const main = document.getElementById('main');
    if (!main) return;
    const media = window.matchMedia('(min-width: 1280px)');
    let stop = () => {};
    const connect = () => {
      stop();
      setPage({ pathname, sections: [] });
      if (!media.matches) return;
      let frame, targets = [], positions = [], maximum = 0, current = -1;
      let measure = true, discover = true;
      const update = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (discover) {
            const next = getRulerSections(main);
            if (next.length !== targets.length || next.some((target, i) => target.element !== targets[i].element || target.title !== targets[i].title)) {
              targets = next;
              setPage({ pathname, sections: targets });
            }
            discover = false;
          }
          if (measure) {
            positions = targets.map(target => target.element.getBoundingClientRect().top + window.scrollY - 71);
            maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            measure = false;
          }
          const progress = maximum ? clamp(window.scrollY / maximum) : 0;
          right.current?.style.setProperty('--progress', progress);
          if (range.current) range.current.value = String(Math.round(progress * 100));
          let index = 0;
          positions.forEach((top, i) => { if (top <= window.scrollY + 3) index = i; });
          if (index !== current) { current = index; setActive(index); }
        });
      };
      const refresh = () => { measure = true; discover = true; update(); };
      const resize = new ResizeObserver(refresh);
      resize.observe(main);
      resize.observe(document.body);
      const mutation = new MutationObserver(refresh);
      mutation.observe(main, { childList: true, subtree: true });
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', refresh);
      refresh();
      stop = () => {
        resize.disconnect();
        mutation.disconnect();
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', refresh);
        cancelAnimationFrame(frame);
      };
    };
    media.addEventListener('change', connect);
    connect();
    return () => { stop(); media.removeEventListener('change', connect); };
  }, [pathname]);

  return <div className={s.rulers} data-service-rulers hidden={blocked || !sections.length} inert={blocked}>
    <RulerControls locale={locale} sections={sections} active={active} rightRef={right} rangeRef={range} />
  </div>;
}

export function RulerControls({ locale, sections, active, progress, rightRef, rangeRef, navLabel }) {
  const sectionLabel = locale === 'ru' ? 'Раздел' : 'Sadaļa';
  return <>
    <nav className={s.rail + ' ' + s.railLeft} aria-label={navLabel || (locale === 'ru' ? 'Разделы страницы' : 'Lapas sadaļas')}>
      <div className={s.railSections}>
        {sections.map((section, index) => <button
          key={index}
          type="button"
          style={{ top: (sections.length > 1 ? index / (sections.length - 1) * 100 : 0) + '%' }}
          aria-current={index === active ? 'location' : undefined}
          aria-label={sectionLabel + ' ' + (index + 1) + ': ' + section.title}
          onClick={() => {
            const element = section.element || document.getElementById(section.id);
            if (element?.isConnected) scrollToPosition(element.getBoundingClientRect().top + window.scrollY - 71);
          }}
        >{String(index + 1).padStart(2, '0')}<span>{section.title}</span></button>)}
        {sections.slice(1).map((_, index) => <i className={s.railSegment} key={index} aria-hidden="true" style={{
          top: 'calc(' + index / (sections.length - 1) * 100 + '% + 18px)',
          bottom: 'calc(' + (100 - (index + 1) / (sections.length - 1) * 100) + '% + 18px)',
        }}><i /><i /><i /></i>)}
      </div>
    </nav>
    <div ref={rightRef} className={s.rail + ' ' + s.railRight} style={progress === undefined ? undefined : { '--progress': progress }}>
      <div className={s.railRuler}>
        {Array.from({ length: 41 }, (_, index) => <i style={{ top: index / 40 * 100 + '%' }} key={index} aria-hidden="true" />)}
        <input ref={rangeRef} type="range" min="0" max="100" step="1" value={progress === undefined ? undefined : Math.round(progress * 100)} defaultValue={progress === undefined ? "0" : undefined}
          aria-label={locale === 'ru' ? 'Прокрутка страницы, проценты' : 'Lapas ritināšana, procenti'}
          aria-orientation="vertical"
          onChange={event => scrollToPosition(Number(event.target.value) / 100 * (document.documentElement.scrollHeight - window.innerHeight))}
        />
      </div>
      <i className={s.railMarker} aria-hidden="true" />
      <div className={s.railScale} aria-hidden="true"><span>100</span><span>50</span><span>0</span></div>
    </div>
  </>;
}

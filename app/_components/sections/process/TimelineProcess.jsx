'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './ServiceProcess.module.scss';

export default function TimelineProcess({ steps, headingLevel = 3 }) {
  const list = useRef(null);
  const [active, setActive] = useState(0);
  const Heading = headingLevel === 4 ? 'h4' : 'h3';
  useLayoutEffect(() => {
    const element = list.current;
    const measure = () => {
      const markers = [...element.querySelectorAll('[data-process-marker]')];
      // Layout offsets exclude the entrance transforms applied by ServiceMotion.
      const center = marker => marker.parentElement.offsetTop + marker.offsetTop + marker.offsetHeight / 2;
      element.style.setProperty('--rail-start', `${center(markers[0])}px`);
      element.style.setProperty('--rail-end', `${element.offsetHeight - center(markers.at(-1))}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    let disposed = false;
    document.fonts?.ready.then(() => { if (!disposed) measure(); });
    measure();
    return () => { disposed = true; observer.disconnect(); };
  }, [steps]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      if (media.matches) { setActive(-1); return; }
      frame = requestAnimationFrame(() => {
        let current = 0;
        [...list.current.children].forEach((step, index) => {
          if (step.getBoundingClientRect().top < innerHeight * .45) current = index;
        });
        setActive(current);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    media.addEventListener('change', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      media.removeEventListener('change', update);
    };
  }, [steps]);
  return <ol ref={list} className={s.timeline} data-process-timeline data-motion-skip>
    {steps.map((step, index) => <li key={index} data-rise="process" aria-current={index === active ? 'step' : undefined}>
      <span className={s.marker} data-process-marker aria-hidden="true">{index + 1}</span>
      <div className={s.stepContent}><Heading>{step.title}</Heading>{step.text && <p>{step.text}</p>}</div>
    </li>)}
  </ol>;
}

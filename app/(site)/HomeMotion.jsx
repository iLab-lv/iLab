'use client';

import { useEffect, useRef, useState } from 'react';
import s from './HomePage.module.scss';
import { RulerControls } from './ui/navigation-rulers/NavigationRulers';
const clamp = value => Math.max(0, Math.min(1, value));

// Compatibility for the protected AdsV2 consumer; Service pages use the layout owner.
export function HomeMotion({
  locale
}) {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const home = document.querySelector('[data-homepage]');
    if (!home) return;
    const elements = [...home.querySelectorAll(':scope > section')];
    setSections(elements.map(section => ({
      id: section.id,
      title: section.querySelector('h1,h2')?.textContent || section.getAttribute('aria-label') || ''
    })));
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maximum = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(maximum > 0 ? clamp(window.scrollY / maximum) : 0);
        let index = 0;
        elements.forEach((section, i) => {
          if (section.getBoundingClientRect().top <= 74) index = i;
        });
        setActive(index);
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(home);
    window.addEventListener('scroll', update, {
      passive: true
    });
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, [locale]);
  return <RulerControls locale={locale} sections={sections} active={active} progress={progress}
    navLabel={locale === 'ru' ? 'Разделы главной страницы' : 'Sākumlapas sadaļas'} />;
}
export function HomeProcess({
  steps
}) {
  const stage = useRef(null),
    process = useRef(null);
  const [progress, setProgress] = useState(0);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const element = process.current,
      scene = stage.current;
    if (!element || !scene) return;
    let frame;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const r = scene.getBoundingClientRect();
        setProgress(clamp((innerHeight * (desktop ? 0.2 : 0.7) - r.top) / (desktop ? 720 : r.height + innerHeight * 0.2)));
      });
    };
    const observer = new ResizeObserver(() => {
      measure();
      update();
    });
    observer.observe(element);
    window.addEventListener('scroll', update, {
      passive: true
    });
    window.addEventListener('resize', update);
    measure();
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));
  return <div
    className={s.processStage}
    ref={stage}
    style={{
      '--process-height': height ? height + 'px' : undefined
    }}
  >
    <div className={s.process} ref={process}>
      <div className={s.processTrack} aria-hidden="true">
        <i style={{
          top: 'calc(' + progress + ' * (100% - 48px))'
        }} />
      </div>
      <ol>
        {steps.map((step, index) => <li className={index === active ? s.processActive : ''} key={step.title}>
          <span>
            {index + 1}
          </span>
          <h3>
            {step.title}
          </h3>
          <p>
            {step.text}
          </p>
        </li>)}
      </ol>
    </div>
  </div>;
}

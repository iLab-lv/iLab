'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { getPriorityCount, moveItemsToMore } from './priorityNavigation';
import { useUiDialogs } from '../providers/UiDialogsProvider';

import { hasChildren, isNavItemActive } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function DesktopNav({ items, pathname, adaptive = false }) {
  const { serviceRedesign, locale } = useUiDialogs();
  const [openKey, setOpenKey] = useState(null);
  const navRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const regularItems = items.filter((item) => item.key !== 'more');
  const moreItem = items.find((item) => item.key === 'more');

  useLayoutEffect(() => {
    if (!adaptive || !moreItem) return;
    const nav = navRef.current;
    let frame;
    let disposed = false;
    const measure = () => {
      const widths = [...nav.children].map((element) => element.getBoundingClientRect().width);
      const style = getComputedStyle(nav);
      const available = nav.clientWidth - parseFloat(style.paddingLeft || 0) - parseFloat(style.paddingRight || 0);
      setVisibleCount(getPriorityCount(widths.slice(0, -1), widths.at(-1) || 0, available));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    [...nav.children].forEach((element) => observer.observe(element));
    document.fonts?.ready.then(() => { if (!disposed) schedule(); });
    document.fonts?.addEventListener('loadingdone', schedule);
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts?.removeEventListener('loadingdone', schedule);
    };
  }, [adaptive, items, moreItem]);

  const renderedItems = adaptive && moreItem
    ? [...regularItems, { ...moreItem, children: moveItemsToMore(regularItems.slice(visibleCount), moreItem.children) }]
    : items;

  return (
    <nav ref={navRef} className={s.nav} aria-label={serviceRedesign && locale === 'ru' ? 'Главная навигация' : 'Galvenā navigācija'}>
      {renderedItems.map((item, index) => {
        const overflow = adaptive && item.key !== 'more' && index >= visibleCount;
        const slug = item.key;
        const topActive = isNavItemActive(pathname, item.href);

        if (!hasChildren(item)) {
          return (
            <Link
              key={slug}
              data-priority-hidden={overflow || undefined}
              aria-hidden={overflow || undefined}
              tabIndex={overflow ? -1 : undefined}
              href={item.href}
              className={`${s.navItem} ${topActive ? s.active : ''}`}
              aria-current={topActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        }

        const panelId = `nav-dd-${slug}`;

        return (
          <div key={slug} className={s.ddWrap} data-priority-hidden={overflow || undefined} inert={overflow ? true : undefined}
            data-open={serviceRedesign ? openKey === slug : undefined}
            onMouseEnter={serviceRedesign ? () => setOpenKey(slug) : undefined}
            onMouseLeave={serviceRedesign ? (event) => { if (!event.currentTarget.contains(document.activeElement)) setOpenKey(null); } : undefined}
            onFocusCapture={serviceRedesign ? () => setOpenKey(slug) : undefined}
            onBlurCapture={serviceRedesign ? (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenKey(null); } : undefined}
            onKeyDown={serviceRedesign ? (event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                event.currentTarget.querySelector('a, button')?.focus();
                setOpenKey(null);
              } else if (event.key === 'ArrowDown' && event.target === event.currentTarget.firstElementChild) {
                event.preventDefault();
                setOpenKey(slug);
                requestAnimationFrame(() => document.getElementById(panelId)?.querySelector('a')?.focus());
              }
            } : undefined}
          >
            {item.menuOnly ? (
              <button
                type="button"
                className={`${s.navItem} ${s.navParent}`}
                aria-haspopup="true"
                aria-controls={panelId}
                aria-expanded={serviceRedesign ? openKey === slug : undefined}
                onClick={serviceRedesign ? () => setOpenKey(slug) : undefined}
              >
                {item.label}
                <span className={s.chev} aria-hidden>›</span>
              </button>
            ) : (
              <Link
                href={item.href}
                className={`${s.navItem} ${s.navParent} ${topActive ? s.active : ''}`}
                aria-haspopup="true"
                aria-controls={panelId}
                aria-expanded={serviceRedesign ? openKey === slug : undefined}
                aria-current={topActive ? 'page' : undefined}
              >
                {item.label}
                <span className={s.chev} aria-hidden>›</span>
              </Link>
            )}

            <div id={panelId} className={s.dropdown}>
              <ul className={s.menuCol}>
                {item.children.map((child) => {
                  const subActive = isNavItemActive(pathname, child.href);

                  return (
                    <li key={`${slug}__${child.key}`}>
                      <Link
                        href={child.href}
                        className={`${s.menuLink} ${subActive ? s.active : ''}`}
                        aria-current={subActive ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

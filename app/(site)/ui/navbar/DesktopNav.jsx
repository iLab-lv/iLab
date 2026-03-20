'use client';

import Link from 'next/link';
import { hasChildren, isNavItemActive } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function DesktopNav({
  items,
  pathname,
  navRef,
  openSlug,
  setOpenSlug,
  leaveT,
}) {
  return (
    <nav className={s.nav} aria-label="Galvenā navigācija" ref={navRef}>
      {items.map((item) => {
        const slug = item.key;
        const topActive = isNavItemActive(pathname, item.href);

        if (!hasChildren(item)) {
          return (
            <Link
              key={slug}
              href={item.href}
              className={`${s.navItem} ${topActive ? s.active : ''}`}
              aria-current={topActive ? 'page' : undefined}
              onClick={() => setOpenSlug(null)}
            >
              {item.label}
            </Link>
          );
        }

        const panelId = `nav-dd-${slug}`;
        const panelOpen = openSlug === slug;

        return (
          <div
            key={slug}
            className={s.ddWrap}
            onMouseEnter={() => {
              clearTimeout(leaveT.current);
              setOpenSlug(slug);
            }}
            onMouseLeave={() => {
              clearTimeout(leaveT.current);
              leaveT.current = setTimeout(() => setOpenSlug(null), 120);
            }}
          >
            <Link
              href={item.href}
              className={`${s.navItem} ${s.navParent} ${topActive ? s.active : ''}`}
              aria-haspopup="true"
              aria-expanded={panelOpen}
              aria-controls={panelId}
              aria-current={topActive ? 'page' : undefined}
              onFocus={() => setOpenSlug(slug)}
              onClick={(e) => {
                if (!panelOpen) {
                  e.preventDefault();
                  setOpenSlug(slug);
                }
              }}
            >
              {item.label}
              <span className={s.chev} aria-hidden>
                ›
              </span>
            </Link>

            <div
              id={panelId}
              className={`${s.dropdown} ${panelOpen ? s.open : ''}`}
              aria-hidden={!panelOpen}
              inert={!panelOpen}
            >
              <ul className={s.menuCol}>
                {item.children.map((child) => {
                  const subActive = isNavItemActive(pathname, child.href);

                  return (
                    <li key={`${slug}__${child.key}`}>
                      <Link
                        href={child.href}
                        className={`${s.menuLink} ${subActive ? s.active : ''}`}
                        aria-current={subActive ? 'page' : undefined}
                        onClick={() => setOpenSlug(null)}
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
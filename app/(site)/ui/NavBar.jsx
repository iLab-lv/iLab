'use client';

import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import s from './NavBar.module.scss';

/* ---------- data (locator) ---------- */
const LOCATIONS = [
  { id: 'domina', label: 'Domina', tel: '+37123370088', wa: 'https://wa.me/37123370088', maps: 'https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga' },
  { id: 'spice',  label: 'Spice',  tel: '+37120887787', wa: 'https://wa.me/37120887787', maps: 'https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga' },
];

/* ---------- SEO nav (Option B) ---------- */
const NAV = [
  { label: 'iPhone remonts', href: '/iphone-remonts' },
  {
    label: 'Telefonu remonts',
    href: '/telefonu-remonts',
    children: [
      { label: 'Samsung', href: '/telefonu-remonts/samsung' },
      { label: 'Huawei',  href: '/telefonu-remonts/huawei' },
      { label: 'OnePlus', href: '/telefonu-remonts/oneplus' },
    ],
  },
  { label: 'Planšetdatoru remonts', href: '/plansetdatoru-remonts' }, // children later
  { label: 'Datoru remonts',        href: '/datoru-remonts' },        // children later
  { label: 'Dyson remonts',         href: '/dyson-remonts' },
];

export default function NavBar() {
  /* ---------- location ---------- */
  const [locId, setLocId] = useState(LOCATIONS[0].id);
  const loc = useMemo(() => LOCATIONS.find(l => l.id === locId) ?? LOCATIONS[0], [locId]);

  /* ---------- desktop dropdown state ---------- */
  const [openSlug, setOpenSlug] = useState(null); // e.g., 'telefonu-remonts'
  const [locOpen, setLocOpen] = useState(false);
  const leaveT = useRef(null);

  /* ---------- mobile state ---------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);
  const [drawerLocOpen, setDrawerLocOpen] = useState(false);

  /* ---------- refs ---------- */
  const navRef = useRef(null);
  const locRef = useRef(null);

  /* esc to close */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenSlug(null);
        setLocOpen(false);
        setMobileOpen(false);
        setMobileExpandedSlug(null);
        setDrawerLocOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* outside click close (dropdowns + locator) */
  useEffect(() => {
    const onClick = (e) => {
      const inNav = navRef.current && navRef.current.contains(e.target);
      const inLoc = locRef.current && locRef.current.contains(e.target);
      if (!inNav) setOpenSlug(null);
      if (!inLoc) setLocOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* clear hover delay on unmount */
  useEffect(() => () => clearTimeout(leaveT.current), []);

  const hasChildren = (item) => Array.isArray(item.children) && item.children.length > 0;

  return (
    <Fragment>
      <header className={s.header} role="banner">
        <div className={s.container}>
          {/* brand */}
          <div className={s.brand}>
            <Link href="/" className={s.brandLink} aria-label="iLab sākumlapa">
              <img
                src="/brand/logo.svg"
                alt="iLab"
                className={s.logo}
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* desktop nav */}
          <nav className={s.nav} aria-label="Galvenā navigācija" ref={navRef}>
            {NAV.map((item) => {
              const slug = item.href.replace(/^\//, '');
              if (!hasChildren(item)) {
                return (
                  <Link key={slug} href={item.href} className={s.navItem}>
                    {item.label}
                  </Link>
                );
              }

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
                    className={`${s.navItem} ${s.navParent}`}
                    aria-haspopup="menu"
                    aria-expanded={openSlug === slug}
                    onClick={(e) => {
                      // allow click-to-open; navigate on second click
                      if (openSlug !== slug) {
                        e.preventDefault();
                        setOpenSlug(slug);
                      }
                    }}
                  >
                    {item.label}
                    <span className={s.chev} aria-hidden>›</span>
                  </Link>

                  <div
                    className={`${s.dropdown} ${openSlug === slug ? s.open : ''}`}
                    role="menu"
                    aria-hidden={openSlug !== slug}
                  >
                    <ul className={s.menuCol}>
                      {item.children.map((child) => (
                        <li key={`${slug}__${child.href}`}>
                          <Link
                            href={child.href}
                            className={s.menuLink}
                            onClick={() => setOpenSlug(null)}
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* right actions */}
          <div className={s.actions}>
            {/* group: hamburger + locator + utility slot */}
            <div className={s.actionsCluster} ref={locRef}>
              {/* hamburger (mobile only) */}
              <button
                type="button"
                className={s.hamburger}
                aria-label="Atvērt izvēlni"
                aria-expanded={mobileOpen}
                onClick={() => {
                  setMobileOpen(v => !v);
                  setOpenSlug(null);
                  setLocOpen(false);
                }}
              >
                ☰
              </button>

              {/* locator (link-styled, not a button chrome) */}
              <button
                type="button"
                className={s.locator}
                aria-haspopup="menu"
                aria-expanded={locOpen}
                onClick={() => {
                  setLocOpen(v => !v);
                  setOpenSlug(null);
                }}
              >
                <span className={s.icon} aria-hidden>📍</span>
                <span className={s.caption}>Atrast filiāli</span>
              </button>

              {/* utility slot (Language switcher mounts here on mobile) */}
              <div id="topbar-right-utility" className={s.slotUtility} />
            </div>

            {/* primary slot (Sazināties mounts here on desktop) */}
            <div id="topbar-right-primary" className={s.slotPrimary} />
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div className={`${s.mobileMenu} ${mobileOpen ? s.open : ''}`} aria-hidden={!mobileOpen}>
        <nav className={s.mobileInner} aria-label="Mobilā navigācija">
          {NAV.map((item) => {
            const slug = item.href.replace(/^\//, '');
            const expanded = mobileExpandedSlug === slug;
            const itemHasChildren = hasChildren(item);

            if (!itemHasChildren) {
              return (
                <Link
                  key={slug}
                  href={item.href}
                  className={s.drawerItem}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={slug} className={s.drawerGroup}>
                <button
                  type="button"
                  className={`${s.drawerItem} ${s.emph}`}
                  aria-expanded={expanded}
                  onClick={() => setMobileExpandedSlug(expanded ? null : slug)}
                >
                  {item.label}
                </button>
                {expanded && (
                  <div className={s.drawerSubmenu}>
                    {item.children.map((child) => (
                      <Link
                        key={`${slug}__${child.href}`}
                        href={child.href}
                        className={s.drawerItem}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Locator quick switch */}
          <button
            type="button"
            className={s.drawerItem}
            aria-expanded={drawerLocOpen}
            onClick={() => setDrawerLocOpen(v => !v)}
          >
            📍 Atrast filiāli
          </button>
          {drawerLocOpen && (
            <div className={s.drawerSubmenu}>
              {LOCATIONS.map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={`${s.quick} ${l.id === locId ? s.active : ''}`}
                  onClick={() => setLocId(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>
    </Fragment>
  );
}

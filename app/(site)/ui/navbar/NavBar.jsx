'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import s from './NavBar.module.scss';

import LanguageSwitcher from '../controls/LanguageSwitcher';
import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';
import { useUiDialogs } from '../providers/UiDialogsProvider';

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
  { label: 'Planšetdatoru remonts', href: '/plansetdatoru-remonts' },
  { label: 'Datoru remonts',        href: '/datoru-remonts' },
  { label: 'Dyson remonts',         href: '/dyson-remonts' },
];

export default function NavBar() {
  const [openSlug, setOpenSlug] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);

  const navRef = useRef(null);
  const leaveT = useRef(null);

  const {
    locatorOpen, contactOpen,
    openLocator, openContact,
  } = useUiDialogs();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenSlug(null);
        setMobileOpen(false);
        setMobileExpandedSlug(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const inNav = navRef.current && navRef.current.contains(e.target);
      if (!inNav) setOpenSlug(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

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

          {/* desktop nav (≥1360px) */}
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
              const panelId = `nav-dd-${slug}`;
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
                    aria-haspopup="true"
                    aria-expanded={openSlug === slug}
                    aria-controls={panelId}
                    onFocus={() => setOpenSlug(slug)}
                    onClick={(e) => {
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
                    id={panelId}
                    className={`${s.dropdown} ${openSlug === slug ? s.open : ''}`}
                    aria-hidden={openSlug !== slug}
                  >
                    <ul className={s.menuCol}>
                      {item.children.map((child) => (
                        <li key={`${slug}__${child.href}`}>
                          <Link
                            href={child.href}
                            className={s.menuLink}
                            onClick={() => setOpenSlug(null)}
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
            <div className={s.actionsCluster}>
              {/* TABLET & DESKTOP (≥768px): locator + sazinaties (full buttons) */}
              <div className={s.ctasTabletDesktop}>
                <Button
                  variant="ghost"
                  size="md"
                  leadingIcon={LocationPin}
                  aria-haspopup="dialog"
                  aria-controls="locator-panel"
                  aria-expanded={locatorOpen}
                  onClick={(e) => openLocator(e.currentTarget)}
                  title="Servisa centri"
                >
                  Servisa centri
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  aria-haspopup="dialog"
                  aria-controls="sazinaties-panel"
                  aria-expanded={contactOpen}
                  onClick={(e) => openContact(e.currentTarget)}
                >
                  Sazināties
                </Button>
              </div>

              {/* MOBILE (<768px): locator icon only (Sazināties moves to BottomBar) */}
              <button
                type="button"
                className={s.iconBtn}
                aria-haspopup="dialog"
                aria-controls="locator-panel"
                aria-expanded={locatorOpen}
                onClick={(e) => {
                  if (mobileOpen) setMobileOpen(false);
                  if (openSlug) setOpenSlug(null);
                  openLocator(e.currentTarget);
                }}
                aria-label="Servisa centri"
              >
                <LocationPin aria-hidden focusable="false" />
              </button>

              {/* Language switcher (visible <1360px) */}
              <div className={s.slotUtility}>
                <LanguageSwitcher initial="lv" />
              </div>

              {/* Hamburger (visible <1360px) */}
              <button
                type="button"
                className={s.hamburger}
                aria-label={mobileOpen ? 'Aizvērt izvēlni' : 'Atvērt izvēlni'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => {
                  setMobileOpen((v) => !v);
                  setOpenSlug(null);
                }}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile drawer (<1360px) */}
      <div
        id="mobile-drawer"
        className={`${s.mobileMenu} ${mobileOpen ? s.open : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className={s.mobileInner} aria-label="Mobilā navigācija">
          {NAV.map((item) => {
            const slug = item.href.replace(/^\//, '');
            const expanded = mobileExpandedSlug === slug;

            if (!hasChildren(item)) {
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
        </nav>
      </div>
    </Fragment>
  );
}

// app/(site)/ui/navbar/NavBar.jsx
'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './NavBar.module.scss';
import { SOCIALS } from '@/data/site.config';

import Controls from '../controls/Controls';
import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import Logo from '../logo/Logo';

const NAV = [
  { label: 'iPhone remonts', href: '/iphone-remonts' },
  {
    label: 'Telefonu remonts',
    href: '/telefonu-remonts',
    children: [
      { label: 'Samsung', href: '/telefonu-remonts/samsung' },
      { label: 'Xiaomi', href: '/telefonu-remonts/xiaomi' },
      { label: 'Huawei', href: '/telefonu-remonts/huawei' },
      { label: 'OnePlus', href: '/telefonu-remonts/oneplus' },
      { label: 'Visi zīmoli', href: '/telefonu-remonts' },
    ],
  },
  {
    label: 'Planšetdatoru remonts',
    href: '/plansetdatoru-remonts',
    children: [
      { label: 'iPad', href: '/plansetdatoru-remonts/ipad' },
      { label: 'Samsung', href: '/plansetdatoru-remonts/samsung' },
      { label: 'Xiaomi', href: '/plansetdatoru-remonts/xiaomi' },
      { label: 'Huawei', href: '/plansetdatoru-remonts/huawei' },
      { label: 'Lenovo', href: '/plansetdatoru-remonts/lenovo' },
    ],
  },
  {
    label: 'Datoru remonts',
    href: '/datoru-remonts',
    children: [
      { label: 'MacBook', href: '/datoru-remonts/macbook' },
      { label: 'iMac', href: '/datoru-remonts/imac' },
      { label: 'Mac Pro', href: '/datoru-remonts/mac-pro' },
      { label: 'Lenovo', href: '/datoru-remonts/lenovo' },
      { label: 'Asus', href: '/datoru-remonts/asus' },
      { label: 'HP', href: '/datoru-remonts/hp' },
      { label: 'Visi zīmoli', href: '/datoru-remonts' },
    ],
  },
  { label: 'Dyson remonts', href: '/dyson-remonts' },
];

export default function NavBar({
  showNavigation = true,
  showHeaderCtas = true,
  logoHref = '/',
}) {
  const pathname = usePathname() || '/';

  const [openSlug, setOpenSlug] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);

  const navRef = useRef(null);
  const leaveT = useRef(null);

  const { locatorOpen, contactOpen, openLocator, openContact } = useUiDialogs();

  const hasChildren = (item) => Array.isArray(item.children) && item.children.length > 0;

  const isTopActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };
  const isSubActive = (href) => pathname === href || pathname.startsWith(href + '/');

  // Close menus on Escape
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

  // Close desktop dropdown when clicking outside nav
  useEffect(() => {
    const onClick = (e) => {
      const inNav = navRef.current && navRef.current.contains(e.target);
      if (!inNav) setOpenSlug(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const previousOverflow = body.style.overflow;

    if (mobileOpen) body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <Fragment>
      <header className={s.header} role="banner">
        <div className={s.container}>
          {/* Brand */}
          <div className={s.brand}>
            <Logo href={logoHref} />
          </div>

          {/* Desktop nav */}
          {showNavigation && (
            <nav className={s.nav} aria-label="Galvenā navigācija" ref={navRef}>
              {NAV.map((item) => {
                const slug = item.href.replace(/^\//, '');
                const topActive = isTopActive(item.href);

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

                    {/* IMPORTANT a11y:
                        Keep animation (opacity/pointer-events), but prevent focus when closed:
                        aria-hidden + inert */}
                    <div
                      id={panelId}
                      className={`${s.dropdown} ${panelOpen ? s.open : ''}`}
                      aria-hidden={!panelOpen}
                      inert={!panelOpen}
                    >
                      <ul className={s.menuCol}>
                        {item.children.map((child) => {
                          const subActive = isSubActive(child.href);
                          return (
                            <li key={`${slug}__${child.href}`}>
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
          )}

          {/* Right actions */}
          <div className={s.actions}>
            <div className={s.actionsCluster}>
              {showHeaderCtas && (
                <>
                  {/* Tablet & Desktop (≥768px): Locator + Contact */}
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

                  {/* Mobile (<768px): locator icon */}
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
                </>
              )}

              {/* Hamburger (<1360px) – only if navigation is enabled */}
              {showNavigation && (
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
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet drawer (<1360px) – only if navigation is enabled */}
      {showNavigation && (
        <div
          id="mobile-drawer"
          className={`${s.mobileMenu} ${mobileOpen ? s.open : ''}`}
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
        >
          <nav className={s.mobileInner} aria-label="Mobilā navigācija">
            <div className={s.mobileMenuList}>
              {NAV.map((item) => {
                const slug = item.href.replace(/^\//, '');
                const expanded = mobileExpandedSlug === slug;

                if (!hasChildren(item)) {
                  const topActive = isTopActive(item.href);
                  return (
                    <Link
                      key={slug}
                      href={item.href}
                      className={`${s.drawerItem} ${topActive ? s.active : ''}`}
                      aria-current={topActive ? 'page' : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const submenuId = `drawer-sub-${slug}`;

                return (
                  <div key={slug} className={s.drawerGroup}>
                    <div
                      className={`${s.drawerItem} ${s.drawerParent} ${
                        isTopActive(item.href) ? s.active : ''
                      }`}
                    >
                      <Link
                        href={item.href}
                        className={s.drawerParentLabel}
                        aria-current={isTopActive(item.href) ? 'page' : undefined}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>

                      <button
                        type="button"
                        className={s.drawerToggle}
                        aria-label={expanded ? 'Sakļaut sadaļu' : 'Izvērst sadaļu'}
                        aria-expanded={expanded}
                        aria-controls={submenuId}
                        onClick={() => setMobileExpandedSlug(expanded ? null : slug)}
                      >
                        <span aria-hidden>{expanded ? '−' : '+'}</span>
                      </button>
                    </div>

                    <div id={submenuId} className={s.drawerSubmenu} hidden={!expanded}>
                      {item.children.map((child) => {
                        const subActive = isSubActive(child.href);
                        return (
                          <Link
                            key={`${slug}__${child.href}`}
                            href={child.href}
                            className={`${s.drawerItem} ${subActive ? s.active : ''}`}
                            aria-current={subActive ? 'page' : undefined}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={s.mobileDrawerControls}>
              <Controls
                facebookUrl={SOCIALS.facebook}
                instagramUrl={SOCIALS.instagram}
                tiktokUrl={SOCIALS.tiktok}
              />
            </div>
          </nav>
        </div>
      )}
    </Fragment>
  );
}
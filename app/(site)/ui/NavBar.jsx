'use client';

import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import s from './NavBar.module.scss';

// data
import categories from '@/data/categories';

const LOCATIONS = [
  { id: 'domina', label: 'Domina', tel: '+37123370088', wa: 'https://wa.me/37123370088', maps: 'https://www.google.com/maps/place/Ieriķu+iela+3,+Rīga' },
  { id: 'spice', label: 'Spice', tel: '+37120887787', wa: 'https://wa.me/37120887787', maps: 'https://www.google.com/maps/place/Jaunmoku+iela+13,+Rīga' },
];

export default function NavBar() {
  /* ---------- desktop state ---------- */
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCatSlug, setActiveCatSlug] = useState(null);
  const [locOpen, setLocOpen] = useState(false);

  /* ---------- mobile slide-down state ---------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const [drawerLocOpen, setDrawerLocOpen] = useState(false);
  const [drawerActiveCat, setDrawerActiveCat] = useState(null);
  const [lastTapCat, setLastTapCat] = useState(null);

  /* ---------- location ---------- */
  const [locId, setLocId] = useState(LOCATIONS[0].id);
  const loc = useMemo(() => LOCATIONS.find(l => l.id === locId) ?? LOCATIONS[0], [locId]);

  /* ---------- data ---------- */
  const catsForHeader = useMemo(
    () =>
      [...categories]
        .filter(c => c.showInHeader || c.showInDropdown)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    []
  );

  const brandsForCat = (slug) => {
    const cat = catsForHeader.find(c => c.slug === slug);
    if (!cat) return [];
    return (cat.brands || [])
      .filter(b => b.showInDropdown)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  /* ---------- refs & helpers ---------- */
  const servicesRef = useRef(null);
  const locRef = useRef(null);
  const leaveT = useRef(null);

  /* esc to close */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setActiveCatSlug(null);
        setLocOpen(false);
        setMobileOpen(false);
        setDrawerServicesOpen(false);
        setDrawerLocOpen(false);
        setDrawerActiveCat(null);
        setLastTapCat(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* outside click (desktop) */
  useEffect(() => {
    const onClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
        setActiveCatSlug(null);
      }
      if (locRef.current && !locRef.current.contains(e.target)) {
        setLocOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* clear hover delay on unmount */
  useEffect(() => () => clearTimeout(leaveT.current), []);

  return (
    <Fragment>
      <header className={s.header}>
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
          <nav className={s.nav} aria-label="Galvenā navigācija">
            <div
              className={s.ddWrap}
              ref={servicesRef}
              onMouseEnter={() => {
                clearTimeout(leaveT.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                clearTimeout(leaveT.current);
                leaveT.current = setTimeout(() => {
                  setServicesOpen(false);
                  setActiveCatSlug(null);
                }, 120);
              }}
            >
              <button
                type="button"
                className={`${s.navItem} ${s.navItemEmph}`}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen(v => !v)}
              >
                Pakalpojumi
              </button>

              <div className={`${s.dropdown} ${servicesOpen ? s.open : ''}`} role="menu" aria-hidden={!servicesOpen}>
                {/* level 1: categories */}
                <ul className={s.catList}>
                  {catsForHeader.map(cat => {
                    const hasBrands = (cat.brands || []).some(b => b.showInDropdown);
                    if (!hasBrands) return null;
                    const isActive = activeCatSlug === cat.slug;
                    return (
                      <li
                        key={cat.slug}
                        className={`${s.catItem} ${isActive ? s.activeRow : ''}`}
                        onMouseEnter={() => setActiveCatSlug(cat.slug)}
                      >
                        <Link
                          href={`/${cat.slug}`}
                          className={s.catButton}
                          onClick={() => setServicesOpen(false)}
                        >
                          {cat.name}
                          <span className={s.chev} aria-hidden>›</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* level 2: brands */}
                {activeCatSlug && (
                  <div className={s.subpanel} role="menu">
                    <ul className={s.brandList}>
                      {brandsForCat(activeCatSlug).map(brand => (
                        <li key={`${activeCatSlug}__${brand.brandSlug}`}>
                          <Link
                            href={`/${activeCatSlug}/${brand.brandSlug}`}
                            className={s.brandLink}
                            onClick={() => setServicesOpen(false)}
                          >
                            {brand.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Link href="/cenas" className={s.navItem}>Cenas</Link>
            <Link href="/par-mums" className={s.navItem}>Par mums</Link>
            <Link href="/kontakti" className={s.navItem}>Kontakti</Link>
          </nav>

          {/* right actions */}
          <div className={s.actions}>
            {/* locate */}
            <div className={s.actionItem} ref={locRef}>
              <button
                type="button"
                className={s.iconBtn}
                aria-haspopup="menu"
                aria-expanded={locOpen}
                onClick={() => { setLocOpen(v => !v); setServicesOpen(false); }}
              >
                <span className={s.icon} aria-hidden>📍</span>
                <span className={s.caption}>Locate service</span>
              </button>

              <div className={`${s.locMenu} ${locOpen ? s.open : ''}`} role="menu" aria-hidden={!locOpen}>
                {LOCATIONS.map(l => (
                  <div key={l.id} className={s.locRow}>
                    <button
                      type="button"
                      className={`${s.locOption} ${l.id === locId ? s.active : ''}`}
                      onClick={() => { setLocId(l.id); setLocOpen(false); }}
                      aria-pressed={l.id === locId}
                      role="menuitem"
                    >
                      {l.label}
                    </button>
                    <div className={s.locLinks}>
                      <a href={l.maps} target="_blank" rel="noopener" className={s.smallLink}>Maps</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* chat */}
            <div className={s.actionItem}>
              <a
                href={loc.wa}
                className={s.iconBtn}
                aria-label="Open WhatsApp chat"
                onClick={() => { setServicesOpen(false); setLocOpen(false); }}
              >
                <span className={s.icon} aria-hidden>💬</span>
                <span className={s.caption}>Chat with us</span>
              </a>
            </div>

            {/* call */}
            <div className={s.actionItem}>
              <a
                href={`tel:${loc.tel}`}
                className={`${s.iconBtn} ${s.primary}`}
                aria-label="Call us"
                onClick={() => { setServicesOpen(false); setLocOpen(false); }}
              >
                <span className={s.icon} aria-hidden>📞</span>
                <span className={s.caption}>Call us</span>
              </a>
            </div>

            {/* hamburger */}
            <button
              type="button"
              className={s.hamburger}
              aria-label="Atvērt izvēlni"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen(v => !v);
                setServicesOpen(false);
                setLocOpen(false);
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div className={`${s.mobileMenu} ${mobileOpen ? s.open : ''}`} aria-hidden={!mobileOpen}>
        <nav className={s.mobileInner} aria-label="Mobilā navigācija">
          {/* Pakalpojumi accordion */}
          <button
            type="button"
            className={`${s.drawerItem} ${s.emph}`}
            aria-expanded={drawerServicesOpen}
            onClick={() => setDrawerServicesOpen(v => !v)}
          >
            Pakalpojumi
          </button>

          {drawerServicesOpen && (
            <div className={s.drawerSubmenu}>
              {catsForHeader.map(cat => {
                const brands = brandsForCat(cat.slug);
                if (brands.length === 0) return null;

                const open = drawerActiveCat === cat.slug;
                const catHref = `/${cat.slug}`;

                return (
                  <div key={cat.slug} className={s.drawerSubsection}>
                    <Link
                      href={catHref}
                      className={s.drawerItem}
                      aria-expanded={open}
                      onClick={(e) => {
                        if (!open) {
                          e.preventDefault();
                          setDrawerActiveCat(cat.slug);
                          setLastTapCat(cat.slug);
                        } else if (lastTapCat !== cat.slug) {
                          e.preventDefault();
                          setLastTapCat(cat.slug);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      {cat.name}
                    </Link>

                    {open && (
                      <div className={s.drawerSublist}>
                        {brands.map(brand => (
                          <Link
                            key={`${cat.slug}__${brand.brandSlug}`}
                            href={`/${cat.slug}/${brand.brandSlug}`}
                            className={s.drawerItem}
                            onClick={() => setMobileOpen(false)}
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <Link href="/cenas" className={s.drawerItem} onClick={() => setMobileOpen(false)}>Cenas</Link>
          <Link href="/par-mums" className={s.drawerItem} onClick={() => setMobileOpen(false)}>Par mums</Link>
          <Link href="/kontakti" className={s.drawerItem} onClick={() => setMobileOpen(false)}>Kontakti</Link>

          {/* Location accordion */}
          <button
            type="button"
            className={s.drawerItem}
            aria-expanded={drawerLocOpen}
            onClick={() => setDrawerLocOpen(v => !v)}
          >
            📍 Locate service
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

          <div className={s.drawerCtas}>
            <a href={loc.wa} className={s.quick} onClick={() => setMobileOpen(false)}>💬 Chat with us</a>
            <a href={`tel:${loc.tel}`} className={s.quick} onClick={() => setMobileOpen(false)}>📞 Call us</a>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

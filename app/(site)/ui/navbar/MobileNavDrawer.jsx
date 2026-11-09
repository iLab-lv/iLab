'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Controls from '../controls/Controls';
import LanguageSwitcher from '../controls/LanguageSwitcher';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import { SOCIALS } from '@/data/site.config';
import { hasChildren, isNavItemActive } from './navigation.helpers';
import s from './NavBar.module.scss';

export default function MobileNavDrawer({
  openerRef,
  items,
  locale,
  pathname,
  mobileOpen,
  mobileExpandedSlug,
  setMobileExpandedSlug,
  setMobileOpen,
}) {
  const { serviceRedesign, serviceClassName } = useUiDialogs();
  const drawerRef = useRef(null);
  const contactsHref = locale === 'ru' ? '/ru/kontakty' : '/kontakti';
  const contactsLabel = locale === 'ru' ? 'Контакты' : 'Kontakti';
  const contactsActive = isNavItemActive(pathname, contactsHref);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpandedSlug(null);
  };

  useEffect(() => {
    if (!serviceRedesign || !mobileOpen) return;
    const root = drawerRef.current;
    const opener = openerRef?.current;
    const html = document.documentElement; const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = 'hidden'; body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => root?.focus({ preventScroll: true }));
    const focusable = () => Array.from(root?.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])') || []).filter((element) => !element.disabled && element.tabIndex >= 0 && !element.closest('[hidden], [inert]') && element.getClientRects().length);
    const containFocus = (event) => { if (root && !root.contains(event.target)) root.focus({ preventScroll: true }); };
    const key = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeMobileMenu(); }
      if (event.key !== 'Tab') return;
      const nodes = focusable(); const first = nodes[0]; const last = nodes[nodes.length - 1]; const active = document.activeElement;
      if (!first) { event.preventDefault(); root?.focus(); }
      else if (event.shiftKey && (active === first || active === root || !root.contains(active))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (active === last || active === root || !root.contains(active))) { event.preventDefault(); first.focus(); }
    };
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const resize = () => { if (breakpoint.matches) closeMobileMenu(); };
    document.addEventListener('keydown', key); document.addEventListener('focusin', containFocus); breakpoint.addEventListener('change', resize); resize();
    return () => {
      cancelAnimationFrame(frame); document.removeEventListener('keydown', key); document.removeEventListener('focusin', containFocus); breakpoint.removeEventListener('change', resize);
      html.style.overflow = previous.html; body.style.overflow = previous.body;
      requestAnimationFrame(() => { if (!document.querySelector('[data-service-modal="true"]') && opener?.isConnected) opener.focus({ preventScroll: true }); });
    };
  // The drawer is mounted for one open session; group expansion must not restart its focus/scroll ownership.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceRedesign, mobileOpen]);

  const drawer = (
    <>
    {serviceRedesign && <div className={s.mobileScrim} onMouseDown={closeMobileMenu} aria-hidden="true" />}
    <div
      ref={drawerRef}
      id="mobile-drawer"
      role={serviceRedesign ? "dialog" : undefined}
      aria-modal={serviceRedesign ? "true" : undefined}
      aria-label={serviceRedesign ? (locale === "ru" ? "Главная навигация" : "Galvenā navigācija") : undefined}
      data-service-modal={serviceRedesign ? "true" : undefined}
      tabIndex={serviceRedesign ? -1 : undefined}
      className={`${s.mobileMenu} ${mobileOpen ? s.open : ''} ${serviceRedesign ? serviceClassName : ''}`}
      data-service-redesign={serviceRedesign ? '' : undefined}
      aria-hidden={!mobileOpen}
      inert={!mobileOpen}
    >
      <nav className={s.mobileInner} aria-label={locale === 'ru' ? 'Мобильная навигация' : 'Mobilā navigācija'}>
        {serviceRedesign && <button type="button" className={s.mobileClose} aria-label={locale === 'ru' ? 'Закрыть меню' : 'Aizvērt izvēlni'} onClick={closeMobileMenu}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg></button>}
        <div className={s.mobileMenuList}>
          {items.map((item) => {
            const slug = item.key;
            const expanded = mobileExpandedSlug === slug;
            const topActive = isNavItemActive(pathname, item.href);

            if (!hasChildren(item)) {
              return (
                <Link
                  key={slug}
                  href={item.href}
                  className={`${s.drawerItem} ${topActive ? s.active : ''}`}
                  aria-current={topActive ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            }

            const submenuId = `drawer-sub-${slug}`;

            return (
              <div key={slug} className={s.drawerGroup}>
                <div
                  className={`${s.drawerItem} ${s.drawerParent} ${topActive ? s.active : ''}`}
                >
                  {item.menuOnly ? (
                    <button type="button" className={s.drawerParentLabel} aria-expanded={expanded} aria-controls={submenuId} onClick={() => setMobileExpandedSlug(expanded ? null : slug)}>
                      {item.label}
                    </button>
                  ) : (
                    <Link href={item.href} className={s.drawerParentLabel} aria-current={topActive ? 'page' : undefined} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  )}

                  <button
                    type="button"
                    className={s.drawerToggle}
                    aria-label={locale === 'ru' ? (expanded ? 'Свернуть раздел' : 'Развернуть раздел') : (expanded ? 'Sakļaut sadaļu' : 'Izvērst sadaļu')}
                    aria-expanded={expanded}
                    aria-controls={submenuId}
                    onClick={() => setMobileExpandedSlug(expanded ? null : slug)}
                  >
                    {serviceRedesign ? <i className={s.drawerExpandIcon} data-expanded={expanded} aria-hidden="true" /> : <span aria-hidden>{expanded ? '−' : '+'}</span>}
                  </button>
                </div>

                <div id={submenuId} className={s.drawerSubmenu} hidden={!expanded}>
                  {item.children.map((child) => {
                    const subActive = isNavItemActive(pathname, child.href);

                    return (
                      <Link
                        key={`${slug}__${child.key}`}
                        href={child.href}
                        className={`${s.drawerItem} ${subActive ? s.active : ''}`}
                        aria-current={subActive ? 'page' : undefined}
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}


          <div className={s.mobileMenuSecondary}>
            <Link
              href={contactsHref}
              className={`${s.drawerItem} ${s.drawerContactItem} ${contactsActive ? s.active : ''}`}
              aria-current={contactsActive ? 'page' : undefined}
              onClick={closeMobileMenu}
            >
              {contactsLabel}
            </Link>
          </div>
        </div>

        <div className={s.mobileDrawerControls}>
          {serviceRedesign ? <div className={s.menuMeta}>
            <span><a href={SOCIALS.facebook} target="_blank" rel="noopener">Facebook</a> · <a href={SOCIALS.instagram} target="_blank" rel="noopener">Instagram</a> · <a href={SOCIALS.tiktok} target="_blank" rel="noopener">TikTok</a></span>
            <LanguageSwitcher onChange={closeMobileMenu} />
          </div> : <Controls
            facebookUrl={SOCIALS.facebook}
            instagramUrl={SOCIALS.instagram}
            tiktokUrl={SOCIALS.tiktok}
            onLanguageChange={closeMobileMenu}
            placement="inline"
          />}
        </div>
      </nav>
    </div>
    </>
  );

  return createPortal(drawer, document.body);
}

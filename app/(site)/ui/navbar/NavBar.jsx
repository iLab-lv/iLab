'use client';

import { useState, useRef, useEffect, Fragment, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import s from './NavBar.module.scss';

import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import Logo from '../logo/Logo';

import DesktopNav from './DesktopNav';
import MobileNavDrawer from './MobileNavDrawer';
import {
  buildNavigation,
  getNavLocaleFromPathname,
} from './navigation.helpers';

export default function NavBar({
  showNavigation = true,
  showHeaderCtas = true,
  logoHref,
}) {
  const pathname = usePathname() || '/';
  const locale = getNavLocaleFromPathname(pathname);
  const homeHref = logoHref || (locale === 'ru' ? '/ru' : '/');

  const items = useMemo(() => buildNavigation(locale), [locale]);

  const [openSlug, setOpenSlug] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);

  const navRef = useRef(null);
  const leaveT = useRef(null);

  const { locatorOpen, contactOpen, openLocator, openContact } = useUiDialogs();

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
          <div className={s.brand}>
            <Logo href={homeHref} />
          </div>

          {showNavigation && (
            <DesktopNav
              items={items}
              pathname={pathname}
              navRef={navRef}
              openSlug={openSlug}
              setOpenSlug={setOpenSlug}
              leaveT={leaveT}
            />
          )}

          <div className={s.actions}>
            <div className={s.actionsCluster}>
              {showHeaderCtas && (
                <>
                  <div className={s.ctasTabletDesktop}>
                    <Button
                      variant="ghost"
                      size="md"
                      leadingIcon={LocationPin}
                      aria-haspopup="dialog"
                      aria-controls="locator-panel"
                      aria-expanded={locatorOpen}
                      onClick={(e) => openLocator(e.currentTarget)}
                      title={locale === 'ru' ? 'Сервисные центры' : 'Servisa centri'}
                    >
                      {locale === 'ru' ? 'Сервисные центры' : 'Servisa centri'}
                    </Button>

                    <Button
                      variant="primary"
                      size="md"
                      aria-haspopup="dialog"
                      aria-controls="sazinaties-panel"
                      aria-expanded={contactOpen}
                      onClick={(e) => openContact(e.currentTarget)}
                    >
                      {locale === 'ru' ? 'Связаться' : 'Sazināties'}
                    </Button>
                  </div>

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
                    aria-label={locale === 'ru' ? 'Сервисные центры' : 'Servisa centri'}
                  >
                    <LocationPin aria-hidden focusable="false" />
                  </button>
                </>
              )}

              {showNavigation && (
                <button
                  type="button"
                  className={s.hamburger}
                  aria-label={
                    mobileOpen
                      ? locale === 'ru'
                        ? 'Закрыть меню'
                        : 'Aizvērt izvēlni'
                      : locale === 'ru'
                      ? 'Открыть меню'
                      : 'Atvērt izvēlni'
                  }
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

      {showNavigation && (
        <MobileNavDrawer
          items={items}
          pathname={pathname}
          mobileOpen={mobileOpen}
          mobileExpandedSlug={mobileExpandedSlug}
          setMobileExpandedSlug={setMobileExpandedSlug}
          setMobileOpen={setMobileOpen}
        />
      )}
    </Fragment>
  );
}
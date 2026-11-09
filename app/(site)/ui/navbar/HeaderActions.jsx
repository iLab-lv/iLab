'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';
import LanguageSwitcher from '../controls/LanguageSwitcher';
import { getCtaMainContent } from '../cta-main/ctaMainContent';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import s from './NavBar.module.scss';

const MobileNavDrawer = dynamic(() => import('./MobileNavDrawer'), {
  ssr: false,
});

function ServiceLocationPin(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></svg>;
}

export default function HeaderActions({
  items,
  locale,
  pathname,
  showHeaderCtas,
  showNavigation,
  showShopSwitch = true,
}) {
  const cta = getCtaMainContent(locale);
  const [localMobileOpen, setLocalMobileOpen] = useState(false);
  const menuOpenerRef = useRef(null);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);
  const { locatorOpen, contactOpen, openLocator, openContact, serviceRedesign, navigationOpen, setNavigationOpen } = useUiDialogs();
  const mobileOpen = serviceRedesign ? navigationOpen : localMobileOpen;
  const setMobileOpen = serviceRedesign ? setNavigationOpen : setLocalMobileOpen;
  const LocatorIcon = serviceRedesign ? ServiceLocationPin : LocationPin;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMobileExpandedSlug(null);
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setMobileOpen]);

  useEffect(() => {
    if (serviceRedesign) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;

    if (mobileOpen) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, serviceRedesign]);

  const menuLabel = mobileOpen
    ? locale === 'ru'
      ? 'Закрыть меню'
      : 'Aizvērt izvēlni'
    : locale === 'ru'
      ? 'Открыть меню'
      : 'Atvērt izvēlni';

  return (
    <>
      <div className={s.actions}>
        <div className={s.actionsCluster}>
          {showShopSwitch && <Link className={s.shopSwitch} href="/shop" aria-label={locale === 'ru' ? 'Перейти в магазин iLab' : 'Atvērt iLab veikalu'}>
            <span className={s.switchTrack} aria-hidden="true"><span /></span>
            <span className={s.switchLabel}>{locale === 'ru' ? 'Магазин' : 'Veikals'}</span>
          </Link>}

          <div className={s.language}><LanguageSwitcher /></div>

          {showHeaderCtas && (
            <>
              <div className={s.ctasTabletDesktop}>
                <Button
                  variant="ghost"
                  size={serviceRedesign ? 'sm' : 'md'}
                  leadingIcon={LocatorIcon}
                  aria-haspopup="dialog"
                  aria-controls="locator-panel"
                  aria-expanded={locatorOpen}
                  onClick={(e) => openLocator(e.currentTarget)}
                  title={cta.locator.label}
                  aria-label={cta.locator.ariaLabel}
                >
                  {cta.locator.label}
                </Button>

                <Button
                  variant="primary"
                  size={serviceRedesign ? 'sm' : 'md'}
                  className={s.contactHeader}
                  trace
                  aria-haspopup="dialog"
                  aria-controls="sazinaties-panel"
                  aria-expanded={contactOpen}
                  onClick={(e) => openContact(e.currentTarget)}
                  aria-label={cta.contact.ariaLabel}
                >
                  {cta.contact.label}
                </Button>
              </div>

              <button
                type="button"
                className={s.iconBtn}
                aria-haspopup="dialog"
                aria-controls="locator-panel"
                aria-expanded={locatorOpen}
                onClick={(e) => {
                  setMobileOpen(false);
                  setMobileExpandedSlug(null);
                  openLocator(e.currentTarget);
                }}
                aria-label={cta.locator.ariaLabel}
              >
                <LocatorIcon aria-hidden focusable="false" />
              </button>

              <div className={s.mobilePrices}>
                <Button
                  variant="secondary"
                  size="md"
                  href={cta.prices.href}
                  aria-label={cta.prices.ariaLabel}
                >
                  {cta.prices.label}
                </Button>
              </div>
            </>
          )}

          {showNavigation && (
            <button
              type="button"
              className={s.hamburger}
              ref={menuOpenerRef}
              aria-label={menuLabel}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => {
                setMobileOpen((value) => !value);
              }}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {showNavigation && mobileOpen && (
        <MobileNavDrawer
          openerRef={menuOpenerRef}
          items={items}
          locale={locale}
          pathname={pathname}
          mobileOpen={mobileOpen}
          mobileExpandedSlug={mobileExpandedSlug}
          setMobileExpandedSlug={setMobileExpandedSlug}
          setMobileOpen={setMobileOpen}
        />
      )}
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';
import { getCtaMainContent } from '../cta-main/ctaMainContent';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import s from './NavBar.module.scss';

const MobileNavDrawer = dynamic(() => import('./MobileNavDrawer'), {
  ssr: false,
});

export default function HeaderActions({
  items,
  locale,
  pathname,
  showHeaderCtas,
  showNavigation,
}) {
  const cta = getCtaMainContent(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState(null);
  const { locatorOpen, contactOpen, openLocator, openContact } = useUiDialogs();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMobileExpandedSlug(null);
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;

    if (mobileOpen) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

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
                  title={cta.locator.label}
                  aria-label={cta.locator.ariaLabel}
                >
                  {cta.locator.label}
                </Button>

                <Button
                  variant="primary"
                  size="md"
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
                <LocationPin aria-hidden focusable="false" />
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
              aria-label={menuLabel}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => {
                setMobileOpen((value) => !value);
              }}
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {showNavigation && mobileOpen && (
        <MobileNavDrawer
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

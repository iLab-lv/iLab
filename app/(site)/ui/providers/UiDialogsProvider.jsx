'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import FullscreenPanel from '../panels/FullscreenPanel';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';

const UiDialogsContext = createContext(null);

const LocatorPanel = dynamic(() => import('../panels/LocatorPanel'), {
  ssr: false,
});

const SazinatiesPanel = dynamic(() => import('../panels/SazinatiesPanel'), {
  ssr: false,
});

const PierakstiesPanel = dynamic(() => import('../panels/PierakstiesPanel'), {
  ssr: false,
});

export function UiDialogsProvider({
  children,
  bookHref = '/pieraksties',
  locale,
  siteSettings,
  serviceRedesign = false,
  serviceClassName = '',
}) {
  const pathname = usePathname() || '/';

  const resolvedLocale = locale || getNavLocaleFromPathname(pathname);

  const [modalOpen, setModalOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const setServiceNavigationOpen = (value) => {
    setNavigationOpen((current) => typeof value === 'function' ? value(current) : value);
    setModalOpen(false);
  };
  const rememberOpener = (openerEl) => {
    if (!serviceRedesign || !modalOpen) lastOpenerRef.current = openerEl || null;
    if (serviceRedesign) setNavigationOpen(false);
  };
  const [activePane, setActivePane] = useState(null);
  const [bookingContext, setBookingContext] = useState({ values: {}, version: 0 });

  const [selectedLocId, setSelectedLocId] = useState(null);

  const locations = Array.isArray(siteSettings?.locations)
    ? siteSettings.locations
    : [];

  const defaultHours = Array.isArray(siteSettings?.hours)
    ? siteSettings.hours
    : [];

  const pinPositions = siteSettings?.pinPositions || {};

  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState(null);

  const lastOpenerRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const id = 'dialogs-root';
    let el = document.getElementById(id);

    if (!el) {
      el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    }

    setPortalEl(el);
  }, []);

  const locatorOpen = modalOpen && activePane === 'locator';
  const contactOpen = modalOpen && activePane === 'sazinaties';
  const bookOpen = modalOpen && activePane === 'book';

  const openLocator = (openerEl) => {
    rememberOpener(openerEl);
    setActivePane('locator');
    setModalOpen(true);
  };

  const closeLocator = () => {
    if (activePane === 'locator') setModalOpen(false);
  };

  const openContact = (openerEl, locId = null) => {
    rememberOpener(openerEl);

    if (locId !== undefined && locId !== null) {
      setSelectedLocId(locId);
    }

    setActivePane('sazinaties');
    setModalOpen(true);
  };

  const closeContact = () => {
    if (activePane === 'sazinaties') setModalOpen(false);
  };

  const openBook = (openerEl, initialValues) => {
    rememberOpener(openerEl);
    if (initialValues) {
      setBookingContext((current) => ({ values: initialValues, version: current.version + 1 }));
    }
    setActivePane('book');
    setModalOpen(true);
  };

  const closeBook = () => {
    if (activePane === 'book') setModalOpen(false);
  };

  const openContactsFor = (locId, openerEl) => {
    if (serviceRedesign) rememberOpener(openerEl);
    else lastOpenerRef.current = openerEl || lastOpenerRef.current;
    setSelectedLocId(locId || null);

    if (modalOpen) {
      setActivePane('sazinaties');
    } else {
      setActivePane('sazinaties');
      setModalOpen(true);
    }
  };

  const onClose = () => setModalOpen(false);

  const paneTitle =
    activePane === 'locator'
      ? resolvedLocale === 'ru'
        ? 'Найти филиал'
        : 'Atrast filiāli'
      : activePane === 'sazinaties'
        ? resolvedLocale === 'ru'
          ? 'Связаться'
          : 'Sazināties'
        : activePane === 'book'
          ? resolvedLocale === 'ru'
            ? 'Записаться на ремонт'
            : 'Pieraksties uz remontu'
          : '';

  const renderPane = (key) => {
    switch (key) {
      case 'locator':
        return (
          <LocatorPanel
            locale={resolvedLocale}
            locations={locations}
            pinPositions={pinPositions}
            defaultHours={defaultHours}
            onSelectLocation={(locId) => openContactsFor(locId)}
          />
        );

      case 'sazinaties':
        return (
          <SazinatiesPanel
            locale={resolvedLocale}
            initialLocId={selectedLocId}
            locations={locations}
            defaultHours={defaultHours}
          />
        );

      case 'book':
        return (
          <PierakstiesPanel
            key={bookingContext.version}
            initialValues={bookingContext.values}
            locale={resolvedLocale}
            locations={locations}
            onClose={onClose}
            bookHref={bookHref}
          />
        );

      default:
        return null;
    }
  };

  const api = {
    serviceRedesign,
    serviceClassName,
    navigationOpen,
    setNavigationOpen: setServiceNavigationOpen,
    locale: resolvedLocale,
    siteSettings,
    locations,
    defaultHours,
    pinPositions,

    locatorOpen,
    contactOpen,
    bookOpen,
    selectedLocId,

    openLocator,
    closeLocator,

    openContact,
    closeContact,

    openBook,
    closeBook,

    openContactsFor,
    setSelectedLocId,
  };

  return (
    <UiDialogsContext.Provider value={api}>
      {children}

      {!serviceRedesign && <>
        <div id="locator-panel" hidden aria-hidden="true" />
        <div id="sazinaties-panel" hidden aria-hidden="true" />
        <div id="pieraksties-panel" hidden aria-hidden="true" />
      </>}

      {mounted &&
        portalEl &&
        createPortal(
          activePane ? (
            <div data-service-redesign={serviceRedesign ? '' : undefined} className={serviceRedesign ? serviceClassName : undefined}>
              <FullscreenPanel
                open={modalOpen}
                openerRef={lastOpenerRef}
                onClose={onClose}
                paneKey={activePane}
                serviceRedesign={serviceRedesign}
                paneTitle={paneTitle}
                closeLabel={resolvedLocale === 'ru' ? 'Закрыть' : 'Aizvērt'}
                renderPane={renderPane}
              />
            </div>
          ) : null,
          portalEl
        )}
    </UiDialogsContext.Provider>
  );
}

export function useUiDialogs() {
  const ctx = useContext(UiDialogsContext);

  if (!ctx) {
    throw new Error('useUiDialogs must be used within UiDialogsProvider');
  }

  return ctx;
}

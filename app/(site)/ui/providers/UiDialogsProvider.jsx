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
}) {
  const pathname = usePathname() || '/';

  const resolvedLocale = locale || getNavLocaleFromPathname(pathname);

  const [modalOpen, setModalOpen] = useState(false);
  const [activePane, setActivePane] = useState(null);

  const [selectedLocId, setSelectedLocId] = useState(null);

  const locations = Array.isArray(siteSettings?.locations)
    ? siteSettings.locations
    : [];

  const defaultHours = Array.isArray(siteSettings?.hours)
    ? siteSettings.hours
    : [];

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
    lastOpenerRef.current = openerEl || null;
    setActivePane('locator');
    setModalOpen(true);
  };

  const closeLocator = () => {
    if (activePane === 'locator') setModalOpen(false);
  };

  const openContact = (openerEl, locId = null) => {
    lastOpenerRef.current = openerEl || null;

    if (locId !== undefined && locId !== null) {
      setSelectedLocId(locId);
    }

    setActivePane('sazinaties');
    setModalOpen(true);
  };

  const closeContact = () => {
    if (activePane === 'sazinaties') setModalOpen(false);
  };

  const openBook = (openerEl) => {
    lastOpenerRef.current = openerEl || null;
    setActivePane('book');
    setModalOpen(true);
  };

  const closeBook = () => {
    if (activePane === 'book') setModalOpen(false);
  };

  const openContactsFor = (locId, openerEl) => {
    lastOpenerRef.current = openerEl || lastOpenerRef.current;
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
    locale: resolvedLocale,
    siteSettings,
    locations,
    defaultHours,

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

      <div id="locator-panel" hidden aria-hidden="true" />
      <div id="sazinaties-panel" hidden aria-hidden="true" />
      <div id="pieraksties-panel" hidden aria-hidden="true" />

      {mounted &&
        portalEl &&
        createPortal(
          activePane ? (
            <FullscreenPanel
              open={modalOpen}
              onClose={onClose}
              paneKey={activePane}
              paneTitle={paneTitle}
              closeLabel={resolvedLocale === 'ru' ? 'Закрыть' : 'Aizvērt'}
              renderPane={renderPane}
            />
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

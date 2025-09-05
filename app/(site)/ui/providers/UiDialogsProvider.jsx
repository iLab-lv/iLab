// app/(site)/ui/providers/UiDialogsProvider.jsx
'use client';

import { createContext, useContext, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import LocatorPanel from '../../ui/panels/LocatorPanel';
import SazinatiesPanel from '../../ui/panels/SazinatiesPanel';
import PierakstiesPanel from '../../ui/panels/PierakstiesPanel';

const UiDialogsContext = createContext(null);

export function UiDialogsProvider({ children, bookHref = '/pieraksties' }) {
  const [locatorOpen, setLocatorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState(null);

  // --- NEW: only render portals after hydration, and target a stable container
  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState(null);

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
  // --- END NEW

  const lastOpenerRef = useRef(null);
  const anyOpen = locatorOpen || contactOpen || bookOpen;

  // Body scroll lock while any dialog is open
  useEffect(() => {
    if (!anyOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev || '';
    };
  }, [anyOpen]);

  const restoreFocus = () => {
    setTimeout(() => {
      if (lastOpenerRef.current && typeof lastOpenerRef.current.focus === 'function') {
        lastOpenerRef.current.focus();
      }
      lastOpenerRef.current = null;
    }, 0);
  };

  const openLocator = (openerEl) => {
    lastOpenerRef.current = openerEl || null;
    setLocatorOpen(true);
  };
  const closeLocator = () => {
    setLocatorOpen(false);
    restoreFocus();
  };

  const openContact = (openerEl, locId = null) => {
    lastOpenerRef.current = openerEl || null;
    setSelectedLocId(locId);
    setContactOpen(true);
  };
  const closeContact = () => {
    setContactOpen(false);
    restoreFocus();
  };

  const openBook = (openerEl) => {
    lastOpenerRef.current = openerEl || null;
    setBookOpen(true);
  };
  const closeBook = () => {
    setBookOpen(false);
    restoreFocus();
  };

  const openContactsFor = (locId, openerEl) => {
    setSelectedLocId(locId || null);
    setLocatorOpen(false);
    lastOpenerRef.current = openerEl || lastOpenerRef.current;
    setContactOpen(true);
  };

  const api = {
    locatorOpen, contactOpen, bookOpen, selectedLocId,
    openLocator, closeLocator,
    openContact, closeContact,
    openBook, closeBook,
    openContactsFor,
    setSelectedLocId,
  };

  return (
    <UiDialogsContext.Provider value={api}>
      {children}

      {/* Render ONE set of panels for the whole app — only after hydration */}
      {mounted && portalEl && createPortal(
        <>
          <div id="locator-panel" aria-hidden={!locatorOpen}>
            <LocatorPanel
              open={locatorOpen}
              onClose={closeLocator}
              onSelectLocation={(locId) => openContactsFor(locId)}
            />
          </div>

          <div id="sazinaties-panel" aria-hidden={!contactOpen}>
            <SazinatiesPanel
              open={contactOpen}
              onClose={closeContact}
              initialLocId={selectedLocId}
            />
          </div>

          <div id="pieraksties-panel" aria-hidden={!bookOpen}>
            <PierakstiesPanel
              open={bookOpen}
              onClose={closeBook}
              bookHref={bookHref}
            />
          </div>
        </>,
        portalEl
      )}
    </UiDialogsContext.Provider>
  );
}

export function useUiDialogs() {
  const ctx = useContext(UiDialogsContext);
  if (!ctx) throw new Error('useUiDialogs must be used within UiDialogsProvider');
  return ctx;
}

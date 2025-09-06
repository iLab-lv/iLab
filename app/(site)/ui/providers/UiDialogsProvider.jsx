'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import FullscreenPanel from '../panels/FullscreenPanel';
import LocatorPanel from '../panels/LocatorPanel';
import SazinatiesPanel from '../panels/SazinatiesPanel';
import PierakstiesPanel from '../panels/PierakstiesPanel';

const UiDialogsContext = createContext(null);

export function UiDialogsProvider({ children, bookHref = '/pieraksties' }) {
  // One modal, three panes
  const [modalOpen, setModalOpen] = useState(false);
  const [activePane, setActivePane] = useState(null); // 'locator' | 'sazinaties' | 'book' | null

  // Data flowing into panes
  const [selectedLocId, setSelectedLocId] = useState(null);

  // Portal mount
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

  // For aria-controls compatibility with existing triggers
  const locatorOpen  = modalOpen && activePane === 'locator';
  const contactOpen  = modalOpen && activePane === 'sazinaties';
  const bookOpen     = modalOpen && activePane === 'book';

  const lastOpenerRef = useRef(null);

  // Public API (kept compatible)
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
    if (locId !== undefined && locId !== null) setSelectedLocId(locId);
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

  // Seamless handoff: from Locator pin → Sazināties
  const openContactsFor = (locId, openerEl) => {
    lastOpenerRef.current = openerEl || lastOpenerRef.current;
    setSelectedLocId(locId || null);
    if (modalOpen) {
      setActivePane('sazinaties'); // triggers in-panel cross-slide
    } else {
      setActivePane('sazinaties');
      setModalOpen(true);
    }
  };

  const onClose = () => setModalOpen(false);

  // Title per pane
  const paneTitle =
    activePane === 'locator' ? 'Atrast filiāli' :
    activePane === 'sazinaties' ? 'Sazināties' :
    activePane === 'book' ? 'Pieraksties uz remontu' :
    '';

  // Render pane by key
  const renderPane = (key) => {
    switch (key) {
      case 'locator':
        return (
          <LocatorPanel
            onSelectLocation={(locId) => openContactsFor(locId)}
          />
        );
      case 'sazinaties':
        return (
          <SazinatiesPanel
            initialLocId={selectedLocId}
          />
        );
      case 'book':
        return (
          <PierakstiesPanel
            onSubmit={(fd) => {
              // wire later: console.log([...fd.entries()]);
              setModalOpen(false);
            }}
          />
        );
      default:
        return null;
    }
  };

  const api = {
    // compatibility flags for triggers
    locatorOpen, contactOpen, bookOpen, selectedLocId,
    // actions
    openLocator, closeLocator,
    openContact, closeContact,
    openBook, closeBook,
    openContactsFor,
    setSelectedLocId,
  };

  return (
    <UiDialogsContext.Provider value={api}>
      {children}

      {/* Keep aria-controls targets present for a11y (empty placeholders) */}
      <div id="locator-panel" hidden aria-hidden="true" />
      <div id="sazinaties-panel" hidden aria-hidden="true" />
      <div id="pieraksties-panel" hidden aria-hidden="true" />

      {mounted && portalEl && createPortal(
        activePane ? (
          <FullscreenPanel
            open={modalOpen}
            onClose={onClose}
            paneKey={activePane}
            paneTitle={paneTitle}
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
  if (!ctx) throw new Error('useUiDialogs must be used within UiDialogsProvider');
  return ctx;
}

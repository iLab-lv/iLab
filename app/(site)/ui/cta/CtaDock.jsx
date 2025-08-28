'use client';

import { useState } from 'react';
import s from './CtaDock.module.scss';

import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';

import LocatorPanel from '../panels/LocatorPanel';
import SazinatiesPanel from '../panels/SazinatiesPanel';
import PierakstiesPanel from '../panels/PierakstiesPanel';

export default function CtaDock({ bookHref = '/pieraksties' }) {
  const [locatorOpen, setLocatorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  // Shared small state to pass selected location from Locator -> Contacts
  const [selectedLocId, setSelectedLocId] = useState(null);

  const openContactsFor = (locId) => {
    setSelectedLocId(locId || null);
    setLocatorOpen(false);
    setContactOpen(true);
  };

  return (
    <div className={s.dock} aria-label="Galvenās darbības">
      {/* ===== Desktop: TOP-RIGHT cluster ===== */}
      <div className={s.topRight}>
        <Button
          variant="ghost"
          size="md"
          leadingIcon={LocationPin}
          aria-haspopup="dialog"
          aria-controls="locator-panel"
          aria-expanded={locatorOpen}
          onClick={() => setLocatorOpen(true)}
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
          onClick={() => { setSelectedLocId(null); setContactOpen(true); }}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Button>
      </div>

      {/* ===== Desktop: BOTTOM-RIGHT ===== */}
      <div className={s.bottomRight}>
        <Button
          variant="secondary"
          size="md"
          aria-haspopup="dialog"
          aria-controls="pieraksties-panel"
          aria-expanded={bookOpen}
          onClick={() => setBookOpen(true)}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Button>
      </div>

      {/* ===== Mobile: Bottom bar ===== */}
      <div className={s.bottomBar} role="region" aria-label="Mobilās darbības josla">
        <Button
          variant="primary"
          size="lg"
          block
          aria-haspopup="dialog"
          aria-controls="sazinaties-panel"
          aria-expanded={contactOpen}
          onClick={() => { setSelectedLocId(null); setContactOpen(true); }}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Button>

        <Button
          variant="secondary"
          size="lg"
          block
          aria-haspopup="dialog"
          aria-controls="pieraksties-panel"
          aria-expanded={bookOpen}
          onClick={() => setBookOpen(true)}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Button>
      </div>

      {/* ===== Panels ===== */}
      <div id="locator-panel" aria-hidden={!locatorOpen}>
        <LocatorPanel
          open={locatorOpen}
          onClose={() => setLocatorOpen(false)}
          onSelectLocation={(locId) => openContactsFor(locId)}
        />
      </div>

      <div id="sazinaties-panel" aria-hidden={!contactOpen}>
        <SazinatiesPanel
          open={contactOpen}
          onClose={() => setContactOpen(false)}
          initialLocId={selectedLocId}
        />
      </div>

      <div id="pieraksties-panel" aria-hidden={!bookOpen}>
        <PierakstiesPanel open={bookOpen} onClose={() => setBookOpen(false)} bookHref={bookHref} />
      </div>
    </div>
  );
}

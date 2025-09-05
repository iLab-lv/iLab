// app/(site)/ui/cta/CtaDock.jsx
'use client';

import s from './CtaDock.module.scss';

import Button from '../../components/button/Button';
import LocationPin from '../../components/icons/LocationPin';

import { useUiDialogs } from '../providers/UiDialogsProvider';

export default function CtaDock() {
  const {
    locatorOpen,
    contactOpen,
    bookOpen,
    openLocator,
    openContact,
    openBook,
    setSelectedLocId,
  } = useUiDialogs();

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
          onClick={(e) => openLocator(e.currentTarget)}
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
          onClick={(e) => {
            setSelectedLocId(null);
            openContact(e.currentTarget);
          }}
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
          onClick={(e) => openBook(e.currentTarget)}
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
          onClick={(e) => {
            setSelectedLocId(null);
            openContact(e.currentTarget);
          }}
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
          onClick={(e) => openBook(e.currentTarget)}
          aria-label="Pieraksties uz remontu"
        >
          Pieraksties
        </Button>
      </div>
    </div>
  );
}

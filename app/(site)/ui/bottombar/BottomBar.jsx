'use client';

import s from './BottomBar.module.scss';
import Button from '../../components/button/Button';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import Controls from '../controls/Controls';
import { SOCIALS } from '@/data/site.config';

export default function BottomBar() {
  const {
    contactOpen, bookOpen,
    openContact, openBook,
    setSelectedLocId,
  } = useUiDialogs();

  return (
    <div className={s.bottomBar} role="region" aria-label="Mobilās darbības josla">
      {/* Tablet-only: full Controls (with socials) */}
      <div className={s.controlsSlot}>
        <Controls
          facebookUrl={SOCIALS.facebook}
          instagramUrl={SOCIALS.instagram}
          tiktokUrl={SOCIALS.tiktok}
        />
      </div>

      {/* Mobile-only: Sazināties */}
      <div className={s.contactSlot}>
        <Button
          variant="primary"
          size="lg"
          block
          aria-haspopup="dialog"
          aria-controls="sazinaties-panel"
          aria-expanded={contactOpen}
          onClick={(e) => { setSelectedLocId(null); openContact(e.currentTarget); }}
          aria-label="Sazināties ar mums"
        >
          Sazināties
        </Button>
      </div>

      {/* Always: Pieraksties */}
      <div className={s.bookSlot}>
        <Button
          variant="secondary"
          size="lg"
          block   /* mobile: 100% width; CSS makes it hug content ≥768px */
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

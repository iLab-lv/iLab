'use client';

import { useEffect } from 'react';

import LandingLeadForm from './LandingLeadForm';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingLeadSheet.module.scss';

function getTitle(mode) {
  return mode === 'booking' ? 'Pieteikt remontu' : 'Sazināt cenu';
}

export default function LandingLeadSheet() {
  const { leadSheet, closeLeadSheet, locations } = useLandingCta();
  const { open, mode } = leadSheet;

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeLeadSheet();
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeLeadSheet]);

  if (!open) return null;

  return (
    <div className={s.overlay}>
      <section
        className={s.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="landing-lead-sheet-title"
      >
        <button
          type="button"
          className={s.close}
          onClick={closeLeadSheet}
          aria-label="Aizvērt"
        >
          ×
        </button>

        <div className={s.content}>
          <h2 id="landing-lead-sheet-title" className={s.title}>
            {getTitle(mode)}
          </h2>

          <LandingLeadForm
            mode={mode}
            locale="lv"
            locations={locations}
            onAutoClose={closeLeadSheet}
          />
        </div>
      </section>
    </div>
  );
}
'use client';

import { useEffect } from 'react';

import Button from '@components/button/Button';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingBranchSheet.module.scss';

function getActionLabel(action) {
  if (action === 'call') return 'Zvanīt';
  if (action === 'whatsapp') return 'WhatsApp';
  return 'Sazināties';
}

function getHref(location, action) {
  if (action === 'call' && location.tel) {
    return `tel:${location.tel}`;
  }

  if (action === 'whatsapp' && location.wa) {
    return location.wa;
  }

  return '#';
}

export default function LandingBranchSheet() {
  const {
    locations,
    branchSheet,
    closeBranchSheet,
  } = useLandingCta();

  const { open, action } = branchSheet;

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeBranchSheet();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeBranchSheet]);

  if (!open) return null;

  const actionLabel = getActionLabel(action);

  return (
    <div className={s.overlay} onClick={closeBranchSheet}>
      <div
        className={s.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="landing-branch-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s.header}>
          <div>
            <p className={s.eyebrow}>{actionLabel}</p>
            <h2 id="landing-branch-sheet-title" className={s.title}>
              Izvēlieties servisa centru
            </h2>
          </div>

          <button
            type="button"
            className={s.close}
            onClick={closeBranchSheet}
            aria-label="Aizvērt"
          >
            ×
          </button>
        </div>

        <div className={s.locations}>
          {locations.map((location) => (
            <div key={location.id} className={s.locationCard}>
              <div>
                <h3 className={s.locationTitle}>{location.label}</h3>
                {location.address ? (
                  <p className={s.address}>{location.address}</p>
                ) : null}
              </div>

              <Button
                href={getHref(location, action)}
                variant="primary"
                onClick={closeBranchSheet}
              >
                {actionLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
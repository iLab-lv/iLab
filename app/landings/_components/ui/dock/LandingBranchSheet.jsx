'use client';

import { useEffect } from 'react';

import LandingButton from '../button/LandingButton';
import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingBranchSheet.module.scss';

function getActionLabel(action) {
  if (action === 'call') return 'Zvanīt';
  if (action === 'whatsapp') return 'WhatsApp';
  return 'Sazināties';
}

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getHref(location, action) {
  if (action === 'call' && location.tel) {
    return `tel:${cleanTel(location.tel)}`;
  }

  if (action === 'whatsapp') {
    if (location.wa) return location.wa;

    const tel = cleanTel(location.tel);
    if (tel) return `https://wa.me/${tel.replace(/^\+/, '')}`;
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
  const tone = action === 'whatsapp' ? 'whatsapp' : 'accent';

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

              <LandingButton
                href={getHref(location, action)}
                variant="primary"
                tone={tone}
                size="md"
                onClick={closeBranchSheet}
              >
                {actionLabel}
              </LandingButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
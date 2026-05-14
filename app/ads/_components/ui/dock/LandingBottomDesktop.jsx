'use client';

import { useLandingCta } from '../providers/LandingCtaProvider';

import s from './LandingBottomDock.module.scss';

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function shortLabel(label = '') {
  const normalized = String(label).toLowerCase();

  if (normalized.includes('domina')) return 'T/C Domina Shopping';
  if (normalized.includes('spice')) return 'T/C Spice Life';

  return label;
}

function getWhatsAppHref(location) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);

  if (!tel) return '#';

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

export default function LandingBottomDesktop() {
  const { locations } = useLandingCta();

  return (
    <aside
      className={s.desktopDock}
      aria-label="Kontakti"
    >
      <div className={s.desktopInner}>
        {locations.map((location, index) => {
          const telHref = location.tel
            ? `tel:${cleanTel(location.tel)}`
            : '#';

          const waHref = getWhatsAppHref(location);

          return (
            <div key={location.id} className={s.desktopBranch}>
              <div className={s.desktopInfo}>
                <span className={s.desktopName}>
                  {shortLabel(location.label)}
                </span>

                {location.tel ? (
                  <a className={s.desktopPhone} href={telHref}>
                    {location.tel}
                  </a>
                ) : null}
              </div>

              <div className={s.desktopActions}>
                <a
                  className={s.circleButton}
                  href={telHref}
                  aria-label={`Zvanīt ${location.label}`}
                >
                  ☎
                </a>

                <a
                  className={s.circleButton}
                  href={waHref}
                  aria-label={`WhatsApp ${location.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WA
                </a>
              </div>

              {index < locations.length - 1 ? (
                <div className={s.separator} aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
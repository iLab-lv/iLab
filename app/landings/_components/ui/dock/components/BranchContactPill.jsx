'use client';

import s from './BranchContactPill.module.scss';

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getShortLabel(label = '') {
  const normalized = String(label).toLowerCase();

  if (normalized.includes('domina')) return 'T/C Domina Shopping';
  if (normalized.includes('spice')) return 'T/C Spice Home';

  return label;
}

function getWhatsAppHref(location = {}) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);

  if (!tel) return '#';

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

export default function BranchContactPill({ location }) {
  if (!location) return null;

  const telHref = location.tel ? `tel:${cleanTel(location.tel)}` : '#';
  const waHref = getWhatsAppHref(location);
  const shortLabel = getShortLabel(location.label);

  return (
    <div className={s.pill}>
      <div className={s.info}>
        <span className={s.name}>{shortLabel}</span>

        {location.tel ? (
          <a className={s.phone} href={telHref}>
            {location.tel}
          </a>
        ) : null}
      </div>

      <div className={s.actions}>
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
    </div>
  );
}
'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

import LandingButton from '@/app/landings/_components/ui/button/LandingButton';

import s from './BranchContactPill.module.scss';

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getShortLabel(label = '') {
  const normalized = String(label).toLowerCase();

  if (normalized.includes('domina')) {
    return 'T/C Domina Shopping';
  }

  if (normalized.includes('spice')) {
    return 'T/C Spice Home';
  }

  return label;
}

function getWhatsAppHref(location = {}) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);

  if (!tel) return '#';

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

function getLocationHref(location = {}) {
  if (location.id) {
    return `#${location.id}`;
  }

  return '#locations';
}

export default function BranchContactPill({ location }) {
  if (!location) return null;

  const telHref = location.tel
    ? `tel:${cleanTel(location.tel)}`
    : '#';

  const waHref = getWhatsAppHref(location);

  const shortLabel = getShortLabel(location.label);

  const locationHref = getLocationHref(location);

  return (
    <div className={s.pill}>
      <div className={s.info}>
        <a href={locationHref} className={s.name}>
          {shortLabel}
        </a>

        {location.tel ? (
          <span className={s.phone}>
            {location.tel}
          </span>
        ) : null}
      </div>

      <div className={s.actions}>
        <LandingButton
          href={telHref}
          variant="primary"
          tone="accent"
          size="sm"
          iconOnly
          leadingIcon={FaPhone}
          aria-label={`Zvanīt ${location.label}`}
        />

        <LandingButton
          href={waHref}
          variant="primary"
          tone="whatsapp"
          size="sm"
          iconOnly
          leadingIcon={FaWhatsapp}
          aria-label={`WhatsApp ${location.label}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
}
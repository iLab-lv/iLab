'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingFinalCta.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Готовы отремонтировать iPhone?',
      text: 'Уточним цену, наличие деталей и подскажем ближайший удобный филиал.',
      price: 'Узнать цену',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      note: 'Domina Shopping или Spice Home',
    };
  }

  return {
    title: 'Gatavs salabot iPhone?',
    text: 'Precizēsim cenu, detaļu pieejamību un ieteiksim ērtāko filiāli.',
    price: 'Uzzināt cenu',
    call: 'Zvanīt',
    whatsapp: 'WhatsApp',
    note: 'Domina Shopping vai Spice Home',
  };
}

function cleanTel(tel = '') {
  return String(tel).replace(/\s+/g, '');
}

function getWhatsAppHref(location = {}) {
  if (location.wa) return location.wa;

  const tel = cleanTel(location.tel);
  if (!tel) return '#';

  return `https://wa.me/${tel.replace(/^\+/, '')}`;
}

export default function LandingFinalCta({
  id = 'final-cta',
  locale = 'lv',
}) {
  const { locations, openPriceForm } = useLandingCta();
  const t = getContent(locale);

  const primaryLocation = locations?.[0] || null;

  const telHref = primaryLocation?.tel
    ? primaryLocation.telLink || `tel:${cleanTel(primaryLocation.tel)}`
    : '#';

  const waHref = getWhatsAppHref(primaryLocation);

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.content}>
            <p className={s.eyebrow}>{t.note}</p>

            <h2 id={`${id}-title`}>
              {t.title}
            </h2>

            <p className={s.text}>
              {t.text}
            </p>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.primaryButton}
              onClick={openPriceForm}
            >
              {t.price}
            </button>

            <a className={s.callButton} href={telHref}>
              <FaPhone aria-hidden="true" />
              {t.call}
            </a>

            <a
              className={s.whatsappButton}
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
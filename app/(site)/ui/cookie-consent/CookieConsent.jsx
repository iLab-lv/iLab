'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import s from './CookieConsent.module.scss';

import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_REJECTED,
  getCookieConsent,
  setCookieConsent,
} from './cookieConsent.helpers';

const CONTENT = {
  lv: {
    ariaLabel: 'Sīkfailu paziņojums',
    title: 'Mēs izmantojam sīkfailus',
    text: 'Izmantojam nepieciešamos sīkfailus mājaslapas darbībai un analītikas sīkfailus, lai saprastu, kā uzlabot iLab.lv.',
    reject: 'Noraidīt',
    accept: 'Pieņemt',
  },
  ru: {
    ariaLabel: 'Уведомление о cookies',
    title: 'Мы используем cookies',
    text: 'Мы используем необходимые cookies для работы сайта и аналитические cookies, чтобы понимать, как улучшать iLab.lv.',
    reject: 'Отклонить',
    accept: 'Принять',
  },
};

function getLocaleFromPathname(pathname = '/') {
  return pathname.startsWith('/ru') ? 'ru' : 'lv';
}

export default function CookieConsent() {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPathname(pathname);
  const t = CONTENT[locale];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();

    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookieConsent(COOKIE_CONSENT_ACCEPTED);
    window.dispatchEvent(new Event('ilab-cookie-consent-change'));
    setVisible(false);
  }

  function handleReject() {
    setCookieConsent(COOKIE_CONSENT_REJECTED);
    window.dispatchEvent(new Event('ilab-cookie-consent-change'));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section className={s.cookieConsent} aria-label={t.ariaLabel}>
      <div className={s.content}>
        <h2 className={s.title}>{t.title}</h2>
        <p className={s.text}>{t.text}</p>
      </div>

      <div className={s.actions}>
        <button type="button" className={s.secondary} onClick={handleReject}>
          {t.reject}
        </button>

        <button type="button" className={s.primary} onClick={handleAccept}>
          {t.accept}
        </button>
      </div>
    </section>
  );
}
'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

import LandingButton from '../ui/button/LandingButton';
import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingFinalCta.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      titleMain: 'Radusies problēma?',
      titleAccent: 'Починим быстро.',
      text: 'Уточним цену, наличие деталей и подскажем ближайший удобный филиал.',
      price: 'Узнать цену',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      note: 'Domina Shopping или Spice Life',
    };
  }

  return {
    titleMain: 'Radusies problēma?',
    titleAccent: 'Salabosim ātri.',
    text: 'Precizēsim cenu, detaļu pieejamību un ieteiksim ērtāko filiāli.',
    price: 'Uzzināt cenu',
    call: 'Zvanīt',
    whatsapp: 'WhatsApp',
    note: 'T/C Domina Shopping vai T/C Spice Life',
  };
}

export default function LandingFinalCta({
  id = 'final-cta',
  locale = 'lv',
}) {
  const { openPriceForm, openBranchSheet } = useLandingCta();
  const t = getContent(locale);

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
              {t.titleMain}
              <span>{t.titleAccent}</span>
            </h2>

            <p className={s.text}>
              {t.text}
            </p>
          </div>

          <div className={s.actions}>
            <LandingButton
              type="button"
              variant="primary"
              tone="accent"
              size="lg"
              onClick={openPriceForm}
            >
              {t.price}
            </LandingButton>

            <LandingButton
              type="button"
              variant="primary"
              tone="accent"
              size="lg"
              leadingIcon={FaPhone}
              onClick={() => openBranchSheet('call')}
            >
              {t.call}
            </LandingButton>

            <LandingButton
              type="button"
              variant="secondary"
              tone="whatsapp"
              size="lg"
              leadingIcon={FaWhatsapp}
              onClick={() => openBranchSheet('whatsapp')}
            >
              {t.whatsapp}
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
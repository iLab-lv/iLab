'use client';

import Image from 'next/image';
import {
    FaBoxOpen,
  FaTruckFast,
  FaClipboardCheck,
} from 'react-icons/fa6';

import LandingButton from '../ui/button/LandingButton';
import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingDelivery.module.scss';

const DELIVERY_PARTNERS = [
  {
    name: 'Omniva',
    src: '/images/delivery/Omniva_logo.svg',
    className: s.logoOmniva,
  },
  {
    name: 'DPD',
    src: '/images/delivery/DPD_logo.svg',
    className: s.logoDpd,
  },
  {
    name: 'SmartPosti',
    src: '/images/delivery/SmartPosti_logo.svg',
    className: s.logoSmartposti,
  },
  {
    name: 'Latvijas Pasts',
    src: '/images/delivery/Latvijas_Pasts.svg',
    className: s.logoPasts,
  },
];

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      eyebrow: 'Ремонт с доставкой',

      title: 'Отправь iPhone через пакомат',
      accent: 'получи обратно бесплатно',

      note:
        'Большинство ремонтов выполняем в тот же день после получения устройства.',

      subtitle:
        'Можно отправить устройство через Omniva, DPD, SmartPosti или Latvijas Pasts. Мы отремонтируем iPhone и отправим обратно в удобный пакомат без дополнительной платы.',

      cta: 'Записать ремонт с доставкой',

      steps: [
        {
          icon: <FaBoxOpen />,
          title: 'Отправляешь iPhone',
          text:
            'Выбираешь удобный пакомат или почтовую доставку.',
        },
        {
          icon: <FaRotate />,
          title: 'Согласуем ремонт',
          text:
            'Уточняем цену и наличие деталей перед ремонтом.',
        },
        {
          icon: <FaTruckFast />,
          title: 'Отправляем обратно',
          text:
            'Получаешь устройство в выбранном пакомате без дополнительной платы.',
        },
      ],
    };
  }

  return {
    eyebrow: 'Remonts ar piegādi',

    title: 'Nosūti iPhone ar pakomātu',
    accent: 'saņem atpakaļ bez papildu maksas',

    note:
      'Vairumu remontu veicam tajā pašā dienā pēc ierīces saņemšanas.',

    subtitle:
      'Vari nosūtīt ierīci ar Omniva, DPD, SmartPosti vai Latvijas Pastu. Salabosim iPhone un nosūtīsim atpakaļ uz tev ērtāko pakomātu.',

    cta: 'Pieteikt remontu ar piegādi',

    steps: [
  {
    icon: <FaClipboardCheck />,
    title: 'Aizpildi pieteikumu',
    text:
      'Apraksti problēmu un ierīces modeli. Izvērtēsim remontu un sazināsimies ar precīzāku informāciju.',
  },
  {
    icon: <FaBoxOpen />,
    title: 'Nosūti ierīci',
    text:
      'Pēc apstiprinājuma nosūti ierīci ar sev ērtāko pakomātu vai pasta piegādi.',
  },
  {
    icon: <FaTruckFast />,
    title: 'Saņem atpakaļ',
    text:
      'Pēc remonta nosūtām ierīci atpakaļ uz adresi vai pakomātu bez papildu maksas.',
  },
    ],
  };
}

export default function LandingDelivery({
  id = 'delivery',
  locale = 'lv',
}) {
  const content = getContent(locale);

  const { openDeliveryForm } = useLandingCta();

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.copy}>
          <div className={s.eyebrow}>
            {content.eyebrow}
          </div>

          <h2 id={`${id}-title`}>
            {content.title}{' '}
            <span>{content.accent}</span>
          </h2>

          <p className={s.note}>
            {content.note}
          </p>

          <p>{content.subtitle}</p>

          <LandingButton
            type="button"
            variant="primary"
            tone="accent"
            size="lg"
            onClick={openDeliveryForm}
          >
            {content.cta}
          </LandingButton>
        </div>

        <div className={s.panel}>
          <div
            className={s.logos}
            aria-label="Piegādes pakalpojumi"
          >
            {DELIVERY_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className={s.logoPill}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={140}
                  height={40}
                  className={`${s.logoImage} ${partner.className}`}
                />
              </div>
            ))}
          </div>

          <div className={s.steps}>
            {content.steps.map((step) => (
              <article
                key={step.title}
                className={s.step}
              >
                <span
                  className={s.icon}
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
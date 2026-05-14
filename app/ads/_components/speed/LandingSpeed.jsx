'use client';

import {
  FaBoxOpen,
  FaClock,
  FaLocationDot,
} from 'react-icons/fa6';

import LandingButton from '../ui/button/LandingButton';
import { useLandingCta } from '../ui/providers/LandingCtaProvider';

import s from './LandingSpeed.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Без долгого ожидания',
      subtitle:
        'Популярные работы выполняем быстро, если нужная деталь есть в наличии.',

      bookingTitle: 'Подготовим деталь',
      bookingAccent: 'до вашего визита',
      bookingText:
        'Уточним наличие и предложим удобное время для диагностики или замены.',
      bookingCta: 'Забронировать время',

      cards: [
        {
          icon: <FaClock />,
          value: '20–40 мин',
          title: 'для самых быстрых работ без очереди',
        },
        {
          icon: <FaLocationDot />,
          value: '2 филиала в Риге',
          title: 'T/C Domina Shopping и T/C Spice Life',
        },
        {
          icon: <FaBoxOpen />,
          value: 'Детали на месте',
          title:
            'на складе доступен широкий выбор оригинальных и аналоговых деталей',
        },
      ],
    };
  }

  return {
    title: 'Ātri, bez ilgas gaidīšanas',
    subtitle:
      'Populārāko bojājumu novēršanu veicam ātri, ja detaļa ir pieejama uz vietas.',

    bookingTitle: 'Sagatavosim detaļu',
    bookingAccent: 'pirms tava apmeklējuma',
    bookingText:
      'Precizēsim pieejamību un ieteiksim ērtāko laiku diagnostikai vai detaļas maiņai.',
    bookingCta: 'Rezervēt laiku',

    cards: [
      {
        icon: <FaClock />,
        value: '20–40 min',
        title: 'Ātrākajiem darbiem bez rindas',
      },
      {
        icon: <FaLocationDot />,
        value: '2 filiāles Rīgā',
        title: 'T/C Domina Shopping un T/C Spice Life',
      },
      {
        icon: <FaBoxOpen />,
        value: 'Detaļas uz vietas',
        title:
          'Mūsu noliktavā ir pieejama plaša oriģinālo un analogo rezerves daļu izvēle.',
      },
    ],
  };
}

export default function LandingSpeed({
  id = 'speed',
  locale = 'lv',
}) {
  const content = getContent(locale);
  const { openBookingForm } = useLandingCta();

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id={`${id}-title`}>{content.title}</h2>
          <p>{content.subtitle}</p>
        </div>

        <div className={s.grid}>
          {content.cards.map((card) => (
            <article key={card.value} className={s.card}>
              <span className={s.icon} aria-hidden="true">
                {card.icon}
              </span>

              <strong>{card.value}</strong>

              <span>{card.title}</span>
            </article>
          ))}
        </div>

        <div className={s.booking}>
          <div className={s.bookingContent}>
            <h3>
              {content.bookingTitle}{' '}
              <span>{content.bookingAccent}</span>
            </h3>

            <p>{content.bookingText}</p>
          </div>

          <LandingButton
            type="button"
            variant="primary"
            tone="accent"
            size="lg"
            onClick={openBookingForm}
          >
            {content.bookingCta}
          </LandingButton>
        </div>
      </div>
    </section>
  );
}
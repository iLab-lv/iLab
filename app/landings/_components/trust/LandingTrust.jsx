import {
  FaAward,
  FaMobileScreenButton,
  FaStar,
} from 'react-icons/fa6';

import s from './LandingTrust.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getTotalReviews(reviewsSummary = {}) {
  return (
    Number(reviewsSummary?.domina?.count || 0) +
    Number(reviewsSummary?.spice?.count || 0)
  );
}

function getAverageRating(reviewsSummary = {}) {
  const ratings = [
    Number(reviewsSummary?.domina?.rating || 0),
    Number(reviewsSummary?.spice?.rating || 0),
  ].filter(Boolean);

  if (!ratings.length) return '4.9';

  const avg =
    ratings.reduce((sum, value) => sum + value, 0) /
    ratings.length;

  return avg.toFixed(1);
}

function roundReviews(value) {
  if (!value) return 0;

  return Math.floor(value / 10) * 10;
}

function getCards(locale, reviewsSummary) {
  const totalReviews = roundReviews(
    getTotalReviews(reviewsSummary)
  );

  const avgRating = getAverageRating(reviewsSummary);

  if (normalizeLocale(locale) === 'ru') {
    return [
      {
        icon: <FaAward />,
        value: '10+',
        title: 'лет опыта',
        text: 'Ремонт iPhone в Риге.',
      },
      {
        icon: <FaMobileScreenButton />,
        value: '20K+',
        title: 'отремонтированных устройств',
        text: 'Apple и другие смартфоны.',
      },
      {
        icon: <FaStar />,
        value: `${totalReviews}+`,
        title: 'Google отзывов',
        text: `${avgRating}★ средний рейтинг`,
      },
    ];
  }

  return [
    {
      icon: <FaAward />,
      value: '10+',
      title: 'gadu pieredze',
      text: 'iPhone remonts Rīgā.',
    },
    {
      icon: <FaMobileScreenButton />,
      value: '20K+',
      title: 'salabotu ierīču',
      text: 'Apple un citu telefonu remonts.',
    },
    {
      icon: <FaStar />,
      value: `${totalReviews}+`,
      title: 'Google atsauksmes',
      text: `${avgRating}★ vidējais vērtējums`,
    },
  ];
}

export default function LandingTrust({
  id = 'trust',
  locale = 'lv',
  reviewsSummary = {},
}) {
  const cards = getCards(locale, reviewsSummary);

  return (
    <section
      id={id}
      className={s.section}
      aria-label="iLab uzticības rādītāji"
    >
      <div className={s.container}>
        <div className={s.grid}>
          {cards.map((card) => (
            <article
              key={`${card.value}-${card.title}`}
              className={s.card}
            >
              <div className={s.icon}>
                {card.icon}
              </div>

              <div className={s.value}>
                {card.value}
              </div>

              <h3 className={s.title}>
                {card.title}
              </h3>

              <p className={s.text}>
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
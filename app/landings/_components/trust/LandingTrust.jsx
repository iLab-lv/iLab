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

function getItems(locale, reviewsSummary) {
  const totalReviews = roundReviews(
    getTotalReviews(reviewsSummary)
  );

  const avgRating = getAverageRating(reviewsSummary);

  if (normalizeLocale(locale) === 'ru') {
    return [
      {
        icon: <FaAward />,
        value: '10+',
        label: 'лет ремонтируем iPhone',
        text: 'в Риге',
      },
      {
        icon: <FaMobileScreenButton />,
        value: '20K+',
        label: 'устройств снова как новые',
        text: 'Apple и другие смартфоны',
      },
      {
        icon: <FaStar />,
        value: `${totalReviews}+`,
        label: 'отзывов клиентов',
        text: `${avgRating}★ рейтинг Google`,
      },
    ];
  }

  return [
    {
      icon: <FaAward />,
      value: '10+',
      label: 'gadi remontējam iPhone',
      text: 'Rīgā',
    },
    {
      icon: <FaMobileScreenButton />,
      value: '20K+',
      label: 'ierīču atkal kā jaunas',
      text: 'Apple un citi viedtālruņi',
    },
    {
      icon: <FaStar />,
      value: `${totalReviews}+`,
      label: 'klientu atsauksmes',
      text: `${avgRating}★ Google vērtējums`,
    },
  ];
}

export default function LandingTrust({
  id = 'trust',
  locale = 'lv',
  reviewsSummary = {},
}) {
  const items = getItems(locale, reviewsSummary);

  return (
    <section
      id={id}
      className={s.section}
      aria-label="iLab uzticības rādītāji"
    >
      <div className={s.container}>
        <div className={s.band}>
          {items.map((item) => (
            <article
              key={`${item.value}-${item.label}`}
              className={s.item}
            >
              <div className={s.icon} aria-hidden="true">
                {item.icon}
              </div>

              <div className={s.copy}>
                <div className={s.main}>
                  <span className={s.value}>
                    {item.value}
                  </span>
                  <span className={s.label}>
                    {item.label}
                  </span>
                </div>

                <p className={s.text}>
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
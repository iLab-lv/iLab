import {
  FaBolt,
  FaClock,
  FaLocationDot,
} from 'react-icons/fa6';

import s from './LandingSpeed.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Ремонт без долгого ожидания',
      subtitle:
        'Популярные ремонты выполняем быстро, если нужная деталь есть в наличии.',
      cards: [
        {
          icon: <FaClock />,
          value: '20–40 мин',
          title: 'популярные ремонты',
        },
        {
          icon: <FaBolt />,
          value: 'Пока ждёте',
          title: 'часто можно забрать в тот же визит',
        },
        {
          icon: <FaLocationDot />,
          value: '2 филиала',
          title: 'Domina Shopping и Spice Home',
        },
      ],
    };
  }

  return {
    title: 'Remonts bez ilgas gaidīšanas',
    subtitle:
      'Populārākos remontus veicam ātri, ja detaļa ir pieejama uz vietas.',
    cards: [
      {
        icon: <FaClock />,
        value: '20–40 min',
        title: 'populārākie remonti',
      },
      {
        icon: <FaBolt />,
        value: 'Kamēr gaidi',
        title: 'bieži iespējams saņemt tajā pašā vizītē',
      },
      {
        icon: <FaLocationDot />,
        value: '2 filiāles',
        title: 'Domina Shopping un Spice Home',
      },
    ],
  };
}

export default function LandingSpeed({
  id = 'speed',
  locale = 'lv',
}) {
  const content = getContent(locale);

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
      </div>
    </section>
  );
}
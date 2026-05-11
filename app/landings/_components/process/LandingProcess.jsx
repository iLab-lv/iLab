import s from './LandingProcess.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Как проходит ремонт',
      subtitle: 'Простой процесс без лишней бюрократии.',
      steps: [
        {
          title: 'Свяжитесь с нами',
          text: 'Позвоните, напишите в WhatsApp или оставьте заявку.',
        },
        {
          title: 'Уточняем цену',
          text: 'Подскажем ориентировочную стоимость и наличие деталей.',
        },
        {
          title: 'Приносите iPhone',
          text: 'Выберите удобный филиал: Domina Shopping или Spice Home.',
        },
        {
          title: 'Забираете готовый',
          text: 'Многие ремонты выполняем в тот же день.',
        },
      ],
    };
  }

  return {
    title: 'Kā notiek remonts',
    subtitle: 'Vienkāršs process bez liekas sarežģīšanas.',
    steps: [
      {
        title: 'Sazinies ar mums',
        text: 'Zvani, raksti WhatsApp vai atstāj pieteikumu.',
      },
      {
        title: 'Precizējam cenu',
        text: 'Pateiksim aptuveno cenu un detaļu pieejamību.',
      },
      {
        title: 'Atnes iPhone',
        text: 'Izvēlies ērtāko filiāli: Domina Shopping vai Spice Home.',
      },
      {
        title: 'Saņem gatavu',
        text: 'Biežākos remontus veicam tajā pašā dienā.',
      },
    ],
  };
}

export default function LandingProcess({
  id = 'process',
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

        <div className={s.grid} role="list">
          {content.steps.map((step, index) => (
            <article
              key={step.title}
              className={s.card}
              role="listitem"
            >
              <div className={s.badge} aria-hidden="true">
                {index + 1}
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
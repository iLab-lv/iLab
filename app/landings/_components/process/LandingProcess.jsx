import s from './LandingProcess.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Как всё проходит',
      subtitle: 'Простой процесс без лишней бюрократии.',
      steps: [
        {
          title: 'Свяжитесь с нами',
          text: 'Позвоните, напишите в WhatsApp или оставьте заявку.',
        },
        {
          title: 'Уточняем стоимость',
          text: 'Подскажем ориентировочную цену и наличие деталей.',
        },
        {
          title: 'Приносите устройство',
          text: 'Выберите удобный филиал: Domina Shopping или Spice Life.',
        },
        {
          title: 'Забираете готовое',
          text: 'Популярные работы часто выполняем в тот же день.',
        },
      ],
    };
  }

  return {
    title: 'Kā tas notiek',
    subtitle: 'Vienkāršs process bez liekas sarežģīšanas.',
    steps: [
      {
        title: 'Sazinies ar mums',
        text: 'Zvani, raksti WhatsApp vai atstāj pieteikumu.',
      },
      {
        title: 'Precizējam izmaksas',
        text: 'Pateiksim aptuveno cenu un detaļu pieejamību.',
      },
      {
        title: 'Atnes ierīci',
        text: 'Izvēlies ērtāko filiāli: Domina Shopping vai Spice Life.',
      },
      {
        title: 'Saņem gatavu',
        text: 'Biežākos darbus veicam tajā pašā dienā.',
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
              <div className={s.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className={s.cardCopy}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
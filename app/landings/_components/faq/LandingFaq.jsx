'use client';

import s from './LandingFaq.module.scss';

function normalizeLocale(locale) {
  return locale === 'ru' ? 'ru' : 'lv';
}

function sanitizeHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '');
}

function getContent(locale) {
  if (normalizeLocale(locale) === 'ru') {
    return {
      title: 'Частые вопросы',
      subtitle:
        'Коротко о сроках, гарантии, деталях и том, что важно знать перед обращением.',
      items: [
        {
          q: 'Сколько это занимает?',
          a: 'Популярные работы — замена дисплея, аккумулятора, разъёма зарядки или камеры — часто выполняем в тот же день. Во многих случаях это занимает примерно 20–60 минут, если нужная деталь есть в наличии.',
        },
        {
          q: 'Можно ли приехать без записи?',
          a: 'Да, можно приехать без предварительной записи в T/C Domina Shopping или T/C Spice Life. Но если хотите не ждать и сразу понять ориентировочную стоимость, лучше заранее написать или позвонить — мы проверим наличие детали под вашу модель.',
        },
        {
          q: 'Сохраняются ли Face ID и True Tone?',
          a: 'При аккуратной замене дисплея мы стараемся сохранить Face ID и True Tone, если эти функции работали до повреждения и проблема не затронула связанные модули. Перед началом работ мастер проверит устройство и объяснит, что можно сохранить в вашем конкретном случае.',
        },
        {
          q: 'Какая гарантия на выполненные работы?',
          a: 'На выполненные работы и установленные детали предоставляется гарантия. Срок зависит от вида работ и выбранной детали, но для популярных замен обычно действует гарантия до 1 года.',
        },
        {
          q: 'Какие детали вы используете?',
          a: 'Предлагаем несколько вариантов деталей: оригинальные, восстановленные оригинальные или качественные совместимые аналоги — в зависимости от модели, наличия и бюджета. Перед началом работ объясним разницу по цене, качеству изображения, чувствительности сенсора и сроку службы.',
        },
        {
          q: 'Удалятся ли данные с устройства?',
          a: 'Обычно при замене экрана, аккумулятора, камеры или разъёма зарядки данные не удаляются. Мы не сбрасываем устройство без необходимости. Если устройство сильно повреждено или было залито жидкостью, по возможности рекомендуем заранее сделать резервную копию.',
        },
      ],
    };
  }

  return {
    title: 'Biežāk uzdotie jautājumi',
    subtitle:
      'Svarīgākais par izpildes laiku, garantiju, detaļām un to, kas jāzina pirms pieteikuma.',
    items: [
      {
        q: 'Cik ilgi tas aizņem?',
        a: 'Populārākos darbus — displeja, baterijas, uzlādes ligzdas vai kameras maiņu — bieži paveicam tajā pašā dienā. Daudzos gadījumos tas aizņem aptuveni 20–60 minūtes, ja nepieciešamā detaļa ir pieejama uz vietas.',
      },
      {
        q: 'Vai var ierasties bez pieraksta?',
        a: 'Jā, vari ierasties bez iepriekšēja pieraksta T/C Domina Shopping vai T/C Spice Life. Tomēr, ja vēlies izvairīties no gaidīšanas un uzreiz uzzināt orientējošu cenu, iesakām pirms braukšanas uzrakstīt vai piezvanīt — pārbaudīsim detaļas pieejamību tavam modelim.',
      },
      {
        q: 'Vai saglabājas Face ID un True Tone?',
        a: 'Veicot korektu displeja maiņu, cenšamies saglabāt gan Face ID, gan True Tone funkcionalitāti, ja šīs funkcijas darbojās pirms bojājuma un problēma nav skārusi saistītos moduļus. Pirms darbu sākšanas meistars pārbaudīs ierīci un paskaidros, ko iespējams saglabāt konkrētajā gadījumā.',
      },
      {
        q: 'Kāda garantija ir veiktajiem darbiem?',
        a: 'Veiktajiem darbiem un uzstādītajām detaļām nodrošinām garantiju. Garantijas termiņš ir atkarīgs no darbu veida un izvēlētās detaļas, bet populārākajām maiņām parasti nodrošinām garantiju līdz 1 gadam.',
      },
      {
        q: 'Kādas detaļas izmantojat?',
        a: 'Piedāvājam vairākus detaļu variantus — oriģinālas, atjaunotas oriģinālās vai kvalitatīvas alternatīvās detaļas atkarībā no modeļa, pieejamības un budžeta. Pirms darbu sākšanas paskaidrosim atšķirības cenā, attēla kvalitātē, skārienjutībā un kalpošanas ilgumā.',
      },
      {
        q: 'Vai dati pazudīs?',
        a: 'Parasti displeja, baterijas, kameras vai uzlādes ligzdas maiņas laikā dati netiek dzēsti. Ierīci bez vajadzības nepārinstalējam un neatiestatām. Ja ierīce ir stipri bojāta vai bijusi mitrumā, pēc iespējas iesakām iepriekš izveidot rezerves kopiju.',
      },
    ],
  };
}

export default function LandingFaq({
  id = 'faq',
  locale = 'lv',
  title,
  items,
}) {
  const content = getContent(locale);

  const sectionTitle = title || content.title;
  const sectionItems =
    Array.isArray(items) && items.length > 0
      ? items
      : content.items;

  return (
    <section
      id={id}
      className={s.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <div className={s.header}>
          <h2 id={`${id}-title`}>{sectionTitle}</h2>
          <p>{content.subtitle}</p>
        </div>

        <div className={s.faqList}>
          {sectionItems.map(({ q, a }, index) => {
            const isHtmlString =
              typeof a === 'string' &&
              /<\/?[a-z][\s\S]*>/i.test(a);

            return (
              <details
                key={`${id}-${index}-${q}`}
                className={s.item}
                open={index === 0}
              >
                <summary className={s.summary}>
                  <span>{q}</span>
                  <span
                    className={s.chevron}
                    aria-hidden="true"
                  />
                </summary>

                <div className={s.answer}>
                  {typeof a === 'string' ? (
                    isHtmlString ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(a),
                        }}
                      />
                    ) : (
                      <p>{a}</p>
                    )
                  ) : (
                    a
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
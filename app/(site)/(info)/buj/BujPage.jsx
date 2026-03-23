import Script from 'next/script';

import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';
import {
  getBasicFaqGroup,
  getCategoryFaqGroup,
} from '@sections/faq/faq.data';
import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import s from '@styles/Catalog.module.scss';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      pageTitle: 'Часто задаваемые вопросы',
      intro:
        'Собрали ответы на самые частые вопросы о ремонте телефонов, iPhone, планшетов, компьютеров и Dyson: диагностика, сроки, гарантия, стоимость и популярные виды ремонта.',
      allQuestionsTitle: 'Все вопросы по категориям',
    };
  }

  return {
    pageTitle: 'Biežāk uzdotie jautājumi',
    intro:
      'Apkopojām atbildes uz biežākajiem jautājumiem par telefonu, iPhone, planšetdatoru, datoru un Dyson remontu — diagnostiku, termiņiem, garantiju, cenām un populārākajiem remonta darbiem.',
    allQuestionsTitle: 'Visi jautājumi pa kategorijām',
  };
}

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeText(item?.q || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function getFaqSections(locale = 'lv') {
  const sections = await Promise.all([
    getBasicFaqGroup(locale),
    getCategoryFaqGroup('telefonu-remonts', locale),
    getCategoryFaqGroup('iphone-remonts', locale),
    getCategoryFaqGroup('plansetdatoru-remonts', locale),
    getCategoryFaqGroup('datoru-remonts', locale),
    getCategoryFaqGroup('dyson-remonts', locale),
  ]);

  return sections.filter(
    (group) => group && Array.isArray(group.items) && group.items.length > 0
  );
}

export default async function DukPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const sections = await getFaqSections(locale);

  const mergedItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedItems);

  return (
    <>
      <Script
        id="duk-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <section className={s.section} aria-labelledby="duk-faq-h2">
        <div className={s.container}>
          <h2 id="duk-faq-h2" className={s.h2}>
            {strings.pageTitle}
          </h2>

          <p className={s.intro}>{strings.intro}</p>
        </div>
      </section>

      <section className={s.section} aria-labelledby="duk-faq-groups-h2">
        <div className={s.container}>
          <h2 id="duk-faq-groups-h2" className={s.h2}>
            {strings.allQuestionsTitle}
          </h2>

          {sections.map((section, index) => (
            <div
              key={`duk-faq-group-${index}-${section.title}`}
              className={index > 0 ? s.stackLg : ''}
            >
              <Faq
                id={`duk-faq-group-${index + 1}`}
                title={section.title}
                items={toFaqRenderItems(section.items)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}
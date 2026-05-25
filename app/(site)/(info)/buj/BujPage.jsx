import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

export function getBujPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      pagePath: '/ru/faq',
      homeCrumb: 'Главная',
      pageCrumb: 'Часто задаваемые вопросы',
      headerTitle: 'Часто задаваемые вопросы',
      headerLead:
        'Собрали ответы на самые частые вопросы о ремонте телефонов, iPhone, планшетов, компьютеров и Dyson: диагностика, сроки, гарантия, стоимость и популярные виды ремонта.',
      allQuestionsTitle: 'Все вопросы по категориям',
      fallbackGroupTitle: 'Другие вопросы',
      basicTitle: 'Общие вопросы',
      metaTitle: 'Часто задаваемые вопросы | iLab',
      metaDescription:
        'iLab - ответы на частые вопросы о ремонте телефонов, iPhone, планшетов, компьютеров и Dyson: диагностика, сроки, гарантия, стоимость и популярные виды ремонта.',
      groupTitles: {
        'telefonu-remonts': 'Ремонт телефонов',
        'iphone-remonts': 'Ремонт iPhone',
        'plansetdatoru-remonts': 'Ремонт планшетов',
        'datoru-remonts': 'Ремонт компьютеров',
        'dyson-remonts': 'Ремонт Dyson',
        'baterijas-maina': 'Замена батареи',
        'ekrana-maina': 'Замена экрана',
        'uzlades-ligzdas-maina': 'Ремонт разъёма зарядки',
        'kameras-remonts': 'Ремонт камеры',
        'skalruni-mikrofona-remonts': 'Ремонт динамика и микрофона',
        'udens-bojajumu-remonts': 'Ремонт после попадания влаги',
      },
    };
  }

  return {
    pagePath: '/buj',
    homeCrumb: 'Sākums',
    pageCrumb: 'Biežāk uzdotie jautājumi',
    headerTitle: 'Biežāk uzdotie jautājumi',
    headerLead:
      'Apkopojām atbildes uz biežākajiem jautājumiem par telefonu, iPhone, planšetdatoru, datoru un Dyson remontu - diagnostiku, termiņiem, garantiju, cenām un populārākajiem remonta darbiem.',
    allQuestionsTitle: 'Visi jautājumi pa kategorijām',
    fallbackGroupTitle: 'Citi jautājumi',
    basicTitle: 'Vispārīgi jautājumi',
    metaTitle: 'Biežāk uzdotie jautājumi | iLab',
    metaDescription:
      'iLab - biežāk uzdotie jautājumi par telefonu, iPhone, planšetdatoru, datoru un Dyson remontu, kā arī diagnostiku, termiņiem, garantiju un populārākajiem remonta darbiem.',
    groupTitles: {
      'telefonu-remonts': 'Telefonu remonts',
      'iphone-remonts': 'iPhone remonts',
      'plansetdatoru-remonts': 'Planšetdatoru remonts',
      'datoru-remonts': 'Datoru remonts',
      'dyson-remonts': 'Dyson remonts',
      'baterijas-maina': 'Baterijas maiņa',
      'ekrana-maina': 'Ekrāna maiņa',
      'uzlades-ligzdas-maina': 'Uzlādes ligzdas maiņa',
      'kameras-remonts': 'Kameras remonts',
      'skalruni-mikrofona-remonts': 'Skaļruņu un mikrofona remonts',
      'udens-bojajumu-remonts': 'Ūdens bojājumu remonts',
    },
  };
}

export default function BujPage({
  locale = 'lv',

  labels,
  sections = [],

  headerTitle,
  headerLead,
  breadcrumbs = [],
}) {
  const strings = labels || getBujPageStrings(locale);

  return (
    <>
      <PageHeader
        title={headerTitle || strings.headerTitle}
        lead={headerLead || strings.headerLead}
        crumbs={breadcrumbs}
      />

      <section className={s.section} aria-labelledby="buj-faq-groups-h2">
        <div className={s.container}>
          <h2 id="buj-faq-groups-h2" className={s.h2}>
            {strings.allQuestionsTitle}
          </h2>

          {sections.map((section, index) => (
            <div
              key={`buj-faq-group-${index}-${section.id}`}
              className={index > 0 ? s.stackLg : ''}
            >
              <Faq
                id={`buj-faq-group-${index + 1}`}
                title={section.title}
                items={section.renderItems}
                headingLevel={2}
                variant="accordion"
                locale={locale}
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
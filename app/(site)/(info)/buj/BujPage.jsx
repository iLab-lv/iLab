import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import InfoHero from '@/_components/sections/service-recovery/InfoHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';
import recovery from '@/_components/sections/service-recovery/RemainingPages.module.scss';
import Faq from '@/_components/sections/faq/ServiceFaq';
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
        'fotoaparatu-remonts': 'Ремонт фотоаппаратов',
        'iphone-plates-remonts': 'Ремонт платы iPhone',
        cenas: 'Цены',
        contacts: 'Контакты',
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
      'fotoaparatu-remonts': 'Fotoaparātu remonts',
      'iphone-plates-remonts': 'iPhone plates remonts',
      cenas: 'Cenas',
      contacts: 'Kontakti',
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
  const groupTitle = section => section.title === 'contact' ? (locale === 'ru' ? 'Контакты' : 'Kontakti') : section.title;

  return (
    <ServiceRecovery family="buj" className={recovery.page}>
      <InfoHero locale={locale}
        contactPrompt
        secondary={{ href: locale === 'ru' ? '/ru/ceny' : '/cenas', label: locale === 'ru' ? 'Цены' : 'Cenas' }}
        title={headerTitle || strings.headerTitle}
        lead={headerLead || strings.headerLead}
        crumbs={breadcrumbs}
      />

      <section className={s.section} aria-labelledby="buj-faq-groups-h2">
        <div className={recovery.faqLayout}>
          <nav className={recovery.faqToc} aria-labelledby="buj-faq-groups-h2">
          <h2 id="buj-faq-groups-h2" className={s.h2}>
            {strings.allQuestionsTitle}
          </h2>
          <ol>{sections.map((section, index) => <li key={section.id || index}><a href={`#buj-faq-group-${index + 1}`}>{groupTitle(section)}</a><span>{section.renderItems.length}</span></li>)}</ol>
          </nav>
          <div className={recovery.faqGroups}>
          {sections.map((section, index) => (
            <div
              key={`buj-faq-group-${index}-${section.id}`}
              className={index > 0 ? s.stackLg : ''}
            >
              <ServiceBlock kind="faq"><Faq
                id={`buj-faq-group-${index + 1}`}
                title={groupTitle(section)}
                items={section.renderItems.map(item => ({
                  ...item,
                  a: typeof item.a === 'string'
                    ? item.a.replace(/href=(["'])#locations\1/g, `href="${locale === 'ru' ? '/ru/kontakty' : '/kontakti'}#locations"`)
                    : item.a,
                }))}
                headingLevel={2}
                variant="accordion"
                locale={locale}
                openFirst={index === 0}
              /></ServiceBlock>
            </div>
          ))}
          </div>
        </div>
      </section>

      <QuickContactsSection locale={locale} />

      <section className={s.section}>
        <ServiceBlock kind="genericClosing"><ConvertBand locale={locale} /></ServiceBlock>
      </section>
    </ServiceRecovery>
  );
}

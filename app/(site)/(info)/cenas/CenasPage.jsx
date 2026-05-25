import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import BrandPickerPricelist from '@sections/service-pricelist/BrandPickerPricelist';

import s from '@styles/Catalog.module.scss';

export function getCenasPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      servicePath: '/ru/ceny',
      pageName: 'Цены | iLab',
      pageDescription:
        'Цены на ремонт iLab по модели. Выберите бренд и модель устройства, чтобы увидеть все цены на услуги в одном месте.',
      homeCrumb: 'Главная',
      pageCrumb: 'Цены',
      headerTitle: 'Цены на ремонт',
      headerLead:
        'Выберите бренд и модель устройства, чтобы посмотреть опубликованные цены на ремонт, сроки и доступные услуги в одном месте.',
      brandPickerTitle: 'Выберите бренд',
      pricelistTitle: 'Цены по модели',
      ctaLabel: 'Записаться на ремонт',
      processTitle: 'Как узнать точную цену',
      processSteps: [
        {
          title: 'Выберите модель',
          text: 'Найдите свой бренд и модель в прайс-листе - вы увидите опубликованные цены и типовые услуги.',
        },
        {
          title: 'Если цены нет - свяжитесь с нами',
          text: 'Для некоторых более редких моделей или работ цена определяется после диагностики и проверки наличия деталей.',
        },
        {
          title: 'Согласуем смету и срок',
          text: 'Перед ремонтом мы подтверждаем цену и срок выполнения. Никаких неожиданных доплат постфактум.',
        },
        {
          title: 'Ремонт и тестирование',
          text: 'Выполняем ремонт, тестируем устройство и выдаём его с гарантией в зависимости от работы и типа детали.',
        },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      faqItems: [
        {
          q: 'Почему для некоторых моделей не отображается цена?',
          a: 'Не для всех моделей и услуг цены опубликованы. В таких случаях свяжитесь с нами - мы уточним стоимость и срок после диагностики.',
        },
        {
          q: 'Может ли цена измениться после диагностики?',
          a: 'Иногда да - если дополнительно обнаруживаются другие повреждения, например проблемы с цепью зарядки или последствия попадания влаги, перед ремонтом мы согласуем обновлённую смету.',
        },
        {
          q: 'Есть ли гарантия?',
          a: 'Да - на ремонт обычно предоставляется гарантия. Конкретный срок может отличаться в зависимости от услуги и типа детали.',
        },
      ],
      bookingAria: 'Записаться на ремонт',
      metaTitle: 'Цены | iLab',
      metaDescription:
        'Цены на ремонт iLab по модели. Выберите бренд и модель устройства, чтобы увидеть все цены на услуги в одном месте.',
    };
  }

  return {
    servicePath: '/cenas',
    pageName: 'Cenas | iLab',
    pageDescription:
      'iLab remonta cenas pēc modeļa. Izvēlies zīmolu un ierīces modeli, lai redzētu visu pakalpojumu cenas vienuviet.',
    homeCrumb: 'Sākums',
    pageCrumb: 'Cenas',
    headerTitle: 'Remonta cenas',
    headerLead:
      'Izvēlies ierīces zīmolu un modeli, lai vienuviet apskatītu publicētās remonta cenas, termiņus un pieejamos pakalpojumus.',
    brandPickerTitle: 'Izvēlies zīmolu',
    pricelistTitle: 'Cenas pēc modeļa',
    ctaLabel: 'Pieteikties remontam',
    processTitle: 'Kā uzzināt precīzu cenu',
    processSteps: [
      {
        title: 'Izvēlies modeli',
        text: 'Atrodi savu zīmolu un modeli cenrādī - redzēsi publicētās cenas un tipiskos pakalpojumus.',
      },
      {
        title: 'Ja cena nav redzama - sazinies',
        text: 'Dažiem retākiem modeļiem vai darbiem cenu nosakām pēc diagnostikas un detaļu pieejamības.',
      },
      {
        title: 'Saskaņojam tāmi un termiņu',
        text: 'Pirms remonta apstiprinām cenu un izpildes laiku. Nekādu pārsteigumu pēc fakta.',
      },
      {
        title: 'Remonts + tests',
        text: 'Veicam remontu, testējam un izsniedzam ierīci ar garantiju atkarībā no darba un detaļas.',
      },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    faqItems: [
      {
        q: 'Kāpēc dažiem modeļiem cena nav redzama?',
        a: 'Ne visiem modeļiem un pakalpojumiem cenas ir publicētas. Šādos gadījumos sazinieties ar mums - precizēsim cenu un termiņu pēc diagnostikas.',
      },
      {
        q: 'Vai cena var atšķirties pēc diagnostikas?',
        a: 'Dažreiz jā - ja papildus konstatējam citus bojājumus, piemēram, uzlādes ķēdes vai mitruma sekas, pirms remonta saskaņojam atjauninātu tāmi.',
      },
      {
        q: 'Vai ir garantija?',
        a: 'Jā - remontiem parasti ir garantija. Konkrētais termiņš var atšķirties atkarībā no pakalpojuma un detaļas veida.',
      },
    ],
    bookingAria: 'Pieteikties remontam',
    metaTitle: 'Cenas | iLab',
    metaDescription:
      'iLab remonta cenas pēc modeļa. Izvēlies zīmolu un ierīces modeli, lai redzētu visu pakalpojumu cenas vienuviet.',
  };
}

export default function CenasPage({
  locale = 'lv',

  labels,
  breadcrumbs = [],

  devices = [],
  pricing = {},
  serviceMeta = {},
  brandOptions = [],
  defaultBrand = 'iphone',
}) {
  const strings = labels || getCenasPageStrings(locale);

  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
      />

      <section
        id="brand-list"
        className={s.section}
        aria-labelledby="brand-picker-h2"
      >
        <div className={s.container}>
          <h2
            id="brand-picker-h2"
            className={s.h2}
            style={{ marginBottom: 12 }}
          >
            {strings.brandPickerTitle}
          </h2>

          <BrandPickerPricelist
            devices={devices}
            pricing={pricing}
            serviceMeta={serviceMeta}
            brandOptions={brandOptions}
            defaultBrand={defaultBrand}
            categorySlug="all"
            title={strings.pricelistTitle}
            allModelsHref={locale === 'ru' ? '/ru' : '/'}
            cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
            className={s.section}
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="process-h2">
        <div className={s.container}>
          <Process
            id="process"
            title={strings.processTitle}
            steps={strings.processSteps}
            headingLevel={2}
            variant="cards"
            locale={locale}
          />
        </div>
      </section>

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title={strings.faqTitle}
            items={strings.faqItems}
            headingLevel={2}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section>

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.bookingAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}
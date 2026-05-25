import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Reviews from '@sections/reviews/Reviews';
import Guide from '@sections/guide/Guide';

import s from '@styles/Catalog.module.scss';

import { LuCog, LuFilter, LuSparkles, LuWrench } from 'react-icons/lu';

export const CATEGORY_KEY = 'dyson-remonts';

const FAQ_ITEMS_LV = [
  {
    q: 'Cik ilgi ilgst Dyson diagnostika un remonts?',
    a: 'Ātrā diagnostika parasti tajā pašā dienā. Remonta ilgums atkarīgs no bojājuma un detaļu pieejamības - populāros darbus bieži paveicam 1–3 dienās.',
  },
  {
    q: 'Vai izmantojat oriģinālās vai OEM detaļas?',
    a: 'Izmantojam oriģinālās vai augstas kvalitātes OEM detaļas. Par izvēli vienojamies pirms remonta.',
  },
  {
    q: 'Vai pēc tīrīšanas var uzlabot sūkšanas jaudu?',
    a: 'Jā. Dziļā tīrīšana, filtru nomaiņa un blīvējumu atjaunošana bieži būtiski uzlabo jaudu un samazina pārkaršanu.',
  },
  {
    q: 'Vai darbam ir garantija?',
    a: 'Jā, sniedzam 90 dienu garantiju gan darbam, gan mainītajām detaļām.',
  },
  {
    q: 'Vai pieņemat dažādus Dyson modeļus (V7, V8, V10, V11, V15 u.c.)?',
    a: 'Jā, strādājam ar populārajām Dyson bezvadu līnijām un citiem modeļiem. Ja rodas jautājumi, sazinieties - pārbaudīsim pēc sērijas numura.',
  },
];

const FAQ_ITEMS_RU = [
  {
    q: 'Сколько занимает диагностика и ремонт Dyson?',
    a: 'Быстрая диагностика обычно выполняется в тот же день. Срок ремонта зависит от неисправности и наличия деталей - популярные работы часто выполняем за 1–3 дня.',
  },
  {
    q: 'Используете ли вы оригинальные или OEM детали?',
    a: 'Используем оригинальные или качественные OEM детали. Выбор согласовываем до начала ремонта.',
  },
  {
    q: 'Помогает ли чистка улучшить мощность всасывания?',
    a: 'Да. Глубокая чистка, замена фильтров и восстановление уплотнений часто заметно улучшают мощность и снижают перегрев.',
  },
  {
    q: 'Есть ли гарантия на работу?',
    a: 'Да, даём гарантию 90 дней и на работу, и на заменённые детали.',
  },
  {
    q: 'Принимаете ли вы разные модели Dyson (V7, V8, V10, V11, V15 и др.)?',
    a: 'Да, работаем с популярными беспроводными линейками Dyson и другими моделями. Если есть сомнения, свяжитесь с нами - проверим по серийному номеру.',
  },
];

export function getDysonFallbackFaqItems(locale = 'lv') {
  return locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
}

export function getDysonPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      metaTitle: 'Ремонт Dyson в Риге | iLab',
      metaDescription:
        'Ремонт пылесосов Dyson в Риге - замена мотора и батареи, фильтров и уплотнений, чистка и диагностика, устранение механических повреждений. Быстрая диагностика и гарантия 90 дней.',
      heroAlt: 'ремонт Dyson в Риге',
      heroBodyHtml:
        '<p><strong>Быстрый и безопасный ремонт Dyson в Риге</strong> - чистка, замена мотора и батареи, замена фильтров и уплотнений. Бесплатная диагностика и <strong>гарантия 90 дней</strong> на каждый ремонт.</p>',
      introTitle: 'Ремонт Dyson в Риге - что мы делаем',
      introBody:
        'Выполняем полный спектр <strong>ремонта Dyson</strong> - от <strong>глубокой чистки и диагностики</strong> до <strong>замены мотора и батареи</strong>, а также <strong>замены фильтров и уплотнений</strong> и <strong>устранения механических повреждений</strong>. До начала работ проводим <strong>бесплатную диагностику</strong> и согласовываем точную стоимость и срок. Используем <strong>оригинальные или качественные OEM детали</strong> и даём <strong>гарантию 90 дней</strong>.',
      breadcrumbName: 'Ремонт Dyson',
      serviceName: 'Ремонт Dyson в Риге',
      serviceDescription:
        'Ремонт Dyson в Риге: замена мотора и батареи, фильтры и уплотнения, глубокая чистка и диагностика, устранение механических повреждений.',
      serviceType: 'Ремонт Dyson',
      servicesTitle: 'Популярный ремонт Dyson',
      servicesItems: [
        {
          title: 'Замена мотора и батареи',
          text: 'потеря мощности, перегрев, короткое время работы.',
          icon: LuCog,
        },
        {
          title: 'Замена фильтров и уплотнений',
          text: 'слабое всасывание, утечки воздуха, засоры.',
          icon: LuFilter,
        },
        {
          title: 'Чистка и диагностика',
          text: 'глубокая чистка, очистка каналов, полная проверка.',
          icon: LuSparkles,
        },
        {
          title: 'Ремонт механических повреждений',
          text: 'ремонт корпуса, соединений и подвижных частей.',
          icon: LuWrench,
        },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Быстро проверяем устройство и подтверждаем неисправность.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем стоимость и срок выполнения до начала работ.',
        },
        {
          title: 'Ремонт',
          text: 'Выполняем чистку, замену деталей и тесты по требованиям производителя.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем мощность всасывания, температуру и стабильность работы.',
        },
        {
          title: 'Гарантия',
          text: 'Гарантия 90 дней и рекомендации по обслуживанию.',
        },
      ],
      scrollCta: { label: 'Смотреть услуги', targetId: 'dyson-services' },
      fallbackTitle: 'Ремонт Dyson в Риге',
      homeCrumb: 'Главная',
      imageAlt: 'Ремонт Dyson в Риге',
    };
  }

  return {
    metaTitle: 'Dyson remonts Rīgā | iLab',
    metaDescription:
      'Dyson putekļsūcēju remonts Rīgā - motora un baterijas maiņa, filtru un blīvējumu nomaiņa, tīrīšana un diagnostika, mehānisku bojājumu labošana. Ātra diagnostika un 90 dienu garantija.',
    heroAlt: 'Dyson remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ātrs un drošs Dyson remonts Rīgā</strong> - tīrīšana, motora un baterijas maiņa, filtru un blīvējumu nomaiņa. Bezmaksas diagnostika un <strong>90 dienu garantija</strong> katram remontam.</p>',
    introTitle: 'Dyson remonts Rīgā - ko mēs darām',
    introBody:
      'Veicam pilna spektra <strong>Dyson remontu</strong> - no <strong>dziļās tīrīšanas un diagnostikas</strong> līdz <strong>motora un baterijas maiņai</strong>, kā arī <strong>filtru un blīvējumu nomaiņai</strong> un <strong>mehānisku bojājumu labojumiem</strong>. Pirms darba uzsākšanas nodrošinām <strong>bezmaksas diagnostiku</strong> un precīzu izmaksu/termiņa saskaņošanu. Izmantojam <strong>oriģinālās vai augstas kvalitātes OEM detaļas</strong> un sniedzam <strong>90 dienu garantiju</strong>.',
    breadcrumbName: 'Dyson remonts',
    serviceName: 'Dyson remonts Rīgā',
    serviceDescription:
      'Dyson remonts Rīgā: motora un baterijas maiņa, filtri un blīvējumi, dziļā tīrīšana un diagnostika, mehānisku bojājumu labošana.',
    serviceType: 'Dyson remonts',
    servicesTitle: 'Populārākie Dyson remonti',
    servicesItems: [
      {
        title: 'Motora un baterijas maiņa',
        text: 'jaudas kritums, pārkaršana, īss darbalaiks.',
        icon: LuCog,
      },
      {
        title: 'Filtru un blīvējumu nomaiņa',
        text: 'vāja sūkšana, gaisa noplūdes, aizsērējumi.',
        icon: LuFilter,
      },
      {
        title: 'Tīrīšana un diagnostika',
        text: 'dziļā tīrīšana, kanālu atbrīvošana, pārbaudes.',
        icon: LuSparkles,
      },
      {
        title: 'Mehānisku bojājumu labošana',
        text: 'korpusa, savienojumu un kustīgo daļu remonts.',
        icon: LuWrench,
      },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts',
        text: 'Veicam tīrīšanu, detaļu nomaiņu un testus atbilstoši ražotāja prasībām.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam sūkšanas jaudu, temperatūru un darbības stabilitāti.',
      },
      {
        title: 'Garantija',
        text: '90 dienu garantija un uzturēšanas ieteikumi.',
      },
    ],
    scrollCta: { label: 'Skatīt pakalpojumus', targetId: 'dyson-services' },
    fallbackTitle: 'Dyson remonts Rīgā',
    homeCrumb: 'Sākums',
    imageAlt: 'Dyson remonts Rīgā',
  };
}

export default function DysonRepairPage({
  locale = 'lv',

  page,
  headerTitle,
  headerLead,
  breadcrumbs = [],

  labels,
  faqTitle,
  faqItems = [],
  hasVisibleFaq = false,

  heroImage = '/images/categories/dyson_remonts.webp',
}) {
  const strings = labels || getDysonPageStrings(locale);

  return (
    <>
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <DeviceHero
        image={heroImage}
        alt={strings.heroAlt}
        focal="right"
        className="category"
        bodyHtml={strings.heroBodyHtml}
      />

      <section className={s.section} aria-labelledby="dyson-intro-h2">
        <div className={s.container}>
          <h2 id="dyson-intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introBody }}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="dyson-services-h2">
        <div className={s.container}>
          <Services
            id="dyson-services"
            title={strings.servicesTitle}
            items={strings.servicesItems}
          />
        </div>
      </section>

      {(page?.sections?.hasReviews ?? true) && <Reviews locale={locale} />}

      {(page?.sections?.hasGuide ?? true) && (
        <Guide
          id="guide"
          locale={locale}
          variant="dyson"
          headingLevel={2}
        />
      )}

      <div id="process" className={s.anchorTarget} />

      {(page?.sections?.hasProcess ?? true) && (
        <section className={s.section} aria-labelledby="process-h2">
          <div className={s.container}>
            <Process
              id="process-content"
              title={strings.processTitle}
              steps={strings.processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
          </div>
        </section>
      )}

      {(page?.sections?.hasWhy ?? true) && (
        <section className={s.section}>
          <Why locale={locale} />
        </section>
      )}

      {hasVisibleFaq && (
        <section className={s.section} aria-labelledby="dyson-faq-h2">
          <div className={s.container}>
            <Faq
              id="dyson-faq"
              title={faqTitle}
              items={faqItems}
              variant="accordion"
              headingLevel={2}
              locale={locale}
            />
          </div>
        </section>
      )}

      {(page?.sections?.hasConvertBand ?? true) && (
        <section className={s.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}
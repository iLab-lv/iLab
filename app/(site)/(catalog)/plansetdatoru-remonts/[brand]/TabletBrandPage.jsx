import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import { dedupeAndSort } from '@/app/(site)/components/device-grid/deviceGrid.groups';
import BrandHero from '@/_components/sections/catalog-brand/BrandHero';
import BrandServices from '@/_components/sections/catalog-brand/BrandServices';
import brand from '@/_components/sections/catalog-brand/CatalogBrand.module.scss';
import skin from '@/_components/sections/catalog-hub/CatalogHubSkin.module.scss';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import ConvertBand from '@sections/convert-band/ConvertBand';
import Reviews from '@/app/_components/sections/reviews/ServiceReviews';

import {
  LuTabletSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';


export const CATEGORY_KEY = 'plansetdatoru-remonts';

/* ---------------------------------------------
   Helpers
---------------------------------------------- */

export function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') {
    return value || fallback;
  }

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.lv ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

/* ---------------------------------------------
   Shared fallback content
---------------------------------------------- */

const PROCESS_STEPS_LV = [
  {
    title: 'Diagnostika',
    text: 'Ātri pārbaudām planšetdatoru un apstiprinām problēmu.',
  },
  {
    title: 'Cena un termiņš',
    text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
  },
  {
    title: 'Remonts',
    text: 'Meistari veic remontu, izmantojot kvalitatīvas detaļas.',
  },
  {
    title: 'Pārbaude',
    text: 'Pēc remonta testējam ekrānu, bateriju, uzlādi un citas funkcijas.',
  },
  {
    title: 'Garantija',
    text: 'garantija līdz 1 gadam un ieteikumi turpmākai lietošanai.',
  },
];

const PROCESS_STEPS_RU = [
  {
    title: 'Диагностика',
    text: 'Быстро проверяем планшет и подтверждаем проблему.',
  },
  {
    title: 'Цена и срок',
    text: 'Согласовываем стоимость и срок выполнения до начала работ.',
  },
  {
    title: 'Ремонт',
    text: 'Мастера выполняют ремонт с использованием качественных деталей.',
  },
  {
    title: 'Проверка',
    text: 'После ремонта тестируем экран, батарею, зарядку и другие функции.',
  },
  {
    title: 'Гарантия',
    text: 'Гарантия до 1 года и рекомендации по дальнейшему использованию.',
  },
];

const FAQ_ITEMS_LV = [
  {
    q: 'Cik ilgi ilgst planšetdatora displeja maiņa?',
    a: 'Bieži 1–3 stundas atkarībā no modeļa, detaļu pieejamības un meistaru noslodzes.',
  },
  {
    q: 'Vai mani dati saglabāsies?',
    a: 'Darām visu iespējamo, lai saglabātu datus, taču pirms remonta vienmēr iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā - gan detaļām, gan meistaru darbam ir garantija līdz 1 gadam, ja nav jaunu mehānisku vai šķidruma bojājumu.',
  },
  {
    q: 'Vai pieejamas oriģinālas detaļas?',
    a: 'Atkarībā no modeļa piedāvājam oriģinālas vai augstas kvalitātes OEM detaļas - izvēli un cenu saskaņojam ar klientu pirms remonta.',
  },
  {
    q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
    a: 'Jā, pēc īsas diagnostikas sniegsim izmaksu diapazonu un termiņu konkrētajam planšetdatora modelim.',
  },
];

const FAQ_ITEMS_RU = [
  {
    q: 'Сколько занимает замена экрана планшета?',
    a: 'Часто 1–3 часа, в зависимости от модели, наличия деталей и загрузки мастеров.',
  },
  {
    q: 'Сохранятся ли мои данные?',
    a: 'Мы делаем всё возможное, чтобы сохранить данные, но перед ремонтом всегда рекомендуем сделать резервную копию.',
  },
  {
    q: 'Есть ли гарантия на детали?',
    a: 'Да - и на детали, и на работу действует гарантия до 1 года, если нет новых механических или жидкостных повреждений.',
  },
  {
    q: 'Доступны ли оригинальные детали?',
    a: 'В зависимости от модели предлагаем оригинальные или качественные OEM детали - выбор и цену согласовываем с клиентом до начала ремонта.',
  },
  {
    q: 'Можно ли узнать примерную цену до ремонта?',
    a: 'Да, после короткой диагностики назовём диапазон стоимости и срок для конкретной модели планшета.',
  },
];

export function getTabletBrandFallbackFaqItems(locale = 'lv') {
  return locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
}

export function getTabletBrandProcessSteps(locale = 'lv') {
  return locale === 'ru' ? PROCESS_STEPS_RU : PROCESS_STEPS_LV;
}

const POPULAR_SERVICES_LV = [
  {
    title: 'Displeja (ekrāna) maiņa',
    text: 'plaisas, tumši plankumi, nereaģē skāriens.',
    icon: LuTabletSmartphone,
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Uzlādes ligzda',
    text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
    icon: LuPlugZap,
  },
  {
    title: 'Kamera',
    text: 'miglaini attēli, fokusēšanās problēmas.',
    icon: LuCamera,
  },
  {
    title: 'Skaļruņi/mikrofons',
    text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
    icon: LuVolume2,
  },
  {
    title: 'Ūdens bojājumi',
    text: 'diagnostika un atjaunošana, ja tas iespējams.',
    icon: LuDroplets,
  },
];

const POPULAR_SERVICES_RU = [
  {
    title: 'Замена дисплея (экрана)',
    text: 'трещины, тёмные пятна, сенсор не реагирует.',
    icon: LuTabletSmartphone,
  },
  {
    title: 'Замена батареи',
    text: 'заряд быстро падает, выключается при 10–20%.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Разъём зарядки',
    text: 'кабель не держится, зарядка медленная или нестабильная.',
    icon: LuPlugZap,
  },
  {
    title: 'Камера',
    text: 'мутные фото, проблемы с фокусировкой.',
    icon: LuCamera,
  },
  {
    title: 'Динамики/микрофон',
    text: 'тихий звук, хрипы, во время разговора не слышно.',
    icon: LuVolume2,
  },
  {
    title: 'Повреждения от влаги',
    text: 'диагностика и восстановление, если это возможно.',
    icon: LuDroplets,
  },
];

export function getTabletBrandPopularServices(locale = 'lv') {
  return locale === 'ru' ? POPULAR_SERVICES_RU : POPULAR_SERVICES_LV;
}

/* ---------------------------------------------
   Page strings
---------------------------------------------- */

export function getTabletBrandStrings({ brandName, page, locale = 'lv' }) {
  const selectorHeading =
    page?.selector?.heading ||
    (locale === 'ru'
      ? `Выберите модель ${brandName}`
      : `Izvēlies savu ${brandName} modeli`);

  const selectorIntro =
    page?.selector?.intro ||
    (locale === 'ru'
      ? 'Найдите нужную модель по названию или откройте нужную серию и выберите своё устройство.'
      : 'Atrodi vajadzīgo modeli pēc nosaukuma vai atver sēriju un izvēlies savu ierīci.');

  const heroHtml =
    pickLocalized(page?.source?.brand?.page?.bodyHtml, locale, '') ||
    (locale === 'ru'
      ? `<p><strong>${brandName} ремонт планшетов в Риге</strong> - замена экрана, батареи, камеры и разъёма зарядки с быстрой диагностикой и <strong>гарантией до 1 года</strong>.</p>`
      : `<p><strong>${brandName} planšetdatoru remonts Rīgā</strong> - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>garantiju līdz 1 gadam</strong>.</p>`);

  if (locale === 'ru') {
    return {
      introTitle: `${brandName} ремонт планшетов - что мы делаем`,
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Цена зависит от модели - откройте страницу своей модели, чтобы увидеть конкретные цены и сроки.',
      introParagraph:
        'Самые частые работы: <strong>замена экрана</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (быстрая разрядка, выключается при 10–20%), <strong>ремонт разъёма зарядки</strong> (кабель не держится, зарядка медленная или нестабильная), <strong>ремонт камеры</strong> (мутные фото, ошибки фокусировки), а также <strong>повреждения от влаги</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      modelGridHeading: selectorHeading,
      modelGridIntro: selectorIntro,
      modelsNote:
        'Цена зависит от модели - откройте страницу своей модели, чтобы увидеть стоимость ремонта.',
      noModels: 'Пока для этого бренда не добавлены модели планшетов.',
      servicesHeading: 'Популярный ремонт',
      processTitle: 'Как проходит ремонт',
      processDescription:
        'Как проходит ремонт планшета: диагностика, согласование цены, ремонт, проверка и гарантия.',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml,
      heroAlt: `${brandName} ремонт планшетов`,
      categoryName: 'Ремонт планшетов',
      brandName,
      serviceName: `${brandName} ремонт планшетов в Риге`,
      serviceDescription: `${brandName} ремонт планшетов: дисплей, батарея, разъём зарядки, камера, звук и другие работы. Быстрая диагностика, честные цены, гарантия до 1 года.`,
      serviceType: 'Ремонт планшетов',
      homeCrumb: 'Главная',
      scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
      fallbackTitle: `${brandName} ремонт планшетов`,
      fallbackMetaTitle: `${brandName} ремонт планшетов в Риге | iLab`,
      fallbackMetaDescription: `${brandName} ремонт планшетов: дисплей, батарея, разъём зарядки, камера, звук и другие работы. Быстрая диагностика, честные цены, гарантия до 1 года.`,
      imageAlt: `${brandName} ремонт планшетов`,
    };
  }

  return {
    introTitle: `${brandName} planšetdatoru remonts - ko mēs darām`,
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu konkrētas remonta cenas un termiņus.',
    introParagraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauja izlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzdas remonts</strong> (nenoturas kabelis, lēna vai nestabila uzlāde), <strong>kameras remonts</strong> (miglaini attēli, fokusēšanās kļūdas), kā arī <strong>mitruma/ūdens bojājumi</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    modelGridHeading: selectorHeading,
    modelGridIntro: selectorIntro,
    modelsNote:
      'Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: 'Pagaidām šim zīmolam nav pievienotu planšetdatoru modeļu.',
    servicesHeading: 'Populārākie remonti',
    processTitle: 'Kā notiek remonts',
    processDescription:
      'Kā notiek planšetdatora remonts: diagnostika, cenas saskaņošana, remonts, pārbaude un garantija.',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml,
    heroAlt: `${brandName} planšetdatoru remonts`,
    categoryName: 'Planšetdatoru remonts',
    brandName,
    serviceName: `${brandName} planšetdatoru remonts Rīgā`,
    serviceDescription: `${brandName} planšetdatoru remonts: displejs, baterija, uzlādes ligzda, kamera, skaņa un citi darbi. Ātra diagnostika, godīgas cenas, garantija līdz 1 gadam.`,
    serviceType: 'Planšetdatoru remonts',
    homeCrumb: 'Sākums',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${brandName} planšetdatoru remonts`,
    fallbackMetaTitle: `${brandName} planšetdatoru remonts Rīgā | iLab`,
    fallbackMetaDescription: `${brandName} planšetdatoru remonts: displejs, baterija, uzlādes ligzda, kamera, skaņa un citi darbi. Ātra diagnostika, godīgas cenas, garantija līdz 1 gadam.`,
    imageAlt: `${brandName} planšetdatoru remonts`,
  };
}

/* ---------------------------------------------
   Render-only component
---------------------------------------------- */

export default function TabletBrandPage({
  locale = 'lv',

  page,
  brandSlug,
  devicesAll = [],
  seriesMeta,
  brandTabletList = [],
  baseHref,

  headerTitle,
  headerLead,
  breadcrumbs = [],

  strings,
  processSteps = [],
  popularServices = [],

  hasVisibleFaq = false,
  faqTitle,
  faqItems = [],
}) {
  if (!page || !strings) {
    return null;
  }

  return (
    <div data-catalog-brand>
      <BrandHero
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        locale={locale}
        image="/images/categories/plansetdatoru_remonts.webp"
        imageAlt={strings.heroAlt}
        targetId="brand-modeli"
        targetLabel={strings.scrollCta?.label}
        bodyHtml={strings.heroHtml}
      >
        <QuickTrustFacts id="why" {...getQuickTrustFacts("tablet", locale)} />
      </BrandHero>

      <section className={`${skin.section} ${brand.intro}`} aria-labelledby="tablet-brand-intro-h2">
        <header>
          <h2 id="tablet-brand-intro-h2">
            {strings.introTitle}
          </h2>

        </header>
        <div className={brand.prose}>
          <p
            dangerouslySetInnerHTML={{ __html: strings.introLead }}
          />

          <p
            dangerouslySetInnerHTML={{ __html: strings.introParagraph }}
          />
        </div>
      </section>

      <BrandServices
        id="tablet-brand-services"
        title={strings.servicesHeading}
        items={popularServices}
        locale={locale}
        modelAction={dedupeAndSort(devicesAll, brandSlug, CATEGORY_KEY).length > 0 ? { href: '#brand-modeli', label: strings.scrollCta?.label } : undefined}
      />

      <DeviceSelector
        variant="brand"
        id="brand-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        note={strings.modelsNote}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={brandSlug}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      {brandTabletList.length === 0 && (
        <section className={`${skin.section} ${brand.note}`}>
          <div>
            <p style={{ opacity: 0.8, marginTop: 0 }}>
              {strings.noModels}
            </p>
          </div>
        </section>
      )}

      {page.sections?.hasReviews && (
        <Reviews locale={locale} />
      )}

      <div id="process-h2" className={brand.anchor} />

      {page.sections?.hasProcess && (
        <Process
              id="process"
              title={strings.processTitle}
              steps={processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
      )}

      {hasVisibleFaq && (
        <div data-service-section="faq" className={skin.block}>

            <Faq
              id="tablet-brand-faq"
              title={faqTitle}
              items={faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
        </div>
      )}

      <QuickContactsSection locale={locale} />

      {page.sections?.hasConvertBand && (
        <div className={`${skin.block} ${skin.closing} ${skin.genericClosing}`}><section>
          <ConvertBand locale={locale} />
        </section></div>
      )}
    </div>
  );
}

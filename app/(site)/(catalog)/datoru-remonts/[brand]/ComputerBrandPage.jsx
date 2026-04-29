//REPO TEST

import Script from 'next/script';
import { notFound } from 'next/navigation';

import { getCategoryBySlug, getBrandByCategory } from '@/lib/content/categories';
import { getDevices } from '@/lib/content/devices';
import { resolveBrandPage } from '@/lib/content/resolvers/catalogPages';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import SeriesGrid from '@components/model-grid/SeriesGrid';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import {
  LuMonitor,
  LuKeyboard,
  LuBatteryCharging,
  LuCpu,
  LuHardDrive,
  LuBug,
  LuPlugZap,
} from 'react-icons/lu';

import c from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildStandardRepairHowToLd,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

const CATEGORY_KEY = 'datoru-remonts';

/* ---------------------------------------------
   Helpers
---------------------------------------------- */

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

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

function normalizeComputerBrand(brand, locale = 'lv') {
  const key = String(brand?.key || '').toLowerCase();
  const name = pickLocalized(brand?.labels, locale, key);

  const deviceType =
    brand?.deviceType ||
    (key === 'imac' ? 'aio' : key === 'mac-pro' ? 'desktop' : 'laptop');

  const hasModels =
    typeof brand?.hasModels === 'boolean' ? brand.hasModels : true;

  return {
    key,
    name,
    deviceType,
    hasModels,
    heroImage: brand?.image || '/images/categories/datoru_remonts.webp',
    logo: brand?.logo || null,
    tint: 'rgba(0,200,180,0.20)',
    heroAlt:
      locale === 'ru'
        ? `${name} ремонт компьютеров`
        : `${name} datoru remonts`,
  };
}

function buildSeriesMetaMap(brand, locale = 'lv') {
  const map = new Map();

  if (!Array.isArray(brand?.series)) return map;

  for (const item of brand.series) {
    const key = String(item?.key || '').trim().toLowerCase();
    if (!key) continue;

    const label = pickLocalized(item?.labels, locale, key);
    map.set(key, label);
  }

  return map;
}

function shapeDevicesForSeriesGrid(devices, brand, locale = 'lv') {
  const seriesMetaMap = buildSeriesMetaMap(brand, locale);

  return devices.map((d) => {
    const normalizedCategory = d.category || d.categoryKey || '';
    const normalizedBrandSlug = String(
      d.brandSlug || d.brandKey || ''
    ).toLowerCase();
    const normalizedSeriesSlug = String(
      d.seriesSlug || d.seriesKey || d.legacy?.originalSeriesSlug || ''
    ).toLowerCase();

    const seriesTitle =
      d.series ||
      seriesMetaMap.get(normalizedSeriesSlug) ||
      d.legacy?.originalSeriesLabel ||
      '';

    return {
      ...d,
      category: normalizedCategory,
      brandSlug: normalizedBrandSlug,
      seriesSlug: normalizedSeriesSlug || undefined,
      series: seriesTitle,
    };
  });
}

/* ---------------------------------------------
   Static params
---------------------------------------------- */

export const dynamicParams = false;

export async function generateComputerBrandStaticParams() {
  const category = await getCategoryBySlug(CATEGORY_KEY);
  if (!category || !Array.isArray(category.brands)) return [];

  return category.brands
    .map((brand) => String(brand?.key || '').toLowerCase())
    .filter(Boolean)
    .map((brand) => ({ brand }));
}

/* ---------------------------------------------
   Shared content
---------------------------------------------- */

const FAQ_ITEMS_LV = [
  {
    q: 'Cik ilgi ilgst datoru remonts?',
    a: 'Vienkāršāki darbi bieži ir gatavi tajā pašā vai nākamajā dienā. Sarežģītākiem remontiem termiņu nosakām pēc diagnostikas.',
  },
  {
    q: 'Vai mani dati būs drošībā?',
    a: 'Iespēju robežās saglabājam datus, bet pirms remonta iesakām izveidot rezerves kopiju vai pārrunāt dublēšanas iespējas ar meistaru.',
  },
  {
    q: 'Vai detaļām ir garantija?',
    a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju, parasti 90 dienas.',
  },
  {
    q: 'Ko darīt, ja dators pārkarst vai ir ļoti skaļš?',
    a: 'Visbiežāk nepieciešama dzesēšanas sistēmas tīrīšana un termopastas maiņa. Pēc diagnostikas pateiksim precīzi, kas jādara.',
  },
  {
    q: 'Vai varu saņemt aptuvenu cenu pirms remonta?',
    a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu. Sarežģītākiem bojājumiem cenas precizējam pēc testiem.',
  },
];

const FAQ_ITEMS_RU = [
  {
    q: 'Сколько занимает ремонт компьютера?',
    a: 'Более простые работы часто готовы в тот же или на следующий день. Для сложного ремонта срок определяем после диагностики.',
  },
  {
    q: 'Будут ли мои данные в безопасности?',
    a: 'По возможности сохраняем данные, но перед ремонтом рекомендуем сделать резервную копию или обсудить варианты копирования с мастером.',
  },
  {
    q: 'Есть ли гарантия на детали?',
    a: 'Да, и на детали, и на выполненную работу предоставляем гарантию, обычно 90 дней.',
  },
  {
    q: 'Что делать, если компьютер перегревается или очень шумит?',
    a: 'Чаще всего нужна чистка системы охлаждения и замена термопасты. После диагностики точно скажем, что требуется.',
  },
  {
    q: 'Можно ли узнать примерную цену до ремонта?',
    a: 'Да, после быстрой диагностики назовём диапазон стоимости и срок. Для сложных неисправностей цену уточняем после тестов.',
  },
];

const POPULAR_LAPTOP_REPAIRS_LV = [
  {
    title: 'Ekrāna maiņa',
    text: 'plaisas, mirušās zonas, tumši plankumi.',
    icon: LuMonitor,
  },
  {
    title: 'Tastatūras maiņa',
    text: 'nereaģē taustiņi, izlijis šķidrums, ielipuši taustiņi.',
    icon: LuKeyboard,
  },
  {
    title: 'Akumulatora maiņa',
    text: 'strauji krīt uzlāde, dators izslēdzas pie zemāka procenta.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'troksnis, pārkaršana, termopastas maiņa, putekļu tīrīšana.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēns darbs, neielādējas sistēma, datu pārvietošana.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu tīrīšana, draiveru problēmas.',
    icon: LuBug,
  },
];

const POPULAR_LAPTOP_REPAIRS_RU = [
  {
    title: 'Замена экрана',
    text: 'трещины, битые зоны, тёмные пятна.',
    icon: LuMonitor,
  },
  {
    title: 'Замена клавиатуры',
    text: 'клавиши не реагируют, была залита жидкость, кнопки залипают.',
    icon: LuKeyboard,
  },
  {
    title: 'Замена батареи',
    text: 'заряд быстро падает, компьютер выключается при низком уровне заряда.',
    icon: LuBatteryCharging,
  },
  {
    title: 'Система охлаждения',
    text: 'шум, перегрев, замена термопасты, чистка от пыли.',
    icon: LuCpu,
  },
  {
    title: 'Жёсткий диск / SSD',
    text: 'медленная работа, система не загружается, перенос данных.',
    icon: LuHardDrive,
  },
  {
    title: 'Программное обеспечение и вирусы',
    text: 'переустановка ОС, удаление вирусов, проблемы с драйверами.',
    icon: LuBug,
  },
];

const POPULAR_AIO_REPAIRS_LV = [
  {
    title: 'Ekrāna maiņa',
    text: 'plaisas, mirušās zonas, krāsu defekti.',
    icon: LuMonitor,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'troksnis, pārkaršana, ventilatoru un radiatoru tīrīšana.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēna darbība, sistēma neielādējas, datu migrācija.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu un reklāmprogrammu noņemšana.',
    icon: LuBug,
  },
  {
    title: 'Barošana',
    text: 'ieslēgšanās problēmas, barošanas bloka diagnostika.',
    icon: LuPlugZap,
  },
];

const POPULAR_AIO_REPAIRS_RU = [
  {
    title: 'Замена экрана',
    text: 'трещины, битые зоны, дефекты цвета.',
    icon: LuMonitor,
  },
  {
    title: 'Система охлаждения',
    text: 'шум, перегрев, чистка вентиляторов и радиаторов.',
    icon: LuCpu,
  },
  {
    title: 'Жёсткий диск / SSD',
    text: 'медленная работа, система не загружается, миграция данных.',
    icon: LuHardDrive,
  },
  {
    title: 'Программное обеспечение и вирусы',
    text: 'переустановка ОС, удаление вирусов и рекламного ПО.',
    icon: LuBug,
  },
  {
    title: 'Питание',
    text: 'проблемы с включением, диагностика блока питания.',
    icon: LuPlugZap,
  },
];

const POPULAR_DESKTOP_REPAIRS_LV = [
  {
    title: 'Barošanas bloks',
    text: 'dators neieslēdzas, izslēdzas zem slodzes.',
    icon: LuPlugZap,
  },
  {
    title: 'Dzesēšanas sistēma',
    text: 'skaļi ventilatori, pārkaršana, termopastas maiņa.',
    icon: LuCpu,
  },
  {
    title: 'Cietais disks / SSD',
    text: 'lēna darbība, klikšķi no diska, datu atgūšana un migrācija.',
    icon: LuHardDrive,
  },
  {
    title: 'Programmatūra un vīrusi',
    text: 'OS pārinstalēšana, vīrusu un ļaunatūras noņemšana.',
    icon: LuBug,
  },
  {
    title: 'Komponentu maiņa',
    text: 'atmiņa, videokarte, paplašināšana un uzlabojumi.',
    icon: LuCpu,
  },
];

const POPULAR_DESKTOP_REPAIRS_RU = [
  {
    title: 'Блок питания',
    text: 'компьютер не включается, выключается под нагрузкой.',
    icon: LuPlugZap,
  },
  {
    title: 'Система охлаждения',
    text: 'шумные вентиляторы, перегрев, замена термопасты.',
    icon: LuCpu,
  },
  {
    title: 'Жёсткий диск / SSD',
    text: 'медленная работа, щелчки диска, восстановление и перенос данных.',
    icon: LuHardDrive,
  },
  {
    title: 'Программное обеспечение и вирусы',
    text: 'переустановка ОС, удаление вирусов и вредоносного ПО.',
    icon: LuBug,
  },
  {
    title: 'Замена компонентов',
    text: 'память, видеокарта, расширение и апгрейд.',
    icon: LuCpu,
  },
];

function getPopularRepairsForType(deviceType, locale = 'lv') {
  const isRu = locale === 'ru';

  switch (deviceType) {
    case 'aio':
      return isRu ? POPULAR_AIO_REPAIRS_RU : POPULAR_AIO_REPAIRS_LV;
    case 'desktop':
      return isRu ? POPULAR_DESKTOP_REPAIRS_RU : POPULAR_DESKTOP_REPAIRS_LV;
    case 'laptop':
    default:
      return isRu ? POPULAR_LAPTOP_REPAIRS_RU : POPULAR_LAPTOP_REPAIRS_LV;
  }
}

function getPageStrings(cfg, locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: `${cfg.name} ремонт компьютеров — что мы делаем`,
      intro: `Ремонтируем ноутбуки и настольные компьютеры ${cfg.name} — экран, охлаждение, диски и программное обеспечение. Стоимость зависит от модели и сложности неисправности, поэтому точное предложение готовим после диагностики.`,
      paragraph:
        'Самые частые работы: <strong>замена экрана</strong>, <strong>чистка системы охлаждения и замена термопасты</strong>, <strong>замена жёсткого диска/SSD</strong>, <strong>переустановка операционной системы</strong> и <strong>удаление вирусов</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process">«Как проходит ремонт»</a>.',
      modelsTitle: `${cfg.name} модели, которые мы ремонтируем`,
      modelsIntro: `Ниже показаны популярные модели ${cfg.name}. Выберите свою модель, чтобы посмотреть типовые ремонты и цены, если они доступны.`,
      modelsNote:
        'Стоимость зависит от модели — откройте страницу своей модели, чтобы увидеть цену ремонта.',
      noModels: `Пока для этого бренда не добавлены модели. Свяжитесь с нами, чтобы уточнить ремонт ${cfg.name}.`,
      servicesTitle: 'Популярный ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml: `<p><strong>Ремонт компьютеров ${cfg.name} в Риге</strong> — ноутбуки и настольные компьютеры, экран, клавиатура, охлаждение, диски и программное обеспечение. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>`,
      categoryName: 'Ремонт компьютеров',
      homeCrumb: 'Главная',
      processTitle: 'Как проходит ремонт',
      scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
      fallbackTitle: `${cfg.name} ремонт компьютеров`,
    };
  }

  return {
    title: `${cfg.name} datoru remonts — ko mēs darām`,
    intro: `Remontējam ${cfg.name} portatīvos un galda datorus — ekrāns, dzesēšana, diski un programmatūra. Cenas atšķiras pēc modeļa un bojājuma sarežģītības, tāpēc precīzu piedāvājumu sagatavojam pēc diagnostikas.`,
    paragraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong>, <strong>dzesēšanas sistēmas tīrīšana un termopastas maiņa</strong>, <strong>cietā diska/SSD nomaiņa</strong>, <strong>operētājsistēmas pārinstalēšana</strong> un <strong>vīrusu noņemšana</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process">“Kā notiek remonts”</a>.',
    modelsTitle: `${cfg.name} modeļi, ko remontējam`,
    modelsIntro: `Zemāk redzami populārākie ${cfg.name} modeļi. Izvēlies savu modeli, lai apskatītu biežākos remontus un cenas, ja tie pieejami.`,
    modelsNote:
      'Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: `Pagaidām šim zīmolam nav pievienotu modeļu. Sazinies ar mums, lai precizētu ${cfg.name} remontu.`,
    servicesTitle: 'Populārākie remonti',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml: `<p><strong>${cfg.name} datoru remonts Rīgā</strong> — portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`,
    categoryName: 'Datoru remonts',
    homeCrumb: 'Sākums',
    processTitle: 'Kā notiek remonts',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${cfg.name} datoru remonts`,
  };
}

/* ---------------------------------------------
   Metadata export
---------------------------------------------- */

export async function getComputerBrandMetadata(brandSlug, locale = 'lv') {
  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    return {
      title:
        locale === 'ru'
          ? 'Ремонт компьютеров | iLab'
          : 'Datoru remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт компьютеров в Риге — ноутбуки и настольные ПК. Быстрая диагностика, честные цены, гарантия.'
          : 'Datoru remonts Rīgā — portatīvie un galda datori. Ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  const brand = normalizeComputerBrand(page.source?.brand, locale);

  const title =
    page.seo?.metaTitle ||
    (locale === 'ru'
      ? `${brand.name} ремонт компьютеров в Риге | iLab`
      : `${brand.name} datoru remonts Rīgā | iLab`);

  const description =
    page.seo?.metaDescription ||
    (locale === 'ru'
      ? `Профессиональный ремонт компьютеров ${brand.name} в Риге: экран, клавиатура, охлаждение, диски и программное обеспечение. Быстрая диагностика, честные цены, гарантия 90 дней.`
      : `Profesionāls ${brand.name} datoru remonts Rīgā: ekrāns, tastatūra, dzesēšana, diski un programmatūra. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`);

  return {
    title,
    description,
    alternates: {
      canonical:
        page.route?.canonicalPath ||
        `${buildCategoryHref(locale, CATEGORY_KEY)}/${brandSlug}`,
    },
  };
}

/* ---------------------------------------------
   Page component
---------------------------------------------- */

export default async function ComputerBrandPage({
  brand,
  locale = 'lv',
}) {
  const brandSlug = String(brand || '').toLowerCase();
  if (!brandSlug) {
    throw new Error(`MISSING BRAND SLUG: brand=${brand}, locale=${locale}`);
  }

  const [directBrand, category, devicesFromDb] = await Promise.all([
    getBrandByCategory(CATEGORY_KEY, brandSlug),
    getCategoryBySlug(CATEGORY_KEY),
    getDevices(),
  ]);

  if (!category) {
    throw new Error(`CATEGORY NOT FOUND: ${CATEGORY_KEY}`);
  }

  if (!directBrand) {
    throw new Error(
      `BRAND NOT FOUND: category=${CATEGORY_KEY}, brand=${brandSlug}, availableBrands=${JSON.stringify(
        (category.brands || []).map((b) => ({
          key: b?.key || null,
          slug: b?.slug || null,
          routeBrandPath: b?.route?.brandPath || null,
        }))
      )}`
    );
  }

  const page = await resolveBrandPage(CATEGORY_KEY, brandSlug, locale);

  if (!page) {
    throw new Error(
      `RESOLVER FAILED: category=${CATEGORY_KEY}, brand=${brandSlug}, directBrandKey=${directBrand.key}, directBrandSlug=${directBrand.slug}`
    );
  }

  const cfg = normalizeComputerBrand(page.source?.brand, locale);
  const strings = getPageStrings(cfg, locale);
  const popularRepairs = getPopularRepairsForType(cfg.deviceType, locale);
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;

  const baseCategoryPath = buildCategoryHref(locale, CATEGORY_KEY);
  const path = `${baseCategoryPath}/${cfg.key}`;

  const brandDevices = devicesFromDb.filter(
    (d) =>
      d?.type === 'device' &&
      d.categoryKey === CATEGORY_KEY &&
      String(d.brandKey || '').toLowerCase() === cfg.key &&
      d.isHidden !== true
  );

  const seriesGridDevices = shapeDevicesForSeriesGrid(
    devicesFromDb,
    page.source?.brand,
    locale
  );

  const headerTitle =
    page.seo?.h1 || page.seo?.breadcrumbName || strings.fallbackTitle;

  const headerLead =
    page.intro?.lead ||
    page.seo?.metaDescription ||
    page.seo?.schemaDescription ||
    null;

  const breadcrumbs = [
    {
      label: page.labels?.homeCrumb || strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.categoryName,
      href: baseCategoryPath,
    },
    {
      label: page.seo?.breadcrumbName || headerTitle,
      href: path,
    },
  ];

  const serviceLd = buildServiceLdForCity({
    path,
    name:
      locale === 'ru'
        ? `${cfg.name} ремонт компьютеров`
        : `${cfg.name} datoru remonts`,
    description:
      locale === 'ru'
        ? `${cfg.name} ремонт компьютеров: экран, охлаждение, диски, программное обеспечение и другие работы. Быстрая диагностика, честные цены, гарантия.`
        : `${cfg.name} datoru remonts: ekrāns, dzesēšana, diski, programmatūra un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
  });

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: breadcrumbs[0].label, url: abs(breadcrumbs[0].href) },
    { name: breadcrumbs[1].label, url: abs(breadcrumbs[1].href) },
    { name: breadcrumbs[2].label, url: abs(breadcrumbs[2].href) },
  ]);

  const howToLd = buildStandardRepairHowToLd(
    locale === 'ru'
      ? `${cfg.name} ремонт компьютеров`
      : `${cfg.name} datoru remonts`
  );

  const faqLd = buildFaqLdFromPairs(faqItems);

  return (
    <>
      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="howto-jsonld" type="application/ld+json">
        {JSON.stringify(howToLd)}
      </Script>

      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <DeviceHero
        image={page.hero?.image || cfg.heroImage}
        alt={cfg.heroAlt}
        brandLogo={cfg.logo}
        brandKey={cfg.key}
        tint={cfg.tint}
        focal="right"
        priority
        bodyHtml={strings.heroHtml}
      />

      <section className={c.section} aria-labelledby="brand-intro-h2">
        <div className={c.container}>
          <h2 id="brand-intro-h2" className={c.h2}>
            {strings.title}
          </h2>

          <p className={c.intro}>{strings.intro}</p>

          <p
            className={c.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.paragraph }}
          />
        </div>
      </section>

      <section
        id="brand-modeli"
        className={`${c.section} ${c.anchorTarget}`}
        aria-labelledby="brand-modeli-h2"
      >
        <div className={c.container}>
          <h2 id="brand-modeli-h2" className={c.h2}>
            {strings.modelsTitle}
          </h2>

          {cfg.hasModels ? (
            <>
              <p className={c.intro}>{strings.modelsIntro}</p>

              <p className={c.paragraph} style={{ marginTop: 0 }}>
                {strings.modelsNote}
              </p>

              <SeriesGrid
                devices={seriesGridDevices}
                baseHref={path}
                brandSlug={cfg.key}
                categorySlug={CATEGORY_KEY}
                initialLimit={4}
                autoExpandOnSearch
              />

              {brandDevices.length === 0 && (
                <p style={{ opacity: 0.8, marginTop: 16 }}>
                  {strings.noModels}
                </p>
              )}
            </>
          ) : (
            <p className={c.intro}>{strings.noModels}</p>
          )}
        </div>
      </section>

      <section className={c.section} aria-labelledby="popular-services-h2">
        <div className={c.container}>
          <Services
            id="brand-services"
            title={strings.servicesTitle}
            items={popularRepairs}
          />
        </div>
      </section>

      {page.sections?.hasProcess && (
        <Process locale={locale} variant="computer" headingLevel={2} />
      )}

      {page.sections?.hasWhy && (
        <section className={c.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && (
        <section className={c.section} aria-labelledby="faq-h2">
          <div className={c.container}>
            <Faq
              id="brand-faq"
              title={strings.faqTitle}
              items={faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
          </div>
        </section>
      )}

      {page.sections?.hasConvertBand && (
        <section className={c.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}
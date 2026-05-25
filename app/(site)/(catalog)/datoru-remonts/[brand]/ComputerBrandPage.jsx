import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
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

export const CATEGORY_KEY = 'datoru-remonts';

/* ---------------------------------------------
   Shared helpers
---------------------------------------------- */

export function pickLocalized(value, locale = 'lv', fallback = '') {
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

export function normalizeComputerBrand(brand, locale = 'lv') {
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

/* ---------------------------------------------
   Fallback FAQ
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

export function getComputerBrandFallbackFaqItems(locale = 'lv') {
  return locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;
}

/* ---------------------------------------------
   Popular repairs
---------------------------------------------- */

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

export function getPopularRepairsForType(deviceType, locale = 'lv') {
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

/* ---------------------------------------------
   Page strings
---------------------------------------------- */

export function getComputerBrandPageStrings(cfg, locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: `${cfg.name} ремонт компьютеров - что мы делаем`,
      intro: `Ремонтируем ноутбуки и настольные компьютеры ${cfg.name} - экран, охлаждение, диски и программное обеспечение. Стоимость зависит от модели и сложности неисправности, поэтому точное предложение готовим после диагностики.`,
      paragraph:
        'Самые частые работы: <strong>замена экрана</strong>, <strong>чистка системы охлаждения и замена термопасты</strong>, <strong>замена жёсткого диска/SSD</strong>, <strong>переустановка операционной системы</strong> и <strong>удаление вирусов</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process">«Как проходит ремонт»</a>.',
      modelsTitle: `${cfg.name} модели, которые мы ремонтируем`,
      modelsIntro: `Ниже показаны популярные модели ${cfg.name}. Выберите свою модель, чтобы посмотреть типовые ремонты и цены, если они доступны.`,
      modelsNote:
        'Стоимость зависит от модели - откройте страницу своей модели, чтобы увидеть цену ремонта.',
      noModels: `Пока для этого бренда не добавлены модели. Свяжитесь с нами, чтобы уточнить ремонт ${cfg.name}.`,
      servicesTitle: 'Популярный ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml: `<p><strong>Ремонт компьютеров ${cfg.name} в Риге</strong> - ноутбуки и настольные компьютеры, экран, клавиатура, охлаждение, диски и программное обеспечение. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>`,
      categoryName: 'Ремонт компьютеров',
      homeCrumb: 'Главная',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем устройство, определяем неисправность и уточняем возможные варианты ремонта.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем стоимость и срок выполнения до начала работ.',
        },
        {
          title: 'Ремонт',
          text: 'Выполняем ремонт, замену деталей, чистку, настройку системы или программные работы.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем устройство и основные функции.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией на выполненную работу и установленные детали.',
        },
      ],
      scrollCta: { label: 'Смотреть модели', targetId: 'brand-modeli' },
      fallbackTitle: `${cfg.name} ремонт компьютеров`,
      fallbackMetaTitle: `${cfg.name} ремонт компьютеров в Риге | iLab`,
      fallbackMetaDescription: `Профессиональный ремонт компьютеров ${cfg.name} в Риге: экран, клавиатура, охлаждение, диски и программное обеспечение. Быстрая диагностика, честные цены, гарантия 90 дней.`,
      serviceName: `${cfg.name} ремонт компьютеров`,
      serviceDescription: `${cfg.name} ремонт компьютеров: экран, охлаждение, диски, программное обеспечение и другие работы. Быстрая диагностика, честные цены, гарантия.`,
      serviceType: 'Ремонт компьютеров',
      imageAlt: `${cfg.name} ремонт компьютеров`,
    };
  }

  return {
    title: `${cfg.name} datoru remonts - ko mēs darām`,
    intro: `Remontējam ${cfg.name} portatīvos un galda datorus - ekrāns, dzesēšana, diski un programmatūra. Cenas atšķiras pēc modeļa un bojājuma sarežģītības, tāpēc precīzu piedāvājumu sagatavojam pēc diagnostikas.`,
    paragraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong>, <strong>dzesēšanas sistēmas tīrīšana un termopastas maiņa</strong>, <strong>cietā diska/SSD nomaiņa</strong>, <strong>operētājsistēmas pārinstalēšana</strong> un <strong>vīrusu noņemšana</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process">“Kā notiek remonts”</a>.',
    modelsTitle: `${cfg.name} modeļi, ko remontējam`,
    modelsIntro: `Zemāk redzami populārākie ${cfg.name} modeļi. Izvēlies savu modeli, lai apskatītu biežākos remontus un cenas, ja tie pieejami.`,
    modelsNote:
      'Cenas atšķiras pēc modeļa - atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels: `Pagaidām šim zīmolam nav pievienotu modeļu. Sazinies ar mums, lai precizētu ${cfg.name} remontu.`,
    servicesTitle: 'Populārākie remonti',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml: `<p><strong>${cfg.name} datoru remonts Rīgā</strong> - portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`,
    categoryName: 'Datoru remonts',
    homeCrumb: 'Sākums',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām ierīci, nosakām bojājumu un precizējam iespējamos remonta risinājumus.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts',
        text: 'Veicam remontu, detaļu maiņu, tīrīšanu, sistēmas uzstādīšanu vai programmatūras darbus.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam ierīci un galvenās funkcijas.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam ierīci ar garantiju veiktajam darbam un uzstādītajām detaļām.',
      },
    ],
    scrollCta: { label: 'Skatīt modeļus', targetId: 'brand-modeli' },
    fallbackTitle: `${cfg.name} datoru remonts`,
    fallbackMetaTitle: `${cfg.name} datoru remonts Rīgā | iLab`,
    fallbackMetaDescription: `Profesionāls ${cfg.name} datoru remonts Rīgā: ekrāns, tastatūra, dzesēšana, diski un programmatūra. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
    serviceName: `${cfg.name} datoru remonts`,
    serviceDescription: `${cfg.name} datoru remonts: ekrāns, dzesēšana, diski, programmatūra un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
    serviceType: 'Datoru remonts',
    imageAlt: `${cfg.name} datoru remonts`,
  };
}

/* ---------------------------------------------
   Render-only component
---------------------------------------------- */

export default function ComputerBrandPage({
  locale = 'lv',

  page,
  brandSlug,
  brandConfig,

  devicesAll = [],
  seriesMeta,
  brandDevices = [],
  baseHref,

  headerTitle,
  headerLead,
  breadcrumbs = [],

  strings,
  popularRepairs = [],

  hasVisibleFaq = false,
  faqTitle,
  faqItems = [],
}) {
  if (!page || !brandConfig || !strings) {
    return null;
  }

  const cfg = brandConfig;

  return (
    <>
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
        brandKey={cfg.key || brandSlug}
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

      {!!popularRepairs.length && (
        <section className={c.section} aria-labelledby="popular-services-h2">
          <div className={c.container}>
            <Services
              id="brand-services"
              title={strings.servicesTitle}
              items={popularRepairs}
            />
          </div>
        </section>
      )}

      {cfg.hasModels ? (
        <>
          <DeviceSelector
            id="brand-modeli"
            locale={locale}
            title={strings.modelsTitle}
            intro={strings.modelsIntro}
            devices={devicesAll}
            baseHref={baseHref}
            brandKey={brandSlug}
            categoryKey={CATEGORY_KEY}
            seriesMeta={seriesMeta}
            initialLimit={4}
            autoExpandOnSearch
          />

          <section className={c.section}>
            <div className={c.container}>
              <p className={c.paragraph} style={{ marginTop: 0 }}>
                {strings.modelsNote}
              </p>

              {brandDevices.length === 0 && (
                <p style={{ opacity: 0.8, marginTop: 16 }}>
                  {strings.noModels}
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        <section
          id="brand-modeli"
          className={`${c.section} ${c.anchorTarget}`}
          aria-labelledby="brand-modeli-h2"
        >
          <div className={c.container}>
            <h2 id="brand-modeli-h2" className={c.h2}>
              {strings.modelsTitle}
            </h2>

            <p className={c.intro}>{strings.noModels}</p>
          </div>
        </section>
      )}

      <div id="process-h2" className={c.anchorTarget} />

      {page.sections?.hasProcess && (
        <section className={c.section} aria-labelledby="process-h2">
          <div className={c.container}>
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
      )}

      {page.sections?.hasWhy && (
        <section className={c.section}>
          <Why locale={locale} />
        </section>
      )}

      {hasVisibleFaq && (
        <section className={c.section} aria-labelledby="faq-h2">
          <div className={c.container}>
            <Faq
              id="brand-faq"
              title={faqTitle}
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
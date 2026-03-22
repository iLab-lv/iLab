import Script from 'next/script';
import { notFound } from 'next/navigation';

import devicesAll from '@/data/devices';
import categories from '@/data/categories';

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

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
function getComputersCategory() {
  return categories.find((cat) => cat.slug === 'datoru-remonts') || null;
}

function getComputerBrandConfig(brandSlug) {
  const cat = getComputersCategory();
  if (!cat) return null;

  const brand =
    cat.brands?.find((b) => (b.brandSlug || '').toLowerCase() === brandSlug) || null;

  if (!brand) return null;

  const name = brand.name || brandSlug;
  const deviceType = brand.deviceType || 'laptop';
  const hasModels = Boolean(brand.hasModels);

  return {
    name,
    brandSlug: brand.brandSlug || brandSlug,
    deviceType,
    hasModels,
    heroImage: brand.heroImage || cat.heroImage || '/images/categories/datoru_remonts.webp',
    logo: brand.logo || null,
    tint: brand.tint || 'rgba(0,200,180,0.20)',
    heroAlt: brand.heroAlt || `${name} datoru remonts`,
  };
}

export const dynamicParams = false;

export async function generateComputerBrandStaticParams() {
  const cat = getComputersCategory();
  if (!cat || !Array.isArray(cat.brands)) return [];

  return cat.brands.map((b) => ({
    brand: String(b.brandSlug || '').toLowerCase(),
  }));
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
    a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju (parasti 90 dienas).',
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
  { title: 'Ekrāna maiņa', text: 'plaisas, mirušās zonas, tumši plankumi.', icon: LuMonitor },
  { title: 'Tastatūras maiņa', text: 'nereaģē taustiņi, izlijis šķidrums, ielipuši taustiņi.', icon: LuKeyboard },
  { title: 'Akumulatora maiņa', text: 'strauji krīt uzlāde, dators izslēdzas pie zemāka procenta.', icon: LuBatteryCharging },
  { title: 'Dzesēšanas sistēma', text: 'troksnis, pārkaršana, termopastas maiņa, putekļu tīrīšana.', icon: LuCpu },
  { title: 'Cietais disks / SSD', text: 'lēns darbs, neielādējas sistēma, datu pārvietošana.', icon: LuHardDrive },
  { title: 'Programmatūra un vīrusi', text: 'OS pārinstalēšana, vīrusu tīrīšana, draiveru problēmas.', icon: LuBug },
];

const POPULAR_LAPTOP_REPAIRS_RU = [
  { title: 'Замена экрана', text: 'трещины, битые зоны, тёмные пятна.', icon: LuMonitor },
  { title: 'Замена клавиатуры', text: 'клавиши не реагируют, была залита жидкость, кнопки залипают.', icon: LuKeyboard },
  { title: 'Замена батареи', text: 'заряд быстро падает, компьютер выключается при низком уровне заряда.', icon: LuBatteryCharging },
  { title: 'Система охлаждения', text: 'шум, перегрев, замена термопасты, чистка от пыли.', icon: LuCpu },
  { title: 'Жёсткий диск / SSD', text: 'медленная работа, система не загружается, перенос данных.', icon: LuHardDrive },
  { title: 'Программное обеспечение и вирусы', text: 'переустановка ОС, удаление вирусов, проблемы с драйверами.', icon: LuBug },
];

const POPULAR_AIO_REPAIRS_LV = [
  { title: 'Ekrāna maiņa', text: 'plaisas, mirušās zonas, krāsu defekti.', icon: LuMonitor },
  { title: 'Dzesēšanas sistēma', text: 'troksnis, pārkaršana, ventilatoru un radiatoru tīrīšana.', icon: LuCpu },
  { title: 'Cietais disks / SSD', text: 'lēna darbība, sistēma neielādējas, datu migrācija.', icon: LuHardDrive },
  { title: 'Programmatūra un vīrusi', text: 'OS pārinstalēšana, vīrusu un reklāmprogrammu noņemšana.', icon: LuBug },
  { title: 'Barošana', text: 'ieslēgšanās problēmas, barošanas bloka diagnostika.', icon: LuPlugZap },
];

const POPULAR_AIO_REPAIRS_RU = [
  { title: 'Замена экрана', text: 'трещины, битые зоны, дефекты цвета.', icon: LuMonitor },
  { title: 'Система охлаждения', text: 'шум, перегрев, чистка вентиляторов и радиаторов.', icon: LuCpu },
  { title: 'Жёсткий диск / SSD', text: 'медленная работа, система не загружается, миграция данных.', icon: LuHardDrive },
  { title: 'Программное обеспечение и вирусы', text: 'переустановка ОС, удаление вирусов и рекламного ПО.', icon: LuBug },
  { title: 'Питание', text: 'проблемы с включением, диагностика блока питания.', icon: LuPlugZap },
];

const POPULAR_DESKTOP_REPAIRS_LV = [
  { title: 'Barošanas bloks', text: 'dators neieslēdzas, izslēdzas zem slodzes.', icon: LuPlugZap },
  { title: 'Dzesēšanas sistēma', text: 'skaļi ventilatori, pārkaršana, termopastas maiņa.', icon: LuCpu },
  { title: 'Cietais disks / SSD', text: 'lēna darbība, klikšķi no diska, datu atgūšana un migrācija.', icon: LuHardDrive },
  { title: 'Programmatūra un vīrusi', text: 'OS pārinstalēšana, vīrusu un ļaunatūras noņemšana.', icon: LuBug },
  { title: 'Komponentu maiņa', text: 'atmiņa, videokarte, paplašināšana un uzlabojumi.', icon: LuCpu },
];

const POPULAR_DESKTOP_REPAIRS_RU = [
  { title: 'Блок питания', text: 'компьютер не включается, выключается под нагрузкой.', icon: LuPlugZap },
  { title: 'Система охлаждения', text: 'шумные вентиляторы, перегрев, замена термопасты.', icon: LuCpu },
  { title: 'Жёсткий диск / SSD', text: 'медленная работа, щелчки диска, восстановление и перенос данных.', icon: LuHardDrive },
  { title: 'Программное обеспечение и вирусы', text: 'переустановка ОС, удаление вирусов и вредоносного ПО.', icon: LuBug },
  { title: 'Замена компонентов', text: 'память, видеокарта, расширение и апгрейд.', icon: LuCpu },
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
      intro:
        `Ремонтируем ноутбуки и настольные компьютеры ${cfg.name} — экран, охлаждение, диски и программное обеспечение. Стоимость зависит от модели и сложности неисправности, поэтому точное предложение готовим после диагностики.`,
      paragraph:
        `Самые частые работы: <strong>замена экрана</strong>, <strong>чистка системы охлаждения и замена термопасты</strong>, <strong>замена жёсткого диска/SSD</strong>, <strong>переустановка операционной системы</strong> и <strong>удаление вирусов</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process">«Как проходит ремонт»</a>.`,
      modelsTitle: `${cfg.name} модели, которые мы ремонтируем`,
      modelsIntro:
        `Ниже показаны популярные модели ${cfg.name}. Выберите свою модель, чтобы посмотреть типовые ремонты и цены, если они доступны.`,
      modelsNote:
        'Стоимость зависит от модели — откройте страницу своей модели, чтобы увидеть цену ремонта.',
      noModels:
        `Пока для этого бренда не добавлены модели. Свяжитесь с нами, чтобы уточнить ремонт ${cfg.name}.`,
      servicesTitle: 'Популярный ремонт',
      faqTitle: 'Часто задаваемые вопросы',
      heroHtml: `<p><strong>Ремонт компьютеров ${cfg.name} в Риге</strong> — ноутбуки и настольные компьютеры, экран, клавиатура, охлаждение, диски и программное обеспечение. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>`,
    };
  }

  return {
    title: `${cfg.name} datoru remonts — ko mēs darām`,
    intro:
      `Remontējam ${cfg.name} portatīvos un galda datorus — ekrāns, dzesēšana, diski un programmatūra. Cenas atšķiras pēc modeļa un bojājuma sarežģītības, tāpēc precīzu piedāvājumu sagatavojam pēc diagnostikas.`,
    paragraph:
      'Biežākie darbi: <strong>ekrāna maiņa</strong>, <strong>dzesēšanas sistēmas tīrīšana un termopastas maiņa</strong>, <strong>cietā diska/SSD nomaiņa</strong>, <strong>operētājsistēmas pārinstalēšana</strong> un <strong>vīrusu noņemšana</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process">“Kā notiek remonts”</a>.',
    modelsTitle: `${cfg.name} modeļi, ko remontējam`,
    modelsIntro:
      `Zemāk redzami populārākie ${cfg.name} modeļi. Izvēlies savu modeli, lai apskatītu biežākos remontus un cenas (ja pieejamas).`,
    modelsNote:
      'Cenas atšķiras pēc modeļa — atver sava modeļa lapu, lai redzētu remonta cenas.',
    noModels:
      `Pagaidām šim zīmolam nav pievienotu modeļu. Sazinies ar mums, lai precizētu ${cfg.name} remontu.`,
    servicesTitle: 'Populārākie remonti',
    faqTitle: 'Biežāk uzdotie jautājumi',
    heroHtml: `<p><strong>${cfg.name} datoru remonts Rīgā</strong> — portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>`,
  };
}

export function getComputerBrandMetadata(brandSlug, locale = 'lv') {
  const cfg = getComputerBrandConfig(brandSlug);

  if (!cfg) {
    return {
      title: locale === 'ru' ? 'Ремонт компьютеров | iLab' : 'Datoru remonts | iLab',
      description:
        locale === 'ru'
          ? 'Ремонт компьютеров в Риге — ноутбуки и настольные ПК. Быстрая диагностика, честные цены, гарантия.'
          : 'Datoru remonts Rīgā — portatīvie un galda datori. Ātra diagnostika, godīgas cenas, garantija.',
    };
  }

  const title =
    locale === 'ru'
      ? `${cfg.name} ремонт компьютеров в Риге | iLab`
      : `${cfg.name} datoru remonts Rīgā | iLab`;

  const description =
    locale === 'ru'
      ? `Профессиональный ремонт компьютеров ${cfg.name} в Риге: экран, клавиатура, охлаждение, диски и программное обеспечение. Быстрая диагностика, честные цены, гарантия 90 дней.`
      : `Profesionāls ${cfg.name} datoru remonts Rīgā: ekrāns, tastatūra, dzesēšana, diski un programmatūra. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`;

  const basePath = buildCategoryHref(locale, 'datoru-remonts');

  return {
    title,
    description,
    alternates: { canonical: `${basePath}/${cfg.brandSlug}` },
  };
}

/* ---------------------------------------------
   Page component
---------------------------------------------- */

export default function ComputerBrandPage({ brand, locale = 'lv' }) {
  const brandSlug = String(brand || '').toLowerCase();

  const cat = getComputersCategory();
  const allowed =
    (cat?.brands || []).map((b) => String(b.brandSlug || '').toLowerCase());

  if (!allowed.includes(brandSlug)) return notFound();

  const cfg = getComputerBrandConfig(brandSlug);
  if (!cfg) return notFound();

  const strings = getPageStrings(cfg, locale);
  const popularRepairs = getPopularRepairsForType(cfg.deviceType, locale);
  const faqItems = locale === 'ru' ? FAQ_ITEMS_RU : FAQ_ITEMS_LV;

  const baseCategoryPath = buildCategoryHref(locale, 'datoru-remonts');
  const path = `${baseCategoryPath}/${cfg.brandSlug}`;

  const brandDevices = devicesAll.filter(
    (d) =>
      d.category === 'datoru-remonts' &&
      (d.brandSlug || '').toLowerCase() === brandSlug
  );

  const serviceLd = buildServiceLdForCity({
    path,
    name: locale === 'ru' ? `${cfg.name} ремонт компьютеров` : `${cfg.name} datoru remonts`,
    description:
      locale === 'ru'
        ? `${cfg.name} ремонт компьютеров: экран, охлаждение, диски, программное обеспечение и другие работы. Быстрая диагностика, честные цены, гарантия.`
        : `${cfg.name} datoru remonts: ekrāns, dzesēšana, diski, programmatūra un citi darbi. Ātra diagnostika, godīgas cenas, garantija.`,
  });

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: locale === 'ru' ? 'Главная' : 'Sākums', url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: locale === 'ru' ? 'Ремонт компьютеров' : 'Datoru remonts', url: abs(baseCategoryPath) },
    { name: locale === 'ru' ? `${cfg.name} ремонт компьютеров` : `${cfg.name} datoru remonts`, url: abs(path) },
  ]);

  const howToLd = buildStandardRepairHowToLd(
    locale === 'ru' ? `${cfg.name} ремонт компьютеров` : `${cfg.name} datoru remonts`
  );

  const faqLd = buildFaqLdFromPairs(faqItems);

  return (
    <>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(howToLd)}
      </Script>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <DeviceHero
        image={cfg.heroImage}
        alt={cfg.heroAlt}
        brandLogo={cfg.logo}
        brandKey={cfg.brandSlug}
        tint={cfg.tint}
        focal="right"
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
                devices={devicesAll}
                baseHref={path}
                brandSlug={cfg.brandSlug}
                categorySlug="datoru-remonts"
                initialLimit={4}
                autoExpandOnSearch={true}
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

      <Process locale={locale} variant="computer" headingLevel={2} />

      <section className={c.section}>
        <Why locale={locale} />
      </section>

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

      <section className={c.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}
import Script from 'next/script';

import { getDevices } from '@/lib/content/devices';
import { resolveCategoryPage } from '@/lib/content/resolvers/catalogPages';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import BrandPreview from '@components/model-grid/BrandPreview';

import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';

import s from '@styles/Catalog.module.scss';

import {
  LuSmartphone,
  LuBatteryCharging,
  LuPlugZap,
  LuCamera,
  LuVolume2,
  LuDroplets,
} from 'react-icons/lu';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildItemListLd,
  buildStandardRepairHowToLd,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref, buildServiceHref } from '@/lib/routes/routeI18n';

const CATEGORY_KEY = 'telefonu-remonts';

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

function normalizeRoutePath(path = '', locale = 'lv') {
  if (!path) return '';

  const clean = String(path).trim();

  if (locale === 'lv') return clean;

  if (clean === '/') return '/ru';
  if (clean === '/ru' || clean.startsWith('/ru/')) return clean;

  return `/ru${clean.startsWith('/') ? clean : `/${clean}`}`;
}

function sortDevices(list = []) {
  return [...list].sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : 99999;
    const bo = typeof b.order === 'number' ? b.order : 99999;
    if (ao !== bo) return ao - bo;

    if (a.year && b.year && a.year !== b.year) {
      return b.year - a.year;
    }

    return (a.name || '').localeCompare(b.name || '', 'lv');
  });
}

function buildBrandBlocks({ category, devices, locale = 'lv', basePath }) {
  const categoryBrands = Array.isArray(category?.brands) ? category.brands : [];

  const phoneDevices = devices.filter((d) => {
    if (!d) return false;
    if (d.type !== 'device') return false;
    if (d.categoryKey !== CATEGORY_KEY) return false;
    if (!d.brandKey || !d.slug || !d.name) return false;
    if (d.isHidden === true) return false;
    return true;
  });

  const devicesByBrand = new Map();

  for (const device of phoneDevices) {
    const brandKey = String(device.brandKey).trim().toLowerCase();
    if (!brandKey) continue;

    if (!devicesByBrand.has(brandKey)) {
      devicesByBrand.set(brandKey, []);
    }

    devicesByBrand.get(brandKey).push(device);
  }

  return categoryBrands
    .map((brand) => {
      const brandKey = String(brand?.key || '').trim().toLowerCase();
      if (!brandKey) return null;

      const brandDevices = sortDevices(devicesByBrand.get(brandKey) || []);
      if (!brandDevices.length) return null;

      const href = `${basePath}/${brandKey}`;

      return {
        slug: brandKey,
        name: pickLocalized(brand?.labels, locale, brandKey),
        href,
        items: brandDevices.slice(0, 4),
        total: brandDevices.length,
        order: Number.isFinite(Number(brand?.order)) ? Number(brand.order) : 9999,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

function getPhoneFaq(locale = 'lv') {
  if (locale === 'ru') {
    return [
      {
        q: 'Сколько занимает замена экрана телефона?',
        a: 'Часто 1–3 часа, в зависимости от модели и загрузки сервиса.',
      },
      {
        q: 'Сохранятся ли мои данные?',
        a: 'Мы делаем всё возможное, чтобы сохранить данные. Перед ремонтом рекомендуем сделать резервную копию.',
      },
      {
        q: 'Есть ли гарантия на детали?',
        a: 'Да, и на детали, и на выполненную работу.',
      },
      {
        q: 'Доступны ли оригинальные детали?',
        a: 'Используем оригинальные или качественные OEM детали — выбор согласовываем с клиентом.',
      },
      {
        q: 'Можно ли узнать примерную цену до ремонта?',
        a: 'Да, после быстрой диагностики назовём диапазон стоимости и срок.',
      },
    ];
  }

  return [
    {
      q: 'Cik ilgi ilgst telefona displeja maiņa?',
      a: 'Bieži 1–3 stundas atkarībā no modeļa un noslodzes.',
    },
    {
      q: 'Vai mani dati saglabāsies?',
      a: 'Darām visu iespējamo; pirms remonta iesakām dublējumu.',
    },
    {
      q: 'Vai detaļām ir garantija?',
      a: 'Jā, gan detaļām, gan darbam.',
    },
    {
      q: 'Vai pieejamas oriģinālās detaļas?',
      a: 'Izmantojam oriģinālās vai augstas kvalitātes OEM — izvēli saskaņojam ar klientu.',
    },
    {
      q: 'Vai varu saņemt aptuveno cenu pirms remonta?',
      a: 'Jā, pēc ātras diagnostikas sniegsim izmaksu diapazonu un termiņu.',
    },
  ];
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт телефонов в Риге',
      heroBodyHtml:
        '<p><strong>Быстрый и безопасный ремонт телефонов в Риге</strong> — замена экрана, батареи и камеры в тот же день. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',
      introTitle: 'Ремонт телефонов — что мы делаем',
      introLead:
        'Экраны, батареи, разъёмы зарядки, камеры и другие ремонтные работы. Стоимость согласовываем до начала работ, самые частые ремонты выполняем в тот же день. Выберите свой бренд и откройте страницу конкретной модели.',
      introP1:
        'Ежедневно выполняем <strong>ремонт телефонов</strong> — от <strong>замены экрана</strong> и <strong>батареи</strong> до <strong>ремонта разъёма зарядки</strong>, <strong>проблем с камерой</strong> и устранения <strong>повреждений после попадания влаги</strong>. До начала работ согласовываем <strong>цену и срок</strong>, самые частые ремонты выполняем в тот же день. Узнайте, как проходит ремонт, в разделе <a href="#process-h2">«Как проходит ремонт»</a>.',
      introP2:
        'Работаем со <strong>всеми популярными брендами</strong>: <a href="/ru/remont-iphone">ремонт iPhone</a>, <a href="/ru/remont-telefonov/samsung">ремонт Samsung</a>, <a href="/ru/remont-telefonov/huawei">ремонт Huawei</a>, <a href="/ru/remont-telefonov/oneplus">ремонт OnePlus</a> и др. Для каждого бренда доступны отдельные <strong>страницы моделей</strong> с типовыми неисправностями и решениями.',
      introP3:
        'Самые частые работы: <strong>ремонт дисплея</strong> (трещины, тёмные пятна, сенсор не реагирует), <strong>замена батареи</strong> (заряд быстро падает, телефон выключается при 10–20%), <strong>разъём зарядки</strong> (кабель не держится, зарядка медленная/нестабильная), <strong>камера</strong> (мутные фото, ошибки фокусировки), <strong>динамики/микрофон</strong> (тихий звук, хрипы, во время разговора не слышно), а также <strong>повреждения от влаги</strong>. Если не уверены в названии модели, выберите бренд ниже и найдите модель в списке.',
      breadcrumbName: 'Ремонт телефонов',
      serviceName: 'Ремонт телефонов',
      serviceDescription:
        'Ремонт телефонов — дисплеи, батареи, разъёмы зарядки, камеры и другие работы. Быстрая диагностика, понятные цены, гарантия.',
      servicesTitle: 'Популярный ремонт',
      servicesItems: [
        {
          title: 'Замена дисплея (экрана)',
          text: 'трещины, тёмные пятна, сенсор не реагирует.',
          icon: LuSmartphone,
          href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
        },
        {
          title: 'Замена батареи',
          text: 'заряд быстро падает, выключается при 10–20%.',
          icon: LuBatteryCharging,
          href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
        },
        {
          title: 'Разъём зарядки',
          text: 'кабель не держится, зарядка медленная или нестабильная.',
          icon: LuPlugZap,
          href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
        },
        {
          title: 'Камера',
          text: 'мутные фото, проблемы с фокусировкой.',
          icon: LuCamera,
          href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
        },
        {
          title: 'Динамики/микрофон',
          text: 'тихий звук, хрипы, во время разговора не слышно.',
          icon: LuVolume2,
          href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
        },
        {
          title: 'Повреждения от влаги',
          text: 'диагностика и восстановление, если это возможно.',
          icon: LuDroplets,
          href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
        },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        { title: 'Диагностика', text: 'Быстро проверяем устройство и подтверждаем проблему.' },
        {
          title: 'Цена и срок',
          text: 'Согласовываем стоимость и срок выполнения до начала работ.',
        },
        {
          title: 'Ремонт',
          text: 'Сертифицированные мастера выполняют ремонт с использованием качественных деталей.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем функциональность и безопасность устройства.',
        },
        {
          title: 'Гарантия',
          text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.',
        },
      ],
      scrollCta: { label: 'Смотреть бренды', targetId: 'brand-list' },
      fallbackTitle: 'Ремонт телефонов в Риге',
    };
  }

  return {
    heroAlt: 'telefonu remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ātrs un drošs telefonu remonts Rīgā</strong> — ekrāna, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
    introTitle: 'Telefonu remonts — ko mēs darām',
    introLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba uzsākšanas, biežākos darbus paveicam tajā pašā dienā. Izvēlies savu zīmolu un atver konkrēta modeļa lapu.',
    introP1:
      'Ikdienā veicam <strong>telefonu remontu</strong> — sākot ar <strong>ekrāna maiņu</strong> un <strong>baterijas nomaiņu</strong>, līdz <strong>uzlādes ligzdas remontam</strong>, <strong>kameras problēmām</strong> un <strong>ūdens bojājumu</strong> novēršanai. Pirms darba saskaņojam <strong>cenu un termiņu</strong>, biežākos darbus paveicam tajā pašā dienā. Uzzini, kā notiek remonts sadaļā <a href="#process-h2">“Kā notiek remonts”</a>.',
    introP2:
      'Strādājam ar <strong>visiem populārajiem zīmoliem</strong>: <a href="/iphone-remonts">iPhone remonts</a>, <a href="/telefonu-remonts/samsung">Samsung telefonu remonts</a>, <a href="/telefonu-remonts/huawei">Huawei remonts</a>, <a href="/telefonu-remonts/oneplus">OnePlus remonts</a> u.c. Katram zīmolam ir pieejamas atsevišķas <strong>modeļu lapas</strong> ar biežākajiem bojājumiem un risinājumiem.',
    introP3:
      'Biežākie darbi: <strong>displeja remonts</strong> (plaisas, tumši plankumi, nereaģē skāriens), <strong>baterijas maiņa</strong> (strauji krīt uzlāde, izslēdzas pie 10–20%), <strong>uzlādes ligzda</strong> (nenoturas kabelis, lēna/nekonsekventa uzlāde), <strong>kamera</strong> (miglaini attēli, fokusēšanās kļūdas), <strong>skaļruņi/mikrofons</strong> (klusa skaņa, krakšķi, sarunās nedzird), kā arī <strong>mitruma bojājumi</strong>. Ja neesi pārliecināts par modeļa nosaukumu, izvēlies zīmolu zemāk un atrodi modeli sarakstā.',
    breadcrumbName: 'Telefonu remonts',
    serviceName: 'Telefonu remonts',
    serviceDescription:
      'Telefonu remonts — displeji, baterijas, uzlādes ligzdas, kameras un citi darbi. Ātra diagnostika, godīgas cenas, garantija.',
    servicesTitle: 'Populārākie remonti',
    servicesItems: [
      {
        title: 'Displeja (ekrāna) maiņa',
        text: 'plaisas, tumši plankumi, nereaģē skāriens.',
        icon: LuSmartphone,
        href: buildServiceHref(locale, CATEGORY_KEY, 'ekrana-maina'),
      },
      {
        title: 'Akumulatora maiņa',
        text: 'strauji krīt uzlāde, izslēdzas pie 10–20%.',
        icon: LuBatteryCharging,
        href: buildServiceHref(locale, CATEGORY_KEY, 'baterijas-maina'),
      },
      {
        title: 'Uzlādes ligzda',
        text: 'nenoturas kabelis, lēna vai nestabila uzlāde.',
        icon: LuPlugZap,
        href: buildServiceHref(locale, CATEGORY_KEY, 'uzlades-ligzdas-maina'),
      },
      {
        title: 'Kamera',
        text: 'miglaini attēli, fokusēšanās problēmas.',
        icon: LuCamera,
        href: buildServiceHref(locale, CATEGORY_KEY, 'kameras-remonts'),
      },
      {
        title: 'Skaļruņi/mikrofons',
        text: 'klusa skaņa, krakšķi, sarunas laikā nedzird.',
        icon: LuVolume2,
        href: buildServiceHref(locale, CATEGORY_KEY, 'skalruni-mikrofona-remonts'),
      },
      {
        title: 'Ūdens bojājumi',
        text: 'diagnostika un atjaunošana, ja tas iespējams.',
        icon: LuDroplets,
        href: buildServiceHref(locale, CATEGORY_KEY, 'udens-bojajumu-remonts'),
      },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      { title: 'Diagnostika', text: 'Ātri pārbaudām ierīci un apstiprinām problēmu.' },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts',
        text: 'Sertificēti meistari veic remontu, izmantojot kvalitatīvas detaļas.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam visu funkcionalitāti un drošību.',
      },
      {
        title: 'Garantija',
        text: '90 dienu garantija un ieteikumi turpmākai lietošanai.',
      },
    ],
    scrollCta: { label: 'Skatīt zīmolus', targetId: 'brand-list' },
    fallbackTitle: 'Telefonu remonts Rīgā',
  };
}

export function getPhoneRepairMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт телефонов в Риге — цены, быстро, гарантия | iLab',
      description:
        'Ремонт телефонов всех брендов: экран, батарея, разъём зарядки, камера, повреждения от влаги. Быстрая диагностика, честные цены, гарантия 90 дней.',
      alternates: { canonical: '/ru/remont-telefonov' },
    };
  }

  return {
    title: 'Telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
    description:
      'Telefonu remonts visiem zīmoliem: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
    alternates: { canonical: '/telefonu-remonts' },
  };
}

export default async function PhoneRepairPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const faqItems = getPhoneFaq(locale);

  const [page, devices] = await Promise.all([
    resolveCategoryPage(CATEGORY_KEY, locale),
    getDevices(),
  ]);

  if (!page) return null;

  const basePath = buildCategoryHref(locale, CATEGORY_KEY);

  const brandBlocks = buildBrandBlocks({
    category: page.source?.category,
    devices,
    locale,
    basePath,
  });

  const headerTitle =
    page.seo?.h1 ||
    page.seo?.breadcrumbName ||
    strings.fallbackTitle;

  const headerLead =
    page.intro?.lead ||
    page.seo?.metaDescription ||
    page.seo?.schemaDescription ||
    null;

  const breadcrumbs = [
    {
      label: page.labels?.homeCrumb || (locale === 'ru' ? 'Главная' : 'Sākums'),
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: page.seo?.breadcrumbName || headerTitle,
      href: basePath,
    },
  ];

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: breadcrumbs[0].label, url: abs(breadcrumbs[0].href) },
    { name: breadcrumbs[1].label, url: abs(breadcrumbs[1].href) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: basePath,
    name: page.seo?.schemaName || strings.serviceName,
    description: page.seo?.schemaDescription || strings.serviceDescription,
  });

  const itemListLd = buildItemListLd(
    brandBlocks.map((b) => ({
      name:
        locale === 'ru'
          ? `Ремонт телефонов ${b.name}`
          : `${b.name} telefonu remonts`,
      url: abs(b.href),
    }))
  );

  const howToLd = buildStandardRepairHowToLd(
    locale === 'ru' ? 'ремонт телефонов' : 'telefonu remonts'
  );

  const faqLd = buildFaqLdFromPairs(faqItems);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="howto-jsonld" type="application/ld+json">
        {JSON.stringify(howToLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>

      <Script id="itemlist-jsonld" type="application/ld+json">
        {JSON.stringify(itemListLd)}
      </Script>

      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={strings.scrollCta}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        alt={strings.heroAlt}
        focal="right"
        priority
        bodyHtml={strings.heroBodyHtml}
      />

      <section className={s.section} aria-labelledby="phones-intro-h2">
        <div className={s.container}>
          <h2 id="phones-intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p className={s.intro}>{strings.introLead}</p>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP3 }}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="popular-services-h2">
        <div className={s.container}>
          <Services
            id="brand-services"
            title={strings.servicesTitle}
            items={strings.servicesItems}
          />
        </div>
      </section>

      <div id="brand-list" className={s.anchorTarget} />

      {brandBlocks.map((b) => (
        <BrandPreview
          key={b.slug}
          brandSlug={b.slug}
          brandName={b.name}
          items={b.items}
          total={b.total}
          href={b.href}
          locale={locale}
        />
      ))}

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      {page.sections?.hasProcess && (
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
      )}

      {page.sections?.hasWhy && (
        <section className={s.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <Faq
              id="phones-faq"
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
        <section className={s.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}
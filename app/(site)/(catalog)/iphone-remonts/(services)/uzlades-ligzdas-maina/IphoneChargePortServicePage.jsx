import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import devices from '@/data/devices';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';

import { db } from '@/lib/firebaseAdmin';

/* ---------------- ROUTES ---------------- */

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-razema-zaryadki'
    : '/iphone-remonts/uzlades-ligzdas-maina';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone#iphone-modeli'
    : '/iphone-remonts#iphone-modeli';
}

/* ---------------- STRINGS ---------------- */

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Замена разъёма зарядки iPhone в Риге',
      heroBodyHtml:
        '<p><strong>iPhone не заряжается, нужно шевелить кабель или разъём болтается?</strong> Выполняем быструю и безопасную <strong>замену разъёма зарядки в Риге</strong>, а при необходимости — профессиональную чистку и устранение окисления. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',
      headerTitle: 'Замена разъёма зарядки iPhone в Риге',
      headerLead:
        'Решаем проблемы с зарядкой: iPhone не заряжается, кабель нужно шевелить или пропадает контакт. До ремонта проводим диагностику, при необходимости чистим порт или меняем разъём и выдаём гарантию 90 дней.',
      introTitle: 'Замена разъёма зарядки iPhone в Риге',
      introP1:
        'Если iPhone не заряжается, соединение пропадает, кабель нужно держать под определённым углом или порт выглядит загрязнённым, <strong>скорее всего нужна чистка или замена разъёма зарядки</strong>. Мастера iLab проводят <strong>диагностику</strong>, устраняют окисление и механические повреждения или устанавливают новый разъём — в зависимости от состояния и модели.',
      introP2:
        'Также проверяем <strong>кабель, адаптер, цепь зарядки и батарею</strong>, чтобы исключить другие причины. Популярные модели обычно ремонтируем за <strong>60–120 минут</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Прокрутите к',
      selectedModelLink: 'ценам',
      modelPickerTitle: 'Выберите модель iPhone',
      priceTitle: 'Цены на замену разъёма зарядки по моделям',
      priceIntro:
        'Выберите модель iPhone, чтобы посмотреть цену ремонта разъёма зарядки. Многие устройства ремонтируем в тот же день.',
      ctaLabel: 'Записаться на ремонт',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        { title: 'Диагностика', text: 'Проверяем порт, контакты, кабель, адаптер и цепь зарядки.' },
        { title: 'Чистка или замена', text: 'Удаляем загрязнения/окисление или устанавливаем новый разъём.' },
        { title: 'Тесты', text: 'Проверяем зарядку, передачу данных и механическую фиксацию.' },
        { title: 'Безопасность', text: 'При необходимости восстанавливаем уплотнение и проводим финальную проверку.' },
        { title: 'Гарантия', text: 'Гарантия 90 дней и рекомендации по дальнейшему использованию.' },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Зарядка',
      basicFaqGroupLabel: 'Общие вопросы',
      breadcrumbServiceName: 'Замена разъёма зарядки',
      serviceName: 'Замена разъёма зарядки iPhone в Риге',
      serviceType: 'Замена разъёма зарядки iPhone',
      serviceDescription:
        'Замена разъёма зарядки iPhone в Риге: бесплатная диагностика, гарантия 90 дней, решаем проблемы “не заряжается”, окисление и нестабильный контакт кабеля.',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      headerCtaLabel: 'Смотреть цены',
      serviceFaqDocId: 'service_uzlades-ligzdas-maina_ru',
      basicFaqDocId: 'basic_ru',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    heroAlt: 'iPhone uzlādes ligzdas maiņa Rīgā',
    heroBodyHtml:
      '<p><strong>iPhone nelādējas, jākustina vads vai ports ir vaļīgs?</strong> Veicam ātru un drošu <strong>uzlādes ligzdas maiņu Rīgā</strong>, nepieciešamības gadījumā — profesionālu tīrīšanu un oksidācijas novēršanu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
    headerTitle: 'iPhone uzlādes ligzdas maiņa Rīgā',
    headerLead:
      'Risinām uzlādes problēmas: iPhone nelādējas, jākustina vads vai savienojums ir nestabils. Pirms remonta veicam diagnostiku, tīrām portu vai nomainām ligzdu un pēc remonta sniedzam 90 dienu garantiju.',
    introTitle: 'iPhone uzlādes ligzdas maiņa Rīgā',
    introP1:
      'Ja iPhone nelādējas, pazūd savienojums, jāpieliec kabelis noteiktā leņķī vai ports izskatās netīrs, <strong>visticamāk nepieciešama uzlādes ligzdas tīrīšana vai maiņa</strong>. iLab meistari veic <strong>diagnostiku</strong>, novērš oksidāciju un mehāniskus bojājumus vai uzstāda jaunu ligzdu — atkarībā no stāvokļa un modeļa.',
    introP2:
      'Pārbaudām arī <strong>kabeli, adapteri, uzlādes ķēdi un bateriju</strong>, lai izslēgtu citus cēloņus. Populāros modeļus parasti salabojam <strong>60–120 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ritiniet uz',
    selectedModelLink: 'cenām',
    modelPickerTitle: 'Izvēlies iPhone modeli',
    priceTitle: 'Uzlādes ligzdas maiņas cenas pēc modeļa',
    priceIntro:
      'Izvēlies savu iPhone modeli, lai redzētu uzlādes ligzdas remonta cenu. Daudzas ierīces salabojam tajā pašā dienā.',
    ctaLabel: 'Pieteikties remontam',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      { title: 'Diagnostika', text: 'Pārbaudām portu, kontaktus, kabeli, adapteri un uzlādes ķēdi.' },
      { title: 'Tīrīšana vai maiņa', text: 'Noņemam netīrumus/oksidāciju vai uzstādam jaunu ligzdu.' },
      { title: 'Testi', text: 'Pārbaudām uzlādi, datu pārsūtīšanu un mehānisku noturību.' },
      { title: 'Drošība', text: 'Ja nepieciešams, atjaunojam blīvējumu un veicam galīgo pārbaudi.' },
      { title: 'Garantija', text: '90 dienu garantija un ieteikumi turpmākai lietošanai.' },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Uzlāde',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    breadcrumbServiceName: 'Uzlādes ligzdas maiņa',
    serviceName: 'iPhone uzlādes ligzdas maiņa Rīgā',
    serviceType: 'iPhone uzlādes ligzdas maiņa',
    serviceDescription:
      'iPhone uzlādes ligzdas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija, risinām nelādējas/oksidācijas/problēmas ar kabeli. Bieži tajā pašā dienā.',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    headerCtaLabel: 'Skatīt cenas',
    serviceFaqDocId: 'service_uzlades-ligzdas-maina_lv',
    basicFaqDocId: 'basic_lv',
    applyAria: 'Pieteikties remontam',
  };
}

/* ---------------- METADATA EXPORT ---------------- */

export function getIphoneChargePortServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Замена разъёма зарядки iPhone в Риге | iLab',
      description:
        'Быстрая и профессиональная замена разъёма зарядки iPhone в Риге. Бесплатная диагностика, гарантия 90 дней. Решаем проблемы “не заряжается”, “нужно шевелить кабель”, “нет реакции на зарядку” и другие.',
      alternates: { canonical: getRoutePath(locale) },
    };
  }

  return {
    title: 'iPhone uzlādes ligzdas maiņa Rīgā | iLab',
    description:
      'Ātra un profesionāla iPhone uzlādes ligzdas maiņa Rīgā. Bezmaksas diagnostika, 90 dienu garantija. Risinām “nelādējas”, “jākustina vads”, “nereaģē uzlāde” u.c. problēmas, bieži tajā pašā dienā.',
    alternates: { canonical: getRoutePath(locale) },
  };
}

/* ---------------- SEO HELPERS ---------------- */

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.hubCrumb, url: abs(getHubPath(locale)) },
    { name: strings.breadcrumbServiceName, url: abs(getRoutePath(locale)) },
  ]);
}

function buildServiceLd(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildServiceLdForCity({
    path: getRoutePath(locale),
    name: strings.serviceName,
    serviceType: strings.serviceType,
    description: strings.serviceDescription,
  });
}

/* ---------------- FAQ HELPERS ---------------- */

function dedupeFaqItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = normalizeText(item?.q || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;
    if (ao !== bo) return ao - bo;

    const aq = String(a?.q || '');
    const bq = String(b?.q || '');
    return aq.localeCompare(bq);
  });
}

async function getFaqSections(locale = 'lv') {
  const strings = getPageStrings(locale);

  const [serviceDoc, basicDoc] = await Promise.all([
    db.collection('faqGroups').doc(strings.serviceFaqDocId).get(),
    db.collection('faqGroups').doc(strings.basicFaqDocId).get(),
  ]);

  const sections = [];

  const serviceData = serviceDoc.exists ? serviceDoc.data() || {} : {};
  const basicData = basicDoc.exists ? basicDoc.data() || {} : {};

  const serviceItems = sortFaqItems(
    (Array.isArray(serviceData.items) ? serviceData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (serviceItems.length) {
    sections.push({
      id: strings.serviceFaqDocId,
      title: strings.serviceFaqGroupLabel,
      items: serviceItems,
    });
  }

  const basicItems = sortFaqItems(
    (Array.isArray(basicData.items) ? basicData.items : [])
      .filter((item) => {
        if (!item) return false;
        if (!String(item.q || '').trim()) return false;
        if (!(String(item.aHtml || '').trim() || String(item.a || '').trim())) {
          return false;
        }
        if (item.isHidden === true) return false;
        return true;
      })
      .map((item) => ({
        q: String(item.q || '').trim(),
        aHtml: typeof item.aHtml === 'string' ? item.aHtml.trim() : '',
        a: typeof item.a === 'string' ? item.a.trim() : '',
        order:
          typeof item.order === 'number' && Number.isFinite(item.order)
            ? item.order
            : 9999,
      }))
  );

  if (basicItems.length) {
    sections.push({
      id: strings.basicFaqDocId,
      title: strings.basicFaqGroupLabel,
      items: basicItems,
    });
  }

  return sections;
}

/* ---------------- PRICING ---------------- */

async function buildPricingForChargePort() {
  const pricing = {};

  devices
    .filter((d) => d.brandSlug === 'apple' && d.category === 'telefonu-remonts')
    .forEach((d) => {
      pricing[d.slug] = { items: [] };
    });

  const snap = await db
    .collection('modelServices')
    .where('serviceId', '==', 'charge-port')
    .get();

  snap.forEach((doc) => {
    const data = doc.data() || {};
    const modelId = data.modelId;
    if (!modelId || !pricing[modelId]) return;

    pricing[modelId].items.push({
      id: 'charge-port',
      price: Object.prototype.hasOwnProperty.call(data, 'price') ? data.price : '',
    });
  });

  return pricing;
}

/* ---------------- PAGE ---------------- */

export default async function IphoneChargePortServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const pricing = await buildPricingForChargePort();

  const strings = getPageStrings(locale);
  const sections = await getFaqSections(locale);

  const mergedFaqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedFaqItems);
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.hubCrumb,
      href: getHubPath(locale),
    },
    {
      label: strings.breadcrumbServiceName,
      href: getRoutePath(locale),
    },
  ];

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/uzlades_ligzda_remonts.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introP2 }}
          />

          {selectedModel && (
            <p className={s.note}>
              {strings.selectedModelPrefix} <strong>{decodeURIComponent(selectedModel)}</strong>.{' '}
              {strings.selectedModelSuffix} <a href="#brand-list">{strings.selectedModelLink}</a>.
            </p>
          )}
        </div>
      </section>

      <section id="brand-list" className={s.section} aria-labelledby="brand-picker-h2">
        <div className={s.container}>
          <h2 id="brand-picker-h2" className={s.h2} style={{ marginBottom: 12 }}>
            {strings.modelPickerTitle}
          </h2>

          <ServicePricelist
            devices={devices}
            pricing={pricing}
            brandSlug="apple"
            categorySlug="telefonu-remonts"
            serviceIds={['charge-port']}
            title={strings.priceTitle}
            intro={strings.priceIntro}
            initialLimit={8}
            allModelsHref={getAllModelsHref(locale)}
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

      {!!sections.length && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>
              {strings.faqTitle}
            </h2>

            {sections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title}
                  items={toFaqRenderItems(section.items)}
                  headingLevel={3}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section
        id="pieteikties"
        className={s.section}
        aria-label={strings.applyAria}
      >
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}
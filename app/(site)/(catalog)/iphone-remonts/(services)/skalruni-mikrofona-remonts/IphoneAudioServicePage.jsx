import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';
import { db } from '@/lib/firebaseAdmin';

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/remont-dinamika-mikrofona'
    : '/iphone-remonts/skalruni-mikrofona-remonts';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Ремонт динамика и микрофона iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Тихий звук, хрипы или вас не слышно во время разговора?</strong> Выполняем <strong>ремонт динамика и микрофона iPhone</strong> — профессиональная чистка, замена модулей, полная проверка и <strong>гарантия 90 дней</strong>.</p>',
      introTitle: 'Ремонт динамика и микрофона iPhone в Риге',
      introP1:
        'Проблемы со звуком могут вызывать <strong>пыль, влага, окисление или изношенные модули</strong>. Выполняем <strong>диагностику</strong>, после которой определяем — достаточно ли <strong>чистки</strong> или нужна <strong>замена динамика/микрофона</strong>.',
      introP2:
        'Популярные модели обычно ремонтируем за <strong>45–90 минут</strong>. На все работы и детали действует <strong>гарантия 90 дней</strong>.',
      selectedModelPrefix: 'Выбрана модель:',
      selectedModelSuffix: 'Если нужна точная цена, оставьте заявку ниже.',
      processTitle: 'Как проходит ремонт',
      processSteps: [
        { title: 'Диагностика', text: 'Проверяем динамики, микрофон, сетки и соединения.' },
        { title: 'Чистка или замена', text: 'Удаляем загрязнения, следы окисления или меняем поврежденный модуль.' },
        { title: 'Тесты', text: 'Проверяем звук звонка, мультимедиа, качество разговора и работу микрофона.' },
        { title: 'Завершение', text: 'Контроль качества и рекомендации по дальнейшему использованию.' },
        { title: 'Гарантия', text: 'Гарантия 90 дней на детали и выполненные работы.' },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      serviceFaqGroupLabel: 'Ремонт динамика и микрофона',
      basicFaqGroupLabel: 'Общие вопросы',
      breadcrumbServiceName: 'Ремонт динамика и микрофона',
      serviceName: 'Ремонт динамика и микрофона iPhone в Риге',
      serviceType: 'Ремонт динамика и микрофона iPhone',
      serviceDescription:
        'Ремонт динамика и микрофона iPhone в Риге: диагностика, чистка или замена модуля, тесты и гарантия 90 дней.',
      homeCrumb: 'Главная',
      hubCrumb: 'Ремонт iPhone',
      headerTitle: 'Ремонт динамика и микрофона iPhone в Риге',
      headerLead:
        'Ремонтируем динамик и микрофон iPhone при тихом звуке, хрипах и проблемах во время разговора. До ремонта проводим диагностику, согласовываем решение и после ремонта выдаём гарантию 90 дней.',
      headerCtaLabel: 'Оставить заявку',
      serviceFaqDocId: 'service_skalruni-mikrofona-remonts_ru',
      basicFaqDocId: 'basic_ru',
      applyAria: 'Записаться на ремонт',
    };
  }

  return {
    heroAlt: 'iPhone skaļruņu un mikrofona remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Klusa skaņa, krakšķi vai sarunās nedzird?</strong> Veicam <strong>iPhone skaļruņu un mikrofona remontu</strong> — profesionāla tīrīšana, moduļu nomaiņa, pilna pārbaude un <strong>90 dienu garantija</strong>.</p>',
    introTitle: 'iPhone skaļruņu un mikrofona remonts Rīgā',
    introP1:
      'Skaņas problēmas var izraisīt <strong>putekļi, mitrums, oksidācija vai nolietoti moduļi</strong>. Veicam <strong>diagnostiku</strong>, pēc kuras noskaidrojam — pietiek ar <strong>tīrīšanu</strong> vai nepieciešama <strong>skaļruņa/mikrofona nomaiņa</strong>.',
    introP2:
      'Populāros modeļus parasti salabojam <strong>45–90 minūtēs</strong>. Visam darbam un detaļām ir <strong>90 dienu garantija</strong>.',
    selectedModelPrefix: 'Atlasīts modelis:',
    selectedModelSuffix: 'Ja nepieciešama precīza cena, iesniedz pieteikumu zemāk.',
    processTitle: 'Kā notiek remonts',
    processSteps: [
      { title: 'Diagnostika', text: 'Pārbaudām skaļruņus, mikrofonu, režģus un savienojumus.' },
      { title: 'Tīrīšana vai nomaiņa', text: 'Noņemam netīrumus, oksidāciju vai mainām bojāto moduli.' },
      { title: 'Testi', text: 'Pārbaudām zvana, multimediju skaņu, sarunu kvalitāti un mikrofonu.' },
      { title: 'Nobeigums', text: 'Kvalitātes pārbaude un ieteikumi turpmākai lietošanai.' },
      { title: 'Garantija', text: '90 dienu garantija gan detaļām, gan darbam.' },
    ],
    faqTitle: 'Biežāk uzdotie jautājumi',
    serviceFaqGroupLabel: 'Skaļruņu un mikrofona remonts',
    basicFaqGroupLabel: 'Vispārīgi jautājumi',
    breadcrumbServiceName: 'Skaļruņu un mikrofona remonts',
    serviceName: 'iPhone skaļruņu un mikrofona remonts Rīgā',
    serviceType: 'iPhone skaļruņu un mikrofona remonts',
    serviceDescription:
      'iPhone skaļruņu un mikrofona remonts Rīgā: diagnostika, tīrīšana vai moduļa nomaiņa, testi un 90 dienu garantija.',
    homeCrumb: 'Sākums',
    hubCrumb: 'iPhone remonts',
    headerTitle: 'iPhone skaļruņu un mikrofona remonts Rīgā',
    headerLead:
      'Remontējam iPhone skaļruni un mikrofonu, ja skaņa ir klusa, krakšķ vai sarunās nedzird. Pirms remonta veicam diagnostiku, izvērtējam, vai pietiek ar tīrīšanu vai nepieciešama nomaiņa, un pēc remonta sniedzam 90 dienu garantiju.',
    headerCtaLabel: 'Pieteikties',
    serviceFaqDocId: 'service_skalruni-mikrofona-remonts_lv',
    basicFaqDocId: 'basic_lv',
    applyAria: 'Pieteikties remontam',
  };
}

export function getIphoneAudioServiceMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт динамика и микрофона iPhone в Риге | iLab',
      description:
        'Тихий звук, хрипы или вас не слышно во время разговора? Профессиональный ремонт динамика и микрофона iPhone в Риге — чистка, замена модулей, диагностика и гарантия 90 дней.',
      alternates: { canonical: getRoutePath(locale) },
    };
  }

  return {
    title: 'iPhone skaļruņu un mikrofona remonts Rīgā | iLab',
    description:
      'Klusa skaņa, krakšķi vai sarunās nedzird? Profesionāls iPhone skaļruņu un mikrofona remonts Rīgā — tīrīšana, moduļu nomaiņa, diagnostika un 90 dienu garantija.',
    alternates: { canonical: getRoutePath(locale) },
  };
}

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

export default async function IphoneAudioServicePage({
  locale = 'lv',
  searchParams,
}) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  const strings = getPageStrings(locale);
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);
  const sections = await getFaqSections(locale);

  const mergedFaqItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedFaqItems);

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
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'pieteikties' }}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image="/images/categories/mikrofona_remonts.webp"
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
              {strings.selectedModelSuffix}
            </p>
          )}
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

          <ConvertBand locale={locale} />

      </section>
    </>
  );
}
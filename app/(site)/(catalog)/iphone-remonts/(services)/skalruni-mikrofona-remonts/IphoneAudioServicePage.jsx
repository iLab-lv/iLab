import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

const FAQ_ITEMS = [
  {
    q: 'Kādi simptomi norāda uz skaļruņu vai mikrofona problēmām?',
    a: 'Klusa vai izkropļota skaņa, krakšķi, nav skaņas zvana laikā, sarunās nedzird vai jūsu balsi nedzird pretējā galā.',
  },
  {
    q: 'Vai pietiek tikai ar tīrīšanu?',
    a: 'Bieži skaņas problēmas izraisa putekļi vai netīrumi režģos. Ja pietiek ar tīrīšanu, maiņa nav nepieciešama — to noteiks diagnostikā.',
  },
  {
    q: 'Cik ilgi ilgst remonts?',
    a: 'Parasti 45–90 minūtes atkarībā no modeļa un bojājuma.',
  },
  {
    q: 'Vai mani dati ir drošībā?',
    a: 'Jā. Skaņas komponentu remonts neietekmē jūsu datus, tomēr drošībai iesakām izveidot dublējumu.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļām, gan veiktajam darbam.',
  },
];

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
      faqGroupLabel: 'Звук',
      breadcrumbServiceName: 'Ремонт динамика и микрофона',
      serviceName: 'Ремонт динамика и микрофона iPhone в Риге',
      serviceType: 'Ремонт динамика и микрофона iPhone',
      serviceDescription:
        'Ремонт динамика и микрофона iPhone в Риге: диагностика, чистка или замена модуля, тесты и гарантия 90 дней.',
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
    faqGroupLabel: 'Skaņa',
    breadcrumbServiceName: 'Skaļruņu un mikrofona remonts',
    serviceName: 'iPhone skaļruņu un mikrofona remonts Rīgā',
    serviceType: 'iPhone skaļruņu un mikrofona remonts',
    serviceDescription:
      'iPhone skaļruņu un mikrofona remonts Rīgā: diagnostika, tīrīšana vai moduļa nomaiņa, testi un 90 dienu garantija.',
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

function buildFaqLd() {
  return buildFaqLdFromPairs(FAQ_ITEMS);
}

function buildBreadcrumbs(locale = 'lv') {
  const strings = getPageStrings(locale);

  return buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: 'iPhone remonts', url: abs(getHubPath(locale)) },
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

export default function IphoneAudioServicePage({ locale = 'lv', searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;

  const strings = getPageStrings(locale);
  const faqLd = buildFaqLd();
  const breadcrumbsLd = buildBreadcrumbs(locale);
  const serviceLd = buildServiceLd(locale);

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

      <DeviceHero
        image="/images/categories/mikrofona_remonts.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h2 id="intro-h2" className={s.h1}>
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

      <section className={s.section} aria-labelledby="faq-h2">
        <div className={s.container}>
          <Faq
            id="faq"
            title={strings.faqTitle}
            groups={[{ label: strings.faqGroupLabel, items: FAQ_ITEMS }]}
            headingLevel={2}
            variant="accordion"
            locale={locale}
          />
        </div>
      </section>

      <section id="pieteikties" className={s.section} aria-label="Pieteikties remontam">
        <div className={s.container}>
          <ConvertBand locale={locale} />
        </div>
      </section>
    </>
  );
}
import Script from 'next/script';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

import devices from '@/data/devices';

import s from '@styles/Catalog.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
  buildFaqLdFromPairs,
} from '@/lib/seo/jsonldHelpers';

import { db } from '@/lib/firebaseAdmin';

const FAQ_ITEMS = [
  {
    q: 'Cik ilgi ilgst uzlādes ligzdas maiņa?',
    a: 'Parasti 60–120 minūtes atkarībā no modeļa un noslodzes. Dažos gadījumos pietiek ar tīrīšanu, kas ir ātrāka.',
  },
  {
    q: 'Kā zināt, vai vajag maiņu vai pietiks ar tīrīšanu?',
    a: 'Bezmaksas diagnostikas laikā pārbaudām pieslēgumu, kontaktus un uzlādes ķēdi. Bieži lienos savācās putekļi vai oksidācija — ja pietiek ar tīrīšanu, par maiņu nemaksāsiet.',
  },
  {
    q: 'Vai mani dati paliks neskarti?',
    a: 'Jā — uzlādes ligzdas maiņa neskars datus. Drošībai iesakām izveidot dublējumu pirms remonta.',
  },
  {
    q: 'Ko darīt, ja telefons nelādējas arī pēc ligzdas nomaiņas?',
    a: 'Diagnostikas laikā pārbaudām arī bateriju, uzlādes portu, kabeļus un barošanas ķēdi uz plates. Ja problēma ir citur, informēsim par risinājumu un izmaksām.',
  },
  {
    q: 'Vai ir garantija?',
    a: 'Jā — 90 dienas gan detaļai, gan veiktajam darbam.',
  },
];

function getRoutePath(locale = 'lv') {
  return locale === 'ru'
    ? '/ru/remont-iphone/zamena-razema-zaryadki'
    : '/iphone-remonts/uzlades-ligzdas-maina';
}

function getHubPath(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone' : '/iphone-remonts';
}

function getAllModelsHref(locale = 'lv') {
  return locale === 'ru' ? '/ru/remont-iphone#iphone-modeli' : '/iphone-remonts#iphone-modeli';
}

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'Замена разъёма зарядки iPhone в Риге',
      heroBodyHtml:
        '<p><strong>iPhone не заряжается, нужно шевелить кабель или разъём болтается?</strong> Выполняем быструю и безопасную <strong>замену разъёма зарядки в Риге</strong>, а при необходимости — профессиональную чистку и устранение окисления. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',
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
      faqGroupLabel: 'Зарядка',
      breadcrumbServiceName: 'Замена разъёма зарядки',
      serviceName: 'Замена разъёма зарядки iPhone в Риге',
      serviceType: 'Замена разъёма зарядки iPhone',
      serviceDescription:
        'Замена разъёма зарядки iPhone в Риге: бесплатная диагностика, гарантия 90 дней, решаем проблемы “не заряжается”, окисление и нестабильный контакт кабеля.',
    };
  }

  return {
    heroAlt: 'iPhone uzlādes ligzdas maiņa Rīgā',
    heroBodyHtml:
      '<p><strong>iPhone nelādējas, jākustina vads vai ports ir vaļīgs?</strong> Veicam ātru un drošu <strong>uzlādes ligzdas maiņu Rīgā</strong>, nepieciešamības gadījumā — profesionālu tīrīšanu un oksidācijas novēršanu. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
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
    faqGroupLabel: 'Uzlāde',
    breadcrumbServiceName: 'Uzlādes ligzdas maiņa',
    serviceName: 'iPhone uzlādes ligzdas maiņa Rīgā',
    serviceType: 'iPhone uzlādes ligzdas maiņa',
    serviceDescription:
      'iPhone uzlādes ligzdas maiņa Rīgā: bezmaksas diagnostika, 90 dienu garantija, risinām nelādējas/oksidācijas/problēmas ar kabeli. Bieži tajā pašā dienā.',
  };
}

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

export default async function IphoneChargePortServicePage({ locale = 'lv', searchParams }) {
  const selectedModel = searchParams?.model ? String(searchParams.model) : null;
  const pricing = await buildPricingForChargePort();

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
        image="/images/categories/uzlades_ligzda_remonts.webp"
        alt={strings.heroAlt}
        focal="right"
        className="service"
        bodyHtml={strings.heroBodyHtml}
      />

      <section id="parskats" className={s.section} aria-labelledby="intro-h2">
        <div className={s.container}>
          <h1 id="intro-h2" className={s.h1}>
            {strings.introTitle}
          </h1>

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
import Script from 'next/script';
import Link from 'next/link';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Locations from '@sections/locations/Locations';
import Faq from '@sections/faq/Faq';
import {
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import { db } from '@/lib/firebaseAdmin';
import { abs, buildBreadcrumbsLd } from '@/lib/seo/jsonldHelpers';
import {
  localizedCategoryPath,
  localizedHomePath,
  localizedInfoPath,
  localizedServicePath,
} from '@/lib/routes/localizedPath';

import s from './ContactsPage.module.scss';

function getPageStrings(locale = 'lv') {
  const pagePath = localizedInfoPath('kontakti', locale);

  if (locale === 'ru') {
    return {
      pagePath,
      homeCrumb: 'Главная',
      pageCrumb: 'Контакты',

      headerTitle: 'Контакты',
      headerLead:
        'Свяжитесь с iLab или посетите один из наших сервисных центров в Риге - T/C Domina Shopping или T/C Spice Life. Поможем с диагностикой, ремонтом и заменой деталей для телефонов, компьютеров и Dyson.',

      contactTitle: 'Как связаться с iLab',
      contactIntro:
        'iLab - сервисный центр в Риге с двумя удобными локациями - T/C Domina Shopping и T/C Spice Life. Google Maps и Waze покажут маршрут к нам.',
      contactNote: 'Работаем без выходных.',

      servicesIntro:
        'С iLab можно связаться по вопросам диагностики устройства, стоимости ремонта, наличия деталей или записи в выбранный филиал.',

      popularServicesPrefix: 'Чаще всего мы помогаем с',
      popularWorksPrefix: 'Популярные работы -',
      and: 'и',

      serviceArea:
        'Обслуживаем клиентов из всей Риги - Тейка, Пурвциемс, центр, Пардаугава, Югла, Иманта, Золитуде, Марупе и другие районы.',

      deliveryArea:
        'Также принимаем устройства из других городов Латвии с возможностью доставки через курьера.',

      benefitsTitle: 'Почему выбирают iLab?',
      benefits: [
        {
          title: '2 сервисных центра в Риге',
          text:
            'Domina Shopping и Spice Life - можно выбрать филиал, который удобнее по расположению.',
        },
        {
          title: 'Быстрая диагностика',
          text:
            'По частым неисправностям можем быстро сориентировать по срокам, цене и наличию деталей.',
        },
        {
          title: 'Цена до начала ремонта',
          text:
            'Перед выполнением работ уточняем стоимость и согласовываем её с клиентом.',
        },
        {
          title: '90 дней гарантии',
          text:
            'Предоставляем гарантию на выполненные работы и использованные детали.',
        },
        {
          title: 'Удобная связь',
          text:
            'Можно позвонить, написать в WhatsApp или сразу открыть маршрут в Google Maps и Waze.',
        },
      ],

      factsTitle: 'Коротко об iLab',
      facts: {
        brand: 'Бренд',
        city: 'Город',
        locations: 'Филиалы',
        languages: 'Языки общения',
        warranty: 'Гарантия',
        legal: 'Юридическая информация',
        registration: 'Рег. №',
        vat: 'PVN / VAT №',
        legalAddress: 'Юридический адрес',
      },

      factsValues: {
        brand: 'iLab',
        city: 'Рига, Латвия',
        locations: 'T/C Domina Shopping и T/C Spice Life',
        languages: 'латышский, русский, английский',
        warranty: 'до 90 дней на выполненные работы и использованные детали',
      },

      links: {
        iphone: 'ремонтом iPhone',
        phones: 'ремонтом телефонов',
        tablets: 'ремонтом планшетов',
        computers: 'ремонтом компьютеров',
        dyson: 'ремонтом Dyson',
        screen: 'замена экрана',
        battery: 'замена батареи',
        charging: 'ремонт разъёма зарядки',
      },

      faqTitleFallback: 'Частые вопросы о связи и филиалах',
    };
  }

  return {
    pagePath,
    homeCrumb: 'Sākums',
    pageCrumb: 'Kontakti',

    headerTitle: 'Kontakti',
    headerLead:
      'Sazinies ar iLab vai apmeklē kādu no mūsu servisa centriem Rīgā - T/C Domina Shopping vai T/C Spice Life. Palīdzēsim ar telefonu, datoru un Dyson ierīču diagnostiku, remontu un detaļu maiņu.',

    contactTitle: 'Kā sazināties ar iLab',
    contactIntro:
      'iLab ir servisa centrs Rīgā ar divām ērtām lokācijām - T/C Domina Shopping un T/C Spice Life. Google Maps un Waze parādīs maršrutu pie mums.',
    contactNote: 'Strādājam bez brīvdienām.',

    servicesIntro:
      'Sazinies ar iLab par Tev aktuālo - diagnostiku, remonta cenu, detaļu pieejamību vai pierakstu izvēlētajā filiālē.',

    popularServicesPrefix: 'Visbiežāk palīdzam ar',
    popularWorksPrefix: 'Populārākie darbi ir',
    and: 'un',

    serviceArea:
      'Apkalpojam klientus no visas Rīgas - Teikas, Purvciema, centra, Pārdaugavas, Juglas, Imantas, Zolitūdes, Mārupes un citiem rajoniem.',

    deliveryArea:
      'Pieņemam ierīces arī no citām Latvijas pilsētām ar iespēju nosūtīt tās ar kurjera starpniecību.',

    benefitsTitle: 'Kāpēc izvēlēties iLab?',
    benefits: [
      {
        title: '2 servisa centri Rīgā',
        text:
          'Domina Shopping un Spice Life - vari izvēlēties sev ērtāko filiāli pēc atrašanās vietas.',
      },
      {
        title: 'Ātra diagnostika',
        text:
          'Par biežākajiem bojājumiem varam ātri precizēt termiņu, cenu un detaļu pieejamību.',
      },
      {
        title: 'Cena pirms remonta',
        text:
          'Pirms darba uzsākšanas precizējam izmaksas un saskaņojam tās ar klientu.',
      },
      {
        title: '90 dienu garantija',
        text:
          'Nodrošinām garantiju veiktajiem darbiem un izmantotajām detaļām.',
      },
      {
        title: 'Ērta saziņa',
        text:
          'Vari piezvanīt, uzrakstīt WhatsApp vai uzreiz atvērt maršrutu Google Maps vai Waze.',
      },
    ],

    factsTitle: 'Īsumā par iLab',
    facts: {
      brand: 'Zīmols',
      city: 'Pilsēta',
      locations: 'Filiāles',
      languages: 'Saziņas valodas',
      warranty: 'Garantija',
      legal: 'Juridiskā informācija',
      registration: 'Reģ. Nr.',
      vat: 'PVN / VAT Nr.',
      legalAddress: 'Juridiskā adrese',
    },

    factsValues: {
      brand: 'iLab',
      city: 'Rīga',
      locations: 'T/C Domina Shopping un T/C Spice Life',
      languages: 'latviešu, krievu, angļu',
      warranty: 'līdz 90 dienām veiktajiem darbiem un uzstādītajām detaļām',
    },

    links: {
      iphone: 'iPhone remontu',
      phones: 'telefonu remontu',
      tablets: 'planšetdatoru remontu',
      computers: 'datoru remontu',
      dyson: 'Dyson remontu',
      screen: 'ekrāna maiņa',
      battery: 'baterijas maiņa',
      charging: 'uzlādes ligzdas remonts',
    },

    faqTitleFallback: 'Biežāk uzdotie jautājumi par saziņu un filiālēm',
  };
}

function sortFaqItems(items = []) {
  return [...items].sort((a, b) => {
    const ao = typeof a?.order === 'number' ? a.order : 9999;
    const bo = typeof b?.order === 'number' ? b.order : 9999;

    if (ao !== bo) return ao - bo;

    return String(a?.q || '').localeCompare(String(b?.q || ''));
  });
}

function normalizeFaqItems(items = []) {
  return sortFaqItems(
    items
      .filter((item) => {
        if (!item) return false;
        if (item.isHidden === true) return false;

        const q = String(item.q || '').trim();
        const answer = String(item.aHtml || item.a || '').trim();

        return q && answer;
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
}

async function getContactFaq(locale = 'lv') {
  const docId = `contact_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) return null;

  const data = snap.data() || {};

  if (data.isPublished === false) return null;

  const items = normalizeFaqItems(Array.isArray(data.items) ? data.items : []);

  if (!items.length) return null;

  return {
    id: docId,
    title: String(data.title || '').trim(),
    items,
  };
}

function buildContactPageLd(strings, locale = 'lv') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${abs(strings.pagePath)}#contact-page`,
    url: abs(strings.pagePath),
    name: strings.pageCrumb,
    description: strings.headerLead,
    inLanguage: locale,
    isPartOf: {
      '@id': `${abs('/')}#website`,
    },
    about: {
      '@id': `${abs('/')}#organization`,
    },
  };
}

function getLegalFacts(company = {}, strings) {
  const legalName =
    company.legalName ||
    company.legalEntity ||
    company.companyName ||
    '';

  const registrationNumber =
    company.registrationNumber ||
    company.regNumber ||
    company.regNr ||
    '';

  const vatNumber =
    company.vatNumber ||
    company.vat ||
    company.pvn ||
    '';

  const legalAddress =
    company.legalAddress ||
    company.registeredAddress ||
    '';

  return [
    legalName
      ? {
          label: strings.facts.legal,
          value: legalName,
        }
      : null,
    registrationNumber
      ? {
          label: strings.facts.registration,
          value: registrationNumber,
        }
      : null,
    vatNumber
      ? {
          label: strings.facts.vat,
          value: vatNumber,
        }
      : null,
    legalAddress
      ? {
          label: strings.facts.legalAddress,
          value: legalAddress,
        }
      : null,
  ].filter(Boolean);
}

function getBusinessFacts(siteSettings = {}, strings) {
  const company = siteSettings?.company || {};
  const legalFacts = getLegalFacts(company, strings);

  return [
    {
      label: strings.facts.brand,
      value: company.name || strings.factsValues.brand,
    },
    {
      label: strings.facts.city,
      value: strings.factsValues.city,
    },
    {
      label: strings.facts.locations,
      value: strings.factsValues.locations,
    },
    {
      label: strings.facts.languages,
      value: strings.factsValues.languages,
    },
    {
      label: strings.facts.warranty,
      value: company.warranty || strings.factsValues.warranty,
    },
    ...legalFacts,
  ].filter((item) => item.value);
}

function InternalServiceLinks({ locale, strings }) {
  return (
    <div className={s.copyStack}>
      <p className={s.paragraph}>
        {strings.servicesIntro}
      </p>

      <p className={s.paragraph}>
        {strings.popularServicesPrefix}{' '}
        <Link href={localizedCategoryPath('iphone-remonts', locale)}>
          {strings.links.iphone}
        </Link>
        ,{' '}
        <Link href={localizedCategoryPath('telefonu-remonts', locale)}>
          {strings.links.phones}
        </Link>
        ,{' '}
        <Link href={localizedCategoryPath('plansetdatoru-remonts', locale)}>
          {strings.links.tablets}
        </Link>
        ,{' '}
        <Link href={localizedCategoryPath('datoru-remonts', locale)}>
          {strings.links.computers}
        </Link>
        {' '}
        {strings.and}{' '}
        <Link href={localizedCategoryPath('dyson-remonts', locale)}>
          {strings.links.dyson}
        </Link>
        . {strings.popularWorksPrefix}{' '}
        <Link
          href={localizedServicePath(
            'iphone-remonts',
            'ekrana-maina',
            locale
          )}
        >
          {strings.links.screen}
        </Link>
        ,{' '}
        <Link
          href={localizedServicePath(
            'iphone-remonts',
            'baterijas-maina',
            locale
          )}
        >
          {strings.links.battery}
        </Link>
        {' '}
        {strings.and}{' '}
        <Link
          href={localizedServicePath(
            'iphone-remonts',
            'uzlades-ligzdas-maina',
            locale
          )}
        >
          {strings.links.charging}
        </Link>
        .
      </p>

      <p className={s.paragraph}>
        {strings.serviceArea}
      </p>

      {strings.deliveryArea ? (
        <p className={s.paragraph}>
          {strings.deliveryArea}
        </p>
      ) : null}
    </div>
  );
}

function BusinessFacts({ facts }) {
  if (!facts.length) return null;

  return (
    <dl className={s.factsGrid}>
      {facts.map((fact) => (
        <div key={fact.label} className={s.factCard}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Benefits({ strings }) {
  return (
    <section className={s.section} aria-labelledby="contacts-benefits-h2">
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <p className={s.eyebrow}>iLab</p>

          <h2 id="contacts-benefits-h2" className={s.h2}>
            {strings.benefitsTitle}
          </h2>
        </div>

        <div className={s.benefitsGrid}>
          {strings.benefits.map((item) => (
            <article key={item.title} className={s.benefitCard}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ContactsPage({
  locale = 'lv',
  siteSettings,
}) {
  const strings = getPageStrings(locale);
  const contactFaq = await getContactFaq(locale);
  const businessFacts = getBusinessFacts(siteSettings, strings);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(localizedHomePath(locale)) },
    { name: strings.pageCrumb, url: abs(strings.pagePath) },
  ]);

  const contactPageLd = buildContactPageLd(strings, locale);
  const faqLd = contactFaq ? toFaqLd(contactFaq.items) : null;

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: localizedHomePath(locale),
    },
    {
      label: strings.pageCrumb,
      href: strings.pagePath,
    },
  ];

  return (
    <>
      <Script
        id={`contacts-breadcrumbs-jsonld-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id={`contacts-page-jsonld-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(contactPageLd)}
      </Script>

      {faqLd ? (
        <Script
          id={`contacts-faq-jsonld-${locale}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqLd)}
        </Script>
      ) : null}

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <section
        id="locations"
        className={s.locationsSection}
        aria-label={strings.pageCrumb}
      >
        <Locations
          locale={locale}
          locations={siteSettings?.locations || []}
          pinPositions={siteSettings?.pinPositions || {}}
        />
      </section>

      <section className={s.section} aria-labelledby="contacts-info-h2">
        <div className={s.container}>
          <div className={s.infoLayout}>
            <div className={s.infoMain}>
              <p className={s.eyebrow}>Kontakti</p>

              <h2 id="contacts-info-h2" className={s.h2}>
                {strings.contactTitle}
              </h2>

              <div className={s.leadBlock}>
                <p className={s.lead}>
                  {strings.contactIntro}
                </p>

                {strings.contactNote ? (
                  <p className={s.contactNote}>
                    {strings.contactNote}
                  </p>
                ) : null}
              </div>

              <InternalServiceLinks locale={locale} strings={strings} />
            </div>

            <aside className={s.factsPanel} aria-labelledby="contacts-facts-h3">
              <h3 id="contacts-facts-h3">
                {strings.factsTitle}
              </h3>

              <BusinessFacts facts={businessFacts} />
            </aside>
          </div>
        </div>
      </section>

      <Benefits strings={strings} />

      {contactFaq ? (
        <section className={s.section} aria-labelledby="contacts-faq-h2">
          <div className={s.container}>
            <Faq
              id="contacts-faq"
              title={contactFaq.title || strings.faqTitleFallback}
              items={toFaqRenderItems(contactFaq.items)}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
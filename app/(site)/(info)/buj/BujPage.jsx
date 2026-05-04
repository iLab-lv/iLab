import Script from 'next/script';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';
import {
  normalizeText,
  toFaqLd,
  toFaqRenderItems,
} from '@sections/faq/faq.helpers';

import { db } from '@/lib/firebaseAdmin';
import { abs, buildBreadcrumbsLd } from '@/lib/seo/jsonldHelpers';

import s from '@styles/Catalog.module.scss';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      pagePath: '/ru/faq',
      homeCrumb: 'Главная',
      pageCrumb: 'Часто задаваемые вопросы',
      headerTitle: 'Часто задаваемые вопросы',
      headerLead:
        'Собрали ответы на самые частые вопросы о ремонте телефонов, iPhone, планшетов, компьютеров и Dyson: диагностика, сроки, гарантия, стоимость и популярные виды ремонта.',
      allQuestionsTitle: 'Все вопросы по категориям',
      fallbackGroupTitle: 'Другие вопросы',
      basicTitle: 'Общие вопросы',
      groupTitles: {
        'telefonu-remonts': 'Ремонт телефонов',
        'iphone-remonts': 'Ремонт iPhone',
        'plansetdatoru-remonts': 'Ремонт планшетов',
        'datoru-remonts': 'Ремонт компьютеров',
        'dyson-remonts': 'Ремонт Dyson',
        'baterijas-maina': 'Замена батареи',
        'ekrana-maina': 'Замена экрана',
        'uzlades-ligzdas-maina': 'Ремонт разъёма зарядки',
        'kameras-remonts': 'Ремонт камеры',
        'skalruni-mikrofona-remonts': 'Ремонт динамика и микрофона',
        'udens-bojajumu-remonts': 'Ремонт после попадания влаги',
      },
    };
  }

  return {
    pagePath: '/duk',
    homeCrumb: 'Sākums',
    pageCrumb: 'Biežāk uzdotie jautājumi',
    headerTitle: 'Biežāk uzdotie jautājumi',
    headerLead:
      'Apkopojām atbildes uz biežākajiem jautājumiem par telefonu, iPhone, planšetdatoru, datoru un Dyson remontu - diagnostiku, termiņiem, garantiju, cenām un populārākajiem remonta darbiem.',
    allQuestionsTitle: 'Visi jautājumi pa kategorijām',
    fallbackGroupTitle: 'Citi jautājumi',
    basicTitle: 'Vispārīgi jautājumi',
    groupTitles: {
      'telefonu-remonts': 'Telefonu remonts',
      'iphone-remonts': 'iPhone remonts',
      'plansetdatoru-remonts': 'Planšetdatoru remonts',
      'datoru-remonts': 'Datoru remonts',
      'dyson-remonts': 'Dyson remonts',
      'baterijas-maina': 'Baterijas maiņa',
      'ekrana-maina': 'Ekrāna maiņa',
      'uzlades-ligzdas-maina': 'Uzlādes ligzdas maiņa',
      'kameras-remonts': 'Kameras remonts',
      'skalruni-mikrofona-remonts': 'Skaļruņu un mikrofona remonts',
      'udens-bojajumu-remonts': 'Ūdens bojājumu remonts',
    },
  };
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

function parseFaqGroupDocId(docId = '', locale = 'lv') {
  const strings = getPageStrings(locale);
  const suffix = `_${locale}`;
  const cleanId = String(docId || '').trim();

  if (!cleanId.endsWith(suffix)) {
    return {
      key: cleanId,
      title: strings.fallbackGroupTitle,
      type: 'unknown',
      order: 999,
    };
  }

  const base = cleanId.slice(0, -suffix.length);

  if (base === 'basic') {
    return {
      key: base,
      title: strings.basicTitle,
      type: 'basic',
      order: 0,
    };
  }

  if (base.startsWith('category_')) {
    const categoryKey = base.slice('category_'.length);

    return {
      key: base,
      title: strings.groupTitles[categoryKey] || categoryKey,
      type: 'category',
      order: 100,
    };
  }

  if (base.startsWith('service_')) {
    const serviceKey = base.slice('service_'.length);

    return {
      key: base,
      title: strings.groupTitles[serviceKey] || serviceKey,
      type: 'service',
      order: 200,
    };
  }

  return {
    key: base,
    title: strings.groupTitles[base] || base,
    type: 'other',
    order: 300,
  };
}

async function getFaqSections(locale = 'lv') {
  const suffix = `_${locale}`;
  const snap = await db.collection('faqGroups').get();

  const sections = snap.docs
    .map((doc) => {
      const id = doc.id;
      if (!id.endsWith(suffix)) return null;

      const data = doc.data() || {};
      const parsed = parseFaqGroupDocId(id, locale);
      const rawItems = Array.isArray(data.items) ? data.items : [];

      const items = sortFaqItems(
        rawItems
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

      if (!items.length) return null;

      return {
        id,
        key: parsed.key,
        title: parsed.title,
        type: parsed.type,
        order: parsed.order,
        items,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });

  return sections;
}

export default async function DukPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const sections = await getFaqSections(locale);

  const mergedItems = dedupeFaqItems(
    sections.flatMap((section) => section.items || [])
  );

  const faqLd = toFaqLd(mergedItems);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: strings.homeCrumb, url: abs(locale === 'ru' ? '/ru' : '/') },
    { name: strings.pageCrumb, url: abs(strings.pagePath) },
  ]);

  const headerCrumbs = [
    {
      label: strings.homeCrumb,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.pageCrumb,
      href: strings.pagePath,
    },
  ];

  return (
    <>
      <Script
        id="duk-breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <Script
        id="duk-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <section className={s.section} aria-labelledby="duk-faq-groups-h2">
        <div className={s.container}>
          <h2 id="duk-faq-groups-h2" className={s.h2}>
            {strings.allQuestionsTitle}
          </h2>

          {sections.map((section, index) => (
            <div
              key={`duk-faq-group-${index}-${section.id}`}
              className={index > 0 ? s.stackLg : ''}
            >
              <Faq
                id={`duk-faq-group-${index + 1}`}
                title={section.title}
                items={toFaqRenderItems(section.items)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}
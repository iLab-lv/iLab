import HomePage from './HomePage';

import JsonLd from '@components/seo/JsonLd';

import { getReviewsSummary } from '@/lib/reviews/getReviewsSummary';
import { getSiteSettings } from '@/lib/siteSettings';
import { db } from '@/lib/firebaseAdmin';

import { buildSeoMetadata } from '@/lib/seo/buildSeoMetadata';

import {
  absoluteUrl,
  buildBreadcrumbsLd,
  buildFaqLd,
  buildJsonLdGraph,
  buildWebPageLd,
} from '@/lib/seo/jsonld';

import { toFaqRenderItems } from '@sections/faq/faq.helpers';

const locale = 'lv';

const title = 'Telefonu un datoru serviss Rīgā | iLab';

const description =
  'Telefonu, planšetdatoru un datoru remonts Rīgā. Remonts tajā pašā dienā, 90 dienu garantija un divas filiāles: Domina Shopping un Spice Life.';

const lvPath = '/';
const ruPath = '/ru';

const breadcrumbId = `${absoluteUrl(lvPath)}#breadcrumb`;
const faqId = `${absoluteUrl(lvPath)}#faq`;

export const metadata = buildSeoMetadata({
  locale,
  title,
  description,
  lvPath,
  ruPath,
  image: '/images/og/home.webp',
  imageAlt: 'iLab telefonu un datoru serviss Rīgā',
});

function getHomeStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      faqTitle: 'Часто задаваемые вопросы',
    };
  }

  return {
    faqTitle: 'Biežāk uzdotie jautājumi',
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

async function getBasicFaq(locale = 'lv') {
  const docId = `basic_${locale}`;
  const snap = await db.collection('faqGroups').doc(docId).get();

  if (!snap.exists) {
    return {
      title: getHomeStrings(locale).faqTitle,
      items: [],
    };
  }

  const data = snap.data() || {};
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

  return {
    title:
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : getHomeStrings(locale).faqTitle,
    items,
  };
}

export default async function Page() {
  const [reviewsSummary, siteSettings, basicFaq] = await Promise.all([
    getReviewsSummary(),
    getSiteSettings(),
    getBasicFaq(locale),
  ]);

  const faqRenderItems = toFaqRenderItems(basicFaq.items);

  const faqLd = buildFaqLd(basicFaq.items, {
    id: faqId,
  });

  const jsonLd = buildJsonLdGraph([
    buildWebPageLd({
      path: lvPath,
      name: title,
      description,
      locale,
      breadcrumbId,
      primaryEntityId: faqLd ? faqId : undefined,
    }),

    buildBreadcrumbsLd(
      [{ name: 'Sākums', url: lvPath }],
      { id: breadcrumbId }
    ),

    faqLd,
  ]);

  return (
    <>
      <JsonLd id="home-jsonld" data={jsonLd} />

      <HomePage
        locale={locale}
        reviewsSummary={reviewsSummary}
        siteSettings={siteSettings}
        faqTitle={basicFaq.title}
        faqItems={faqRenderItems}
      />
    </>
  );
}
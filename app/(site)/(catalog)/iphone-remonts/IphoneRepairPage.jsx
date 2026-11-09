import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import CatalogHero from '@/_components/sections/catalog-hub/CatalogHero';
import DeviceGrid from '@/_components/sections/device-grid/DeviceGrid';
import Reviews from '@/_components/sections/catalog-hub/HubReviews';
import PopularServices from '@/_components/sections/catalog-hub/HubPopularServices';
import RepairProcess from '@/_components/sections/catalog-hub/HubRepairProcess';
import Guide from '@/_components/sections/guide/Guide';
import FinalCta from '@/_components/sections/catalog-hub/HubFinalCta';
import IphoneExpertNotes from '@/_components/page-sections/iphone-remonts/expert-notes/IphoneExpertNotes';
import IphoneLocationsSection from '@/_components/sections/catalog-hub/HubLocations';
import IphoneProblemAnswers from '@/_components/page-sections/iphone-remonts/problem-answers/IphoneProblemAnswers';
import IphoneQualitySection from '@/_components/page-sections/iphone-remonts/quality/IphoneQualitySection';
import IphoneRepairDecisionSection from '@/_components/page-sections/iphone-remonts/repair-decision/IphoneRepairDecisionSection';
import EditorialWhy from '@/_components/sections/why/EditorialWhy';
import { getEditorialWhyContent } from '@/_components/sections/why/editorialWhy.content';

import Faq from '@/_components/sections/faq/ServiceFaq';
import s from '@/_components/sections/catalog-hub/CatalogHub.module.scss';
import skin from '@/_components/sections/catalog-hub/CatalogHubSkin.module.scss';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Ремонт iPhone в Риге</strong> в сервисе iLab - замена экрана, аккумулятора, камеры и ремонт разъёма зарядки с быстрой диагностикой и <strong>гарантией до 1 года</strong>. Самые частые ремонты iPhone выполняем в тот же день.</p>',
      introTitle: 'Ремонт iPhone в Риге - что мы делаем',
      introBody:
        'Выполняем полный спектр <strong>ремонта iPhone в Риге</strong> - от <strong>замены экрана</strong>, <strong>аккумулятора</strong>, <strong>ремонта камеры</strong> и <strong>разъёма зарядки</strong> до замены <strong>динамика</strong>, <strong>микрофона</strong> и других компонентов. Перед ремонтом проводим <strong>бесплатную диагностику</strong>, согласовываем стоимость и срок выполнения, а после завершения работ выдаём <strong>гарантию до 1 года</strong> на детали и работу. Используем качественные оригинальные или OEM запчасти, чтобы iPhone после ремонта работал стабильно и надёжно каждый день.',
      scrollCta: { label: 'Смотреть модели', targetId: 'iphone-modeli' },
    };
  }

  return {
    heroAlt: 'iPhone remonts Rīgā',
    heroBodyHtml:
      '<p><strong>iPhone remonts Rīgā</strong> iLab servisā - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>garantiju līdz 1 gadam</strong>. Biežākos iPhone remontdarbus paveicam tajā pašā dienā.</p>',
    introTitle: 'iPhone remonts Rīgā - ko mēs darām',
    introBody:
      'Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> - sākot ar <strong>ekrāna maiņu</strong>, <strong>baterijas nomaiņu</strong>, <strong>kameras remontu</strong> un <strong>uzlādes ligzdas remontu</strong>, līdz <strong>skaļruņa</strong>, <strong>mikrofona</strong> un citu detaļu nomaiņai. Pirms remonta veicam <strong>bezmaksas diagnostiku</strong>, saskaņojam izmaksas un izpildes termiņu, bet pēc darba pabeigšanas sniedzam <strong>garantiju līdz 1 gadam</strong> detaļām un darbam. Izmantojam kvalitatīvas oriģinālās vai OEM detaļas, lai iPhone pēc remonta darbotos stabili un droši ikdienā.',
    scrollCta: { label: 'Skatīt modeļus', targetId: 'iphone-modeli' },
  };
}

export default function IphoneRepairPage({
  locale = 'lv',
  page,
  devicesAll = [],
  seriesMeta,
  baseHref,
  headerTitle,
  headerLead,
  breadcrumbs = [],
  faqTitle,
  faqItems = [],
  reviewsSummary = null,
}) {
  if (!page) {
    return null;
  }

  const strings = getPageStrings(locale);

  const heroImage = page.hero?.image || '/images/categories/iphone_remonts.webp';

  return (
    <>
      <CatalogHero
        variant="hub"
        locale={locale}
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        image={heroImage}
        imageWidth={1800}
        imageHeight={2000}
        imageAlt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
        targetId={strings.scrollCta.targetId}
        targetLabel={strings.scrollCta.label}
      >
        <QuickTrustFacts {...getQuickTrustFacts("iphone", locale)} />
      </CatalogHero>

      <div className={s.hub}>
      <section className={`${s.section} ${s.introSection}`}>
        <div className={s.container}>
          <h2 className={s.h2}>{strings.introTitle}</h2>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introBody }}
          />
        </div>
      </section>

      <PopularServices locale={locale} />

      <div className={`${skin.block} ${skin.problems}`}><IphoneProblemAnswers locale={locale} /></div>

      <div className={`${skin.block} ${skin.expert}`}><IphoneExpertNotes locale={locale} /></div>

      <DeviceGrid
        id="iphone-modeli"
        locale={locale}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={BRAND_KEY}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
      />

      {page.sections?.hasWhy && <div className={skin.block} data-service-section="why"><EditorialWhy {...getEditorialWhyContent(locale)} /></div>}

      {page.sections?.hasReviews && (
        <Reviews locale={locale} reviewsSummary={reviewsSummary} />
      )}

      <div className={`${skin.block} ${skin.quality}`}><IphoneQualitySection locale={locale} /></div>

      <IphoneLocationsSection locale={locale} />

      <div className={`${skin.block} ${skin.decision}`}><IphoneRepairDecisionSection locale={locale} /></div>

      {page.sections?.hasProcess && <RepairProcess locale={locale} />}

      {page.sections?.hasGuide && (
        <div className={`${skin.block} ${skin.guide}`}><Guide
          id="guide"
          locale={locale}
          variant="iphone"
          headingLevel={2}
        /></div>
      )}

      {page.sections?.hasFaq && faqItems.length > 0 && (
        <div data-service-section="faq" className={skin.block}>
            <Faq id="iphone-faq" title={faqTitle} items={faqItems} />
        </div>
      )}

      {page.sections?.hasConvertBand && (
        <FinalCta locale={locale} />
      )}
      </div>
    </>
  );
}

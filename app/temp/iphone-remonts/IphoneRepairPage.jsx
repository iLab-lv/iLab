import categoryContent from '@/data/categoryContent';

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import IphoneQuickFacts from './IphoneQuickFacts';
import IphoneQualitySection from './IphoneQualitySection';
import IphoneLocationsSection from './IphoneLocationsSection';
import IphoneClientChoiceSection from './IphoneClientChoiceSection';
import IphoneLandingReviewsSection from './IphoneLandingReviewsSection';
import IphoneProblemAnswers from './IphoneProblemAnswers';
import IphoneRepairDecisionSection from './IphoneRepairDecisionSection';
import IphoneRepairStepsSection from './IphoneRepairStepsSection';
import IphoneSeoGuide from './IphoneSeoGuide';
import IphoneLandingFinalCta from './IphoneLandingFinalCta';
import PopularServices from './PopularServices';

import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Faq from '@sections/faq/Faq';
import DeviceHero from '@sections/device-hero/DeviceHero';

import s from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';
const HUB_KEY = 'iphone-remonts';

const cat = categoryContent[HUB_KEY];

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт iPhone в Риге',
      heroBodyHtml:
        '<p><strong>Ремонт iPhone в Риге</strong> в сервисе iLab - замена экрана, аккумулятора, камеры и ремонт разъёма зарядки с быстрой диагностикой и <strong>гарантией 90 дней</strong>. Самые частые ремонты iPhone выполняем в тот же день.</p>',
      introTitle: 'Ремонт iPhone в Риге - что мы делаем',
      introBody:
        'Выполняем полный спектр <strong>ремонта iPhone в Риге</strong> - от <strong>замены экрана</strong>, <strong>аккумулятора</strong>, <strong>ремонта камеры</strong> и <strong>разъёма зарядки</strong> до замены <strong>динамика</strong>, <strong>микрофона</strong> и других компонентов. Перед ремонтом проводим <strong>бесплатную диагностику</strong>, согласовываем стоимость и срок выполнения, а после завершения работ выдаём <strong>гарантию 90 дней</strong> на детали и работу. Используем качественные оригинальные или OEM запчасти, чтобы iPhone после ремонта работал стабильно и надёжно каждый день.',
      modelGridHeading: 'Выберите модель iPhone',
      modelGridIntro:
        'Найдите нужный iPhone по названию или выберите серию.',
      scrollCta: { label: 'Смотреть модели', targetId: 'iphone-modeli' },
    };
  }

  return {
    heroAlt: 'iPhone remonts Rīgā',
    heroBodyHtml:
      '<p><strong>iPhone remonts Rīgā</strong> iLab servisā - ekrāna, baterijas, kameras un uzlādes ligzdas remonts ar ātru diagnostiku un <strong>90 dienu garantiju</strong>. Biežākos iPhone remontdarbus paveicam tajā pašā dienā.</p>',
    introTitle: 'iPhone remonts Rīgā - ko mēs darām',
    introBody:
      'Veicam pilna spektra <strong>iPhone remontu Rīgā</strong> - sākot ar <strong>ekrāna maiņu</strong>, <strong>baterijas nomaiņu</strong>, <strong>kameras remontu</strong> un <strong>uzlādes ligzdas remontu</strong>, līdz <strong>skaļruņa</strong>, <strong>mikrofona</strong> un citu detaļu nomaiņai. Pirms remonta veicam <strong>bezmaksas diagnostiku</strong>, saskaņojam izmaksas un izpildes termiņu, bet pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong> detaļām un darbam. Izmantojam kvalitatīvas oriģinālās vai OEM detaļas, lai iPhone pēc remonta darbotos stabili un droši ikdienā.',
    modelGridHeading:
      cat?.sections?.modelGrid?.heading ?? 'Izvēlies savu iPhone modeli',
    modelGridIntro:
      cat?.sections?.modelGrid?.intro ??
      'Atrodi vajadzīgo iPhone vai izvēlies sēriju.',
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

  const selectorTitle = page.selector?.heading || strings.modelGridHeading;
  const selectorIntro = page.selector?.intro || strings.modelGridIntro;

  const heroImage = page.hero?.image || '/images/categories/iphone_remonts.webp';

  return (
    <>
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={strings.scrollCta}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image={heroImage}
        alt={strings.heroAlt}
        focal="right"
        priority
        bodyHtml={strings.heroBodyHtml}
      />

      <IphoneQuickFacts />

      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.h2}>{strings.introTitle}</h2>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introBody }}
          />
        </div>
      </section>

      <PopularServices />

      <IphoneProblemAnswers />

      <DeviceSelector
        id="iphone-modeli"
        locale={locale}
        title={selectorTitle}
        intro={selectorIntro}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={BRAND_KEY}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      <IphoneQualitySection />

      <IphoneLocationsSection />

      {page.sections?.hasReviews && (
        <IphoneLandingReviewsSection reviewsSummary={reviewsSummary} />
      )}

      <IphoneRepairDecisionSection />

      {page.sections?.hasProcess && <IphoneRepairStepsSection />}

      {page.sections?.hasGuide && <IphoneSeoGuide />}

      {page.sections?.hasWhy && <IphoneClientChoiceSection />}

      {page.sections?.hasFaq && faqItems.length > 0 && (
        <section className={s.section}>
          <div className={s.container}>
            <Faq id="iphone-faq" title={faqTitle} items={faqItems} />
          </div>
        </section>
      )}

      {page.sections?.hasConvertBand && <IphoneLandingFinalCta />}
    </>
  );
}

import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import Faq from '@sections/faq/Faq';
import ServicePricelist from '@sections/service-pricelist/ServicePricelist';
import QuickAnswer from '@/_components/sections/quick-answer/QuickAnswer';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import IphoneScreenSymptoms from '@/_components/page-sections/iphone-screen-repair/symptoms/IphoneScreenSymptoms';
import IphoneScreenDamageGuide from '@/_components/page-sections/iphone-screen-repair/damage-guide/IphoneScreenDamageGuide';
import IphoneScreenPriceFactors from '@/_components/page-sections/iphone-screen-repair/price-factors/IphoneScreenPriceFactors';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import IphoneScreenPostRepairChecks from '@/_components/page-sections/iphone-screen-repair/post-repair-checks/IphoneScreenPostRepairChecks';
import IphoneQualitySection from '@/_components/page-sections/iphone-remonts/quality/IphoneQualitySection';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import IphoneLocationsSection from '@/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection';
import FinalCta from '@/_components/sections/final-cta/FinalCta';
import IphoneBatteryLifecycle from '@/_components/page-sections/iphone-battery-repair/lifecycle/IphoneBatteryLifecycle';
import IphoneBatteryOrCharging from '@/_components/page-sections/iphone-battery-repair/battery-or-charging/IphoneBatteryOrCharging';

import s from '@styles/Catalog.module.scss';

const SERVICE_IDS = ['phone-battery'];
const CATEGORY_KEY = 'telefonu-remonts';
const BRAND_KEY = 'apple';


export default function IphoneBatteryServicePage({
  locale = 'lv',

  strings,

  devices = [],
  pricing = {},
  serviceMeta = {},
  selectedModel,

  allModelsHref,
  breadcrumbs = [],

  faqSections = [],
  hasVisibleFaq = false,
  reviewsSummary = null,
}) {
  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        scrollCta={{ label: strings.headerCtaLabel, targetId: 'brand-list' }}
        crumbs={breadcrumbs}
      />

      <DeviceHero
        image="/images/categories/baterijas_maina.webp"
        alt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
      />

      <QuickAnswer locale={locale} variant="iphone-battery" />

      <QuickFacts variant="iphone-battery" locale={locale} />

      <IphoneScreenSymptoms locale={locale} variant="iphone-battery" />

      <IphoneScreenDamageGuide locale={locale} variant="iphone-battery" />

      <IphoneBatteryLifecycle locale={locale} />

      <IphoneBatteryOrCharging locale={locale} />

      <section id="brand-list" className={s.section}>
        <ServicePricelist
          devices={devices}
          pricing={pricing}
          serviceMeta={serviceMeta}
          brandSlug={BRAND_KEY}
          categorySlug={CATEGORY_KEY}
          serviceIds={SERVICE_IDS}
          title={strings.priceTitle}
          allModelsHref={allModelsHref}
          cta={{ label: strings.ctaLabel, href: '#pieteikties' }}
          selectedModel={selectedModel}
          locale={locale}
          variant="iphone-battery"
        />
      </section>

      <IphoneScreenPriceFactors locale={locale} variant="iphone-battery" />

      <RepairProcess
        id="iphone-battery-replacement-steps"
        locale={locale}
        variant="iphone-battery"
        backgroundImage="/images/hands-closeup.png"
      />

      <IphoneScreenPostRepairChecks locale={locale} variant="iphone-battery" />

      <IphoneQualitySection locale={locale} variant="iphone-battery" />

      <PopularServices locale={locale} variant="other-services" excludeServiceKey="baterijas-maina" />

      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} />

      <IphoneLocationsSection locale={locale} variant="iphone-battery" />

      {hasVisibleFaq && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <h2 id="faq-h2" className={s.h2}>
              {strings.faqTitle}
            </h2>

            {faqSections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title}
                  items={section.items}
                  headingLevel={3}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <FinalCta id="pieteikties" locale={locale} variant="iphone" />
    </>
  );
}

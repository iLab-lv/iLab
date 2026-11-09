import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ServiceHero from '@/_components/sections/service-recovery/ServiceHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';

import Faq from '@/_components/sections/faq/ServiceFaq';
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
    <ServiceRecovery>
      <ServiceHero
        locale={locale}
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
        image="/images/categories/baterijas_maina.webp"
        imageAlt={strings.heroAlt}
        bodyHtml={strings.heroBodyHtml}
        targetId="brand-list"
        targetLabel={strings.headerCtaLabel}
        placeholderLabel={strings.heroAlt}
      ><QuickFacts variant="iphone-battery" locale={locale} /></ServiceHero>

      <ServiceBlock kind="answer"><QuickAnswer locale={locale} variant="iphone-battery" /></ServiceBlock>



      <ServiceBlock kind="symptoms"><IphoneScreenSymptoms locale={locale} variant="iphone-battery" /></ServiceBlock>

      <ServiceBlock kind="rows"><IphoneScreenDamageGuide locale={locale} variant="iphone-battery" /></ServiceBlock>

      <ServiceBlock kind="lifecycle"><IphoneBatteryLifecycle locale={locale} /></ServiceBlock>

      <ServiceBlock kind="decision"><IphoneBatteryOrCharging locale={locale} /></ServiceBlock>

      <ServiceBlock kind="priceBrowser"><section id="brand-list" className={s.section}>
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
      </section></ServiceBlock>

      <ServiceBlock kind="rows"><IphoneScreenPriceFactors locale={locale} variant="iphone-battery" /></ServiceBlock>

      <RepairProcess
        id="iphone-battery-replacement-steps"
        locale={locale}
        variant="iphone-battery"
        backgroundImage="/images/hands-closeup.png"
      />

      <ServiceBlock kind="checks"><IphoneScreenPostRepairChecks locale={locale} variant="iphone-battery" /></ServiceBlock>

      <ServiceBlock kind="quality"><IphoneQualitySection locale={locale} variant="iphone-battery" /></ServiceBlock>

      <PopularServices locale={locale} variant="other-services" excludeServiceKey="baterijas-maina" />

      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} variant="model" />

      {hasVisibleFaq && (
        <ServiceBlock kind="faq"><section className={s.section}>
          <div className={s.container}>


            {faqSections.map((section, index) => (
              <div
                key={`faq-group-${index}-${section.id}`}
                className={index > 0 ? s.stackLg : ''}
              >
                <Faq
                  id={`faq-group-${index + 1}`}
                  title={section.title || strings.faqTitle}
                  items={section.items}
                  headingLevel={2}
                  variant="accordion"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section></ServiceBlock>
      )}

      <QuickContactsSection locale={locale} id="iphone-locations" />

      <ServiceBlock kind="closing"><FinalCta id="pieteikties" locale={locale} variant="iphone" /></ServiceBlock>
    </ServiceRecovery>
  );
}

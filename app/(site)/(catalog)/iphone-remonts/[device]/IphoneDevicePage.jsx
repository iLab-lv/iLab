import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import PopularServices from '@/_components/sections/popular-services/PopularServices';
import ModelPriceList from '@/_components/sections/model-price-list/ModelPriceList';
import ModelSymptomGuide from '@/_components/sections/model-symptom-guide/ModelSymptomGuide';
import IphoneRepairDecisionSection from '@/_components/page-sections/iphone-remonts/repair-decision/IphoneRepairDecisionSection';
import WhyUs from '@/_components/sections/why-us/WhyUs';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import IphoneLocationsSection from '@/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import FinalCta from '@/_components/sections/final-cta/FinalCta';
import RelatedModels from '@/_components/sections/related-models/RelatedModels';
import BeforeVisiting from '@/_components/sections/before-visiting/BeforeVisiting';
import Faq from '@sections/faq/Faq';

import s from '@/app/(site)/(catalog)/iphone-remonts/[device]/Device.module.scss';

export default function IphoneDevicePage({
  locale = 'lv',

  headerTitle,
  headerLead,
  headerCrumbs = [],
  headerScrollCta = null,

  heroImage,
  heroAlt,
  bodyHtml,

  deviceName,
  device,
  relatedDevices = [],
  relatedBaseHref,

  priceItems = [],
  currency = 'EUR',
  pricesTitle,

  reviewsSummary = null,

  faqTitle,
  faqItems = [],
}) {
  return (
    <>
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        scrollCta={headerScrollCta}
        crumbs={headerCrumbs}
      />

      <DeviceHero
        image={heroImage}
        alt={heroAlt}
        bodyHtml={bodyHtml}
      />

      <QuickFacts variant="iphone-model" locale={locale} />

      <PopularServices
        locale={locale}
        variant="model"
        modelName={deviceName}
        priceTargetId="cenas"
      />

      {!!priceItems.length && (
        <section className={s.section}>
          <ModelPriceList
            id="cenas"
            modelName={deviceName}
            titleAccent={pricesTitle}
            items={priceItems}
            currency={currency}
            headingLevel={2}
            locale={locale}
          />
        </section>
      )}

      <RelatedModels
        currentDevice={device}
        devices={relatedDevices}
        baseHref={relatedBaseHref}
        locale={locale}
      />

      <ModelSymptomGuide locale={locale} modelName={deviceName} />

      <IphoneRepairDecisionSection locale={locale} />

      <WhyUs locale={locale} variant="iphone" />

      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} />

      <IphoneLocationsSection locale={locale} />

      <RepairProcess
        id="iphone-repair-steps"
        locale={locale}
        variant="iphone"
        backgroundImage="/images/hands-closeup.png"
      />

      <BeforeVisiting locale={locale} modelName={deviceName} />

      {!!faqItems.length && (
        <section className={s.section}>
          <Faq
            id="model-faq"
            title={faqTitle}
            items={faqItems}
            locale={locale}
          />
        </section>
      )}

      <FinalCta locale={locale} variant="iphone" />
    </>
  );
}

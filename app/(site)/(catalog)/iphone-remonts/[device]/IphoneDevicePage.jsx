import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ModelHero from '@/_components/sections/device-detail/ModelHero';
import ModelServices from '@/_components/sections/device-detail/ModelServices';
import QuickFacts from '@/_components/sections/quick-facts/QuickFacts';
import ModelPriceList from '@/_components/sections/model-price-list/ModelPriceList';
import ModelSymptomGuide from '@/_components/sections/model-symptom-guide/ModelSymptomGuide';
import IphoneRepairDecisionSection from '@/_components/page-sections/iphone-remonts/repair-decision/IphoneRepairDecisionSection';
import EditorialWhy from '@/_components/sections/why/EditorialWhy';
import { getEditorialWhyContent } from '@/_components/sections/why/editorialWhy.content';
import ReviewsCompact from '@/_components/sections/reviews/ReviewsCompact';
import RepairProcess from '@/_components/sections/repair-process/RepairProcess';
import FinalCta from '@/_components/sections/final-cta/FinalCta';
import RelatedModels from '@/_components/sections/related-models/RelatedModels';
import BeforeVisiting from '@/_components/sections/before-visiting/BeforeVisiting';
import Faq from '@/_components/sections/faq/ServiceFaq';

import skin from '@/_components/sections/catalog-hub/CatalogHubSkin.module.scss';
import modelSkin from '@/_components/sections/device-detail/ModelDetailSkin.module.scss';

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
    <div data-catalog-model className={modelSkin.page}>
      <ModelHero
        locale={locale}
        modelName={deviceName}
        title={headerTitle}
        lead={headerLead}
        targetId={headerScrollCta?.targetId || 'cenas'}
        targetLabel={headerScrollCta?.label}
        crumbs={headerCrumbs}
        image={heroImage}
        imageAlt={heroAlt}
        bodyHtml={bodyHtml}
      ><QuickFacts variant="iphone-model" locale={locale} /></ModelHero>

      <ModelServices
        id="iphone-services"
        locale={locale}
        iphone
        modelName={deviceName}
        priceTargetId="cenas"
        priceItems={priceItems}
        currency={currency}
      />

      {!!priceItems.length && (
          <ModelPriceList
            id="cenas"
            modelName={deviceName}
            titleAccent={pricesTitle}
            items={priceItems}
            currency={currency}
            headingLevel={2}
            locale={locale}
            variant="model"
          />
      )}

      <RelatedModels
        currentDevice={device}
        devices={relatedDevices}
        baseHref={relatedBaseHref}
        locale={locale}
        variant="model"
      />

      <div className={`${skin.block} ${modelSkin.symptoms}`}><ModelSymptomGuide locale={locale} modelName={deviceName} /></div>

      <div className={`${skin.block} ${modelSkin.decision}`}><IphoneRepairDecisionSection locale={locale} /></div>

      <div className={skin.block} data-service-section="why"><EditorialWhy {...getEditorialWhyContent(locale)} /></div>

      <ReviewsCompact locale={locale} reviewsSummary={reviewsSummary} variant="model" />

      <RepairProcess
        id="iphone-repair-steps"
        locale={locale}
        variant="iphone"
        backgroundImage="/images/hands-closeup.png"
      />

      <div className={`${skin.block} ${modelSkin.before}`}><BeforeVisiting locale={locale} modelName={deviceName} /></div>

      {!!faqItems.length && (
        <div data-service-section="faq" className={skin.block}>
          <Faq
            id="model-faq"
            title={faqTitle}
            items={faqItems}
            locale={locale}
          />
        </div>
      )}

      <QuickContactsSection locale={locale} id="iphone-locations" />

      <div className={`${skin.block} ${skin.closing}`}><FinalCta locale={locale} variant="iphone" /></div>
    </div>
  );
}

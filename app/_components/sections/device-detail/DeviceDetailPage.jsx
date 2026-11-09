import QuickContactsSection from '@/_components/sections/quick-contacts/QuickContactsSection';
import ModelHero from './ModelHero';
import ModelServices from './ModelServices';
import RelatedModels from '@/_components/sections/related-models/RelatedModels';
import ModelPriceList from '@/_components/sections/model-price-list/ModelPriceList';
import Process from '@/app/_components/sections/process/Process';
import Why from '@sections/why/Why';
import Faq from '@/_components/sections/faq/ServiceFaq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import skin from '../catalog-hub/CatalogHubSkin.module.scss';
import modelSkin from './ModelDetailSkin.module.scss';

export default function DeviceDetailPage({
  locale = 'lv', headerTitle, headerLead, headerCrumbs = [], headerScrollCta,
  heroImage, heroAlt, bodyHtml, device, modelName, relatedDevices = [], relatedBaseHref,
  servicesId = 'device-services', modelServices = [], modelServicesTitle,
  priceItems = [], currency = 'EUR', priceTitle, processTitle, processSteps = [],
  faqId = 'model-faq', faqTitle, faqItems = [],
}) {
  const targetId = headerScrollCta?.targetId || (priceItems.length ? 'cenas' : servicesId);

  return (
    <div data-catalog-model className={modelSkin.page}>
      <ModelHero locale={locale} title={headerTitle} lead={headerLead} modelName={modelName || headerTitle}
        crumbs={headerCrumbs} image={heroImage} imageAlt={heroAlt} bodyHtml={bodyHtml}
        targetId={targetId} targetLabel={headerScrollCta?.label} />

      {!!modelServices.length && <ModelServices id={servicesId} title={modelServicesTitle} items={modelServices} locale={locale} />}

      {!!priceItems.length &&
        <ModelPriceList id="cenas" modelName={modelName || headerTitle}
          titleAccent={priceTitle} items={priceItems} currency={currency}
          headingLevel={2} locale={locale} variant="model" />
      }

      <RelatedModels currentDevice={device} devices={relatedDevices}
        baseHref={relatedBaseHref} locale={locale} variant="model" />

      <div className={`${skin.block} ${skin.genericWhy} ${modelSkin.benefits}`}><Why locale={locale} /></div>
      <Process locale={locale} {...(processSteps.length ? {
        id: 'process', title: processTitle, steps: processSteps, headingLevel: 2, variant: 'cards',
      } : {})} />
      {!!faqItems.length && <div data-service-section="faq" className={skin.block}>
        <Faq id={faqId} title={faqTitle} items={faqItems} locale={locale} />
      </div>}
      <QuickContactsSection locale={locale} />

      <div className={`${skin.block} ${skin.closing} ${modelSkin.genericClosing}`}><ConvertBand locale={locale} /></div>
    </div>
  );
}

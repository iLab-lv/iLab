import CatalogHero from '@/_components/sections/catalog-hub/CatalogHero';
import RelatedModels from '@/_components/sections/related-models/RelatedModels';
import ModelPriceList from '@/_components/sections/model-price-list/ModelPriceList';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from './DeviceDetailPage.module.scss';

export default function DeviceDetailPage({
  locale = 'lv', headerTitle, headerLead, headerCrumbs = [], headerScrollCta,
  heroImage, heroAlt, bodyHtml, device, modelName, relatedDevices = [], relatedBaseHref,
  servicesId = 'device-services', modelServices = [], modelServicesTitle,
  priceItems = [], currency = 'EUR', priceTitle, processTitle, processSteps = [],
  faqId = 'model-faq', faqTitle, faqItems = [],
}) {
  const targetId = headerScrollCta?.targetId || (priceItems.length ? 'cenas' : servicesId);

  return (
    <>
      <CatalogHero locale={locale} title={headerTitle} lead={headerLead}
        crumbs={headerCrumbs} image={heroImage} imageAlt={heroAlt} bodyHtml={bodyHtml}
        targetId={targetId} targetLabel={headerScrollCta?.label} placeholderLabel={heroAlt} />

      {!!modelServices.length && <section className={s.section}>
        <Services id={servicesId} title={modelServicesTitle} items={modelServices} variant="editorial" />
      </section>}

      {!!priceItems.length && <section className={s.section}>
        <ModelPriceList id="cenas" modelName={modelName || headerTitle}
          titleAccent={priceTitle} items={priceItems} currency={currency}
          headingLevel={2} locale={locale} />
      </section>}

      <RelatedModels currentDevice={device} devices={relatedDevices}
        baseHref={relatedBaseHref} locale={locale} />

      <section className={s.section}><Why locale={locale} /></section>
      <section className={s.section}><Process locale={locale} {...(processSteps.length ? {
        id: 'process', title: processTitle, steps: processSteps, headingLevel: 2, variant: 'cards',
      } : {})} /></section>
      {!!faqItems.length && <section className={s.section}>
        <Faq id={faqId} title={faqTitle} items={faqItems} locale={locale} />
      </section>}
      <section className={s.section}><ConvertBand locale={locale} /></section>
    </>
  );
}

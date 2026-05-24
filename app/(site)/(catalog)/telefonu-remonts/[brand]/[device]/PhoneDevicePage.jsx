import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import PriceList from '@sections/pricing/PriceList';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Why from '@sections/why/Why';
import Faq from '@sections/faq/Faq';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@/app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/Device.module.scss';

export default function PhoneDevicePage({
  locale = 'lv',

  headerTitle,
  headerLead,
  headerCrumbs = [],
  headerScrollCta = null,

  heroImage,
  heroAlt,
  bodyHtml,

  modelServices = [],
  modelServicesTitle,

  priceItems = [],
  currency = 'EUR',
  priceTitle,

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

      {!!modelServices.length && (
        <section className={s.section}>
          <Services
            id="telefonu-services"
            title={modelServicesTitle}
            items={modelServices}
          />
        </section>
      )}

      {!!priceItems.length && (
        <section className={s.section}>
          <PriceList
            id="cenas"
            title={priceTitle}
            items={priceItems}
            currency={currency}
            headingLevel={2}
            locale={locale}
          />
        </section>
      )}

      <section className={s.section}>
        <Why locale={locale} />
      </section>

      <section className={s.section}>
        <Process locale={locale} />
      </section>

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

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}
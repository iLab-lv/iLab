import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import DeviceHero from '@sections/device-hero/DeviceHero';
import DeviceSelector from '@sections/device-selector/DeviceSelector';
import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import Reviews from '@sections/reviews/Reviews';

import c from '@styles/Catalog.module.scss';

const CATEGORY_KEY = 'telefonu-remonts';

export default function PhoneBrandPage({
  locale = 'lv',

  page,
  brandSlug,
  devicesAll = [],
  seriesMeta,
  brandPhoneList = [],
  baseHref,

  headerTitle,
  headerLead,
  breadcrumbs = [],

  strings,
  processSteps = [],
  popularRepairs = [],

  hasVisibleFaq = false,
  faqTitle,
  faqItems = [],
}) {
  if (!page) {
    return null;
  }

  return (
    <>
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <DeviceHero
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        alt={strings.heroAlt}
        brandLogo={page.source?.brand?.logo || null}
        brandKey={page.source?.brand?.key || brandSlug}
        focal="right"
        priority
        bodyHtml={strings.heroHtml}
      />

      <section className={c.section} aria-labelledby="brand-intro-h2">
        <div className={c.container}>
          <h2 id="brand-intro-h2" className={c.h2}>
            {strings.introTitle}
          </h2>

          <p
            className={c.intro}
            dangerouslySetInnerHTML={{ __html: strings.introLead }}
          />

          <p
            className={c.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.introParagraph }}
          />
        </div>
      </section>

      {!!popularRepairs.length && (
        <section className={c.section} aria-labelledby="popular-services-h2">
          <div className={c.container}>
            <Services
              id="brand-services"
              title={strings.servicesTitle}
              items={popularRepairs}
            />
          </div>
        </section>
      )}

      <DeviceSelector
        id="brand-modeli"
        locale={locale}
        title={strings.modelGridHeading}
        intro={strings.modelGridIntro}
        devices={devicesAll}
        baseHref={baseHref}
        brandKey={brandSlug}
        categoryKey={CATEGORY_KEY}
        seriesMeta={seriesMeta}
        initialLimit={4}
        autoExpandOnSearch
      />

      <section className={c.section}>
        <div className={c.container}>
          <p className={c.paragraph} style={{ marginTop: 0 }}>
            {strings.modelsNote}
          </p>

          {brandPhoneList.length === 0 && (
            <p style={{ opacity: 0.8, marginTop: 16 }}>{strings.noModels}</p>
          )}
        </div>
      </section>

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      <div id="process-h2" className={c.anchorTarget} />

      {page.sections?.hasProcess && (
        <section className={c.section} aria-labelledby="process-h2">
          <div className={c.container}>
            <Process
              id="process"
              title={strings.processTitle}
              steps={processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
          </div>
        </section>
      )}

      {page.sections?.hasWhy && (
        <section className={c.section}>
          <Why locale={locale} />
        </section>
      )}

      {hasVisibleFaq && (
        <section className={c.section} aria-labelledby="faq-h2">
          <div className={c.container}>
            <Faq
              id="brand-faq"
              title={faqTitle}
              items={faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
          </div>
        </section>
      )}

      {page.sections?.hasConvertBand && (
        <section className={c.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
    </>
  );
}

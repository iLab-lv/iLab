import CatalogHero from '@/_components/sections/catalog-hub/CatalogHero';

import BrandPreview from '@components/model-grid/BrandPreview';

import Services from '@sections/services/Services';
import Reviews from '@sections/reviews/Reviews';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import s from '@/_components/sections/catalog-hub/CatalogHub.module.scss';

export default function PhoneRepairPage({
  locale = 'lv',
  page,

  headerTitle,
  headerLead,
  breadcrumbs = [],

  brandBlocks = [],

  faqTitle,
  faqItems = [],

  labels,
  servicesItems = [],
}) {
  if (!page) {
    return null;
  }

  return (
    <>
      <CatalogHero
        locale={locale}
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        imageAlt={labels.heroAlt}
        bodyHtml={labels.heroBodyHtml}
        targetId={labels.scrollCta.targetId}
        targetLabel={labels.scrollCta.label}
      />

      <main className={s.hub}>
      <section className={s.section} aria-labelledby="phones-intro-h2">
        <div className={s.container}>
          <h2 id="phones-intro-h2" className={s.h2}>
            {labels.introTitle}
          </h2>

          <p className={s.intro}>{labels.introLead}</p>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: labels.introP1 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: labels.introP2 }}
          />

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: labels.introP3 }}
          />
        </div>
      </section>

      {!!servicesItems.length && (
        <section className={s.section} aria-labelledby="popular-services-h2">
          <div className={s.container}>
            <Services
              id="brand-services"
              title={labels.servicesTitle}
              items={servicesItems}
            />
          </div>
        </section>
      )}

      <div id="brand-list" className={s.anchorTarget} />

      {brandBlocks.map((brand) => (
        <BrandPreview
          key={brand.slug}
          brandSlug={brand.slug}
          brandName={brand.name}
          items={brand.items}
          total={brand.total}
          href={brand.href}
          locale={locale}
        />
      ))}

      {page.sections?.hasReviews && <Reviews locale={locale} />}

      {page.sections?.hasProcess && (
        <section className={s.section} aria-labelledby="process-h2">
          <div className={s.container}>
            <Process
              id="process"
              title={labels.processTitle}
              steps={labels.processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
          </div>
        </section>
      )}

      {page.sections?.hasWhy && (
        <section className={s.section}>
          <Why locale={locale} />
        </section>
      )}

      {page.sections?.hasFaq && faqItems.length > 0 && (
        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <Faq
              id="phones-faq"
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
        <section className={s.section}>
          <ConvertBand locale={locale} />
        </section>
      )}
      </main>
    </>
  );
}

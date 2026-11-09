import HubLocations from '@/_components/sections/catalog-hub/HubLocations';
import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import CatalogHero from '@/_components/sections/catalog-hub/CatalogHero';

import BrandPreview from '@/_components/sections/catalog-hub/HubBrandPreview';

import Services from '@/_components/sections/popular-repairs/RepairServices';
import Reviews from '@/_components/sections/catalog-hub/HubReviews';
import Process from '@/app/_components/sections/process/Process';
import Faq from '@/_components/sections/faq/ServiceFaq';
import ConvertBand from '@sections/convert-band/ConvertBand';
import s from '@/_components/sections/catalog-hub/CatalogHub.module.scss';
import skin from '@/_components/sections/catalog-hub/CatalogHubSkin.module.scss';

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

  const introP1 = page.sections?.hasProcess
    ? labels.introP1.replaceAll('#process-h2', '#process')
    : labels.introP1.replace(/<a href="#process(?:-h2)?">([\s\S]*?)<\/a>/g, '$1');

  return (
    <>
      <CatalogHero
        variant="hub"
        locale={locale}
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        image={page.hero?.image || '/images/categories/telefonu_remonts.webp'}
        imageWidth={1800}
        imageHeight={2000}
        imageAlt={labels.heroAlt}
        bodyHtml={labels.heroBodyHtml}
        targetId={labels.scrollCta.targetId}
        targetLabel={labels.scrollCta.label}
      >
        <QuickTrustFacts id="why" {...getQuickTrustFacts("phone", locale)} />
      </CatalogHero>

      <div className={s.hub}>
      <section className={s.section} aria-labelledby="phones-intro-h2">
        <div className={s.container}>
          <h2 id="phones-intro-h2" className={s.h2}>
            {labels.introTitle}
          </h2>

          <p className={s.intro}>{labels.introLead}</p>

          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: introP1 }}
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
        <Services
              id="brand-services"
              locale={locale}
              variant="featured"
              title={labels.servicesTitle}
              items={servicesItems}
            />
      )}

      <div id="brand-list" className={s.anchorTarget} />

      {brandBlocks.map((brand) => (
        <BrandPreview
          presentation="editorial"
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
        <Process
              id="process"
              title={labels.processTitle}
              steps={labels.processSteps}
              headingLevel={2}
              variant="cards"
              locale={locale}
            />
      )}

      <HubLocations id="phone-locations" locale={locale} />

      {page.sections?.hasFaq && faqItems.length > 0 && (
        <div data-service-section="faq" className={skin.block}>
            <Faq
              id="phones-faq"
              title={faqTitle}
              items={faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
        </div>
      )}

      {page.sections?.hasConvertBand && (
        <div className={`${skin.block} ${skin.closing} ${skin.genericClosing}`}><section>
          <ConvertBand locale={locale} />
        </section></div>
      )}
      </div>
    </>
  );
}

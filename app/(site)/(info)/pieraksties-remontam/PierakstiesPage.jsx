import JsonLd from '@components/seo/JsonLd';
import { absoluteUrl, buildFaqLd } from '@/lib/seo/jsonld';
import InfoHero from '@/_components/sections/service-recovery/InfoHero';
import ServiceRecovery, { ServiceBlock } from '@/_components/sections/service-recovery/ServiceRecovery';
import recovery from '@/_components/sections/service-recovery/RemainingPages.module.scss';
import BookingFormOnPage from './BookingFormOnPage';
import LocationList from '@/app/(site)/sections/locations/LocationList';
import Faq from '@/_components/sections/faq/ServiceFaq';
import { getFaqGroups } from '@/lib/faq/getFaqGroups';
import { toFaqRenderItems } from '@sections/faq/faq.helpers';

export function getPierakstiesPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      canonicalPath: '/ru/zapisatsja-na-remont',

      metaTitle: 'Записаться на ремонт | iLab',
      metaDescription:
        'Заполните форму записи на ремонт iLab. Укажите устройство и проблему, и наш мастер свяжется с вами, чтобы согласовать стоимость и время ремонта.',

      breadcrumbHome: 'Главная',
      breadcrumbPage: 'Записаться на ремонт',

      headerTitle: 'Записаться на ремонт',
      headerLead:
        'Заполните форму, указав устройство и проблему - наш мастер свяжется с вами, согласует стоимость и время ремонта.',

      formAriaLabel: 'Форма записи на ремонт',

      afterFormTitle: 'Что будет после отправки заявки?',
      afterFormText:
        'После отправки формы мастер iLab свяжется с вами, уточнит модель устройства и описание проблемы, проверит доступность деталей и предварительную стоимость ремонта. Ремонт начинается только после согласования цены, срока и удобного филиала.',
    };
  }

  return {
    canonicalPath: '/pieraksties-remontam',

    metaTitle: 'Pieraksties remontam | iLab',
    metaDescription:
      'Aizpildi iLab remonta pieteikuma formu. Norādi ierīci un problēmu, un mūsu meistars sazināsies, lai saskaņotu izmaksas un remonta laiku.',

    breadcrumbHome: 'Sākums',
    breadcrumbPage: 'Pieraksties remontam',

    headerTitle: 'Pieraksties remontam',
    headerLead:
      'Aizpildi formu ar savu ierīci un problēmu - mūsu meistars sazināsies, saskaņos izmaksas un remonta laiku.',

    formAriaLabel: 'Remonta pieteikuma forma',

    afterFormTitle: 'Kas notiks pēc pieteikuma nosūtīšanas?',
    afterFormText:
      'Pēc formas nosūtīšanas iLab meistars sazināsies ar Tevi, precizēs ierīces modeli un problēmas aprakstu, pārbaudīs detaļu pieejamību un provizorisko remonta cenu. Remonts sākas tikai pēc cenas, termiņa un ērtākās filiāles saskaņošanas.',
  };
}

function normalizeBookingLocations(locations = []) {
  return locations
    .map((location) => {
      const id =
        location.id ||
        location.key ||
        location.slug ||
        location.name ||
        '';

      const label =
        location.label ||
        location.title ||
        location.name ||
        location.shortName ||
        id;

      const address =
        location.address ||
        location.fullAddress ||
        location.streetAddress ||
        '';

      if (!id || !label) {
        return null;
      }

      return {
        id,
        label,
        address,
      };
    })
    .filter(Boolean);
}

export default async function PierakstiesPage({
  locale = 'lv',
  labels,
  breadcrumbs = [],
  siteSettings,
}) {
  const strings = labels || getPierakstiesPageStrings(locale);

  const locations = normalizeBookingLocations(siteSettings?.locations || []);
  const faq = await getFaqGroups(['basic'], locale);

  return (
    <ServiceRecovery family="pieraksties-remontam" className={recovery.page}>
      {faq.items.length > 0 && <JsonLd id="booking-faq-jsonld" data={buildFaqLd(faq.items, { id: absoluteUrl(strings.canonicalPath) + '#faq' })} />}
      <InfoHero locale={locale} booking={false}
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
      />

      <section className={recovery.bookingLayout} aria-label={strings.formAriaLabel}>
        <aside className={recovery.bookingAside}><h2>{strings.afterFormTitle}</h2><p>{strings.afterFormText}</p><div data-service-section="locations" className={recovery.bookingBranches}><LocationList locale={locale} locations={siteSettings?.locations || []} showAllCards /></div></aside>
        <div className={recovery.bookingForm}><h2 className={recovery.formTitle}>{strings.formAriaLabel}</h2><BookingFormOnPage locale={locale} locations={locations} /></div>
      </section>
      {faq.items.length > 0 && <ServiceBlock kind="faq"><Faq id="booking-faq" title={faq.title} items={toFaqRenderItems(faq.items)} /></ServiceBlock>}
    </ServiceRecovery>
  );
}

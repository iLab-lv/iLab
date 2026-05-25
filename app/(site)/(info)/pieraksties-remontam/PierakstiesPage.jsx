import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import BookingFormOnPage from './BookingFormOnPage';

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

export default function PierakstiesPage({
  locale = 'lv',
  labels,
  breadcrumbs = [],
  siteSettings,
}) {
  const strings = labels || getPierakstiesPageStrings(locale);

  const locations = normalizeBookingLocations(siteSettings?.locations || []);

  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
      />

      <main
        className="container"
        style={{
          padding: '2rem 0 0',
        }}
        aria-label={strings.formAriaLabel}
      >
        <BookingFormOnPage
          locale={locale}
          locations={locations}
        />
      </main>

      <section
        className="container"
        style={{
          padding: '4rem 0 4.5rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            padding: '1.5rem 1.75rem',
            borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h2
            style={{
              margin: '0 0 0.75rem',
              fontSize: '1.35rem',
              lineHeight: 1.25,
            }}
          >
            {strings.afterFormTitle}
          </h2>

          <p
            style={{
              maxWidth: 760,
              margin: 0,
              lineHeight: 1.7,
              opacity: 0.86,
            }}
          >
            {strings.afterFormText}
          </p>
        </div>
      </section>
    </>
  );
}
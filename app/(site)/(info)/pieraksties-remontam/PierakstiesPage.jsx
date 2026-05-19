import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import BookingFormFromSettings from './BookingFormFromSettings';

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      canonicalPath: '/ru/zapisatsya-na-remont',
      breadcrumbHome: 'Главная',
      breadcrumbPage: 'Записаться на ремонт',
      headerTitle: 'Записаться на ремонт',
      headerLead:
        'Заполните форму, указав устройство и проблему - наш мастер свяжется с вами, согласует стоимость и время ремонта.',
    };
  }

  return {
    canonicalPath: '/pieraksties-remontam',
    breadcrumbHome: 'Sākums',
    breadcrumbPage: 'Pieraksties remontam',
    headerTitle: 'Pieraksties remontam',
    headerLead:
      'Aizpildi formu ar savu ierīci un problēmu - mūsu meistars sazināsies, saskaņos izmaksas un remonta laiku.',
  };
}

export default function PierakstiesPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);

  const headerCrumbs = [
    {
      label: strings.breadcrumbHome,
      href: locale === 'ru' ? '/ru' : '/',
    },
    {
      label: strings.breadcrumbPage,
      href: strings.canonicalPath,
    },
  ];

  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={headerCrumbs}
      />

      <main className="container" style={{ padding: '2rem 0' }}>
        <BookingFormFromSettings locale={locale} />
      </main>
    </>
  );
}
import PhoneDevicePage from './PhoneDevicePage';
import Footer from '@site/ui/footer/Footer';

export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return PhoneDevicePage.generateMetadata({ params, locale: 'lv' });
}

export default async function Page({ params }) {
  return (
  <>
  <PhoneDevicePage params={params} locale="lv" />
  <Footer locale="lv" />
  </>
  );
}
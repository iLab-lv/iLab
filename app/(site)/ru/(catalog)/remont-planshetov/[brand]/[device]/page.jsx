import TabletDevicePage from '@site/(catalog)/plansetdatoru-remonts/[brand]/[device]/TabletDevicePage';
import Footer from '@site/ui/footer/Footer';


export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
};
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return TabletDevicePage.generateMetadata({ params, locale: 'ru' });
}

export default async function Page({ params }) {
  return (
  <>
  <TabletDevicePage params={params} locale="ru" />
  <Footer locale="lv" />
  </>
  );
}
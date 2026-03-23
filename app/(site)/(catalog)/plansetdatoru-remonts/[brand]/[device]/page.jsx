import TabletDevicePage from './TabletDevicePage';

export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Skatīt cenas', targetId: 'cenas' },
};
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return TabletDevicePage.generateMetadata({ params, locale: 'lv' });
}

export default async function Page({ params }) {
  return <TabletDevicePage params={params} locale="lv" />;
}
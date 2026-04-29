import PhoneDevicePage from '@site/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage';
import Footer from '@site/ui/footer/Footer';

export const revalidate = 0;

/* ===== Header CTA exposed to layout ===== */
export const pageHeader = {
  scrollCta: { label: 'Смотреть цены', targetId: 'cenas' },
};
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return PhoneDevicePage.generateMetadata({ params, locale: 'ru' });
}

export default async function Page({ params }) {
  return (
  <>
  <PhoneDevicePage params={params} locale="ru" />
  <Footer locale="ru" />
    </>
    );
}
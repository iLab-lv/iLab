import PhoneBatteryServicePage, {
  getPhoneBatteryServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/baterijas-maina/PhoneBatteryServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneBatteryServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneBatteryServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>
  );
}
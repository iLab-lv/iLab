import PhoneBatteryServicePage, {
  getPhoneBatteryServiceMetadata,
} from './PhoneBatteryServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneBatteryServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneBatteryServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>

  );
}
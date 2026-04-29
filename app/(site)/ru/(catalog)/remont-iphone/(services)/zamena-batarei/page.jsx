import IphoneBatteryServicePage, {
  getIphoneBatteryServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/baterijas-maina/IphoneBatteryServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneBatteryServiceMetadata('ru');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneBatteryServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
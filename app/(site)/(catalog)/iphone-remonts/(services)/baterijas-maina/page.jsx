import IphoneBatteryServicePage, {
  getIphoneBatteryServiceMetadata,
} from './IphoneBatteryServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneBatteryServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return (
    <>
      <IphoneBatteryServicePage locale="lv" searchParams={searchParams} />
      <Footer locale="lv" />
    </>
  );
}
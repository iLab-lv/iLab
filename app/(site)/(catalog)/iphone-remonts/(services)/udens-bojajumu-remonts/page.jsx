import IphoneWaterDamageServicePage, {
  getIphoneWaterDamageServiceMetadata,
} from './IphoneWaterDamageServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneWaterDamageServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneWaterDamageServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>
);
}
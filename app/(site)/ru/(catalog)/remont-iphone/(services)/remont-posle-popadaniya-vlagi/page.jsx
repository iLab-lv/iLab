import IphoneWaterDamageServicePage, {
  getIphoneWaterDamageServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/udens-bojajumu-remonts/IphoneWaterDamageServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneWaterDamageServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneWaterDamageServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
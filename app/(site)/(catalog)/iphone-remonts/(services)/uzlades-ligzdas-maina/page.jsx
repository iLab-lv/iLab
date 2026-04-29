import IphoneChargePortServicePage, {
  getIphoneChargePortServiceMetadata,
} from './IphoneChargePortServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneChargePortServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneChargePortServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>
);
}
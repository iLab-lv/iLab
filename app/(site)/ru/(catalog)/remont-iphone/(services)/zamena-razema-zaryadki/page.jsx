import IphoneChargePortServicePage, {
  getIphoneChargePortServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/uzlades-ligzdas-maina/IphoneChargePortServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneChargePortServiceMetadata('ru');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneChargePortServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
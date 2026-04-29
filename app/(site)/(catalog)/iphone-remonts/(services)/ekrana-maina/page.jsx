import IphoneScreenServicePage, {
  getIphoneScreenServiceMetadata,
} from './IphoneScreenServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneScreenServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneScreenServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>
);
}
import IphoneScreenServicePage, {
  getIphoneScreenServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/ekrana-maina/IphoneScreenServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneScreenServiceMetadata('ru');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneScreenServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
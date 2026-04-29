import IphoneCameraServicePage, {
  getIphoneCameraServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/kameras-remonts/IphoneCameraServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneCameraServiceMetadata('ru');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneCameraServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
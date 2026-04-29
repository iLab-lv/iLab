import IphoneCameraServicePage, {
  getIphoneCameraServiceMetadata,
} from './IphoneCameraServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneCameraServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return (
  <>
  <IphoneCameraServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>
);
}
import PhoneCameraServicePage, {
  getPhoneCameraServiceMetadata,
} from './PhoneCameraServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneCameraServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneCameraServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>

  );
}
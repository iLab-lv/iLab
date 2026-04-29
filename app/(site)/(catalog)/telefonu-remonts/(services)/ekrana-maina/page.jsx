import PhoneScreenServicePage, {
  getPhoneScreenServiceMetadata,
} from './PhoneScreenServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneScreenServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneScreenServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>

  );
}
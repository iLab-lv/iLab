import PhoneAudioServicePage, {
  getPhoneAudioServiceMetadata,
} from './PhoneAudioServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneAudioServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneAudioServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>

  );
}
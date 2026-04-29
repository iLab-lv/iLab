import IphoneAudioServicePage, {
  getIphoneAudioServiceMetadata,
} from './IphoneAudioServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneAudioServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneAudioServicePage locale="lv" searchParams={searchParams} />
  <Footer locale="lv" />
  </>
);
}
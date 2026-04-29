import IphoneAudioServicePage, {
  getIphoneAudioServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/skalruni-mikrofona-remonts/IphoneAudioServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getIphoneAudioServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneAudioServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>

  );
}
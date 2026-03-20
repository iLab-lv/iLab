import IphoneAudioServicePage, {
  getIphoneAudioServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/skalruni-mikrofona-remonts/IphoneAudioServicePage';

export const metadata = getIphoneAudioServiceMetadata('ru');

export default function Page({ searchParams }) {
  return <IphoneAudioServicePage locale="ru" searchParams={searchParams} />;
}
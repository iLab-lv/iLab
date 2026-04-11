import PhoneAudioServicePage, {
  getPhoneAudioServiceMetadata,
} from './PhoneAudioServicePage';

export const metadata = getPhoneAudioServiceMetadata('lv');

export default function Page({ searchParams }) {
  return <PhoneAudioServicePage locale="lv" searchParams={searchParams} />;
}
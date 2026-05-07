import IphoneAudioServicePage, {
  getIphoneAudioServiceMetadata,
} from './IphoneAudioServicePage';


export const metadata = getIphoneAudioServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneAudioServicePage locale="lv" searchParams={searchParams} />
  </>
);
}
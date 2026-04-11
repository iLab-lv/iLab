import PhoneCameraServicePage, {
  getPhoneCameraServiceMetadata,
} from './PhoneCameraServicePage';

export const metadata = getPhoneCameraServiceMetadata('lv');

export default function Page({ searchParams }) {
  return <PhoneCameraServicePage locale="lv" searchParams={searchParams} />;
}
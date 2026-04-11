import PhoneScreenServicePage, {
  getPhoneScreenServiceMetadata,
} from './PhoneScreenServicePage';

export const metadata = getPhoneScreenServiceMetadata('lv');

export default function Page({ searchParams }) {
  return <PhoneScreenServicePage locale="lv" searchParams={searchParams} />;
}
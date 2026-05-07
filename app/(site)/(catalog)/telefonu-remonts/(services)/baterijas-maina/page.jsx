import PhoneBatteryServicePage, {
  getPhoneBatteryServiceMetadata,
} from './PhoneBatteryServicePage';


export const metadata = getPhoneBatteryServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneBatteryServicePage locale="lv" searchParams={searchParams} />
  </>

  );
}
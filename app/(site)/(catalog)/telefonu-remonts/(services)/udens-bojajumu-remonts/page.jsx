import PhoneWaterDamageServicePage, {
  getPhoneWaterDamageServiceMetadata,
} from './PhoneWaterDamageServicePage';


export const metadata = getPhoneWaterDamageServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
    <>
      <PhoneWaterDamageServicePage locale="lv" searchParams={searchParams} />
    </>
  );
}
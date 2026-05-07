import PhoneChargePortServicePage, {
  getPhoneChargePortServiceMetadata,
} from './PhoneChargePortServicePage';


export const metadata = getPhoneChargePortServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
    <>
      <PhoneChargePortServicePage locale="lv" searchParams={searchParams} />

    </>
  );
}
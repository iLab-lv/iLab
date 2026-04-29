import PhoneWaterDamageServicePage, {
  getPhoneWaterDamageServiceMetadata,
} from './PhoneWaterDamageServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneWaterDamageServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
    <>
      <PhoneWaterDamageServicePage locale="lv" searchParams={searchParams} />
      <Footer locale="lv" />
    </>
  );
}
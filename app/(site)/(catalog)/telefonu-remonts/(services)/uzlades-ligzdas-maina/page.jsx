import PhoneChargePortServicePage, {
  getPhoneChargePortServiceMetadata,
} from './PhoneChargePortServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneChargePortServiceMetadata('lv');

export default function Page({ searchParams }) {
  return (
    <>
      <PhoneChargePortServicePage locale="lv" searchParams={searchParams} />
      <Footer locale="lv" />
    </>
  );
}
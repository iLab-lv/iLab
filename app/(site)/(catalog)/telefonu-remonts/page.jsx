import PhoneRepairPage, {
  getPhoneRepairMetadata,
} from './PhoneRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneRepairMetadata('lv');

export default function Page() {
  return (
  <>
  <PhoneRepairPage locale="lv" />
  <Footer locale="lv" />
  </>

  );
}
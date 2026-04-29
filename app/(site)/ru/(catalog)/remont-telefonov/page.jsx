import PhoneRepairPage, {
  getPhoneRepairMetadata,
} from '@site/(catalog)/telefonu-remonts/PhoneRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <PhoneRepairPage locale="ru" />
  <Footer locale="ru" />
  </>
  );
}
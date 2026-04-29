import PhoneScreenServicePage, {
  getPhoneScreenServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/ekrana-maina/PhoneScreenServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneScreenServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneScreenServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>
  );
}
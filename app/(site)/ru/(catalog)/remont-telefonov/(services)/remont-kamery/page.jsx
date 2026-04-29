import PhoneCameraServicePage, {
  getPhoneCameraServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/kameras-remonts/PhoneCameraServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneCameraServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneCameraServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>
  );
}

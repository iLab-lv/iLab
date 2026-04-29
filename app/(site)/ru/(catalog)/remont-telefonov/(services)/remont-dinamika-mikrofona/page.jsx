import PhoneAudioServicePage, {
  getPhoneAudioServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/skalruni-mikrofona-remonts/PhoneAudioServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneAudioServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <PhoneAudioServicePage locale="ru" searchParams={searchParams} />
  <Footer locale="ru" />
  </>
  );
}
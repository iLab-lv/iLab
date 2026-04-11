import PhoneAudioServicePage, {
  getPhoneAudioServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/skalruni-mikrofona-remonts/PhoneAudioServicePage';

export const metadata = getPhoneAudioServiceMetadata('ru');

export default function Page({ searchParams }) {
  return <PhoneAudioServicePage locale="ru" searchParams={searchParams} />;
}
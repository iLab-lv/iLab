import PhoneScreenServicePage, {
  getPhoneScreenServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/ekrana-maina/PhoneScreenServicePage';

export const metadata = getPhoneScreenServiceMetadata('ru');

export default function Page({ searchParams }) {
  return <PhoneScreenServicePage locale="ru" searchParams={searchParams} />;
}
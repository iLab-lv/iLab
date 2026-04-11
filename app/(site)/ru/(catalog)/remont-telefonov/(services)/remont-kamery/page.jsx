import PhoneCameraServicePage, {
  getPhoneCameraServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/kameras-remonts/PhoneCameraServicePage';

export const metadata = getPhoneCameraServiceMetadata('ru');

export default function Page({ searchParams }) {
  return <PhoneCameraServicePage locale="ru" searchParams={searchParams} />;
}

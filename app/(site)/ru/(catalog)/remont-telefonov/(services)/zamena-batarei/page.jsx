import PhoneBatteryServicePage, {
  getPhoneBatteryServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/baterijas-maina/PhoneBatteryServicePage';

export const metadata = getPhoneBatteryServiceMetadata('ru');

export default function Page({ searchParams }) {
  return <PhoneBatteryServicePage locale="ru" searchParams={searchParams} />;
}
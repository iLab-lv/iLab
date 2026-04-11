import PhoneWaterDamageServicePage, {
  getPhoneWaterDamageServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/udens-bojajumu-remonts/PhoneWaterDamageServicePage';

export const metadata = getPhoneWaterDamageServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
    <PhoneWaterDamageServicePage locale="ru" searchParams={searchParams} />
  );
}
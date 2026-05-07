import PhoneChargePortServicePage, {
  getPhoneChargePortServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/uzlades-ligzdas-maina/PhoneChargePortServicePage';


export const metadata = getPhoneChargePortServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
    <>
    <PhoneChargePortServicePage locale="ru" searchParams={searchParams} />
  </>
  );
}
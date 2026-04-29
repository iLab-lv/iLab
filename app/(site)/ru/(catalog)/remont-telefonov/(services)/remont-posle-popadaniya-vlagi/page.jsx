import PhoneWaterDamageServicePage, {
  getPhoneWaterDamageServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/udens-bojajumu-remonts/PhoneWaterDamageServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneWaterDamageServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
    <>
    <PhoneWaterDamageServicePage locale="ru" searchParams={searchParams} />
    <Footer locale="ru" />
  </>
  );
}
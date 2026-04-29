import PhoneChargePortServicePage, {
  getPhoneChargePortServiceMetadata,
} from '@site/(catalog)/telefonu-remonts/(services)/uzlades-ligzdas-maina/PhoneChargePortServicePage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getPhoneChargePortServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
    <>
    <PhoneChargePortServicePage locale="ru" searchParams={searchParams} />
    <Footer locale="ru" />
  </>
  );
}
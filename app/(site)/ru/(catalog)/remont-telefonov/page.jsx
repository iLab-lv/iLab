import PhoneRepairPage, {
  getPhoneRepairMetadata,
} from '@site/(catalog)/telefonu-remonts/PhoneRepairPage';


export const metadata = getPhoneRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <PhoneRepairPage locale="ru" />
 
  </>
  );
}
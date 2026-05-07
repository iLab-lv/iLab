import PhoneRepairPage, {
  getPhoneRepairMetadata,
} from './PhoneRepairPage';


export const metadata = getPhoneRepairMetadata('lv');

export default function Page() {
  return (
  <>
  <PhoneRepairPage locale="lv" />
  </>

  );
}
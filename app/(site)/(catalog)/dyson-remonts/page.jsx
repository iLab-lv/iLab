import DysonRepairPage, {
  getDysonRepairMetadata,
} from './DysonRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getDysonRepairMetadata('lv');

export default function Page() {
  return (
  <>
  <DysonRepairPage locale="lv" />
  <Footer locale="lv" />
  </>
  );
}
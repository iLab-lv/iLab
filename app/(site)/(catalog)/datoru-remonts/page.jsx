import ComputerRepairPage, {
  getComputerRepairMetadata,
} from './ComputerRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getComputerRepairMetadata('lv');

export default function Page() {
  return (
    <>
      <ComputerRepairPage locale="lv" />
      <Footer locale="lv" />
    </>
  );
}
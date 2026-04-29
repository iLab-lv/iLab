import ComputerRepairPage, {
  getComputerRepairMetadata,
} from '@site/(catalog)/datoru-remonts/ComputerRepairPage';
import Footer from '@site/ui/footer/Footer';


export const metadata = getComputerRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <ComputerRepairPage locale="ru" />
  <Footer locale="ru" />
  </>
  );
}
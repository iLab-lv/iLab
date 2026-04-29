import DysonRepairPage, {
  getDysonRepairMetadata,
} from '@site/(catalog)/dyson-remonts/DysonRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getDysonRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <DysonRepairPage locale="ru" />
  <Footer locale="ru" />
  </>
);
}
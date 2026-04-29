import TabletRepairPage, {
  getTabletRepairMetadata,
} from '@site/(catalog)/plansetdatoru-remonts/TabletRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getTabletRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <TabletRepairPage locale="ru" />
  <Footer locale="ru" />
  </>

  );
}
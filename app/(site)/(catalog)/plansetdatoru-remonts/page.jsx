import TabletRepairPage, {
  getTabletRepairMetadata,
} from './TabletRepairPage';
import Footer from '@site/ui/footer/Footer';

export const metadata = getTabletRepairMetadata('lv');

export default function Page() {
  return (
  <>
  <TabletRepairPage locale="lv" />
  <Footer locale="lv" />
  </>

  );
}
import TabletRepairPage, {
  getTabletRepairMetadata,
} from './TabletRepairPage';

export const metadata = getTabletRepairMetadata('lv');

export default function Page() {
  return <TabletRepairPage locale="lv" />;
}
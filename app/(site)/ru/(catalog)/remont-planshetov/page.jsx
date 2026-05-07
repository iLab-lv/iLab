import TabletRepairPage, {
  getTabletRepairMetadata,
} from '@site/(catalog)/plansetdatoru-remonts/TabletRepairPage';


export const metadata = getTabletRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <TabletRepairPage locale="ru" />
  </>

  );
}
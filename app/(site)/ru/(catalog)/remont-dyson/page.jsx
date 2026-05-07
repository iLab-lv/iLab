import DysonRepairPage, {
  getDysonRepairMetadata,
} from '@site/(catalog)/dyson-remonts/DysonRepairPage';


export const metadata = getDysonRepairMetadata('ru');

export default function Page() {
  return (
  <>
  <DysonRepairPage locale="ru" />
  </>
);
}
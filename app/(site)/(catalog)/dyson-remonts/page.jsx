import DysonRepairPage, {
  getDysonRepairMetadata,
} from './DysonRepairPage';

export const metadata = getDysonRepairMetadata('lv');

export default function Page() {
  return (
  <>
  <DysonRepairPage locale="lv" />

  </>
  );
}
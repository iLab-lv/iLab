import ComputerRepairPage, {
  getComputerRepairMetadata,
} from './ComputerRepairPage';

export const metadata = getComputerRepairMetadata('lv');

export default function Page() {
  return <ComputerRepairPage locale="lv" />;
}
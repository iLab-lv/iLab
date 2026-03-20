import ComputerRepairPage, {
  getComputerRepairMetadata,
} from '@site/(catalog)/datoru-remonts/ComputerRepairPage';

export const metadata = getComputerRepairMetadata('ru');

export default function Page() {
  return <ComputerRepairPage locale="ru" />;
}
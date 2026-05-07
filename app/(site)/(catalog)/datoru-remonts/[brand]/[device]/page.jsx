import ComputerDevicePage, {
  getComputerDeviceMetadata,
  getComputerDevicePageHeader,
  revalidate,
} from './ComputerDevicePage';

export { revalidate };

export const pageHeader = getComputerDevicePageHeader('lv');
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return getComputerDeviceMetadata(params, 'lv');
}

export default function Page({ params }) {
  return (
    <>
      <ComputerDevicePage
        brand={params.brand}
        device={params.device}
        locale="lv"
      />
    </>
  );
}
import ComputerDevicePage, {
  getComputerDeviceMetadata,
  getComputerDevicePageHeader,
  revalidate,
} from '@site/(catalog)/datoru-remonts/[brand]/[device]/ComputerDevicePage';


export { revalidate };

export const pageHeader = getComputerDevicePageHeader('ru');
export const headerProps = pageHeader;

export async function generateMetadata({ params }) {
  return getComputerDeviceMetadata(params, 'ru');
}

export default function Page({ params }) {
  return (
    <>
      <ComputerDevicePage
        brand={params.brand}
        device={params.device}
        locale="ru"
      />
    </>
  );
}
import IphoneBatteryServicePage, {
  getIphoneBatteryServiceMetadata,
} from './IphoneBatteryServicePage';


export const metadata = getIphoneBatteryServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return (
    <>
      <IphoneBatteryServicePage locale="lv" searchParams={searchParams} />
    </>
  );
}
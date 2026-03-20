import IphoneCameraServicePage, {
  getIphoneCameraServiceMetadata,
} from './IphoneCameraServicePage';

export const metadata = getIphoneCameraServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return <IphoneCameraServicePage locale="lv" searchParams={searchParams} />;
}
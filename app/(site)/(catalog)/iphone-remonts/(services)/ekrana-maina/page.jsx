import IphoneScreenServicePage, {
  getIphoneScreenServiceMetadata,
} from './IphoneScreenServicePage';

export const metadata = getIphoneScreenServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return <IphoneScreenServicePage locale="lv" searchParams={searchParams} />;
}
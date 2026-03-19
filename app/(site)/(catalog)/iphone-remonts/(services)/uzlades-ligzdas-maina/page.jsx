import IphoneChargePortServicePage, {
  getIphoneChargePortServiceMetadata,
} from './IphoneChargePortServicePage';

export const metadata = getIphoneChargePortServiceMetadata('lv');

export default async function Page({ searchParams }) {
  return <IphoneChargePortServicePage locale="lv" searchParams={searchParams} />;
}
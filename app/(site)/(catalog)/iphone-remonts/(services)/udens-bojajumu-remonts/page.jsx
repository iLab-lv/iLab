import IphoneWaterDamageServicePage, {
  getIphoneWaterDamageServiceMetadata,
} from './IphoneWaterDamageServicePage';

export const metadata = getIphoneWaterDamageServiceMetadata('lv');

export default function Page({ searchParams }) {
  return <IphoneWaterDamageServicePage locale="lv" searchParams={searchParams} />;
}
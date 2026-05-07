import IphoneWaterDamageServicePage, {
  getIphoneWaterDamageServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/udens-bojajumu-remonts/IphoneWaterDamageServicePage';


export const metadata = getIphoneWaterDamageServiceMetadata('ru');

export default function Page({ searchParams }) {
  return (
  <>
  <IphoneWaterDamageServicePage locale="ru" searchParams={searchParams} />
 
  </>

  );
}
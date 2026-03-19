import IphoneScreenServicePage, {
  getIphoneScreenServiceMetadata,
} from '@site/(catalog)/iphone-remonts/(services)/ekrana-maina/IphoneScreenServicePage';

export const metadata = getIphoneScreenServiceMetadata('ru');

export default async function Page({ searchParams }) {
  return <IphoneScreenServicePage locale="ru" searchParams={searchParams} />;
}
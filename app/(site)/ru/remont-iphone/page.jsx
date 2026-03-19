// app/(site)/(catalog)/ru/remont-iphone/page.jsx
import IphoneRepairPage from '@site/(catalog)/iphone-remonts/IphoneRepairPage';

const CANONICAL_PATH = '/ru/remont-iphone';

export const metadata = {
  title: 'Ремонт iPhone в Риге | iLab',
  description:
    'Ремонт iPhone в Риге — замена экрана, батареи, камеры и разъёма зарядки, устранение последствий попадания влаги. Быстрая диагностика, понятные цены и гарантия 90 дней в сервисе iLab.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <IphoneRepairPage locale="ru" />;
}
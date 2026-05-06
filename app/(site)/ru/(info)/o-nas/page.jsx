import AboutPage from '@site/(info)/par-mums/AboutPage';
import Footer from '@site/ui/footer/Footer';

import { getSiteSettings } from '@/lib/siteSettings';

const CANONICAL_PATH = '/ru/o-nas';

export const metadata = {
  title: 'О iLab | iLab',
  description:
    'SIA iLab - профессиональный сервис по ремонту телефонов и компьютеров в Риге с опытом более 10 лет. Ремонт для частных клиентов и B2B: смартфоны, планшеты, компьютеры, Dyson. Бесплатная диагностика и гарантия 90 дней.',
  alternates: { canonical: CANONICAL_PATH },
};

export default async function Page() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <AboutPage
        locale="ru"
        siteSettings={siteSettings}
      />

      <Footer locale="ru" />
    </>
  );
}
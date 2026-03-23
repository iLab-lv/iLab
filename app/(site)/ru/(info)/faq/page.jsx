import DukPage from '@site/(info)/buj/BujPage';

const CANONICAL_PATH = '/ru/faq';

export const metadata = {
  title: 'Часто задаваемые вопросы | iLab',
  description:
    'iLab — ответы на частые вопросы о ремонте телефонов, iPhone, планшетов, компьютеров и Dyson: диагностика, сроки, гарантия, стоимость и популярные виды ремонта.',
  alternates: { canonical: CANONICAL_PATH },
};

export default function Page() {
  return <DukPage locale="ru" />;
}
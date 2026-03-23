import FaqScreen from './FaqScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FAQ · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FaqScreen />;
}
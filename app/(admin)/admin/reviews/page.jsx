import ReviewsScreen from './ReviewsScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reviews · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReviewsScreen />;
}
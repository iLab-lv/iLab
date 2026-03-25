import DevicesScreen from './DevicesScreen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Devices · Admin · iLab',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DevicesScreen />;
}
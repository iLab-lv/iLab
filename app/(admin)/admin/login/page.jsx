import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Login · iLab Admin',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginForm />;
}

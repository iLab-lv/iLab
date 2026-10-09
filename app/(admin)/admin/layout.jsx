// app/(admin)/layout.jsx
import AdminShell from './AdminShell';
import AccessDenied from './AccessDenied';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServiceAdminSession } from '@/lib/auth/serviceAdminSession';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Admin · iLab',
  robots: { index: false, follow: false },
};


export default async function AdminLayout({ children }) {
  const pathname = (await headers()).get('x-pathname');
  const currentUser = await getServiceAdminSession();

  if (pathname === '/admin/login') {
    if (currentUser?.canAccessServiceAdmin) redirect('/admin');
    return children;
  }

  if (!currentUser) redirect('/admin/login');
  if (!currentUser.canAccessServiceAdmin) return <AccessDenied />;

  return <AdminShell>{children}</AdminShell>;
}

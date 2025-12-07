// app/(admin)/layout.jsx
import AdminShell from './AdminShell';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Admin · iLab',
  robots: { index: false, follow: false },
};


export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}

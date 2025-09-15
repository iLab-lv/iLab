// Server component: wraps all catalog pages with a shared header
import PageHeader from '@ui/page-header/PageHeader';

export const metadata = {
  // You can keep page-level metadata in each page; this is just a safe default.
  title: 'Katalogs | iLab',
};

export default function CatalogLayout({ children }) {
  return (
    <>
      {/* Shared page header (breadcrumbs + H1 + optional image) */}
      <PageHeader />

      {/* Page content */}
      <div>{children}</div>
    </>
  );
}

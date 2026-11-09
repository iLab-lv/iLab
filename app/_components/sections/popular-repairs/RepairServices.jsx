import PopularRepairs from './PopularRepairs';

// Adapter for existing localized title/text/destination lists. No inferred capabilities.
export default function RepairServices({ items = [], locale = 'lv', ...props }) {
  return <PopularRepairs {...props} locale={locale} items={items.map(item => ({
    ...item, description: item.description || item.text,
    actions: item.actions || (item.href ? [{ kind: 'service', href: item.href }] : []),
  }))} />;
}

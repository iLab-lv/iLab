import established from '../catalog-hub/CatalogHubSkin.module.scss';
import s from './ServiceRecovery.module.scss';

const PATTERNS = {
  editorial: 'expert', symptoms: 'expert', rows: 'expert', process: 'process',
  quality: 'quality', services: 'services', benefits: 'genericWhy',
  faq: 'faq', closing: 'closing', genericClosing: 'genericClosing',
  locations: 'locationList', decision: 'expert',
  problems: 'problems', photoWhy: 'why', photoDecision: 'decision', guide: 'guide',
};

export default function ServiceRecovery({ children, className = '', family = 'repair' }) {
  return <div data-service-recovery={family} className={`${s.page} ${className}`}>{children}</div>;
}

export function ServiceBlock({ kind = 'editorial', children, className = '' }) {
  return <div data-service-section={kind} className={`${established.block} ${established[PATTERNS[kind]] || ''} ${s.block} ${s[kind] || ''} ${className}`}>{children}</div>;
}

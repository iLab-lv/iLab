import { getProcessContent } from '@/app/(site)/sections/process/process.i18n';
import ServiceProcess from './ServiceProcess';

// Retain the existing content-variant contract for migrated Service consumers.
export default function Process({ locale = 'lv', variant = 'default', layout = 'timeline', title, steps, ...props }) {
  const content = getProcessContent(locale, variant);
  return <ServiceProcess {...props} locale={locale} variant={layout}
    title={title || content.title} steps={steps?.length ? steps : content.steps} />;
}

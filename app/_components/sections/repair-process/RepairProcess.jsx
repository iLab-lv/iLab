import { getRepairProcessContent } from './RepairProcess.i18n';
import ServiceProcess from '../process/ServiceProcess';

export default function RepairProcess({ id = 'repair-process', locale = 'lv', variant = 'iphone', content: suppliedContent }) {
  const content = suppliedContent || getRepairProcessContent(locale, variant);
  return <ServiceProcess id={id} locale={locale} variant="timeline" eyebrow={content.eyebrow}
    title={<>{content.titleStart}<em>{content.titleAccent}</em></>} subtitle={content.intro} steps={content.steps} />;
}

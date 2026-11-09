import { getRepairProcessContent } from '../repair-process/RepairProcess.i18n';
import ServiceProcess from '../process/ServiceProcess';

export default function HubRepairProcess({ locale = 'lv' }) {
  const content = getRepairProcessContent(locale, 'iphone');
  return <ServiceProcess id="iphone-repair-steps" locale={locale} variant="timeline"
    eyebrow={content.eyebrow} title={<>{content.titleStart}<em>{content.titleAccent}</em></>}
    subtitle={content.intro} steps={content.steps} />;
}

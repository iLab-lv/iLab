import { headingText } from '@/lib/presentation/signatureHeadings';
import s from './SignatureText.module.scss';

export function SignatureAccent({ children, level = 'section' }) {
  return <span className={s.accent} data-signature={level}>{children}</span>;
}

export default function SignatureText({ text, parts, level = 'hero' }) {
  if (!parts || typeof text !== 'string' || headingText(parts) !== text) return text;
  return parts.map((part, index) => typeof part === 'string' ? part : <SignatureAccent key={index} level={level}>{part.accent}</SignatureAccent>);
}

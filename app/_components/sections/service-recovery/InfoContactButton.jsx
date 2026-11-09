'use client';
import { useUiDialogs } from '@/app/(site)/ui/providers/UiDialogsProvider';
import Button from '@components/button/Button';

export default function InfoContactButton({ locale = 'lv' }) {
  const { openContact } = useUiDialogs();
  return <Button variant="secondary" type="button" onClick={event => openContact(event.currentTarget)}>{locale === 'ru' ? 'Связаться с техником' : 'Sazināties ar tehniķi'}</Button>;
}

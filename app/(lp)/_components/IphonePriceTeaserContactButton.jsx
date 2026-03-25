'use client';

import Button from '@components/button/Button';
import { useUiDialogs } from '@ui/providers/UiDialogsProvider';

export default function IphonePriceTeaserContactButton({
  label = 'Sazināties par savu modeli',
}) {
  const { openContact } = useUiDialogs();

  const handleClick = (event) => {
    openContact(event?.currentTarget || null);
  };

  return (
    <Button variant="primary" size="md" onClick={handleClick}>
      {label}
    </Button>
  );
}
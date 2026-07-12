'use client';

import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import Button from '@/app/(site)/components/button/Button';
import s from './FinalCta.module.scss';

export default function FinalCtaActions({ priceHref, phoneHref, whatsappHref, labels }) {
  return (
    <div className={s.actions}>
      <Button href={priceHref} variant="primary" size="lg">{labels.price}</Button>
      <Button href={phoneHref} target="_self" variant="primary" size="lg" leadingIcon={FaPhone}>{labels.call}</Button>
      <Button href={whatsappHref} variant="secondary" size="lg" leadingIcon={FaWhatsapp} className={s.whatsapp}>{labels.whatsapp}</Button>
    </div>
  );
}

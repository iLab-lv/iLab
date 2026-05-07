'use client';

import { usePathname } from 'next/navigation';

import s from './BottomBar.module.scss';
import Button from '../../components/button/Button';
import { useUiDialogs } from '../providers/UiDialogsProvider';
import Controls from '../controls/Controls';
import { getNavLocaleFromPathname } from '../navbar/navigation.helpers';
import { getCtaMainContent } from '../cta-main/ctaMainContent';

export default function BottomBar({ socials = {} }) {
  const pathname = usePathname() || '/';
  const locale = getNavLocaleFromPathname(pathname);
  const cta = getCtaMainContent(locale);

  const {
    contactOpen,
    bookOpen,
    openContact,
    openBook,
    setSelectedLocId,
  } = useUiDialogs();

  return (
    <nav className={s.bottomBar} aria-label={cta.bottomBar.ariaLabel}>
      <div className={s.controlsSlot}>
        <Controls
          facebookUrl={socials.facebook}
          instagramUrl={socials.instagram}
          tiktokUrl={socials.tiktok}
        />
      </div>

      <div className={s.contactSlot}>
        <Button
          variant="secondary"
          size="lg"
          block
          aria-haspopup="dialog"
          aria-controls="sazinaties-panel"
          aria-expanded={contactOpen}
          onClick={(e) => {
            setSelectedLocId(null);
            openContact(e.currentTarget);
          }}
          aria-label={cta.contact.ariaLabel}
        >
          {cta.contact.label}
        </Button>
      </div>

      <div className={s.bookSlot}>
        <Button
          variant="primary"
          size="lg"
          block
          aria-haspopup="dialog"
          aria-controls="pieraksties-panel"
          aria-expanded={bookOpen}
          onClick={(e) => openBook(e.currentTarget)}
          aria-label={cta.booking.ariaLabel}
        >
          {cta.booking.label}
        </Button>
      </div>

      <div className={s.pricesSlot}>
        <Button
          variant="secondary"
          size="lg"
          block
          href={cta.prices.href}
          aria-label={cta.prices.ariaLabel}
        >
          {cta.prices.label}
        </Button>
      </div>
    </nav>
  );
}
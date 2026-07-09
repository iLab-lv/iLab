import {
  FaBolt,
  FaHandshake,
  FaLocationDot,
  FaMagnifyingGlass,
  FaScrewdriverWrench,
  FaShieldHalved,
} from 'react-icons/fa6';

import { LOCATIONS } from '@/data/site.config';

import s from './IphoneQuickFacts.module.scss';

const locationNames = LOCATIONS.map((location) => location.label).join(' un ');

const facts = [
  {
    icon: FaShieldHalved,
    text: '90 dienu garantija',
  },
  {
    icon: FaMagnifyingGlass,
    text: 'Diagnostika pirms remonta',
  },
  {
    icon: FaHandshake,
    text: 'Cena saskaņota pirms darba',
  },
  {
    icon: FaScrewdriverWrench,
    text: 'Oriģinālās / OEM detaļas',
  },
  {
    icon: FaLocationDot,
    text: locationNames,
  },
  {
    icon: FaBolt,
    text: 'Biežākie remonti tajā pašā dienā',
  },
];

export default function IphoneQuickFacts() {
  return (
    <section className={s.section} aria-label="Īsie fakti par iPhone remontu">
      <div className={s.container}>
        <div className={s.band}>
          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div className={s.item} key={fact.text}>
                <span className={s.icon} aria-hidden="true">
                  <Icon />
                </span>

                <span className={s.text}>{fact.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

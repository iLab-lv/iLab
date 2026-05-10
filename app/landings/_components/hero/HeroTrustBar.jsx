// LandingTrustBar.jsx

import {
  HiOutlineShieldCheck,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';

import {
  MdOutlineFaceRetouchingNatural,
  MdOutlineHealthAndSafety,
} from 'react-icons/md';

import s from './HeroTrustBar.module.scss';

const TRUST_ITEMS = [
  {
    icon: MdOutlineFaceRetouchingNatural,
    title: 'Face ID',
    text: 'saglabāšana',
  },
  {
    icon: HiOutlineShieldCheck,
    title: '90 dienu',
    text: 'garantija',
  },
  {
    icon: MdOutlineHealthAndSafety,
    title: 'Diagnostika',
    text: 'bez maksas',
  },
  {
    icon: HiOutlineWrenchScrewdriver,
    title: 'Kvalitatīvas',
    text: 'detaļas',
  },
];

export default function LandingTrustBar({
  items = TRUST_ITEMS,
}) {
  return (
    <ul
      className={s.trustBar}
      aria-label="iLab priekšrocības"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={`${item.title}-${item.text}`}
            className={s.item}
          >
            <span
              className={s.iconWrap}
              aria-hidden="true"
            >
              <Icon className={s.icon} />
            </span>

            <span className={s.copy}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
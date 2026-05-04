const HERO_CONTENT = {
  lv: {
    default: {
      title: 'Jūsu mobilo ierīču un datoru remonta eksperts Rīgā',
      subtitle:
        'Remonts tajā pašā dienā. 90 dienu garantija. Divas filiāles Rīgā: Domina un Spice Home.',
      cta: {
        label: 'Apskatīt pakalpojumus',
        href: '#services',
      },
      secondaryCta: {
        label: 'Pakalpojumu cenas',
        href: '/cenas',
      },
      imageAlt:
        'iLab serviss - mobilo ierīču un datoru remonts Rīgā (Domina un Spice Home)',
    },
  },

  ru: {
    default: {
      title:
        'Ваш эксперт по ремонту мобильных устройств и компьютеров в Риге',
      subtitle:
        'Ремонт в тот же день. Гарантия 90 дней. Два филиала в Риге: Domina и Spice Home.',
      cta: {
        label: 'Посмотреть услуги',
        href: '#services',
      },
      secondaryCta: {
        label: 'Цены на услуги',
        href: '/cenas',
      },
      imageAlt:
        'iLab - ремонт мобильных устройств и компьютеров в Риге (Domina и Spice Home)',
    },
  },
};

export function getHeroContent(locale = 'lv', variant = 'default') {
  return (
    HERO_CONTENT[locale]?.[variant] ||
    HERO_CONTENT.lv?.[variant] ||
    HERO_CONTENT[locale]?.default ||
    HERO_CONTENT.lv.default
  );
}
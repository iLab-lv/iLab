const HERO_CONTENT = {
  lv: {
    default: {
      title: 'Jūsu mobilo ierīču un datoru remonta eksperts Rīgā',
      subtitle:
        'Remonts tajā pašā dienā. garantija līdz 1 gadam. Divas filiāles Rīgā: Domina un Spice Life. Strādājam kopš 2013 gada',
      cta: {
        label: 'Apskatīt pakalpojumus',
        href: '#services',
      },
      secondaryCta: {
        label: 'Pakalpojumu cenas',
        href: '/cenas',
      },
      imageAlt:
        'iLab serviss - mobilo ierīču un datoru remonts Rīgā (Domina un Spice)',
    },
  },

  ru: {
    default: {
      title:
        'Ваш эксперт по ремонту мобильных устройств и компьютеров в Риге',
      subtitle:
        'Ремонт в тот же день. Гарантия до 1 года. Два филиала в Риге: Domina и Spice. Работаем с 2013 года.',
      cta: {
        label: 'Посмотреть услуги',
        href: '#services',
      },
      secondaryCta: {
        label: 'Цены на услуги',
        href: '/cenas',
      },
      imageAlt:
        'iLab - ремонт мобильных устройств и компьютеров в Риге (Domina и Spice)',
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
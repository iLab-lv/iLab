// app/(site)/sections/Why/why.content.js
import {
  TbShieldCheck,
  TbBolt,
  TbCertificate,
  TbSearch,
} from 'react-icons/tb';

const whyContent = {
  lv: {
    title: 'Kāpēc iLab?',
    copy: 'Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.',
    items: [
      { text: '90 dienu garantija', Icon: TbShieldCheck },
      { text: 'Ātrs remonts', Icon: TbBolt },
      { text: 'Sertificēti meistari', Icon: TbCertificate },
      { text: 'Bezmaksas diagnostika', Icon: TbSearch },
    ],
  },

  ru: {
    title: 'Почему iLab?',
    copy: 'Надёжный ремонт, прозрачные цены и быстрые сроки от сертифицированных специалистов.',
    items: [
      { text: 'Гарантия 90 дней', Icon: TbShieldCheck },
      { text: 'Быстрый ремонт', Icon: TbBolt },
      { text: 'Сертифицированные мастера', Icon: TbCertificate },
      { text: 'Бесплатная диагностика', Icon: TbSearch },
    ],
  },
};

export default whyContent;
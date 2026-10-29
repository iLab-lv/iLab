/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { SOCIALS } from '@/data/site.config';
import { getProcessContent } from './sections/process/process.i18n';
import { HomeBookingButton, HomeLocations } from './HomeInteractions';
import s from './HomePage.module.scss';

const COPY = {
  lv: {
    eyebrow: 'iLab / Precīzs remonts / Rīga', title: ['Telefonu un datoru', 'remonts Rīgā.'],
    intro: 'Ātra diagnostika, skaidra cena un kvalitatīvs remonts iPhone, Samsung, Xiaomi, Huawei, planšetdatoriem, datoriem un Dyson ierīcēm.',
    diagnosis: 'Bezmaksas diagnostika', priceProof: 'Cena pirms darba', book: 'Pieteikt remontu', prices: 'Cenas', cue: 'Izvēlies savu ierīci',
    branches: 'Servisa centri Rīgā', services: 'Mūsu pakalpojumi', servicesLead: 'Ekrāni, baterijas, uzlādes porti, mātesplates un optika. Apple, Android, datori, Dyson un fototehnika. Cena saskaņota pirms darba.',
    precisionKicker: 'Diagnostika pirms remonta', precision: ['Nevis minējumi.', 'Precīza diagnostika.'], precisionCopy: 'Vispirms atrodam bojājuma cēloni. Tad izskaidrojam risinājumu, cenu un termiņu - pirms sākam darbu.',
    processLead: 'Pieci soļi. Cenu un termiņu zini pirms sākam.', reviews: 'Klientu atsauksmes', reviewsLead: 'Reāli cilvēki. Reāla pieredze. Rīgā.', viewReviews: 'Skatīt visas atsauksmes',
    why: 'Kāpēc iLab?', whyLead: 'Uzticami remonti, caurspīdīgas cenas un ātrs apgrozījums no sertificētiem tehniķiem.',
    facts: [['1 gads','Garantija līdz 1 gadam darbam un detaļām'],['Šodien','Biežākos darbus paveicam tajā pašā dienā'],['0 €','Bezmaksas diagnostika pirms jebkura darba'],['2013','Sertificēti meistari, strādājam kopš 2013. gada']],
    locationsLead: 'Abas filiāles tirdzniecības centros, ar bezmaksas stāvvietu.', faqAll: 'Visi jautājumi', cta: 'Vajadzīga palīdzība? Atbildam tajā pašā dienā.', ctaCopy: 'Atnes ierīci uz diagnostiku vai piesaki remontu sev ērtā laikā.', contact: 'Sazināties ar tehniķi',
  },
  ru: {
    eyebrow: 'iLab / Точный ремонт / Рига', title: ['Ремонт телефонов', 'и компьютеров в Риге.'],
    intro: 'Быстрая диагностика, понятная цена и качественный ремонт iPhone, Samsung, Xiaomi, Huawei, планшетов, компьютеров и устройств Dyson.',
    diagnosis: 'Бесплатная диагностика', priceProof: 'Цена до начала работ', book: 'Записаться на ремонт', prices: 'Цены', cue: 'Выберите устройство',
    branches: 'Сервисные центры в Риге', services: 'Наши услуги', servicesLead: 'Экраны, аккумуляторы, разъёмы зарядки, платы и оптика. Apple, Android, компьютеры, Dyson и фототехника.',
    precisionKicker: 'Диагностика до ремонта', precision: ['Не догадки.', 'Точная диагностика.'], precisionCopy: 'Сначала находим причину неисправности. Затем объясняем решение, цену и срок — до начала работ.',
    processLead: 'Пять шагов. Цена и срок известны до начала ремонта.', reviews: 'Отзывы клиентов', reviewsLead: 'Реальные люди. Реальный опыт. В Риге.', viewReviews: 'Смотреть все отзывы',
    why: 'Почему iLab?', whyLead: 'Надёжный ремонт, прозрачные цены и быстрые сроки от сертифицированных специалистов.',
    facts: [['1 год','Гарантия до 1 года на работу и детали'],['Сегодня','Частые ремонты выполняем в тот же день'],['0 €','Бесплатная диагностика перед работой'],['2013','Сертифицированные мастера, работаем с 2013 года']],
    locationsLead: 'Оба филиала находятся в торговых центрах с бесплатной парковкой.', faqAll: 'Все вопросы', cta: 'Нужна помощь? Отвечаем в тот же день.', ctaCopy: 'Принесите устройство на диагностику или запишитесь на ремонт.', contact: 'Связаться с техником',
  },
};

function routes(locale) {
  const ru = locale === 'ru';
  return {
    prices: ru ? '/ru/ceny' : '/cenas', booking: ru ? '/ru/zapisatsja-na-remont' : '/pieraksties-remontam', contact: ru ? '/ru/kontakty' : '/kontakti', faq: ru ? '/ru/faq' : '/buj',
    iphone: ru ? '/ru/remont-iphone' : '/iphone-remonts', tablet: ru ? '/ru/remont-planshetov/ipad' : '/plansetdatoru-remonts/ipad', computers: ru ? '/ru/remont-noutbukov' : '/datoru-remonts', phones: ru ? '/ru/remont-telefonov' : '/telefonu-remonts', dyson: ru ? '/ru/remont-dyson' : '/dyson-remonts', cameras: ru ? '/ru/remont-fotoapparatov' : '/fotoaparatu-remonts',
  };
}

function reviewPlaces(summary = {}) {
  return ['domina', 'spice'].map((key) => {
    const value = summary?.[key] || {};
    return { key, name: value.latest?.name || value.name || (key === 'domina' ? 'T/C Domina Shopping' : 'T/C Spice Life'), rating: value.latest?.rating ?? value.rating, count: value.latest?.count ?? value.count, reviews: value.featuredReviewsByLocale || {}, placeId: value.placeId || value.latest?.placeId };
  });
}

export default function HomePage({ locale = 'lv', reviewsSummary, siteSettings, faqTitle, faqItems = [] }) {
  const t = COPY[locale] || COPY.lv;
  const r = routes(locale);
  const process = getProcessContent(locale);
  const locations = siteSettings?.locations || [];
  const totalReviews = reviewPlaces(reviewsSummary).reduce((sum, place) => sum + (Number(place.count) || 0), 0);
  const services = [
    { key: 'apple', tech: 'Apple', title: locale === 'ru' ? 'Ремонт устройств Apple' : 'Apple ierīču remonts', note: 'iPhone · iPad · MacBook · iMac · Mac Pro', body: locale === 'ru' ? 'Замена экрана и аккумулятора, ремонт зарядки и диагностика. Цена согласуется до начала работ.' : 'Veicam ekrāna un baterijas maiņu, uzlādes porta remontu un diagnostiku. Cena tiek saskaņota pirms darba.', image: '/images/home/apple-ecosystem-v2.png', links: [[locale === 'ru' ? 'iPhone' : 'iPhone',r.iphone],['iPad',r.tablet],['MacBook',`${r.computers}/macbook`],['iMac',`${r.computers}/imac`],['Mac Pro',`${r.computers}/mac-pro`]] },
    { key: 'android', tech: 'Android', title: locale === 'ru' ? 'Ремонт телефонов и планшетов' : 'Telefonu un planšetdatoru remonts', note: 'Samsung · Xiaomi · Huawei · OnePlus · Sony', body: locale === 'ru' ? 'Ремонтируем экраны, меняем аккумуляторы и восстанавливаем разъёмы популярных Android-устройств.' : 'Remontējam ekrānus, mainām baterijas un atjaunojam uzlādes savienojumus populārākajām Android ierīcēm.', image: '/images/home/android-phone-tablet-v2.png', links: [['Samsung',`${r.phones}/samsung`],['Xiaomi',`${r.phones}/xiaomi`],['Huawei',`${r.phones}/huawei`]] },
    { key: 'computer', title: locale === 'ru' ? 'Ремонт компьютеров' : 'Datoru remonts', note: 'MacBook · Lenovo · HP · Asus · Dell', body: locale === 'ru' ? 'Замена экранов, клавиатур и аккумуляторов, обслуживание охлаждения, установка SSD.' : 'Ekrāna, klaviatūras un baterijas maiņa, dzesēšanas sistēmas apkope un SSD uzstādīšana.', image: '/images/home/laptop-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt datoru remontu',r.computers]] },
    { key: 'dyson', title: locale === 'ru' ? 'Ремонт Dyson' : 'Dyson remonts', note: locale === 'ru' ? 'Пылесосы · фены · вентиляторы' : 'Putekļsūcēji · fēni · ventilatori', body: locale === 'ru' ? 'Ремонт аккумуляторов, моторов и электроники, устранение проблем всасывания.' : 'Akumulatoru, motoru un elektronikas remonts, sūkšanas defektu novēršana un tīrīšana.', image: '/images/home/dyson-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt Dyson remontu',r.dyson]] },
    { key: 'camera', title: locale === 'ru' ? 'Ремонт фототехники' : 'Fototehnikas remonts', note: locale === 'ru' ? 'Камеры · объективы · вспышки' : 'Fotoaparāti · objektīvi · zibspuldzes', body: locale === 'ru' ? 'Диагностика корпуса, затвора и электроники, ремонт механики объективов и чистка оптики.' : 'Korpusa, slēdža un elektronikas diagnostika, objektīvu mehānikas remonts un optikas tīrīšana.', image: '/images/home/camera-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt fototehnikas remontu',r.cameras]] },
  ];

  return <div className={s.home}>
    <section className={s.hero}>
      <div className={s.heroGrid}>
        <div className={s.heroCopy}><p className={s.eyebrow}>{t.eyebrow}<span>01</span></p><h1>{t.title.map(line => <span key={line}>{line}</span>)}</h1><p className={s.lead}>{t.intro}</p><div className={s.proof}><a href="#reviews"><strong>4.9–5.0</strong> · {totalReviews || '1199'} · Google</a><span>{t.diagnosis}</span><span>{t.priceProof}</span></div><div className={s.actions}><HomeBookingButton className={s.primary}>{t.book}</HomeBookingButton><Link className={s.secondary} href={r.prices}>{t.prices}</Link></div><a className={s.cue} href="#pakalpojumi">↓ {t.cue}</a></div>
        <figure className={s.heroVisual}><img src="/images/home/home-hero-repair.webp" alt={locale === 'ru' ? 'Мастер iLab ремонтирует смартфон' : 'iLab meistars remontē viedtālruni'} /></figure>
      </div>
      <div className={s.heroFoot}><span>{locale === 'ru' ? 'Качественные детали / Точный ремонт' : 'Kvalitatīvas detaļas / Precīzs remonts'}</span><nav>{Object.entries(SOCIALS).map(([name,href]) => <a href={href} target="_blank" rel="noopener noreferrer" key={name}>{name}</a>)}</nav></div>
    </section>

    <section className={`${s.section} ${s.branchStrip}`} aria-label={t.branches}>{locations.map((location,index) => <article key={location.id}><p className={s.branchHead}><span>0{index+1}</span><strong>{location.label}</strong><small>{locale === 'ru' ? 'Сервисный центр iLab' : 'iLab servisa centrs'}</small></p><p className={s.status}><i />{location.hours?.[0] ? `${location.hours[0].opens}–${location.hours[0].closes}` : ''}</p><a className={s.phone} href={location.telLink || `tel:${location.tel}`}>{location.tel}</a><address>{location.address}</address></article>)}</section>

    <section className={s.section} id="pakalpojumi"><header className={s.sectionHead}><h2>{t.services}</h2><p>{t.servicesLead}</p></header><div className={s.services}>{services.map((service,index) => <article className={`${s.service} ${index < 2 ? s.featured : ''}`} key={service.key}><div className={s.serviceMedia}><img src={service.image} alt="" loading="lazy" /></div><div className={s.serviceBody}><div>{service.tech && <p className={s.tech}>{service.tech}</p>}<h3>{service.title}</h3><p className={s.note}>{service.note}</p></div><div><p>{service.body}</p><nav>{service.links.map(([label,href]) => <Link href={href} key={href}>{label}</Link>)}</nav></div></div></article>)}</div></section>

    <section className={s.precision}><p>{t.precisionKicker}</p><h2>{t.precision.map(line => <span key={line}>{line}</span>)}</h2><p>{t.precisionCopy}</p></section>
    <section className={s.section} id="process"><div className={s.processLayout}><header><h2>{process.title}</h2><p>{t.processLead}</p></header><ol>{process.steps.map((step,index) => <li key={step.title}><span>{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

    <section className={`${s.section} ${s.reviews}`} id="reviews"><header className={s.reviewHead}><div><h2>{t.reviews}</h2><p>{t.reviewsLead}<small>{totalReviews || '1199'} Google</small></p></div><img src="/images/logos/Google-Review-Logo.webp" alt="Google Reviews" /></header><div className={s.reviewGrid}>{reviewPlaces(reviewsSummary).map((place,index) => { const reviews = place.reviews?.[locale] || place.reviews?.lv || []; return <article key={place.key}><p className={s.branchHead}><span>0{index+1}</span><strong>{place.name}</strong></p><div className={s.rating}><strong>{place.rating ? Number(place.rating).toFixed(1) : '–'}</strong><p>★★★★★<small>{place.count || 0} Google</small></p></div>{reviews.slice(0,4).map((review,i) => <blockquote key={review.id || i}><p>{review.text}</p><footer>{review.author}</footer></blockquote>)}{place.placeId && <a className={s.more} target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.placeId}`}>→ {t.viewReviews}</a>}</article>; })}</div></section>

    <section className={`${s.section} ${s.benefits}`}><header><h2>{t.why}</h2><p>{t.whyLead}</p></header><div>{t.facts.map(([number,label]) => <article key={number}><strong>{number}</strong><span>{label}</span></article>)}</div></section>
    <section className={s.section} id="locations"><header className={s.sectionHead}><h2>{t.branches}</h2><p>{t.locationsLead}</p></header><HomeLocations locale={locale} locations={locations} pinPositions={siteSettings?.pinPositions || {}} /></section>
    {faqItems.length > 0 && <section className={s.section} id="buj"><header className={s.sectionHead}><h2>{faqTitle}</h2><Link href={r.faq}>{t.faqAll}</Link></header><div className={s.faq}>{faqItems.slice(0,6).map(({q,a},index) => <details key={q} open={index === 0}><summary>{q}<i /></summary><div>{typeof a === 'string' ? <p dangerouslySetInnerHTML={{__html:a}} /> : a}</div></details>)}</div></section>}
    <section className={s.finalCta}><div><h2>{t.cta}</h2><p>{t.ctaCopy}</p></div><div className={s.actions}><Link className={s.secondary} href={r.contact}>{t.contact}</Link><HomeBookingButton className={s.primary}>{t.book}</HomeBookingButton></div></section>
  </div>;
}

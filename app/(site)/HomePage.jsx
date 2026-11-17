import QuickTrustFacts from '@/_components/sections/quick-facts/QuickTrustFacts';
import { getQuickTrustFacts } from '@/_components/sections/quick-facts/quickTrustFacts.content';
import QuickContacts from '@/_components/sections/quick-contacts/QuickContacts';
import FullLocations from '@/_components/sections/full-locations/FullLocations';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { SOCIALS } from '@/data/site.config';
import { getProcessContent } from './sections/process/process.i18n';
import { HomeBookingButton } from './HomeInteractions';
import Button from './components/button/Button';
import HomeServices from './HomeServices';
import ServiceReviews from '@/app/_components/sections/reviews/ServiceReviews';
import HeroReviewsBadge from '@/app/_components/sections/reviews/HeroReviewsBadge';
import MetricsWhy from '@/app/_components/sections/why/MetricsWhy';
import { getMetricsWhyContent } from '@/app/_components/sections/why/metricsWhy.content';
import ServiceFaq from '@/_components/sections/faq/ServiceFaq';
import ServiceProcess from '@/app/_components/sections/process/ServiceProcess';
import { FaFacebook, FaInstagram, FaTiktok, FaLocationDot } from 'react-icons/fa6';
import s from './HomePage.module.scss';
import SignatureText from '@/_components/sections/headings/SignatureText';

const COPY = {
  lv: {
    eyebrow: 'iLab / Precīzs remonts / Rīga', title: ['Telefonu un datoru', 'remonts Rīgā.'],
    intro: 'Ātra diagnostika, skaidra cena un kvalitatīvs remonts iPhone, Samsung, Xiaomi, Huawei, planšetdatoriem, datoriem un Dyson ierīcēm.',
    book: 'Pieteikt remontu', prices: 'Cenas', ourServices: 'Mūsu servisi',
    branches: 'Servisa centri Rīgā', services: 'Mūsu pakalpojumi', servicesLead: 'Ekrāni, baterijas, uzlādes porti, mātesplates un optika. Apple, Android, datori, Dyson un fototehnika. Cena saskaņota pirms darba.',
    precisionKicker: 'Diagnostika pirms remonta', precision: ['Nevis minējumi.', 'Precīza diagnostika.'], precisionCopy: 'Vispirms atrodam bojājuma cēloni. Tad izskaidrojam risinājumu, cenu un termiņu - pirms sākam darbu.',
    processLead: 'Pieci soļi. Cenu un termiņu zini pirms sākam.', reviews: 'Klientu atsauksmes', reviewsLead: 'Reāli cilvēki. Reāla pieredze. Rīgā.', viewReviews: 'Skatīt visas atsauksmes',
    locationsLead: 'Abas filiāles tirdzniecības centros, ar bezmaksas stāvvietu.', faqAll: 'Visi jautājumi', cta: 'Vajadzīga palīdzība? Atbildam tajā pašā dienā.', ctaCopy: 'Atnes ierīci uz diagnostiku vai piesaki remontu sev ērtā laikā.', contact: 'Sazināties ar tehniķi',
  },
  ru: {
    eyebrow: 'iLab / Точный ремонт / Рига', title: ['Ремонт телефонов', 'и компьютеров в Риге.'],
    intro: 'Быстрая диагностика, понятная цена и качественный ремонт iPhone, Samsung, Xiaomi, Huawei, планшетов, компьютеров и устройств Dyson.',
    book: 'Записаться на ремонт', prices: 'Цены', ourServices: 'Наши сервисы',
    branches: 'Сервисные центры в Риге', services: 'Наши услуги', servicesLead: 'Экраны, аккумуляторы, разъёмы зарядки, платы и оптика. Apple, Android, компьютеры, Dyson и фототехника.',
    precisionKicker: 'Диагностика до ремонта', precision: ['Не догадки.', 'Точная диагностика.'], precisionCopy: 'Сначала находим причину неисправности. Затем объясняем решение, цену и срок — до начала работ.',
    processLead: 'Пять шагов. Цена и срок известны до начала ремонта.', reviews: 'Отзывы клиентов', reviewsLead: 'Реальные люди. Реальный опыт. В Риге.', viewReviews: 'Смотреть все отзывы',
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

export default function HomePage({ locale = 'lv', reviewsSummary, siteSettings, faqTitle, faqItems = [] }) {
  const t = COPY[locale] || COPY.lv;
  const r = routes(locale);
  const process = getProcessContent(locale);
  const locations = siteSettings?.locations || [];
  const heroLocations = locations.filter(location => location.id === 'domina' || location.id === 'spice');
  const services = [
    { key: 'apple', tech: 'Apple', title: locale === 'ru' ? 'Ремонт устройств Apple' : 'Apple ierīču remonts', note: 'iPhone · iPad · MacBook · iMac · Mac Pro', body: locale === 'ru' ? 'Замена экрана и аккумулятора, ремонт зарядки и диагностика. Цена согласуется до начала работ.' : 'Veicam ekrāna un baterijas maiņu, uzlādes porta remontu un diagnostiku. Cena tiek saskaņota pirms darba.', image: '/images/home/apple-ecosystem-v2.png', links: [[locale === 'ru' ? 'iPhone' : 'iPhone',r.iphone],['iPad',r.tablet],['MacBook',`${r.computers}/macbook`],['iMac',`${r.computers}/imac`],['Mac Pro',`${r.computers}/mac-pro`]] },
    { key: 'android', tech: 'Android', title: locale === 'ru' ? 'Ремонт телефонов и планшетов' : 'Telefonu un planšetdatoru remonts', note: 'Samsung · Xiaomi · Huawei · OnePlus · Sony', body: locale === 'ru' ? 'Ремонтируем экраны, меняем аккумуляторы и восстанавливаем разъёмы популярных Android-устройств.' : 'Remontējam ekrānus, mainām baterijas un atjaunojam uzlādes savienojumus populārākajām Android ierīcēm.', image: '/images/home/android-phone-tablet-v2.png', links: [['Samsung',`${r.phones}/samsung`],['Xiaomi',`${r.phones}/xiaomi`],['Huawei',`${r.phones}/huawei`]] },
    { key: 'computer', title: locale === 'ru' ? 'Ремонт компьютеров' : 'Datoru remonts', note: 'MacBook · Lenovo · HP · Asus · Dell', body: locale === 'ru' ? 'Замена экранов, клавиатур и аккумуляторов, обслуживание охлаждения, установка SSD.' : 'Ekrāna, klaviatūras un baterijas maiņa, dzesēšanas sistēmas apkope un SSD uzstādīšana.', image: '/images/home/laptop-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt datoru remontu',r.computers]] },
    { key: 'dyson', title: locale === 'ru' ? 'Ремонт Dyson' : 'Dyson remonts', note: locale === 'ru' ? 'Пылесосы · фены · вентиляторы' : 'Putekļsūcēji · fēni · ventilatori', body: locale === 'ru' ? 'Ремонт аккумуляторов, моторов и электроники, устранение проблем всасывания.' : 'Akumulatoru, motoru un elektronikas remonts, sūkšanas defektu novēršana un tīrīšana.', image: '/images/home/dyson-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt Dyson remontu',r.dyson]] },
    { key: 'camera', title: locale === 'ru' ? 'Ремонт фототехники' : 'Fototehnikas remonts', note: locale === 'ru' ? 'Камеры · объективы · вспышки' : 'Fotoaparāti · objektīvi · zibspuldzes', body: locale === 'ru' ? 'Диагностика корпуса, затвора и электроники, ремонт механики объективов и чистка оптики.' : 'Korpusa, slēdža un elektronikas diagnostika, objektīvu mehānikas remonts un optikas tīrīšana.', image: '/images/home/camera-repair-wide.png', links: [[locale === 'ru' ? 'Смотреть ремонт' : 'Apskatīt fototehnikas remontu',r.cameras]] },
  ];

  const precisionSection = <section className={s.precision} id="precision" aria-labelledby="precision-title"><div className={s.precisionGrid}><p>{t.precisionKicker}</p><h2 id="precision-title" data-home-statement>{t.precision.map((line, index) => <span key={line}>{index === 1 ? <SignatureText text={line} parts={[{ accent: line }]} level="section" /> : line}</span>)}</h2><p>{t.precisionCopy}</p></div></section>;
  const serviceSection = <HomeServices title={t.services} headingParts={locale === 'ru' ? ['Наши ', { accent: 'услуги' }] : ['Mūsu ', { accent: 'pakalpojumi' }]} lead={t.servicesLead} services={services.map((service, index) => ({
    ...service,
    href: [r.iphone, r.phones, r.computers, r.dyson, r.cameras][index],
  }))} />;
  const socialIcons = {facebook: FaFacebook, instagram: FaInstagram, tiktok: FaTiktok};
  const socialLabels = {facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok'};

  return <div className={s.home} data-homepage lang={locale}>
    <section className={s.hero} id="home-hero">
      <div className={s.heroGrid}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}><span>{t.eyebrow}</span><span>01</span></p>
          <HeroReviewsBadge locale={locale} reviewsSummary={reviewsSummary} locations={locations} />
          <h1 data-rise data-rise-lines>{t.title.map((line, index) => <span key={line}>{index === (locale === 'ru' ? 0 : 1)
            ? <SignatureText text={line} parts={locale === 'ru' ? [{ accent: 'Ремонт телефонов' }] : [{ accent: 'remonts Rīgā.' }]} />
            : line}</span>)}</h1>
          <p className={s.lead}>{t.intro}</p>
          <div className={s.actions} data-stagger><HomeBookingButton>{t.book}</HomeBookingButton><Button variant="secondary" glow href={r.prices}>{t.prices}</Button></div>
          {heroLocations.length > 0 && <nav className={s.heroLocations} aria-label={t.branches}>
            <span className={s.locationLabel}>{t.ourServices}</span>
            {heroLocations.map(location => <span className={s.locationEntry} key={location.id}>
              <span className={s.locationSeparator} aria-hidden="true">·</span>
              <a href="#locations" data-location-id={location.id} aria-label={location.label + ' — ' + t.branches}><FaLocationDot aria-hidden="true" />{String(location.label || '').replace(/^T\/C\s+/i, '')}</a>
            </span>)}
          </nav>}
        </div>
        <figure className={s.heroVisual}><div data-scan="x"><img data-home-hero-image src="/images/home/home-hero-repair.webp" width="1600" height="900" fetchPriority="high" decoding="async" alt={locale === 'ru' ? 'Мастер iLab ремонтирует смартфон' : 'iLab meistars remontē viedtālruni'} /></div></figure>
      </div>
      <div className={s.heroFoot}><span>{locale === 'ru' ? 'Качественные детали / Точный ремонт' : 'Kvalitatīvas detaļas / Precīzs remonts'}</span><nav aria-label={locale === 'ru' ? 'Социальные сети iLab' : 'iLab sociālie tīkli'}>{Object.entries(SOCIALS).map(([name,href]) => {const Icon = socialIcons[name]; return <a href={href} target="_blank" rel="noopener noreferrer" key={name}>{Icon && <Icon aria-hidden="true" />}<span>{socialLabels[name] || name}</span></a>;})}</nav></div>
    </section>

    <QuickTrustFacts id="home-trust" {...getQuickTrustFacts('home', locale)} />
    <QuickContacts id="home-branches" locale={locale} locations={locations} defaultHours={siteSettings?.hours || []} />
    {locale === 'ru' && precisionSection}
    {serviceSection}
    {locale !== 'ru' && precisionSection}

    <ServiceReviews variant="full" locale={locale} reviewsSummary={reviewsSummary} title={t.reviews} subtitle={t.reviewsLead} />

    <ServiceProcess variant="sticky" locale={locale} title={process.title} subtitle={t.processLead} steps={process.steps} />

    <MetricsWhy {...getMetricsWhyContent(locale)} />
    <FullLocations id="locations" title={t.branches} subtitle={t.locationsLead} locale={locale} locations={locations} pinPositions={siteSettings?.pinPositions || {}} defaultHours={siteSettings?.hours || []} />
    <ServiceFaq id="buj" limit={6} items={faqItems} title={faqTitle} href={r.faq} linkLabel={t.faqAll} />
    <section className={s.finalCta} id="home-help"><div className={s.finalCtaGrid}><div><h2><SignatureText text={t.cta} level="section" parts={locale === 'ru' ? ['Нужна помощь? Отвечаем ', { accent: 'в тот же день.' }] : ['Vajadzīga palīdzība? Atbildam ', { accent: 'tajā pašā dienā.' }]} /></h2><p>{t.ctaCopy}</p></div><div className={s.actions} data-stagger><Button glow href={r.contact}>{t.contact}</Button><HomeBookingButton variant="text" className={s.textAction}>{t.book}</HomeBookingButton></div></div></section>
  </div>;
}

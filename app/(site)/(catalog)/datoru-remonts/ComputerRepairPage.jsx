import Script from 'next/script';

import Services from '@sections/services/Services';
import {
  buildComputerPopularServices,
  getComputerPopularServicesTitle,
} from '@sections/services/services.i18n';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import BrandList from '@sections/brand-list/BrandList';
import Reviews from '@sections/reviews/Reviews';

import categories from '@/data/categories';

import s from './DatoruCategory.module.scss';

import {
  abs,
  buildBreadcrumbsLd,
  buildServiceLdForCity,
} from '@/lib/seo/jsonldHelpers';
import { buildCategoryHref } from '@/lib/routes/routeI18n';

const ORIGIN = 'https://www.ilab.lv';

const computerCategory = categories.find((c) => c.slug === 'datoru-remonts');

function getPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт компьютеров в Риге',
      heroBodyHtml:
        '<p><strong>Быстрый и безопасный ремонт компьютеров в Риге</strong> — ноутбуки и настольные компьютеры, экран, клавиатура, охлаждение, диски и программное обеспечение. Бесплатная диагностика и <strong>гарантия 90 дней</strong>.</p>',
      introTitle: 'Ремонт компьютеров — что мы делаем',
      introLead:
        'Ремонтируем ноутбуки и настольные компьютеры — экран, клавиатура, система охлаждения, жёсткие диски/SSD и программное обеспечение. Стоимость и сроки согласовываем до начала работ, самые частые ремонты выполняем в тот же день.',
      introP1:
        'Ежедневно выполняем <strong>ремонт компьютеров</strong>: <strong>замену экрана</strong>, <strong>замену клавиатуры</strong>, <strong>чистку от пыли и замену термопасты</strong>, <strong>замену жёсткого диска/SSD</strong>, <strong>переустановку операционной системы</strong> и удаление вирусов. До начала работ согласовываем <strong>стоимость и сроки</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process">«Как проходит ремонт»</a>.',
      introP2:
        'Работаем с <strong>популярными брендами</strong>: MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI и другими. Выберите бренд ниже, чтобы открыть страницу конкретной модели, или свяжитесь с нами, если не уверены в модели своего компьютера.',
      breadcrumbName: 'Ремонт компьютеров',
      serviceName: 'Ремонт компьютеров',
      serviceDescription:
        'Ремонт компьютеров — диагностика и ремонт ноутбуков и настольных компьютеров: экран, клавиатура, охлаждение, диски, операционная система и другие неисправности. Быстрая диагностика, понятные цены, гарантия.',
      popularServicesTitle: getComputerPopularServicesTitle(locale),
      appleTitle: 'Ремонт компьютеров Apple',
      appleIntro:
        'Ремонтируем все компьютеры Apple — от ноутбуков MacBook и iMac до рабочих станций Mac Pro. Выполняем профессиональную диагностику, замену повреждённых деталей, чистку системы охлаждения и улучшение производительности. Помогаем также с установкой SSD, переустановкой macOS и другими неисправностями — полный сервис Apple в одном месте.',
      otherTitle: 'Другие бренды, которые мы ремонтируем',
      otherIntro:
        'Ремонтируем также популярные компьютеры на Windows и других производителей: Lenovo, HP, Dell, Asus, Acer, MSI и другие. Выберите бренд, чтобы посмотреть услуги и оставить заявку на ремонт.',
      faqTitle: 'Часто задаваемые вопросы',
      faqItems: [
        {
          q: 'Сколько длится ремонт компьютера?',
          a: 'Более простые работы часто готовы в тот же или на следующий день. Для более сложного ремонта срок определяем после диагностики.',
        },
        {
          q: 'Будут ли мои данные в безопасности?',
          a: 'По возможности сохраняем данные. Перед ремонтом рекомендуем сделать резервную копию или уточнить у мастера возможность копирования данных.',
        },
        {
          q: 'Есть ли гарантия на детали?',
          a: 'Да, и на детали, и на выполненную работу предоставляем гарантию, обычно 90 дней.',
        },
        {
          q: 'Что делать, если компьютер перегревается или очень шумит?',
          a: 'Чаще всего требуется чистка системы охлаждения и замена термопасты. После диагностики точно скажем, что нужно сделать.',
        },
        {
          q: 'Можно ли узнать примерную цену до ремонта?',
          a: 'Да, после быстрой диагностики назовём диапазон стоимости и срок. Для более сложных неисправностей цену уточняем после тестов.',
        },
      ],
    };
  }

  return {
    heroAlt: 'datoru remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ātrs un drošs datoru remonts Rīgā</strong> — portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
    introTitle: 'Datoru remonts — ko mēs darām',
    introLead:
      'Remontējam portatīvos un galda datorus — ekrāns, tastatūra, dzesēšanas sistēma, cietie diski/SSD un programmatūra. Cenu un termiņu saskaņojam pirms darba uzsākšanas, biežākos remontus paveicam tajā pašā dienā.',
    introP1:
      'Ikdienā veicam <strong>datoru remontu</strong>: <strong>ekrāna maiņu</strong>, <strong>tastatūras nomaiņu</strong>, <strong>putekļu tīrīšanu un termopastas maiņu</strong>, <strong>cieto disku/SSD nomaiņu</strong>, <strong>operētājsistēmas pārinstalēšanu</strong> un vīrusu noņemšanu. Pirms darba saskaņojam <strong>cenu un termiņu</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process">“Kā notiek remonts”</a>.',
    introP2:
      'Strādājam ar <strong>populārākajiem zīmoliem</strong>: MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI u.c. Izvēlies zīmolu zemāk un atver konkrēta modeļa lapu vai sazinies ar mums, ja neesi pārliecināts par sava datora modeli.',
    breadcrumbName: 'Datoru remonts',
    serviceName: 'Datoru remonts',
    serviceDescription:
      'Datoru remonts — portatīvo un galda datoru diagnostika un remonts: ekrāns, tastatūra, dzesēšana, diski, operētājsistēma un citi bojājumi. Ātra diagnostika, godīgas cenas, garantija.',
    popularServicesTitle: getComputerPopularServicesTitle(locale),
    appleTitle: 'Apple datoru remonts',
    appleIntro:
      'Remontējam visus Apple datorus — no MacBook portatīvajiem un iMac līdz Mac Pro darba stacijām. Veicam profesionālu diagnostiku, bojāto detaļu maiņu, dzesēšanas sistēmas tīrīšanu un veiktspējas uzlabošanu. Palīdzam arī ar SSD uzstādīšanu, macOS pārinstalāciju un citu problēmu novēršanu — pilns Apple datoru serviss vienuviet.',
    otherTitle: 'Citi zīmoli, ko remontējam',
    otherIntro:
      'Remontējam arī populārākos Windows un citu ražotāju datorus: Lenovo, HP, Dell, Asus, Acer, MSI u.c. Izvēlies zīmolu, lai apskatītu pakalpojumus un atstātu pieteikumu remontam.',
    faqTitle: 'Biežāk uzdotie jautājumi',
    faqItems: [
      {
        q: 'Cik ilgi ilgst datoru remonts?',
        a: 'Vienkāršāki darbi bieži ir gatavi tajā pašā vai nākamajā dienā. Sarežģītākiem remontiem termiņu nosakām pēc diagnostikas.',
      },
      {
        q: 'Vai mani dati būs drošībā?',
        a: 'Iespēju robežās saglabājam datus. Pirms remonta iesakām izveidot rezerves kopiju vai jautāt meistaram par datu dublēšanas iespējām.',
      },
      {
        q: 'Vai detaļām ir garantija?',
        a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju, parasti 90 dienas.',
      },
      {
        q: 'Ko darīt, ja dators pārkarst vai ir ļoti skaļš?',
        a: 'Visbiežāk nepieciešama dzesēšanas sistēmas tīrīšana un termopastas maiņa. Pēc diagnostikas pateiksim precīzi, kas jādara.',
      },
      {
        q: 'Vai varu saņemt aptuvenu cenu pirms remonta?',
        a: 'Jā, pēc ātras diagnostikas nosauksim izmaksu diapazonu un termiņu. Sarežģītākiem bojājumiem cenas precizējam pēc testiem.',
      },
    ],
  };
}

export function getComputerRepairMetadata(locale = 'lv') {
  if (locale === 'ru') {
    return {
      title: 'Ремонт компьютеров в Риге — ноутбуки и настольные ПК | iLab',
      description:
        'Ремонт компьютеров в Риге: ноутбуки и настольные ПК. Экран, клавиатура, охлаждение, диски и программные неисправности. Быстрая диагностика, честные цены, гарантия 90 дней.',
      alternates: { canonical: '/ru/remont-kompjuterov' },
    };
  }

  return {
    title: 'Datoru remonts Rīgā — portatīvie un galda datori | iLab',
    description:
      'Datoru remonts Rīgā: portatīvie un galda datori. Ekrāna, tastatūras, dzesēšanas, disku un programmatūras problēmu risināšana. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
    alternates: { canonical: '/datoru-remonts' },
  };
}

export default function ComputerRepairPage({ locale = 'lv' }) {
  const strings = getPageStrings(locale);
  const basePath = buildCategoryHref(locale, 'datoru-remonts');
  const popularServices = buildComputerPopularServices(locale);

  const breadcrumbsLd = buildBreadcrumbsLd([
    { name: 'Sākums', url: abs('/') },
    { name: strings.breadcrumbName, url: abs(basePath) },
  ]);

  const serviceLd = buildServiceLdForCity({
    path: basePath,
    name: strings.serviceName,
    description: strings.serviceDescription,
  });

  const itemListLd =
    computerCategory && computerCategory.brands
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: computerCategory.brands.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${ORIGIN}${basePath}/${b.brandSlug}/`,
            name: `${b.name} datoru remonts`,
          })),
        }
      : null;

  return (
    <>
      <Script id="breadcrumbs-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbsLd)}
      </Script>
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      {itemListLd && (
        <Script id="itemlist-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(itemListLd)}
        </Script>
      )}

      <main className={s.main}>
        <DeviceHero
          image="/images/categories/datoru_remonts.webp"
          alt={strings.heroAlt}
          focal="right"
          className="category"
          bodyHtml={strings.heroBodyHtml}
        />

        <section className={s.section} aria-labelledby="computers-intro-h2">
          <div className={s.container}>
            <h2 id="computers-intro-h2" className={s.h2}>
              {strings.introTitle}
            </h2>

            <p className={s.leadText}>{strings.introLead}</p>

            <p dangerouslySetInnerHTML={{ __html: strings.introP1 }} />

            <p dangerouslySetInnerHTML={{ __html: strings.introP2 }} />
          </div>
        </section>

        <section className={s.section} aria-labelledby="popular-services-h2">
          <div className={s.container}>
            <Services
              id="computer-services"
              title={strings.popularServicesTitle}
              items={popularServices}
            />
          </div>
        </section>

        {computerCategory && computerCategory.brands && (
          <BrandList
            id="brand-list"
            basePath={basePath}
            appleTitle={strings.appleTitle}
            appleIntro={strings.appleIntro}
            otherTitle={strings.otherTitle}
            otherIntro={strings.otherIntro}
            brands={computerCategory.brands}
          />
        )}

        <Reviews locale={locale} />
        <Process locale={locale} />

        <section className={s.section}>
          <Why locale={locale} />
        </section>

        <section className={s.section} aria-labelledby="faq-h2">
          <div className={s.container}>
            <Faq
              id="computers-faq"
              title={strings.faqTitle}
              items={strings.faqItems}
              headingLevel={2}
              variant="accordion"
              locale={locale}
            />
          </div>
        </section>

        <section className={s.section}>
          <ConvertBand locale={locale} />
        </section>
      </main>
    </>
  );
}
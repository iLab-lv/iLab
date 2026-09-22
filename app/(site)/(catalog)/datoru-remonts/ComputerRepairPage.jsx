import PageHeader from '@/app/(site)/ui/page-header/PageHeader';

import Services from '@sections/services/Services';
import Process from '@sections/process/Process';
import Faq from '@sections/faq/Faq';
import Why from '@sections/why/Why';
import ConvertBand from '@sections/convert-band/ConvertBand';
import DeviceHero from '@sections/device-hero/DeviceHero';
import BrandList from '@sections/brand-list/BrandList';
import Reviews from '@sections/reviews/Reviews';

import {
  getComputerPopularServicesTitle,
} from '@sections/services/services.i18n';

import s from './DatoruCategory.module.scss';

export function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.lv ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

export function getComputerPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      heroAlt: 'ремонт компьютеров в Риге',
      heroBodyHtml:
        '<p><strong>Быстрый и безопасный ремонт компьютеров в Риге</strong> - ноутбуки и настольные компьютеры, экран, клавиатура, охлаждение, диски и программное обеспечение. Бесплатная диагностика и <strong>гарантия до 1 года</strong>.</p>',
      introTitle: 'Ремонт компьютеров - что мы делаем',
      introLead:
        'Ремонтируем ноутбуки и настольные компьютеры - экран, клавиатура, система охлаждения, жёсткие диски/SSD и программное обеспечение. Стоимость и сроки согласовываем до начала работ, самые частые ремонты выполняем в тот же день.',
      introP1:
        'Ежедневно выполняем <strong>ремонт компьютеров</strong>: <strong>замену экрана</strong>, <strong>замену клавиатуры</strong>, <strong>чистку от пыли и замену термопасты</strong>, <strong>замену жёсткого диска/SSD</strong>, <strong>переустановку операционной системы</strong> и удаление вирусов. До начала работ согласовываем <strong>стоимость и сроки</strong>. Узнайте, как проходит ремонт, в разделе <a href="#process">«Как проходит ремонт»</a>.',
      introP2:
        'Работаем с <strong>популярными брендами</strong>: MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI и другими. Выберите бренд ниже, чтобы открыть страницу конкретной модели, или свяжитесь с нами, если не уверены в модели своего компьютера.',
      breadcrumbName: 'Ремонт компьютеров',
      serviceName: 'Ремонт компьютеров',
      serviceDescription:
        'Ремонт компьютеров - диагностика и ремонт ноутбуков и настольных компьютеров: экран, клавиатура, охлаждение, диски, операционная система и другие неисправности. Быстрая диагностика, понятные цены, гарантия.',
      serviceType: 'Ремонт компьютеров',
      metaTitle:
        'Ремонт компьютеров в Риге - ноутбуки и настольные ПК | iLab',
      metaDescription:
        'Ремонт компьютеров в Риге: ноутбуки и настольные ПК. Экран, клавиатура, охлаждение, диски и программные неисправности. Быстрая диагностика, честные цены, гарантия до 1 года.',
      popularServicesTitle: getComputerPopularServicesTitle(locale),
      appleTitle: 'Ремонт компьютеров Apple',
      appleIntro:
        'Ремонтируем все компьютеры Apple - от ноутбуков MacBook и iMac до рабочих станций Mac Pro. Выполняем профессиональную диагностику, замену повреждённых деталей, чистку системы охлаждения и улучшение производительности. Помогаем также с установкой SSD, переустановкой macOS и другими неисправностями - полный сервис Apple в одном месте.',
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
          a: 'Да, и на детали, и на выполненную работу предоставляем гарантию, до 1 года.',
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
      processTitle: 'Как проходит ремонт',
      processSteps: [
        {
          title: 'Диагностика',
          text: 'Проверяем устройство, определяем неисправность и уточняем возможные варианты ремонта.',
        },
        {
          title: 'Цена и срок',
          text: 'Согласовываем стоимость и срок выполнения до начала работ.',
        },
        {
          title: 'Ремонт',
          text: 'Выполняем ремонт, замену деталей, чистку, настройку системы или программные работы.',
        },
        {
          title: 'Проверка',
          text: 'После ремонта тестируем устройство и основные функции.',
        },
        {
          title: 'Гарантия',
          text: 'Выдаём устройство с гарантией на выполненную работу и установленные детали.',
        },
      ],
      scrollCta: { label: 'Смотреть бренды', targetId: 'brand-list' },
      fallbackTitle: 'Ремонт компьютеров в Риге',
      imageAlt: 'Ремонт компьютеров в Риге',
    };
  }

  return {
    heroAlt: 'datoru remonts Rīgā',
    heroBodyHtml:
      '<p><strong>Ātrs un drošs datoru remonts Rīgā</strong> - portatīvie un galda datori, ekrāns, tastatūra, dzesēšana, diski un programmatūra. Bezmaksas diagnostika un <strong>garantija līdz 1 gadam</strong>.</p>',
    introTitle: 'Datoru remonts - ko mēs darām',
    introLead:
      'Remontējam portatīvos un galda datorus - ekrāns, tastatūra, dzesēšanas sistēma, cietie diski/SSD un programmatūra. Cenu un termiņu saskaņojam pirms darba uzsākšanas, biežākos remontus paveicam tajā pašā dienā.',
    introP1:
      'Ikdienā veicam <strong>datoru remontu</strong>: <strong>ekrāna maiņu</strong>, <strong>tastatūras nomaiņu</strong>, <strong>putekļu tīrīšanu un termopastas maiņu</strong>, <strong>cieto disku/SSD nomaiņu</strong>, <strong>operētājsistēmas pārinstalēšanu</strong> un vīrusu noņemšanu. Pirms darba saskaņojam <strong>cenu un termiņu</strong>. Uzzini, kā notiek remonts sadaļā <a href="#process">“Kā notiek remonts”</a>.',
    introP2:
      'Strādājam ar <strong>populārākajiem zīmoliem</strong>: MacBook, iMac, Lenovo, HP, Dell, Asus, Acer, MSI u.c. Izvēlies zīmolu zemāk un atver konkrēta modeļa lapu vai sazinies ar mums, ja neesi pārliecināts par sava datora modeli.',
    breadcrumbName: 'Datoru remonts',
    serviceName: 'Datoru remonts',
    serviceDescription:
      'Datoru remonts - portatīvo un galda datoru diagnostika un remonts: ekrāns, tastatūra, dzesēšana, diski, operētājsistēma un citi bojājumi. Ātra diagnostika, godīgas cenas, garantija.',
    serviceType: 'Datoru remonts',
    metaTitle: 'Datoru remonts Rīgā - portatīvie un galda datori | iLab',
    metaDescription:
      'Datoru remonts Rīgā: portatīvie un galda datori. Ekrāna, tastatūras, dzesēšanas, disku un programmatūras problēmu risināšana. Ātra diagnostika, godīgas cenas, garantija līdz 1 gadam.',
    popularServicesTitle: getComputerPopularServicesTitle(locale),
    appleTitle: 'Apple datoru remonts',
    appleIntro:
      'Remontējam visus Apple datorus - no MacBook portatīvajiem un iMac līdz Mac Pro darba stacijām. Veicam profesionālu diagnostiku, bojāto detaļu maiņu, dzesēšanas sistēmas tīrīšanu un veiktspējas uzlabošanu. Palīdzam arī ar SSD uzstādīšanu, macOS pārinstalāciju un citu problēmu novēršanu - pilns Apple datoru serviss vienuviet.',
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
        a: 'Jā, gan detaļām, gan veiktajam darbam piešķiram garantiju, parasti līdz 1 gadam.',
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
    processTitle: 'Kā notiek remonts',
    processSteps: [
      {
        title: 'Diagnostika',
        text: 'Pārbaudām ierīci, nosakām bojājumu un precizējam iespējamos remonta risinājumus.',
      },
      {
        title: 'Cena un termiņš',
        text: 'Saskaņojam izmaksas un izpildes laiku pirms darba uzsākšanas.',
      },
      {
        title: 'Remonts',
        text: 'Veicam remontu, detaļu maiņu, tīrīšanu, sistēmas uzstādīšanu vai programmatūras darbus.',
      },
      {
        title: 'Pārbaude',
        text: 'Pēc remonta testējam ierīci un galvenās funkcijas.',
      },
      {
        title: 'Garantija',
        text: 'Izsniedzam ierīci ar garantiju veiktajam darbam un uzstādītajām detaļām.',
      },
    ],
    scrollCta: { label: 'Skatīt zīmolus', targetId: 'brand-list' },
    fallbackTitle: 'Datoru remonts Rīgā',
    imageAlt: 'Datoru remonts Rīgā',
  };
}

export default function ComputerRepairPage({
  locale = 'lv',
  page,
  basePath,
  headerTitle,
  headerLead,
  breadcrumbs,
  brands = [],
  faqTitle,
  faqItems = [],
  labels,
  popularServices = [],
  heroImage = '/images/categories/datoru_remonts.webp',
  heroHtml,
}) {
  if (!page) {
    return null;
  }

  const strings = labels || getComputerPageStrings(locale);
  const safeHeroHtml = heroHtml || strings.heroBodyHtml;

  return (
    <>
      <PageHeader
        title={headerTitle}
        lead={headerLead}
        crumbs={breadcrumbs}
        scrollCta={strings.scrollCta}
      />

      <main className={s.main}>
        <DeviceHero
          image={heroImage}
          alt={strings.heroAlt}
          focal="right"
          className="category"
          bodyHtml={safeHeroHtml}
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

        {brands.length > 0 && (
          <BrandList
            id="brand-list"
            basePath={basePath}
            appleTitle={strings.appleTitle}
            appleIntro={strings.appleIntro}
            otherTitle={strings.otherTitle}
            otherIntro={strings.otherIntro}
            brands={brands}
            locale={locale}
          />
        )}

        {page.sections?.hasReviews && <Reviews locale={locale} />}
        {page.sections?.hasProcess && <Process locale={locale} />}

        {page.sections?.hasWhy && (
          <section className={s.section}>
            <Why locale={locale} />
          </section>
        )}

        {page.sections?.hasFaq && faqItems.length > 0 && (
          <section className={s.section} aria-labelledby="faq-h2">
            <div className={s.container}>
              <Faq
                id="computers-faq"
                title={faqTitle || strings.faqTitle}
                items={faqItems}
                headingLevel={2}
                variant="accordion"
                locale={locale}
              />
            </div>
          </section>
        )}

        {page.sections?.hasConvertBand && (
          <section className={s.section}>
            <ConvertBand locale={locale} />
          </section>
        )}
      </main>
    </>
  );
}
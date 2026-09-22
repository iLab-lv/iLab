import PageHeader from '@/app/(site)/ui/page-header/PageHeader';
import ConvertBand from '@sections/convert-band/ConvertBand';

import s from '@styles/Catalog.module.scss';

export const UPDATED_DATE = '2025-11-05';

export function getTermsPageStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      breadcrumbHome: 'Главная',
      breadcrumbPage: 'Условия использования и политика конфиденциальности',

      metaTitle: 'Условия использования и политика конфиденциальности | iLab',
      metaDescription:
        'Условия использования iLab, гарантия, защита данных и политика cookies. Узнайте, как обрабатываются данные клиентов и как предоставляются услуги.',

      headerTitle: 'Условия использования и политика конфиденциальности',
      headerLead:
        'На этой странице собраны условия использования сайта iLab, правила гарантии, обработка данных клиентов и политика cookies.',

      tosName: 'iLab - Условия использования и политика конфиденциальности',
      tosDescription:
        'Условия использования iLab, гарантия, обработка данных клиентов и политика cookies.',
      inLanguage: 'ru',
      canonicalPath: '/ru/pravila',

      updatedLabel: 'Последнее обновление:',
      providerLabel: 'Поставщик услуг:',
      addressLabel: 'Адрес:',
      branchLabel: 'Дополнительный филиал:',
      emailLabel: 'Э-почта:',
      phoneLabel: 'Телефон:',

      section1: '1. Общая информация',
      section1Text:
        'Настоящие условия регулируют использование сайта <strong>www.ilab.lv</strong> («Сайт») и услуг, предоставляемых SIA “iLab” в сервисных центрах в Риге. Посещая или используя Сайт, пользователь соглашается с настоящими условиями, а также с политикой cookies и конфиденциальности.',

      section2: '2. Описание услуг',
      section2Text:
        'iLab выполняет диагностику и ремонт мобильных телефонов, планшетов, ноутбуков и устройств Dyson. Все работы проводятся на месте в наших сервисных центрах с использованием качественных запчастей и проверенных методов. Сайт носит информационный характер - онлайн-покупки и платежи на нём не осуществляются.',

      section3: '3. Цены и диагностика',
      section3Text:
        'Цены, указанные на Сайте, являются ориентировочными и могут отличаться в зависимости от модели устройства и характера неисправности. Точная стоимость и срок ремонта подтверждаются после диагностики. Диагностика обычно бесплатна, если клиент решает продолжить ремонт.',

      section4: '4. Условия гарантии',
      section4Text:
        'Стандартная гарантия: <strong>до 1 года</strong> на заменённые детали и выполненные ремонтные работы, если в квитанции не указано иное. Гарантия распространяется только на дефекты, возникшие по причине качества детали или выполненной работы. Гарантия не распространяется на повреждения, вызванные влагой, ударом, механическим повреждением или действиями пользователя, а также если устройство вскрывалось в другом сервисе. Для гарантийного ремонта необходимо предъявить квитанцию iLab.',
      section4Text2:
        'Перед ремонтом рекомендуется создать резервную копию данных; iLab не несёт ответственности за потерю данных во время ремонта.',

      section5: '5. Обработка данных клиентов и конфиденциальность',
      section5Text:
        'Предоставленные клиентом данные (имя, телефон, электронная почта, информация об устройстве) используются только для связи и организации ремонта. Данные не передаются третьим лицам, кроме случаев, когда этого требует закон. Более подробная информация доступна в разделе «Политика конфиденциальности».',

      section6: '6. Политика cookies и аналитики',
      section6Text:
        'На Сайте используются необходимые cookies, обеспечивающие базовую функциональность страницы (выбор языка, стабильность сессии), а также аналитические cookies, которые помогают улучшать пользовательский опыт. Аналитика осуществляется с помощью Google Analytics 4, при этом данные обрабатываются анонимно. Пользователь может в любой момент удалить или заблокировать cookies в браузере. Продолжая использовать Сайт, пользователь соглашается с использованием cookies в соответствии с настоящими условиями.',

      section7: '7. Интеллектуальная собственность',
      section7Text:
        'Все тексты, изображения, логотипы и элементы дизайна на Сайте являются собственностью SIA “iLab” и защищены авторским правом. Их нельзя копировать, воспроизводить или распространять без письменного разрешения.',

      section8: '8. Ограничение ответственности',
      section8Text:
        'Хотя iLab стремится обеспечивать актуальную и точную информацию, компания не гарантирует, что вся информация на Сайте всегда является полной или актуальной. iLab не несёт ответственности за прямые или косвенные убытки, возникшие в результате использования Сайта или технических сбоев.',

      section9: '9. Изменения условий',
      section9Text:
        'iLab оставляет за собой право в любое время изменять настоящие условия без предварительного уведомления. Актуальная версия всегда доступна на этой странице, а дата её вступления в силу указана выше.',

      section10: '10. Контакты',
      contactsHours: 'Время работы:',
    };
  }

  return {
    breadcrumbHome: 'Sākums',
    breadcrumbPage: 'Lietošanas noteikumi un privātuma politika',

    metaTitle: 'Lietošanas noteikumi un privātuma politika | iLab',
    metaDescription:
      'iLab lietošanas noteikumi, garantija, datu aizsardzība un sīkdatņu politika. Uzzini, kā tiek apstrādāti klientu dati un sniegti pakalpojumi.',

    headerTitle: 'Lietošanas noteikumi un privātuma politika',
    headerLead:
      'Šajā lapā apkopoti iLab vietnes lietošanas noteikumi, garantijas nosacījumi, klientu datu apstrāde un sīkdatņu politika.',

    tosName: 'iLab - Lietošanas noteikumi un privātuma politika',
    tosDescription:
      'iLab lietošanas noteikumi, garantijas, klientu datu apstrāde un sīkdatņu politika.',
    inLanguage: 'lv',
    canonicalPath: '/noteikumi',

    updatedLabel: 'Pēdējo reizi atjaunināts:',
    providerLabel: 'Pakalpojuma sniedzējs:',
    addressLabel: 'Adrese:',
    branchLabel: 'Papildu filiāle:',
    emailLabel: 'E-pasts:',
    phoneLabel: 'Tālrunis:',

    section1: '1. Vispārīgā informācija',
    section1Text:
      'Šie noteikumi regulē vietnes <strong>www.ilab.lv</strong> (“Vietne”) lietošanu un pakalpojumus, ko sniedz SIA “iLab” servisa centros Rīgā. Apmeklējot vai izmantojot Vietni, lietotājs piekrīt šiem noteikumiem, kā arī sīkdatņu un privātuma politikai.',

    section2: '2. Pakalpojuma raksturojums',
    section2Text:
      'iLab nodrošina mobilo tālruņu, planšetdatoru, portatīvo datoru un Dyson ierīču diagnostiku un remontu. Visi darbi tiek veikti uz vietas mūsu servisa centros, izmantojot kvalitatīvas rezerves daļas un pārbaudītas metodes. Vietne kalpo informatīviem nolūkiem - tajā netiek veikti tiešsaistes pirkumi vai maksājumi.',

    section3: '3. Cenas un diagnostika',
    section3Text:
      'Cenas, kas norādītas Vietnē, ir informatīvas un var atšķirties atkarībā no ierīces modeļa un bojājuma rakstura. Precīzas izmaksas un remonta ilgums tiek apstiprināts pēc diagnostikas. Diagnostika parasti ir bez maksas, ja klients izvēlas turpināt remontu.',

    section4: '4. Garantijas noteikumi',
    section4Text:
      'Standarta garantija: <strong>līdz 1 gadam</strong> attiecībā uz nomainītajām detaļām un veiktajiem remontdarbiem, ja kvītī nav norādīts citādi. Garantija attiecas tikai uz defektiem, kas radušies detaļas vai darba kvalitātes dēļ. Garantija neattiecas uz bojājumiem, ko izraisījis mitrums, trieciens, mehānisks vai lietotāja radīts bojājums, vai ja ierīce tikusi atvērta citā servisā. Garantijas remontam nepieciešams uzrādīt iLab remonta kvīti.',
    section4Text2:
      'Pirms remonta ieteicams izveidot datu rezerves kopiju; iLab neatbild par datu zudumu remonta laikā.',

    section5: '5. Klientu datu apstrāde un konfidencialitāte',
    section5Text:
      'Klienta sniegtie dati (vārds, telefons, e-pasts, ierīces informācija) tiek izmantoti tikai saziņai un remonta organizēšanai. Dati netiek nodoti trešajām personām, izņemot gadījumus, kad to pieprasa likums. Sīkāka informācija atrodama sadaļā “Privātuma politika”.',

    section6: '6. Sīkdatņu un analītikas politika',
    section6Text:
      'Vietnē tiek izmantotas nepieciešamās sīkdatnes, kas nodrošina lapas pamatfunkcionalitāti (valodas izvēli, sesijas stabilitāti), kā arī analītiskās sīkdatnes, kas palīdz uzlabot lietošanas pieredzi. Analītika tiek veikta, izmantojot Google Analytics 4, un dati tiek apstrādāti anonīmi. Lietotājs jebkurā brīdī var dzēst vai bloķēt sīkdatnes pārlūkprogrammā. Turpinot izmantot Vietni, lietotājs piekrīt sīkdatņu izmantošanai atbilstoši šiem noteikumiem.',

    section7: '7. Intelektuālais īpašums',
    section7Text:
      'Visi teksti, attēli, logotipi un dizaina elementi Vietnē ir SIA “iLab” īpašums un aizsargāti ar autortiesībām. Tos nedrīkst kopēt, reproducēt vai izplatīt bez rakstiskas atļaujas.',

    section8: '8. Atbildības ierobežojums',
    section8Text:
      'Lai gan iLab cenšas nodrošināt aktuālu un precīzu informāciju, uzņēmums negarantē, ka visa Vietnē esošā informācija vienmēr ir pilnīga vai aktuāla. iLab neuzņemas atbildību par tiešiem vai netiešiem zaudējumiem, kas radušies Vietnes izmantošanas vai tehnisku traucējumu dēļ.',

    section9: '9. Noteikumu grozījumi',
    section9Text:
      'iLab patur tiesības jebkurā laikā mainīt šos noteikumus bez iepriekšēja brīdinājuma. Aktuālā versija vienmēr pieejama šajā lapā, un tās spēkā stāšanās datums ir norādīts augšpusē.',

    section10: '10. Kontakti',
    contactsHours: 'Darba laiks:',
  };
}

export default function TermsPage({
  locale = 'lv',
  labels,
  breadcrumbs = [],
}) {
  const strings = labels || getTermsPageStrings(locale);

  return (
    <>
      <PageHeader
        title={strings.headerTitle}
        lead={strings.headerLead}
        crumbs={breadcrumbs}
      />

      <section className={s.section} aria-labelledby="terms-h2">
        <div className={s.container}>
          <p className={s.paragraph}>
            <strong>{strings.updatedLabel}</strong> {UPDATED_DATE}
            <br />
            <strong>{strings.providerLabel}</strong> SIA “iLab” · Reģ. nr. 40203288307
            <br />
            <strong>{strings.addressLabel}</strong> Ieriķu iela 3 (Domina Shopping), Rīga
            <br />
            <strong>{strings.branchLabel}</strong> Spice Life - Jaunmoku iela 13, Rīga
            <br />
            <strong>{strings.emailLabel}</strong> info@ilab.lv | 
            <strong>{strings.phoneLabel}</strong> 23370088
          </p>

          <h2 id="terms-h2" className={s.h2}>
            {strings.breadcrumbPage}
          </h2>

          <h3 className={s.h3}>{strings.section1}</h3>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.section1Text }}
          />

          <h3 className={s.h3}>{strings.section2}</h3>
          <p className={s.paragraph}>{strings.section2Text}</p>

          <h3 className={s.h3}>{strings.section3}</h3>
          <p className={s.paragraph}>{strings.section3Text}</p>

          <h3 className={s.h3}>{strings.section4}</h3>
          <p
            className={s.paragraph}
            dangerouslySetInnerHTML={{ __html: strings.section4Text }}
          />
          <p className={s.paragraph}>{strings.section4Text2}</p>

          <h3 className={s.h3}>{strings.section5}</h3>
          <p className={s.paragraph}>{strings.section5Text}</p>

          <h3 className={s.h3}>{strings.section6}</h3>
          <p className={s.paragraph}>{strings.section6Text}</p>

          <h3 className={s.h3}>{strings.section7}</h3>
          <p className={s.paragraph}>{strings.section7Text}</p>

          <h3 className={s.h3}>{strings.section8}</h3>
          <p className={s.paragraph}>{strings.section8Text}</p>

          <h3 className={s.h3}>{strings.section9}</h3>
          <p className={s.paragraph}>{strings.section9Text}</p>

          <h3 className={s.h3}>{strings.section10}</h3>
          <p className={s.paragraph}>
            SIA “iLab” · Reģ. nr. 40203288307
            <br />
            {strings.emailLabel} info@ilab.lv | {strings.phoneLabel} 23370088
            <br />
            {strings.addressLabel} Ieriķu iela 3 (Domina Shopping), Rīga
            <br />
            {strings.contactsHours} P.–Sv. 10:00–21:00
            <br />
            {strings.branchLabel} Spice Life - Jaunmoku iela 13, Rīga
          </p>
        </div>
      </section>

      <section className={s.section}>
        <ConvertBand locale={locale} />
      </section>
    </>
  );
}

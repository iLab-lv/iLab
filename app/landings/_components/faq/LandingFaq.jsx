'use client';

import s from './LandingFaq.module.scss';

function normalizeLocale(locale) {
    return locale === 'ru' ? 'ru' : 'lv';
}

function sanitizeHtml(html = '') {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '');
}

function getContent(locale) {
    if (normalizeLocale(locale) === 'ru') {
        return {
            title: 'Частые вопросы',
            subtitle:
                'Коротко о сроках, гарантии, деталях и том, что важно знать перед ремонтом iPhone.',
            items: [
                {
                    q: 'Сколько занимает ремонт iPhone?',
                    a: 'Самые популярные ремонты iPhone — замена дисплея, аккумулятора, разъёма зарядки или камеры — часто выполняем в тот же день. Во многих случаях работа занимает примерно 20–60 минут, если нужная деталь есть в наличии в сервисе.',
                },
                {
                    q: 'Можно ли приехать без записи?',
                    a: 'Да, можно приехать без предварительной записи в T/C Domina Shopping или T/C Spice Home. Но если хотите не ждать и сразу понять ориентировочную цену, лучше заранее написать или позвонить — мы проверим наличие детали под вашу модель.',
                },
                {
                    q: 'Сохраняются ли Face ID и True Tone после ремонта?',
                    a: 'При правильной замене дисплея мы стараемся сохранить Face ID и True Tone, если эти функции работали до ремонта и повреждение не затронуло связанные модули. Перед ремонтом мастер проверит устройство и объяснит, что можно сохранить в вашем конкретном случае.',
                },
                {
                    q: 'Какая гарантия на ремонт iPhone?',
                    a: 'На выполненный ремонт и установленные детали предоставляется гарантия. Срок гарантии зависит от вида ремонта и выбранной детали, но для популярных работ обычно действует гарантия до 90 дней.',
                },
                {
                    q: 'Какие детали вы используете для ремонта?',
                    a: 'Мы предлагаем несколько вариантов деталей: оригинальные, восстановленные оригинальные или качественные совместимые аналоги — в зависимости от модели iPhone, наличия и бюджета. Перед ремонтом объясним разницу по цене, качеству изображения, чувствительности сенсора и сроку службы.',
                },
                {
                    q: 'Удалятся ли данные с iPhone во время ремонта?',
                    a: 'Обычно при замене экрана, аккумулятора, камеры или разъёма зарядки данные не удаляются. Мы не сбрасываем телефон без необходимости. Но если устройство сильно повреждено или было залито жидкостью, перед ремонтом по возможности рекомендуем сделать резервную копию.',
                },
            ],
        };
    }

    return {
        title: 'Biežāk uzdotie jautājumi',
        subtitle:
            'Svarīgākais par remonta laiku, garantiju, detaļām un to, kas jāzina pirms iPhone remonta.',
        items: [
            {
                q: 'Cik ilgi aizņem iPhone remonts?',
                a: 'Populārākos iPhone remontus — displeja, baterijas, uzlādes ligzdas vai kameras maiņu — bieži paveicam tajā pašā dienā. Daudzos gadījumos remonts aizņem aptuveni 20–60 minūtes, ja nepieciešamā detaļa ir pieejama servisā.',
            },
            {
                q: 'Vai var ierasties bez pieraksta?',
                a: 'Jā, vari ierasties bez iepriekšēja pieraksta T/C Domina Shopping vai T/C Spice Home servisā. Tomēr, ja vēlies izvairīties no gaidīšanas un uzreiz uzzināt orientējošu cenu, iesakām pirms braukšanas uzrakstīt vai piezvanīt — pārbaudīsim detaļas pieejamību tavam modelim.',
            },
            {
                q: 'Vai pēc remonta saglabājas Face ID un True Tone?',
                a: 'Veicot korektu displeja maiņu, cenšamies saglabāt gan Face ID, gan True Tone funkcionalitāti, ja šīs funkcijas darbojās pirms remonta un bojājums nav skāris saistītos moduļus. Pirms remonta meistars pārbaudīs ierīci un paskaidros, ko iespējams saglabāt konkrētajā gadījumā.',
            },
            {
                q: 'Kāda garantija ir iPhone remontam?',
                a: 'Remontam un uzstādītajām detaļām nodrošinām garantiju. Garantijas termiņš ir atkarīgs no remonta veida un izvēlētās detaļas, bet populārākajiem remontiem parasti nodrošinām garantiju līdz 90 dienām.',
            },
            {
                q: 'Kādas detaļas izmantojat remontā?',
                a: 'Piedāvājam vairākus detaļu variantus — oriģinālas, atjaunotas oriģinālās vai kvalitatīvas alternatīvās detaļas atkarībā no iPhone modeļa, pieejamības un budžeta. Pirms remonta paskaidrosim atšķirības cenā, attēla kvalitātē, skārienjutībā un kalpošanas ilgumā.',
            },
            {
                q: 'Vai remonta laikā pazudīs dati?',
                a: 'Parasti displeja, baterijas, kameras vai uzlādes ligzdas maiņas laikā dati netiek dzēsti. Telefonu bez vajadzības nepārinstalējam un neatiestatām. Ja ierīce ir stipri bojāta vai bijusi mitrumā, pirms remonta pēc iespējas iesakām izveidot rezerves kopiju.',
            },
        ],
    };
}

export default function LandingFaq({
    id = 'faq',
    locale = 'lv',
    title,
    items,
}) {
    const content = getContent(locale);

    const sectionTitle = title || content.title;
    const sectionItems =
        Array.isArray(items) && items.length > 0
            ? items
            : content.items;

    return (
        <section
            id={id}
            className={s.section}
            aria-labelledby={`${id}-title`}
        >
            <div className={s.container}>
                <div className={s.header}>
                    <h2 id={`${id}-title`}>{sectionTitle}</h2>
                    <p>{content.subtitle}</p>
                </div>

                <div className={s.faqList}>
                    {sectionItems.map(({ q, a }, index) => {
                        const isHtmlString =
                            typeof a === 'string' &&
                            /<\/?[a-z][\s\S]*>/i.test(a);

                        return (
                            <details
                                key={`${id}-${index}-${q}`}
                                className={s.item}
                                open={index === 0}
                            >
                                <summary className={s.summary}>
                                    <span>{q}</span>
                                    <span className={s.chevron} aria-hidden="true" />
                                </summary>

                                <div className={s.answer}>
                                    {typeof a === 'string' ? (
                                        isHtmlString ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(a),
                                                }}
                                            />
                                        ) : (
                                            <p>{a}</p>
                                        )
                                    ) : (
                                        a
                                    )}
                                </div>
                            </details>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
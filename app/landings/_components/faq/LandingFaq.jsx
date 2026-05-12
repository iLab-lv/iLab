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
                'Коротко о сроках ремонта, гарантии и оригинальных деталях.',
            items: [
                {
                    q: 'Сколько длится ремонт iPhone?',
                    a: 'Популярные ремонты обычно выполняем в течение 20–60 минут, если нужная деталь есть в наличии.',
                },
                {
                    q: 'Даете ли вы гарантию?',
                    a: 'Да, на ремонты и установленные детали предоставляется гарантия.',
                },
                {
                    q: 'Сохраняется ли Face ID после ремонта?',
                    a: 'Да, при корректном ремонте стараемся сохранить Face ID и True Tone.',
                },
                {
                    q: 'Нужна ли запись заранее?',
                    a: 'Нет, можно приехать без записи, но перед визитом лучше уточнить наличие деталей.',
                },
                {
                    q: 'Какие детали вы используете?',
                    a: 'Предлагаем как оригинальные, так и качественные совместимые детали в зависимости от модели и бюджета.',
                },
            ],
        };
    }

    return {
        title: 'Biežāk uzdotie jautājumi',
        subtitle:
            'Svarīgākais par remonta laiku, garantiju un detaļām.',
        items: [
            {
                q: 'Cik ilgi notiek iPhone remonts?',
                a: 'Populārākos remontus bieži paveicam 20–60 minūšu laikā, ja detaļa ir pieejama uz vietas.',
            },
            {
                q: 'Vai dodat garantiju?',
                a: 'Jā, remontiem un uzstādītajām detaļām nodrošinām garantiju.',
            },
            {
                q: 'Vai pēc remonta saglabājas Face ID?',
                a: 'Jā, korekta remonta gadījumā cenšamies saglabāt Face ID un True Tone funkcionalitāti.',
            },
            {
                q: 'Vai nepieciešams pieraksts?',
                a: 'Nē, vari ierasties bez pieraksta, taču pirms braukšanas iesakām precizēt detaļu pieejamību.',
            },
            {
                q: 'Kādas detaļas jūs izmantojat?',
                a: 'Piedāvājam gan oriģinālās, gan kvalitatīvas alternatīvās detaļas atkarībā no modeļa un budžeta.',
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
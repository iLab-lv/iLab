/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { HomeReview, HomeStars } from './HomeInteractions';
import { HomeProcess } from './HomeMotion';
import s from './HomePage.module.scss';

export function HomeRepairProcess({process, lead}) { const t={processLead:lead}; return (<section className={s.section} id="process"><div className={s.processLayout}><header><h2>{process.title}</h2><p>{t.processLead}</p></header><HomeProcess steps={process.steps} /></div></section>); }
export function HomeReviews({places, locale, t, totalReviews, reviewWord}) { return (<section className={s.section + ' ' + s.reviews} id="reviews">
      <header className={s.reviewHead}><div><h2>{t.reviews}</h2><p>{t.reviewsLead}{totalReviews != null && <small>{totalReviews} {reviewWord} · Google</small>}</p></div><div className={s.googleMark}><img src="/images/home/google-logo-white.png" alt="Google" width="3748" height="1328" loading="lazy" decoding="async" /></div></header>
      <div className={s.reviewGrid}>{places.map((place,index) => { const reviews = place.reviews?.[locale] || place.reviews?.lv || []; return <article key={place.key}>
        <p className={s.branchHead}><span>0{index+1}</span><strong>{place.name}</strong><small>{locale === 'ru' ? 'Сервисный центр iLab · Рига' : 'iLab servisa centrs · Rīga'}</small></p>
        <div className={s.rating}><strong><span data-count={place.rating != null ? Number(place.rating).toFixed(1) : undefined}>{place.rating != null ? Number(place.rating).toFixed(1) : '–'}</span><small>/ 5</small></strong><div>{place.rating != null && <HomeStars rating={Number(place.rating)} large />}{place.count != null && <span>{place.count} {reviewWord}</span>}</div></div>
        <div className={s.reviewList} data-home-reviews>{reviews.slice(0,4).map((review,i) => <HomeReview review={review} locale={locale} key={review.id || i} />)}</div>
        {place.placeId && <a className={s.more} target="_blank" rel="noopener noreferrer" href={'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + place.placeId}><svg viewBox="0 0 32 10" aria-hidden="true"><path d="M0 5h30M26 1l4 4-4 4" /></svg>{t.viewReviews}</a>}
      </article>; })}</div>
    </section>); }
export function HomeFaq({faqItems=[], faqTitle, href, linkLabel, limit=6, id='buj'}) { if(!faqItems.length) return null; return (<section className={s.section} id={id}><header className={s.sectionHead}><h2>{faqTitle}</h2>{href && <Link className={s.textLink} href={href}>{linkLabel}</Link>}</header><div className={s.faq}>{faqItems.slice(0,limit).map(({q,a},index) => <details key={q} open={index === 0}><summary>{q}<i aria-hidden="true" /></summary><div>{typeof a === 'string' ? <p dangerouslySetInnerHTML={{__html:a}} /> : a}</div></details>)}</div></section>); }

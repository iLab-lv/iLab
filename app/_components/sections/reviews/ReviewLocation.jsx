'use client';

import { useEffect, useLayoutEffect, useId, useRef, useState } from 'react';
import { HomeReview, HomeStars } from '@/app/(site)/HomeInteractions';
import { getReviewWindow } from './serviceReviews.model';
import home from '@/app/(site)/HomePage.module.scss';
import s from './ServiceReviews.module.scss';

export default function ReviewLocation({ place, index, variant, locale, copy }) {
  const compact = variant === 'compact';
  const [page, setPage] = useState(0);
  const list = useRef(null), previousPage = useRef(0), paginationAnchor = useRef(null);
  const listId = useId();
  const pageWindow = getReviewWindow(place.reviews, page);
  const reviews = compact ? pageWindow.items : place.reviews.slice(0, 4);

  useLayoutEffect(() => {
    if (compact && list.current) list.current.dispatchEvent(new CustomEvent('ilab:reviews-change', { bubbles: true }));
    const anchor = paginationAnchor.current;
    paginationAnchor.current = null;
    if (!anchor || !list.current) return;
    // Preserve the activated control's viewport position while the new pair and
    // its expansion controls settle. CSS alone still determines every row size.
    let expectedScroll = globalThis.window.scrollY, timer;
    const stop = () => { observer.disconnect(); clearTimeout(timer); };
    const keepPosition = () => {
      // Do not override a visitor's own scrolling during the pair transition.
      if (Math.abs(globalThis.window.scrollY - expectedScroll) > 1) { stop(); return; }
      const delta = anchor.button.getBoundingClientRect().top - anchor.top;
      if (Math.abs(delta) > .5) globalThis.window.scrollBy({ top: delta, behavior: 'instant' });
      expectedScroll = globalThis.window.scrollY;
    };
    const observer = new ResizeObserver(keepPosition);
    observer.observe(list.current);
    keepPosition();
    timer = setTimeout(stop, 400);
    return stop;
  }, [compact, page]);

  useEffect(() => {
    if (!compact || page === previousPage.current) return;
    previousPage.current = page;
    const media = globalThis.window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !list.current?.animate) return;
    const animation = list.current.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
    const stop = () => { if (media.matches) animation.cancel(); };
    media.addEventListener('change', stop);
    return () => { animation.cancel(); media.removeEventListener('change', stop); };
  }, [compact, page]);

  const renderReviews = (items) => items.map((review, i) => <HomeReview key={review.id || `${page}-${i}`} review={review} locale={locale} />);
  const changePage = (direction, event) => {
    if (direction < 0 ? !pageWindow.previous : !pageWindow.next) return;
    const button = event.currentTarget, box = button.getBoundingClientRect();
    if (box.top >= 0 && box.bottom <= globalThis.window.innerHeight) paginationAnchor.current = { button, top: box.top };
    setPage(page + direction);
  };
  return <article className={s.location} data-review-location={place.key}>
    <p className={home.branchHead}><span>0{index + 1}</span><strong>{place.label}</strong><small>{copy.location}</small></p>
    <div className={home.rating} data-review-rating>
      <strong><span data-count={place.rating != null ? Number(place.rating).toFixed(1) : undefined}>{place.rating != null ? Number(place.rating).toFixed(1) : '–'}</span><small>/ 5</small></strong>
      <div>{place.rating != null && <HomeStars rating={Number(place.rating)} large />}{place.count != null && <span>{place.count} {copy.word}</span>}</div>
    </div>
    <div className={s.reviewArea} data-review-pagination={compact || undefined}>
      <div ref={list} id={listId} className={`${home.reviewList} ${s.list}`} data-home-reviews>
        {renderReviews(reviews)}
        {!reviews.length && <p>{copy.empty}</p>}
      </div>
    </div>
    {compact && place.reviews.length > 2 && <nav className={s.pagination} aria-label={`${copy.position}: ${place.label}`}>
      {/* Keep boundary arrows focusable so a pair change never drops keyboard focus. */}
      <button type="button" aria-controls={listId} aria-label={`${copy.previous}: ${place.label}`} aria-disabled={!pageWindow.previous} onClick={event => changePage(-1, event)}>←</button>
      <output aria-live="polite" aria-atomic="true">{pageWindow.feedback}</output>
      <button type="button" aria-controls={listId} aria-label={`${copy.next}: ${place.label}`} aria-disabled={!pageWindow.next} onClick={event => changePage(1, event)}>→</button>
    </nav>}
    {place.href && <a className={home.more} target="_blank" rel="noopener noreferrer" href={place.href}><svg viewBox="0 0 32 10" aria-hidden="true"><path d="M0 5h30M26 1l4 4-4 4" /></svg>{copy.all}</a>}
  </article>;
}

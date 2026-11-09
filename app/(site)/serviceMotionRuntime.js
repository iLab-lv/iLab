// Native equivalent of the approved assets/js/motion.js. All content is visible
// before enhancement; every animation, observer and inline style has a teardown.
const clamp = value => Math.max(0, Math.min(1, value));
const expo = 'cubic-bezier(.16,1,.3,1)';

export function startServiceMotion(root) {
  const main = root?.querySelector('main');
  if (!main || !Element.prototype.animate) return () => {};
  const all = (selector, scope = main) => [...scope.querySelectorAll(selector)];
  const cleanups = [], animations = new Set(), pending = new Map();
  let disposed = false, frame = 0;
  const animate = (element, frames, options = {}) => {
    const animation = element.animate(frames, { duration: 900, easing: expo, fill: 'both', ...options });
    animations.add(animation);
    animation.finished.then(() => {
      // Persist only the requested final word opacity, never hidden entrance states.
      if (options.persist && !disposed) element.style.opacity = String(frames.at(-1).opacity);
      animation.cancel(); animations.delete(animation);
    }).catch(() => {});
    return animation;
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    pending.get(entry.target)?.(); pending.delete(entry.target); observer.unobserve(entry.target);
  }), { rootMargin: '0px 0px -15% 0px' });
  const reveal = (element, frames, options = {}, threshold = .85) => {
    const top = element.getBoundingClientRect().top;
    if (top < innerHeight * threshold) {
      animate(element, frames, { delay: Math.max(0, Math.min(900, top / innerHeight * 900)), ...options });
    } else {
      const animation = animate(element, frames, options);
      animation.pause(); animation.currentTime = 0;
      pending.set(element, () => animation.play()); observer.observe(element);
    }
  };
  const scan = root.querySelector('[data-page-scan]');
  if (scan) animate(scan, [{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${innerHeight}px)`, opacity: 1, offset: .85 }, { transform: `translateY(${innerHeight}px)`, opacity: 0 }], { duration: 1050, easing: 'cubic-bezier(.65,0,.35,1)' });
  const header = root.querySelector('header[role="banner"]');
  if (header) animate(header, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 700 });

  // Shared adapters opt in; no selectors reach into dialogs or interactive grids.
  all('[data-rise], h1:not([data-rise])').forEach(heading => {
    const lines = heading.hasAttribute('data-rise-lines') ? [...heading.children] : [heading];
    lines.forEach((line, index) => reveal(line, [
      { transform: heading.dataset.rise === 'process' ? 'translateY(20px)' : 'translateY(100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ], { delay: Math.max(50, Math.min(900, heading.getBoundingClientRect().top / innerHeight * 900)) + index * 80 }));
  });
  all('[data-scan]').forEach(element => {
    const horizontal = element.dataset.scan === 'x';
    const line = document.createElement('i');
    line.dataset.scanLine = ''; line.setAttribute('aria-hidden', 'true');
    if (horizontal) { element.appendChild(line); cleanups.push(() => line.remove()); }
    const frames = [{ clipPath: horizontal ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }];
    // A single observer starts the panel and riding line together.
    const panel = animate(element, frames); panel.pause(); panel.currentTime = 0;
    const start = () => {
      panel.play();
      if (horizontal) animate(line, [{ left: '0%', opacity: 1 }, { left: '100%', opacity: 1, offset: .83 }, { left: '100%', opacity: 0 }]);
    };
    if (element.getBoundingClientRect().top < innerHeight * .8) start();
    else { pending.set(element, start); observer.observe(element); }
  });
  all('[data-stagger], [data-rows]').forEach(list => [...list.children].forEach((child, index) => {
    reveal(child, [{ opacity: 0 }, { opacity: 1 }], { duration: list.hasAttribute('data-rows') ? 450 : 500, delay: index * 40 });
  }));
  const home = main.querySelector('[data-homepage]');
  if (!home) {
    // Preserve heading width/overflow and React's text nodes: animate the element,
    // rather than reparenting server-rendered content as the static template does.
    all('h2, h3').filter(h => !h.closest('details, [data-motion-skip], [data-rise], nav, [role="dialog"]') && !h.querySelector('a,button')).forEach(h => reveal(h, [
      { transform: 'translateY(28px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 },
    ]));
  }
  const statement = home?.querySelector('[data-home-statement]');
  if (statement) [...statement.children].forEach((line, i) => reveal(line, [{ transform: 'translateY(45%)', opacity: .18 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 1000, delay: i * 90 }));

  const hero = home?.querySelector('#home-hero');
  const image = hero?.querySelector('[data-home-hero-image]');
  const lists = all('[data-home-reviews]').map(list => ({ list, reviews: all('[data-home-review]', list), current: -1 }));
  const originalStyles = new Map();
  const remember = element => { if (!originalStyles.has(element)) originalStyles.set(element, element.getAttribute('style')); };
  if (image) remember(image);
  const wordAnimations = new Map();
  const focus = (group, index, direction) => {
    const previous = group.current;
    if (index === previous) return;
    group.current = index;
    group.reviews.forEach((review, i) => {
      review.dataset.reviewFocus = String(i === index);
      const words = all('[data-review-word]', review);
      words.forEach((word, k) => {
        remember(word);
        if (previous === -1) { word.style.opacity = i === index ? '1' : '.2'; return; }
        if (i !== index && i !== previous) return;
        const opacity = getComputedStyle(word).opacity;
        wordAnimations.get(word)?.cancel();
        wordAnimations.set(word, animate(word, [{ opacity }, { opacity: i === index ? 1 : .2 }], {
          duration: 420, delay: (direction < 0 ? words.length - 1 - k : k) * 18,
          easing: 'cubic-bezier(.25,.46,.45,.94)', persist: true,
        }));
      });
    });
  };
  const syncHeights = () => {
    // Canonical Reviews uses shared CSS rows, including when motion is disabled.
    const aligned = lists.filter(group => !group.list.closest('[data-service-reviews]'));
    aligned.flatMap(group => group.reviews).forEach(review => { remember(review); review.style.minHeight = ''; });
    if (innerWidth < 1024 || aligned.length < 2) return;
    const count = Math.max(...aligned.map(group => group.reviews.length));
    for (let i = 0; i < count; i++) {
      const peers = aligned.map(group => group.reviews[i]).filter(Boolean);
      const height = Math.ceil(Math.max(...peers.map(review => review.getBoundingClientRect().height)));
      peers.forEach(review => { review.style.minHeight = `${height}px`; });
    }
  };
  const counters = all('[data-count]').map(element => {
    const raw = element.dataset.count, end = Number(raw), decimals = (raw.split('.')[1] || '').length;
    return { element, end, decimals, raw, start: 0, done: !Number.isFinite(end) };
  });
  let previousY = scrollY;
  const update = now => {
    if (disposed) return;
    const direction = scrollY >= previousY ? 1 : -1; previousY = scrollY;
    let moving = false;
    if (hero && image) {
      const box = hero.getBoundingClientRect();
      // Direct scroll mapping: no catch-up frames or motion after scrolling stops.
      const heroProgress = clamp(-box.top / box.height);
      image.style.transform = `translateY(${heroProgress * 4}%) scale(${1 + heroProgress * .07})`;
    }
    lists.forEach(group => {
      const box = group.list.getBoundingClientRect();
      const progress = clamp((innerHeight * .68 - box.top) / (box.height + innerHeight * .26));
      focus(group, Math.min(group.reviews.length - 1, Math.floor(progress * group.reviews.length)), direction);
    });
    counters.forEach(counter => {
      if (counter.done) return;
      if (!counter.start && counter.element.getBoundingClientRect().top < innerHeight * .9) counter.start = now;
      if (!counter.start) return;
      const progress = clamp((now - counter.start) / 1200);
      counter.element.textContent = (counter.end * (1 - (1 - progress) ** 3)).toFixed(counter.decimals);
      counter.done = progress === 1; moving ||= !counter.done;
    });
    frame = moving ? requestAnimationFrame(update) : 0;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const resize = () => { syncHeights(); schedule(); };
  const focusIn = event => {
    // Keyboard users can always read and interact with a revealed section.
    for (const [element, start] of pending) if (element.contains(event.target)) {
      start(); pending.delete(element); observer.unobserve(element);
    }
    lists.forEach(group => { const index = group.reviews.findIndex(review => review.contains(event.target)); if (index >= 0) focus(group, index, 1); });
  };
  const expanded = event => { if (event.target.closest('[data-home-review] button')) requestAnimationFrame(resize); };
  // Pagination replaces cards in one location; refresh only that motion group.
  const reviewsChanged = event => {
    const group = lists.find(group => group.list === event.target);
    if (!group) return;
    group.reviews.forEach(review => {
      delete review.dataset.reviewFocus;
      [review, ...all('[data-review-word]', review)].forEach(element => {
        const animation = wordAnimations.get(element);
        animation?.cancel(); animations.delete(animation); wordAnimations.delete(element);
        const style = originalStyles.get(element);
        if (originalStyles.has(element)) {
          if (style == null) element.removeAttribute('style'); else element.setAttribute('style', style);
          originalStyles.delete(element);
        }
      });
    });
    group.reviews = all('[data-home-review]', group.list); group.current = -1;
    resize();
  };
  const accordions = new Map();
  const toggleAccordion = event => {
    const summary = event.target.closest('details > summary');
    const details = summary?.parentElement;
    const body = details && [...details.children].find(child => child.tagName === 'DIV');
    if (!body || event.target.closest('a,button,input')) return;
    event.preventDefault();
    const previous = accordions.get(body);
    const opening = previous ? !previous.opening : !details.open;
    const height = details.open ? body.getBoundingClientRect().height : 0;
    const opacity = details.open ? getComputedStyle(body).opacity : '0';
    previous?.animation.cancel();
    details.open = true;
    const animation = animate(body, [
      { height: `${height}px`, opacity, overflow: 'hidden' },
      { height: opening ? `${body.scrollHeight}px` : '0px', opacity: opening ? 1 : 0, overflow: 'hidden' },
    ], { duration: opening ? 500 : 300, easing: opening ? expo : 'cubic-bezier(.55,.085,.68,.53)' });
    const state = { animation, opening, details };
    accordions.set(body, state);
    animation.finished.then(() => {
      if (accordions.get(body) !== state || disposed) return;
      details.open = opening; accordions.delete(body); resize();
    }).catch(() => {});
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  main.addEventListener('focusin', focusIn); main.addEventListener('click', expanded); main.addEventListener('click', toggleAccordion);
  main.addEventListener('ilab:reviews-change', reviewsChanged);
  syncHeights(); schedule();
  document.fonts?.ready.then(() => { if (!disposed) resize(); });
  return () => {
    disposed = true; cancelAnimationFrame(frame); observer.disconnect();
    window.removeEventListener('scroll', schedule); window.removeEventListener('resize', resize);
    main.removeEventListener('focusin', focusIn); main.removeEventListener('click', expanded); main.removeEventListener('click', toggleAccordion);
    main.removeEventListener('ilab:reviews-change', reviewsChanged);
    accordions.forEach(state => { state.details.open = state.opening; });
    animations.forEach(animation => animation.cancel()); cleanups.forEach(cleanup => cleanup());
    originalStyles.forEach((style, element) => { if (style == null) element.removeAttribute('style'); else element.setAttribute('style', style); });
    lists.forEach(group => group.reviews.forEach(review => delete review.dataset.reviewFocus));
    counters.forEach(counter => { counter.element.textContent = counter.raw; });
  };
}

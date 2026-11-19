// Native equivalent of the approved assets/js/motion.js. All content is visible
// before enhancement; every animation, observer and inline style has a teardown.
const clamp = value => Math.max(0, Math.min(1, value));
const expo = 'cubic-bezier(.16,1,.3,1)';

export function startServiceMotion(root, { profile = 'service', protectHeadlinePresentation = false } = {}) {
  const polish = profile === 'ads-v3';
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
    }).catch(() => { animations.delete(animation); });
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
  if (!polish) {
  const scan = root.querySelector('[data-page-scan]');
  if (scan) animate(scan, [{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${innerHeight}px)`, opacity: 1, offset: .85 }, { transform: `translateY(${innerHeight}px)`, opacity: 0 }], { duration: 1050, easing: 'cubic-bezier(.65,0,.35,1)' });
  const header = root.querySelector('header[role="banner"]');
  if (header) animate(header, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 700 });

  // Shared adapters opt in; no selectors reach into dialogs or interactive grids.
  all('[data-rise], h1:not([data-rise])').forEach(heading => {
    // The main Service layout establishes H1 transitions in SSR CSS. Hydration,
    // route effects and preference restarts must never restart their hidden frame.
    // Advertising adapters do not opt in and retain their original WAAPI entrance.
    if (protectHeadlinePresentation && heading.tagName === 'H1') return;
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
  }

  if (polish) {
    // Observe stable containers, animate their children, and rearm on exit.
    // Cancelling on exit restores the fully visible CSS state between visits.
    const repeats = new Map();
    const repeatObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      const state = repeats.get(entry.target);
      if (!state || state.visible === entry.isIntersecting) return;
      state.visible = entry.isIntersecting;
      state.active.forEach(animation => animation.cancel());
      state.active = entry.isIntersecting ? state.play() : [];
    }), { rootMargin: '0px 0px -12% 0px' });
    const repeat = (target, play) => {
      repeats.set(target, { play, active: [], visible: false });
      repeatObserver.observe(target);
    };
    cleanups.push(() => { repeatObserver.disconnect(); repeats.clear(); });
    const headingSelectors = ['#speed', '#services', '#brands', '#process', '#delivery', '#final-cta'].map(id => `${id} h2`).join(',');
    const entrance = (element, delay = 0) => {
      element.dataset.v3Revealed = 'true';
      return animate(element, [{ opacity: .35, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay });
    };
    const track = element => {
      cleanups.push(() => { delete element.dataset.v3Revealed; });
    };
    all(headingSelectors).forEach(heading => {
      const text = heading.nextElementSibling?.tagName === 'P' ? heading.nextElementSibling : null;
      track(heading); if (text) track(text);
      repeat(heading.parentElement, () => [entrance(heading), ...(text ? [entrance(text, 100)] : [])]);
    });
    // The speed promise resolves into the existing booking action, after its facts.
    all('#speed > div:last-child').forEach(strip => {
      const children = [...strip.children]; children.forEach(track);
      repeat(strip, () => children.map((child, index) => entrance(child, index * 100)));
    });
    all('[data-v3-sequence]').forEach(sequence => {
      const items = [...sequence.children];
      const startItem = (item, delay) => {
        item.dataset.v3Revealed = 'true';
        const rule = item.querySelector('[aria-hidden="true"]'), active = [];
        if (rule) active.push(animate(rule, [{ transform: 'scaleX(0)', opacity: 1 }, { transform: 'scaleX(1)', opacity: .35 }], { duration: 950, delay }));
        const title = item.querySelector('h3, strong'), text = item.querySelector('p'), note = item.querySelector('span:not([aria-hidden])');
        if (title) active.push(animate(title, [{ opacity: .4, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 720, delay }));
        if (text) active.push(animate(text, [{ opacity: .55, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 620, delay: delay + 100 }));
        if (note) active.push(animate(note, [{ opacity: .55 }, { opacity: 1 }], { duration: 620, delay: delay + 160 }));
        return active;
      };
      // Desktop rows share a stagger; stacked items replay at their own position.
      const delivery = sequence.dataset.v3Sequence === 'delivery';
      const targets = innerWidth >= 1024 && !delivery ? [sequence] : items;
      targets.forEach(target => {
        repeat(target, () => target === sequence ? items.flatMap((item, index) => startItem(item, index * 140)) : startItem(target, delivery ? items.indexOf(target) * 80 : 0));
      });
      cleanups.push(() => items.forEach(item => { delete item.dataset.v3Revealed; }));
    });
  }

  const home = main.querySelector('[data-homepage]');
  const hero = polish ? main.querySelector('[aria-labelledby="ads-v3-title"]') : home?.querySelector('#home-hero');
  const image = hero?.querySelector(polish ? '[data-ads-v3-art]' : '[data-home-hero-image]');
  const lists = all('[data-home-reviews]').map(list => ({ list, reviews: all('[data-home-review]', list), current: -1 }));
  const reviewPeers = group => polish && innerWidth >= 1024
    ? lists.filter(peer => peer.list.closest('[data-service-reviews]') === group.list.closest('[data-service-reviews]'))
    : [group];
  const originalStyles = new Map();
  const remember = element => { if (!originalStyles.has(element)) originalStyles.set(element, element.getAttribute('style')); };
  if (image) remember(image);
  const wordAnimations = new Map();
  const focus = (group, index, direction) => {
    const previous = group.current;
    if (index === previous && !group.refresh) return;
    group.current = index;
    group.refresh = false;
    group.reviews.forEach((review, i) => {
      review.dataset.reviewFocus = String(i === index);
      const words = all('[data-review-word]', review);
      words.forEach((word, k) => {
        remember(word);
        const floor = polish ? .65 : .2;
        if (previous === -1) { word.style.opacity = i === index ? '1' : String(floor); return; }
        if (i !== index && i !== previous && !polish) return;
        const opacity = getComputedStyle(word).opacity;
        wordAnimations.get(word)?.cancel();
        wordAnimations.set(word, animate(word, [{ opacity }, { opacity: i === index ? 1 : floor }], {
          duration: 420, delay: polish ? Math.min(k * 5, 90) : (direction < 0 ? words.length - 1 - k : k) * 18,
          easing: 'cubic-bezier(.25,.46,.45,.94)', persist: true,
        }));
      });
    });
  };
  if (polish) lists.forEach(group => {
    const article = group.list.closest('[data-review-location]');
    const readable = () => {
      if (group.reading) return;
      group.reading = true;
      group.refresh = true;
      group.reviews.forEach(review => all('[data-review-word]', review).forEach(word => {
        remember(word); wordAnimations.get(word)?.cancel(); word.style.opacity = '1';
      }));
    };
    const readPeers = () => reviewPeers(group).forEach(peer => peer.readable());
    const engage = () => { group.focused = true; readPeers(); };
    const blur = event => { if (!article.contains(event.relatedTarget)) { group.focused = false; schedule(); } };
    article.addEventListener('focusin', engage); article.addEventListener('focusout', blur);
    article.addEventListener('pointerdown', readPeers);
    group.readable = readable;
    cleanups.push(() => {
      article.removeEventListener('focusin', engage); article.removeEventListener('focusout', blur); article.removeEventListener('pointerdown', readPeers);
    });
  });
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
    const duration = polish && element.closest('[data-review-rating]') ? 600 : 1200;
    return { element, end, decimals, raw, duration, start: 0, done: !Number.isFinite(end) };
  });
  if (polish) {
    const targets = new Map();
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      const counter = targets.get(entry.target);
      if (!counter || counter.visible === entry.isIntersecting) return;
      counter.visible = entry.isIntersecting;
      counter.start = 0;
      counter.done = !entry.isIntersecting || !Number.isFinite(counter.end);
      counter.element.textContent = counter.raw;
      if (entry.isIntersecting) schedule();
    }), { rootMargin: '0px 0px -10% 0px' });
    counters.forEach(counter => {
      // Reserve the final figure's width so suffixes and /5 stay in place.
      remember(counter.element);
      counter.element.style.fontVariantNumeric = 'tabular-nums';
      const width = counter.element.getBoundingClientRect().width;
      counter.element.style.display = 'inline-block';
      counter.element.style.minWidth = `${width / parseFloat(getComputedStyle(counter.element).fontSize)}em`;
      counter.visible = false; counter.done = true;
      const target = counter.element.closest('[data-review-rating], #trust article') || counter.element;
      targets.set(target, counter); counterObserver.observe(target);
    });
    cleanups.push(() => counterObserver.disconnect());
  }
  let previousY = scrollY;
  const update = now => {
    if (disposed) return;
    const direction = scrollY >= previousY ? 1 : -1; previousY = scrollY;
    let moving = false;
    if (hero && image) {
      const box = hero.getBoundingClientRect();
      // Direct scroll mapping: no catch-up frames or motion after scrolling stops.
      const heroProgress = clamp(-box.top / box.height);
      image.style.transform = `translateY(${heroProgress * (polish ? 1 : 4)}%) scale(${1 + heroProgress * .07})`;
    }
    const visited = new Set();
    lists.forEach(group => {
      if (visited.has(group)) return;
      const peers = reviewPeers(group);
      peers.forEach(peer => visited.add(peer));
      if (polish) {
        const selection = window.getSelection();
        const reading = peers.some(peer => peer.focused ||
          (selection?.toString() && peer.list.contains(selection.anchorNode)) || peer.list.querySelector('[aria-expanded="true"]'));
        if (reading) { peers.forEach(peer => peer.readable()); return; }
        peers.forEach(peer => { peer.reading = false; });
      }
      // Side-by-side columns share one geometric timeline and transition start.
      // Mobile columns are stacked and follow their own visible position.
      const boxes = peers.map(peer => peer.list.getBoundingClientRect());
      const top = Math.min(...boxes.map(box => box.top)), bottom = Math.max(...boxes.map(box => box.bottom));
      const progress = clamp((innerHeight * .68 - top) / (bottom - top + innerHeight * .26));
      peers.forEach(peer => focus(peer, Math.min(peer.reviews.length - 1, Math.floor(progress * peer.reviews.length)), direction));
    });
    counters.forEach(counter => {
      if (counter.done) return;
      if (!counter.start && (polish ? counter.visible : counter.element.getBoundingClientRect().top < innerHeight * .9)) counter.start = now;
      if (!counter.start) return;
      const progress = clamp((now - counter.start) / counter.duration);
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
    if (!polish) lists.forEach(group => { const index = group.reviews.findIndex(review => review.contains(event.target)); if (index >= 0) focus(group, index, 1); });
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
    group.reading = false;
    if (polish && group.focused) group.readable();
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
  main.addEventListener('focusin', focusIn); main.addEventListener('click', expanded);
  if (!polish) main.addEventListener('click', toggleAccordion);
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

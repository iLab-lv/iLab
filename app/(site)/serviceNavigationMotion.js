// Keep Next's router and history, but finish the template's exit sweep first.
export function startNavigationMotion(root, navigate, closeDialogs) {
  const scan = root.querySelector('[data-page-scan]');
  const shutter = root.querySelector('[data-page-shutter]');
  let animations = [], timer, pending = false, destination, commitNavigation = navigate;
  const reset = () => {
    clearTimeout(timer); animations.forEach(animation => animation.cancel());
    animations = []; pending = false; delete root.dataset.pageLeaving;
  };
  const click = event => {
    const link = event.target.closest?.('a[href]');
    if (!link?.closest('[data-service-redesign]') || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('download') || link.closest('[data-no-transition], [data-open], [role="status"]') || (link.target && link.target !== '_self')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).get('motion') === 'off') return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    let url;
    try { url = new URL(link.href, location.href); } catch { return; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    // Protected and application routes retain their existing navigation behavior.
    if (/^\/(?:shop|api|admin|ads|landings)(?:\/|$)/.test(url.pathname) || ['/iphone-remonts-riga', '/iphone-baterijas-maina'].includes(url.pathname) || url.searchParams.has('ads')) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    if (!scan?.animate || !shutter) return;
    begin(url);
    event.preventDefault(); event.stopImmediatePropagation();
  };
  function begin(url, commit = navigate) {
    if (pending) return;
    commitNavigation = commit;
    pending = true; destination = url.pathname + url.search + url.hash;
    root.dataset.pageLeaving = 'true'; closeDialogs();
    // Cancel the arrival scan if navigation happens during its first second.
    scan.getAnimations().forEach(animation => animation.cancel());
    animations = [
      scan.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${innerHeight}px)`, opacity: 1 }], { duration: 450, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }),
      shutter.animate([{ clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }], { duration: 450, delay: 20, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }),
    ];
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      if (!pending) return;
      commitNavigation(destination);
      // A failed/cancelled navigation must never leave the visitor behind a cover.
      timer = setTimeout(reset, 5000);
    }).catch(() => {});
  }
  const requested = event => {
    if (event.defaultPrevented || !event.detail?.href || typeof event.detail.navigate !== 'function') return;
    if (media.matches || new URLSearchParams(location.search).get('motion') === 'off' || !scan?.animate || !shutter) return;
    const url = new URL(event.detail.href, location.href);
    if (url.origin !== location.origin) return;
    begin(url, event.detail.navigate); event.preventDefault();
  };
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const preference = () => { if (media.matches) { if (pending) commitNavigation(destination); reset(); } };
  document.addEventListener('click', click, true);
  window.addEventListener('pageshow', reset);
  window.addEventListener('ilab:before-navigate', requested);
  media.addEventListener('change', preference);
  return () => {
    reset(); document.removeEventListener('click', click, true);
    window.removeEventListener('pageshow', reset); media.removeEventListener('change', preference);
    window.removeEventListener('ilab:before-navigate', requested);
  };
}

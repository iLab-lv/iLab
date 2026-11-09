'use client';

import { useEffect, useRef, useState } from 'react';
import s from './FullscreenPanel.module.scss';

function LegacyFullscreenPanel({
  open,
  onClose,
  onExited,
  onRequestOpen,
  paneKey,
  serviceRedesign = false,
  paneTitle = '',
  closeLabel = 'Aizvērt',
  renderPane,
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const returnFocusRef = useRef(null);
  const swapRaf = useRef(null);

  const EXIT_FALLBACK_MS = 360;
  const [phase, setPhase] = useState('closed');
  const shouldRender = open || phase !== 'closed';

  useEffect(() => {
    let t;
    let done = false;

    const finishClose = () => {
      if (done) return;
      done = true;
      setPhase('closed');
      onExited?.();
    };

    if (open) {
      // Keep the service drawer settled: reopening on every phase change
      // continuously replaces its keyboard listener and scroll lock.
      if (serviceRedesign && phase === 'open') return;
      setPhase('opening');
      t = setTimeout(() => setPhase('open'), 20);
    } else if (phase !== 'closed') {
      setPhase('closing');

      const node = panelRef.current;

      if (node) {
        const onEnd = (ev) => {
          if (ev.target === node && ev.propertyName === 'transform') {
            node.removeEventListener('transitionend', onEnd);
            finishClose();
          }
        };

        node.addEventListener('transitionend', onEnd);

        t = setTimeout(() => {
          node.removeEventListener('transitionend', onEnd);
          finishClose();
        }, EXIT_FALLBACK_MS + 60);
      } else {
        t = setTimeout(finishClose, EXIT_FALLBACK_MS);
      }
    }

    return () => clearTimeout(t);
  }, [open, phase, onExited, serviceRedesign]);

  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;

    const docEl = document.documentElement;
    const body = document.body;

    const prev = {
      htmlOverflow: docEl.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlPaddingRight: docEl.style.paddingRight,
    };

    const sbw = window.innerWidth - docEl.clientWidth;

    docEl.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    if (sbw > 0) {
      docEl.style.paddingRight = `${sbw}px`;
    }

    return () => {
      docEl.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      docEl.style.paddingRight = prev.htmlPaddingRight;
    };
  }, [phase]);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;

      const t = setTimeout(() => {
        const container = panelRef.current;
        const first = container?.querySelector(
          '[data-pane-active="true"] button, [data-pane-active="true"] [href], [data-pane-active="true"] input, [data-pane-active="true"] select, [data-pane-active="true"] textarea, [data-pane-active="true"] [tabindex]:not([tabindex="-1"])'
        );

        (first || container)?.focus?.();
      }, 0);

      return () => clearTimeout(t);
    }

    returnFocusRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;

    const containServiceFocus = () => {
      const root = panelRef.current;
      if (!serviceRedesign || !open || !root || root.contains(document.activeElement)) return;
      root.focus();
    };

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const root = panelRef.current;
        if (!root) return;

        const nodes = Array.from(
          root.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(
          (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
        );

        if (!nodes.length) return;

        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    containServiceFocus();
    document.addEventListener('focusin', containServiceFocus);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('focusin', containServiceFocus);
      document.removeEventListener('keydown', handleKey);
    };
  }, [phase, onClose, serviceRedesign, open]);

  const onBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  const [internalPaneKey, setInternalPaneKey] = useState(null);
  const [panePayload, setPanePayload] = useState(null);

  const effectivePaneKey = internalPaneKey ?? paneKey ?? null;

  useEffect(() => {
    if (paneKey != null) {
      setInternalPaneKey(null);
    }
  }, [paneKey]);

  useEffect(() => {
    const handler = (ev) => {
      const locId = ev?.detail?.locId ?? null;

      setPanePayload({ locId });
      setInternalPaneKey('sazinaties');

      if (phase === 'closed') {
        onRequestOpen?.();
      }
    };

    window.addEventListener('open-sazinies', handler);

    return () => window.removeEventListener('open-sazinies', handler);
  }, [phase, onRequestOpen]);

  const [activeKey, setActiveKey] = useState(effectivePaneKey || null);
  const [exitKey, setExitKey] = useState(null);
  const [enterKey, setEnterKey] = useState(null);
  const [swapPhase, setSwapPhase] = useState('idle');
  const [enterDir, setEnterDir] = useState('right');
  const [exitDir, setExitDir] = useState('right');

  const isSwapping = swapPhase !== 'idle';

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');

    const apply = () => setIsDesktop(mq.matches);

    apply();

    mq.addEventListener?.('change', apply);

    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    if (open && (phase === 'closed' || phase === 'opening')) {
      setActiveKey(effectivePaneKey || null);
      setExitKey(null);
      setEnterKey(null);
      setSwapPhase('idle');
    }
  }, [open, phase, effectivePaneKey]);

  function resolveDirs(fromKey, toKey) {
    let enter = isDesktop ? 'right' : 'up';
    let exit = isDesktop ? 'left' : 'up';

    if (fromKey === 'locator' && toKey === 'sazinaties') {
      enter = isDesktop ? 'right' : 'up';
      exit = isDesktop ? 'left' : 'up';
    }

    return { enter, exit };
  }

  useEffect(() => {
    if (phase !== 'open') return;
    if (!effectivePaneKey || effectivePaneKey === activeKey) return;
    if (swapPhase !== 'idle') return;

    const { enter, exit } = resolveDirs(activeKey, effectivePaneKey);

    setEnterDir(enter);
    setExitDir(exit);

    setExitKey(activeKey);
    setEnterKey(effectivePaneKey);
    setSwapPhase('prep');

    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setSwapPhase('run'));
      swapRaf.current = [id1, id2];
    });

    const stage = stageRef.current;
    let cleaned = false;

    const cleanup = () => {
      if (cleaned) return;

      cleaned = true;

      const pair = swapRaf.current;

      if (pair) {
        pair.forEach((id) => cancelAnimationFrame(id));
        swapRaf.current = null;
      }

      setActiveKey(effectivePaneKey);
      setExitKey(null);
      setEnterKey(null);
      setSwapPhase('idle');

      panelRef.current?.focus?.();
    };

    const onEnd = (ev) => {
      const el = ev.target;

      const isPane =
        el instanceof Element &&
        (el.classList.contains(s.paneEnter) ||
          el.classList.contains(s.paneExit));

      if (isPane && ev.propertyName === 'transform') {
        stage?.removeEventListener('transitionend', onEnd);
        cleanup();
      }
    };

    stage?.addEventListener('transitionend', onEnd);

    const fallback = setTimeout(() => {
      stage?.removeEventListener('transitionend', onEnd);
      cleanup();
    }, EXIT_FALLBACK_MS + 120);

    return () => {
      const pair = swapRaf.current;

      if (pair) {
        pair.forEach((id) => cancelAnimationFrame(id));
        swapRaf.current = null;
      }

      clearTimeout(fallback);
      stage?.removeEventListener('transitionend', onEnd);
    };
  // Preserve protected consumers' existing swap behavior; service drawers use the isolated implementation below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectivePaneKey, phase, activeKey, swapPhase, isDesktop]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className={s.overlay}
      data-state={phase}
      role="presentation"
      onMouseDown={onBackdropClick}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className={s.panel}
        data-state={phase}
        data-service-pane={serviceRedesign ? paneKey : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        tabIndex={-1}
      >
        <i className={s.scanLine} aria-hidden="true" />

        <header className={s.panelHeader}>
          <h2 id="panel-title">{paneTitle}</h2>
          <button
            type="button"
            className={s.close}
            aria-label={closeLabel}
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </header>

        <div
          ref={stageRef}
          className={s.stage}
          data-swapping={isSwapping ? 'true' : 'false'}
          data-swap-phase={swapPhase}
        >
          {activeKey && !isSwapping && (
            <div className={s.pane} data-pane-active="true">
              {renderPane(activeKey, panePayload)}
            </div>
          )}

          {isSwapping && (
            <>
              <div
                className={[s.pane, s.paneExit, s[`exit-${exitDir}`]].join(' ')}
                data-pane="exit"
                aria-hidden="true"
              >
                {exitKey && renderPane(exitKey, panePayload)}
              </div>

              <div
                className={[
                  s.pane,
                  s.paneEnter,
                  s[`enter-${enterDir}`],
                ].join(' ')}
                data-pane="enter"
              >
                {enterKey && renderPane(enterKey, panePayload)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Service drawers share the provider's pane state. Protected consumers keep the legacy implementation above.
function getServiceFocusable(root) {
  return Array.from(root?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []).filter((element) =>
    !element.disabled && element.tabIndex >= 0 && !element.closest('[hidden], [inert], [aria-hidden="true"]') && element.getClientRects().length > 0
  );
}

function ServiceFullscreenPanel({ open, onClose, onExited, paneKey, paneTitle, closeLabel, renderPane, openerRef }) {
  const panelRef = useRef(null);
  const localOpenerRef = useRef(null);
  const wasOpenRef = useRef(false);
  const [phase, setPhase] = useState(open ? 'opening' : 'closed');
  const visible = open || phase !== 'closed';

  useEffect(() => {
    let frame;
    let timer;
    if (open) {
      setPhase('opening');
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setPhase('open'));
      });
    } else if (wasOpenRef.current) {
      setPhase('closing');
      timer = setTimeout(() => { setPhase('closed'); onExited?.(); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 420);
    }
    wasOpenRef.current = open;
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [open, onExited]);

  useEffect(() => {
    if (!open) return;
    localOpenerRef.current = openerRef?.current || document.activeElement;
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow, padding: html.style.paddingRight };
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden'; body.style.overflow = 'hidden';
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    return () => {
      html.style.overflow = previous.html; body.style.overflow = previous.body; html.style.paddingRight = previous.padding;
    };
  }, [open, openerRef]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => { panelRef.current?.focus({ preventScroll: true }); });
    panelRef.current?.scrollTo(0, 0);
    return () => cancelAnimationFrame(frame);
  }, [open, paneKey]);

  useEffect(() => {
    if (phase !== 'closed' || !localOpenerRef.current) return;
    // A different modal may already be opening after a rapid control sequence.
    if (!document.querySelector('[data-service-modal="true"]')) {
      const opener = openerRef?.current || localOpenerRef.current;
      if (opener?.isConnected && !opener.closest('[hidden], [inert]')) opener.focus({ preventScroll: true });
    }
    localOpenerRef.current = null;
  }, [phase, openerRef]);

  useEffect(() => {
    if (!open) return;
    const containFocus = (event) => {
      const root = panelRef.current;
      if (root && !root.contains(event.target)) root.focus({ preventScroll: true });
    };
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); return; }
      if (event.key !== 'Tab') return;
      const root = panelRef.current;
      const nodes = getServiceFocusable(root);
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (!first) { event.preventDefault(); root?.focus(); return; }
      if (event.shiftKey && (active === first || active === root || !root.contains(active))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (active === last || active === root || !root.contains(active))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', containFocus);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('focusin', containFocus); };
  }, [open, onClose]);

  if (!visible) return null;
  return <div className={s.overlay} data-state={phase} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.(); }} aria-hidden={!open} inert={!open}>
    <div ref={panelRef} id={paneKey === 'book' ? 'pieraksties-panel' : paneKey === 'locator' ? 'locator-panel' : 'sazinaties-panel'} className={s.panel} data-state={phase} data-service-pane={paneKey} data-service-modal={open ? 'true' : undefined} role="dialog" aria-modal="true" aria-labelledby="panel-title" tabIndex={-1}>
      <i className={s.scanLine} aria-hidden="true" />
      <header className={s.panelHeader}><h2 id="panel-title">{paneTitle}</h2><button type="button" className={s.close} aria-label={closeLabel} onClick={onClose}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg></button></header>
      <div className={s.serviceStage} data-pane-active="true">{renderPane(paneKey)}</div>
    </div>
  </div>;
}

export default function FullscreenPanel(props) {
  return props.serviceRedesign ? <ServiceFullscreenPanel {...props} /> : <LegacyFullscreenPanel {...props} />;
}

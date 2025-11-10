'use client';

import { useEffect, useRef, useState } from 'react';
import s from './FullscreenPanel.module.scss';

export default function FullscreenPanel({
  open,
  onClose,
  onExited,
  onRequestOpen,            // NEW: let panel ask parent to open itself
  paneKey,                  // externally requested pane key
  paneTitle = '',
  renderPane,              // (key, payload?) => ReactNode
}) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const stageRef   = useRef(null);
  const returnFocusRef = useRef(null);
  const swapRaf    = useRef(null);

  /* ===== Open/Close phase ===== */
  const EXIT_FALLBACK_MS = 360; // keep in sync with tokens/SCSS
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
  }, [open, phase, onExited]);

  /* Root scroll lock */
  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;

    const docEl = document.documentElement;
    const body  = document.body;

    const prev = {
      htmlOverflow: docEl.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlPaddingRight: docEl.style.paddingRight,
    };

    const sbw = window.innerWidth - docEl.clientWidth; // scrollbar width

    docEl.style.overflow = 'hidden';
    body.style.overflow  = 'hidden';
    if (sbw > 0) docEl.style.paddingRight = `${sbw}px`;

    return () => {
      docEl.style.overflow     = prev.htmlOverflow;
      body.style.overflow      = prev.bodyOverflow;
      docEl.style.paddingRight = prev.htmlPaddingRight;
    };
  }, [phase]);

  /* Focus mgmt (on open/close) */
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
    } else {
      returnFocusRef.current?.focus?.();
    }
  }, [open]);

  /* Focus trap */
  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;

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
        ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1], active = document.activeElement;
        if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [phase, onClose]);

  const onBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  /* ===== Pane swap + internal override (react to map events) ===== */
  const [internalPaneKey, setInternalPaneKey] = useState(null);
  const [panePayload, setPanePayload] = useState(null); // e.g., { locId }

  // effective pane: internal override wins, else external prop
  const effectivePaneKey = internalPaneKey ?? paneKey ?? null;

  // if parent drives pane explicitly, clear internal override
  useEffect(() => {
    if (paneKey != null) setInternalPaneKey(null);
  }, [paneKey]);

  // Listen for 'open-sazinies' from anywhere (e.g., Locations section on a page)
  useEffect(() => {
    const handler = (ev) => {
      const locId = ev?.detail?.locId ?? null;
      setPanePayload({ locId });
      setInternalPaneKey('sazinaties');

      // If panel is closed, ask parent to open it
      if (phase === 'closed') {
        onRequestOpen?.();
      }
    };

    window.addEventListener('open-sazinies', handler);
    return () => window.removeEventListener('open-sazinies', handler);
  }, [phase, onRequestOpen]);

  // swapping state machine
  const [activeKey, setActiveKey]   = useState(effectivePaneKey || null);
  const [exitKey, setExitKey]       = useState(null);
  const [enterKey, setEnterKey]     = useState(null);
  const [swapPhase, setSwapPhase]   = useState('idle'); // 'idle' | 'prep' | 'run'
  const [enterDir, setEnterDir]     = useState('right');  // 'right' | 'left' | 'up' | 'down'
  const [exitDir, setExitDir]       = useState('right');
  const isSwapping = swapPhase !== 'idle';

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
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
    let exit  = isDesktop ? 'left'  : 'up';
    if (fromKey === 'locator' && toKey === 'sazinaties') {
      enter = isDesktop ? 'right' : 'up';
      exit  = isDesktop ? 'left'  : 'up';
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
      (swapRaf.current = [id1, id2]);
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
        (el.classList.contains(s.paneEnter) || el.classList.contains(s.paneExit));
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
      {/* Close button anchored to overlay (outside scrollable content) */}
      <div className={s.closeGlobal}>
        <button type="button" className={s.close} aria-label="Aizvērt" onClick={onClose}>✕</button>
      </div>

      <div
        ref={panelRef}
        className={s.panel}
        data-state={phase}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        tabIndex={-1}
      >
        {/* Accessible name (visually hidden) */}
        <h2 id="panel-title" className={s.srOnly}>{paneTitle}</h2>

        <div
          ref={stageRef}
          className={s.stage}
          data-swapping={isSwapping ? 'true' : 'false'}
          data-swap-phase={swapPhase}
        >
          {/* Active (steady) */}
          {activeKey && !isSwapping && (
            <div className={s.pane} data-pane-active="true">
              {renderPane(activeKey, panePayload)}
            </div>
          )}

          {/* Swap: both panes absolute (no reflow) */}
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
                className={[s.pane, s.paneEnter, s[`enter-${enterDir}`]].join(' ')}
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

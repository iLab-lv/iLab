'use client';

import { useEffect, useRef, useState } from 'react';
import s from './FullscreenPanel.module.scss';

export default function FullscreenPanel({
  open,
  onClose,
  onExited,
  paneKey,
  paneTitle = '',
  renderPane,
}) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const returnFocusRef = useRef(null);

  // ===== Open/Close phase =====
  const EXIT_FALLBACK_MS = 360; // keep in sync with SCSS
  const [phase, setPhase] = useState('closed'); // start closed to animate IN
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Prevent body scroll while active
  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  // ===== Focus management (open/close) =====
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

  // Focus trap while active
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

  // ===== Pane swap (cross-slide) =====
  const [activeKey, setActiveKey] = useState(paneKey || null);
  const [exitKey, setExitKey] = useState(null);
  const [enterKey, setEnterKey] = useState(null);
  const [swapPhase, setSwapPhase] = useState('idle'); // 'idle' | 'prep' | 'run'
  const isSwapping = swapPhase !== 'idle';

  // Align active when opening
  useEffect(() => {
    if (open && paneKey && activeKey == null) {
      setActiveKey(paneKey);
    }
  }, [open, paneKey, activeKey]);

  // Run cross-slide on paneKey change while open
  useEffect(() => {
    if (!open) {
      setActiveKey(paneKey || null);
      setExitKey(null);
      setEnterKey(null);
      setSwapPhase('idle');
      return;
    }
    if (!paneKey || paneKey === activeKey || swapPhase !== 'idle') return;

    // Keep current pane in flow; new pane animates over it
    setExitKey(activeKey);
    setEnterKey(paneKey);
    setSwapPhase('prep');

    // Reset scroll to top to prevent “mid-scroll” layout jumps
    if (panelRef.current) panelRef.current.scrollTo({ top: 0, behavior: 'auto' });

    const tick = setTimeout(() => setSwapPhase('run'), 20);

    const stage = stageRef.current;
    let cleaned = false;

    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(fallback);
      setActiveKey(paneKey);
      setExitKey(null);
      setEnterKey(null);
      setSwapPhase('idle');

      // Focus first focusable in the new pane
      const first = panelRef.current?.querySelector(
        '[data-pane-active="true"] button, [data-pane-active="true"] [href], [data-pane-active="true"] input, [data-pane-active="true"] select, [data-pane-active="true"] textarea, [data-pane-active="true"] [tabindex]:not([tabindex="-1"])'
      );
      first?.focus?.();
    }

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
    }, EXIT_FALLBACK_MS + 80);

    return () => {
      clearTimeout(tick);
      stage?.removeEventListener('transitionend', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneKey, open]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        tabIndex={-1}
      >
        <div className={s.topbar}>
          <h2 id="panel-title" className={s.title}>{paneTitle}</h2>
          <button type="button" className={s.close} aria-label="Aizvērt" onClick={onClose}>✕</button>
        </div>

        {/* Pane stage: handles cross-slide swaps */}
        <div
          ref={stageRef}
          className={s.stage}
          data-swapping={isSwapping ? 'true' : 'false'}
          data-swap-phase={swapPhase}
        >
          {/* Active (steady) */}
          {activeKey && !isSwapping && (
            <div className={s.pane} data-pane-active="true">
              {renderPane(activeKey)}
            </div>
          )}

          {/* Swap: exiting (in flow) + entering (absolute) */}
          {isSwapping && (
            <>
              <div
                className={`${s.pane} ${s.paneExit}`}
                data-pane="exit"
                aria-hidden="true"
                inert
              >
                {exitKey && renderPane(exitKey)}
              </div>
              <div
                className={`${s.pane} ${s.paneEnter}`}
                data-pane="enter"
                data-swap-phase={swapPhase}
              >
                {enterKey && renderPane(enterKey)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

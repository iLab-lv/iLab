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
  const swapRaf = useRef(null);

  /* ===== Open/Close phase ===== */
  const EXIT_FALLBACK_MS = 360; // keep in sync with SCSS
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

  /* Body scroll lock while active */
  useEffect(() => {
    if (!(phase === 'opening' || phase === 'open' || phase === 'closing')) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
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

  /* ===== Pane swap ===== */
  const [activeKey, setActiveKey] = useState(paneKey || null);
  const [exitKey, setExitKey] = useState(null);
  const [enterKey, setEnterKey] = useState(null);
  const [swapPhase, setSwapPhase] = useState('idle'); // 'idle' | 'prep' | 'run'
  const [enterDir, setEnterDir] = useState('right');  // 'right' | 'left' | 'up' | 'down'
  const [exitDir, setExitDir] = useState('right');
  const isSwapping = swapPhase !== 'idle';

  // MQ for desktop (match your md breakpoint)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  /* PRIME correct pane on opening */
  useEffect(() => {
    if (open && (phase === 'closed' || phase === 'opening')) {
      setActiveKey(paneKey || null);
      setExitKey(null);
      setEnterKey(null);
      setSwapPhase('idle');
    }
  }, [open, phase, paneKey]);

  // Direction resolver (shared-axis push for locator->sazinaties)
  function resolveDirs(fromKey, toKey) {
    let enter = isDesktop ? 'right' : 'up';
    let exit  = isDesktop ? 'left'  : 'up';

    if (fromKey === 'locator' && toKey === 'sazinaties') {
      enter = isDesktop ? 'right' : 'up';
      exit  = isDesktop ? 'left'  : 'up';
    }
    return { enter, exit };
  }

  /* Run swap when fully open */
  useEffect(() => {
    if (phase !== 'open') return;
    if (!paneKey || paneKey === activeKey) return;
    if (swapPhase !== 'idle') return;

    const { enter, exit } = resolveDirs(activeKey, paneKey);
    setEnterDir(enter);
    setExitDir(exit);

    setExitKey(activeKey);
    setEnterKey(paneKey);
    setSwapPhase('prep');

    // Double rAF for initial transform commit before animation
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

      setActiveKey(paneKey);
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
  }, [paneKey, phase, activeKey, swapPhase, isDesktop]);

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

          {/* Swap: both panes absolute (no reflow) */}
          {isSwapping && (
            <>
              <div
                className={[s.pane, s.paneExit, s[`exit-${exitDir}`]].join(' ')}
                data-pane="exit"
                aria-hidden="true"
              >
                {exitKey && renderPane(exitKey)}
              </div>

              <div
                className={[s.pane, s.paneEnter, s[`enter-${enterDir}`]].join(' ')}
                data-pane="enter"
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

'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import s from './LocatorPanel.module.scss';
import { LOCATIONS } from '@/data/site.config';

export default function LocatorPanel({ onSelectLocation }) {
  // % positions relative to intrinsic image
  const pinLayout = useMemo(
    () => ({
      domina: { top: 40, left: 68 },
      spice:  { top: 60, left: 30 },
    }),
    []
  );

  const wrapRef = useRef(null);
  const svgRef  = useRef(null);

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [nat, setNat] = useState({ w: 1000, h: 1000 });
  const [ready, setReady] = useState(false);
  const [vb, setVb] = useState({ x: 0, y: 0, w: 1000, h: 1000 });

  // --- sizes ---
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((ents) => {
      const r = ents[0]?.contentRect;
      if (r && (r.width || r.height)) setBox({ w: r.width, h: r.height });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // intrinsic image size (load once)
  useEffect(() => {
    const img = new Image();
    img.src = '/images/map.png';
    img.decoding = 'async';
    img.onload = () => {
      setNat({ w: img.naturalWidth || 1000, h: img.naturalHeight || 1000 });
      setReady(true);
    };
    img.onerror = () => setReady(true);
  }, []);

  // compute exact cover viewBox
  const computeCoverVB = useCallback((natW, natH, boxW, boxH) => {
    if (!natW || !natH || !boxW || !boxH) return { x: 0, y: 0, w: natW || 1000, h: natH || 1000 };
    const boxAR = boxW / boxH;
    const imgAR = natW / natH;
    if (boxAR >= imgAR) {
      const targetH = natW / boxAR;
      const y = (natH - targetH) / 2;
      return { x: 0, y, w: natW, h: targetH };
    } else {
      const targetW = natH * boxAR;
      const x = (natW - targetW) / 2;
      return { x, y: 0, w: targetW, h: natH };
    }
  }, []);

  useEffect(() => {
    const next = computeCoverVB(nat.w, nat.h, box.w, box.h);
    if (next.w && next.h) setVb(next);
  }, [nat.w, nat.h, box.w, box.h, computeCoverVB]);

  // ===== DRAG STATE =====
  const dragging = useRef(false);
  const moved    = useRef(false);
  const start    = useRef({ x: 0, y: 0 });
  const vbStart  = useRef(null);

  // convert px → viewBox units
  const pxToVb = useCallback(
    (dxPx, dyPx) => {
      if (!box.w || !box.h || !vb.w || !vb.h) return { dx: 0, dy: 0 };
      const sx = box.w / vb.w;
      const sy = box.h / vb.h;
      return { dx: dxPx / sx, dy: dyPx / sy };
    },
    [box.w, box.h, vb.w, vb.h]
  );

  const clampVb = useCallback((nvb) => {
    const maxX = Math.max(0, nat.w - nvb.w);
    const maxY = Math.max(0, nat.h - nvb.h);
    return {
      x: Math.max(0, Math.min(nvb.x, maxX)),
      y: Math.max(0, Math.min(nvb.y, maxY)),
      w: nvb.w,
      h: nvb.h,
    };
  }, [nat.w, nat.h]);

  // unified move + end
  const onMove = (clientX, clientY) => {
    if (!dragging.current || !vbStart.current) return;
    const dxPx = clientX - start.current.x;
    const dyPx = clientY - start.current.y;
    if (Math.abs(dxPx) + Math.abs(dyPx) > 3) moved.current = true;
    const { dx, dy } = pxToVb(-dxPx, -dyPx);
    setVb(clampVb({ ...vbStart.current, x: vbStart.current.x + dx, y: vbStart.current.y + dy }));
  };

  const removeAllDocListeners = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onTouchMove, { passive: false });
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchcancel', onTouchEnd);
  };

  const endDragAll = () => {
    dragging.current = false;
    removeAllDocListeners();
  };

  useEffect(() => () => endDragAll(), []); // cleanup on unmount

  // ====== Pointer / Mouse / Touch handlers ======
  const onPointerDown = (e) => {
    moved.current = false;
    const isPin = e.target?.closest?.('[data-pin="1"]');
    if (isPin) return;
    if (e.cancelable) e.preventDefault();
    svgRef.current?.setPointerCapture?.(e.pointerId);

    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    vbStart.current = { ...vb };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
  };
  const onPointerMove = (e) => {
    if (dragging.current && e.cancelable) e.preventDefault();
    onMove(e.clientX, e.clientY);
  };
  const onPointerUp = () => { endDragAll(); };

  const onMouseDown = (e) => {
    moved.current = false;
    if (e.button !== 0) return;
    const isPin = e.target?.closest?.('[data-pin="1"]');
    if (isPin) return;

    e.preventDefault();
    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    vbStart.current = { ...vb };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e) => { e.preventDefault(); onMove(e.clientX, e.clientY); };
  const onMouseUp   = () => { endDragAll(); };

  const getPoint = (e) => (e.touches && e.touches[0])
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX, y: e.clientY };

  const onTouchStart = (e) => {
    moved.current = false;
    const isPin = e.target?.closest?.('[data-pin="1"]');
    if (isPin) return;

    if (e.cancelable) e.preventDefault();
    const p = getPoint(e);

    dragging.current = true;
    start.current = p;
    vbStart.current = { ...vb };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
  };
  const onTouchMove = (e) => { if (e.cancelable) e.preventDefault(); const p = getPoint(e); onMove(p.x, p.y); };
  const onTouchEnd  = () => { endDragAll(); };

  // inverse scale so pins don’t shrink; mobile size bump via CSS
  const pinInvScale = useMemo(() => {
    if (!box.w || !box.h || !vb.w || !vb.h) return 1;
    const scaleX = box.w / vb.w;
    const scaleY = box.h / vb.h;
    return 1 / Math.min(scaleX, scaleY);
  }, [box.w, box.h, vb.w, vb.h]);

  const handleActivate = useCallback((locId) => {
    if (moved.current) return;
    onSelectLocation?.(locId);
  }, [onSelectLocation]);

  return (
    <div className={s.wrap}>
      <div ref={wrapRef} className={s.map} role="application" tabIndex={0}>
        <svg
          ref={svgRef}
          className={s.svg}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid slice"
          onPointerDown={onPointerDown}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <image
            href="/images/map.png"
            xlinkHref="/images/map.png"
            x="0"
            y="0"
            width={nat.w}
            height={nat.h}
            draggable="false"
            style={{ userSelect: 'none' }}
          />

          {LOCATIONS.map((loc) => {
            const p = pinLayout[loc.id] || { top: 50, left: 50 };
            const x = (p.left / 100) * nat.w;
            const y = (p.top / 100) * nat.h;

            return (
              <g
                key={loc.id}
                data-pin="1"
                className={s.pin}
                transform={`translate(${x}, ${y}) scale(${pinInvScale})`}
                role="button"
                tabIndex={0}
                aria-label={`Atvērt kontaktus: ${loc.label}`}
                onClick={() => handleActivate(loc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleActivate(loc.id);
                  }
                }}
              >
                <g className={s.pinSize}>
                  <circle cx="0" cy="0" r="22" fill="transparent" />
                  <circle className={s.pinHalo} cx="0" cy="0" r="16" />
                  <circle className={s.pinDot}  cx="0" cy="0" r="7" />
                </g>
              </g>
            );
          })}
        </svg>

        {!ready && <div className={s.loading} aria-live="polite">Ielādē karti…</div>}
      </div>
    </div>
  );
}

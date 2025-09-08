'use client';

import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from 'react';
import s from './LocatorPanel.module.scss';
import { LOCATIONS } from '@/data/site.config';

/**
 * Static map that frames all pins (no panning/scrolling).
 * Pins are sized consistently on screen. Labels are *buttons*:
 * - Default: glassy pill
 * - Hover/focus/active (or pin hover/focus): accent pill
 * - Below by default; flip above if near bottom edge
 * - Edge-clamped horizontally so they never crop
 * - Shared active state so pin & label animate together
 */
export default function LocatorPanel({ onSelectLocation /* (locId) => void */ }) {
  // % positions relative to intrinsic image coordinates
  const pinLayout = useMemo(
    () => ({
      domina: { top: 40, left: 68, label: 'T/C Domina Shopping' },
      spice:  { top: 60, left: 30, label: 'T/C Spice Home' },
    }),
    []
  );

  const containerRef = useRef(null);

  // Natural image size (used as the SVG coordinate system)
  const [nat, setNat] = useState({ w: 1920, h: 1280 });
  const [ready, setReady] = useState(false);

  // Container box (for aspect-ratio matching and pin scaling)
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Computed viewBox that frames all pins with padding and matches container AR
  const [vb, setVb] = useState({ x: 0, y: 0, w: 1920, h: 1280 });

  // Shared hover/focus state between pins and labels
  const [activePin, setActivePin] = useState(null);

  // Load natural image size once
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.src = '/images/map.png';
    img.decoding = 'async';
    img.onload = () => {
      if (!alive) return;
      const w = img.naturalWidth || 1920;
      const h = img.naturalHeight || 1280;
      setNat({ w, h });
      setVb({ x: 0, y: 0, w, h }); // initial full frame
      setReady(true);
    };
    img.onerror = () => { if (alive) setReady(true); };
    return () => { alive = false; };
  }, []);

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((ents) => {
      const r = ents[0]?.contentRect;
      if (r && (r.width || r.height)) setBox({ w: r.width, h: r.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Compute pin coordinates in image space
  const pins = useMemo(() => {
    return LOCATIONS.map((loc) => {
      const p = pinLayout[loc.id];
      if (!p) return null;
      const x = (p.left / 100) * nat.w;
      const y = (p.top / 100) * nat.h;
      return { id: loc.id, label: p.label ?? loc.label, x, y };
    }).filter(Boolean);
  }, [LOCATIONS, pinLayout, nat.w, nat.h]);

  // Helpers
  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  // Compute a viewBox that bounds all pins + padding and matches container AR
  const computeFramingVB = useCallback(
    (natW, natH, pinList, boxW, boxH) => {
      if (!natW || !natH || !boxW || !boxH || !pinList.length) {
        return { x: 0, y: 0, w: natW || 1, h: natH || 1 };
      }

      // Bound pins
      let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of pinList) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }

      // Padding around pins bbox (relative)
      const pad = 0.18; // 18%
      const bboxW = Math.max(1, maxX - minX);
      const bboxH = Math.max(1, maxY - minY);
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;

      let targetW = bboxW * (1 + pad * 2);
      let targetH = bboxH * (1 + pad * 2);

      // Minimum footprint so we don't zoom too far in
      const minFrac = 0.30;
      targetW = Math.max(targetW, natW * minFrac);
      targetH = Math.max(targetH, natH * minFrac);

      // Match container AR by expanding the smaller dimension
      const boxAR = boxW / boxH;
      const targetAR = targetW / targetH;
      if (targetAR > boxAR) targetH = targetW / boxAR;
      else targetW = targetH * boxAR;

      // Center on pins
      let x = cx - targetW / 2;
      let y = cy - targetH / 2;

      // Clamp to image bounds
      if (targetW >= natW) { x = 0; targetW = natW; }
      else x = clamp(x, 0, natW - targetW);

      if (targetH >= natH) { y = 0; targetH = natH; }
      else y = clamp(y, 0, natH - targetH);

      return { x, y, w: targetW, h: targetH };
    },
    []
  );

  // Recompute viewBox when image size or container size changes
  useEffect(() => {
    const next = computeFramingVB(nat.w, nat.h, pins, box.w, box.h);
    if (next.w && next.h) setVb(next);
  }, [nat.w, nat.h, pins, box.w, box.h, computeFramingVB]);

  // === Constant on-screen pin scale ===
  const screenScale = useMemo(() => {
    if (!box.w || !box.h || !vb.w || !vb.h) return 1;
    const sx = box.w / vb.w;
    const sy = box.h / vb.h;
    return Math.min(sx, sy);
  }, [box.w, box.h, vb.w, vb.h]);

  // Desired dot radius in CSS pixels
  const desiredDotPx = box.w && box.w < 768 ? 14 : 12;
  const baseDotUnits = 7;
  let pinScale = desiredDotPx / (baseDotUnits * (screenScale || 1));
  pinScale = Math.max(1.6, Math.min(pinScale, 4.5));

  // Always-on labels: default BELOW; flip ABOVE if near bottom edge
  const labels = useMemo(() => {
    const haloRpx = 16 * pinScale * screenScale; // halo radius in px
    const gap = 8;
    const offsetPx = Math.round(haloRpx + gap);
    const edgeThresh = 12;

    return pins.map((p) => {
      const left = ((p.x - vb.x) / vb.w) * box.w;
      const top  = ((p.y - vb.y) / vb.h) * box.h;

      const nearBottom = (box.h - top) - offsetPx - edgeThresh < 0;
      const placeBelow = !nearBottom; // below by default

      return {
        id: p.id,
        label: p.label,
        left: Math.round(left),
        top: Math.round(top),
        placeBelow,
        offsetPx,
      };
    });
  }, [pins, vb.x, vb.y, vb.w, vb.h, box.w, box.h, pinScale, screenScale]);

  // Prevent label cropping at left/right edges (measure + shift)
  const labelRefs = useRef({});
  const [labelShiftX, setLabelShiftX] = useState({});

  useLayoutEffect(() => {
    if (!labels.length || !box.w) return;
    const pad = 8;
    const next = {};
    labels.forEach((lab) => {
      const el = labelRefs.current[lab.id];
      const w = el?.offsetWidth || 0;
      const half = w / 2;
      let shift = 0;
      if (lab.left - half < pad) {
        shift = pad - (lab.left - half);
      } else if (lab.left + half > box.w - pad) {
        shift = -((lab.left + half) - (box.w - pad));
      }
      next[lab.id] = Math.round(shift);
    });
    setLabelShiftX(next);
  }, [labels, box.w]);

  const handleActivate = useCallback(
    (locId) => onSelectLocation?.(locId),
    [onSelectLocation]
  );

  return (
    <div className={s.wrap}>
      <div ref={containerRef} className={s.map} aria-label="Karte ar filiālēm">
        <svg
          className={s.svg}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden={!ready}
          style={{ ['--pinScale']: String(pinScale) }}
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

          {pins.map((p) => {
            const isActive = activePin === p.id;
            return (
              <g
                key={p.id}
                className={`${s.pin} ${isActive ? s.pinActive : ''}`}
                transform={`translate(${p.x} ${p.y})`}
                role="button"
                tabIndex={0}
                aria-label={`Atvērt kontaktus: ${p.label}`}
                onClick={() => handleActivate(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleActivate(p.id);
                  }
                }}
                onMouseEnter={() => setActivePin(p.id)}
                onMouseLeave={() => setActivePin((id) => (id === p.id ? null : id))}
                onFocus={() => setActivePin(p.id)}
                onBlur={() => setActivePin((id) => (id === p.id ? null : id))}
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

        {/* Clickable labels (buttons) — share active state with pins */}
        <div className={s.labels} aria-hidden="false">
          {labels.map((lab) => {
            const isActive = activePin === lab.id;
            return (
              <button
                key={lab.id}
                ref={(el) => { labelRefs.current[lab.id] = el; }}
                type="button"
                className={`${s.labelBtn} ${lab.placeBelow ? s.bottom : s.top} ${isActive ? s.active : ''}`}
                style={{
                  left: `${lab.left}px`,
                  top: `${lab.top}px`,
                  '--offsetY': `${lab.placeBelow ? lab.offsetPx : -lab.offsetPx}px`,
                  '--shiftX': `${labelShiftX[lab.id] || 0}px`,
                }}
                aria-label={`Atvērt kontaktus: ${lab.label}`}
                onClick={() => handleActivate(lab.id)}
                onMouseEnter={() => setActivePin(lab.id)}
                onMouseLeave={() => setActivePin((id) => (id === lab.id ? null : id))}
                onFocus={() => setActivePin(lab.id)}
                onBlur={() => setActivePin((id) => (id === lab.id ? null : id))}
              >
                {lab.label}
              </button>
            );
          })}
        </div>

        {!ready && <div className={s.loading} aria-live="polite">Ielādē karti…</div>}
      </div>
    </div>
  );
}

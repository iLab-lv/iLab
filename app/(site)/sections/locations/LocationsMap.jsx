'use client';

import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from 'react';
import s from './LocationsMap.module.scss';

/**
 * Cover-fitted static SVG map (uses /images/map-3000.webp).
 * - Frames pins but clamps zoom to avoid blurry over-zoom
 * - Labels are anchored beside the **dot edge** (not pin center),
 *   so the visual gap stays consistent regardless of pin scale.
 */

const FRAME_PAD = 0.20;      // space around pins bbox
const MIN_FOOTPRINT = 0.80;  // show at least 80% of the image
const MAX_ZOOM = 1.06;       // never crop tighter than ~6% zoom-in
const CENTER_BIAS = 0.25;    // pull frame center toward image center
const ZOOM_OUT = 1.00;       // extra global zoom-out (1.00 = none)

export default function LocationsMap({
  imageUrl = '/images/map-3000.webp',
  locations = [],
  pinPositions = {},
  onPinClick,
  className = '',
  ariaLabel = 'Karte ar filiālēm',
}) {
  const containerRef = useRef(null);

  const [nat, setNat]   = useState({ w: 3000, h: 2000 });
  const [ready, setReady] = useState(false);
  const [box, setBox]   = useState({ w: 0, h: 0 });
  const [vb, setVb]     = useState({ x: 0, y: 0, w: 3000, h: 2000 });

  const [activePin, setActivePin] = useState(null);
  const [labelSide, setLabelSide] = useState({}); // id -> 'left' | 'right'

  // Load image once
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.src = imageUrl;
    img.decoding = 'async';
    img.onload = () => {
      if (!alive) return;
      const w = img.naturalWidth || 3000;
      const h = img.naturalHeight || 2000;
      setNat({ w, h });
      setVb({ x: 0, y: 0, w, h });
      setReady(true);
    };
    img.onerror = () => { if (alive) setReady(true); };
    return () => { alive = false; };
  }, [imageUrl]);

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry?.contentRect;
      if (r) setBox({ w: r.width, h: r.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Pins in image space
  const pins = useMemo(() => {
    return locations
      .map((loc) => {
        const pos = pinPositions[loc.id];
        if (!pos) return null;
        const x = (pos.xPct / 100) * nat.w;
        const y = (pos.yPct / 100) * nat.h;
        return { id: loc.id, label: loc.label, x, y };
      })
      .filter(Boolean);
  }, [locations, pinPositions, nat.w, nat.h]);

  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  // Compute viewBox with cover + zoom clamp
  const computeFramingVB = useCallback((natW, natH, pinList, boxW, boxH) => {
    if (!natW || !natH || !boxW || !boxH || !pinList.length) {
      return { x: 0, y: 0, w: natW || 1, h: natH || 1 };
    }

    // Pins bbox
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pinList) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const bboxW = Math.max(1, maxX - minX);
    const bboxH = Math.max(1, maxY - minY);

    // Padding + minimum footprint
    let targetW = Math.max(bboxW * (1 + FRAME_PAD * 2), natW * MIN_FOOTPRINT);
    let targetH = Math.max(bboxH * (1 + FRAME_PAD * 2), natH * MIN_FOOTPRINT);

    // Match container AR (cover)
    const boxAR = boxW / boxH;
    if ((targetW / targetH) > boxAR) targetH = targetW / boxAR;
    else targetW = targetH * boxAR;

    // Global zoom-out + hard maximum zoom clamp
    targetW = Math.min(natW, targetW * ZOOM_OUT);
    targetH = Math.min(natH, targetH * ZOOM_OUT);
    targetW = Math.max(targetW, natW / MAX_ZOOM);
    targetH = Math.max(targetH, natH / MAX_ZOOM);

    // Blend center toward image center
    const pinsCx = (minX + maxX) / 2;
    const pinsCy = (minY + maxY) / 2;
    const imgCx  = natW / 2;
    const imgCy  = natH / 2;
    const cx = pinsCx * (1 - CENTER_BIAS) + imgCx * CENTER_BIAS;
    const cy = pinsCy * (1 - CENTER_BIAS) + imgCy * CENTER_BIAS;

    let x = cx - targetW / 2;
    let y = cy - targetH / 2;
    if (targetW >= natW) { x = 0; targetW = natW; } else x = clamp(x, 0, natW - targetW);
    if (targetH >= natH) { y = 0; targetH = natH; } else y = clamp(y, 0, natH - targetH);

    return { x, y, w: targetW, h: targetH };
  }, []);

  // Recompute viewBox on changes
  useEffect(() => {
    const next = computeFramingVB(nat.w, nat.h, pins, box.w, box.h);
    if (next.w && next.h) setVb(next);
  }, [nat.w, nat.h, pins, box.w, box.h, computeFramingVB]);

  // Constant on-screen pin scale → for dot radius calculation
  const screenScale = useMemo(() => {
    if (!box.w || !box.h || !vb.w || !vb.h) return 1;
    const sx = box.w / vb.w;
    const sy = box.h / vb.h;
    return Math.min(sx, sy);
  }, [box.w, box.h, vb.w, vb.h]);

  // Dot radius in screen px (7 map units scaled)
  const dotRpx = useMemo(() => {
    const baseUnits = 7;
    const desiredDotPx = box.w && box.w < 768 ? 14 : 12; // visual target
    let pinScale = desiredDotPx / (baseUnits * (screenScale || 1));
    pinScale = Math.max(1.6, Math.min(pinScale, 4.5));
    return Math.round(baseUnits * pinScale * (screenScale || 1));
  }, [box.w, screenScale]);

  // Labels: screen-space anchors + side + final X from dot edge
  const labels = useMemo(() => {
    return pins.map((p) => {
      const pinLeft = ((p.x - vb.x) / vb.w) * box.w;
      const pinTop  = ((p.y - vb.y) / vb.h) * box.h;
      return { id: p.id, label: p.label, pinLeft: Math.round(pinLeft), pinTop: Math.round(pinTop) };
    });
  }, [pins, vb.x, vb.y, vb.w, vb.h, box.w, box.h]);

  useLayoutEffect(() => {
    if (!labels.length || !box.w) return;
    const pad = 12;
    const sides = {};
    labels.forEach((lab) => {
      const spaceLeft  = lab.pinLeft - pad;
      const spaceRight = box.w - lab.pinLeft - pad;
      sides[lab.id] = spaceRight >= spaceLeft ? 'right' : 'left';
    });
    setLabelSide(sides);
  }, [labels, box.w]);

  const handleActivate = useCallback((locId) => onPinClick?.(locId), [onPinClick]);

  // Constant visual margin beyond the dot edge
  const EDGE_GAP = 8; // px

  return (
    <div ref={containerRef} className={`${s.map} ${className}`} aria-label={ariaLabel}>
      <svg
        className={s.svg}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden={!ready}
        style={{ ['--pinScale']: String(Math.max(1.6, Math.min((dotRpx / 7) / (screenScale || 1), 4.5))) }}
      >
        <image
          href={imageUrl}
          xlinkHref={imageUrl}
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
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(p.id); }
              }}
              onMouseEnter={() => setActivePin(p.id)}
              onMouseLeave={() => setActivePin((id) => (id === p.id ? null : id))}
              onFocus={() => setActivePin(p.id)}
              onBlur={() => setActivePin((id) => (id === p.id ? null : id))}
            >
              <g className={s.pinSize}>
                <circle className={s.pinPulse} cx="0" cy="0" r="11" />
                <circle className={`${s.pinPulse} ${s.delay}`} cx="0" cy="0" r="11" />
                <circle className={s.pinHalo} cx="0" cy="0" r="16" />
                <circle className={s.pinDot}  cx="0" cy="0" r="7" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Labels anchored from the dot edge */}
      <div className={s.labels} aria-hidden="false">
        {labels.map((lab) => {
          const side = labelSide[lab.id] || 'right';
          const isActive = activePin === lab.id;

          // finalLeft: from dot edge (pin center ± dot radius) + small gap
          const fromCenter = dotRpx + EDGE_GAP; // px from pin center to label gap
          const finalLeft = side === 'right'
            ? lab.pinLeft + fromCenter
            : lab.pinLeft - fromCenter;

          return (
            <button
              key={lab.id}
              type="button"
              className={`${s.labelBtn} ${side === 'left' ? s.left : s.right} ${isActive ? s.active : ''}`}
              style={{ left: `${Math.round(finalLeft)}px`, top: `${lab.pinTop}px` }}
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

      {!ready && <div className={s.loading}>Ielādē karti…</div>}
    </div>
  );
}

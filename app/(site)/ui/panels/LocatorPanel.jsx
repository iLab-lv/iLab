'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import s from './LocatorPanel.module.scss';
import { LOCATIONS } from '@/data/site.config';

/**
 * Static map that always frames all pins (no panning/scrolling).
 * Pins are sized to a consistent on-screen size using a computed scale
 * derived from the container pixels-per-SVG-unit.
 */
export default function LocatorPanel({ onSelectLocation /* (locId) => void */ }) {
  // % positions relative to intrinsic image coordinates
  const pinLayout = useMemo(
    () => ({
      domina: { top: 40, left: 68 },
      spice:  { top: 60, left: 30 },
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
  const pinsXY = useMemo(() => {
    const list = LOCATIONS.map((loc) => {
      const p = pinLayout[loc.id];
      if (!p) return null;
      return {
        x: (p.left / 100) * nat.w,
        y: (p.top / 100) * nat.h,
      };
    }).filter(Boolean);
    return list.length ? list : [{ x: nat.w / 2, y: nat.h / 2 }];
  }, [LOCATIONS, pinLayout, nat.w, nat.h]);

  // Helpers
  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  // Compute a viewBox that:
  //  1) bounds all pins + padding
  //  2) matches the container aspect ratio by expanding the smaller dimension
  //  3) stays within the image bounds
  const computeFramingVB = useCallback(
    (natW, natH, pins, boxW, boxH) => {
      if (!natW || !natH || !boxW || !boxH || !pins.length) {
        return { x: 0, y: 0, w: natW || 1, h: natH || 1 };
      }

      // Bound pins
      let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of pins) {
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
    const next = computeFramingVB(nat.w, nat.h, pinsXY, box.w, box.h);
    if (next.w && next.h) setVb(next);
  }, [nat.w, nat.h, pinsXY, box.w, box.h, computeFramingVB]);

  // === Compute a constant on-screen pin scale ===
  // screenScale = pixels per 1 SVG unit (at current framing)
  const screenScale = useMemo(() => {
    if (!box.w || !box.h || !vb.w || !vb.h) return 1;
    const sx = box.w / vb.w;
    const sy = box.h / vb.h;
    return Math.min(sx, sy);
  }, [box.w, box.h, vb.w, vb.h]);

  // Desired dot radius in actual CSS pixels (bigger on small screens)
  const desiredDotPx = box.w && box.w < 768 ? 14 : 12; // tweak if needed

  // Base dot radius in SVG units (matches <circle r="7" />)
  const baseDotUnits = 7;

  // Scale so that baseDotUnits * screenScale * pinScale ≈ desiredDotPx
  let pinScale = desiredDotPx / (baseDotUnits * (screenScale || 1));
  pinScale = clamp(pinScale, 1.6, 4.5); // keep within sensible bounds

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

          {LOCATIONS.map((loc) => {
            const p = pinLayout[loc.id];
            if (!p) return null;
            const x = (p.left / 100) * nat.w;
            const y = (p.top / 100) * nat.h;

            return (
              <g
                key={loc.id}
                className={s.pin}
                transform={`translate(${x} ${y})`}
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
                  {/* generous hit area (scales with pin) */}
                  <circle cx="0" cy="0" r="22" fill="transparent" />
                  <circle className={s.pinHalo} cx="0" cy="0" r="16" />
                  <circle className={s.pinDot}  cx="0" cy="0" r="7" />
                </g>
              </g>
            );
          })}
        </svg>

        {!ready && (
          <div className={s.loading} aria-live="polite">
            Ielādē karti…
          </div>
        )}
      </div>
    </div>
  );
}

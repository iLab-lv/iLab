'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './LocationsMap.module.scss';

export default function LocationsMap({
  images = {
    alt: 'Rīga — iLab lokācijas',
    small:  '/images/map-1024.webp',
    medium: '/images/map-1600.webp',
    large:  '/images/map-3000.webp',
  },
  // pins in percent (xPct/yPct). x/y (percent) also accepted.
  pins = [
    { id: 'domina', label: 'Domina Shopping', xPct: 68, yPct: 40, gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga', tel: 'tel:23370088' },
    { id: 'spice',  label: 'Spice Home',      xPct: 30, yPct: 60, gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga', tel: 'tel:20887787' },
  ],
  locations = [
    {
      id: 'domina',
      title: 'Domina Shopping',
      address: 'Ieriķu iela 3, Rīga',
      tel: 'tel:23370088',
      gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga',
    },
    {
      id: 'spice',
      title: 'Spice Home',
      address: 'Jaunmoku iela 13, Rīga',
      tel: 'tel:20887787',
      gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga',
    },
  ],
  onOpenFullMap, // optional
}) {
  // Normalize image keys (also supports {mobile,tablet,desktop})
  const I = useMemo(() => ({
    alt: images.alt ?? 'Karte',
    small:  images.small  ?? images.mobile  ?? images.tablet  ?? images.desktop,
    medium: images.medium ?? images.tablet  ?? images.desktop ?? images.small,
    large:  images.large  ?? images.desktop ?? images.medium  ?? images.small,
  }), [images]);

  const containerRef = useRef(null);

  // Container size
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry?.contentRect;
      if (r) setBox({ w: r.width, h: r.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Pick best source by DPR * width
  const [src, setSrc] = useState(I.large);
  useEffect(() => {
    const pick = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      const need = (box.w || 0) * dpr;
      if (need <= 1100 && I.small) setSrc(I.small);
      else if (need <= 1800 && I.medium) setSrc(I.medium);
      else setSrc(I.large || I.medium || I.small);
    };
    pick();
    window.addEventListener('resize', pick);
    const id = setInterval(pick, 400);
    return () => { window.removeEventListener('resize', pick); clearInterval(id); };
  }, [box.w, I.small, I.medium, I.large]);

  // Natural size of chosen image
  const [nat, setNat] = useState({ w: 1000, h: 1000 });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    if (!src) { setReady(true); return; }
    const img = new Image();
    img.src = src;
    img.decoding = 'async';
    img.onload = () => {
      if (!alive) return;
      setNat({ w: img.naturalWidth || 1000, h: img.naturalHeight || 1000 });
      setReady(true);
    };
    img.onerror = () => { if (alive) setReady(true); };
    return () => { alive = false; };
  }, [src]);

  // Pins → image-space coords
  const pinsImg = useMemo(() => {
    const norm = (v) => (Number.isFinite(v) ? v : undefined);
    return pins.map(p => {
      const xp = norm(p.xPct) ?? norm(p.x);
      const yp = norm(p.yPct) ?? norm(p.y);
      if (xp == null || yp == null) return null;
      return { ...p, xPct: xp, yPct: yp, x: (xp / 100) * nat.w, y: (yp / 100) * nat.h };
    }).filter(Boolean);
  }, [pins, nat.w, nat.h]);

  // viewBox framing (pad + match container AR)
  const computeFramingVB = useCallback((natW, natH, pinList, boxW, boxH) => {
    if (!natW || !natH || !boxW || !boxH) return { x: 0, y: 0, w: natW || 1, h: natH || 1 };
    if (!pinList.length)          return { x: 0, y: 0, w: natW,       h: natH };

    let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pinList) {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    if (!isFinite(minX)) return { x: 0, y: 0, w: natW, h: natH };

    const pad = 0.18;
    const bboxW = Math.max(1, maxX - minX);
    const bboxH = Math.max(1, maxY - minY);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    let w = bboxW * (1 + pad * 2);
    let h = bboxH * (1 + pad * 2);

    const minFrac = 0.30;
    w = Math.max(w, natW * minFrac);
    h = Math.max(h, natH * minFrac);

    const boxAR = boxW / boxH;
    const targetAR = w / h;
    if (targetAR > boxAR) h = w / boxAR;
    else w = h * boxAR;

    const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
    let x = cx - w / 2;
    let y = cy - h / 2;
    if (w >= natW) { x = 0; w = natW; } else x = clamp(x, 0, natW - w);
    if (h >= natH) { y = 0; h = natH; } else y = clamp(y, 0, natH - h);

    return { x, y, w, h };
  }, []);

  const [vb, setVb] = useState({ x: 0, y: 0, w: nat.w, h: nat.h });
  useEffect(() => {
    const next = computeFramingVB(nat.w, nat.h, pinsImg, box.w, box.h);
    if (next.w && next.h) setVb(next);
  }, [nat.w, nat.h, pinsImg, box.w, box.h, computeFramingVB]);

  // Constant on-screen pin size (use inline attribute transform to avoid CSS quirks)
  const screenScale = useMemo(() => {
    if (!box.w || !box.h || !vb.w || !vb.h) return 1;
    const sx = box.w / vb.w;
    const sy = box.h / vb.h;
    return Math.min(sx, sy);
  }, [box.w, box.h, vb.w, vb.h]);

  const desiredDotPx = box.w && box.w < 768 ? 18 : 14; // visibly larger
  const baseDotUnits = 7;
  const calcScale = desiredDotPx / (baseDotUnits * (screenScale || 1));
  const pinScale = Number.isFinite(calcScale) ? Math.max(2.2, Math.min(calcScale, 5.5)) : 2.8;

  const openPin = (id, gmaps) => {
    if (typeof onOpenFullMap === 'function') onOpenFullMap(id);
    else if (gmaps) window.open(gmaps, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={s.wrap}>
      <div ref={containerRef} className={s.mapFrame} aria-label={I.alt}>
        <svg
          className={s.svg}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid slice" /* cover the frame */
          aria-hidden={!ready}
        >
          {src && (
            <image
              href={src}
              xlinkHref={src}
              x="0"
              y="0"
              width={nat.w}
              height={nat.h}
              draggable="false"
              style={{ userSelect: 'none' }}
            />
          )}

          {pinsImg.map(p => (
            <g
              key={p.id}
              className={s.pin}
              transform={`translate(${p.x} ${p.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Atvērt: ${p.label}`}
              onClick={() => openPin(p.id, p.gmaps)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPin(p.id, p.gmaps); }
              }}
            >
              {/* scale INSIDE the translate to avoid CSS transform bugs */}
              <g transform={`scale(${pinScale})`}>
                <circle cx="0" cy="0" r="16" className={s.pinHalo} />
                <circle cx="0" cy="0" r="7"  className={s.pinDot} />
              </g>
            </g>
          ))}
        </svg>
      </div>

      {/* Overlapping cards (hours removed) */}
      <div className={s.cards} role="list">
        {locations.map((loc) => (
          <article key={loc.id} className={s.card} role="listitem" aria-labelledby={`${loc.id}-title`}>
            <h3 id={`${loc.id}-title`} className={s.cardTitle}>{loc.title}</h3>
            <p className={s.cardMeta}>{loc.address}</p>
            <div className={s.cardActions}>
              <a className={s.cardBtn} href={loc.tel}>Zvanīt</a>
              <a className={s.cardBtn} href={loc.gmaps} target="_blank" rel="noopener noreferrer">Atvērt kartē</a>
              {typeof onOpenFullMap === 'function' && (
                <button className={s.cardBtnGhost} onClick={() => onOpenFullMap(loc.id)}>
                  Skatīt karti
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

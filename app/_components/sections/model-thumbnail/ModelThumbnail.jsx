'use client';

import Image from 'next/image';
import { useState } from 'react';
import s from './ModelThumbnail.module.scss';

export default function ModelThumbnail({ src, kind = 'phone', className = '' }) {
  const [failedSource, setFailedSource] = useState(null);
  const showImage = Boolean(src) && failedSource !== src;
  return (
    <span className={`${s.well} ${className}`} data-model-thumbnail={kind} data-state={showImage ? 'image' : 'fallback'} aria-hidden="true">
      {showImage ? <Image src={src} alt="" fill sizes={kind === 'laptop' ? '200px' : '160px'} loading="lazy" decoding="async" onError={() => setFailedSource(src)} /> : (
        <svg viewBox="0 0 120 96" fill="none" stroke="currentColor" strokeWidth="1.5">
          {kind === 'laptop' ? <><path d="M23 18h74v51H23zM23 69l-13 9h100l-13-9M49 74h22" /></> : kind === 'tablet' ? <><path d="M30 9h60v78H30zM57 81h6" /></> : <><path d="M40 7h40v82H40zM54 13h12M56 82h8" /></>}
        </svg>
      )}
    </span>
  );
}

'use client';

import dynamic from 'next/dynamic';

import DeferredClientWidget from '../deferred/DeferredClientWidget';

const BottomBar = dynamic(() => import('./BottomBar'), { ssr: false });

export default function DeferredBottomBar(props) {
  return (
    <DeferredClientWidget>
      <BottomBar {...props} />
    </DeferredClientWidget>
  );
}

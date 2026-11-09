'use strict';

// Backport React PR #35494 to Next 15's pinned App Router renderer.
// Remove this loader after upgrading to a renderer that includes that fix.
// https://github.com/react/react/pull/35494
const NEXT_VERSION = '15.5.29';
const REACT_VERSION = '19.2.0-canary-0bdb9206-20250818';
const MARKER = 'ILAB_REACT_35494';

function restoreHydrationReplay(source, nextVersion) {
  if (nextVersion !== NEXT_VERSION || !source.includes(REACT_VERSION)) {
    throw new Error('React hydration backport: framework version changed; review/remove the backport before building.');
  }
  const start = source.indexOf('function replayBeginWork(unitOfWork)') >= 0
    ? source.indexOf('function replayBeginWork(unitOfWork)')
    : source.indexOf('function replaySuspendedUnitOfWork(unitOfWork)');
  const end = source.indexOf('function throwAndUnwindWorkLoop(', start);
  if (start < 0 || end < 0 || !source.includes('function popToNextHostParent(')) {
    throw new Error('React hydration backport: unexpected renderer structure.');
  }
  const block = source.slice(start, end);
  if (block.includes(MARKER)) return source;
  const anchor = /case 5:\s*resetHooksOnUnwind\((next|unitOfWork)\);/g;
  const matches = [...block.matchAll(anchor)];
  if (matches.length !== 1) throw new Error('React hydration backport: expected one host replay branch.');
  const fiber = matches[0][1];
  const replacement = matches[0][0] + `
      // ${MARKER}: restore this host's cursor before beginWork claims it again.
      if (${fiber} === hydrationParentFiber) {
        if (isHydrating) {
          popToNextHostParent(${fiber});
          if (${fiber}.tag === 5 && ${fiber}.stateNode != null) {
            nextHydratableInstance = ${fiber}.stateNode;
          }
        } else {
          popToNextHostParent(${fiber});
          isHydrating = true;
        }
      }`;
  return source.slice(0, start) + block.replace(anchor, replacement) + source.slice(end);
}

module.exports = function reactHydrationReplayLoader(source) {
  this.cacheable?.();
  return restoreHydrationReplay(source, require('next/package.json').version);
};
module.exports.restoreHydrationReplay = restoreHydrationReplay;

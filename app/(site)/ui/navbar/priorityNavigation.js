// Keep the ordered high-priority links that fit beside the existing More control.
export function getPriorityCount(widths, moreWidth, available) {
  let used = moreWidth;
  let count = 0;
  for (const width of widths) {
    if (used + width > available - 1) break;
    used += width;
    count += 1;
  }
  return count;
}

export function moveItemsToMore(items, existing = []) {
  return [
    ...items.flatMap((item) => [
      ...(!item.menuOnly ? [{ ...item, children: [] }] : []),
      ...(item.children || []),
    ]),
    ...existing,
  ];
}

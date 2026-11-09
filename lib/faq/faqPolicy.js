// Explicit directory inclusion. Transitional fallback copy never creates a directory entry.
export const FAQ_DIRECTORY_SOURCES = [
  { scopeType: 'basic' },
  ...['iphone-remonts', 'telefonu-remonts', 'plansetdatoru-remonts', 'datoru-remonts', 'dyson-remonts', 'fotoaparatu-remonts']
    .map(scopeKey => ({ scopeType: 'category', scopeKey })),
  ...['ekrana-maina', 'baterijas-maina', 'uzlades-ligzdas-maina', 'kameras-remonts', 'skalruni-mikrofona-remonts', 'udens-bojajumu-remonts', 'iphone-plates-remonts']
    .map(scopeKey => ({ scopeType: 'service', scopeKey })),
  { scopeType: 'page', scopeKey: 'contacts' },
  { scopeType: 'page', scopeKey: 'cenas' },
];

export function directoryGroupPresentation(group, strings) {
  const key = group.scopeType === 'basic' ? 'basic' : group.docId.replace(/_(lv|ru)$/, '');
  const appendedOrder = { 'fotoaparatu-remonts': 400, 'iphone-plates-remonts': 410, cenas: 420 }[group.scopeKey];
  return {
    ...group,
    key,
    title: group.scopeType === 'basic' ? strings.basicTitle : (strings.groupTitles[group.scopeKey] || group.title),
    // Preserve the original directory's Basic/category/service/other buckets.
    order: appendedOrder ?? ({ basic: 0, category: 100, service: 200, page: 300 }[group.scopeType] ?? 999),
  };
}

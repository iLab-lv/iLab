export function getReviewPlaces(reviewsSummary, locale = 'lv') {
  return ['domina', 'spice']
    .map((key) => {
      const source = reviewsSummary?.[key];
      if (!source) return null;

      const placeId = source.placeId || source.latest?.placeId;
      const href =
        source.reviewsUrl ||
        source.googleReviewsUrl ||
        source.mapsUrl ||
        (placeId
          ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(placeId)}`
          : null);
      const byLocale = source.featuredReviewsByLocale;

      return {
        key,
        label: source.latest?.name || source.name || key,
        rating: source.latest?.rating ?? source.rating ?? null,
        count: source.latest?.count ?? source.count ?? null,
        href,
        reviews:
          (Array.isArray(byLocale?.[locale]) && byLocale[locale]) ||
          (Array.isArray(byLocale?.lv) && byLocale.lv) ||
          source.featuredReviews || [],
      };
    })
    .filter(Boolean);
}

export function getStars(rating) {
  const value = Math.max(0, Math.min(5, Math.round(Number(rating))));
  if (!Number.isFinite(value)) return null;

  return { value, filled: '★'.repeat(value), empty: '☆'.repeat(5 - value) };
}

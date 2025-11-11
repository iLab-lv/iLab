const BASE = 'https://maps.googleapis.com/maps/api/place/details/json';

/**
 * Fetch just rating + user_ratings_total for a given place_id
 */
export async function getPlaceBasics(placeId) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error('Missing GOOGLE_MAPS_API_KEY');

  const url = new URL(BASE);
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'rating,user_ratings_total');
  url.searchParams.set('key', key);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);

  const json = await res.json();
  if (json.status !== 'OK') {
    throw new Error(`Places error: ${json.status} ${json.error_message ? `- ${json.error_message}` : ''}`);
  }

  const { rating, user_ratings_total } = json.result || {};
  return {
    rating: typeof rating === 'number' ? rating : null,
    count: typeof user_ratings_total === 'number' ? user_ratings_total : null,
  };
}

// lib/utils/serializeForClient.js

function isTimestampLike(v) {
  return (
    v &&
    typeof v === 'object' &&
    (typeof v.toDate === 'function' || ('_seconds' in v && '_nanoseconds' in v))
  );
}

function timestampToIso(v) {
  try {
    if (typeof v.toDate === 'function') {
      return v.toDate().toISOString();
    }

    // Fallback for plain object with _seconds/_nanoseconds
    const secs = Number(v._seconds || 0);
    const nanos = Number(v._nanoseconds || 0);
    return new Date(secs * 1000 + Math.floor(nanos / 1e6)).toISOString();
  } catch (e) {
    return null;
  }
}

function isGeoLike(v) {
  return (
    v &&
    typeof v === 'object' &&
    ((typeof v.latitude === 'number' && typeof v.longitude === 'number') ||
      (typeof v.lat === 'number' && typeof v.lng === 'number'))
  );
}

function geoToPlain(v) {
  if (!v) return null;
  if (typeof v.latitude === 'number' && typeof v.longitude === 'number') {
    return { lat: v.latitude, lng: v.longitude };
  }
  if (typeof v.lat === 'number' && typeof v.lng === 'number') {
    return { lat: v.lat, lng: v.lng };
  }
  return null;
}

function isDocumentRefLike(v) {
  return (
    v &&
    typeof v === 'object' &&
    typeof v.path === 'string' &&
    (typeof v.id === 'string' || typeof v.id === 'number')
  );
}

function docRefToString(v) {
  try {
    return v.path || v.id || String(v);
  } catch (e) {
    return null;
  }
}

export function serializeForClient(value) {
  if (value === null || value === undefined) return null;

  if (isTimestampLike(value)) return timestampToIso(value);

  if (isGeoLike(value)) return geoToPlain(value);

  if (isDocumentRefLike(value)) return docRefToString(value);

  if (Array.isArray(value)) {
    return value.map((v) => serializeForClient(v));
  }

  if (typeof value === 'object') {
    const out = {};
    const proto = Object.getPrototypeOf(value);
    const isPlain = proto === Object.prototype || proto === null;

    // Iterate own enumerable keys only
    for (const key of Object.keys(value)) {
      const v = value[key];

      // Skip functions and symbols
      if (typeof v === 'function' || typeof v === 'symbol') continue;

      out[key] = serializeForClient(v);
    }

    return out;
  }

  // Primitives (string, number, boolean)
  return value;
}

export default serializeForClient;

// Client feedback for the service drawer; the booking API remains authoritative.
export function validateBooking(values, { minDate, locationIds = [] } = {}) {
  const errors = {};
  for (const name of ['name', 'phone', 'device', 'date', 'fault', 'location', 'time']) {
    if (!String(values[name] || '').trim()) errors[name] = 'required';
  }
  const phone = String(values.phone || '').trim();
  if (phone && (!/^\+?[\d\s()-]+$/.test(phone) || phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15)) errors.phone = 'phoneInvalid';
  if (values.date && (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || (minDate && values.date < minDate))) errors.date = 'dateInvalid';
  if (values.location && !locationIds.includes(values.location)) errors.location = 'required';
  if (values.time && !['10:00-13:00', '13:00-17:00', '17:00-21:00'].includes(values.time)) errors.time = 'required';
  return errors;
}

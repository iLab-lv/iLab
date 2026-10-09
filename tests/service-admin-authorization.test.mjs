import test from 'node:test';
import assert from 'node:assert/strict';
import { canAccessServiceAdmin } from '../lib/auth/serviceAdminPolicy.mjs';

test('only an active admin may access the service admin', () => {
  const cases = [
    { label: 'anonymous', profile: null, allowed: false },
    { label: 'customer', profile: { role: 'customer', status: 'active' }, allowed: false },
    { label: 'partner', profile: { role: 'partner', status: 'active' }, allowed: false },
    { label: 'staff', profile: { role: 'staff', status: 'active' }, allowed: false },
    { label: 'disabled admin', profile: { role: 'admin', status: 'disabled' }, allowed: false },
    { label: 'inactive admin', profile: { role: 'admin', status: 'inactive' }, allowed: false },
    { label: 'admin without status', profile: { role: 'admin' }, allowed: false },
    { label: 'active admin', profile: { role: 'admin', status: 'active' }, allowed: true },
  ];

  for (const { label, profile, allowed } of cases) {
    assert.equal(canAccessServiceAdmin(profile), allowed, label);
  }
});

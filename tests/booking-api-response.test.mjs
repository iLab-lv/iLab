import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { getBookingFormContent } from '../app/(site)/components/booking/bookingForm.i18n.js';

const require = createRequire(import.meta.url);
const { transformSync } = require('next/dist/build/swc');
const { code } = transformSync(readFileSync(new URL('../app/api/booking/route.js', import.meta.url), 'utf8'), {
  filename: 'route.js',
  jsc: { parser: { syntax: 'ecmascript' }, target: 'es2022' },
  module: { type: 'commonjs' },
});

// Execute the real handler with isolated environment/provider/response boundaries.
// No Firebase import, network call, real credential or email delivery is possible.
function handler({ env = {}, failure } = {}) {
  const sent = [], logs = [];
  const config = {
    RESEND_API_KEY: 'fixture-api-key', BOOKING_FROM: 'sender@fixture.invalid',
    BOOKING_TO_DEFAULT: 'domina@fixture.invalid', BOOKING_TO_SPICE: 'spice@fixture.invalid',
    BOOKING_REPLY_TO: 'reply@fixture.invalid', ...env,
  };
  class Resend {
    emails = { send: async (payload) => {
      sent.push(payload);
      if (failure === 'throw') throw new Error('private-provider-exception');
      return failure === 'provider'
        ? { data: null, error: { message: 'private-provider-error', code: 'fixture-provider-code' } }
        : { data: { id: 'private-provider-id' }, error: null };
    } };
  }
  const evaluated = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'console', code)(id => {
    if (id === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    if (id === 'resend') return { Resend };
    throw new Error(`Unexpected handler dependency: ${id}`);
  }, evaluated, evaluated.exports, { env: config }, {
    log: (...args) => logs.push(args), error: (...args) => logs.push(args),
  });
  return { post: evaluated.exports.POST, sent, logs };
}

const booking = {
  name: 'Fixture <name>', phone: '+37120000000', device: 'Fixture device',
  fault: 'Fixture <fault>', date: '2030-01-02', time: '10:00–13:00', location: 'domina',
};
function request(body, multipart = false) {
  if (multipart) {
    const data = new FormData();
    for (const [key, value] of Object.entries(body)) data.set(key, value);
    return new Request('https://ilab.lv/api/booking', { method: 'POST', body: data });
  }
  return new Request('https://ilab.lv/api/booking', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
}

test('booking success has only its public outcome while recipient, reply-to and email content survive', async () => {
  for (const [location, recipient] of [['domina', 'domina'], ['spice', 'spice'], ['SPICE', 'spice']]) {
    const h = handler();
    const response = await h.post(request({ ...booking, location }));
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { ok: true });
    assert.equal(h.sent.length, 1);
    assert.equal(h.sent[0].to, `${recipient}@fixture.invalid`);
    assert.equal(h.sent[0].from, 'sender@fixture.invalid');
    assert.equal(h.sent[0].replyTo, 'reply@fixture.invalid');
    assert.match(h.sent[0].html, /Fixture &lt;fault&gt;/);
    assert.doesNotMatch(h.sent[0].html, /Fixture <fault>/);
    assert.match(h.sent[0].text, /Fixture <fault>/);
    assert.ok(JSON.stringify(h.logs).includes('private-provider-id'), 'provider result stays in server logs');
  }
});

test('multipart price and delivery leads preserve validation, branch fallback and email fields', async () => {
  const h = handler({ env: { BOOKING_TO_SPICE: undefined } });
  const price = { name: 'Fixture', phone: '123', device: 'Fixture', fault: 'Fixture', leadType: 'price' };
  assert.deepEqual((await h.post(request(price, true))).body, { ok: true });
  assert.match(h.sent[0].subject, /cenas pieprasījums/);
  assert.equal(h.sent[0].to, 'domina@fixture.invalid');
  const delivery = { ...price, leadType: 'delivery', location: 'spice', deliveryService: 'Fixture carrier', returnParcel: 'Fixture locker' };
  assert.deepEqual((await h.post(request(delivery, true))).body, { ok: true });
  assert.equal(h.sent[1].to, 'domina@fixture.invalid');
  assert.match(h.sent[1].text, /Fixture carrier/);
  assert.match(h.sent[1].text, /Fixture locker/);
});

test('configuration and provider failures return 500 without operational details and keep localized UI fallback', async () => {
  for (const options of [{ env: { BOOKING_FROM: undefined } }, { failure: 'provider' }, { failure: 'throw' }]) {
    const h = handler(options);
    const response = await h.post(request(booking));
    assert.equal(response.status, 500);
    assert.deepEqual(response.body, { ok: false });
    assert.ok(h.logs.length, 'failure has server-side diagnostics');
    assert.doesNotMatch(JSON.stringify(response.body), /fixture|provider|BOOKING|debug|from|to|dataId/i);
    for (const locale of ['lv', 'ru']) {
      const copy = getBookingFormContent(locale);
      assert.equal(response.body.error || copy.submitError, copy.submitError);
      assert.ok(copy.submitError);
    }
  }
});

test('unexpected request parsing errors remain 500 with no raw exception response', async () => {
  const h = handler();
  const response = await h.post({ headers: { get: () => 'application/json' }, json: async () => { throw new Error('private-parser-error'); } });
  assert.equal(response.status, 500);
  assert.deepEqual(response.body, { ok: false });
  assert.equal(h.sent.length, 0);
  assert.ok(h.logs.flat().some(value => String(value).includes('private-parser-error')));
});

test('missing-field validation and honeypot behavior do not deliver email', async () => {
  const h = handler();
  const missing = await h.post(request({ name: 'Fixture' }));
  assert.equal(missing.status, 400);
  assert.equal(missing.body.ok, false);
  assert.match(missing.body.error, /^Missing: phone, device, fault, date, location, time$/);
  const bot = await h.post(request({ ...booking, website: 'fixture.invalid' }));
  assert.equal(bot.status, 200);
  assert.deepEqual(bot.body, { ok: true, skipped: true, reason: 'honeypot' });
  assert.equal(h.sent.length, 0);
});

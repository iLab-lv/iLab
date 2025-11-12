// app/api/booking/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const toForLocation = (loc) => {
  const def = process.env.BOOKING_TO_DEFAULT;
  const spice = process.env.BOOKING_TO_SPICE;
  if (loc && String(loc).toLowerCase() === 'spice' && spice) return spice;
  return def;
};

export async function POST(req) {
  try {
    const ct = req.headers.get('content-type') || '';
    const body = ct.includes('application/json')
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries());

    const {
      name, phone, device, date, fault, location, time,
      website, // honeypot
    } = body;

    // Honeypot → silently accept to confuse bots
    if (website) return new Response(null, { status: 204 });

    const required = ['name','phone','device','date','fault','location','time'];
    const missing = required.filter((k) => !body[k]);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: `Missing: ${missing.join(', ')}` }, { status: 400 });
    }

    const from = process.env.BOOKING_FROM;
    const to = toForLocation(location);
    if (!from) return NextResponse.json({ ok: false, error: 'BOOKING_FROM is not set' }, { status: 500 });
    if (!to)   return NextResponse.json({ ok: false, error: 'Recipient is not configured' }, { status: 500 });

    const subject = `Jauns pieraksts (${location}) — ${device}`;
    const text = [
      `Vārds: ${name}`,
      `Tālrunis: ${phone}`,
      `Ierīce: ${device}`,
      `Datums: ${date}`,
      `Vēlamais laiks: ${time}`,
      `Filiāle: ${location}`,
      '',
      'Problēma:',
      fault,
    ].join('\n');

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b0b0b">
        <h2 style="margin:0 0 12px">Jauns pieraksts</h2>
        <ul style="margin:0 0 16px;padding-left:16px">
          <li><strong>Vārds:</strong> ${escapeHtml(name)}</li>
          <li><strong>Tālrunis:</strong> ${escapeHtml(phone)}</li>
          <li><strong>Ierīce:</strong> ${escapeHtml(device)}</li>
          <li><strong>Datums:</strong> ${escapeHtml(date)}</li>
          <li><strong>Vēlamais laiks:</strong> ${escapeHtml(time)}</li>
          <li><strong>Filiāle:</strong> ${escapeHtml(location)}</li>
        </ul>
        <p style="margin:0 0 4px"><strong>Problēma:</strong></p>
        <p style="white-space:pre-wrap;margin:0">${escapeHtml(fault)}</p>
      </div>
    `;

    const replyTo = process.env.BOOKING_REPLY_TO;
    await resend.emails.send({
      from,
      to,
      ...(replyTo ? { replyTo } : {}),
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 });
  }
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// app/api/booking/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FALLBACK_EMAIL = 'info@ilab.lv';

const LEAD_TYPES = {
  BOOKING: 'booking',
  PRICE: 'price',
};

const toForLocation = (loc) => {
  const def = process.env.BOOKING_TO_DEFAULT || FALLBACK_EMAIL;
  const spice = process.env.BOOKING_TO_SPICE;

  if (loc && String(loc).toLowerCase() === 'spice' && spice) {
    return spice;
  }

  return def;
};

function normalizeLeadType(value) {
  return value === LEAD_TYPES.PRICE ? LEAD_TYPES.PRICE : LEAD_TYPES.BOOKING;
}

function getRequiredFields(leadType) {
  const required = ['name', 'phone', 'device', 'fault'];

  if (leadType === LEAD_TYPES.BOOKING) {
    required.push('date', 'location', 'time');
  }

  return required;
}

function getLeadLabel(leadType) {
  return leadType === LEAD_TYPES.PRICE
    ? 'Cenas pieprasījums'
    : 'Pieraksts remontam';
}

export async function POST(req) {
  try {
    const ct = req.headers.get('content-type') || '';
    const body = ct.includes('application/json')
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries());

    const {
      name,
      phone,
      device,
      date,
      fault,
      location,
      time,
      website, // honeypot
    } = body;

    const leadType = normalizeLeadType(body.leadType);
    const leadLabel = getLeadLabel(leadType);

    // Honeypot
    if (website) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: 'honeypot',
      });
    }

    const required = getRequiredFields(leadType);
    const missing = required.filter((k) => !body[k]);

    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const from = process.env.BOOKING_FROM;
    const to = toForLocation(location);

    const debug = {
      hasApiKey: Boolean(process.env.RESEND_API_KEY),
      from,
      to,
      location: location || null,
      leadType,
    };

    if (!from) {
      console.error('BOOKING_FROM env var is missing');

      return NextResponse.json(
        { ok: false, error: 'BOOKING_FROM is not set', debug },
        { status: 500 }
      );
    }

    if (!to) {
      console.error('Recipient email not configured for location:', location);

      return NextResponse.json(
        { ok: false, error: 'Recipient is not configured', debug },
        { status: 500 }
      );
    }

    const subject =
      leadType === LEAD_TYPES.PRICE
        ? `Jauns cenas pieprasījums - ${device}`
        : `Jauns pieraksts (${location}) - ${device}`;

    const textLines = [
      `Tips: ${leadLabel}`,
      `Vārds: ${name}`,
      `Tālrunis: ${phone}`,
      `Ierīce: ${device}`,
    ];

    if (leadType === LEAD_TYPES.BOOKING) {
      textLines.push(
        `Datums: ${date}`,
        `Vēlamais laiks: ${time}`,
        `Filiāle: ${location}`
      );
    }

    textLines.push('', 'Problēma:', fault);

    const text = textLines.join('\n');

    const bookingDetailsHtml =
      leadType === LEAD_TYPES.BOOKING
        ? `
          <li><strong>Datums:</strong> ${escapeHtml(date)}</li>
          <li><strong>Vēlamais laiks:</strong> ${escapeHtml(time)}</li>
          <li><strong>Filiāle:</strong> ${escapeHtml(location)}</li>
        `
        : '';

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b0b0b">
        <h2 style="margin:0 0 12px">${escapeHtml(leadLabel)}</h2>

        <ul style="margin:0 0 16px;padding-left:16px">
          <li><strong>Tips:</strong> ${escapeHtml(leadLabel)}</li>
          <li><strong>Vārds:</strong> ${escapeHtml(name)}</li>
          <li><strong>Tālrunis:</strong> ${escapeHtml(phone)}</li>
          <li><strong>Ierīce:</strong> ${escapeHtml(device)}</li>
          ${bookingDetailsHtml}
        </ul>

        <p style="margin:0 0 4px"><strong>Problēma:</strong></p>
        <p style="white-space:pre-wrap;margin:0">${escapeHtml(fault)}</p>
      </div>
    `;

    const replyTo = process.env.BOOKING_REPLY_TO;

    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(replyTo ? { replyTo } : {}),
      subject,
      text,
      html,
    });

    console.log('Resend send result:', {
      to,
      from,
      leadType,
      data,
      error,
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Email send failed (Resend)',
          debug: { ...debug, error },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      debug: {
        ...debug,
        dataId: data?.id || null,
      },
    });
  } catch (err) {
    console.error('Booking API unexpected error:', err);

    return NextResponse.json(
      {
        ok: false,
        error: 'Email send failed (server)',
        debug: { message: String(err) },
      },
      { status: 500 }
    );
  }
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
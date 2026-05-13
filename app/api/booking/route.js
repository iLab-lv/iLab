// app/api/booking/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FALLBACK_EMAIL = 'info@ilab.lv';

const LEAD_TYPES = {
  BOOKING: 'booking',
  PRICE: 'price',
  DELIVERY: 'delivery',
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
  if (value === LEAD_TYPES.PRICE) return LEAD_TYPES.PRICE;
  if (value === LEAD_TYPES.DELIVERY) return LEAD_TYPES.DELIVERY;

  return LEAD_TYPES.BOOKING;
}

function getRequiredFields(leadType) {
  const required = ['name', 'phone', 'device', 'fault'];

  if (leadType === LEAD_TYPES.BOOKING) {
    required.push('date', 'location', 'time');
  }

  if (leadType === LEAD_TYPES.DELIVERY) {
    required.push('location', 'deliveryService');
  }

  return required;
}

function getLeadLabel(leadType) {
  if (leadType === LEAD_TYPES.PRICE) {
    return 'Cenas pieprasījums';
  }

  if (leadType === LEAD_TYPES.DELIVERY) {
    return 'Remonts ar piegādi';
  }

  return 'Pieraksts remontam';
}

function getSubject({ leadType, device, location }) {
  if (leadType === LEAD_TYPES.PRICE) {
    return `Jauns cenas pieprasījums - ${device}`;
  }

  if (leadType === LEAD_TYPES.DELIVERY) {
    return `Jauns piegādes pieteikums (${location || 'nav norādīts'}) - ${device}`;
  }

  return `Jauns pieraksts (${location}) - ${device}`;
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
      deliveryService,
      returnParcel,
      comment,
      website, // honeypot
    } = body;

    const leadType = normalizeLeadType(body.leadType);
    const leadLabel = getLeadLabel(leadType);

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

    const subject = getSubject({
      leadType,
      device,
      location,
    });

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

    if (leadType === LEAD_TYPES.DELIVERY) {
      textLines.push(
        `Filiāle, uz kuru nosūtīs: ${location}`,
        `Piegādes serviss: ${deliveryService}`
      );

      if (returnParcel) {
        textLines.push(`Atpakaļ pakomāts / pilsēta: ${returnParcel}`);
      }

      if (comment) {
        textLines.push('', 'Papildu komentārs:', comment);
      }
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

    const deliveryDetailsHtml =
      leadType === LEAD_TYPES.DELIVERY
        ? `
          <li><strong>Filiāle, uz kuru nosūtīs:</strong> ${escapeHtml(location)}</li>
          <li><strong>Piegādes serviss:</strong> ${escapeHtml(deliveryService)}</li>
          ${
            returnParcel
              ? `<li><strong>Atpakaļ pakomāts / pilsēta:</strong> ${escapeHtml(returnParcel)}</li>`
              : ''
          }
        `
        : '';

    const commentHtml =
      leadType === LEAD_TYPES.DELIVERY && comment
        ? `
          <p style="margin:16px 0 4px"><strong>Papildu komentārs:</strong></p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(comment)}</p>
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
          ${deliveryDetailsHtml}
        </ul>

        <p style="margin:0 0 4px"><strong>Problēma:</strong></p>
        <p style="white-space:pre-wrap;margin:0">${escapeHtml(fault)}</p>

        ${commentHtml}
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
/**
 * netlify/functions/enquiry.ts
 *
 * Receives a contact-form POST and forwards it to a Telegram chat via the
 * Bot API. No database. No external service besides Telegram itself.
 *
 * Required environment variables (set in Netlify → Site settings → Env):
 *   TELEGRAM_BOT_TOKEN   – From @BotFather
 *   TELEGRAM_CHAT_ID     – Your numeric Telegram user ID (or a group's)
 *
 * Optional:
 *   ALLOWED_ORIGIN       – If set, only that Origin can call this fn.
 *                          Defaults to allowing any origin so you can test
 *                          via the Netlify deploy preview URL too.
 *
 * Why a Netlify Function and not call Telegram from the browser?
 *   Because the bot token is a long-lived credential — if it leaks, anyone
 *   can post to your Telegram chat (or worse). Keeping the call server-side
 *   means the token never ships to clients.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  dates?: string;
  message?: string;
  // Honeypot — must be empty for a real submission. Bots fill every field
  // they find; humans never see this one.
  website?: string;
};

// Trim, collapse newlines, and clip to a sane length so a single bad
// submission can't blow past Telegram's 4096-char per-message limit.
function clean(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.replace(/\s+/g, ' ').trim().slice(0, max);
}

// Telegram's HTML parse mode is liberal but we still need to escape the
// big three so a guest's < > or & doesn't break the markup.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async (req: Request): Promise<Response> => {
  // CORS — same-origin in production, but the preflight is still expected
  // by some browsers when the page is on a slightly different subdomain.
  const allowedOrigin = Netlify.env.get('ALLOWED_ORIGIN') ?? '*';
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const token = Netlify.env.get('TELEGRAM_BOT_TOKEN');
  const chatId = Netlify.env.get('TELEGRAM_CHAT_ID');
  if (!token || !chatId) {
    // Configuration error — log loudly, return generic message to client.
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env var');
    return new Response(
      JSON.stringify({ ok: false, error: 'Server misconfigured' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Honeypot: silently succeed on bot submissions. We don't 400 because that
  // would tell scrapers their fill-everything strategy is being detected;
  // returning ok-200 makes us look like a stupid form they can ignore.
  if (clean(body.website, 100) !== '') {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const name    = clean(body.name,    120);
  const email   = clean(body.email,   200);
  const phone   = clean(body.phone,    60);
  const subject = clean(body.subject,  60) || 'General enquiry';
  const dates   = clean(body.dates,   120);
  const message = clean(body.message, 3000);

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Name, email and message are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  // Composed message. HTML parse-mode so we can bold the labels.
  const lines = [
    `<b>📩 New enquiry — The Melva</b>`,
    ``,
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    phone ? `<b>Phone:</b> ${escapeHtml(phone)}` : null,
    `<b>Subject:</b> ${escapeHtml(subject)}`,
    dates ? `<b>Dates:</b> ${escapeHtml(dates)}` : null,
    ``,
    `<b>Message:</b>`,
    escapeHtml(message),
  ].filter(Boolean);

  const text = lines.join('\n');

  // Send to Telegram. We don't retry — if Telegram is down right now we
  // tell the guest to try WhatsApp instead.
  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!tg.ok) {
      const errText = await tg.text();
      console.error('Telegram API error:', tg.status, errText);
      return new Response(
        JSON.stringify({ ok: false, error: 'Telegram delivery failed' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      );
    }
  } catch (e) {
    console.error('Telegram fetch failed:', e);
    return new Response(
      JSON.stringify({ ok: false, error: 'Telegram delivery failed' }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};

export const config = {
  path: '/api/enquiry',
};

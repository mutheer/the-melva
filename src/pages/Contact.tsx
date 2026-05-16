import { useState } from 'react';
import PageHero from '../components/Layout/PageHero';
import {
  IconPhone, IconMail, IconWhatsApp, IconArrow, IconCheck,
} from '../components/Layout/Icons';
import {
  PHONE_PRIMARY, PHONE_SECONDARY, EMAIL,
  ADDRESS_LINES, MAPS_URL, WHATSAPP_URL,
} from '../data/static';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  dates: string;
  message: string;
  // Honeypot — see netlify/functions/enquiry.ts
  website: string;
};

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'General enquiry',
  dates: '',
  message: '',
  website: '',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Contact"
        title={<>Write to us, <span className="italic-accent">directly</span>.</>}
        lede="The front desk is staffed twenty-four hours, and the warmest answers come over the phone. Reach us any of the ways below — or send a note and we'll reply within the day."
      />

      <section className="stack-lg">
        <div className="container-x">
          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(40px, 6vw, 80px)' }}
          >
            {/* Form column */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              padding: 'clamp(28px, 5vw, 48px)',
            }}>
              {status === 'sent' ? (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                  <div
                    style={{
                      width: 64, height: 64, borderRadius: '50%',
                      border: '1px solid var(--accent)',
                      display: 'grid', placeItems: 'center',
                      margin: '0 auto 24px',
                      color: 'var(--accent)',
                    }}
                  >
                    <IconCheck size={28} />
                  </div>
                  <h3 className="display" style={{ fontSize: 32, margin: 0 }}>
                    Thank you, <span className="italic-accent">{form.name.split(' ')[0] || 'friend'}</span>.
                  </h3>
                  <p style={{ marginTop: 14, color: 'var(--ink-soft)', maxWidth: 460, marginInline: 'auto' }}>
                    Your note has reached us. We'll reply within the day. If it's urgent, please call the front desk on{' '}
                    <a href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`} style={{ color: 'var(--accent)' }}>{PHONE_PRIMARY}</a>.
                  </p>
                  <button
                    onClick={() => { setForm(EMPTY_FORM); setStatus('idle'); }}
                    className="btn btn-ghost btn-small"
                    style={{ marginTop: 28 }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="eyebrow"><span className="accent-line" />Send us a note</div>
                  <h3 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', margin: '14px 0 28px' }}>
                    Tell us about your <span className="italic-accent">stay</span>.
                  </h3>

                  <div className="form-grid">
                    <Field label="Full name" required>
                      <input
                        required
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update('name')}
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update('email')}
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update('phone')}
                      />
                    </Field>
                    <Field label="Subject">
                      <select value={form.subject} onChange={update('subject')}>
                        <option>General enquiry</option>
                        <option>Booking question</option>
                        <option>Group booking</option>
                        <option>Private event</option>
                        <option>Press / partnership</option>
                      </select>
                    </Field>
                    <Field label="Approximate dates (optional)" span={2}>
                      <input
                        type="text"
                        placeholder="e.g. 14–17 March"
                        value={form.dates}
                        onChange={update('dates')}
                      />
                    </Field>
                    <Field label="Message" required span={2}>
                      <textarea
                        required
                        value={form.message}
                        onChange={update('message')}
                        rows={5}
                      />
                    </Field>
                  </div>

                  {/* Honeypot — visually hidden, but accessible to no one
                      (and tab-skipped). Real users never touch this; bots
                      almost always fill it. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update('website')}
                    style={{
                      position: 'absolute',
                      width: 1, height: 1,
                      padding: 0, margin: -1, overflow: 'hidden',
                      clip: 'rect(0,0,0,0)', border: 0,
                    }}
                    aria-hidden="true"
                  />

                  {status === 'error' && (
                    <p style={{
                      marginTop: 20, color: '#A03030',
                      fontSize: 14, fontWeight: 500,
                      padding: '12px 14px',
                      background: 'rgba(160,48,48,.08)',
                      border: '1px solid rgba(160,48,48,.25)',
                    }}>
                      {error || "Something went wrong. Please try WhatsApp instead, or call us directly."}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-accent"
                    disabled={status === 'sending'}
                    style={{ marginTop: 28 }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}{' '}
                    {status !== 'sending' && <IconArrow size={14} />}
                  </button>

                  <p style={{
                    marginTop: 16, fontSize: 12, color: 'var(--muted)',
                    letterSpacing: '0.04em',
                  }}>
                    Prefer not to fill a form? <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                    >
                      Message us on WhatsApp
                    </a> instead.
                  </p>
                </form>
              )}
            </div>

            {/* Info column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <div className="eyebrow"><span className="accent-line" />Visit</div>
                <h3 className="display" style={{ fontSize: 28, margin: '14px 0 10px' }}>The address</h3>
                <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                  {ADDRESS_LINES.map((l, i) => (
                    <span key={l}>{l}{i < ADDRESS_LINES.length - 1 && <br />}</span>
                  ))}
                </p>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="link" style={{ marginTop: 14 }}>
                  Open in Google Maps
                </a>
              </div>

              <hr className="rule" />

              <div>
                <div className="eyebrow"><span className="accent-line" />Reach</div>
                <h3 className="display" style={{ fontSize: 28, margin: '14px 0 10px' }}>Direct lines</h3>
                <ul style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: 12,
                  color: 'var(--ink-soft)',
                }}>
                  <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <IconPhone size={16} style={{ color: 'var(--accent)' }} />
                    <a href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{PHONE_PRIMARY}</a>
                  </li>
                  <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <IconPhone size={16} style={{ color: 'var(--accent)' }} />
                    <a href={`tel:${PHONE_SECONDARY.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{PHONE_SECONDARY}</a>
                  </li>
                  <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <IconMail size={16} style={{ color: 'var(--accent)' }} />
                    <a href={`mailto:${EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>{EMAIL}</a>
                  </li>
                  <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent)' }}><IconWhatsApp size={16} /></span>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      WhatsApp the front desk
                    </a>
                  </li>
                </ul>
              </div>

              <hr className="rule" />

              <div>
                <div className="eyebrow"><span className="accent-line" />Hours</div>
                <h3 className="display" style={{ fontSize: 28, margin: '14px 0 10px' }}>Front desk</h3>
                <p style={{ color: 'var(--ink-soft)', margin: 0 }}>Open 24 hours, every day of the year.</p>
              </div>

              <hr className="rule" />

              <div className="img-slot" style={{ overflow: 'hidden', filter: 'grayscale(0.4) contrast(0.95)', height: 280 }}>
                <iframe
                  title="The Melva Elegant Guest House — location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.7127835074716!2d25.923100000000003!3d-24.6282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebb5b5a7f3fb0f5%3A0x4b7b7d7d7d7d7d7d!2sThe%20Melva%20Elegant%20Guest%20House!5e0!3m2!1sen!2sbw!4v1620000000000!5m2!1sen!2sbw"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }

          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
          .form-field { display: flex; flex-direction: column; gap: 8px; }
          .form-field label {
            font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
            color: var(--muted); font-weight: 500;
          }
          .form-field input,
          .form-field select,
          .form-field textarea {
            background: var(--bg);
            border: 1px solid var(--line);
            padding: 14px 16px;
            font-family: 'Manrope', sans-serif;
            font-size: 15px;
            color: var(--ink);
            transition: border-color var(--t-fast);
            outline: 0;
          }
          .form-field textarea { resize: vertical; min-height: 130px; }
          .form-field input:focus,
          .form-field select:focus,
          .form-field textarea:focus {
            border-color: var(--accent);
          }
          @media (max-width: 700px) {
            .form-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>
    </div>
  );
}

/* Small helper to keep the form JSX from spiralling. */
function Field({
  label, required, span = 1, children,
}: {
  label: string;
  required?: boolean;
  span?: 1 | 2;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field" style={{ gridColumn: span === 2 ? '1 / -1' : undefined }}>
      <label>
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

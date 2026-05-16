import { Link } from 'react-router-dom';
import {
  rooms, testimonials, facts, BOOKING_URL,
} from '../data/static';
import { IconArrow, IconStar } from '../components/Layout/Icons';

export default function Home() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);

  return (
    <div className="page-enter">
      {/* ---------------- HERO ---------------- */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>
        {/* Blurred low-res placeholder behind the real photo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/hero-blur.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/hero.jpg"
            alt="The Melva Elegant Guest House at dusk"
            fetchPriority="high"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background:
                'linear-gradient(180deg, rgba(15,14,12,.55) 0%, rgba(15,14,12,.25) 30%, rgba(15,14,12,.05) 55%, rgba(15,14,12,.7) 100%)',
            }}
          />
        </div>

        <div
          className="container-x"
          style={{
            position: 'relative', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            paddingBottom: 'clamp(80px, 12vw, 140px)',
            color: '#FBF8F2',
          }}
        >
          <div className="eyebrow" style={{ color: 'rgba(251,248,242,.85)' }}>
            <span className="accent-line" style={{ background: 'var(--accent-soft)' }} />
            Gaborone · Botswana · Est. 2018
          </div>
          <h1
            className="display"
            style={{
              color: '#FBF8F2',
              fontSize: 'clamp(48px, 8vw, 116px)',
              margin: '20px 0 0',
              maxWidth: '16ch',
            }}
          >
            A quieter way<br />to stay in <span className="italic-accent" style={{ fontWeight: 400 }}>Gaborone.</span>
          </h1>
          <p
            className="lede"
            style={{
              color: 'rgba(251,248,242,.88)',
              marginTop: 28,
              maxWidth: '52ch',
              fontWeight: 300,
            }}
          >
            A small, considered guest house — a walled garden, a quiet table for late breakfasts, and a key waiting at the front desk. Ten minutes from the airport. Five from the city.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Book a Stay <IconArrow size={14} />
            </a>
            <Link to="/rooms" className="btn btn-light">
              Explore Rooms
            </Link>
          </div>
        </div>

        {/* scroll hint */}
        <div
          style={{
            position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)',
            color: 'rgba(251,248,242,.7)',
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}
        >
          <span>Scroll</span>
          <span style={{ width: 1, height: 36, background: 'rgba(251,248,242,.5)' }} />
        </div>
      </section>

      {/* ---------------- WELCOME / SENSE OF PLACE ---------------- */}
      <section className="stack-xl">
        <div className="container-x">
          <div
            className="welcome-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: 'clamp(48px, 8vw, 120px)',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="eyebrow"><span className="accent-line" />Welcome</div>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', margin: '20px 0 0' }}>
                A boutique<br />guest house,<br />kept <span className="italic-accent">small</span><br />on purpose.
              </h2>
            </div>
            <div style={{ paddingTop: 24 }}>
              <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--ink-soft)', fontWeight: 300, margin: 0 }}>
                The Melva is a small, considered guest house — built around the idea that you should be recognised by name on day two, and left alone with a newspaper on day three if that's what the morning calls for.
              </p>
              <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--ink-soft)', fontWeight: 300, marginTop: 22 }}>
                Tucked into the quiet of Gabamutsha and run by a family that has been in the trade longer than most. We keep the lights on for late arrivals and pour generous coffee for the early ones.
              </p>
              <div style={{ marginTop: 36 }}>
                <Link to="/rooms" className="link">View our rooms</Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .welcome-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* ---------------- FACTS STRIP ---------------- */}
      <section style={{ background: 'var(--bg-soft)' }}>
        <div className="container-x" style={{ paddingBlock: 56 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 0,
            }}
          >
            {facts.map((f, i) => (
              <div
                key={f.label}
                style={{
                  padding: '8px 24px',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
                  textAlign: 'center',
                }}
              >
                <div className="display" style={{ fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1 }}>
                  {f.value}
                </div>
                <div className="eyebrow" style={{ marginTop: 10, color: 'var(--muted)' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED ROOMS ---------------- */}
      <section className="stack-xl">
        <div className="container-x">
          <div
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'end',
              marginBottom: 56, flexWrap: 'wrap', gap: 24,
            }}
          >
            <div>
              <div className="eyebrow"><span className="accent-line" />Stay With Us</div>
              <h2
                className="display"
                style={{ fontSize: 'clamp(36px, 5vw, 68px)', margin: '20px 0 0', maxWidth: '20ch' }}
              >
                Every room, one <span className="italic-accent">standard</span> of care.
              </h2>
            </div>
            <Link to="/rooms" className="link">All rooms &amp; rates</Link>
          </div>

          <div className="rooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {rooms.map((r, i) => (
              <article key={r.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
                <div style={{ aspectRatio: '4/5', position: 'relative' }} className="img-slot">
                  <div className="img-real-wrap" style={{ position: 'absolute', inset: 0 }}>
                    <img className="img-real" loading="lazy" decoding="async" src={r.image} alt={r.name} />
                  </div>
                  <span
                    style={{
                      position: 'absolute', left: 18, top: 18,
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: '#FBF8F2',
                      background: 'rgba(20,18,16,.7)',
                      padding: '6px 10px',
                    }}
                  >
                    0{i + 1} · {r.size}
                  </span>
                </div>
                <div style={{ padding: '28px 26px 30px' }}>
                  <h3 className="display" style={{ fontSize: 28, margin: 0 }}>{r.name}</h3>
                  <p className="italic-accent" style={{ color: 'var(--muted)', fontSize: 17, margin: '8px 0 0' }}>
                    {r.tagline}
                  </p>
                  <hr className="rule" style={{ margin: '22px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontFamily: 'Marcellus, serif', fontSize: 28 }}>{r.currency}{r.price}</span>
                      <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 13 }}>/ night</span>
                    </div>
                    <Link to="/rooms" className="link" style={{ fontSize: 11 }}>Details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) { .rooms-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px) { .rooms-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ---------------- INTERMEZZO PULL-QUOTE ---------------- */}
      <section style={{ background: 'var(--bg-soft)' }}>
        <div className="container-x stack-lg" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="accent-line" />A note from our guests
          </div>
          <blockquote
            className="italic-accent"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              lineHeight: 1.25,
              color: 'var(--ink)',
              maxWidth: '24ch',
              margin: '32px auto 0',
              fontWeight: 500,
            }}
          >
            “The attention to detail is impeccable. The staff went above and beyond to make my stay memorable.”
          </blockquote>
          <div className="eyebrow" style={{ marginTop: 32, color: 'var(--muted)' }}>
            David Williams · London
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY PREVIEW ---------------- */}
      <section className="stack-xl">
        <div className="container-x">
          <div
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'end',
              marginBottom: 48, flexWrap: 'wrap', gap: 24,
            }}
          >
            <div>
              <div className="eyebrow"><span className="accent-line" />The House</div>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', margin: '20px 0 0' }}>
                See it for <span className="italic-accent">yourself</span>.
              </h2>
            </div>
            <Link to="/gallery" className="link">Full gallery</Link>
          </div>

          <div
            className="gallery-preview"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gridTemplateRows: '320px 280px',
              gap: 18,
            }}
          >
            <div style={{ gridColumn: '1 / 2', gridRow: '1 / 3', position: 'relative' }} className="img-slot">
              <div className="img-real-wrap"><img className="img-real" loading="lazy" decoding="async" src="/hero.jpg" alt="The Melva at dusk" /></div>
            </div>
            <div style={{ position: 'relative' }} className="img-slot">
              <div className="img-real-wrap"><img className="img-real" loading="lazy" decoding="async" src="/lounge-dining.jpg" alt="The dining and lounge space" /></div>
            </div>
            <div style={{ position: 'relative' }} className="img-slot">
              <div className="img-real-wrap"><img className="img-real" loading="lazy" decoding="async" src="/room-executive.jpg" alt="Executive Room" /></div>
            </div>
            <div style={{ position: 'relative' }} className="img-slot">
              <div className="img-real-wrap"><img className="img-real" loading="lazy" decoding="async" src="/terrace.jpg" alt="The outdoor terrace" /></div>
            </div>
            <div style={{ position: 'relative' }} className="img-slot">
              <div className="img-real-wrap"><img className="img-real" loading="lazy" decoding="async" src="/bathroom.jpg" alt="Clawfoot bath and lotus shower" /></div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 820px) {
            .gallery-preview {
              grid-template-columns: 1fr 1fr !important;
              grid-template-rows: 220px 220px 220px !important;
            }
            .gallery-preview > :first-child { grid-column: 1 / -1 !important; grid-row: auto !important; }
          }
        `}</style>
      </section>

      {/* ---------------- TESTIMONIALS PREVIEW ---------------- */}
      <section style={{ background: 'var(--bg-soft)' }} className="stack-xl">
        <div className="container-x">
          <div style={{ marginBottom: 56 }}>
            <div className="eyebrow"><span className="accent-line" />Guest Stories</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', margin: '20px 0 0' }}>
              Why people come <span className="italic-accent">back</span>.
            </h2>
          </div>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {featuredTestimonials.map((t) => (
              <article
                key={t.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--line)',
                  padding: '36px 32px',
                  display: 'flex', flexDirection: 'column',
                  minHeight: 320,
                }}
              >
                <div style={{ display: 'flex', gap: 2, color: 'var(--accent)' }}>
                  {Array.from({ length: t.rating }).map((_, i) => <IconStar key={i} size={14} />)}
                </div>
                <h3
                  className="display"
                  style={{ fontSize: 26, margin: '20px 0 16px', maxWidth: '16ch' }}
                >
                  “{t.short}”
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.65, flex: 1, margin: 0 }}>
                  {t.text}
                </p>
                <hr className="rule" style={{ margin: '24px 0 16px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div className="eyebrow" style={{ marginTop: 6, color: 'var(--muted)' }}>
                    {t.location} · {t.stay}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <Link to="/testimonials" className="link">Read all stories</Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .testimonials-grid { grid-template-columns: 1fr !important; max-width: 600px; margin: 0 auto; }
          }
        `}</style>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section style={{ position: 'relative', minHeight: 520, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/hero.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.85)' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(15,14,12,.4), rgba(15,14,12,.7))',
            }}
          />
        </div>
        <div
          className="container-x"
          style={{
            position: 'relative',
            minHeight: 520,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            color: '#FBF8F2',
            textAlign: 'center',
            paddingBlock: 120,
          }}
        >
          <div className="eyebrow" style={{ color: 'rgba(251,248,242,.85)' }}>
            <span className="accent-line" style={{ background: 'var(--accent-soft)' }} />Ready when you are
          </div>
          <h2
            className="display"
            style={{ color: '#FBF8F2', fontSize: 'clamp(40px, 6vw, 80px)', margin: '20px 0 22px', maxWidth: '20ch' }}
          >
            Come stay <span className="italic-accent">a while</span>.
          </h2>
          <p style={{ color: 'rgba(251,248,242,.85)', maxWidth: '48ch', fontSize: 17, fontWeight: 300 }}>
            A direct booking is the most considerate rate — and we keep a room or two back for guests who write to us by name.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Book a Stay <IconArrow size={14} />
            </a>
            <Link to="/contact" className="btn btn-light">Write to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

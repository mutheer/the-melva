import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { testimonials, BOOKING_URL } from '../data/static';
import { IconArrow, IconStar } from '../components/Layout/Icons';
import PageHero from '../components/Layout/PageHero';

export default function Testimonials() {
  const featured = useMemo(() => testimonials.filter((t) => t.featured), []);
  const all = testimonials;
  const [active, setActive] = useState(0);

  // Auto-advance featured carousel every 7s
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % featured.length), 7000);
    return () => clearInterval(id);
  }, [featured.length]);

  const avg = (all.reduce((s, t) => s + t.rating, 0) / all.length).toFixed(1);

  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Guest Stories"
        title={<>What our guests <span className="italic-accent">say</span>.</>}
        lede="The most honest thing we can show you is what people who have already stayed have written. Here it is, unedited."
      />

      {/* Trust strip */}
      <section
        style={{
          background: 'var(--bg-soft)',
          padding: '40px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="container-x"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24,
            textAlign: 'center',
          }}
        >
          <div>
            <div className="display" style={{ fontSize: 44 }}>
              {avg}<span style={{ fontSize: 22, color: 'var(--muted)' }}>/5</span>
            </div>
            <div className="eyebrow" style={{ marginTop: 8, color: 'var(--muted)' }}>Average rating</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--line)' }}>
            <div className="display" style={{ fontSize: 44 }}>{all.length}+</div>
            <div className="eyebrow" style={{ marginTop: 8, color: 'var(--muted)' }}>Stays reviewed</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--line)' }}>
            <div className="display" style={{ fontSize: 44 }}>
              94<span style={{ fontSize: 22, color: 'var(--muted)' }}>%</span>
            </div>
            <div className="eyebrow" style={{ marginTop: 8, color: 'var(--muted)' }}>Return guests</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--line)' }}>
            <div className="display" style={{ fontSize: 44 }}>17</div>
            <div className="eyebrow" style={{ marginTop: 8, color: 'var(--muted)' }}>Countries hosted</div>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="stack-xl">
        <div className="container-x">
          <div
            className="testimonial-feature"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 'clamp(40px, 6vw, 90px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow"><span className="accent-line" />Featured story</div>
              <blockquote
                key={featured[active].id}
                className="italic-accent"
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: 1.25,
                  color: 'var(--ink)',
                  margin: '28px 0 0',
                  fontWeight: 500,
                  transition: 'opacity var(--t-med)',
                }}
              >
                “{featured[active].text}”
              </blockquote>
              <div style={{ display: 'flex', gap: 2, color: 'var(--accent)', marginTop: 32 }}>
                {Array.from({ length: featured[active].rating }).map((_, i) => <IconStar key={i} size={16} />)}
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{featured[active].name}</div>
                <div className="eyebrow" style={{ marginTop: 6, color: 'var(--muted)' }}>
                  {featured[active].location} · {featured[active].stay}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 36 }}>
                {featured.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${t.name}'s story`}
                    style={{
                      width: i === active ? 44 : 14,
                      height: 2,
                      background: i === active ? 'var(--accent)' : 'var(--line)',
                      border: 0,
                      cursor: 'pointer',
                      transition: 'width var(--t-fast), background var(--t-fast)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="img-slot" style={{ aspectRatio: '4/5', position: 'relative' }}>
              <div className="img-real-wrap">
                <img className="img-real" loading="lazy" decoding="async" src="/room-executive.jpg" alt="An Executive room at The Melva" />
              </div>
              <div
                style={{
                  position: 'absolute', left: 18, top: 18,
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#FBF8F2',
                  background: 'rgba(20,18,16,.7)',
                  padding: '6px 10px',
                }}
              >
                The Melva
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .testimonial-feature { grid-template-columns: 1fr !important; }
            .testimonial-feature > :last-child { max-height: 360px; }
          }
        `}</style>
      </section>

      {/* All stories grid */}
      <section style={{ background: 'var(--bg-soft)' }} className="stack-xl">
        <div className="container-x">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow"><span className="accent-line" />All stories</div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '16px 0 0' }}>
              Every voice, on the <span className="italic-accent">record</span>.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {all.map((t) => (
              <article
                key={t.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--line)',
                  padding: '32px 28px',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', gap: 2, color: 'var(--accent)' }}>
                  {Array.from({ length: t.rating }).map((_, i) => <IconStar key={`f${i}`} size={14} />)}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => <IconStar key={`e${i}`} size={14} filled={false} />)}
                </div>
                <h3 className="display" style={{ fontSize: 22, margin: '16px 0 12px' }}>“{t.short}”</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {t.text}
                </p>
                <hr className="rule" style={{ margin: '22px 0 14px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div className="eyebrow" style={{ marginTop: 6, color: 'var(--muted)' }}>
                    {t.location} · {t.stay}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="stack-lg" style={{ textAlign: 'center' }}>
        <div className="container-x" style={{ maxWidth: 640 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: 0 }}>
            Add yours, in <span className="italic-accent">time</span>.
          </h2>
          <p className="lede" style={{ marginTop: 18, marginBottom: 32 }}>
            Book a stay and tell us how we did. We read every review and we change what we can.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Book a Stay <IconArrow size={14} />
            </a>
            <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

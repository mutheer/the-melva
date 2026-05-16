import { Link } from 'react-router-dom';
import {
  rooms, BOOKING_URL,
} from '../data/static';
import {
  IconArrow, IconCheck, IconClock, IconCoffee,
  IconWifi, IconCar, IconPhone,
} from '../components/Layout/Icons';
import PageHero from '../components/Layout/PageHero';

export default function Rooms() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Rooms & Rates"
        title={<>Rooms, kept to one <span className="italic-accent">standard</span>.</>}
        lede="Each room linen-dressed, blackout-drawn, and built around the same quiet idea — a place that feels like it was kept open for you."
      />

      {/* Rooms list — alternating left/right rows */}
      <section className="stack-xl">
        <div
          className="container-x"
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(80px, 12vw, 140px)' }}
        >
          {rooms.map((room, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={room.id}
                className="room-card-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: reverse ? '1fr 1.1fr' : '1.1fr 1fr',
                  gap: 'clamp(32px, 6vw, 90px)',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: reverse ? 2 : 1 }}>
                  <div className="img-slot" style={{ aspectRatio: '4/3', position: 'relative' }}>
                    <div className="img-real-wrap" style={{ position: 'absolute', inset: 0 }}>
                      <img className="img-real" loading="lazy" decoding="async" src={room.image} alt={room.name} />
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
                      0{i + 1}
                    </span>
                  </div>
                </div>

                <div style={{ order: reverse ? 1 : 2 }}>
                  <div className="eyebrow"><span className="accent-line" />{room.size} · {room.bed}</div>
                  <h2
                    className="display"
                    style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', margin: '16px 0 12px' }}
                  >
                    {room.name}
                  </h2>
                  <p
                    className="italic-accent"
                    style={{ fontSize: 22, color: 'var(--accent)', margin: '0 0 22px' }}
                  >
                    {room.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: 17, lineHeight: 1.65,
                      color: 'var(--ink-soft)', maxWidth: '56ch', margin: 0,
                    }}
                  >
                    {room.description}
                  </p>

                  <div
                    style={{
                      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px 24px',
                      margin: '32px 0',
                      maxWidth: 460,
                    }}
                  >
                    {room.amenities.map((a) => (
                      <div
                        key={a}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          fontSize: 14, color: 'var(--ink-soft)',
                        }}
                      >
                        <IconCheck size={14} style={{ color: 'var(--accent)', flex: '0 0 14px' }} />
                        {a}
                      </div>
                    ))}
                  </div>

                  <hr className="rule" />
                  <div
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: 24, flexWrap: 'wrap', gap: 18,
                    }}
                  >
                    <div>
                      <span style={{ fontFamily: 'Marcellus, serif', fontSize: 40 }}>
                        {room.currency}{room.price}
                      </span>
                      <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 14 }}>/ night</span>
                    </div>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-small btn-accent"
                    >
                      Book This Room <IconArrow size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 880px) {
            .room-card-row { grid-template-columns: 1fr !important; }
            .room-card-row > :first-child { order: 1 !important; }
            .room-card-row > :last-child  { order: 2 !important; }
          }
        `}</style>
      </section>

      {/* House notes */}
      <section style={{ background: 'var(--bg-soft)' }} className="stack-lg">
        <div className="container-x">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow"><span className="accent-line" />House Notes</div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '16px 0 0' }}>
              The small print, made <span className="italic-accent">larger</span>.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 0,
            }}
          >
            {[
              { Icon: IconClock,  title: 'Check-in',   body: 'From 14:00 — late arrivals welcome by arrangement.' },
              { Icon: IconClock,  title: 'Check-out',  body: 'By 11:00 — extended stays available on request.' },
              { Icon: IconCoffee, title: 'Breakfast',  body: 'P100 per person · served from 06:30 to 10:00.' },
              { Icon: IconWifi,   title: 'Wi-Fi',      body: 'Complimentary fibre throughout the house.' },
              { Icon: IconCar,    title: 'Parking',    body: 'Private, gated parking included in your stay.' },
              { Icon: IconPhone,  title: 'Front Desk', body: 'Staffed 24 hours, every day of the year.' },
            ].map((x, i) => (
              <div
                key={x.title}
                style={{
                  padding: '28px 28px',
                  borderLeft: i > 0 && i % 3 !== 0 ? '1px solid var(--line)' : 'none',
                }}
              >
                <x.Icon size={22} style={{ color: 'var(--accent)' }} />
                <h4 className="display" style={{ fontSize: 22, margin: '14px 0 8px' }}>{x.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="stack-lg" style={{ textAlign: 'center' }}>
        <div className="container-x" style={{ maxWidth: 680 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: 0 }}>
            Found the right <span className="italic-accent">room?</span>
          </h2>
          <p className="lede" style={{ marginTop: 18, marginBottom: 32 }}>
            Confirmed availability and instant booking are handled by Booking.com. You can also write or call us directly.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Check Availability <IconArrow size={14} />
            </a>
            <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

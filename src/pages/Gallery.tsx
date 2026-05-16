import { useEffect, useMemo, useState } from 'react';
import { galleryImages, GalleryImage, BOOKING_URL } from '../data/static';
import PageHero from '../components/Layout/PageHero';
import { IconArrow, IconArrowLeft, IconClose } from '../components/Layout/Icons';

const CATEGORIES = ['All', 'Exterior', 'Rooms', 'Dining', 'Lounge', 'Bathroom'] as const;
type Category = typeof CATEGORIES[number];

/**
 * Lightbox is its own component so its keyboard-listener effect cleans up
 * cleanly when closed.
 */
function Lightbox({
  images, index, onClose, onIndex,
}: {
  images: GalleryImage[]; index: number | null;
  onClose: () => void; onIndex: (i: number) => void;
}) {
  const open = index != null && index >= 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onIndex(((index! - 1) + images.length) % images.length);
      else if (e.key === 'ArrowRight') onIndex((index! + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, images, onClose, onIndex]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  const img = images[index!];
  return (
    <div className="lightbox open" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">
        <IconClose size={20} />
      </button>
      <button
        className="lightbox-nav prev"
        onClick={(e) => { e.stopPropagation(); onIndex(((index! - 1) + images.length) % images.length); }}
        aria-label="Previous"
      >
        <IconArrowLeft size={20} />
      </button>
      <button
        className="lightbox-nav next"
        onClick={(e) => { e.stopPropagation(); onIndex((index! + 1) % images.length); }}
        aria-label="Next"
      >
        <IconArrow size={20} />
      </button>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '92vw', maxHeight: '88vh' }}>
        <img src={img.url} alt={img.caption} className="lightbox-img" />
      </div>
      <div className="lightbox-caption">
        <span className="italic-accent" style={{ fontSize: 18 }}>{img.caption}</span>
        <span style={{ marginLeft: 16, opacity: 0.55, fontSize: 12, letterSpacing: '0.12em' }}>
          {index! + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState<Category>('All');
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (category === 'All' ? galleryImages : galleryImages.filter((g) => g.category === category)),
    [category],
  );

  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Gallery"
        title={<>The house, in <span className="italic-accent">pictures</span>.</>}
        lede="Our real rooms, our real garden, our real morning light. We don't decorate with photographs of places we are not."
      />

      {/* Category filter */}
      <section>
        <div className="container-x">
          <div
            style={{
              display: 'flex', gap: 6, flexWrap: 'wrap',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              padding: '20px 0',
            }}
          >
            {CATEGORIES.map((c) => {
              const count = c === 'All'
                ? galleryImages.length
                : galleryImages.filter((g) => g.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  style={{
                    background: category === c ? 'var(--ink)' : 'transparent',
                    color: category === c ? 'var(--bg)' : 'var(--ink-soft)',
                    border: 0,
                    padding: '10px 18px',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background var(--t-fast), color var(--t-fast)',
                  }}
                >
                  {c} <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.7 }}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Masonry-ish grid (CSS columns) */}
      <section className="stack-lg">
        <div className="container-x">
          <div className="gallery-grid" style={{ columnCount: 3, columnGap: 22 }}>
            {visible.map((g, i) => {
              const isFeatured = i === 0 || i % 5 === 0;
              const aspect = isFeatured ? '3/4' : (i % 3 === 0 ? '1/1' : '4/3');
              return (
                <button
                  key={g.id}
                  onClick={() => setLbIndex(visible.indexOf(g))}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    padding: 0,
                    margin: '0 0 22px',
                    cursor: 'pointer',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                    // @ts-expect-error CSS columns prefix is unrecognised by TS
                    WebkitColumnBreakInside: 'avoid',
                  }}
                  aria-label={`View ${g.caption}`}
                >
                  <div
                    className="img-slot"
                    style={{ aspectRatio: aspect, position: 'relative', overflow: 'hidden' }}
                  >
                    <img
                      className="img-real"
                      decoding="async"
                      src={g.url}
                      alt={g.caption}
                      style={{ transition: 'transform var(--t-slow)' }}
                      onMouseOver={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                      onMouseOut={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    <div
                      className="gallery-caption-overlay"
                      style={{
                        position: 'absolute', left: 0, right: 0, bottom: 0,
                        padding: '20px 18px 16px',
                        background: 'linear-gradient(180deg, transparent, rgba(15,14,12,.65))',
                        color: '#FBF8F2',
                        opacity: 0,
                        transition: 'opacity var(--t-fast)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div className="eyebrow" style={{ color: 'rgba(251,248,242,.7)' }}>{g.category}</div>
                      <div className="italic-accent" style={{ fontSize: 17, marginTop: 4 }}>{g.caption}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) { .gallery-grid { column-count: 2 !important; } }
          @media (max-width: 560px) { .gallery-grid { column-count: 1 !important; } }
        `}</style>
      </section>

      {/* Bottom CTA */}
      <section className="stack-lg" style={{ background: 'var(--bg-soft)', textAlign: 'center' }}>
        <div className="container-x">
          <h2
            className="display"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: 0, maxWidth: '20ch', marginInline: 'auto' }}
          >
            Better in <span className="italic-accent">person</span>.
          </h2>
          <p
            className="lede"
            style={{ marginTop: 18, marginBottom: 32, maxWidth: '48ch', marginInline: 'auto' }}
          >
            Photographs can only do so much. The light at six in the morning is what we'd really like you to see.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            Book a Stay <IconArrow size={14} />
          </a>
        </div>
      </section>

      <Lightbox
        images={visible}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onIndex={setLbIndex}
      />
    </div>
  );
}

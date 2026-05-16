import { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
};

/** Shared hero block used on every interior page. */
export default function PageHero({ eyebrow, title, lede }: Props) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 140 }}>
      <div className="container-x" style={{ position: 'relative', paddingBlock: '120px 80px' }}>
        <div className="eyebrow"><span className="accent-line" />{eyebrow}</div>
        <h1
          className="display"
          style={{
            fontSize: 'clamp(48px, 8vw, 112px)',
            margin: '24px 0 0',
            maxWidth: '18ch',
          }}
        >
          {title}
        </h1>
        {lede && (
          <p className="lede" style={{ maxWidth: '58ch', marginTop: 28 }}>{lede}</p>
        )}
      </div>
    </section>
  );
}

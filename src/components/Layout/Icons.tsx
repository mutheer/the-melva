/**
 * Inline SVG icon set. Drawn at 24×24 stroke-1.5 to match the redesign.
 * We bundle these rather than pull lucide-react so we can keep dependencies
 * minimal and the build size tiny.
 */
import { CSSProperties } from 'react';

type Props = { size?: number; style?: CSSProperties; className?: string };

function I({ d, size = 20, style, className, fill = 'none', sw = 1.5 }: Props & {
  d: string; fill?: string; sw?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export const IconArrow      = (p: Props) => <I {...p} d="M5 12h14M13 6l6 6-6 6" />;
export const IconArrowLeft  = (p: Props) => <I {...p} d="M19 12H5M11 6l-6 6 6 6" />;
export const IconClose      = (p: Props) => <I {...p} d="M6 6l12 12M18 6l-12 12" />;
export const IconMenu       = (p: Props) => <I {...p} d="M4 7h16M4 12h16M4 17h16" />;
export const IconPin        = (p: Props) => <I {...p} d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />;
export const IconPhone      = (p: Props) => <I {...p} d="M21 16.5v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6 19 19 0 0 1-3-8.3A2 2 0 0 1 3.5 2H6.5a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.5 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" />;
export const IconMail       = (p: Props) => <I {...p} d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6" />;
export const IconClock      = (p: Props) => <I {...p} d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />;
export const IconWifi       = (p: Props) => <I {...p} d="M2 9.5a14 14 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01" />;
export const IconCar        = (p: Props) => <I {...p} d="M5 17h14M3 17V13l2-5h14l2 5v4M7 17v2M17 17v2M7 13h10M7 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM19 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />;
export const IconCoffee     = (p: Props) => <I {...p} d="M4 10h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6zM16 12h2a2 2 0 0 1 0 4h-2M8 2v3M12 2v3M6 2v3" />;
export const IconCheck      = (p: Props) => <I {...p} d="M4 12.5l5 5 11-12" />;
export const IconFB         = (p: Props) => <I {...p} d="M15 8h-2a2 2 0 0 0-2 2v3H8v3h3v6h3v-6h2.5l.5-3H14v-2.5c0-.5.4-.5.5-.5H15V8z" />;
export const IconIG         = (p: Props) => <I {...p} d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01" />;

export function IconStar({ size = 16, filled = true }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.2}
         aria-hidden="true">
      <path d="M12 17.3l-6.2 3.7 1.6-7L2 9.3l7.1-.6L12 2l2.9 6.7 7.1.6-5.4 4.7 1.6 7z" />
    </svg>
  );
}

export function IconWhatsApp({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zM20.52 3.449C18.24 1.245 15.24.026 12.045.025 5.463.025.104 5.385.101 11.971c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.581 0 11.94-5.36 11.943-11.946 0-3.193-1.243-6.196-3.495-8.456z"/>
    </svg>
  );
}

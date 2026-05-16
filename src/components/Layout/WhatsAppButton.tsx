import { IconWhatsApp } from './Icons';
import { WHATSAPP_URL } from '../../data/static';

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with The Melva on WhatsApp"
      className="wa-float"
    >
      <IconWhatsApp size={26} />
    </a>
  );
}

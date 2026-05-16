/**
 * Static content for The Melva.
 *
 * All copy and image paths live here so the marketing team can update text
 * without touching JSX. To add a photo: drop the JPEG into public/ and
 * reference it as `/filename.jpg` (Vite serves /public at the site root).
 */

export const BOOKING_URL = 'https://www.booking.com/Share-pfDWkt0';
export const WHATSAPP_URL = 'https://wa.me/26775010066';
export const PHONE_PRIMARY = '+267 311 9162';
export const PHONE_SECONDARY = '+267 7501 0066';
export const EMAIL = 'themelvaboutique@gmail.com';
export const MAPS_URL = 'https://maps.app.goo.gl/ovFib5URFzTyXFip7?g_st=ic';
export const ADDRESS_LINES = ['Gabamutsha plot 34913', 'Gaborone, Botswana'];

export const navItems = [
  { path: '/',             label: 'Home' },
  { path: '/rooms',        label: 'Rooms & Rates' },
  { path: '/gallery',      label: 'Gallery' },
  { path: '/testimonials', label: 'Guest Stories' },
  { path: '/contact',      label: 'Contact' },
];

export type Room = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  bed: string;
  sleeps: string;
  size: string;
  amenities: string[];
  image: string;
};

export const rooms: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    tagline: 'Quiet comfort, made simple.',
    description:
      "A grounded, considered room for the well-travelled. Linen-dressed bed, blackout drapes, and a writing desk by the window — everything you need, nothing more.",
    price: 670,
    currency: 'P',
    bed: 'Queen bed',
    sleeps: '1–2 guests',
    size: '22 m²',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Private Bathroom',
      'Smart TV',
      'Writing Desk',
      'Bathrobe & Slippers',
    ],
    image: '/room-standard.jpg',
  },
  {
    id: 'junior',
    name: 'Junior Executive',
    tagline: 'Room to think, room to rest.',
    description:
      'Generous proportions, a deeper armchair, and a small fridge for the long evening. Built for the business stay that bleeds into the weekend.',
    price: 770,
    currency: 'P',
    bed: 'Queen bed',
    sleeps: '1–2 guests',
    size: '28 m²',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Private Bathroom',
      'Smart TV',
      'Writing Desk',
      'Mini-Bar Fridge',
      'Bathrobe & Slippers',
    ],
    image: '/room-wide.jpg',
  },
  {
    id: 'executive',
    name: 'Executive Room',
    tagline: 'Our quietest, our calmest.',
    description:
      'King bed, a deep marble-set bathroom, and the longest view in the house. The room our regulars ask for by name.',
    price: 870,
    currency: 'P',
    bed: 'King bed',
    sleeps: '1–2 guests',
    size: '34 m²',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Luxury Bathroom',
      'Smart TV',
      'Writing Desk',
      'Mini-Bar Fridge',
      'Bathrobe & Slippers',
      'Turn-down Service',
    ],
    image: '/room-executive2.jpg',
  },
];

export type GalleryImage = {
  id: string;
  url: string;
  category: 'Exterior' | 'Rooms' | 'Dining' | 'Lounge' | 'Bathroom';
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  // Exterior & arrival
  { id: 'g1',  url: '/hero.jpg',             category: 'Exterior', caption: 'The Melva at dusk' },
  { id: 'g2',  url: '/terrace.jpg',          category: 'Exterior', caption: 'The outdoor terrace' },
  { id: 'g3',  url: '/stairwell.jpg',        category: 'Exterior', caption: 'Stairwell with the palm-tree windows' },

  // Rooms
  { id: 'g4',  url: '/room-executive2.jpg',  category: 'Rooms',    caption: 'Executive Room — wide view' },
  { id: 'g5',  url: '/room-executive.jpg',   category: 'Rooms',    caption: 'Executive Room — bed and bench' },
  { id: 'g6',  url: '/room-executive3.jpg',  category: 'Rooms',    caption: 'Executive Room — pendant lights' },
  { id: 'g7',  url: '/room-wide.jpg',        category: 'Rooms',    caption: 'Junior Executive — wardrobe and desk' },
  { id: 'g8',  url: '/room-front.jpg',       category: 'Rooms',    caption: 'Room, bed and bench front-on' },
  { id: 'g9',  url: '/room-standard.jpg',    category: 'Rooms',    caption: 'Standard Room — lantern lamps' },
  { id: 'g10', url: '/artwork-detail.jpg',   category: 'Rooms',    caption: 'Artwork above the bed' },
  { id: 'g11', url: '/amenity-robes.jpg',    category: 'Rooms',    caption: 'Branded Melva robes in the wardrobe' },

  // Dining
  { id: 'g12', url: '/breakfast-plate.jpg',  category: 'Dining',   caption: 'A full Melva breakfast' },
  { id: 'g13', url: '/breakfast.jpg',        category: 'Dining',   caption: 'Morning breakfast service' },
  { id: 'g14', url: '/lounge-dining.jpg',    category: 'Dining',   caption: 'The dining and lounge space' },

  // Lounge
  { id: 'g15', url: '/lounge-wide.jpg',      category: 'Lounge',   caption: 'Guest lounge with sunburst chandelier' },
  { id: 'g16', url: '/lounge-sculpture.jpg', category: 'Lounge',   caption: 'Brass sculpture in the entry hall' },

  // Bathroom
  { id: 'g17', url: '/bathroom.jpg',         category: 'Bathroom', caption: 'Clawfoot bath and lotus-etched shower' },
];

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  short: string;
  text: string;
  stay: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'David Williams',
    location: 'London, United Kingdom',
    rating: 5,
    short: 'Above and beyond.',
    text: "The attention to detail is impeccable. The staff went above and beyond to make my stay memorable — I couldn't have asked for a better experience in Gaborone.",
    stay: 'Executive Room · 4 nights',
    featured: true,
  },
  {
    id: 't2',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    short: 'A real standout.',
    text: "As a frequent business traveler, I've stayed in many hotels — The Melva stands out. Elegantly furnished, convenient location, and exceptional personalised service. I'll be back.",
    stay: 'Junior Executive · 2 nights',
    featured: true,
  },
  {
    id: 't3',
    name: 'Tebogo Molefe',
    location: 'Johannesburg, South Africa',
    rating: 5,
    short: 'The perfect weekend.',
    text: "Tranquil atmosphere, generous amenities, and attentive staff. The Melva turned a weekend getaway into something we still talk about. We can't wait to visit again.",
    stay: 'Executive Room · 3 nights',
    featured: true,
  },
  {
    id: 't4',
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    short: 'Highly recommended.',
    text: 'Spacious, beautifully decorated rooms. The breakfast was delicious and the staff were incredibly helpful with arranging transport. Highly recommended.',
    stay: 'Executive Room · 2 nights',
  },
  {
    id: 't5',
    name: 'Emma Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    short: 'Felt welcomed from minute one.',
    text: 'From the moment we arrived we felt welcomed. Attention to cleanliness and quality of amenities is top-notch. A perfect base for exploring Gaborone.',
    stay: 'Junior Executive · 3 nights',
  },
  {
    id: 't6',
    name: 'James Anderson',
    location: 'Toronto, Canada',
    rating: 4,
    short: 'Excellent service.',
    text: 'Comfortable, well-maintained rooms with friendly and accommodating staff. I would definitely stay here again on my next visit to Botswana.',
    stay: 'Standard Room · 1 night',
  },
];

export const facts = [
  { label: 'Distance from Airport', value: '10 min' },
  { label: 'Distance from CBD',     value: '5 min' },
  { label: 'Front desk',            value: '24 hours' },
  { label: 'Check-in',              value: '14:00' },
  { label: 'Check-out',             value: '11:00' },
  { label: 'Breakfast',             value: 'P100 / person' },
];

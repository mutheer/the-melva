/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#F1ECE4',
        'bg-soft':   '#E9E2D6',
        'bg-card':   '#FBF8F2',
        ink:         '#1A1A18',
        'ink-soft':  '#3A3833',
        muted:       '#76716A',
        line:        '#D8D1C3',
        accent:      '#8A6E47',
        'accent-soft': '#B49775',
      },
      fontFamily: {
        serif:  ['Marcellus', 'Georgia', 'serif'],
        italic: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:   ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
};

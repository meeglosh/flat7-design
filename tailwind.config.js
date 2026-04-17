/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0B0A',
        parchment: '#F0EDE8',
        amber: '#E8A020',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

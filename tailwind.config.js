/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:  'rgb(var(--bg)  / <alpha-value>)',
        fg:  'rgb(var(--fg)  / <alpha-value>)',
        coral:    '#FF3D5A',
        acid:     '#A8FF3E',
        electric: '#00C8FF',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'system-ui', 'sans-serif'],
        body:  ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:  ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

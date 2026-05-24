/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mukta: ['Mukta', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#B7531A',
        'primary-deep': '#7A2E0B',
        'primary-soft': '#F8E7D2',
        surface: '#FFFFFF',
        bg: '#FBF7F0',
        border: '#EAE0D2',
        'border-soft': '#F2EADC',
        text: '#1C1917',
        'text-muted': '#6B5E52',
        'text-faint': '#A39687',
      },
    },
  },
  plugins: [],
};

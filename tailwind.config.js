/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary_purple: '#843CE0',
        backdrop_color: 'rgba(0,0,0,0.5)',
        secondary_purple: '#eb00ff',
        primary_blue: '#391898',
        primary_gray: '#C4C4C4',
      },
    },
  },
  plugins: [],
};

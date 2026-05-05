/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brown: {
          950: '#1a0d04',
          900: '#2a1508',
          800: '#3d1f0a',
        },
        accent: {
          DEFAULT: '#E07B30',
          light:   '#F08C45',
          dark:    '#C06020',
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      colors: {
        'primary-color-300': 'var(--primary-color-300)',
        'primary-color-700': 'var(--primary-color-700)',

        'secondary-color-300': 'var(--secondary-color-300)',
        'secondary-color-700': 'var(--secondary-color-700)',

        'neutral-color': 'var(--neutral-color)',
        'neutral-color-off': 'var(--neutral-color-off)',
        'neutral-color-300': 'var(--neutral-color-300)',
        'neutral-color-500': 'var(--neutral-color-500)',
        'neutral-color-700': 'var(--neutral-color-700)',

        'positive-color': 'var(--positive-color)',
        'negative-color': 'var(--negative-color)',
      },
    },
  },
  plugins: [],
}

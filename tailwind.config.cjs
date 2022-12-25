/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#9FEDD7',
        'primary-color-dark': '#026670',
        'secondary-color': '#FEFBDD',
        'secondary-color-dark': '#FCE181',
        'positive-color': '#22C55E',
        'negative-color': '#EF4444'
      },
    },
  },
  plugins: [],
}

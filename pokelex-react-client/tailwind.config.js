const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '814px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {},
    colors: {
      accent: 'rgba(var(--color-accent) / <alpha-value>)',
      white: colors.white,
      black: colors.black
    },
  },
  plugins: [],
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx}"]
}

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      base: colors.stone,
      primary: colors.green,
      secondary: colors.sky,
      error: colors.red,
      darkBoardSquare: colors.stone['500'],
      lightBoardSquare: colors.stone['200'],
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  
  plugins: [],
}


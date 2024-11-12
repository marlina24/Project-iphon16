/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'iphone': {
          'pink': '#F2ADDA',
          'natural': '#B0D4D2',
          'blue': '#9AADF6',
          'white': '#FAFAFA',
          'black': '#3C4042'
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightOrange': '#ffe0c9',
        'Orange': '#ff8e3c',
        'darkRed': '#b80c0c',
      },
    },
  },
  plugins: [],
}
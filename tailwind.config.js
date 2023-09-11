/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': {'max':'400px'},
        'xs': {'max':'500px'},
      },
    },
  },
  plugins: [],
}
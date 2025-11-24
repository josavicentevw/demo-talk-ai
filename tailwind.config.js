/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#FF0000',
          blue: '#0000FF',
          yellow: '#FFDE00',
        },
        player1: '#FF0000',
        player2: '#0000FF',
      },
    },
  },
  plugins: [],
}

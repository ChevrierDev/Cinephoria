/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{ejs,js}"],
  theme: {
    extend: {
      colors: {
        blueOne: "#102C57",
        goldOne: "#E3B04B",
        redOne: '#C10E0E',
        whiteOne: '#FEFAF6',
        creamOne: '#EADBC8',
        beigeOne: '#DAC0A3'
      },
      fontFamily: {
        "arvo": ["Arvo", "serif"]
      },
      screens: {
        'widescreend': {'raw': '(min-aspect-ratio: 3/2)'},
        'tailscreen': {'raw': '(min-aspect-ratio: 13/20)'},
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
       'open-menu':  'open-menu 0.5s ease-in-out forwards',
      },
      fontSize: {
        "xxs": "9px"
      }
    },
  },
  plugins: [],
}


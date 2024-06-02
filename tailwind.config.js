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

        'bg-fill': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0 0' },
        },

        'text-fill-animation': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
       'open-menu':  'open-menu 0.5s ease-in-out forwards',
       'bg-fill-animation': 'bg-fill 1.5s forwards',
       'text-fill-animation': 'text-fill-animation 1.5s ease forwards',
      },
      fontSize: {
        "xxs": "9px"
      }
    },
  },
  plugins: [],
}


// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: ['"M PLUS Rounded 1c"', 'sans-serif']
      },
      fontSize: {
        xxs: ['.65rem', '1rem']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.drag': {
          '-webkit-app-region': 'drag'
        },
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-webkit-app-region': 'no-drag'
        },
        '.w-appearance-none': {
          '-webkit-appearance': 'none',
          appearance: 'none'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}

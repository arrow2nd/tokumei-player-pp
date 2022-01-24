// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/components/**/*.{ts,tsx}'],
  safelist: ['right-0', 'left-0'],
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

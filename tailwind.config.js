// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/component/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
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

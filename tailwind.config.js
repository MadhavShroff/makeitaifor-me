/** @type {import('tailwindcss').Config} */

const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: { 
        'slate': '##101010'
      },
      fontFamily: {
        'primary': ['var(--sora-font)', ...fontFamily.sans],
        'serif': ['var(--sora-font)', ...fontFamily.serif]
      },
    }
  }
}

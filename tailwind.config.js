/** @type {import('tailwindcss').Config} */

const {fontFamily} = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/',
    '!.src/pages/test/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ed8936",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: { 
        'slate': '##101010'
      },
      fontFamily: {
        'primary': ['var(--sora-font)', ...fontFamily.sans],
        'serif': ['var(--sora-font)', ...fontFamily.serif]
      },
      screens: {
        'sm': {'max': '767px'},
        "navsm": {'max': '900px'},
      },
      variants: {
        extend: {
            skew: ['group-hover'],  // Enable group-hover for skew
        },
      },
      width: {
        '160': '40rem',
      },
    }
  }
})

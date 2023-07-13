/** @type {import('tailwindcss').Config} */

const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ed8936",
        },
      },
      "dark",
      "cupcake",
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
      },
      variants: {
        extend: {
            skew: ['group-hover'],  // Enable group-hover for skew
        },
    },
    }
  }
}

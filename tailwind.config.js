/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dk': '#010A0F',
        'primary-yellow': ' #F4E101',
        'deco-blue': '#53D2FF',
      },
      fontFamily: {
        cubic: ['cubic'],
      },
      fontSize: {
        '2.5xl': [
          '1.675rem',
          {
            lineHeight: '2rem',
            letterSpacing: '0.05em',
          },
        ],
      },
    },
  },
  plugins: [],
};

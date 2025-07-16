/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '1.5rem'
      },
      center: true,
      screens: {
        sm: '100%',
        md: '640px',
        lg: '768px',
        xl: '960px',
        '2xl': '1080px' // 原本是 1280px
      }
    },
    extend: {
      colors: {
        'primary-dk': '#010A0F',
        'primary-yellow': ' #F4E101',
        'deco-blue': '#53D2FF'
      },
      fontFamily: {
        cubic: ['cubic'],
        timer: ['timer']
      },
      fontSize: {
        '2.5xl': [
          '1.675rem',
          {
            lineHeight: '2rem',
            letterSpacing: '0.05em'
          }
        ],
        clamp1: 'clamp(1.25rem, 3.5vw, 2.5rem)',
        clamp2: 'clamp(1rem, 2vw, 1.5rem)'
      }
    }
  },
  plugins: []
};

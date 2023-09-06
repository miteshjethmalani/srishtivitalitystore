const colors = require('tailwindcss/colors');
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
   
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  important: '#app',

  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },  
      colors: {
        primary: colors.sky,
        secondary: colors.emerald,
        "deep-purple": {
          50: '#ea95ed',
          100: '#db7cde',
          200: '#cc67cf',
          300: '#bc54bf',
          400: '#b544b8',
          500: '#a93fab',
          600: '#9c3a9e',
          700: '#8f3691',
          800: '#833285',
          900: '#6e2170',
        },

      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
});

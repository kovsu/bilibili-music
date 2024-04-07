/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F0F0FF',
          700: '#707AFF',
        },
        secondary: '#9570FF',
      },
    },
  },
  plugins: [],
}

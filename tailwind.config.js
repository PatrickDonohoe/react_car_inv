/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burgundy': '5F0F40',
        'dark_red': '9A031E',
        'orange_drank': 'FB8B24',
        'ut_orange': 'E36414',
        'dark_seafoam': '0F4C5C'
      },
    },
  },
  plugins: [],
}


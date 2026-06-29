/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7f6',
          100: '#e3eae7',
          500: '#1e3a34', // luxury deep emerald / studio tone
          600: '#162e29',
          900: '#0b1916',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Prompt', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#FFF9E6', 
        'custom-primary': '#FFC300', 
        'custom-secondary': '#FFB600',
        'footer-color-for-text': '#232323',
      },
    },
  },
  plugins: [],
}
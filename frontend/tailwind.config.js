/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#003B5C',
          light: '#005580',
          dark: '#002A42',
        },
        cyan: {
          DEFAULT: '#008B8B',
          light: '#00AAAA',
          dark: '#006B6B',
        },
        charcoal: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

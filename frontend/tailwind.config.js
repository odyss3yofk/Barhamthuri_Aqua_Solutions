/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy brand colors
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
        // New dark design system
        void: '#070B0F',
        surface: '#0D1520',
        elevated: '#152030',
        accent: {
          DEFAULT: '#2DD4BF',
          dim: '#14B8A6',
          bright: '#5EEAD4',
        },
        sky: {
          DEFAULT: '#38BDF8',
          dim: '#0EA5E9',
        },
        ink: {
          1: '#F8FAFC',
          2: '#94A3B8',
          3: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(45,212,191,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(45,212,191,0.3)',
        'glow-teal-lg': '0 0 40px rgba(45,212,191,0.25), 0 0 80px rgba(45,212,191,0.1)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover-dark': '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(45,212,191,0.2)',
      },
    },
  },
  plugins: [],
}

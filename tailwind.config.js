/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        grow: {
          light: '#bbf7d0',
          DEFAULT: '#22c55e',
          dark: '#166534'
        }
      },
      backgroundImage: {
        'eco-gradient':
          'radial-gradient(circle at top left, rgba(34,197,94,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(45,212,191,0.35), transparent 55%)'
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.65)'
      },
      borderRadius: {
        '3xl': '1.5rem'
      }
    }
  },
  plugins: []
};


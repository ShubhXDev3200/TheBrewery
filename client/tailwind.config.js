/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d2b48c', // Tan
          DEFAULT: '#6f4e37', // Coffee Brown
          dark: '#3c2a21', // Dark Coffee
        },
        accent: {
          light: '#ffdbbb',
          DEFAULT: '#ff9d4d', // Warm Orange
          dark: '#e67e22',
        },
        cream: {
          light: '#fffaf5',
          DEFAULT: '#f5ebe0',
          dark: '#e3d5ca',
        },
        dark: {
          light: '#2d2d2d',
          DEFAULT: '#1a1a1a',
          dark: '#0f0f0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}

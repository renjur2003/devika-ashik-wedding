/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F3EB',
          50: '#FDFBF7',
          100: '#F8F3EB',
          200: '#EFE5D5',
          300: '#E8D9C3',
        },
        burgundy: {
          DEFAULT: '#702B3D',
          light: '#8B384E',
          dark: '#541D2B',
          deep: '#3A121D',
        },
        gold: {
          DEFAULT: '#B89A62',
          light: '#D4BC8B',
          dark: '#937845',
          glow: '#E5C992',
        },
        champagne: {
          DEFAULT: '#E8D9C3',
          light: '#F4ECE1',
        },
        charcoal: {
          DEFAULT: '#252222',
          dark: '#181616',
          light: '#3C3838',
        },
        botanical: {
          DEFAULT: '#66745D',
          dark: '#4B5744',
          light: '#87967D',
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(#B89A62 0.75px, transparent 0.75px)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      }
    },
  },
  plugins: [],
}


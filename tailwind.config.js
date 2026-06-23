/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          50: '#fbf7ec',
          100: '#f5eccf',
          200: '#ecd99c',
          300: '#e0c267',
          400: '#d4af37', // primary gold
          500: '#c8a14e',
          600: '#a9853a',
          700: '#86692f',
          800: '#6b542b',
          900: '#5b4827',
        },
        navy: {
          50: '#eef1f7',
          100: '#d6dded',
          200: '#b0bdd8',
          300: '#8295bf',
          400: '#5a6fa3',
          500: '#3f5288',
          600: '#31406b',
          700: '#283457',
          800: '#1a2238',
          900: '#0b1220', // deep navy
          950: '#070b16',
        },
        beige: {
          50: '#faf7f2',
          100: '#f5efe6',
          200: '#eaded0',
          300: '#dcc8b0',
          400: '#c9ac8b',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11, 18, 32, 0.18)',
        gold: '0 12px 40px -10px rgba(212, 175, 55, 0.45)',
        card: '0 20px 60px -20px rgba(11, 18, 32, 0.25)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

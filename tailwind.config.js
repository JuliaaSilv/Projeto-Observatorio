/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#1d6fdc',
          700: '#124d99',
          900: '#0f2747',
        },
        success: {
          50: '#ecfdf3',
          600: '#15803d',
        },
        danger: {
          50: '#fef2f2',
          600: '#dc2626',
        },
        surface: '#f4f7fb',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 18px 48px rgba(15, 39, 71, 0.08)',
      },
    },
  },
  plugins: [],
}


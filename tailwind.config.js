/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef5f5',
          100: '#fee4e3',
          200: '#fdc9c7',
          300: '#fa9f9a',
          400: '#f77066',
          500: '#f4241a',
          600: '#d91d16',
          700: '#b11814',
          800: '#8c1412',
          900: '#731310',
        },
      },
      boxShadow: {
        card: '0 12px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#f59e0b',
          navy: '#0f172a',
          ink: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};

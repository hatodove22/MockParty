export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1f3a',
        orange: '#ff6a2a',
        contestGreen: '#00a878',
        mint: '#e8fff6',
        warm: '#f7f3ef',
        neutralPanel: '#f8fafc',
      },
      boxShadow: {
        soft: '0 18px 50px rgb(11 31 58 / 0.12)',
      },
    },
  },
  plugins: [],
};

export default {
  content: [
    './index.html',
    './src/**/*.{html,js}',
    './auth/**/*.{html,js}',
    './profile/**/*.{html,js}',
    './*.{html,js}',
    './src/main.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Work Sans', 'sans-serif'],
      },
      colors: {
        body: {
          dark: '#0B1423',
          light: '#F5F5EF',
        },
        green: {
          1: '#8EEB78',
          2: '#6FB15F',
          3: '#418B2F',
        },
        purple: {
          light: '#5333F6',
          dark: '#2F365B',
        },
        blue: {
          dark: '#07193C',
        },
        black: {
          bright: '#09101B',
        },
        text: {
          white: '#FDFDFD',
          black: '#000000',
        },
        light: {
          cards: '#FFFFFF',
          component: '#F0F0E8',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};

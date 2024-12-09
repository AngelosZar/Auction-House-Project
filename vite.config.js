import { defineConfig } from 'vite';
// import path from 'path';
import { resolve } from 'path';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  appType: 'mpa',
  base: '/',
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signIn: resolve(__dirname, 'auth/sign_in/index.html'),
        signUp: resolve(__dirname, 'auth/sign_up/index.html'),
        profile: resolve(__dirname, 'profile/index.html'),
        updateProfile: resolve(__dirname, 'profile/update/index.html'),
        singleListing: resolve(__dirname, 'biddings/single-listing/index.html'),
      },
    },
  },
});

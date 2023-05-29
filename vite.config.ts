import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

const isProd = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all'),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main/resources/assets/main.tsx'),
      },
      output: {
        dir: resolve(__dirname, 'build/resources/main'),
        // Prevent from adding hash to file names
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    minify: isProd,
    // Prevent "EBUSY: resource busy or locked" error when trying to rmdir
    emptyOutDir: false,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
      ],
    },
  },
});

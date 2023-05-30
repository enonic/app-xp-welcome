import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

const isProd = process.env.NODE_ENV !== 'production';

export default defineConfig({
    base: '',
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
                dir: resolve(__dirname, 'build/resources/main/assets'),
                // Prevent from adding hash to file names
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                // assetFileNames: '[name].[ext]',
                assetFileNames: ({name = ''}) => {
                    if (name === 'index.css') {
                        return 'main.css';
                    }
                    if (/(ttf)/.test(name)) {
                        return 'fonts/[name][extname]';
                    }
                    if (/\.(gif|jpeg|jpg|png|svg)$/.test(name)) {
                        return 'images/[name][extname]';
                    }
                    return '[name][extname]';
                },
            },
        },
        minify: isProd,
        sourcemap: isProd ? 'hidden' : 'inline',
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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
// import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
    ],
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:3000',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
})
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
const url = 'http://127.0.0.1:5001/'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 1888,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    hmr: true,
    watch: {
      usePolling: true, // 轮询监听文件变化
      interval: 1000, // 监听的间隔时间（ms）
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer],
    },
  }
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        // !!! 这个是关键 !!!
        headers: {
          host: 'https://api.bilibili.com',
          referer: ''
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

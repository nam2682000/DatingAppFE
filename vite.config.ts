import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5176', // Địa chỉ API backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Xóa prefix /api trong URL
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias @ trỏ về thư mục src
    }
  }
})
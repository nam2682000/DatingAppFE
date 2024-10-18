import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias @ trỏ về thư mục src
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://webapp:5176', // Địa chỉ API backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Xóa prefix /api trong URL
      },
      '/uploads': {
        target: 'http://webapp:5176', // Server lưu trữ hình ảnh
        changeOrigin: true
      }
    }
  }
})

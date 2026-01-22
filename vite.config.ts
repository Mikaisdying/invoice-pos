import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/invoice-pos/', // Thay 'invoice-pos' bằng tên repo của bạn
})

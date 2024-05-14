import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0', 
    watch: {
      usePolling: true, 
    },
    hmr: {
      clientPort: 5173, 
    },
  },
})
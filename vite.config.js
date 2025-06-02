import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap', 'gsap/Draggable'],
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('@mui')) return 'mui'
            return 'vendor'
          }
        },
      },
    },
  },
})
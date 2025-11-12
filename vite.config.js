import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animation: ['gsap', 'framer-motion'],
          utils: ['react-router-dom', 'lenis']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['gsap', 'framer-motion', 'lenis']
  }
})
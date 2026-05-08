import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://jp-marketing.onrender.com/api',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://jp-marketing.onrender.com/uploads',
        changeOrigin: true
      }
    }
  },
  build: {
    // Production build optimizations
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'react-hot-toast'],
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
}))

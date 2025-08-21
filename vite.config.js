import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/wp-content/themes/wp-react/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: 'C:/Devs/Laragon/www/WP-REACT/wp-content/themes/wp-react',
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    allowedHosts: [
      '.ngrok-free.app',
    ]
  }
})

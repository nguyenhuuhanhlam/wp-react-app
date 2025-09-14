import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/wp-content/themes/wp-react/',
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/main.[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) {
            return 'css/[name].[hash].[ext]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name].[hash].[ext]';
          }
          return 'assets/[name].[hash].[ext]'
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   cors: true,
  //   allowedHosts: ['.ngrok-free.app', 'localhost', '127.0.0.1', 'labtest.local', 'archihau.edu.vn'],
  //   watch: {
  //     usePolling: true,
  //   },
  // },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
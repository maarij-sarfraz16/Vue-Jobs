import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // Vite development server port
    proxy: {
      // Proxy all requests to /api or /jobs to the backend
      '/api': {
        target: 'http://localhost:8000',  // Backend server running on port 8000
        changeOrigin: true,               // Ensure origin matches the target server
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix for backend
      },
      '/jobs': {
        target: 'http://localhost:8000',  // Proxy requests to the same backend
        changeOrigin: true,               // Ensures the origin header is adjusted
        rewrite: (path) => path.replace(/^\/jobs/, ''), // Optional: remove '/jobs' prefix if needed
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),  // Alias '@' to point to the 'src' folder
    },
  },
});

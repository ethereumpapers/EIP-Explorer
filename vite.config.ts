import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/anthropic': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Add the API key and required headers from environment variables
            const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
            if (apiKey) {
              proxyReq.setHeader('x-api-key', apiKey);
              proxyReq.setHeader('anthropic-version', '2023-06-01');
              proxyReq.setHeader('anthropic-dangerous-direct-browser-access', 'true');
              console.log('✅ Headers added to proxy request with API key and browser access header');
            } else {
              console.warn('⚠️ VITE_ANTHROPIC_API_KEY not found in environment variables');
            }
          });
        },
      },
    },
  },
});

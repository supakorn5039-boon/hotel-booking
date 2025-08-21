import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
   plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react(), tailwindcss()],
   test: {
      globals: true,
      environment: 'jsdom',
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
});

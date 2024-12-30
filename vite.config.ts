import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aliases if needed
    },
  },
  build: {
    rollupOptions: {
      external: ['electron'], // Exclude Electron from being bundled
    },
  },
});

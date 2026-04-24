import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // Copy sites/ and public/ content verbatim into dist so the existing
    // demo sites remain reachable at /sites/*.html after build.
    assetsInlineLimit: 0,
  },
  publicDir: 'public',
});

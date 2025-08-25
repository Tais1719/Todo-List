import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Todo-List/', // ← isso corrige o 404 no GitHub Pages
  plugins: [react()],
});

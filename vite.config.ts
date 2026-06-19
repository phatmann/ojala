import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static, client-side-only app. No backend required.
// Base is './' so the built app also works when opened from a sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
});

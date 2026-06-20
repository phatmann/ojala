import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static, client-side-only app. No backend required.
// Base is './' so the built app also works when opened from a sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // A build stamp surfaced in the footer so it's easy to tell whether the
    // browser is showing the latest deploy or a cached copy.
    __BUILD_TIME__: JSON.stringify(
      new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
    ),
  },
});

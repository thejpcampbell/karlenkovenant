import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Transpile modern syntax (optional chaining ?. , nullish ?? , etc.) down so
    // older iPads / Safari 12+ can parse the bundle instead of white-screening.
    target: ['es2019', 'safari12'],
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js', 'vitest-localstorage-mock'],
    mockReset: true,
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.jsx',
        'src/App.jsx',
        '*.config.js',
        'tests/__mocks__/*',
      ],
    },
  },
});

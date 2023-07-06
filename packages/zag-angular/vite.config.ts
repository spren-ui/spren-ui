/// <reference types="vitest" />
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: '../../node_modules/.vite/zag-angular',

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  test: {
    name: '@spren-ui/zag-angular',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test-setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    cache: {
      dir: '../../node_modules/.vitest',
    },
  },
});

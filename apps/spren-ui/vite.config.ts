/// <reference types="vitest" />
import analog from '@analogjs/platform';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    cacheDir: '../../node_modules/.vite/spren-ui',

    publicDir: 'src/public',
    optimizeDeps: {
      include: ['@angular/common', '@angular/forms'],
    },
    build: {
      target: ['es2020'],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },

    plugins: [
      analog({
        vite: {
          inlineStylesExtension: 'css',
        },
      }),
      tsConfigPaths({
        root: '../../',
      }),
      visualizer() as Plugin,
      splitVendorChunkPlugin(),
    ],

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      cache: {
        dir: `../../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});

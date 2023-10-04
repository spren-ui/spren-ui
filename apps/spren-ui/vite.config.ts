/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { type Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    cacheDir: '../../node_modules/.vite/spren-ui',

    publicDir: 'src/public',
    optimizeDeps: {
      include: ['@angular/common', '@angular/forms'],
    },
    ssr: {
      noExternal: ['@spren-ui/**'],
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
      nxViteTsPaths(),
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

const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

const baseConfig = require('../../../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: [join(__dirname, '/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  plugins: [],
};

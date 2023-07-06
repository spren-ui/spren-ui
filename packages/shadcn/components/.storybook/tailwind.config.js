const { join } = require('path');

const baseConfig = require('../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    join(__dirname, '/../**/!(*.spec).{ts,html}'),
    join(__dirname, '/**/!(*.spec).{ts,html}'),
  ],
};

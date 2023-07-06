import { type StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-styling',
      options: { postCss: true },
    },
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: ['./public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs

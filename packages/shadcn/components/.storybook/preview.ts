import { withThemeByClassName } from '@storybook/addon-styling';
import { type Preview, componentWrapperDecorator } from '@storybook/angular';

import './styles/fonts.css';
import './styles/tailwind.css';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  componentWrapperDecorator((story) => `<div class="bg-background text-foreground">${story}</div>`),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export default preview;
